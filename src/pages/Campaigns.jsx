import { useState, useEffect } from "react";
import {
  Cpu,
  Play,
  Plus,
  X,
} from "lucide-react";
import * as api from "../api.js";
import Err from "../components/Err";
import Spinner from "../components/Spinner";
import Loader from "../components/Loader";

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [showNew, setShowNew] = useState(false);
  const [form, setForm] = useState({
    name: "",
    campaign_type: "new_policy",
    channel: "Email",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(true);
  const [messages, setMessages] = useState(null);
  const [err, setErr] = useState("");

  const load = (silent = false) => {
    if (!silent) setFetchingData(true);
    return api
      .listCampaigns()
      .then(setCampaigns)
      .catch(() => {})
      .finally(() => {
        if (!silent) setFetchingData(false);
      });
  };
  useEffect(() => {
    load();
    const interval = setInterval(() => load(true), 3000);
    return () => clearInterval(interval);
  }, []);

  const doCreate = async () => {
    setLoading(true);
    setErr("");
    try {
      await api.createCampaign(form);
      setShowNew(false);
      await load();
    } catch (e) {
      setErr(e.message);
    }
    setLoading(false);
  };

  const doLaunch = async (id) => {
    try {
      await api.launchCampaign(id);
      await load();
    } catch (e) {
      setErr(e.message);
    }
  };

  const doMessages = async (id) => {
    setLoading(true);
    try {
      const r = await api.generateCampaignMessages(id);
      setMessages(r);
    } catch (e) {
      setErr(e.message);
    }
    setLoading(false);
  };

  const total = campaigns.reduce(
    (s, c) => ({
      targets: s.targets + c.target_count,
      sent: s.sent + c.sent_count,
      open: s.open + c.opened_count,
      conv: s.conv + c.converted_count,
    }),
    { targets: 0, sent: 0, open: 0, conv: 0 },
  );

  return (
    <div className="ani">
      <div className="mc-g" style={{ marginBottom: 20 }}>
        {[
          ["Campaigns", campaigns.length, "var(--am)"],
          ["Targeted", total.targets, "var(--te)"],
          ["Sent", total.sent, "var(--bl)"],
          ["Converted", total.conv, "var(--gr)"],
        ].map(([l, v, c]) => (
          <div
            key={l}
            className="mc-c"
            style={{ borderColor: `${c.slice(0, -1)},0.2)` }}
          >
            <div className="mc-l">{l}</div>
            <div className="mc-v" style={{ color: c }}>
              {v}
            </div>
          </div>
        ))}
      </div>
      <Err msg={err} />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <div className="stl">Campaign Pipeline</div>
        <button className="btn bp2 bsm" onClick={() => setShowNew(!showNew)}>
          <Plus size={12} />
          New Campaign
        </button>
      </div>

      {showNew && (
        <div
          className="card ani"
          style={{ marginBottom: 16, borderColor: "var(--bdr-hi)" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 12,
            }}
          >
            <div className="ct">Create Campaign</div>
            <button className="btn bg2 bxs" onClick={() => setShowNew(false)}>
              <X size={12} />
            </button>
          </div>
          <div className="g2" style={{ gap: 12 }}>
            <div className="fg">
              <label className="fl">Campaign Name</label>
              <input
                className="fi"
                placeholder="Q2 Life Insurance Push"
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
              />
            </div>
            <div className="fg">
              <label className="fl">Type</label>
              <select
                className="fi"
                value={form.campaign_type}
                onChange={(e) =>
                  setForm((f) => ({ ...f, campaign_type: e.target.value }))
                }
              >
                {["new_policy", "renewal", "cross_sell", "retention"].map(
                  (t) => (
                    <option key={t}>{t}</option>
                  ),
                )}
              </select>
            </div>
            <div className="fg">
              <label className="fl">Channel</label>
              <select
                className="fi"
                value={form.channel}
                onChange={(e) =>
                  setForm((f) => ({ ...f, channel: e.target.value }))
                }
              >
                {[
                  "Email",
                  "WhatsApp",
                  "SMS",
                  "Phone Call",
                  "LinkedIn",
                  "App Push",
                ].map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="fg">
            <label className="fl">Description</label>
            <input
              className="fi"
              placeholder="Optional campaign description"
              value={form.description}
              onChange={(e) =>
                setForm((f) => ({ ...f, description: e.target.value }))
              }
            />
          </div>
          <button
            className="btn bp2"
            onClick={doCreate}
            disabled={loading || !form.name}
          >
            {loading ? <Spinner /> : <Plus size={13} />}
            {loading ? "Creating…" : "Create"}
          </button>
        </div>
      )}

      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        {fetchingData ? (
          <Loader text="Loading Campaigns..." />
        ) : campaigns.length === 0 ? (
          <div
            style={{
              padding: 32,
              textAlign: "center",
              color: "var(--t3)",
              fontSize: 12,
            }}
          >
            No campaigns yet.
          </div>
        ) : (
          campaigns.map((c) => (
            <div
              key={c.id}
              style={{
                background: "var(--bg)",
                borderBottom: "1px solid var(--bdr)",
                padding: "14px 18px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: 10,
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: "var(--fd)",
                      fontSize: 14,
                      fontWeight: 700,
                      marginBottom: 3,
                    }}
                  >
                    {c.name}
                  </div>
                  <div style={{ fontSize: 11, color: "var(--t3)" }}>
                    {c.channel} · {c.campaign_type}
                  </div>
                </div>
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  <span
                    style={{
                      fontSize: 11,
                      fontFamily: "var(--fm)",
                      padding: "3px 10px",
                      borderRadius: 4,
                      background:
                        c.status === "active"
                          ? "var(--grd)"
                          : c.status === "draft"
                            ? "var(--card)"
                            : "var(--amd)",
                      color:
                        c.status === "active"
                          ? "var(--gr)"
                          : c.status === "draft"
                            ? "var(--t3)"
                            : "var(--am)",
                    }}
                  >
                    {c.status.toUpperCase()}
                  </span>
                  {c.status === "draft" && (
                    <button
                      className="btn bp2 bxs"
                      onClick={() => doLaunch(c.id)}
                    >
                      <Play size={10} />
                      Launch
                    </button>
                  )}
                  <button
                    className="btn bg2 bxs"
                    onClick={() => doMessages(c.id)}
                    disabled={loading}
                  >
                    <Cpu size={10} />
                  </button>
                </div>
              </div>
              <div style={{ display: "flex", gap: 20 }}>
                {[
                  ["Targets", c.target_count, "var(--t2)"],
                  ["Sent", c.sent_count, "var(--bl)"],
                  ["Opened", c.opened_count, "var(--am)"],
                  ["Converted", c.converted_count, "var(--gr)"],
                ].map(([l, v, col]) => (
                  <div key={l}>
                    <div
                      style={{
                        fontSize: 10,
                        color: "var(--t3)",
                        marginBottom: 2,
                      }}
                    >
                      {l}
                    </div>
                    <div
                      style={{
                        fontSize: 20,
                        fontFamily: "var(--fd)",
                        fontWeight: 700,
                        color: col,
                      }}
                    >
                      {v}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {messages && (
        <div className="card ani" style={{ marginTop: 16 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 12,
            }}
          >
            <div className="ct">Mistral-Generated Outreach Messages</div>
            <button className="btn bg2 bxs" onClick={() => setMessages(null)}>
              <X size={12} />
            </button>
          </div>
          {(messages.messages || []).map((m, i) => (
            <div
              key={i}
              style={{
                background: "var(--bg)",
                border: "1px solid var(--bdr)",
                borderRadius: 8,
                padding: 14,
                marginBottom: 10,
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "var(--am)",
                  marginBottom: 8,
                }}
              >
                {m.name}
              </div>
              <div className="air" style={{ fontSize: 12 }}>
                {m.message}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
