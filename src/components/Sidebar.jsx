import { Activity, Archive, Database, Target, Zap } from "lucide-react";
import Dot from "./Dot";
import AgentBadge from "./AgentBadge";

const NAV = [
  { id: "overview", label: "Overview", Icon: Activity },
  {
    id: "connector",
    label: "Connector Agent",
    Icon: Database,
    agent: "connector",
  },
  {
    id: "policy",
    label: "Policy Warehouse",
    Icon: Archive,
    agent: "policyWarehouse",
  },
  {
    id: "prospects",
    label: "Prospect Agent",
    Icon: Target,
    agent: "prospectAgent",
  },
  // {
  //   id: "campaigns",
  //   label: "Campaign Execution",
  //   Icon: Zap,
  //   agent: "campaign",
  // },
];

const AGENTS = {
  connector: "active",
  policyWarehouse: "active",
  prospectAgent: "active",
  // campaign: "idle",
};

export default function Sidebar({ view, setView }) {
  return (
    <aside className="sb">
      <div className="sb-logo">
        <div className="lm">ARIES</div>
        <div className="lt">Agentic Revenue Intelligence</div>
      </div>
      <nav className="sb-nav">
        <div className="nlbl">Agents</div>
        {NAV.map(({ id, label, Icon, agent }) => (
          <div
            key={id}
            className={`ni ${view === id ? "act" : ""}`}
            onClick={() => setView(id)}
          >
            <Icon size={15} className="nic" />
            <span className="ntx">{label}</span>
            {agent && <Dot s={AGENTS[agent]} />}
          </div>
        ))}
      </nav>
      <div className="sb-ft">
        <div className="asp">
          <div className="aspt">Agent Status</div>
          {[
            ["Orchestrator", "active"],
            ["Connector", "active"],
            ["Policy WH", "active"],
            ["Prospect AI", "active"],
            // ["Campaign", "idle"],
          ].map(([n, s]) => (
            <div className="asr" key={n}>
              <Dot s={s} />
              <span className="asn">{n}</span>
              <AgentBadge s={s} />
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
