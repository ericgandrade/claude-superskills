#!/usr/bin/env python3
"""Aggregate scorecards and run the pre-registered superiority test.

Implements methodology.md §5 (profiles, sensitivity), §7 (reconciliation,
uncertainty, Krippendorff alpha), §8 (risk-adjusted scores) and §9
(superiority test). Reads the machine-readable JSON block of every
scorecard under scores/<scorer>/<method>.md. Optional audit overrides in
audit/adjustments.json are applied before the test (S6).

Usage: python3 aggregate.py [--evaluated agentic-sdlc] [--out results.md]
"""
import argparse, glob, json, math, os, re, statistics
import numpy as np

HERE = os.path.dirname(os.path.abspath(__file__))
C = [f"C{i}" for i in range(1, 17)]
PROFILES = {
    "baseline": [6, 8, 9, 9, 8, 7, 4, 6, 5, 6, 6, 6, 6, 6, 4, 4],
    "equal": [6.25] * 16,
    "startup": [12, 6, 10, 8, 6, 7, 4, 8, 2, 2, 4, 5, 8, 10, 6, 2],
    "regulated": [3, 10, 7, 10, 9, 5, 2, 5, 10, 11, 9, 7, 3, 4, 1, 4],
    "autonomous": [4, 6, 7, 9, 8, 11, 9, 11, 4, 4, 5, 4, 9, 4, 3, 2],
}
UCONF = {"H": 0.25, "M": 0.5, "L": 1.0}
NAMES = {
    "superpowers": "Superpowers", "mattpocock": "Matt Pocock", "addyosmani": "Addy Osmani",
    "bmad": "BMad Method", "agile-v": "Agile V", "spec-kit": "GitHub Spec Kit",
    "kiro": "AWS Kiro", "ai-dlc": "AWS AI-DLC", "openspec": "OpenSpec",
    "agentic-sdlc": "Agentic SDLC (design)",
}


def load():
    cards = {}
    for path in sorted(glob.glob(os.path.join(HERE, "scores", "*", "*.md"))):
        text = open(path, encoding="utf-8").read()
        blocks = re.findall(r"```json\s*(\{.*?\})\s*```", text, re.S)
        if not blocks:
            raise SystemExit(f"no JSON block in {path}")
        data = json.loads(blocks[-1])
        slug = os.path.splitext(os.path.basename(path))[0]
        scorer = os.path.basename(os.path.dirname(path))
        cards.setdefault(slug, {})[scorer] = data
    return cards


def reconcile(entries, design):
    """entries: list of per-scorer dicts for one criterion -> (score, r, u, conf, D)."""
    vals = [e["s"] for e in entries]
    lo, hi = min(vals), max(vals)
    if hi - lo <= 1:
        s = lo
    else:
        s = math.floor(statistics.median(vals))
    confs = [e.get("conf", "L") for e in entries]
    conf = max(confs, key=lambda c: UCONF.get(c, 1.0))
    if hi - lo >= 2:
        conf = "L"
    elif hi - lo == 1 and conf == "H":
        conf = "M"
    u = max(UCONF.get(conf, 1.0), (hi - lo) / 2)
    r = min(e.get("r", 1.0) for e in entries) if design else 1.0
    score = s * r if design else s
    if design:
        u = math.sqrt(u ** 2 + ((1 - r) * s / 2) ** 2)
    return score, r, u, conf, s


def kripp_alpha_ordinal(units):
    """units: list of lists of ratings (values 0..5) per cell."""
    vals = sorted({v for u in units for v in u})
    if len(vals) < 2:
        return float("nan")
    idx = {v: i for i, v in enumerate(vals)}
    k = len(vals)
    o = np.zeros((k, k))
    for u in units:
        m = len(u)
        if m < 2:
            continue
        for i in range(m):
            for j in range(m):
                if i != j:
                    o[idx[u[i]], idx[u[j]]] += 1.0 / (m - 1)
    n_c = o.sum(axis=1)
    n = n_c.sum()

    def delta(c, kk):
        a, b = min(c, kk), max(c, kk)
        s = n_c[a:b + 1].sum() - (n_c[a] + n_c[b]) / 2
        return s ** 2

    d = np.array([[delta(c, kk) for kk in range(k)] for c in range(k)])
    do = (o * d).sum()
    de = (np.outer(n_c, n_c) * d).sum() / (n - 1)
    return 1 - do / de if de else float("nan")


