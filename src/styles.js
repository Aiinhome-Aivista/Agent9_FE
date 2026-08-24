/* ══════════════════════════════════════════════════════════
   GLOBAL STYLES — DUAL THEME SYSTEM (LIGHT & DARK)
   Palette Specs:
   Primary Orange:   #FF5A14
   Button Orange:    #FF7A45
   Hover Orange:     #F56B2F
   Sidebar:          #4A4A4A (Light) / #1A1D24 (Dark)
   Light Background: #FFFFFF
   Input Background: #FFF7F2 (Light) / #20283A (Dark)
   Light Border:     #D8D8D8 (Light) / rgba(255,255,255,0.12) (Dark)
   Orange Border:    #FF8A55
   Primary Text:     #666666 (Light) / #9CA3AF (Dark)
   Secondary Text:   #888888 (Light) / #6B7280 (Dark)
   Placeholder:      #B0B0B0 (Light) / #4B5563 (Dark)
   White:            #FFFFFF
   ══════════════════════════════════════════════════════════ */
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}

:root {
  --am: #FF5A14;
  --am-btn: #FF7A45;
  --am-hov: #F56B2F;
  --am2: #FF7A45;
  --amd: rgba(255, 90, 20, 0.15);

  --sb-bg: #1A1D24;
  --bg: #0B0E14;
  --surf: #121620;
  --card: #181E2B;
  --elev: #20283A;

  --bdr: rgba(255, 255, 255, 0.12);
  --bdr-hi: #FF8A55;

  --t1: #F3F4F6;
  --t2: #9CA3AF;
  --t3: #6B7280;
  --t4: #4B5563;

  --te: #14B8A6; --ted: rgba(20,184,166,0.15);
  --bl: #3B82F6; --bld: rgba(59,130,246,0.15);
  --gr: #22C55E; --grd: rgba(34,197,94,0.15);
  --rd: #F43F5E; --rdd: rgba(244,63,94,0.15);
  --pu: #8B5CF6; --pud: rgba(139,92,246,0.15);

  --fd: 'Inter', sans-serif; --fb: 'Inter', sans-serif; --fm: 'JetBrains Mono', monospace;
  --r: 8px; --rl: 12px;
  --nav-bg: rgba(11, 14, 20, 0.88);
}

[data-theme="dark"] {
  --am: #FF5A14;
  --am-btn: #FF7A45;
  --am-hov: #F56B2F;
  --am2: #FF7A45;
  --amd: rgba(255, 90, 20, 0.15);

  --sb-bg: #1A1D24;
  --bg: #0B0E14;
  --surf: #121620;
  --card: #181E2B;
  --elev: #20283A;

  --bdr: rgba(255, 255, 255, 0.12);
  --bdr-hi: #FF8A55;

  --t1: #F3F4F6;
  --t2: #9CA3AF;
  --t3: #6B7280;
  --t4: #4B5563;

  --nav-bg: rgba(11, 14, 20, 0.88);
}

[data-theme="light"] {
  --am: #FF5A14;
  --am-btn: #FF7A45;
  --am-hov: #F56B2F;
  --am2: #FF7A45;
  --amd: rgba(255, 90, 20, 0.08);

  --sb-bg: #4A4A4A;
  --bg: #FFFFFF;
  --surf: #FFFFFF;
  --card: #FFFFFF;
  --elev: #FFF7F2;

  --bdr: #D8D8D8;
  --bdr-hi: #FF8A55;

  --t1: #1E1E1E;
  --t2: #666666;
  --t3: #888888;
  --t4: #B0B0B0;

  --nav-bg: rgba(255, 255, 255, 0.95);
}

html,body,#root{height:100%;font-family:var(--fb);background:var(--bg);color:var(--t2)}
::-webkit-scrollbar{width:5px;height:5px}
::-webkit-scrollbar-track{background:var(--bg)}
::-webkit-scrollbar-thumb{background:var(--bdr);border-radius:3px}

.app{display:flex;height:100vh;overflow:hidden}

