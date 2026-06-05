export default function KGraphSVG({ policies }) {
  const cx = 290,
    cy = 175,
    r = 115;
  const colours = {
    Life: "var(--am)",
    Health: "var(--gr)",
    Motor: "var(--bl)",
    Property: "var(--pu)",
    Commercial: "var(--te)",
    Travel: "var(--rd)",
  };
  const angles = policies.map(
    (_, i) => (2 * Math.PI * i) / policies.length - Math.PI / 2,
  );
  const attr = [
    { l: "Age Group", x: 65, y: 55 },
    { l: "Income", x: 515, y: 55 },
    { l: "Life Events", x: 55, y: 295 },
    { l: "Behavior", x: 510, y: 295 },
    { l: "Location", x: 290, y: 335 },
  ];
  return (
    <svg
      viewBox="0 0 580 380"
      style={{ width: "100%", background: "var(--bg)", borderRadius: 12 }}
    >
      {[...Array(11)].map((_, i) => (
        <line
          key={`h${i}`}
          x1={0}
          y1={i * 35}
          x2={580}
          y2={i * 35}
          stroke="rgba(45,90,160,0.05)"
          strokeWidth={1}
        />
      ))}
      {[...Array(17)].map((_, i) => (
        <line
          key={`v${i}`}
          x1={i * 35}
          y1={0}
          x2={i * 35}
          y2={380}
          stroke="rgba(45,90,160,0.05)"
          strokeWidth={1}
        />
      ))}
      {attr.map((a, ai) =>
        policies
          .filter((_, pi) => (pi + ai) % 2 === 0)
          .map((p, pi) => {
            const px = cx + r * Math.cos(angles[policies.indexOf(p)]);
            const py = cy + r * Math.sin(angles[policies.indexOf(p)]);
            return (
              <line
                key={`al${ai}${pi}`}
                x1={a.x}
                y1={a.y}
                x2={px}
                y2={py}
                stroke="rgba(75,142,245,0.1)"
                strokeWidth={1}
                strokeDasharray="3,3"
              />
            );
          }),
      )}
      {policies.map((p, i) => {
        const px = cx + r * Math.cos(angles[i]);
        const py = cy + r * Math.sin(angles[i]);
        const c = colours[p.policy_type] || "var(--t3)";
        return (
          <line
            key={`pc${i}`}
            x1={cx}
            y1={cy}
            x2={px}
            y2={py}
            stroke={p.is_indexed ? c : "rgba(255,255,255,0.07)"}
            strokeWidth={p.is_indexed ? 1.5 : 1}
            strokeDasharray={p.is_indexed ? "none" : "4,4"}
            opacity={p.is_indexed ? 0.6 : 0.25}
          />
        );
      })}
      <circle
        cx={cx}
        cy={cy}
        r={36}
        fill="rgba(245,166,35,0.08)"
        stroke="var(--am)"
        strokeWidth={1.5}
      />
      <text
        x={cx}
        y={cy - 3}
        textAnchor="middle"
        fill="var(--am)"
        fontSize={9}
        fontWeight="700"
        fontFamily="Syne,sans-serif"
        letterSpacing="1"
      >
        POLICY
      </text>
      <text
        x={cx}
        y={cy + 10}
        textAnchor="middle"
        fill="var(--am)"
        fontSize={9}
        fontWeight="700"
        fontFamily="Syne,sans-serif"
        letterSpacing="1"
      >
        GRAPH
      </text>
      <text
        x={cx}
        y={cy + 24}
        textAnchor="middle"
        fill="var(--t3)"
        fontSize={8}
        fontFamily="JetBrains Mono,monospace"
      >
        {policies.filter((p) => p.is_indexed).length}/{policies.length} indexed
      </text>
      {policies.map((p, i) => {
        const px = cx + r * Math.cos(angles[i]);
        const py = cy + r * Math.sin(angles[i]);
        const c = colours[p.policy_type] || "var(--t3)";
        return (
          <g key={p.id}>
            <circle
              cx={px}
              cy={py}
              r={22}
              fill={`${c.slice(0, -1)},0.08)`}
              stroke={p.is_indexed ? c : "var(--bdr)"}
              strokeWidth={p.is_indexed ? 1.5 : 1}
              opacity={p.is_indexed ? 1 : 0.4}
            />
            <text
              x={px}
              y={py - 1}
              textAnchor="middle"
              fill={p.is_indexed ? c : "var(--t3)"}
              fontSize={7.5}
              fontWeight="700"
              fontFamily="Syne,sans-serif"
            >
              {(p.policy_type || "").toUpperCase()}
            </text>
            {p.is_indexed && (
              <circle cx={px + 14} cy={py - 14} r={5} fill="var(--gr)" />
            )}
          </g>
        );
      })}
      {attr.map((a) => (
        <g key={a.l}>
          <rect
            x={a.x - 28}
            y={a.y - 12}
            width={56}
            height={22}
            rx={4}
            fill="var(--card)"
            stroke="rgba(75,142,245,0.2)"
            strokeWidth={1}
          />
          <text
            x={a.x}
            y={a.y + 4}
            textAnchor="middle"
            fill="var(--bl)"
            fontSize={8}
            fontFamily="DM Sans,sans-serif"
            fontWeight="500"
          >
            {a.l}
          </text>
        </g>
      ))}
    </svg>
  );
}
