#!/usr/bin/env python3
"""
Audio Transcriber v1.2.1
Transcribes audio to text and generates summaries/minutes using LLM.
"""

import os
import sys
import json
import subprocess
import shutil
from datetime import datetime
from pathlib import Path

# Rich for beautiful terminal output
try:
    from rich.console import Console
    from rich.prompt import Prompt
    from rich.panel import Panel
    from rich.progress import Progress, SpinnerColumn, TextColumn, BarColumn
    from rich import print as rprint
    RICH_AVAILABLE = True
except ImportError:
    RICH_AVAILABLE = False
    print("⚠️  Installing rich for better UI...")
    subprocess.run([sys.executable, "-m", "pip", "install", "--user", "rich"], check=False)
    from rich.console import Console
    from rich.prompt import Prompt
    from rich.panel import Panel
    from rich.progress import Progress, SpinnerColumn, TextColumn, BarColumn
    from rich import print as rprint

# tqdm for progress bars
try:
    from tqdm import tqdm
except ImportError:
    print("⚠️  Installing tqdm for progress bars...")
    subprocess.run([sys.executable, "-m", "pip", "install", "--user", "tqdm"], check=False)
    from tqdm import tqdm

# Whisper engines
try:
    from faster_whisper import WhisperModel
    TRANSCRIBER = "faster-whisper"
except ImportError:
    try:
        import whisper
        TRANSCRIBER = "whisper"
    except ImportError:
        print("❌ No transcription engine found!")
        print("   Install: pip install faster-whisper")
        sys.exit(1)

console = Console()

# Default RISEN template for fallback
DEFAULT_MEETING_PROMPT = """
Role: You are a professional transcriptionist specializing in documentation.

Instructions: Transform the provided transcription into a structured and professional document.

Steps:
1. Identify the type of content (meeting, lecture, interview, etc.)
2. Extract the main topics and key points
3. Identify participants/speakers (if applicable)
4. Extract decisions made and actions defined (if a meeting)
5. Organize in appropriate format with clear sections
6. Use Markdown for professional formatting

End Goal: A well-structured, readable final document ready for distribution.

Narrowing:
- Maintain objectivity and clarity
- Preserve important context
- Use appropriate Markdown formatting
- Include relevant timestamps when applicable
"""


def detect_cli_tool():
    """Detects which LLM CLI is available (claude > gh copilot)."""
    if shutil.which('claude'):
        return 'claude'
    elif shutil.which('gh'):
        result = subprocess.run(['gh', 'copilot', '--version'],
                                capture_output=True, text=True)
        if result.returncode == 0:
            return 'gh-copilot'
    return None


def invoke_prompt_engineer(raw_prompt, timeout=90):
    """
    Invokes the prompt-engineer skill via CLI to improve/generate prompts.

    Args:
        raw_prompt: Prompt to be improved or meta-prompt
        timeout: Timeout in seconds

    Returns:
        str: Improved prompt or DEFAULT_MEETING_PROMPT on failure
    """
    try:
        # Try via gh copilot
        console.print("[dim]   Invoking prompt-engineer...[/dim]")

        result = subprocess.run(
            ['gh', 'copilot', 'suggest', '-t', 'shell', raw_prompt],
            capture_output=True,
            text=True,
            timeout=timeout
        )

        if result.returncode == 0 and result.stdout.strip():
            return result.stdout.strip()
        else:
            console.print("[yellow]⚠️  prompt-engineer did not respond, using default template[/yellow]")
            return DEFAULT_MEETING_PROMPT

    except subprocess.TimeoutExpired:
        console.print(f"[red]⚠️  Timeout after {timeout}s, using default template[/red]")
        return DEFAULT_MEETING_PROMPT
    except Exception as e:
        console.print(f"[red]⚠️  Error invoking prompt-engineer: {e}[/red]")
        return DEFAULT_MEETING_PROMPT


