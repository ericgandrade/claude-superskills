---
name: pptx-to-markdown
description: This skill should be used when you need to convert a PowerPoint (.pptx) presentation into a rich, structured Markdown document using multi-pass analysis that combines structural text extraction via python-pptx, high-fidelity slide rendering via Apache POI, and AI vision analysis for both explicit and implicit visual content such as charts, timelines, and diagrams.
license: MIT
---

# 📊 PPTX to Markdown — Deep Converter

Convert any `.pptx` presentation into a rich, structured Markdown document using a 4-pass analysis pipeline: text extraction, slide rendering, and two AI vision passes (explicit + implicit content).

---

## Purpose

Transform PowerPoint presentations into comprehensive Markdown documents that capture not only the explicit text content, but also the visual intelligence embedded in slides — charts, timelines, diagrams, images, color coding, and layout semantics — using Apache POI for high-fidelity rendering and AI vision for deep analysis.

---

## When to Use

- Convert a `.pptx` to `.md` for documentation, note-taking, or knowledge base ingestion
- Extract and analyze charts, timelines, or diagrams from presentation slides
- Generate a comprehensive text summary of a presentation without losing visual context
- Prepare presentation content for RAG pipelines or LLM processing

**Trigger phrases:**
- "convert this presentation to markdown: slides.pptx"
- "extract all content from: quarterly-review.pptx"
- "pptx to markdown: strategy-deck.pptx"
- "deep read this pptx: proposal.pptx"
- "use pptx-to-markdown on: [file]"

---

## Workflow

### Step 0: Discovery & Dependency Check

**Objective:** Locate the PPTX file and verify all dependencies.

**Actions:**

```bash
# 1. Resolve PPTX path
PPTX_FILE="<user-provided path or found via glob>"
STEM=$(basename "$PPTX_FILE" .pptx)
PPTX_DIR=$(dirname "$PPTX_FILE")
TMP_DIR="${PPTX_DIR}/.${STEM}_tmp"
SLIDES_DIR="${TMP_DIR}/slides"

mkdir -p "$SLIDES_DIR"
```

**EVAL 0a — File exists:**
```bash
if [ ! -f "$PPTX_FILE" ]; then
    echo "❌ ERRO FATAL — Step 0: Arquivo não encontrado: $PPTX_FILE"
    exit 1
fi
if [[ "$PPTX_FILE" != *.pptx ]]; then
    echo "❌ ERRO FATAL — Step 0: O arquivo deve ter extensão .pptx"
    exit 1
fi
echo "  ✅ eval Step 0a OK — Arquivo encontrado: $PPTX_FILE"
```

**EVAL 0b — Python + python-pptx:**
```bash
python3 -c "import pptx" 2>/dev/null || {
    echo "  🟢 INFO: python-pptx não encontrado. Instalando..."
    pip install python-pptx --quiet --break-system-packages || \
    pip install python-pptx --quiet
}
python3 -c "import pptx" 2>/dev/null || {
    echo "❌ ERRO FATAL — Step 0: Não foi possível instalar python-pptx"
    echo "   💡 Solução: pip install python-pptx"
    exit 1
}
echo "  ✅ eval Step 0b OK — python-pptx disponível"
```

**EVAL 0c — Java 11+:**
```bash
JAVA_VERSION=$(java -version 2>&1 | awk -F '"' '/version/ {print $2}' | cut -d. -f1)
if [ -z "$JAVA_VERSION" ] || [ "$JAVA_VERSION" -lt 11 ] 2>/dev/null; then
    echo "❌ ERRO FATAL — Step 0: Java 11+ não encontrado"
    echo "   💡 Solução:"
    echo "      macOS  : brew install openjdk@17"
    echo "      Ubuntu : sudo apt install default-jdk"
    echo "      Windows: https://adoptium.net"
    exit 1
fi
echo "  ✅ eval Step 0c OK — Java $JAVA_VERSION detectado"
```