def total(scores, w):
    return sum(wi * s / 5 for wi, s in zip(w, scores))


def utotal(us, w):
    return math.sqrt(sum((wi / 5 * u) ** 2 for wi, u in zip(w, us)))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--evaluated", default="agentic-sdlc")
    ap.add_argument("--out", default=os.path.join(HERE, "results.md"))
    ap.add_argument("--seed", type=int, default=20261120)
    a = ap.parse_args()
    cards = load()
    adj_path = os.path.join(HERE, "audit", "adjustments.json")
    adjustments = json.load(open(adj_path)) if os.path.exists(adj_path) else {}

    table, unc, meta, raw_pairs = {}, {}, {}, []
    for slug, by_scorer in cards.items():
        design = slug == a.evaluated
        row, urow, mrow = [], [], []
        for c in C:
            entries = [d["scores"][c] for d in by_scorer.values() if c in d.get("scores", {})]
            if not entries:
                raise SystemExit(f"{slug} missing {c}")
            if len(entries) >= 2:
                raw_pairs.append([e["s"] for e in entries])
            score, r, u, conf, s = reconcile(entries, design)
            ov = adjustments.get(slug, {}).get(c)
            if ov:  # audit override: {"s": int, "r": float, "conf": "H|M|L"}
                s = ov.get("s", s); r = ov.get("r", r); conf = ov.get("conf", conf)
                score = s * r if design else s
                u = UCONF[conf] if not design else math.sqrt(UCONF[conf] ** 2 + ((1 - r) * s / 2) ** 2)
            row.append(round(score, 2)); urow.append(u); mrow.append((s, r, conf))
        table[slug], unc[slug], meta[slug] = row, urow, mrow

    X = a.evaluated
    bench = [m for m in table if m != X]
    alpha = kripp_alpha_ordinal(raw_pairs)
    rng = np.random.default_rng(a.seed)
    out = []
    P = lambda s: out.append(s)

    P("# Scoring Results — Agentic Development Methods\n")
    P(f"Generated by `aggregate.py` (seed {a.seed}). Methodology frozen in `FREEZE.md`. "
      f"Scorecards: {sum(len(v) for v in cards.values())} from {len({s for v in cards.values() for s in v})} scorers. "
      f"Audit adjustments applied: {'yes' if adjustments else 'no'}.\n")

    # Criterion table
    P("## Reconciled scores (risk-adjusted for the design-only method)\n")
    P("| Method | " + " | ".join(C) + " |")
    P("|---|" + "---:|" * 16)
    order = sorted(table, key=lambda m: -total(table[m], PROFILES["baseline"]))
    for m in order:
        P(f"| {NAMES.get(m, m)} | " + " | ".join(f"{v:g}" for v in table[m]) + " |")
    med = [statistics.median(table[b][i] for b in bench) for i in range(16)]
    mx = [max(table[b][i] for b in bench) for i in range(16)]
    P("| *Benchmark median* | " + " | ".join(f"{v:g}" for v in med) + " |")
    P("| *Benchmark best* | " + " | ".join(f"{v:g}" for v in mx) + " |\n")

    # Profile totals
    P("## Weighted totals (0–100) by profile\n")
    P("| Method | " + " | ".join(PROFILES) + " | U (baseline) |")
    P("|---|" + "---:|" * (len(PROFILES) + 1))
    for m in order:
        P(f"| {NAMES.get(m, m)} | " + " | ".join(f"{total(table[m], w):.1f}" for w in PROFILES.values())
          + f" | ±{utotal(unc[m], PROFILES['baseline']):.1f} |")
    P("")
    if X in table:
        dtot = total([s for s, r, c in meta[X]], PROFILES["baseline"])
        P(f"Design total (before realization discount) for {NAMES[X]}: **{dtot:.1f}**; "
          f"risk-adjusted: **{total(table[X], PROFILES['baseline']):.1f}**; realization gap: {dtot - total(table[X], PROFILES['baseline']):.1f}.\n")

    if X not in table:
        P("_Evaluated method not scored; superiority test skipped._")
        open(a.out, "w").write("\n".join(out)); print("\n".join(out)); return

    # Superiority conditions
    res = {}
    def best_bench(w):
        return max(bench, key=lambda b: total(table[b], w))
    def margin(w, b):
        return max(5.0, 2 * math.sqrt(utotal(unc[X], w) ** 2 + utotal(unc[b], w) ** 2))
    wb = PROFILES["baseline"]; B = best_bench(wb)
    d1 = total(table[X], wb) - total(table[B], wb); m1 = margin(wb, B)
    res["S1"] = (d1 >= m1, f"X − best ({NAMES[B]}) = {d1:+.1f}; required margin M = {m1:.1f}")
    s2 = []
    ok2 = True
    for name in ["equal", "startup", "regulated", "autonomous"]:
        w = PROFILES[name]; b = best_bench(w); d = total(table[X], w) - total(table[b], w); mm = margin(w, b)
        ok = d >= mm; ok2 &= ok
        s2.append(f"{name}: {d:+.1f} vs M {mm:.1f} (best {NAMES[b]}) {'✓' if ok else '✗'}")
    res["S2"] = (ok2, "; ".join(s2))

    methods = list(table)
    S = np.array([table[m] for m in methods]); xi = methods.index(X)
    w0 = np.array(wb, dtype=float)
    def p_first(Wm):
        T = (S @ Wm.T) / 5
        return float((T.argmax(axis=0) == xi).mean())
    pc = p_first(rng.dirichlet(0.5 * w0, 10000) * 100)
    pu = p_first(rng.dirichlet(np.ones(16), 10000) * 100)
    U = np.array([unc[m] for m in methods])
    draws = S[None, :, :] + rng.uniform(-1, 1, (10000,) + S.shape) * U[None, :, :]
    T = (draws @ w0) / 5
    ps = float((T.argmax(axis=1) == xi).mean())
    loo_ok = True
    for i in range(16):
        w = w0.copy(); w[i] = 0; w = w / w.sum() * 100
        if int(((S @ w) / 5).argmax()) != xi:
            loo_ok = False
    res["S3"] = (pc >= 0.90 and pu >= 0.75 and ps >= 0.90 and loo_ok,
                 f"P(first) centred {pc:.2f} (≥0.90), uniform {pu:.2f} (≥0.75), score-perturbation {ps:.2f} (≥0.90); leave-one-out first in all: {loo_ok}")
    below = [C[i] for i in range(16) if table[X][i] < med[i]]
    res["S4"] = (not below, "below benchmark median on: " + (", ".join(below) if below else "none"))
    best = [C[i] for i in range(16) if table[X][i] >= mx[i] - 0.25]
    core = [c for c in best if c in C[1:6]]
    res["S5"] = (len(best) >= 6 and len(core) >= 3, f"best-or-tied on {len(best)} criteria ({', '.join(best) or 'none'}); core C2–C6: {len(core)}")
    res["S6"] = (bool(adjustments), "audit adjustments applied" if adjustments else "red-team audit not yet applied")
    res["S7"] = (alpha >= 0.667, f"Krippendorff's α (ordinal) = {alpha:.3f} over {len(raw_pairs)} paired cells")

    P("## Superiority test (§9)\n")
    P("| Condition | Holds | Detail |\n|---|:---:|---|")
    for k, (ok, det) in res.items():
        P(f"| {k} | {'✅' if ok else '❌'} | {det} |")
    hold = {k for k, (ok, _) in res.items() if ok}
    if hold >= {"S1", "S2", "S3", "S4", "S5", "S6", "S7"}:
        verdict = "Superior"
    elif {"S1", "S4", "S6", "S7"} <= hold:
        verdict = "Conditionally superior"
    elif abs(d1) < m1:
        verdict = "Comparable"
    else:
        verdict = "Not superior"
    P(f"\n**Verdict: {verdict}** (failed: {', '.join(sorted(set(res) - hold)) or 'none'})\n")

    P("## Gap analysis for the evaluated method\n")
    P("| Criterion | Evaluated (RA) | Design D × r | Benchmark median | Benchmark best (who) |\n|---|---:|---|---:|---|")
    for i, c in enumerate(C):
        who = ", ".join(NAMES[b] for b in bench if table[b][i] == mx[i])
        s, r, conf = meta[X][i]
        P(f"| {c} | {table[X][i]:g} | {s} × {r:g} ({conf}) | {med[i]:g} | {mx[i]:g} ({who}) |")
    open(a.out, "w").write("\n".join(out) + "\n")
    print("\n".join(out))


if __name__ == "__main__":
    main()
