import { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  Cpu,
  Database,
  FileText,
  Globe,
  Link2,
  Upload,
  X,
  RotateCw,
} from "lucide-react";
import * as api from "../api.js";
import Err from "../components/Err";
import Spinner from "../components/Spinner";

export default function Connector() {
  const [tab, setTab] = useState("csv");
  const [csvText, setCsvText] = useState("");
  const [csvName, setCsvName] = useState("upload.csv");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [err, setErr] = useState("");
  const [sources, setSources] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [custLoading, setCustLoading] = useState(false);
  const [page, setPage] = useState(1);
  const rowsPerPage = 20;
  const [crmForm, setCrmForm] = useState({
    host: "",
    port: "3306",
    user: "",
    password: "",
    database: "",
    table_name: "customers",
  });
  const [crmRes, setCrmRes] = useState(null);
  const [crmLoading, setCrmLoading] = useState(false);
  const fileRef = useRef();



  const fetchCustomers = () => {
    setCustLoading(true);
    api.getCustomersData()
      .then((res) => {
        setCustomers(res?.data || res || []);
        setPage(1);
        setCustLoading(false);
      })
      .catch((e) => {
        console.error("[ARIES Connector]", e.message);
        setCustLoading(false);
      });
  };

  useEffect(() => {
    api
      .listSources()
      .then(setSources)
      .catch(() => { });

    fetchCustomers();
  }, []);

  const doAnalyze = async () => {
    setLoading(true);
    setErr("");
    setResult(null);
    try {
      const r = await api.analyzeCSV(csvText, csvName);
      setResult(r);
      api.listSources().then(setSources);
      fetchCustomers();
    } catch (e) {
      setErr(e.message);
    }
    setLoading(false);
  };

  const doFileUpload = async (file) => {
    setLoading(true);
    setErr("");
    try {
      const r = await api.ingestCSVFile(file);
      setResult({
        ingestion_summary: `Ingested ${r.records_ingested} records from ${r.filename}`,
        mappings: r.field_map || {},
        record_count: r.records_ingested,
        detected_fields: Object.keys(r.field_map || {}),
        missing_fields: [],
      });
      api.listSources().then(setSources);
      fetchCustomers();
    } catch (e) {
      setErr(e.message);
    }
    setLoading(false);
  };

  const doCrmTest = async () => {
    setCrmLoading(true);
    setErr("");
    try {
      const r = await api.testMySQLCRM({ ...crmForm, port: +crmForm.port });
      setCrmRes(r);
    } catch (e) {
      setErr(e.message);
    }
    setCrmLoading(false);
  };
  const totalPages = Math.ceil(customers.length / rowsPerPage);

  const paginatedCustomers = customers.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );
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
            className={`tab ${tab === "csv" ? "act" : ""}`}
            onClick={() => setTab("csv")}
          >
            <FileText
              size={12}
              style={{
                display: "inline",
                marginRight: 5,
                verticalAlign: "middle",
              }}
            />
            CSV Import
          </button>
          <button
            className={`tab ${tab === "crm" ? "act" : ""}`}
            onClick={() => setTab("crm")}
          >
            <Database
              size={12}
              style={{
                display: "inline",
                marginRight: 5,
                verticalAlign: "middle",
              }}
            />
            CRM Connect
          </button>
        </div>
      </div>
      <Err msg={err} />

      {tab === "csv" && (
        <div className="g2">
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div className="card" style={{ height: 380, display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 12,
                }}
              >
                <div className="ct">Paste or Upload CSV</div>
              </div>
              <div
                style={{ fontSize: 11, color: "var(--t3)", marginBottom: 10 }}
              >
                Any CSV format accepted — intelligently maps columns to the{" "}
                <code style={{ color: "var(--am)", fontFamily: "var(--fm)" }}>
                  prospect_audience
                </code>{" "}
                schema.
              </div>
              <div className="fg" style={{ marginBottom: 10 }}>
                <label className="fl">CSV file name</label>
                <input
                  className="fi"
                  value={csvName}
                  onChange={(e) => setCsvName(e.target.value)}
                  placeholder="my_leads.csv"
                />
              </div>
              <textarea
                className="fta"
                style={{ flex: 1, minHeight: 60, resize: "none" }}
                placeholder={
                  "name,email,age,city,income\nRajesh Kumar,r.kumar@email.com,35,Bhubaneswar,18L"
                }
                value={csvText}
                onChange={(e) => setCsvText(e.target.value)}
              />
              <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                <button
                  className="btn bp2"
                  onClick={doAnalyze}
                  disabled={loading || !csvText.trim()}
                >
                  {loading ? <Spinner /> : <Cpu size={13} />}
                  {loading ? "Analyzing…" : "Analyze & Map"}
                </button>
                <button
                  className="btn bg2 bsm"
                  onClick={() => fileRef.current?.click()}
                >
                  <Upload size={12} />
                  Upload File
                </button>
                <input
                  ref={fileRef}
                  type="file"
                  accept=".csv"
                  style={{ display: "none" }}
                  onChange={(e) =>
                    e.target.files[0] && doFileUpload(e.target.files[0])
                  }
                />
                <button
                  className="btn bg2 bsm"
                  onClick={() => {
                    setCsvText("");
                    setResult(null);
                  }}
                >
                  <X size={12} />
                </button>
              </div>
            </div>

            {result && (
              <div
                className="card ani"
                style={{ borderColor: "var(--bdr-hi)" }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 12,
                  }}
                >
                  <div className="ct">Mapping Result</div>
                  <span
                    style={{
                      fontSize: 11,
                      color: "var(--gr)",
                      background: "var(--grd)",
                      padding: "3px 10px",
                      borderRadius: 4,
                    }}
                  >
                    ✓ Ingested to MySQL
                  </span>
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "var(--t2)",
                    background: "var(--bg)",
                    border: "1px solid var(--bdr)",
                    borderRadius: 6,
                    padding: 12,
                    marginBottom: 12,
                    lineHeight: 1.6,
                  }}
                >
                  {result.ingestion_summary}
                </div>
                {result.mappings && Object.keys(result.mappings).length > 0 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {Object.entries(result.mappings).map(([f, t]) => (
                      <div
                        key={f}
                        style={{
                          background: "var(--bg)",
                          border: "1px solid var(--bdr)",
                          borderRadius: 5,
                          padding: "4px 10px",
                          fontSize: 11,
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                        }}
                      >
                        <span style={{ color: "var(--t3)" }}>{f}</span>
                        <ArrowRight size={10} style={{ color: "var(--am)" }} />
                        <span
                          style={{
                            color: "var(--am)",
                            fontFamily: "var(--fm)",
                          }}
                        >
                          {t}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div className="card" style={{ height: 380, display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 12,
                  flexShrink: 0,
                }}
              >
                <div className="ct">Ingested Sources</div>
                <span
                  style={{
                    fontFamily: "var(--fm)",
                    fontSize: 11,
                    color: "var(--am)",
                  }}
                >
                  {sources.length} sources
                </span>
              </div>
              <div style={{ flex: 1, overflowY: "auto", paddingRight: 4 }}>
                {sources.length === 0 && (
                  <div
                    style={{
                      color: "var(--t3)",
                      fontSize: 12,
                      textAlign: "center",
                      padding: "16px 0",
                    }}
                  >
                    No sources yet. Upload a CSV to begin.
                  </div>
                )}
                {sources.map((s) => (
                  <div
                    key={s.id}
                    style={{
                      background: "var(--bg)",
                      border: "1px solid var(--bdr)",
                      borderRadius: 6,
                      padding: "12px 14px",
                      marginBottom: 8,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 6,
                      }}
                    >
                      <div
                        style={{ display: "flex", alignItems: "center", gap: 8 }}
                      >
                        <FileText size={14} style={{ color: "var(--am)" }} />
                        <span style={{ fontSize: 13, fontWeight: 600 }}>
                          {s.name}
                        </span>
                      </div>
                      <span
                        style={{
                          fontSize: 10,
                          color:
                            s.status === "ingested" ? "var(--gr)" : "var(--am)",
                          background:
                            s.status === "ingested" ? "var(--grd)" : "var(--amd)",
                          padding: "2px 8px",
                          borderRadius: 3,
                        }}
                      >
                        {s.status}
                      </span>
                    </div>
                    <div style={{ fontSize: 11, color: "var(--t3)" }}>
                      <span
                        style={{ color: "var(--am)", fontFamily: "var(--fm)" }}
                      >
                        {s.records}
                      </span>{" "}
                      records · {s.type}
                    </div>
                    <div
                      style={{
                        marginTop: 6,
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 4,
                      }}
                    >
                      {(s.fields || []).slice(0, 5).map((f) => (
                        <span key={f} className="tag">
                          {f}
                        </span>
                      ))}
                      {(s.fields || []).length > 5 && (
                        <span className="tag">+{s.fields.length - 5}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === "crm" && (
        <div className="g2">
          {/* MySQL CRM */}
          <div
            className="card"
            style={{
              borderColor: crmRes?.connected
                ? "rgba(34,197,94,.3)"
                : "var(--bdr)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  background: "var(--bld)",
                  border: "1px solid rgba(75,142,245,.3)",
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Database size={18} style={{ color: "var(--bl)" }} />
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "var(--fd)",
                    fontSize: 14,
                    fontWeight: 700,
                  }}
                >
                  MySQL CRM
                </div>
                <div style={{ fontSize: 11, color: "var(--t3)" }}>
                  Direct database connection
                </div>
              </div>
              {crmRes?.connected && (
                <span
                  style={{
                    marginLeft: "auto",
                    fontSize: 11,
                    color: "var(--gr)",
                    background: "var(--grd)",
                    padding: "3px 10px",
                    borderRadius: 4,
                  }}
                >
                  ● Connected
                </span>
              )}
            </div>
            {!crmRes?.connected ? (
              <>
                {[
                  ["host", "Host / IP", "db.example.com"],
                  ["port", "Port", "3306"],
                  ["user", "Username", "crm_reader"],
                  ["password", "Password", "••••••••"],
                  ["database", "Database", "crm_production"],
                  ["table_name", "Customer Table", "customers"],
                ].map(([k, l, ph]) => (
                  <div className="fg" key={k}>
                    <label className="fl">{l}</label>
                    <input
                      className="fi"
                      type={k === "password" ? "password" : "text"}
                      placeholder={ph}
                      value={crmForm[k]}
                      onChange={(e) =>
                        setCrmForm((f) => ({ ...f, [k]: e.target.value }))
                      }
                    />
                  </div>
                ))}
                <button
                  className="btn bp2"
                  style={{ width: "100%" }}
                  onClick={doCrmTest}
                  disabled={crmLoading}
                >
                  {crmLoading ? <Spinner /> : <Link2 size={13} />}
                  {crmLoading ? "Connecting…" : "Test & Connect MySQL"}
                </button>
              </>
            ) : (
              <div>
                <div
                  style={{
                    background: "var(--grd)",
                    border: "1px solid rgba(34,197,94,.2)",
                    borderRadius: 8,
                    padding: "12px 14px",
                    marginBottom: 14,
                  }}
                >
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "var(--gr)",
                      marginBottom: 4,
                    }}
                  >
                    ✓ {crmRes.message}
                  </div>
                  <div style={{ fontSize: 11, color: "var(--t3)" }}>
                    {crmRes.record_count?.toLocaleString()} records available
                  </div>
                </div>
                {(crmRes.tables || []).map((t) => (
                  <div
                    key={t}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: 12,
                      padding: "6px 0",
                      borderBottom: "1px solid var(--bdr)",
                    }}
                  >
                    <span
                      style={{ color: "var(--t2)", fontFamily: "var(--fm)" }}
                    >
                      {t}
                    </span>
                    <span style={{ color: "var(--am)" }}>table</span>
                  </div>
                ))}
                <button
                  className="btn bg2 bsm"
                  style={{ marginTop: 12, width: "100%" }}
                  onClick={() => setCrmRes(null)}
                >
                  Disconnect
                </button>
              </div>
            )}
          </div>

          {/* ZOHO CRM */}
          <div className="card">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  background: "var(--amd)",
                  border: "1px solid var(--bdr-hi)",
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Globe size={18} style={{ color: "var(--am)" }} />
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "var(--fd)",
                    fontSize: 14,
                    fontWeight: 700,
                  }}
                >
                  ZOHO CRM
                </div>
                <div style={{ fontSize: 11, color: "var(--t3)" }}>
                  OAuth 2.0 integration
                </div>
              </div>
            </div>
            <div
              style={{
                background: "var(--bg)",
                border: "1px solid var(--bdr)",
                borderRadius: 8,
                padding: 16,
                marginBottom: 16,
                fontSize: 12,
                color: "var(--t2)",
                lineHeight: 1.7,
              }}
            >
              Connect via OAuth 2.0. ARIES will sync: Contacts, Leads, Deals,
              Activity history, and Custom modules.
              <br />
              <br />
              <span
                style={{
                  fontSize: 11,
                  color: "var(--te)",
                  fontFamily: "var(--fm)",
                }}
              >
                Stack: FastAPI → ZOHO REST API v7 → MySQL prospect_audience
              </span>
            </div>
            <div className="fg">
              <label className="fl">ZOHO Org ID (optional)</label>
              <input className="fi" placeholder="20xxxxxxxx" />
            </div>
            <div className="fg">
              <label className="fl">Sync Scope</label>
              <select className="fi" style={{ cursor: "pointer" }}>
                <option>Leads + Contacts + Deals</option>
                <option>Leads + Contacts only</option>
                <option>Full CRM Sync</option>
              </select>
            </div>
            <button
              className="btn bp2"
              style={{ width: "100%" }}
              onClick={() => api.syncZohoCRM().catch(() => { })}
            >
              <Link2 size={13} />
              Authorize ZOHO via OAuth
            </button>
          </div>
        </div>
      )}

      {/* Customers Database Table */}
      <div className="card" style={{ marginTop: 24 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 14,
          }}
        >
          <div>
            <div className="ct">Ingested Customers</div>
            <div className="cs">Active prospects parsed and mapped by Connector agents</div>
          </div>
          <button
            className="btn bg2 bxs"
            onClick={fetchCustomers}
            disabled={custLoading}
            style={{ display: "flex", alignItems: "center", gap: 5 }}
          >
            <RotateCw size={11} className={custLoading ? "spin" : ""} />
            {custLoading ? "Refreshing..." : "Refresh Table"}
          </button>
        </div>

        {paginatedCustomers.length === 0 ? (
          <div
            style={{
              color: "var(--t3)",
              fontSize: 12,
              textAlign: "center",
              padding: "30px 0",
            }}
          >
            No customers found in database. Ingest CSV data or connect MySQL / Zoho CRM to populate.
          </div>
        ) : (
          <div
            style={{
              overflowX: "auto",
              overflowY: "auto",
              maxHeight: 600,
            }}
          >            <table className="pt">
              <thead>
                <tr>
                  <th>Name / Contact</th>
                  <th>Age</th>
                  <th>City</th>
                  <th>Income</th>
                  <th>Occupation</th>
                  <th>Behavioral Signals</th>
                  <th>Life Events</th>
                </tr>
              </thead>
              <tbody>
                {paginatedCustomers.map((c, i) => (
                  <tr key={i}>
                    <td>
                      <div style={{ fontWeight: 600, color: "var(--t1)" }}>{c.name}</div>
                      <div style={{ fontSize: 11, color: "var(--t3)", marginTop: 2 }}>
                        {c.email} {c.phone && `· ${c.phone}`}
                      </div>
                    </td>
                    <td>{c.age}</td>
                    <td>{c.city}</td>
                    <td>{c.income}</td>
                    <td>{c.occupation}</td>
                    <td style={{ maxWidth: 280 }}>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                        {(c.behavioral_signals || [])
                          .flatMap((s) => (s ? s.split(";") : []))
                          .map((sig, idx) => (
                            <span
                              key={idx}
                              className="tag"
                              style={{
                                color: "var(--am2)",
                                background: "var(--amd)",
                                borderColor: "rgba(245,166,35,0.15)",
                              }}
                            >
                              {sig}
                            </span>
                          ))}
                      </div>
                    </td>
                    <td style={{ maxWidth: 280 }}>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                        {(c.life_events || [])
                          .flatMap((s) => (s ? s.split(";") : []))
                          .map((ev, idx) => (
                            <span
                              key={idx}
                              className="tag"
                              style={{
                                color: "var(--te)",
                                background: "var(--ted)",
                                borderColor: "rgba(20,184,166,0.15)",
                              }}
                            >
                              {ev}
                            </span>
                          ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>



            </table>

            {/* PAGINATION */}

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 14,
                gap: 10,
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  color: "var(--t3)",
                }}
              >
                Showing {(page - 1) * rowsPerPage + 1}–
                {Math.min(page * rowsPerPage, customers.length)} of{" "}
                {customers.length} customers
              </div>

              <div style={{ display: "flex", gap: 8 }}>
                <button
                  className="btn bg2 bxs"
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                >
                  Prev
                </button>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "0 10px",
                    fontSize: 12,
                    color: "var(--t2)",
                  }}
                >
                  Page {page} / {totalPages || 1}
                </div>

                <button
                  className="btn bg2 bxs"
                  disabled={page === totalPages || totalPages === 0}
                  onClick={() => setPage((p) => p + 1)}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