**EVAL 0d — Apache POI JARs (download automático se ausentes):**
```bash
POI_VERSION="5.3.0"
POI_DIR="${TMP_DIR}/poi_jars"
mkdir -p "$POI_DIR"

JARS=(
    "poi-${POI_VERSION}.jar|https://repo1.maven.org/maven2/org/apache/poi/poi/${POI_VERSION}/poi-${POI_VERSION}.jar"
    "poi-ooxml-${POI_VERSION}.jar|https://repo1.maven.org/maven2/org/apache/poi/poi-ooxml/${POI_VERSION}/poi-ooxml-${POI_VERSION}.jar"
    "poi-ooxml-full-${POI_VERSION}.jar|https://repo1.maven.org/maven2/org/apache/poi/poi-ooxml-full/${POI_VERSION}/poi-ooxml-full-${POI_VERSION}.jar"
    "xmlbeans-5.2.1.jar|https://repo1.maven.org/maven2/org/apache/xmlbeans/xmlbeans/5.2.1/xmlbeans-5.2.1.jar"
    "commons-collections4-4.4.jar|https://repo1.maven.org/maven2/org/apache/commons/commons-collections4/4.4/commons-collections4-4.4.jar"
    "commons-compress-1.26.1.jar|https://repo1.maven.org/maven2/org/apache/commons/commons-compress/1.26.1/commons-compress-1.26.1.jar"
    "log4j-api-2.23.1.jar|https://repo1.maven.org/maven2/org/apache/logging/log4j/log4j-api/2.23.1/log4j-api-2.23.1.jar"
    "log4j-core-2.23.1.jar|https://repo1.maven.org/maven2/org/apache/logging/log4j/log4j-core/2.23.1/log4j-core-2.23.1.jar"
)

for entry in "${JARS[@]}"; do
    jar_name="${entry%%|*}"
    jar_url="${entry##*|}"
    jar_path="${POI_DIR}/${jar_name}"
    if [ ! -f "$jar_path" ]; then
        echo "  🟢 INFO: Baixando ${jar_name}..."
        curl -sSL "$jar_url" -o "$jar_path" || {
            echo "❌ ERRO FATAL — Step 0: Falha ao baixar ${jar_name}"
            echo "   💡 Verifique conexão com Maven Central: repo1.maven.org"
            exit 1
        }
    fi
done

CLASSPATH=$(ls "${POI_DIR}"/*.jar | tr '\n' ':')
echo "  ✅ eval Step 0d OK — ${#JARS[@]} JARs do Apache POI disponíveis"
```

---

### Step 1: Extração de Texto (python-pptx)

**Gauge:** `[████░░░░░░░░░░░░░░░░] 14% - Step 1/7: Extraindo texto dos slides...`

**Objective:** Extract all text, metadata, shapes, and speaker notes.

**Actions:** Generate and execute the extraction script:

