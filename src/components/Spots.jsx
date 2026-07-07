export default function Spots() {
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
