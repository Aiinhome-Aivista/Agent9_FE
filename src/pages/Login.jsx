import { useState, useEffect } from "react";
import {
  Lock,
  Mail,
  ShieldCheck,
  RefreshCw,
  ArrowLeft,
  Check,
} from "lucide-react";
import * as api from "../api";

export default function Login({ onLogin, onBackToLanding }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
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

          <div className="auth-sec-msg">
            <ShieldCheck size={14} style={{ color: "var(--gr)" }} />
            <span>Session Guardrails Engine: ACTIVE (v2.4)</span>
          </div>
        </form>
      </div>
    </div>
  );
}
