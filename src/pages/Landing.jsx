import { useState } from "react";
import {
  Database,
  Archive,
  Target,
  Zap,
  TrendingUp,
  BarChart2,
  Clock,
  ArrowRight,
  Shield,
  Eye,
  Server,
  Activity,
  CheckCircle,
} from "lucide-react";

export default function Landing({ onLaunchConsole }) {
  const [activeNode, setActiveNode] = useState("connector");

  const nodes = [
    {
      id: "connector",
      name: "Connector Agent",
      role: "Structured Data Ingest",
      icon: Database,
      color: "var(--bl)",
      bg: "rgba(75, 142, 245, 0.1)",
      border: "rgba(75, 142, 245, 0.3)",
      title: "Connector Agent",
      spec: "MYSQL CONNECTORS / ZOHO CRM / CSV INGESTION PIPELINE",
      text: "Responsible for orchestrating the ingestion of data from raw enterprise feeds. It supports automated database syncing, manual CSV uploading, and validation checks to structure raw customer datasets.",
      points: [
        "Automated CRM sync mapping schemas directly to model features",
        "Encrypted data pipeline using AES-256 state hashing",
        "Visual feedback for schema diagnostics and error detection",
      ],
    },
    {
      id: "policy",
      name: "Policy Warehouse Agent",
      role: "Document & Graph Indexer",
      icon: Archive,
      color: "var(--te)",
      bg: "rgba(20, 184, 166, 0.1)",
      border: "rgba(20, 184, 166, 0.3)",
      title: "Policy Warehouse Agent",
      spec: "CHROMADB / ARANGODB HYBRID GRAPH DATABASE",
      text: "Manages unstructured insurance documents, terms of service, and contract riders. It extracts critical policy details and stores semantic representations in a vector database paired with relational entity graphs.",
      points: [
        "Semantic matching of contract limits, exclusions, and deductibles",
        "Hybrid RAG execution using multi-agent coordinate knowledge search",
        "Dynamic updates propagation to related policies and risk vectors",
      ],
    },
    {
      id: "prospects",
      name: "Prospect Agent",
      role: "Propensity AI & Analytics",
      icon: Target,
      color: "var(--am)",
      bg: "rgba(245, 166, 35, 0.1)",
      border: "rgba(245, 166, 35, 0.3)",
      title: "Prospect Analytics Agent",
      spec: "XGBOOST PROPENSITY MODELING / COGNITIVE RISK SCORING",
      text: "Evaluates the likelihood of conversion, cross-sell opportunities, and renewals. It processes behavioral events, demographic data, and current policy states to assign a detailed propensity score.",
      points: [
        "Propensity scoring combining historical performance and vector similarity",
        "Explainable AI outputs outlining top conversion signals and drivers",
        "Prioritization engine for separating hot sales targets from low-value leads",
      ],
    },
    {
      id: "campaigns",
      name: "Campaign Execution Agent",
      role: "Outreach & Message Generator",
      icon: Zap,
      color: "var(--pu)",
      bg: "rgba(167, 139, 250, 0.1)",
      border: "rgba(167, 139, 250, 0.3)",
      title: "Campaign Orchestrator Agent",
      spec: "SENDGRID / TWILIO / PERSONALIZED GEN-AI CONTENT",
      text: "Automates communication across email, SMS, and messaging networks. It uses generative LLMs to synthesize context-aware messages based on customer profiles and target products.",
      points: [
        "One-click launch controls with simulated staging before final execution",
        "Pacing and frequency limiters to prevent duplicate contact",
        "Observability tracking measuring open, click, and response rates",
      ],
    },
  ];

  const activeNodeData = nodes.find((n) => n.id === activeNode);

  return (
    <div className="lp-container">
      <div className="lp-grid-bg" />

      {/* Navigation */}
      <nav className="lp-nav">
        <div className="lp-logo-wrap">
          <div className="lp-logo-txt">ARIES</div>
          <div className="lp-logo-sub">Agentic Revenue Engine</div>
        </div>
        <div className="lp-nav-links">
          <a href="#features" className="lp-nav-link">Features</a>
          <a href="#architecture" className="lp-nav-link">Architecture</a>
          <a href="#philosophy" className="lp-nav-link">Philosophy</a>
        </div>
        <div>
          <button onClick={onLaunchConsole} className="btn bp2 bsm" style={{ fontWeight: 600 }}>
            Launch Console
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="lp-hero">
        <div className="lp-badge">
          <Activity size={12} className="spin" style={{ color: "var(--am)" }} />
          Enterprise Growth Intelligence
        </div>
        <h1 className="lp-hero-title">
          Autonomous AI Growth &amp; Renewals for <span>Enterprise Insurance</span>
        </h1>
        <p className="lp-hero-subtitle">
          An agentic AI engine that identifies high-propensity renewal targets, ingests complex policy warehouses, structures knowledge graphs, and automates outreach across digital channels.
        </p>
        <div className="lp-hero-ctas">
          <button onClick={onLaunchConsole} className="btn bp2 lp-btn-glow" style={{ padding: "12px 28px", fontSize: 14, fontWeight: 700 }}>
            Get Started <ArrowRight size={16} style={{ marginLeft: 6 }} />
          </button>
          <a href="#architecture" className="btn bs" style={{ padding: "12px 28px", fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
            Explore Architecture
          </a>
        </div>
      </header>

      {/* Stats Section */}
      <section className="lp-stats">
        <div className="lp-stat-card">
          <div className="lp-stat-val">45%</div>
          <div className="lp-stat-lbl">Outreach Conversion Lift</div>
        </div>
        <div className="lp-stat-card">
          <div className="lp-stat-val">10x</div>
          <div className="lp-stat-lbl">Faster Data Ingestion</div>
        </div>
        <div className="lp-stat-card">
          <div className="lp-stat-val">99.8%</div>
          <div className="lp-stat-lbl">Propensity Model Precision</div>
        </div>
        <div className="lp-stat-card">
          <div className="lp-stat-val">0</div>
          <div className="lp-stat-lbl">Compliance Violations</div>
        </div>
      </section>

      {/* Key Features */}
      <section id="features" className="lp-section">
        <div className="lp-sect-hdr">
          <h2 className="lp-sect-title">Designed for Agents. Engineered for Scales.</h2>
          <p className="lp-sect-desc">
            A comprehensive pipeline structured as a hierarchy of collaborative AI agents, managing the entire lifecycle of policy data and marketing campaigns.
          </p>
        </div>
        <div className="lp-features-grid">
          <div className="lp-feat-card">
            <div className="lp-feat-icon" style={{ background: "var(--amd)", color: "var(--am)" }}>
              <TrendingUp size={20} />
            </div>
            <h3 className="lp-feat-title">Propensity Scoring</h3>
            <p className="lp-feat-desc">
              Evaluate renewal probabilities and risk metrics using modern machine learning models tailored to historical behavioral data.
            </p>
          </div>
          <div className="lp-feat-card">
            <div className="lp-feat-icon" style={{ background: "var(--ted)", color: "var(--te)" }}>
              <Server size={20} />
            </div>
            <h3 className="lp-feat-title">Knowledge Storage</h3>
            <p className="lp-feat-desc">
              Organize document semantic layers in vector stores and link policy entities in a high-performance database graph.
            </p>
          </div>
          <div className="lp-feat-card">
            <div className="lp-feat-icon" style={{ background: "var(--bld)", color: "var(--bl)" }}>
              <Zap size={20} />
            </div>
            <h3 className="lp-feat-title">Campaign Orchestrator</h3>
            <p className="lp-feat-desc">
              Generate personalized emails and notifications dynamically, with detailed pacing limits to prevent excessive contact rates.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive System Architecture */}
      <section id="architecture" className="lp-section">
        <div className="lp-sect-hdr">
          <h2 className="lp-sect-title">Multi-Agent Cooperative System</h2>
          <p className="lp-sect-desc">
            Click on the system components below to understand how the orchestrator coordinate task scopes across the pipeline.
          </p>
        </div>
        <div className="arch-showcase">
          {/* Nodes list */}
          <div className="arch-visualizer">
            <div className="arch-nodes-container">
              {nodes.map((node) => {
                const NodeIcon = node.icon;
                const isSelected = activeNode === node.id;
                return (
                  <div
                    key={node.id}
                    className={`arch-node ${isSelected ? "active" : ""}`}
                    onClick={() => setActiveNode(node.id)}
                  >
                    <div
                      className="arch-node-icon"
                      style={{
                        background: node.bg,
                        color: node.color,
                        border: `1px solid ${node.border}`,
                      }}
                    >
                      <NodeIcon size={16} />
                    </div>
                    <div>
                      <div className="arch-node-name">{node.name}</div>
                      <div className="arch-node-role">{node.role}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="arch-flow-indicator" style={{ height: "calc(100% - 80px)" }} />
          </div>

          {/* Description Panel */}
          <div className="arch-desc-panel">
            <div>
              <h3 className="arch-desc-title">{activeNodeData.title}</h3>
              <div className="arch-desc-spec">{activeNodeData.spec}</div>
              <p className="arch-desc-text">{activeNodeData.text}</p>
              <div className="arch-desc-points">
                {activeNodeData.points.map((pt, index) => (
                  <div key={index} className="arch-desc-point">
                    <CheckCircle size={14} style={{ color: "var(--gr)", flexShrink: 0, marginTop: 2 }} />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ marginTop: 20 }}>
              <button onClick={onLaunchConsole} className="btn bg2 bsm" style={{ width: "100%", justifyContent: "center" }}>
                Test {activeNodeData.name} In Console <ArrowRight size={13} style={{ marginLeft: 6 }} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* PwC Philosophy Section */}
      <section id="philosophy" className="lp-section">
        <div className="lp-sect-hdr">
          <h2 className="lp-sect-title">Agentic AI Philosophy</h2>
          <p className="lp-sect-desc">
            Aligned with production-grade AI requirements emphasizing risk mitigation, explainable logic, and state compliance.
          </p>
        </div>
        <div className="lp-pwc-grid">
          <div className="lp-pwc-card">
            <div className="lp-pwc-icon">
              <Database size={24} style={{ color: "var(--bl)" }} />
            </div>
            <h4 className="lp-pwc-title">Context Engineering</h4>
            <p className="lp-pwc-desc">
              Leverage unified schema interfaces to feed accurate, relevant policy variables directly to active sub-agent chains.
            </p>
          </div>
          <div className="lp-pwc-card">
            <div className="lp-pwc-icon">
              <Eye size={24} style={{ color: "var(--te)" }} />
            </div>
            <h4 className="lp-pwc-title">Full Observability</h4>
            <p className="lp-pwc-desc">
              Audit trails mapping agent thoughts, API logs, database transactions, and model weights outputs in real time.
            </p>
          </div>
          <div className="lp-pwc-card">
            <div className="lp-pwc-icon">
              <Shield size={24} style={{ color: "var(--am)" }} />
            </div>
            <h4 className="lp-pwc-title">Strict Guardrails</h4>
            <p className="lp-pwc-desc">
              Automatic validation on outbound messaging tone, customer contact limits, and privacy laws data masking.
            </p>
          </div>
          <div className="lp-pwc-card">
            <div className="lp-pwc-icon">
              <BarChart2 size={24} style={{ color: "var(--gr)" }} />
            </div>
            <h4 className="lp-pwc-title">Enterprise Reliability</h4>
            <p className="lp-pwc-desc">
              Robust error boundaries, transactional retries, fallback routines, and distributed logging compliance.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid var(--bdr)", padding: "40px 20px", background: "var(--surf)", textAlign: "center" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ textAlign: "left" }}>
            <div className="lp-logo-txt" style={{ fontSize: 18 }}>ARIES</div>
            <div style={{ fontSize: 11, color: "var(--t3)", marginTop: 4 }}>
              Distribution, Marketing &amp; Renewals AI Agent
            </div>
          </div>
          <div style={{ fontSize: 12, color: "var(--t3)" }}>
            &copy; 2026 AI Lab. All rights reserved. Guardrails Active.
          </div>
        </div>
      </footer>
    </div>
  );
}