```bash
cat > "${TMP_DIR}/extract_text.py" << 'PYEOF'
#!/usr/bin/env python3
import json, sys, os
from pathlib import Path

def slide_gauge(i, total, label):
    pct = int(i / total * 100)
    filled = int(i / total * 15)
    bar = '█' * filled + '░' * (15 - filled)
    print(f"\r  slide {i:02d}/{total:02d}  [{bar}] {pct:3d}%  {label}", end='', flush=True)

def extract(pptx_path, output_path):
    from pptx import Presentation
    from pptx.enum.shapes import PP_PLACEHOLDER

    prs = Presentation(pptx_path)
    props = prs.core_properties
    n = len(prs.slides)

    metadata = {
        "title": props.title or "",
        "author": props.author or "",
        "company": getattr(props, 'company', '') or "",
        "created": str(props.created) if props.created else "",
        "modified": str(props.modified) if props.modified else "",
        "slide_count": n
    }

    slides = []
    warnings = []

    for i, slide in enumerate(prs.slides, 1):
        slide_gauge(i, n, "Extraindo texto e shapes...")
        s = {"number": i, "title": "", "content": [], "shapes": [], "notes": "", "warnings": []}

        try:
            if slide.shapes.title and slide.shapes.title.has_text_frame:
                s["title"] = slide.shapes.title.text.strip()

            for shape in slide.shapes:
                try:
                    if shape.has_text_frame:
                        for para in shape.text_frame.paragraphs:
                            text = para.text.strip()
                            if text and text != s["title"]:
                                s["content"].append(text)
                    if shape.shape_type == 13:  # MSO_SHAPE_TYPE.PICTURE
                        s["shapes"].append({"type": "image", "name": shape.name, "alt": getattr(shape, 'alt_text', '') or ''})
                    elif shape.shape_type == 3:  # CHART
                        s["shapes"].append({"type": "chart", "name": shape.name})
                    elif shape.shape_type == 19:  # TABLE
                        if shape.has_table:
                            rows = [[cell.text.strip() for cell in row.cells] for row in shape.table.rows]
                            s["shapes"].append({"type": "table", "rows": rows})
                except Exception as e:
                    s["warnings"].append(f"shape '{getattr(shape,'name','?')}': {str(e)}")

            if slide.has_notes_slide:
                notes = slide.notes_slide.notes_text_frame.text.strip()
                if notes:
                    s["notes"] = notes

        except Exception as e:
            s["warnings"].append(f"slide parse error: {str(e)}")
            warnings.append(f"Slide {i}: {str(e)}")

        slides.append(s)

    print()  # newline after gauge

    result = {"metadata": metadata, "slides": slides, "global_warnings": warnings}
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(result, f, ensure_ascii=False, indent=2)

    return n, warnings

n_slides, warns = extract(sys.argv[1], sys.argv[2])
print(f"  RESULT:{n_slides}:{len(warns)}")
PYEOF

python3 "${TMP_DIR}/extract_text.py" "$PPTX_FILE" "${TMP_DIR}/text_pass.json"
```

**EVAL 1 — JSON válido com N slides:**
```bash
N_SLIDES=$(python3 -c "import json; d=json.load(open('${TMP_DIR}/text_pass.json')); print(d['metadata']['slide_count'])" 2>/dev/null)
if [ -z "$N_SLIDES" ] || [ "$N_SLIDES" -eq 0 ]; then
    echo "❌ ERRO FATAL — Step 1: text_pass.json inválido ou vazio"
    echo "   💡 Verifique se o arquivo .pptx não está corrompido"
    rm -rf "$TMP_DIR"
    exit 1
fi
echo "  ✅ eval Step 1 OK — $N_SLIDES slides extraídos"
```

---

### Step 2a: Renderização de Slides (Apache POI)

**Gauge:** `[████████░░░░░░░░░░░░] 29% - Step 2/7: Renderizando slides com Apache POI...`

**Objective:** Render each slide as a high-fidelity PNG using the bundled `render_slides.java`.

**Actions:**

```bash
# Copy render_slides.java to tmp dir and compile
SKILL_SCRIPTS_DIR="$(dirname "$0")/../scripts"
cp "${SKILL_SCRIPTS_DIR}/render_slides.java" "${TMP_DIR}/RenderSlides.java"

javac -cp "$CLASSPATH" "${TMP_DIR}/RenderSlides.java" -d "${TMP_DIR}" 2>&1
if [ $? -ne 0 ]; then
    echo "❌ ERRO FATAL — Step 2a: Falha na compilação do RenderSlides.java"
    echo "   💡 Verifique se o Java JDK (não apenas JRE) está instalado"
    rm -rf "$TMP_DIR"
    exit 1
fi

# Execute rendering with per-slide gauge printed by Java
java -cp "${TMP_DIR}:${CLASSPATH}" RenderSlides "$PPTX_FILE" "$SLIDES_DIR" "$N_SLIDES"
```

