export default function ScoreBar({ v }) {
  const c =
    v >= 90
      ? "var(--gr)"
      : v >= 80
        ? "var(--am)"
        : v >= 70
          ? "var(--bl)"
          : "var(--t3)";
  return (
    <div className="sb2">
      <div className="sb2-bg">
        <div className="sb2-f" style={{ width: `${v}%`, background: c }} />
      </div>
      <span
        style={{
          fontFamily: "var(--fm)",
          fontSize: 12,
          color: c,
          minWidth: 32,
        }}
      >
        {v}%
      </span>
    </div>
  );
}
