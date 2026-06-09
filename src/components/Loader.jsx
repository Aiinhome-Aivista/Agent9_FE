import { Activity } from "lucide-react";

export default function Loader({ text = "Loading..." }) {
  return (
    <div className="ani" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: "12px", minHeight: "200px" }}>
      <Activity size={24} className="spin" style={{ color: "var(--am)" }} />
      <div style={{ color: "var(--t2)", fontSize: "13px" }}>{text}</div>
    </div>
  );
}