**EVAL 2a — PNGs gerados:**
```bash
PNG_COUNT=$(ls "${SLIDES_DIR}"/slide_*.png 2>/dev/null | wc -l | tr -d ' ')
if [ "$PNG_COUNT" -eq 0 ]; then
    echo "❌ ERRO FATAL — Step 2a: Nenhum PNG gerado"
    rm -rf "$TMP_DIR"
    exit 1
elif [ "$PNG_COUNT" -lt "$N_SLIDES" ]; then
    echo "  ⚠️  WARN Step 2a: $PNG_COUNT/$N_SLIDES PNGs gerados (parcial)"
else
    echo "  ✅ eval Step 2a OK — $PNG_COUNT/$N_SLIDES PNGs gerados"
fi

# Check for blank slides (< 5KB)
BLANK_COUNT=0
for png in "${SLIDES_DIR}"/slide_*.png; do
    size=$(wc -c < "$png")
    [ "$size" -lt 5120 ] && BLANK_COUNT=$((BLANK_COUNT + 1))
done
[ "$BLANK_COUNT" -gt 0 ] && echo "  ⚠️  WARN Step 2a: $BLANK_COUNT slides possivelmente em branco (< 5KB)"
```

---

### Step 2b: Análise Visual Explícita (Visão IA — 1ª passada)

**Gauge:** `[████████████░░░░░░░░] 43% - Step 3/7: Análise visual explícita...`

**Objective:** For each slide PNG, analyze **explicitly visible content** that may not have been captured by python-pptx.

**Actions:**

For each file `slide_001.png` through `slide_NNN.png` in `SLIDES_DIR`:

1. Print slide gauge: `slide NN/NN  [███░░░░░░░░░░░░] XX%  Analisando (explícito)...`
2. Read the image and analyze it, focusing on:
   - Text rendered as images (WordArt, stylized fonts, text inside photos)
   - Visual layout: number of columns, content zones, reading order
   - Icons, badges, logos, symbols and their labels
   - Any text not captured in the python-pptx pass
3. Record findings as structured JSON entry

Build `visual_explicit.json` with structure:
```json
{
  "slides": [
    {
      "number": 1,
      "extra_text": ["WordArt title text", "badge label"],
      "layout": "two-column with header",
      "icons": ["checkmark", "arrow-right"],
      "observations": "Slide uses a before/after comparison layout"
    }
  ]
}
```

Save to `${TMP_DIR}/visual_explicit.json`.

**EVAL 2b:**
```bash
EXPLICIT_COUNT=$(python3 -c "import json; d=json.load(open('${TMP_DIR}/visual_explicit.json')); print(len(d['slides']))" 2>/dev/null)
if [ "$EXPLICIT_COUNT" -lt "$PNG_COUNT" ]; then
    echo "  ⚠️  WARN Step 2b: Análise explícita parcial ($EXPLICIT_COUNT/$PNG_COUNT slides)"
else
    echo "  ✅ eval Step 2b OK — $EXPLICIT_COUNT slides analisados (explícito)"
fi
```

---

### Step 2c: Análise Visual Implícita (Visão IA — 2ª passada)

**Gauge:** `[████████████████░░░░] 57% - Step 4/7: Análise visual implícita...`

**Objective:** For each slide PNG, analyze **semantic and implicit content** — what the visuals *mean*, not just what they show.

**Actions:**

For each slide PNG:

1. Print slide gauge: `slide NN/NN  [███░░░░░░░░░░░░] XX%  Analisando (implícito)...`
2. Read the image and analyze deeply, focusing on:
   - **Charts:** type (bar/line/pie/scatter), axes labels, trend direction, approximate key values, what insight it communicates
   - **Timelines/Gantt:** phases, milestones, dates, durations, dependencies
   - **Process/flow diagrams:** nodes, connections, decision points, flow direction
   - **Complex tables:** headers, key data points, patterns visible
   - **Images/photos:** describe content and its relevance to the slide topic
   - **Color semantics:** what the color coding signals (red=risk, green=done, etc.)
   - **Spatial relationships:** what the layout arrangement communicates (hierarchy, comparison, progression)