def handle_prompt_workflow(user_prompt, transcript):
    """
    Manages the complete prompt workflow with prompt-engineer.

    Scenario A: User provided a prompt → Improve AUTOMATICALLY → Confirm
    Scenario B: No prompt → Suggest type → Confirm → Generate → Confirm

    Returns:
        str: Final prompt to use, or None if user declined processing
    """
    prompt_engineer_available = os.path.exists(
        os.path.expanduser('~/.copilot/skills/prompt-engineer/SKILL.md')
    )

    # ========== SCENARIO A: USER PROVIDED PROMPT ==========
    if user_prompt:
        console.print("\n[cyan]📝 Prompt provided by user[/cyan]")
        console.print(Panel(user_prompt[:300] + ("..." if len(user_prompt) > 300 else ""),
                           title="Original prompt", border_style="dim"))

        if prompt_engineer_available:
            # Improve AUTOMATICALLY (without asking)
            console.print("\n[cyan]🔧 Improving prompt with prompt-engineer...[/cyan]")

            improved_prompt = invoke_prompt_engineer(
                f"improve this prompt:\n\n{user_prompt}"
            )

            # Show BOTH versions
            console.print("\n[green]✨ Improved version:[/green]")
            console.print(Panel(improved_prompt[:500] + ("..." if len(improved_prompt) > 500 else ""),
                               title="Optimized prompt", border_style="green"))

            console.print("\n[dim]📝 Original version:[/dim]")
            console.print(Panel(user_prompt[:300] + ("..." if len(user_prompt) > 300 else ""),
                               title="Your prompt", border_style="dim"))

            # Ask which to use
            confirm = Prompt.ask(
                "\n💡 Use improved version?",
                choices=["y", "n"],
                default="y"
            )

            return improved_prompt if confirm == "y" else user_prompt
        else:
            # prompt-engineer not available
            console.print("[yellow]⚠️  prompt-engineer skill not available[/yellow]")
            console.print("[dim]✅ Using your original prompt[/dim]")
            return user_prompt

    # ========== SCENARIO B: NO PROMPT - AUTO-GENERATION ==========
    else:
        console.print("\n[yellow]⚠️  No prompt provided.[/yellow]")

        if not prompt_engineer_available:
            console.print("[yellow]⚠️  prompt-engineer skill not found[/yellow]")
            console.print("[dim]Using default template...[/dim]")
            return DEFAULT_MEETING_PROMPT

        # STEP 1: Ask if user wants to auto-generate
        console.print("I can analyze the transcript and suggest a summary/minutes format?")

        generate = Prompt.ask(
            "\n💡 Generate prompt automatically?",
            choices=["y", "n"],
            default="y"
        )

        if generate == "n":
            console.print("[dim]✅ Ok, generating transcript.md only (no summary)[/dim]")
            return None  # Signal: do not process with LLM

        # STEP 2: Analyze transcript and SUGGEST type
        console.print("\n[cyan]🔍 Analyzing transcript...[/cyan]")

        suggestion_meta_prompt = f"""
Analyze this transcript ({len(transcript)} characters) and suggest:

1. Content type (meeting, lecture, interview, etc.)
2. Recommended output format (formal minutes, executive summary, structured notes)
3. Ideal framework (RISEN, RODES, STAR, etc.)

First 1000 words of transcript:
{transcript[:4000]}

Respond in 2-3 concise lines.
"""

        suggested_type = invoke_prompt_engineer(suggestion_meta_prompt)

        # STEP 3: Show suggestion and CONFIRM
        console.print("\n[green]💡 Format suggestion:[/green]")
        console.print(Panel(suggested_type, title="Transcript analysis", border_style="green"))

        confirm_type = Prompt.ask(
            "\n💡 Use this format?",
            choices=["y", "n"],
            default="y"
        )

        if confirm_type == "n":
            console.print("[dim]Using default template...[/dim]")
            return DEFAULT_MEETING_PROMPT

        # STEP 4: Generate complete prompt based on suggestion
        console.print("\n[cyan]✨ Generating structured prompt...[/cyan]")

        final_meta_prompt = f"""
Create a complete and structured prompt (using the appropriate framework) for:

{suggested_type}

The prompt should instruct an AI to transform the transcript into a
professional and well-formatted Markdown document.
"""

        generated_prompt = invoke_prompt_engineer(final_meta_prompt)

        # STEP 5: Show generated prompt and CONFIRM
        console.print("\n[green]✅ Prompt generated:[/green]")
        console.print(Panel(generated_prompt[:600] + ("..." if len(generated_prompt) > 600 else ""),
                           title="Preview", border_style="green"))

        confirm_final = Prompt.ask(
            "\n💡 Use this prompt?",
            choices=["y", "n"],
            default="y"
        )

        if confirm_final == "y":
            return generated_prompt
        else:
            console.print("[dim]Using default template...[/dim]")
            return DEFAULT_MEETING_PROMPT


