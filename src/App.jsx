import { useState, useEffect } from "react";
import STYLES from "./styles.js";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Overview from "./pages/Overview";
import Connector from "./pages/Connector";
import PolicyWarehouse from "./pages/PolicyWarehouse";
import ProspectAgent from "./pages/ProspectAgent";
import Campaigns from "./pages/Campaigns";
import Landing from "./pages/Landing";
import Login from "./pages/Login";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("aries_authenticated") === "true";
  });
  const [view, setView] = useState(() => {
    return localStorage.getItem("aries_authenticated") === "true" ? "overview" : "landing";
  });
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("aries_theme") || "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.style.removeProperty("--bg");
    localStorage.setItem("aries_theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === "dark" ? "light" : "dark");
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem("aries_authenticated", "true");
    setView("overview");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("aries_authenticated");
    setView("landing");
  };

  const showDashboard = isAuthenticated && ["overview", "connector", "policy", "prospects", "campaigns"].includes(view);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      {showDashboard ? (
        <div className="app">
          <Sidebar view={view} setView={setView} />
          <main className="main">
            <Header view={view} onLogout={handleLogout} theme={theme} toggleTheme={toggleTheme} />
            <div className="mc">
              {view === "overview" && <Overview setView={setView} />}
              {view === "connector" && <Connector />}
              {view === "policy" && <PolicyWarehouse />}
              {view === "prospects" && <ProspectAgent />}
              {view === "campaigns" && <Campaigns />}
            </div>
          </main>
        </div>
      ) : view === "login" ? (
        <Login onLogin={handleLogin} onBackToLanding={() => setView("landing")} />
      ) : (
        <Landing onLaunchConsole={() => setView(isAuthenticated ? "overview" : "login")} theme={theme} toggleTheme={toggleTheme} />
      )}
    </>
  );
}

