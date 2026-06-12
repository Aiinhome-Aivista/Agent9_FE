import axios from "axios";

const BASE = import.meta.env.VITE_API_URL || "";

const api = axios.create({
  baseURL: BASE,
  timeout: 60_000,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const msg = err.response?.data?.detail || err.message || "Request failed";
    console.error("[ARIES API]", msg);
    return Promise.reject(new Error(msg));
  },
);
// http://localhost:3004/api/auth/login
// ── Login
export const login = (payload) =>
  api.post("/api/auth/login", payload).then((r) => r.data);
// ── Dashboard ──────────────────────────────────────────────
export const getDashboardMetrics = () =>
  api.get("/api/dashboard/metrics").then((r) => r.data);

// ── Agent Logs ─────────────────────────────────────────────
export const getLogs = (agent = null, limit = 50) =>
  api.get("/api/logs/", { params: { agent, limit } }).then((r) => r.data);

// ── Connector Agent ────────────────────────────────────────
export const analyzeCSV = (csvContent, sourceName) =>
  api
    .post("/api/connector/csv/analyze", {
      csv_content: csvContent,
      source_name: sourceName,
    })
    .then((r) => r.data);

export const ingestCSVFile = (file) => {
  const fd = new FormData();
  fd.append("file", file);
  return api
    .post("/api/connector/csv/ingest", fd, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((r) => r.data);
};

export const listSources = () =>
  api.get("/api/connector/sources").then((r) => r.data);

export const getCustomersData = () =>
  api.get("/api/prospects/customers-table").then((r) => r.data);

export const testMySQLCRM = (payload) =>
  api.post("/api/connector/crm/mysql/test", payload).then((r) => r.data);

export const syncZohoCRM = () =>
  api.post("/api/connector/crm/zoho/sync").then((r) => r.data);

// ── Policy Warehouse ───────────────────────────────────────
export const listPolicies = () =>
  api.get("/api/policy/list").then((r) => r.data);

export const createPolicy = (payload) =>
  api.post("/api/policy/create", payload).then((r) => r.data);

// export const uploadPolicyDoc = (policyId, file) => {
//   const fd = new FormData();
//   fd.append("policy_id", policyId);
//   fd.append("file", file);
//   return api.post("/api/policy/upload", fd, {
//     headers: { "Content-Type": "multipart/form-data" },
//   }).then((r) => r.data);
// };

export const extractPolicyDoc = (file) => {
  const fd = new FormData();
  fd.append("file", file);
  return api
    .post("/api/policy/upload", fd, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((r) => r.data);
};

export const indexPolicy = (policyId) =>
  api.post(`/api/policy/${policyId}/index`).then((r) => r.data);

export const getKnowledgeGraph = () =>
  api.get("/api/policy/knowledge-graph").then((r) => r.data);

export const deletePolicy = (policyId) =>
  api.delete(`/api/policy/${policyId}`).then((r) => r.data);

// ── Prospect Agent ─────────────────────────────────────────
export const getNewProspects = (minScore = 0, limit = 50) =>
  api
    .get("/api/prospects/new", { params: { min_score: minScore, limit } })
    .then((r) => r.data);

export const getRenewals = (minScore = 0, limit = 50) =>
  api
    .get("/api/prospects/renewals", { params: { min_score: minScore, limit } })
    .then((r) => r.data);

export const runProspectScoring = () =>
  api.post("/api/prospects/run-scoring").then((r) => r.data);

export const analyzeProspect = (prospectId, analysisType = "full") =>
  api
    .post(`/api/prospects/analyze/${prospectId}`, {
      prospect_id: prospectId,
      analysis_type: analysisType,
    })
    .then((r) => r.data);

export const getAudienceTable = (
  priorityType = "new_policy",
  limit = 100,
  offset = 0,
) =>
  api
    .get("/api/prospects/audience-table", {
      params: { priority_type: priorityType, limit, offset },
    })
    .then((r) => r.data);

// ── Campaign Agent ─────────────────────────────────────────
export const listCampaigns = () =>
  api.get("/api/campaigns/").then((r) => r.data);

export const createCampaign = (payload) =>
  api.post("/api/campaigns/", payload).then((r) => r.data);

export const createPolicyWiseCampaign = (payload) =>
  api.post("/api/campaigns/policy-wise", payload).then((r) => r.data);

export const launchCampaign = (campaignId) =>
  api.post(`/api/campaigns/${campaignId}/launch`).then((r) => r.data);

export const generateCampaignMessages = (campaignId, sampleCount = 3) =>
  api
    .get(`/api/campaigns/${campaignId}/generate-messages`, {
      params: { sample_count: sampleCount },
    })
    .then((r) => r.data);

export default api;