def process_with_llm(transcript, prompt, cli_tool='claude', timeout=300):
    """
    Processes transcript with LLM using the provided prompt.

    Args:
        transcript: Transcribed text
        prompt: Prompt instructing how to process
        cli_tool: 'claude' or 'gh-copilot'
        timeout: Timeout in seconds

    Returns:
        str: Processed summary/minutes
    """
    full_prompt = f"{prompt}\n\n---\n\nTranscription:\n\n{transcript}"

    try:
        with Progress(
            SpinnerColumn(),
            TextColumn("[progress.description]{task.description}"),
            transient=True
        ) as progress:
            progress.add_task(description=f"🤖 Processing with {cli_tool}...", total=None)

            if cli_tool == 'claude':
                result = subprocess.run(
                    ['claude', '-'],
                    input=full_prompt,
                    capture_output=True,
                    text=True,
                    timeout=timeout
                )
            elif cli_tool == 'gh-copilot':
                result = subprocess.run(
                    ['gh', 'copilot', 'suggest', '-t', 'shell', full_prompt],
                    capture_output=True,
                    text=True,
                    timeout=timeout
                )
            else:
                raise ValueError(f"Unknown CLI tool: {cli_tool}")

        if result.returncode == 0:
            return result.stdout.strip()
        else:
            console.print(f"[red]❌ Error processing with {cli_tool}[/red]")
            console.print(f"[dim]{result.stderr[:200]}[/dim]")
            return None

    except subprocess.TimeoutExpired:
        console.print(f"[red]❌ Timeout after {timeout}s[/red]")
        return None
    except Exception as e:
        console.print(f"[red]❌ Error: {e}[/red]")
        return None


def transcribe_audio(audio_file, model="base"):
    """
    Transcribes audio using Whisper with a progress bar.

    Returns:
        dict: {language, duration, segments: [{start, end, text}]}
    """
    console.print(f"\n[cyan]🎙️  Transcribing audio with {TRANSCRIBER}...[/cyan]")

    try:
        if TRANSCRIBER == "faster-whisper":
            model_obj = WhisperModel(model, device="cpu", compute_type="int8")
            segments, info = model_obj.transcribe(
                audio_file,
                language=None,
                vad_filter=True,
                word_timestamps=True
            )

            data = {
                "language": info.language,
                "language_probability": round(info.language_probability, 2),
                "duration": info.duration,
                "segments": []
            }

            # Convert generator to list with progress
            console.print("[dim]Processing segments...[/dim]")
            for segment in tqdm(segments, desc="Segments", unit="seg"):
                data["segments"].append({
                    "start": round(segment.start, 2),
                    "end": round(segment.end, 2),
                    "text": segment.text.strip()
                })

        else:  # original whisper
            import whisper
            model_obj = whisper.load_model(model)
            result = model_obj.transcribe(audio_file, word_timestamps=True)

            data = {
                "language": result["language"],
                "duration": result["segments"][-1]["end"] if result["segments"] else 0,
                "segments": result["segments"]
            }

        console.print(f"[green]✅ Transcription complete! Language: {data['language'].upper()}[/green]")
        console.print(f"[dim]   {len(data['segments'])} segments processed[/dim]")

        return data

    except Exception as e:
        console.print(f"[red]❌ Transcription error: {e}[/red]")
        sys.exit(1)


