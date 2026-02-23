import { useState } from "react";
import * as XLSX from "xlsx";

const CATEGORIES = {
  Accuracy: ["Addition", "Omission", "Incorrect Meaning", "Numbers"],
  Compliance: ["Glossary not used"],
  Language: ["Punctuation", "Spelling/Typos", "Grammar/Syntax"],
  Style: ["Wrong register", "Inappropriate formality", "Unidiomatic usage", "Cultural reference not adapted"],
  Terminology: ["Inconsistent terminology"],
};

const SEVERITIES = [
  { label: "Critical", points: 25, color: "#e05c2a", bg: "rgba(224,92,42,0.12)" },
  { label: "Major", points: 5, color: "#e8a838", bg: "rgba(232,168,56,0.12)" },
  { label: "Minor", points: 1, color: "#c8b98a", bg: "rgba(200,185,138,0.12)" },
];

const THRESHOLD = 98;

const categoryColors = {
  Accuracy: "#e05c2a",
  Compliance: "#e8a838",
  Language: "#c8b98a",
  Style: "#a0785a",
  Terminology: "#d4956a",
};

const css = {
  app: { minHeight: "100vh", width: "100%", boxSizing: "border-box", background: "#1a1510", color: "#e8dcc8", fontFamily: "'Georgia', 'Times New Roman', serif", padding: "24px 32px" },
  card: { background: "#221c14", border: "1px solid #3a2e1e", borderRadius: 12, padding: 20, marginBottom: 20, width: "100%", boxSizing: "border-box" },
  label: { fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: "#7a6040", marginBottom: 6, display: "block", fontFamily: "'Helvetica Neue', Arial, sans-serif" },
  input: { background: "#1a1510", border: "1px solid #3a2e1e", borderRadius: 8, color: "#e8dcc8", padding: "8px 12px", fontSize: 13, width: "100%", boxSizing: "border-box", outline: "none", fontFamily: "'Helvetica Neue', Arial, sans-serif" },
  textarea: { background: "#1a1510", border: "1px solid #3a2e1e", borderRadius: 8, color: "#e8dcc8", padding: "10px 12px", fontSize: 13, width: "100%", boxSizing: "border-box", resize: "vertical", outline: "none", minHeight: 70, fontFamily: "'Helvetica Neue', Arial, sans-serif" },
  select: { background: "#1a1510", border: "1px solid #3a2e1e", borderRadius: 8, color: "#e8dcc8", padding: "8px 12px", fontSize: 13, outline: "none", width: "100%", boxSizing: "border-box", fontFamily: "'Helvetica Neue', Arial, sans-serif" },
  btn: { background: "linear-gradient(135deg, #b8620a, #e8a838)", color: "#1a1510", border: "none", borderRadius: 8, padding: "9px 20px", fontWeight: 800, fontSize: 13, cursor: "pointer", fontFamily: "'Helvetica Neue', Arial, sans-serif", letterSpacing: 0.5 },
  btnGhost: { background: "transparent", color: "#7a6040", border: "1px solid #3a2e1e", borderRadius: 8, padding: "8px 16px", fontWeight: 600, fontSize: 12, cursor: "pointer", fontFamily: "'Helvetica Neue', Arial, sans-serif" },
  btnGreen: { background: "linear-gradient(135deg, #3a6b2a, #5a9a3a)", color: "#e8dcc8", border: "none", borderRadius: 8, padding: "9px 20px", fontWeight: 800, fontSize: 13, cursor: "pointer", fontFamily: "'Helvetica Neue', Arial, sans-serif", letterSpacing: 0.5 },
};

