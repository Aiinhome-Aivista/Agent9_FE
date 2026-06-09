import { useState, useEffect, useCallback } from "react";
import { Cpu, Eye, Filter, RefreshCw, UserCheck, X, Zap } from "lucide-react";
import * as api from "../api.js";
import Err from "../components/Err";
import Spinner from "../components/Spinner";
import Loader from "../components/Loader";
import ScoreBar from "../components/ScoreBar";
import UBadge from "../components/UBadge";

export default function ProspectAgent() {
  const [tab, setTab] = useState("new");
  const [newPros, setNewPros] = useState([]);
  const [renewals, setRenewals] = useState([]);
  const [selected, setSelected] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [scoring, setScoring] = useState(false);
  const [minScore, setMinScore] = useState(0);
  const [err, setErr] = useState("");
  const [fetchingData, setFetchingData] = useState(false);

  const load = useCallback(() => {
    setFetchingData(true);
    Promise.all([
      api
        .getNewProspects(minScore)
        .then(setNewPros)
        .catch(() => {}),
      api
        .getRenewals(minScore)
        .then(setRenewals)
        .catch(() => {}),
    ]).finally(() => setFetchingData(false));
  }, [minScore]);

  useEffect(() => {
    load();
  }, [load]);

  const doScore = async () => {
    setScoring(true);
    setErr("");
    try {
      await api.runProspectScoring();
      load();
    } catch (e) {
      setErr(e.message);
    }
    setScoring(false);
  };

  const doAnalyze = async (p) => {
    setLoading(true);
    setAnalysis(null);
    setErr("");
    try {
      const r = await api.analyzeProspect(p.id, "full");
      setAnalysis(r);
    } catch (e) {
      setErr(e.message);
    }
    setLoading(false);
  };

  const prospects = tab === "new" ? newPros : renewals;

  return (
    <div className="ani">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 20,
        }}
      >
        <div className="tabs">
          <button
            className={`tab ${tab === "new" ? "act" : ""}`}
            onClick={() => setTab("new")}
          >
            <UserCheck
              size={12}
              style={{
                display: "inline",
                marginRight: 5,
                verticalAlign: "middle",
              }}
            />
            New Policy
            <span
              style={{
                marginLeft: 7,
                background: "var(--am)",
                color: "#0a0a0a",
                borderRadius: 10,
                padding: "1px 7px",
                fontSize: 10,
                fontWeight: 700,
              }}
            >
              {newPros.length}
            </span>
          </button>
          <button
            className={`tab ${tab === "renewal" ? "act" : ""}`}
            onClick={() => setTab("renewal")}
          >
            <RefreshCw
              size={12}
              style={{
                display: "inline",
                marginRight: 5,
                verticalAlign: "middle",
              }}
            />
            Renewals
            <span
              style={{
                marginLeft: 7,
                background: "var(--rd)",
                color: "#fff",
                borderRadius: 10,
                padding: "1px 7px",
                fontSize: 10,
                fontWeight: 700,
              }}
            >
              {renewals.filter((r) => r.urgency_level === "Critical").length}{" "}
              critical
            </span>
          </button>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: 12,
            color: "var(--t2)",
          }}
        >
          <Filter size={13} style={{ color: "var(--t3)" }} />
          Min score:
          <input
            type="range"
            min={0}
            max={80}
            step={5}
            value={minScore}
            onChange={(e) => setMinScore(+e.target.value)}
            style={{ width: 80, accentColor: "var(--am)" }}
          />
          <span
            style={{
              fontFamily: "var(--fm)",
              color: "var(--am)",
              minWidth: 28,
            }}
          >
            {minScore}%
          </span>
        </div>
        <button
          className="btn bp2 bsm"
          style={{ marginLeft: "auto" }}
          onClick={doScore}
          disabled={scoring}
        >
          {scoring ? <Spinner /> : <Cpu size={12} />}
          {scoring ? "Running" : "Run Scoring"}
        </button>
      </div>
      <Err msg={err} />

      <div style={{ display: "flex", gap: 16 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="card" style={{ padding: 0, overflow: "hidden" }}>
            <div
              style={{
                padding: "14px 18px",
                borderBottom: "1px solid var(--bdr)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div className="ct">
                  {tab === "new"
                    ? "Top New Policy Prospects"
                    : "Renewal Priority List"}
                </div>
                <div className="cs">
                  Ranked by{" "}
                  {tab === "new" ? "propensity score" : "urgency + churn risk"}
                </div>
              </div>
              <span
                style={{
                  fontFamily: "var(--fm)",
                  fontSize: 12,
                  color: "var(--am)",
                }}
              >
                {prospects.length} prospects
              </span>
            </div>
            <div
              style={{
                overflowX: "auto",
                overflowY: "auto",
                maxHeight: "calc(100vh - 220px)",
              }}
            >
              {fetchingData ? (
                <Loader text="Loading Prospects..." />
              ) : prospects.length === 0 ? (
                <div
                  style={{
                    padding: 32,
                    textAlign: "center",
                    color: "var(--t3)",
                    fontSize: 12,
                  }}
                >
                  No prospects found. Ingest CSV data and run scoring.
                </div>
              ) : (
                <table className="pt" style={{ width: "100%" }}>
                  <thead
                    style={{
                      position: "sticky",
                      top: 0,
                      zIndex: 10,
                      backgroundColor: "var(--bg)",
                    }}
                  >
                    <tr>
                      <th>RANK</th>
                      <th>CUSTOMER</th>
                      <th>{tab === "new" ? "PROPENSITY" : "RETENTION"}</th>
                      <th>RECOMMENDED</th>
                      <th>SIGNALS</th>
                      {tab === "renewal" && <th>DAYS LEFT</th>}
                      <th>URGENCY</th>
                      <th>Insights</th>
                    </tr>
                  </thead>
                  <tbody>
                    {prospects.map((p) => (
                      <tr
                        key={p.id}
                        onClick={() => {
                          setSelected(p);
                          setAnalysis(null);
                        }}
                      >
                        <td>
                          <div className={`rb ${p.rank <= 3 ? "rbt" : ""}`}>
                            {p.rank}
                          </div>
                        </td>
                        <td>
                          <div
                            style={{
                              fontWeight: 600,
                              color: "var(--t1)",
                              fontSize: 13,
                            }}
                          >
                            {p.name}
                          </div>
                          <div style={{ fontSize: 11, color: "var(--t3)" }}>
                            {p.age}y · {p.location || p.loc}
                          </div>
                        </td>
                        <td style={{ minWidth: 130 }}>
                          <ScoreBar
                            v={
                              tab === "new"
                                ? Math.round(p.propensity_score || 0)
                                : Math.round(p.retention_score || 0)
                            }
                          />
                        </td>
                        <td>
                          <span
                            style={{
                              fontSize: 12,
                              color: "var(--te)",
                              background: "var(--ted)",
                              padding: "3px 8px",
                              borderRadius: 4,
                            }}
                          >
                            {(
                              p.recommended_product ||
                              p.recommendation ||
                              ""
                            ).slice(0, 26)}
                            {(p.recommended_product || p.recommendation || "")
                              .length > 26
                              ? "…"
                              : ""}
                          </span>
                        </td>
                        <td>
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                              gap: 3,
                              maxWidth: 180,
                            }}
                          >
                            {(p.behavioral_signals || p.signals || [])
                              .slice(0, 2)
                              .map((s) => (
                                <span key={s} className="sc">
                                  {s}
                                </span>
                              ))}
                            {(p.behavioral_signals || p.signals || []).length >
                              2 && (
                              <span className="sc">
                                +
                                {(p.behavioral_signals || p.signals).length - 2}
                              </span>
                            )}
                          </div>
                        </td>
                        {tab === "renewal" && (
                          <td>
                            <span
                              style={{
                                fontFamily: "var(--fm)",
                                fontSize: 12,
                                color:
                                  (p.days_to_expiry || 0) <= 14
                                    ? "var(--rd)"
                                    : (p.days_to_expiry || 0) <= 30
                                      ? "var(--am)"
                                      : "var(--t2)",
                              }}
                            >
                              {p.days_to_expiry || 0}d
                            </span>
                          </td>
                        )}
                        <td>
                          <UBadge u={p.urgency_level || "Medium"} />
                        </td>
                        <td>
                          <button
                            className="btn bg2 bxs"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelected(p);
                              setAnalysis(null);
                            }}
                          >
                            <Eye size={11} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>

        {selected && (
          <div
            className="ani"
            style={{
              width: 500,
              flexShrink: 0,
              maxHeight: "calc(100vh - 60px)",
              overflowY: "auto",
            }}
          >
            {" "}
            <div className="card" style={{ position: "sticky", top: 0 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 14,
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: "var(--fd)",
                      fontSize: 16,
                      fontWeight: 700,
                    }}
                  >
                    {selected.name}
                  </div>
                  <div
                    style={{ fontSize: 12, color: "var(--t3)", marginTop: 2 }}
                  >
                    {selected.age}y · {selected.location || selected.loc} ·{" "}
                    {selected.email}
                  </div>
                </div>
                <button
                  className="btn bg2 bxs"
                  onClick={() => {
                    setSelected(null);
                    setAnalysis(null);
                  }}
                >
                  <X size={12} />
                </button>
              </div>

              {selected.ai_context && (
                <div
                  style={{
                    background: "var(--bg)",
                    border: "1px solid var(--bdr)",
                    borderRadius: 8,
                    padding: 12,
                    marginBottom: 12,
                  }}
                >
                  <div
                    style={{
                      fontSize: 10,
                      color: "var(--t3)",
                      fontWeight: 700,
                      letterSpacing: 1,
                      textTransform: "uppercase",
                      marginBottom: 6,
                    }}
                  >
                    AI Context
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "var(--t2)",
                      lineHeight: 1.6,
                    }}
                  >
                    {selected.ai_context}
                  </div>
                </div>
              )}

              <div style={{ marginBottom: 12 }}>
                <div
                  style={{
                    fontSize: 10,
                    color: "var(--t3)",
                    fontWeight: 700,
                    letterSpacing: 1,
                    textTransform: "uppercase",
                    marginBottom: 6,
                  }}
                >
                  Signals
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                  {(selected.behavioral_signals || selected.signals || []).map(
                    (s) => (
                      <span key={s} className="sc">
                        {s}
                      </span>
                    ),
                  )}
                </div>
              </div>

              {(selected.recommended_product || selected.recommendation) && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 10,
                  }}
                >
                  <div style={{ fontSize: 11, color: "var(--t3)" }}>
                    Recommendation
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "var(--te)",
                      fontWeight: 600,
                      maxWidth: 180,
                      textAlign: "right",
                    }}
                  >
                    {selected.recommended_product || selected.recommendation}
                  </div>
                </div>
              )}
              {(selected.outreach_channel || selected.channel) && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 14,
                  }}
                >
                  <div style={{ fontSize: 11, color: "var(--t3)" }}>
                    Channel
                  </div>
                  <div style={{ fontSize: 12, color: "var(--t2)" }}>
                    {selected.outreach_channel || selected.channel}
                  </div>
                </div>
              )}

              <div className="gl" />

              <button
                className="btn bp2"
                style={{ width: "100%", marginBottom: 8 }}
                onClick={() => doAnalyze(selected)}
                disabled={loading}
              >
                {loading ? <Spinner /> : <Cpu size={13} />}
                {loading ? "Analyzing…" : "Deep Analysis"}
              </button>

              {analysis && (
                <div
                  className="air ani"
                  style={{
                    fontSize: 12,
                    maxHeight: 500,
                    overflowY: "auto",
                    marginBottom: 8,
                  }}
                >
                  {analysis.key_insights?.length > 0 && (
                    <div style={{ marginBottom: 10 }}>
                      <div
                        style={{
                          fontFamily: "var(--fd)",
                          fontSize: 10,
                          fontWeight: 700,
                          color: "var(--am)",
                          letterSpacing: 1,
                          textTransform: "uppercase",
                          marginBottom: 6,
                        }}
                      >
                        Key Insights
                      </div>
                      {analysis.key_insights.map((k, i) => (
                        <div
                          key={i}
                          style={{
                            fontSize: 11,
                            color: "var(--t1)",
                            marginBottom: 4,
                            paddingLeft: 8,
                            borderLeft: "2px solid var(--am)",
                          }}
                        >
                          • {k}
                        </div>
                      ))}
                    </div>
                  )}
                  {analysis.talking_points?.length > 0 && (
                    <div style={{ marginBottom: 10 }}>
                      <div
                        style={{
                          fontFamily: "var(--fd)",
                          fontSize: 10,
                          fontWeight: 700,
                          color: "var(--te)",
                          letterSpacing: 1,
                          textTransform: "uppercase",
                          marginBottom: 6,
                        }}
                      >
                        Talking Points
                      </div>
                      {analysis.talking_points.map((t, i) => (
                        <div
                          key={i}
                          style={{
                            fontSize: 11,
                            color: "var(--t1)",
                            marginBottom: 4,
                          }}
                        >
                          {i + 1}. {t}
                        </div>
                      ))}
                    </div>
                  )}
                  {analysis.next_action && (
                    <div
                      style={{
                        fontSize: 11,
                        color: "var(--gr)",
                        fontWeight: 600,
                      }}
                    >
                      → Next: {analysis.next_action}
                    </div>
                  )}
                </div>
              )}

              <button className="btn bs" style={{ width: "100%" }}>
                <Zap size={13} />
                Initiate Outreach
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
