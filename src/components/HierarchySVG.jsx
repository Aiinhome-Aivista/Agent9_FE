export default function HierarchySVG() {
  const N = [
    {
      id: "orch",
      l: "ORCHESTRATOR",
      s: "Master planner",
      x: 235,
      y: 32,
      w: 152,
      c: "var(--am)",
    },
    {
      id: "con",
      l: "CONNECTOR",
      s: "Data ingestion",
      x: 44,
      y: 140,
      w: 114,
      c: "var(--bl)",
    },
    {
      id: "pol",
      l: "POLICY WH.",
      s: "Knowledge base",
      x: 188,
      y: 140,
      w: 114,
      c: "var(--te)",
    },
    {
      id: "pro",
      l: "PROSPECT",
      s: "AI ranking",
      x: 332,
      y: 140,
      w: 114,
      c: "var(--gr)",
    },
    {
      id: "cam",
      l: "CAMPAIGN",
      s: "Execution",
      x: 476,
      y: 140,
      w: 114,
      c: "var(--pu)",
    },
    {
      id: "csv",
      l: "CSV Parser",
      s: "Sub-agent",
      x: 20,
      y: 248,
      w: 90,
      c: "var(--t3)",
    },
    {
      id: "crm",
      l: "CRM Sync",
      s: "Sub-agent",
      x: 120,
      y: 248,
      w: 90,
      c: "var(--t3)",
    },
    {
      id: "kg",
      l: "KG Builder",
      s: "Sub-agent",
      x: 188,
      y: 248,
      w: 90,
      c: "var(--t3)",
    },
    {
      id: "vec",
      l: "Vector Index",
      s: "ChromaDB",
      x: 295,
      y: 248,
      w: 92,
      c: "var(--t3)",
    },
    {
      id: "mis",
      l: "Mistral LLM",
      s: "Ranker",
      x: 400,
      y: 248,
      w: 92,
      c: "var(--t3)",
    },
  ];
  const E = [
    ["orch", "con"],
    ["orch", "pol"],
    ["orch", "pro"],
    ["orch", "cam"],
    ["con", "csv"],
    ["con", "crm"],
    ["pol", "kg"],
    ["pol", "vec"],
    ["pro", "mis"],
  ];
  const find = (id) => N.find((n) => n.id === id);
  return (
    <svg viewBox="0 0 640 310" style={{ width: "100%" }}>
      <defs>
        <marker
          id="arr"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto-start-reverse"
        >
          <path
            d="M2 1L8 5L2 9"
            fill="none"
            stroke="rgba(45,90,160,0.5)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </marker>
      </defs>
      {E.map(([f, t], i) => {
        const fn = find(f),
          tn = find(t);
        return (
          <line
            key={i}
            x1={fn.x + fn.w / 2}
            y1={fn.y + 44}
            x2={tn.x + tn.w / 2}
            y2={tn.y}
            stroke="rgba(45,90,160,0.3)"
            strokeWidth={1.5}
            strokeDasharray="4,3"
            markerEnd="url(#arr)"
          />
        );
      })}
      {N.map((n) => (
        <g key={n.id}>
          <rect
            x={n.x}
            y={n.y}
            width={n.w}
            height={44}
            rx={6}
            fill={
              n.c === "var(--t3)" ? "var(--card)" : `${n.c.slice(0, -1)},0.08)`
            }
            stroke={
              n.c === "var(--t3)" ? "var(--bdr)" : `${n.c.slice(0, -1)},0.45)`
            }
            strokeWidth={1.5}
          />
          <text
            x={n.x + n.w / 2}
            y={n.y + 15}
            textAnchor="middle"
            fill={n.c === "var(--t3)" ? "var(--t3)" : n.c}
            fontSize={9}
            fontWeight="700"
            fontFamily="Syne,sans-serif"
            letterSpacing=".5"
          >
            {n.l}
          </text>
          <text
            x={n.x + n.w / 2}
            y={n.y + 31}
            textAnchor="middle"
            fill="var(--t3)"
            fontSize={8}
            fontFamily="DM Sans,sans-serif"
          >
            {n.s}
          </text>
          {n.c !== "var(--t3)" && n.id !== "orch" && (
            <circle cx={n.x + n.w - 9} cy={n.y + 9} r={4} fill="var(--gr)" />
          )}
        </g>
      ))}
    </svg>
  );
}
