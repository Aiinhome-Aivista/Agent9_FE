import { Bell, Settings, LogOut, Sun, Moon } from "lucide-react";

const TITLES = {
  overview: ["System Overview", "Multi-agent pipeline"],
  connector: ["Connector Agent", "Ingest CSV data & connect CRM"],
  policy: [
    "Policy Warehouse Agent",
    "Upload, extract & index insurance policies",
  ],
  prospects: [
    "Prospective Customer Agent",
    "AI-ranked new policy & renewal targets",
  ],
  campaigns: [
    "Campaign Execution Agent",
    "Multi-channel outreach orchestration",
  ],
};

export default function Header({ view, onLogout, theme, toggleTheme }) {
  const [title, sub] = TITLES[view] || ["", ""];

  return (
    <header className="mh">
      <div className="mh-l">
        <h1>{title}</h1>
        <p>{sub}</p>
      </div>
      <div className="mh-r">
        <button
          onClick={toggleTheme}
          className="btn bg2 bsm"
          title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
        >
          {theme === "dark" ? <Sun size={13} /> : <Moon size={13} />}
        </button>
        {/* <button className="btn bg2 bsm">
          <Bell size={13} />
        </button>
        <button className="btn bg2 bsm">
          <Settings size={13} />
        </button> */}
        <button
          onClick={onLogout}
          className="btn bg2 bsm"
          style={{
            color: "var(--rd)",
            borderColor: "rgba(244,63,94,0.15)",
            gap: 4,
          }}
        >
          <LogOut size={13} />
          <span>Sign Out</span>
        </button>
      </div>
    </header>
  );
}