def save_outputs(transcript_text, summary_text, audio_file, output_dir="."):
    """
    Saves transcript and summary to .md files with timestamp.

    Returns:
        tuple: (transcript_path, summary_path or None)
    """
    timestamp = datetime.now().strftime("%Y%m%d-%H%M%S")
    base_name = Path(audio_file).stem

    # Always save transcript
    transcript_filename = f"transcript-{timestamp}.md"
    transcript_path = Path(output_dir) / transcript_filename

    with open(transcript_path, 'w', encoding='utf-8') as f:
        f.write(transcript_text)

    console.print(f"[green]✅ Transcript saved:[/green] {transcript_filename}")

    # Save summary if it exists
    summary_path = None
    if summary_text:
        summary_filename = f"summary-{timestamp}.md"
        summary_path = Path(output_dir) / summary_filename

        with open(summary_path, 'w', encoding='utf-8') as f:
            f.write(summary_text)

        console.print(f"[green]✅ Summary saved:[/green] {summary_filename}")

    return str(transcript_path), str(summary_path) if summary_path else None


def main():
    """Main function."""
    import argparse

    parser = argparse.ArgumentParser(description="Audio Transcriber v1.2.1")
    parser.add_argument("audio_file", help="Audio file to transcribe")
    parser.add_argument("--prompt", help="Custom prompt for processing transcript")
    parser.add_argument("--model", default="base", help="Whisper model (tiny/base/small/medium/large)")
    parser.add_argument("--output-dir", default=".", help="Output directory")

    args = parser.parse_args()

    # Check file exists
    if not os.path.exists(args.audio_file):
        console.print(f"[red]❌ File not found: {args.audio_file}[/red]")
        sys.exit(1)

    console.print("[bold cyan]🎵 Audio Transcriber v1.2.1[/bold cyan]\n")

    # Step 1: Transcribe
    transcription_data = transcribe_audio(args.audio_file, model=args.model)

    # Generate transcript text
    transcript_text = f"# Audio Transcription\n\n"
    transcript_text += f"**File:** {Path(args.audio_file).name}\n"
    transcript_text += f"**Language:** {transcription_data['language'].upper()}\n"
    transcript_text += f"**Date:** {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n\n"
    transcript_text += "---\n\n## Full Transcription\n\n"

    for seg in transcription_data["segments"]:
        start_min = int(seg["start"] // 60)
        start_sec = int(seg["start"] % 60)
        end_min = int(seg["end"] // 60)
        end_sec = int(seg["end"] % 60)
        transcript_text += f"**[{start_min:02d}:{start_sec:02d} → {end_min:02d}:{end_sec:02d}]**  \n{seg['text']}\n\n"

    # Step 2: Detect CLI
    cli_tool = detect_cli_tool()

    if not cli_tool:
        console.print("\n[yellow]⚠️  No AI CLI detected (Claude or GitHub Copilot)[/yellow]")
        console.print("[dim]ℹ️  Saving transcript.md only...[/dim]")

        save_outputs(transcript_text, None, args.audio_file, args.output_dir)

        console.print("\n[cyan]💡 To generate a summary:[/cyan]")
        console.print("  - Install Claude CLI: pip install claude-cli")
        console.print("  - Or GitHub Copilot CLI is already installed (gh copilot)")
        return

    console.print(f"\n[green]✅ CLI detected: {cli_tool}[/green]")

    # Step 3: Prompt workflow
    final_prompt = handle_prompt_workflow(args.prompt, transcript_text)

    if final_prompt is None:
        # User declined processing
        save_outputs(transcript_text, None, args.audio_file, args.output_dir)
        return

    # Step 4: Process with LLM
    summary_text = process_with_llm(transcript_text, final_prompt, cli_tool)

    if summary_text:
        console.print("[green]✅ Summary generated successfully![/green]")
    else:
        console.print("[yellow]⚠️  Failed to generate summary, saving transcript only[/yellow]")

    # Step 5: Save files
    console.print("\n[cyan]💾 Saving files...[/cyan]")
    save_outputs(transcript_text, summary_text, args.audio_file, args.output_dir)

    console.print("\n[bold green]✅ Done![/bold green]")


if __name__ == "__main__":
    main()