function Badge({ severity }) {
  const s = SEVERITIES.find(x => x.label === severity);
  return (
    <span style={{ background: s.bg, color: s.color, border: `1px solid ${s.color}`, borderRadius: 4, padding: "2px 8px", fontSize: 11, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", whiteSpace: "nowrap", fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>
      {severity} -{s.points}
    </span>
  );
}

function countWords(text) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function calcScore(errors, wordCount) {
  if (wordCount === 0) return 100;
  const penalty = errors.reduce((sum, e) => {
    const s = SEVERITIES.find(x => x.label === e.severity);
    return sum + (s ? s.points : 0);
  }, 0);
  return Math.round(Math.max(0, 100 - (penalty / wordCount) * 100) * 100) / 100;
}

function Spots() {
  const spots = [
    { top: 40, right: 80, size: 38 }, { top: 90, right: 30, size: 22 },
    { top: 20, right: 140, size: 18 }, { top: 130, right: 90, size: 28 },
    { top: 60, right: 190, size: 16 },
  ];
  return (
    <div style={{ position: "fixed", top: 0, right: 0, pointerEvents: "none", opacity: 0.06, zIndex: 0 }}>
      {spots.map((s, i) => (
        <div key={i} style={{ position: "absolute", top: s.top, right: s.right, width: s.size, height: s.size * 1.2, background: "#e8a838", borderRadius: "40% 60% 55% 45%", transform: `rotate(${i * 23}deg)` }} />
      ))}
    </div>
  );
}

export default function MQMScorer() {
  const [meta, setMeta] = useState({ project: "", langPair: "", wordCount: "" });
  const [errors, setErrors] = useState([]);
  const [form, setForm] = useState({ source: "", target: "", revised: "", category: "Accuracy", subcategory: "Addition", severity: "Major", comment: "" });

  const fileWordCount = parseInt(meta.wordCount) || 0;
  const score = calcScore(errors, fileWordCount);
  const pass = score >= THRESHOLD;

  const addError = () => {
    if (!form.source.trim() && !form.target.trim()) return;
    setErrors(prev => [...prev, { ...form, id: Date.now() }]);
    setForm(f => ({ ...f, source: "", target: "", revised: "", comment: "" }));
  };

  const removeError = id => setErrors(prev => prev.filter(e => e.id !== id));

  const exportExcel = () => {
    const date = new Date().toLocaleDateString("en-GB");

    // Summary sheet
    const categoryCounts = {};
    Object.keys(CATEGORIES).forEach(c => {
      SEVERITIES.forEach(s => { categoryCounts[`${c}_${s.label}`] = 0; });
    });
    errors.forEach(e => { categoryCounts[`${e.category}_${e.severity}`] = (categoryCounts[`${e.category}_${e.severity}`] || 0) + 1; });

    const summaryData = [
      ["LQA REPORT"],
      ["Project", meta.project, "", "Date", date],
      ["Language Pair", meta.langPair, "", "Reviewer", meta.reviewer],
      ["File", meta.file, "", "Word Count", wordCount],
      ["File Word Count", fileWordCount, "", "Result", pass ? "PASS" : "FAIL"],
      [],
      ["Category", "Critical (25pts)", "Major (5pts)", "Minor (1pt)", "Total Errors", "Total Penalty"],
      ...Object.keys(CATEGORIES).map(cat => {
        const crit = errors.filter(e => e.category === cat && e.severity === "Critical").length;
        const maj = errors.filter(e => e.category === cat && e.severity === "Major").length;
        const min = errors.filter(e => e.category === cat && e.severity === "Minor").length;
        const total = crit + maj + min;
        const penalty = crit * 25 + maj * 5 + min * 1;
        return [cat, crit, maj, min, total, penalty];
      }),
      ["Total",
        errors.filter(e => e.severity === "Critical").length,
        errors.filter(e => e.severity === "Major").length,
        errors.filter(e => e.severity === "Minor").length,
        errors.length,
        errors.reduce((s, e) => s + (SEVERITIES.find(x => x.label === e.severity)?.points || 0), 0)
      ],
    ];

    // Errors sheet
    const errorData = [
      ["#", "Source", "Target (as received)", "Revised (correct)", "Category", "Subcategory", "Severity", "Penalty", "Comment"],
      ...errors.map((e, i) => [
        i + 1,
        e.source,
        e.target,
        e.revised,
        e.category,
        e.subcategory,
        e.severity,
        SEVERITIES.find(x => x.label === e.severity)?.points || 0,
        e.comment,
      ]),
    ];

    const wb = XLSX.utils.book_new();
    const wsSummary = XLSX.utils.aoa_to_sheet(summaryData);
    const wsErrors = XLSX.utils.aoa_to_sheet(errorData);

    wsSummary["!cols"] = [{ wch: 20 }, { wch: 20 }, { wch: 5 }, { wch: 15 }, { wch: 20 }];
    wsErrors["!cols"] = [{ wch: 4 }, { wch: 30 }, { wch: 30 }, { wch: 30 }, { wch: 14 }, { wch: 18 }, { wch: 10 }, { wch: 8 }, { wch: 30 }];

    XLSX.utils.book_append_sheet(wb, wsSummary, "Summary");
    XLSX.utils.book_append_sheet(wb, wsErrors, "Error Log");

    const filename = `LQA_Report_${meta.project || "project"}_${date.replace(/\//g, "-")}.xlsx`;
    XLSX.writeFile(wb, filename);
  };

  const groupedErrors = Object.keys(CATEGORIES).map(cat => ({
    cat, items: errors.filter(e => e.category === cat),
  })).filter(g => g.items.length > 0);

  return (
    <div style={css.app}>
      <Spots />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ marginBottom: 28, display: "flex", alignItems: "flex-end", gap: 16 }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800, letterSpacing: -0.5, fontFamily: "Georgia, serif" }}>
              <span style={{ background: "linear-gradient(135deg, #e8a838, #e05c2a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>MQM</span>
              <span style={{ color: "#e8dcc8" }}> Error Scorer</span>
            </h1>
            <p style={{ margin: "4px 0 0", color: "#7a6040", fontSize: 13, fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>Multidimensional Quality Metrics evaluation with weighted error scoring</p>
          </div>
          <div style={{ fontSize: 28, marginBottom: 4 }}>🦒</div>
        </div>

        <div style={css.card}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#c8a870", marginBottom: 14, fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>Project Info</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            {[["project", "Project name"], ["langPair", "Language pair"], ["wordCount", "Total word count of file"]].map(([key, lbl]) => (
              <div key={key}>
                <label style={css.label}>{lbl}</label>
                <input style={css.input} placeholder={lbl} value={meta[key]} onChange={e => setMeta(m => ({ ...m, [key]: e.target.value }))} />
              </div>
            ))}
          </div>
        </div>

        <div style={css.card}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#c8a870", marginBottom: 14, fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>Add Error</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 12 }}>
            <div>
              <label style={css.label}>Source</label>
              <textarea style={css.textarea} placeholder="Source segment..." value={form.source} onChange={e => setForm(f => ({ ...f, source: e.target.value }))} />
            </div>
            <div>
              <label style={css.label}>Target (as received)</label>
              <textarea style={css.textarea} placeholder="Translation as received..." value={form.target} onChange={e => setForm(f => ({ ...f, target: e.target.value }))} />
            </div>
            <div>
              <label style={css.label}>Revised (correct version)</label>
              <textarea style={css.textarea} placeholder="How it should read..." value={form.revised} onChange={e => setForm(f => ({ ...f, revised: e.target.value }))} />
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12, marginBottom: 14 }}>
            <div>
              <label style={css.label}>Category</label>
              <select style={css.select} value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value, subcategory: CATEGORIES[e.target.value][0] }))}>
                {Object.keys(CATEGORIES).map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={css.label}>Subcategory</label>
              <select style={css.select} value={form.subcategory} onChange={e => setForm(f => ({ ...f, subcategory: e.target.value }))}>
                {CATEGORIES[form.category].map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={css.label}>Severity</label>
              <select style={css.select} value={form.severity} onChange={e => setForm(f => ({ ...f, severity: e.target.value }))}>
                {SEVERITIES.map(s => <option key={s.label} value={s.label}>{s.label} ({s.points} pts)</option>)}
              </select>
            </div>
            <div>
              <label style={css.label}>Comment</label>
              <input style={css.input} placeholder="Optional note..." value={form.comment} onChange={e => setForm(f => ({ ...f, comment: e.target.value }))} />
            </div>
          </div>
          <button style={css.btn} onClick={addError}>Add Error</button>
        </div>

        {errors.length > 0 && (
          <div style={css.card}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#c8a870", fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>Error Log ({errors.length})</div>
              <button style={css.btnGhost} onClick={() => setErrors([])}>Clear all</button>
            </div>
            {errors.map((e, i) => (
              <div key={e.id} style={{ padding: "12px 0", borderBottom: i < errors.length - 1 ? "1px solid #2e2418" : "none" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <span style={{ color: "#7a6040", fontSize: 12, fontFamily: "monospace", minWidth: 24 }}>#{i + 1}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", marginBottom: 8 }}>
                      <Badge severity={e.severity} />
                      <span style={{ fontSize: 12, color: categoryColors[e.category], fontWeight: 600, fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>{e.category}</span>
                      <span style={{ fontSize: 12, color: "#7a6040", fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>{e.subcategory}</span>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                      {[["Source", e.source, "#888"], ["Target", e.target, "#c8b98a"], ["Revised", e.revised, "#a8c878"]].map(([lbl, val, col]) => val ? (
                        <div key={lbl}>
                          <div style={{ fontSize: 10, color: "#7a6040", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 2, fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>{lbl}</div>
                          <div style={{ fontSize: 12, color: col, fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>{val}</div>
                        </div>
                      ) : null)}
                    </div>
                    {e.comment && <div style={{ fontSize: 12, color: "#7a6040", marginTop: 6, fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>{e.comment}</div>}
                  </div>
                  <button onClick={() => removeError(e.id)} style={{ background: "none", border: "none", color: "#5a4030", cursor: "pointer", fontSize: 18, padding: "0 4px" }}>×</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {errors.length > 0 && (
          <div style={css.card}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#c8a870", fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>Quality Report</div>
              <button style={css.btnGreen} onClick={exportExcel}>Export LQA Sheet (.xlsx)</button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
              {[
                { label: "File Words", val: fileWordCount || "—", color: "#c8b98a" },
                { label: "Total Errors", val: errors.length, color: "#e8a838" },
                { label: "Quality Score", val: `${score}`, color: pass ? "#a8c878" : "#e05c2a" },
                { label: "Result", val: pass ? "PASS" : "FAIL", color: pass ? "#a8c878" : "#e05c2a" },
              ].map(({ label, val, color }) => (
                <div key={label} style={{ background: "#1a1510", border: "1px solid #3a2e1e", borderRadius: 10, padding: "14px 12px", textAlign: "center" }}>
                  <div style={{ fontSize: 26, fontWeight: 800, color, fontFamily: "Georgia, serif" }}>{val}</div>
                  <div style={{ fontSize: 10, color: "#7a6040", fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", marginTop: 2, fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>{label}</div>
                </div>
              ))}
            </div>

            <div style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 12, color: "#7a6040", fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>0</span>
                <span style={{ fontSize: 12, color: "#7a6040", fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>Threshold: {THRESHOLD}</span>
                <span style={{ fontSize: 12, color: "#7a6040", fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>100</span>
              </div>
              <div style={{ background: "#1a1510", borderRadius: 8, height: 12, overflow: "hidden", border: "1px solid #3a2e1e" }}>
                <div style={{ width: `${score}%`, height: "100%", background: pass ? "linear-gradient(90deg, #b8620a, #e8a838)" : "linear-gradient(90deg, #7a1a0a, #e05c2a)", borderRadius: 8, transition: "width 0.5s" }} />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 16 }}>
              {SEVERITIES.map(s => {
                const count = errors.filter(e => e.severity === s.label).length;
                return (
                  <div key={s.label} style={{ background: s.bg, border: `1px solid ${s.color}33`, borderRadius: 8, padding: "10px 12px" }}>
                    <div style={{ fontSize: 18, fontWeight: 800, color: s.color, fontFamily: "Georgia, serif" }}>{count}</div>
                    <div style={{ fontSize: 11, color: s.color, fontWeight: 600, fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>{s.label}</div>
                    <div style={{ fontSize: 11, color: "#7a6040", fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>-{count * s.points} pts</div>
                  </div>
                );
              })}
            </div>

            {groupedErrors.length > 0 && (
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: "#7a6040", marginBottom: 10, fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>Errors by category</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {groupedErrors.map(({ cat, items }) => (
                    <div key={cat} style={{ background: "#1a1510", border: "1px solid #3a2e1e", borderRadius: 8, padding: "8px 14px", display: "flex", gap: 8, alignItems: "center" }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: categoryColors[cat], fontFamily: "Georgia, serif" }}>{items.length}</span>
                      <span style={{ fontSize: 12, color: "#7a6040", fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>{cat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}