3. Record findings as structured JSON entry

Build `visual_implicit.json` with structure:
```json
{
  "slides": [
    {
      "number": 3,
      "charts": [{"type": "bar", "insight": "Q3 revenue 40% above Q2, strongest growth in APAC"}],
      "timelines": [],
      "diagrams": [],
      "tables": [],
      "images": [],
      "color_semantics": "Red bars indicate below-target, green above-target",
      "spatial_meaning": "Left-to-right progression shows quarterly growth trajectory"
    }
  ]
}
```

Save to `${TMP_DIR}/visual_implicit.json`.

**EVAL 2c:**
```bash
IMPLICIT_COUNT=$(python3 -c "import json; d=json.load(open('${TMP_DIR}/visual_implicit.json')); print(len(d['slides']))" 2>/dev/null)
if [ "$IMPLICIT_COUNT" -lt "$PNG_COUNT" ]; then
    echo "  ⚠️  WARN Step 2c: Análise implícita parcial ($IMPLICIT_COUNT/$PNG_COUNT slides)"
else
    echo "  ✅ eval Step 2c OK — $IMPLICIT_COUNT slides analisados (implícito)"
fi
```

---

### Step 3: Enriquecimento e Geração do Markdown

**Gauge:** `[████████████████████] 71% - Step 5/7: Gerando Markdown enriquecido...`

**Objective:** Combine all three data sources into a single, rich Markdown document.

**Actions:** Generate the final Markdown using this Python script:

