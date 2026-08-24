import { useState } from "react";
import {
  Lock,
  Mail,
  ShieldCheck,
  RefreshCw,
  ArrowLeft,
  Check,
  Database,
  Sparkles,
} from "lucide-react";
import * as api from "../api";

const CRM_ADMIN_PERSONA = {
  id: "crm",
  name: "CRM Admin",
  email: "crm@system.com",
  password: "123456",
  role: "Ingestion & Sync Hub",
  icon: Database,
  color: "var(--bl)",
  bgColor: "var(--bld)",
};

export default function Login({ onLogin, onBackToLanding }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSelected, setIsSelected] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSelectCrmAdmin = () => {
    setEmail(CRM_ADMIN_PERSONA.email);
    setPassword(CRM_ADMIN_PERSONA.password);
    setIsSelected(true);
    setError("");
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setIsSelected(false);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setIsSelected(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!email) {
      setError("Email address is required.");
      return;
    }

    if (!password) {
      setError("Password is required.");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);

      const res = await api.login({
        email,
        password,
      });

      console.log("LOGIN RESPONSE:", res);

      if (res && res.id) {
        localStorage.setItem("user", JSON.stringify(res));
      }

      onLogin(res);
    } catch (e) {
      setError(e.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrap">
      <div className="lp-grid-bg" />

      {/* Floating Back Button */}
      <button
        onClick={onBackToLanding}
        className="btn bg2 bsm"
        disabled={loading}
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        <ArrowLeft size={14} /> Back to Home
      </button>

      <div className="auth-panel">
        <div className="auth-header">
          <div className="auth-logo">ARIES</div>
          <div className="auth-subtitle">Agentic Revenue Intelligence</div>
          <h2 className="auth-title">Console Login</h2>
        </div>

        <form onSubmit={handleSubmit}>
          {error && <div className="err ani">{error}</div>}

          <div className="fg">
            <label className="fl" htmlFor="email">
              Email
            </label>
            <div style={{ position: "relative" }}>
              <Mail
                size={14}
                style={{
                  position: "absolute",
                  left: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--t3)",
                }}
              />
              <input
                id="email"
                type="email"
                className="fi"
                style={{ paddingLeft: 36 }}
                placeholder="name@organization.com"
                value={email}
                onChange={handleEmailChange}
                disabled={loading}
              />
            </div>
          </div>

          <div className="fg" style={{ marginBottom: 24 }}>
            <label className="fl" htmlFor="password">
              Password
            </label>
            <div style={{ position: "relative" }}>
              <Lock
                size={14}
                style={{
                  position: "absolute",
                  left: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--t3)",
                }}
              />
              <input
                id="password"
                type="password"
                className="fi"
                style={{ paddingLeft: 36 }}
                placeholder="••••••••••••"
                value={password}
                onChange={handlePasswordChange}
                disabled={loading}
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn bp2 lp-btn-glow"
            disabled={loading}
            style={{
              width: "100%",
              justifyContent: "center",
              padding: "12px",
              fontSize: 13,
              fontWeight: 700,
            }}
          >
            {loading ? (
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <RefreshCw size={14} className="spin" />
                Signing In...
              </span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Persona Tile at the Bottom */}
        <div className="persona-bottom-section">
          <div className="persona-title" style={{ marginBottom: 8 }}>
            <Sparkles size={13} style={{ color: "var(--bl)" }} /> Quick Login
          </div>

          <div
            className={`persona-single-tile ${isSelected ? "active" : ""}`}
            onClick={handleSelectCrmAdmin}
            title={`Auto-fill ${CRM_ADMIN_PERSONA.name} credentials (${CRM_ADMIN_PERSONA.email})`}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                className="persona-icon-box"
                style={{
                  background: CRM_ADMIN_PERSONA.bgColor,
                  color: CRM_ADMIN_PERSONA.color,
                }}
              >
                <Database size={15} />
              </div>
              <div>
                <div className="persona-name">{CRM_ADMIN_PERSONA.name}</div>
                <div className="persona-role-tag">
                  {CRM_ADMIN_PERSONA.email} • {CRM_ADMIN_PERSONA.role}
                </div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              {isSelected ? (
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: "var(--gr)",
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <Check size={12} strokeWidth={3} /> Loaded
                </span>
              ) : (
                <span
                  className="btn bxs bg2"
                  style={{ fontSize: 10, padding: "3px 8px" }}
                >
                  Auto-Fill
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="auth-sec-msg">
          <ShieldCheck size={14} style={{ color: "var(--gr)" }} />
          <span>Session Guardrails Engine: ACTIVE (v2.4)</span>
        </div>
      </div>
    </div>
  );
}


