import { SEVERITIES } from "../data/taxonomy.js";

export default function Badge({ severity }) {
  const s = SEVERITIES.find(x => x.label === severity);
  return (
    <span style={{ background: s.bg, color: s.color, border: `1px solid ${s.color}`, borderRadius: 4, padding: "2px 8px", fontSize: 11, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", whiteSpace: "nowrap", fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>
      {severity} -{s.points}
    </span>
  );
}
