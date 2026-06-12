import { useState, useEffect } from "react";
import {
  Archive,
  CheckCircle,
  Network,
  Plus,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import * as api from "../api.js";
import Err from "../components/Err";
import Spinner from "../components/Spinner";
import Loader from "../components/Loader";

export default function PolicyWarehouse() {
  const [policies, setPolicies] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({
    name: "",
    policy_type: "Life",
    coverage_range: "",
    premium_range: "",
    eligibility: "",
    features: "",
    propensity_targets: "",
  });
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");
  const [docParsed, setDocParsed] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [indexing, setIndexing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [relevanceData, setRelevanceData] = useState(null);

  const resetAddState = () => {
    setForm({
      name: "",
      policy_type: "Life",
      coverage_range: "",
      premium_range: "",
      eligibility: "",
      features: "",
      propensity_targets: "",
    });
    setUploadedFile(null);
    setUploadStatus("");
    setDocParsed(false);
    setRelevanceData(null);
  };

  const handleDocUpload = async (file) => {
    if (!file) return;
    setErr("");
    setUploadStatus("");
    setUploadedFile(file);
    setDocParsed(false);
    setUploadingFile(true);
    setRelevanceData(null);
    try {
      const extracted = await api.extractPolicyDoc(file);
      setForm((f) => ({
        ...f,
        name: extracted.name || extracted.policy_name || f.name,
        policy_type: extracted.policy_type || f.policy_type,
        coverage_range:
          extracted.coverage_range || extracted.coverage || f.coverage_range,
        premium_range:
          extracted.premium_range || extracted.premium || f.premium_range,
        eligibility:
          extracted.eligibility ||
          extracted.eligibility_criteria ||
          f.eligibility,
        features: Array.isArray(extracted.features)
          ? extracted.features.join(", ")
          : extracted.features || f.features,
        propensity_targets: Array.isArray(extracted.propensity_targets)
          ? extracted.propensity_targets.join(", ")
          : extracted.propensity_targets || f.propensity_targets,
      }));
      setDocParsed(true);
      setUploadStatus("Document parsed. Please review the form and save.");
      if (extracted.relevance_score !== undefined) {
        setRelevanceData({
          score: extracted.relevance_score,
          threshold: extracted.relevance_threshold,
          isRelevant: extracted.is_relevant,
        });
      }
    } catch (e) {
      setErr(e.message);
    } finally {
      setUploadingFile(false);
      setDragActive(false);
    }
  };

  const [fetchingData, setFetchingData] = useState(true);

  const load = () => {
    setFetchingData(true);
    return api
      .listPolicies()
      .then(setPolicies)
      .catch((e) => setErr(e.message))
      .finally(() => setFetchingData(false));
  };
  useEffect(() => {
    load();
  }, []);

  const doCreate = async () => {
    setLoading(true);
    setErr("");
    const savedPolicyName = form.name;
    const currentUploadedFile = uploadedFile;
    try {
      await api.createPolicy({
        ...form,
        features: form.features
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        propensity_targets: form.propensity_targets
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      });
      if (currentUploadedFile) {
        setUploadedFiles((prev) => [
          ...prev,
          {
            name: currentUploadedFile.name,
            policyName: savedPolicyName,
          },
        ]);
      }
      setForm({
        name: "",
        policy_type: "Life",
        coverage_range: "",
        premium_range: "",
        eligibility: "",
        features: "",
        propensity_targets: "",
      });
      setUploadedFile(null);
      setDocParsed(false);
      setUploadStatus("");
      setShowAdd(false);
      await load();
    } catch (e) {
      setErr(e.message);
    }
    setLoading(false);
  };

  const doIndex = async (id) => {
    setIndexing(id);
    try {
      await api.indexPolicy(id);
      await load();
    } catch (e) {
      setErr(e.message);
    }
    setIndexing(null);
  };

  const doDelete = async (id) => {
    try {
      await api.deletePolicy(id);
      await load();
    } catch (e) {
      setErr(e.message);
    }
  };

  const colours = {
    Life: "am",
    Health: "gr",
    Motor: "bl",
    Property: "pu",
    Commercial: "te",
  };

  return (
    <div className="ani">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        {/* Left Side */}
        <div style={{ display: "flex", gap: 14 }}>
          {[[policies.length, "Total Policies", Archive, "var(--te)"]].map(
            ([v, l, Icon, c]) => (
              <div
                key={l}
                className="card"
                style={{
                  width: 220, // reduced width
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <Icon size={22} style={{ color: c }} />

                <div>
                  <div
                    style={{
                      fontFamily: "var(--fm)",
                      fontSize: 22,
                      fontWeight: 700,
                    }}
                  >
                    {v}
                  </div>

                  <div style={{ fontSize: 11, color: "var(--t3)" }}>{l}</div>
                </div>
              </div>
            ),
          )}
        </div>

        {/* Right Side */}
        <button
          className="btn bp2"
          onClick={() => {
            if (!showAdd) resetAddState();
            setShowAdd(!showAdd);
          }}
        >
          <Plus size={13} />
          Add Policy
        </button>
      </div>
      <Err msg={err} />

      {showAdd && (
        <div
          className="card ani"
          style={{ marginBottom: 20, borderColor: "var(--bdr-hi)" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 14,
            }}
          >
            <div className="ct">New Policy</div>
            <button
              className="btn bg2 bxs"
              onClick={() => {
                setShowAdd(false);
                resetAddState();
              }}
            >
              <X size={12} />
            </button>
          </div>
          <div
            className="fg"
            onDragEnter={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setDragActive(true);
            }}
            onDragOver={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setDragActive(true);
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setDragActive(false);
            }}
            onDrop={async (e) => {
              e.preventDefault();
              e.stopPropagation();
              setDragActive(false);
              const file = e.dataTransfer.files?.[0];
              await handleDocUpload(file);
            }}
            style={{
              position: "relative",
              border: `2px dashed ${dragActive ? "var(--te)" : "var(--bdr)"}`,
              borderRadius: "var(--rl)",
              padding: 24,
              background: dragActive
                ? "rgba(56, 198, 255, 0.05)"
                : "var(--card)",
            }}
          >
            <label
              className="fl"
              style={{
                display: "block",
                marginBottom: 10,
                fontWeight: 600,
              }}
            >
              Upload Policy Document (PDF, DOCX)
            </label>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                minHeight: 120,
                textAlign: "center",
                color: "var(--t3)",
                cursor: uploadingFile ? "not-allowed" : "pointer",
              }}
              onClick={() => {
                if (!uploadingFile)
                  document.getElementById("policy-upload-input")?.click();
              }}
            >
              <Upload size={24} />
              <div>
                Drag & drop a PDF or DOCX file here,
                <br />
                or click to browse
              </div>
            </div>
            <input
              id="policy-upload-input"
              type="file"
              accept=".pdf,.docx"
              style={{ display: "none" }}
              disabled={uploadingFile}
              onChange={async (e) => {
                const file = e.target.files?.[0];
                await handleDocUpload(file);
              }}
            />
            {uploadedFile && (
              <div style={{ marginTop: 12, fontSize: 12, color: "var(--t3)" }}>
                {uploadedFile.name}{" "}
                {uploadingFile ? "uploading..." : "selected"}
              </div>
            )}
            {uploadStatus && (
              <div style={{ marginTop: 8, fontSize: 12, color: "var(--gr)" }}>
                {uploadStatus}
              </div>
            )}
            {relevanceData && (
              <div
                style={{
                  marginTop: 8,
                  fontSize: 12,
                  fontWeight: 600,
                  color:
                    relevanceData.score >= relevanceData.threshold
                      ? "var(--gr)"
                      : "var(--rd)",
                }}
              >
                Relevance Score: {relevanceData.score} (Threshold:{" "}
                {relevanceData.threshold}) -{" "}
                {relevanceData.score >= relevanceData.threshold
                  ? "Relevant"
                  : "Not Relevant"}
              </div>
            )}
          </div>
          {docParsed && (
            <>
              <div className="g2" style={{ gap: 12 }}>
                {[
                  ["name", "Policy Name", "SurakshaCover Term Life"],
                  ["coverage_range", "Coverage Range", "₹50L–₹2Cr"],
                  ["premium_range", "Premium Range", "₹8K–₹45K/yr"],
                  ["eligibility", "Eligibility", "Age 18–60"],
                ].map(([k, l, ph]) => (
                  <div className="fg" key={k}>
                    <label className="fl">{l}</label>
                    <input
                      className="fi"
                      placeholder={ph}
                      value={form[k]}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, [k]: e.target.value }))
                      }
                    />
                  </div>
                ))}
                <div className="fg">
                  <label className="fl">Policy Type</label>
                  <select
                    className="fi"
                    value={form.policy_type}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, policy_type: e.target.value }))
                    }
                  >
                    {[
                      "Life",
                      "Health",
                      "Motor",
                      "Property",
                      "Commercial",
                      "Travel",
                    ].map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="fg">
                <label className="fl">Key Features (comma-separated)</label>
                <input
                  className="fi"
                  placeholder="Death Benefit, Tax Benefit 80C, Critical Illness Rider"
                  value={form.features}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, features: e.target.value }))
                  }
                />
              </div>
              <div className="fg">
                <label className="fl">
                  Propensity Target Signals (comma-separated)
                </label>
                <input
                  className="fi"
                  placeholder="Age 25-45, Married, Home loan, No existing life cover"
                  value={form.propensity_targets}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      propensity_targets: e.target.value,
                    }))
                  }
                />
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  className="btn bp2"
                  onClick={doCreate}
                  disabled={
                    loading ||
                    !form.name ||
                    (relevanceData &&
                      relevanceData.score < relevanceData.threshold)
                  }
                >
                  {loading ? <Spinner /> : <Upload size={13} />}
                  {loading ? "Saving…" : "Create Policy"}
                </button>
                <button className="btn bg2" onClick={() => setShowAdd(false)}>
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      )}

      <div
        className="g2"
        style={{ alignItems: "start", gridTemplateColumns: "1fr" }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div className="stl">Policy Library ({policies.length})</div>
          {fetchingData ? (
            <div className="card" style={{ padding: 0 }}>
              <Loader text="Loading Policies..." />
            </div>
          ) : (
            <>
              {policies.map((p) => (
                <div
                  key={p.id}
                  style={{
                    background: "var(--card)",
                    border: "1px solid var(--bdr)",
                    borderRadius: "var(--rl)",
                    padding: 16,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                    }}
                  >
                    <span className={`ptb t${p.policy_type}`}>
                      {(p.policy_type || "").toUpperCase()}
                    </span>
                    <button
                      className="btn bxs bg2"
                      onClick={() => doDelete(p.id)}
                      style={{ color: "var(--rd)" }}
                    >
                      <Trash2 size={10} />
                    </button>
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--fd)",
                      fontSize: 14,
                      fontWeight: 700,
                      marginBottom: 4,
                    }}
                  >
                    {p.name}
                  </div>
                  <div
                    style={{ fontSize: 11, color: "var(--t3)", marginBottom: 8 }}
                  >
                    {p.coverage_range && (
                      <>
                        Coverage:{" "}
                        <span style={{ color: "var(--am)" }}>
                          {p.coverage_range}
                        </span>{" "}
                        ·{" "}
                      </>
                    )}
                    {p.premium_range && (
                      <>
                        Premium:{" "}
                        <span style={{ color: "var(--t2)" }}>
                          {p.premium_range}
                        </span>
                      </>
                    )}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 4,
                      marginBottom: 8,
                    }}
                  >
                    {(p.features || []).map((f) => (
                      <span
                        key={f}
                        style={{
                          fontSize: 10,
                          padding: "2px 7px",
                          background: "var(--elev)",
                          color: "var(--t2)",
                          borderRadius: 4,
                          border: "1px solid var(--bdr)",
                        }}
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                  {p.is_indexed && (p.propensity_targets || []).length > 0 && (
                    <div>
                      <div
                        style={{
                          fontSize: 10,
                          color: "var(--t3)",
                          marginBottom: 4,
                        }}
                      >
                        PROPENSITY TARGETS:
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                        {(p.propensity_targets || []).map((t) => (
                          <span key={t} className="sc">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {policies.length === 0 && (
                <div
                  style={{
                    color: "var(--t3)",
                    fontSize: 12,
                    textAlign: "center",
                    padding: "20px 0",
                  }}
                >
                  No policies yet. Click Add Policy to begin.
                </div>
              )}
            </>
          )}
          {uploadedFiles.length > 0 && (
            <div
              style={{
                marginTop: 16,
                padding: 16,
                border: "1px solid var(--bdr)",
                borderRadius: "var(--rl)",
                background: "var(--card)",
              }}
            >
              <div className="stl">Uploaded Documents</div>
              {uploadedFiles.map((u, idx) => (
                <div
                  key={`${u.name}-${idx}`}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 12,
                    fontSize: 12,
                    padding: "10px 0",
                    borderBottom:
                      idx < uploadedFiles.length - 1
                        ? "1px solid var(--bdr)"
                        : "none",
                  }}
                >
                  <div>{u.name}</div>
                  <div style={{ color: "var(--t3)" }}>
                    Saved as {u.policyName || "policy"}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