```bash
cat > "${TMP_DIR}/generate_md.py" << 'PYEOF'
#!/usr/bin/env python3
import json, sys
from pathlib import Path

def build_markdown(text_json, explicit_json, implicit_json, output_path):
    text_data = json.load(open(text_json, encoding='utf-8'))
    explicit_data = json.load(open(explicit_json, encoding='utf-8'))
    implicit_data = json.load(open(implicit_json, encoding='utf-8'))

    meta = text_data["metadata"]
    slides_text = {s["number"]: s for s in text_data["slides"]}
    slides_exp = {s["number"]: s for s in explicit_data.get("slides", [])}
    slides_imp = {s["number"]: s for s in implicit_data.get("slides", [])}
    n = meta["slide_count"]

    lines = []

    # ── Header ─────────────────────────────────────────────────────────────
    title = meta.get("title") or Path(output_path).stem.replace("-", " ").title()
    lines += [f"# {title}", ""]
    if meta.get("author"):
        lines.append(f"> **Autor:** {meta['author']}")
    if meta.get("company"):
        lines.append(f"> **Empresa:** {meta['company']}")
    if meta.get("created"):
        lines.append(f"> **Criado em:** {meta['created'][:10]}")
    lines += [f"> **Slides:** {n}", ""]

    # ── Table of Contents ──────────────────────────────────────────────────
    lines += ["## 📋 Índice", ""]
    for i in range(1, n + 1):
        s = slides_text.get(i, {})
        title_text = s.get("title") or f"Slide {i}"
        anchor = title_text.lower().replace(" ", "-").replace("/", "")
        lines.append(f"- [Slide {i} — {title_text}](#{i}---{anchor})")
    lines += ["", "---", ""]

    # ── Slides ─────────────────────────────────────────────────────────────
    word_count = 0
    for i in range(1, n + 1):
        st = slides_text.get(i, {})
        se = slides_exp.get(i, {})
        si = slides_imp.get(i, {})
        partial = bool(st.get("warnings") or not se or not si)

        title_text = st.get("title") or f"Slide {i}"
        lines += [f"## Slide {i} — {title_text}", ""]

        if partial:
            lines += ["> ⚠️ Análise parcial — alguns dados visuais indisponíveis", ""]

        # Textual content
        lines.append("### 📝 Conteúdo Textual")
        content = st.get("content", [])
        if content:
            lines.append("")
            for c in content:
                lines.append(f"- {c}")
                word_count += len(c.split())
        else:
            lines.append("")
            lines.append("_Nenhum texto explícito encontrado neste slide._")
        lines.append("")

        # Tables from shapes
        tables = [sh for sh in st.get("shapes", []) if sh.get("type") == "table"]
        if tables:
            lines.append("### 📊 Tabelas Estruturais")
            lines.append("")
            for t in tables:
                rows = t.get("rows", [])
                if rows:
                    headers = rows[0]
                    lines.append("| " + " | ".join(headers) + " |")
                    lines.append("| " + " | ".join(["---"] * len(headers)) + " |")
                    for row in rows[1:]:
                        lines.append("| " + " | ".join(row) + " |")
                    lines.append("")

        # Visual analysis
        has_visual = se or si
        if has_visual:
            lines.append("### 👁️ Análise Visual")
            lines.append("")

            # Explicit
            extra_text = se.get("extra_text", [])
            if extra_text:
                lines.append("**Conteúdo visual explícito:**")
                for t in extra_text:
                    lines.append(f"- {t}")
                lines.append("")
            layout = se.get("layout", "")
            if layout:
                lines.append(f"**Layout:** {layout}")
                lines.append("")
            icons = se.get("icons", [])
            if icons:
                lines.append(f"**Ícones/símbolos:** {', '.join(icons)}")
                lines.append("")
            obs = se.get("observations", "")
            if obs:
                lines.append(f"**Observação:** {obs}")
                lines.append("")

            # Implicit
            charts = si.get("charts", [])
            for c in charts:
                lines.append(f"**Gráfico ({c.get('type','')}):** {c.get('insight','')}")
                lines.append("")
            timelines = si.get("timelines", [])
            for t in timelines:
                lines.append(f"**Timeline:** {t}")
                lines.append("")
            diagrams = si.get("diagrams", [])
            for d in diagrams:
                lines.append(f"**Diagrama:** {d}")
                lines.append("")
            color_sem = si.get("color_semantics", "")
            if color_sem:
                lines.append(f"**Semântica de cores:** {color_sem}")
                lines.append("")
            spatial = si.get("spatial_meaning", "")
            if spatial:
                lines.append(f"**Significado espacial:** {spatial}")
                lines.append("")

        # Speaker notes
        notes = st.get("notes", "")
        if notes:
            lines += ["### 🗣️ Notas do Apresentador", "", f"> {notes}", ""]

        lines += ["---", ""]

    # ── Footer ─────────────────────────────────────────────────────────────
    lines += [
        "## 📌 Metadados",
        "",
        f"| Campo | Valor |",
        f"|-------|-------|",
        f"| Arquivo original | `{Path(output_path).stem}.pptx` |",
        f"| Total de slides | {n} |",
        f"| Palavras extraídas | {word_count:,} |",
        f"| Gerado por | pptx-to-markdown skill |",
        ""
    ]

    with open(output_path, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))

    return word_count

wc = build_markdown(sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4])
print(f"  RESULT:WORDS:{wc}")
PYEOF

OUTPUT_MD="${PPTX_DIR}/${STEM}.md"
python3 "${TMP_DIR}/generate_md.py" \
    "${TMP_DIR}/text_pass.json" \
    "${TMP_DIR}/visual_explicit.json" \
    "${TMP_DIR}/visual_implicit.json" \
    "$OUTPUT_MD"
```

**EVAL 3a — MD gerado:**
```bash
MD_SIZE=$(wc -c < "$OUTPUT_MD" 2>/dev/null || echo 0)
if [ "$MD_SIZE" -lt 500 ]; then
    echo "❌ ERRO FATAL — Step 3: Markdown gerado está vazio ou muito pequeno ($MD_SIZE bytes)"
    rm -rf "$TMP_DIR"
    exit 1
fi
echo "  ✅ eval Step 3a OK — Markdown gerado: $OUTPUT_MD ($MD_SIZE bytes)"
```

