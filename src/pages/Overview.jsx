import { useState, useEffect } from "react";
import {
  Archive,
  BarChart2,
  Clock,
  Database,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";
import * as api from "../api.js";
import Err from "../components/Err";

export default function Overview({ setView }) {
  const [metrics, setMetrics] = useState(null);
  const [logs, setLogs] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    api
      .getDashboardMetrics()
      .then(setMetrics)
      .catch((e) => setErr(e.message));
    api
      .getLogs(null, 20)
      .then(setLogs)
      .catch(() => { });
  }, []);

  const M = metrics || {};
  const cards = [
    {
      label: "Total Prospects",
      value: M.total_prospects ?? "—",
      delta: `${M.new_policy_count ?? 0} new + ${M.renewal_count ?? 0} renewals`,
      cls: "am",
      Icon: TrendingUp,
    },
    {
      label: "Policies in KG",
      value: M.policies_indexed ?? "—",
      delta: "",
      cls: "te",
      Icon: Archive,
    },
    {
      label: "Critical Renewals",
      value: M.critical_renewals ?? "—",
      delta: `Avg propensity ${M.avg_propensity ?? 0}%`,
      cls: "bl",
      Icon: Clock,
    },
    {
      label: "Conversion Rate",
      value: `${M.conversion_rate ?? 0}%`,
      delta: `${M.active_campaigns ?? 0} active campaigns`,
      cls: "gr",
      Icon: BarChart2,
    },
  ];

  return (
    <div className="ani">
      <Err msg={err} />
      <div className="mc-g">
        {cards.map(({ label, value, delta, cls, Icon }) => (
          <div key={label} className={`mc-c ${cls}`}>
            <div className="mc-l">{label}</div>
            <div className="mc-v">{value}</div>
            <div className="mc-d">{delta}</div>
            <Icon size={42} className="mc-i" />
          </div>
        ))}
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 14,
          }}
        >
          <div>
            <div className="ct">Agent Activity Log</div>
            <div className="cs">Real-time pipeline events</div>
          </div>
        </div>
        {logs.length === 0 ? (
          <div
            style={{
              color: "var(--t3)",
              fontSize: 12,
              textAlign: "center",
              padding: "20px 0",
            }}
          >
            No logs yet
          </div>
        ) : (
          logs.map((l, i) => (
            <div
              key={i}
              className={`log-i ${l.event_type === "success" ? "log-s" : ""}`}
            >
              <span className="log-t">
                {new Date(l.created_at).toLocaleTimeString("en-IN", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
              <span className="log-a">{l.agent_name}</span>
              <span className="log-m">{l.message}</span>
            </div>
          ))
        )}
      </div>

      <div className="card">
        <div className="ct" style={{ marginBottom: 14 }}>
          Quick Navigation
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          {[
            {
              icon: Database,
              label: "Ingest Data",
              sub: "CSV / CRM",
              view: "connector",
              c: "var(--bl)",
            },
            {
              icon: Archive,
              label: "Policy Warehouse",
              sub: "Upload & Index",
              view: "policy",
              c: "var(--te)",
            },
            {
              icon: Target,
              label: "View Prospects",
              sub: "AI-Ranked List",
              view: "prospects",
              c: "var(--am)",
            },
            {
              icon: Zap,
              label: "Run Campaigns",
              sub: "Multi-channel",
              view: "campaigns",
              c: "var(--pu)",
            },
          ].map(({ icon: Icon, label, sub, view, c }) => (
            <div
              key={view}
              onClick={() => setView(view)}
              className="card"
              style={{
                flex: 1,
                cursor: "pointer",
                textAlign: "center",
                padding: "18px 12px",
              }}
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  background: `${c.slice(0, -1)},0.1)`,
                  border: `1px solid ${c.slice(0, -1)},0.3)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 10px",
                }}
              >
                <Icon size={17} style={{ color: c }} />
              </div>
              <div
                style={{
                  fontFamily: "var(--fd)",
                  fontSize: 13,
                  fontWeight: 700,
                  marginBottom: 3,
                }}
              >
                {label}
              </div>
              <div style={{ fontSize: 11, color: "var(--t3)" }}>{sub}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
