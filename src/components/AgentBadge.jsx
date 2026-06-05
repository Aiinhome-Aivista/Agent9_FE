export default function AgentBadge({ s }) {
  const cls = { active: "ba", idle: "bi", processing: "bp" };
  const lbl = { active: "ACTIVE", idle: "IDLE", processing: "RUNNING" };
  return <span className={`asb ${cls[s] || "bi"}`}>{lbl[s] || "IDLE"}</span>;
}