**EVAL 3b — Seções por slide:**
```bash
SECTION_COUNT=$(grep -c "^## Slide" "$OUTPUT_MD" 2>/dev/null || echo 0)
if [ "$SECTION_COUNT" -lt "$N_SLIDES" ]; then
    echo "  ⚠️  WARN Step 3b: $SECTION_COUNT/$N_SLIDES seções de slide no MD"
else
    echo "  ✅ eval Step 3b OK — $SECTION_COUNT seções de slide geradas"
fi
```

**EVAL 3c — Word count:**
```bash
WORD_COUNT=$(wc -w < "$OUTPUT_MD" 2>/dev/null || echo 0)
if [ "$WORD_COUNT" -lt 100 ]; then
    echo "  ⚠️  WARN Step 3c: Markdown com poucos termos ($WORD_COUNT palavras) — apresentação pode ser muito visual"
else
    echo "  ✅ eval Step 3c OK — $WORD_COUNT palavras no documento final"
fi
```

---

### Step 4: Limpeza

**Gauge:** `[████████████████████] 86% - Step 6/7: Removendo arquivos temporários...`

**Objective:** Remove all temporary files. Always runs, even if a previous step failed.

```bash
# Always runs inside finally block
rm -rf "$TMP_DIR"
echo "  ✅ Arquivos temporários removidos: $TMP_DIR"
```

**Gauge:** `[████████████████████] 100% - Step 7/7: Concluído ✅`

**Final summary:**
```bash
echo ""
echo "✅ pptx-to-markdown concluído!"
echo "   📄 Arquivo gerado      : $OUTPUT_MD"
echo "   🖼️  Slides processados : $N_SLIDES"
echo "   📝 Palavras extraídas  : $WORD_COUNT"
echo "   📏 Tamanho do MD       : $(du -h "$OUTPUT_MD" | cut -f1)"
if [ "$WARN_COUNT" -gt 0 ]; then
    echo "   ⚠️  Avisos acumulados  : $WARN_COUNT"
fi
echo "   🧹 Temporários removidos"
```

---

## Critical Rules

**NEVER:**
- NEVER leave the `.<stem>_tmp/` directory behind — cleanup runs in `finally` regardless of errors
- NEVER reference temporary PNG files in the final Markdown output
- NEVER skip the EVAL gates — each validation exists to catch silent failures
- NEVER proceed past Step 0 if Java is not available (it is a hard dependency)
- NEVER run `npm publish` or any publish command as part of this skill

**ALWAYS:**
- ALWAYS run cleanup (Step 4) even when an earlier step fails
- ALWAYS accumulate WARN-level issues and report them in the final summary
- ALWAYS write a `> ⚠️ Análise parcial` notice for slides that had errors during processing
- ALWAYS save `visual_explicit.json` and `visual_implicit.json` before the enrichment step
- ALWAYS print gauge updates so the user can follow progress

---

## Example Usage

**1. Convert a quarterly review deck:**
```
copilot> pptx to markdown: Q4-2025-review.pptx
claude> convert this presentation to markdown: Q4-2025-review.pptx
```

**2. Deep read a strategy presentation:**
```
copilot> deep read this pptx: product-strategy-2026.pptx
claude> use pptx-to-markdown on: ./decks/product-strategy-2026.pptx
```

**3. Extract charts and timelines from a roadmap:**
```
copilot> extract all content from: roadmap-H1-2026.pptx
claude> pptx to markdown: roadmap-H1-2026.pptx
```

**4. Convert a sales deck for knowledge base ingestion:**
```
copilot> convert this presentation to markdown: sales-deck-v3.pptx
claude> pptx to markdown: sales-deck-v3.pptx
```

**5. Process a conference presentation:**
```
copilot> extract all content from: keynote-devconf-2025.pptx
claude> deep read this pptx: keynote-devconf-2025.pptx
```