/* Sidebar */
.sb{width:248px;min-width:248px;background:var(--sb-bg);border-right:1px solid var(--bdr);display:flex;flex-direction:column;color:#FFFFFF}
.sb-logo{padding:20px 18px 14px;border-bottom:1px solid rgba(255,255,255,0.1)}
.lm{font-family:var(--fd);font-size:22px;font-weight:800;color:var(--am);letter-spacing:3px}
.lt{font-size:9px;color:#D8D8D8;letter-spacing:1.5px;text-transform:uppercase;margin-top:3px;opacity:0.8}
.sb-nav{flex:1;padding:10px 8px;overflow-y:auto;display:flex;flex-direction:column;gap:2px}
.nlbl{font-size:9px;font-weight:700;color:#D8D8D8;letter-spacing:2px;text-transform:uppercase;padding:8px 10px 4px;opacity:0.7}
.ni{display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:var(--r);cursor:pointer;transition:all .15s;border:1px solid transparent;color:#FFFFFF}
.ni:hover{background:rgba(255,255,255,0.12)}.ni.act{background:rgba(255,90,20,0.25);border-color:var(--bdr-hi)}
.nic{color:#D8D8D8;flex-shrink:0}.ni.act .nic{color:var(--am)}
.ntx{font-size:13px;font-weight:500;color:#FFFFFF;flex:1}.ni.act .ntx{color:#FFFFFF;font-weight:700}
.dot{width:6px;height:6px;border-radius:50%;flex-shrink:0}
.da{background:var(--gr);box-shadow:0 0 6px var(--gr)}.di{background:var(--t4)}
.dp{background:var(--am);animation:pulse 1s infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}
.sb-ft{padding:10px;border-top:1px solid rgba(255,255,255,0.1)}
.asp{background:rgba(0,0,0,0.15);border:1px solid rgba(255,255,255,0.1);border-radius:var(--r);padding:10px}
.aspt{font-size:9px;font-weight:700;color:#D8D8D8;letter-spacing:2px;text-transform:uppercase;margin-bottom:8px}
.asr{display:flex;align-items:center;gap:8px;padding:3px 0}
.asn{font-size:11px;color:#FFFFFF;flex:1}
.asb{font-family:var(--fm);font-size:9px;padding:2px 6px;border-radius:3px}

.ba{background:var(--grd);color:var(--gr)}.bi{background:var(--card);color:var(--t3)}.bp{background:var(--amd);color:var(--am)}

/* Main Header */
.main{flex:1;display:flex;flex-direction:column;overflow:hidden;background:var(--bg)}
.mh{height:62px;background:var(--surf);border-bottom:1px solid var(--bdr);display:flex;align-items:center;justify-content:space-between;padding:0 26px;flex-shrink:0}
.mh-l h1{font-family:var(--fd);font-size:17px;font-weight:700;color:var(--t1)}
.mh-l p{font-size:11px;color:var(--t3);margin-top:1px}
.mh-r{display:flex;align-items:center;gap:8px}
.mc{flex:1;overflow-y:auto;padding:22px 26px}

/* Buttons */
.btn{display:inline-flex;align-items:center;gap:7px;padding:8px 16px;border-radius:var(--r);font-family:var(--fb);font-size:13px;font-weight:600;cursor:pointer;border:none;transition:all .15s}
.bp2{background:var(--am-btn);color:#FFFFFF}.bp2:hover{background:var(--am-hov);color:#FFFFFF}.bp2:disabled{opacity:.5;cursor:not-allowed}
.bs{background:var(--card);color:var(--t2);border:1px solid var(--bdr)}.bs:hover{background:var(--elev);border-color:var(--bdr-hi);color:var(--t1)}
.bg2{background:transparent;color:var(--t2);border:1px solid var(--bdr)}.bg2:hover{background:var(--elev);color:var(--am);border-color:var(--bdr-hi)}
.bsm{padding:5px 12px;font-size:12px}.bxs{padding:3px 8px;font-size:11px}

/* Cards & Layout */
.card{background:var(--card);border:1px solid var(--bdr);border-radius:var(--rl);padding:18px;box-shadow:0 2px 8px rgba(0,0,0,0.03)}
.ct{font-family:var(--fd);font-size:14px;font-weight:700;color:var(--t1)}
.cs{font-size:11px;color:var(--t3);margin-top:2px}
.g2{display:grid;grid-template-columns:1fr 1fr;gap:14px;align-items:stretch}
.g2 > div{display:flex;flex-direction:column}
.equal-card{flex:1}
.g4{display:grid;grid-template-columns:repeat(4,1fr);gap:13px}
.mc-g{display:grid;grid-template-columns:repeat(4,1fr);gap:13px;margin-bottom:20px}
.mc-c{background:var(--card);border:1px solid var(--bdr);border-radius:var(--rl);padding:16px 18px;position:relative;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.03)}
.mc-c::after{content:'';position:absolute;top:-10px;right:-10px;width:60px;height:60px;border-radius:50%;filter:blur(22px);opacity:.2}
.mc-c.am::after{background:var(--am)}.mc-c.te::after{background:var(--te)}.mc-c.bl::after{background:var(--bl)}.mc-c.gr::after{background:var(--gr)}
.mc-l{font-size:10px;color:var(--t3);font-weight:600;letter-spacing:.5px;text-transform:uppercase;margin-bottom:6px}
.mc-v{font-family:var(--fd);font-size:26px;font-weight:700;line-height:1;color:var(--t1)}
.mc-d{font-size:11px;color:var(--gr);margin-top:3px}
.mc-i{position:absolute;top:16px;right:16px;opacity:.15}
.tabs{display:flex;gap:2px;background:var(--elev);padding:3px;border-radius:var(--r);border:1px solid var(--bdr);width:fit-content}
.tab{padding:6px 16px;border-radius:5px;font-size:13px;font-weight:500;cursor:pointer;color:var(--t2);transition:all .15s;border:none;background:transparent}
.tab:hover{color:var(--t1)}.tab.act{background:var(--card);color:var(--am);font-weight:700;border:1px solid var(--bdr-hi)}
.pt{width:100%;border-collapse:collapse;font-size:13px}
.pt th{text-align:left;padding:9px 12px;font-size:10px;font-weight:700;color:var(--t3);letter-spacing:1.5px;text-transform:uppercase;border-bottom:1px solid var(--bdr)}
.pt td{padding:11px 12px;border-bottom:1px solid var(--bdr);color:var(--t2)}
.pt tr:hover td{background:var(--elev);cursor:pointer}

/* Form inputs & controls */
.fi{background:var(--elev);border:1px solid var(--bdr);border-radius:var(--r);padding:9px 12px;color:var(--t2);font-family:var(--fb);font-size:13px;transition:border-color .15s, box-shadow .15s;outline:none;width:100%}
.fi::placeholder{color:var(--t4)}
.fi:focus{border-color:var(--bdr-hi);box-shadow:0 0 0 3px rgba(255,122,69,0.12)}
.fta{width:100%;background:var(--elev);border:1px solid var(--bdr);border-radius:var(--r);padding:9px 12px;color:var(--t2);font-family:var(--fm);font-size:11px;line-height:1.6;min-height:150px;resize:vertical;outline:none}
.fta::placeholder{color:var(--t4)}
.fta:focus{border-color:var(--bdr-hi)}
.fl{display:block;font-size:12px;font-weight:600;color:var(--t2);margin-bottom:5px}
.fg{margin-bottom:14px}
.air{background:var(--elev);border:1px solid var(--bdr-hi);border-radius:var(--rl);padding:16px;font-size:12px;color:var(--t2);line-height:1.75;white-space:pre-wrap}
.sc{display:inline-block;padding:0;border-radius:0;font-family:var(--fb);font-size:11px;font-weight:400;line-height:1.5;background:transparent;color:var(--t2);border:none;word-break:break-word}
.log-i{display:flex;align-items:flex-start;gap:10px;padding:7px 0;border-bottom:1px solid var(--bdr);font-size:12px}
.log-t{font-family:var(--fm);font-size:10px;color:var(--t3);flex-shrink:0;padding-top:2px}
.log-a{padding:2px 8px;border-radius:4px;font-size:10px;font-weight:600;flex-shrink:0;background:var(--card);color:var(--t2)}
.log-m{color:var(--t2);line-height:1.4}.log-s .log-m{color:var(--gr)}
.gl{height:1px;background:linear-gradient(to right,transparent,var(--am),transparent);opacity:.35;margin:16px 0}
.stl{font-family:var(--fd);font-size:12px;font-weight:700;color:var(--t2);letter-spacing:1px;text-transform:uppercase;display:flex;align-items:center;gap:8px;margin-bottom:12px}
.stl::after{content:'';flex:1;height:1px;background:var(--bdr)}
.ptb{display:inline-flex;padding:3px 10px;border-radius:4px;font-size:10px;font-weight:700;letter-spacing:.5px;text-transform:uppercase;margin-bottom:8px}
.tLife{background:var(--amd);color:var(--am)}.tHealth{background:var(--grd);color:var(--gr)}.tMotor{background:var(--bld);color:var(--bl)}.tProperty{background:var(--pud);color:var(--pu)}.tCommercial{background:var(--ted);color:var(--te)}

/* Urgency Colored Pill Text Badges */
.ub {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.3px;
  text-transform: uppercase;
  white-space: nowrap;
}
.ub-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
}

/* Critical — Red Pill */
.uCritical {
  background: rgba(244, 63, 94, 0.14);
  color: #F43F5E;
  border: 1px solid rgba(244, 63, 94, 0.3);
}
.uCritical-dot {
  background: #F43F5E;
  box-shadow: 0 0 6px rgba(244, 63, 94, 0.8);
}

/* High — Orange Pill */
.uHigh {
  background: rgba(255, 90, 20, 0.14);
  color: #FF5A14;
  border: 1px solid rgba(255, 122, 69, 0.3);
}
.uHigh-dot {
  background: #FF5A14;
  box-shadow: 0 0 6px rgba(255, 90, 20, 0.8);
}

/* Medium — Blue / Teal Pill */
.uMedium {
  background: rgba(59, 130, 246, 0.14);
  color: #3B82F6;
  border: 1px solid rgba(59, 130, 246, 0.3);
}
.uMedium-dot {
  background: #3B82F6;
  box-shadow: 0 0 6px rgba(59, 130, 246, 0.8);
}

/* Low — Green Pill */
.uLow {
  background: rgba(34, 197, 94, 0.14);
  color: #22C55E;
  border: 1px solid rgba(34, 197, 94, 0.3);
}
.uLow-dot {
  background: #22C55E;
  box-shadow: 0 0 6px rgba(34, 197, 94, 0.8);
}

@keyframes fi2{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
.ani{animation:fi2 .25s ease forwards}
@keyframes spin{to{transform:rotate(360deg)}}
.spin{animation:spin 1s linear infinite}
.err{background:var(--rdd);border:1px solid rgba(244,63,94,.25);border-radius:var(--r);padding:10px 14px;font-size:12px;color:var(--rd);margin-bottom:12px}


/* ══════════════════════════════════════════════════════════
   LANDING PAGE STYLES
   ══════════════════════════════════════════════════════════ */
.lp-container {
  min-height: 100vh;
  background: radial-gradient(circle at 50% 0%, rgba(255,90,20,0.06), transparent 50%), var(--bg);
  overflow-x: hidden;
  color: var(--t2);
  font-family: var(--fb);
  position: relative;
}
.lp-grid-bg {
  position: absolute;
  top: 0; left: 0; right: 0; height: 600px;
  background-image: linear-gradient(rgba(216,216,216,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(216,216,216,0.3) 1px, transparent 1px);
  background-size: 40px 40px;
  background-position: center top;
  pointer-events: none;
  z-index: 0;
}
.lp-nav {
  position: sticky; top: 0; z-index: 100;
  background: var(--nav-bg, rgba(255,255,255,0.95));
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--bdr);
  height: 70px;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 40px;
}
.lp-logo-wrap {
  display: flex; align-items: center; gap: 8px;
}
.lp-logo-txt {
  font-family: var(--fd);
  font-size: 22px; font-weight: 800;
  color: var(--am); letter-spacing: 2px;
}
.lp-logo-sub {
  font-size: 8px; color: var(--t3); letter-spacing: 1px; text-transform: uppercase; margin-top: -3px;
}
.lp-nav-links {
  display: flex; gap: 30px;
}
.lp-nav-link {
  color: var(--t2); font-size: 13px; font-weight: 500; text-decoration: none; transition: color 0.2s; cursor: pointer;
}
.lp-nav-link:hover { color: var(--am); }
.lp-hero {
  max-width: 1100px; margin: 80px auto 60px; text-align: center; padding: 0 20px; position: relative; z-index: 1;
}
.lp-badge {
  display: inline-flex; align-items: center; gap: 6px;
  background: var(--amd); border: 1px solid var(--bdr-hi);
  padding: 6px 14px; border-radius: 30px;
  color: var(--am); font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1.5px;
  margin-bottom: 24px;
}
.lp-hero-title {
  font-family: var(--fd);
  font-size: 54px; font-weight: 800; line-height: 1.15;
  color: var(--t1);
  margin-bottom: 20px; letter-spacing: -1px;
}
.lp-hero-title span {
  color: var(--am);
  -webkit-text-fill-color: initial;
  background: none;
}
.lp-hero-subtitle {
  font-size: 18px; color: var(--t2); max-width: 800px; margin: 0 auto 36px; line-height: 1.6;
}
.lp-hero-ctas {
  display: flex; justify-content: center; gap: 16px; margin-bottom: 60px;
}
.lp-btn-glow {
  position: relative;
}
.lp-btn-glow::after {
  content: ''; position: absolute; inset: -4px;
  background: var(--am); border-radius: inherit; filter: blur(8px);
  opacity: 0.3; z-index: -1; transition: opacity 0.2s;
}
.lp-btn-glow:hover::after { opacity: 0.6; }
.lp-stats {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; max-width: 1100px; margin: 0 auto 100px; padding: 0 20px;
}
.lp-stat-card {
  background: var(--card); border: 1px solid var(--bdr); border-radius: var(--rl); padding: 24px 20px; text-align: center;
  position: relative; overflow: hidden; transition: border-color 0.2s, transform 0.2s; box-shadow: 0 2px 8px rgba(0,0,0,0.03);
}
.lp-stat-card:hover { border-color: var(--bdr-hi); transform: translateY(-2px); }
.lp-stat-val { font-family: var(--fd); font-size: 36px; font-weight: 800; color: var(--am); margin-bottom: 6px; }
.lp-stat-lbl { font-size: 12px; color: var(--t2); font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px; }
.lp-section {
  max-width: 1100px; margin: 0 auto 100px; padding: 0 20px;
}
.lp-sect-hdr { text-align: center; margin-bottom: 50px; }
.lp-sect-title { font-family: var(--fd); font-size: 32px; font-weight: 700; color: var(--t1); margin-bottom: 12px; }
.lp-sect-desc { font-size: 15px; color: var(--t2); max-width: 600px; margin: 0 auto; line-height: 1.5; }
.lp-features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.lp-feat-card {
  background: var(--card); border: 1px solid var(--bdr); border-radius: var(--rl); padding: 30px 24px; transition: all 0.2s; box-shadow: 0 2px 8px rgba(0,0,0,0.03);
}
.lp-feat-card:hover { border-color: var(--bdr-hi); background: var(--elev); transform: translateY(-3px); }
.lp-feat-icon {
  width: 44px; height: 44px; border-radius: var(--r); display: flex; align-items: center; justify-content: center; margin-bottom: 20px;
}
.lp-feat-title { font-family: var(--fd); font-size: 18px; font-weight: 700; color: var(--t1); margin-bottom: 10px; }
.lp-feat-desc { font-size: 13px; color: var(--t2); line-height: 1.6; }

/* Interactive Architecture */
.arch-showcase {
  display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 30px; background: var(--surf); border: 1px solid var(--bdr); border-radius: var(--rl); padding: 30px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.03);
}
.arch-visualizer {
  position: relative; display: flex; flex-direction: column; gap: 24px; padding: 20px; background: var(--elev); border: 1px solid var(--bdr); border-radius: var(--r); justify-content: center;
}
.arch-nodes-container {
  display: flex; flex-direction: column; gap: 16px; position: relative; z-index: 2;
}
.arch-node {
  background: var(--card); border: 1px solid var(--bdr); border-radius: var(--r); padding: 14px 18px; display: flex; align-items: center; gap: 14px; cursor: pointer; transition: all 0.2s;
}
.arch-node:hover { border-color: var(--bdr-hi); background: var(--elev); }
.arch-node.active {
  border-color: var(--am); background: var(--amd); box-shadow: 0 0 15px rgba(255,90,20,0.1);
}
.arch-node-icon {
  width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
}
.arch-node-name { font-family: var(--fd); font-size: 14px; font-weight: 700; color: var(--t1); }
.arch-node-role { font-size: 11px; color: var(--t3); margin-top: 1px; }
.arch-flow-indicator {
  position: absolute; width: 2px; background: dashed var(--am); opacity: 0.3; z-index: 1; left: 34px;
}
.arch-desc-panel {
  display: flex; flex-direction: column; justify-content: space-between; border-left: 1px solid var(--bdr); padding-left: 30px;
}
.arch-desc-title { font-family: var(--fd); font-size: 20px; font-weight: 700; color: var(--am); margin-bottom: 12px; }
.arch-desc-spec { font-family: var(--fm); font-size: 11px; color: var(--te); margin-bottom: 20px; }
.arch-desc-text { font-size: 13px; color: var(--t2); line-height: 1.6; margin-bottom: 20px; }
.arch-desc-points { display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px; }
.arch-desc-point { display: flex; align-items: flex-start; gap: 8px; font-size: 12px; color: var(--t2); }
.arch-desc-point span { color: var(--gr); font-weight: bold; }

/* PwC Philosophy Section */
.lp-pwc-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
.lp-pwc-card {
  background: var(--card); border: 1px solid var(--bdr); border-radius: var(--rl); padding: 24px; transition: border-color 0.2s; box-shadow: 0 2px 8px rgba(0,0,0,0.03);
}
.lp-pwc-card:hover { border-color: var(--bdr-hi); }
.lp-pwc-icon { color: var(--am); margin-bottom: 16px; }
.lp-pwc-title { font-family: var(--fd); font-size: 15px; font-weight: 700; color: var(--t1); margin-bottom: 8px; }
.lp-pwc-desc { font-size: 12px; color: var(--t2); line-height: 1.5; }

/* Auth Page */
.auth-wrap {
  min-height: 100vh; display: flex; align-items: center; justify-content: center;
  background: radial-gradient(circle at 50% 30%, rgba(255,90,20,0.06), transparent 60%), var(--bg);
  padding: 20px; position: relative; overflow: hidden;
}
.auth-panel {
  width: 100%; max-width: 440px; background: var(--card); border: 1px solid var(--bdr); border-radius: var(--rl);
  padding: 36px 32px; box-shadow: 0 10px 30px rgba(0,0,0,0.06); position: relative; z-index: 1;
}
.auth-header { text-align: center; margin-bottom: 24px; }
.auth-logo { font-family: var(--fd); font-size: 28px; font-weight: 800; color: var(--am); letter-spacing: 3px; }
.auth-title { font-family: var(--fd); font-size: 18px; font-weight: 700; color: var(--t1); margin: 8px 0 4px; }
.auth-subtitle { font-size: 12px; color: var(--t3); text-transform: uppercase; letter-spacing: 1px; }
.auth-sec-msg {
  display: flex; align-items: center; gap: 8px; justify-content: center; margin-top: 20px; font-size: 11px; color: var(--t3);
}

/* Single Bottom Quick Login Tile */
.persona-bottom-section {
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px dashed var(--bdr);
}
.persona-single-tile {
  background: var(--elev);
  border: 1px solid var(--bdr);
  border-radius: var(--r);
  padding: 10px 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: space-between;
  user-select: none;
}
.persona-single-tile:hover {
  border-color: var(--bdr-hi);
  background: #FFF0E6;
  transform: translateY(-1px);
}
.persona-single-tile.active {
  border-color: var(--bdr-hi);
  background: rgba(255,90,20,0.08);
  box-shadow: 0 0 12px rgba(255, 122, 69, 0.15);
}
.persona-icon-box {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255,90,20,0.1);
  color: var(--am);
}
.persona-name {
  font-size: 12px;
  font-weight: 700;
  color: var(--t1);
}
.persona-role-tag {
  font-size: 10px;
  color: var(--t3);
}
`;

export default STYLES;




