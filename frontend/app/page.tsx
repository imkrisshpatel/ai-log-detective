"use client";

import { useState, useEffect } from "react";

// --- Custom Icons (Strictly weighted and centered) ---
const Icons = {
  SentinelLogo: () => (
    <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-black shadow-[0_0_20px_rgba(249,115,22,0.3)] mb-8 cursor-pointer hover:scale-105 transition-all">
      <svg className="w-6 h-6" fill="none" stroke="black" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
    </div>
  ),
  Grid: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>,
  Pulse: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12h4l3-8 5 16 3-8h4" /></svg>,
  Brain: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M12 2a5 5 0 015 5c0 1.226-.437 2.35-1.162 3.218-.621.742-.743.834-1.22 1.492a10.015 10.015 0 011.666 4.316C16.892 18.966 14.653 21 12 21s-4.892-2.034-4.284-4.974A10.015 10.015 0 019.382 11.71c-.477-.658-.6-.75-1.221-1.492A4.99 4.99 0 017 7a5 5 0 015-5z"/></svg>,
  Code: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>,
  DB: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"/></svg>,
  Search: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
  Chip: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>,
  Cloud: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"/></svg>,
  Flask: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>,
  Webhook: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>,
  Settings: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  User: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Bell: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
};

function SideBar() {
  const icons = [Icons.Grid, Icons.Pulse, Icons.Brain, Icons.Code, Icons.DB, Icons.Search, Icons.Chip, Icons.Cloud, Icons.Flask, Icons.Webhook];
  return (
    <aside className="w-[60px] flex-none border-r border-[#1c1c1c] flex flex-col items-center py-6 bg-[#0a0a0a] z-50">
      <Icons.SentinelLogo />
      <nav className="flex flex-col gap-6 text-[#444]">
        {icons.map((Icon, i) => (
          <div key={i} className={`p-1.5 cursor-pointer transition-colors hover:text-white ${i === 0 ? 'text-orange-500 bg-orange-500/10 rounded-lg shadow-[0_0_10px_rgba(249,115,22,0.2)]' : ''}`}><Icon /></div>
        ))}
      </nav>
      <div className="mt-auto flex flex-col items-center gap-6">
        <div className="text-[#444] hover:text-white cursor-pointer"><Icons.Settings /></div>
        <div className="text-[#444] hover:text-white cursor-pointer"><Icons.User /></div>
        <div className="w-2 h-2 rounded-full bg-[#22c55e] shadow-[0_0_8px_#22c55e]" />
      </div>
    </aside>
  );
}

function KpiCard({ label, value, meta, metaColor, sparkColor, topBorderColor }: any) {
  return (
    <div className="bg-[#111] border border-[#222] rounded-xl flex flex-col justify-between shadow-xl relative overflow-hidden h-[120px]">
      <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: topBorderColor }} />
      <div className="p-4 flex flex-col justify-between flex-1">
        <p className="text-[10px] text-[#555] font-bold uppercase tracking-widest leading-none">{label}</p>
        <h3 className="text-3xl font-bold text-white mt-2 leading-none">{value}</h3>
        <p className="text-[10px] mt-1" style={{ color: metaColor }}>{meta}</p>
        <div className="flex items-end gap-[2px] h-6 mt-2">
          {[...Array(12)].map((_, i) => (
            <div key={i} className={`flex-1 rounded-sm ${i > 9 ? `bg-${sparkColor}-500 shadow-[0_0_5px_rgba(249,115,22,0.4)]` : 'bg-white/5'}`} style={{height: `${30 + Math.random()*70}%`}} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [reports, setReports] = useState<any[]>([]);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch('http://127.0.0.1:8000/api/threats');
        const data = await res.json();
        setReports(data.reports || []);
        setIsLive(true);
      } catch (err) { setIsLive(false); }
    };
    getData();
    const interval = setInterval(getData, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-screen w-screen bg-black text-[#efefef] font-sans overflow-hidden selection:bg-orange-500/30">
      <SideBar />
      <main className="flex-1 flex flex-col min-w-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#111] via-[#000] to-[#000]">
        
        {/* HEADER */}
        <header className="h-[52px] border-b border-[#1c1c1c] flex items-center justify-between px-6 bg-[#0a0a0a]/90 backdrop-blur-sm z-10 flex-none">
          <div className="flex items-center gap-6">
            <span className="text-sm font-black tracking-[0.2em] text-white">SENTINEL AI</span>
            <span className="text-[10px] text-[#444] font-mono tracking-widest uppercase">Workspace / <span className="text-gray-300">Command Center</span></span>
          </div>
          <div className="flex items-center gap-6 text-[10px] font-mono text-[#666]">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${isLive ? 'border-orange-500/20 bg-orange-500/5 text-orange-500' : 'border-red-500/20 bg-red-500/5 text-red-500'}`}>
              <div className={`w-1.5 h-1.5 rounded-full ${isLive ? 'bg-orange-500 animate-pulse shadow-[0_0_8px_orange]' : 'bg-red-500'}`} />
              <span className="font-bold">{isLive ? 'ENGINE LIVE' : 'OFFLINE'}</span>
            </div>
            <div className="relative cursor-pointer hover:text-white transition-colors">
              <Icons.Bell /><div className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full flex items-center justify-center text-[8px] text-white font-bold">7</div>
            </div>
            <div className="w-8 h-8 rounded-full bg-blue-600 border border-white/10 flex items-center justify-center text-[10px] font-bold text-white shadow-lg">AK</div>
            <span className="text-[#333]">14:02:31 UTC</span>
          </div>
        </header>

        {/* WORKSPACE */}
        <div className="flex-1 flex flex-col p-4 lg:p-6 gap-4 min-h-0 overflow-hidden max-w-[1500px] mx-auto w-full pb-8">
            
            <div className="flex-none flex justify-between items-end mb-1">
               <div>
                   <h2 className="text-2xl font-semibold text-white tracking-tight leading-none">
                      Good evening, Alex — <span className="text-orange-500 font-bold">{reports.length || 7} anomalies</span> need attention
                   </h2>
                   <p className="text-[10px] font-mono text-[#444] mt-2 tracking-tight">production • us-east-1 • ca-central-1 • 4,218 logs/s</p>
               </div>
               <div className="flex gap-2">
                  <button className="text-[10px] text-[#666] border border-[#222] px-3 py-1.5 rounded-md hover:bg-white/5">Last 24h</button>
                  <button className="text-[10px] text-white bg-orange-600 px-3 py-1.5 rounded-md hover:bg-orange-500 shadow-lg font-bold">View incidents</button>
               </div>
            </div>

            {/* ROW 1: KPI CARDS */}
            <div className="flex-none grid grid-cols-4 gap-4">
              <KpiCard label="Logs Ingested" value="1.4M" meta="↑ 12% vs yesterday" metaColor="#FF8C00" sparkColor="orange" accentColor="#E24B4A" />
              <KpiCard label="Active Anomalies" value={reports.length || 7} meta="3 critical • 4 warning" metaColor="#E24B4A" sparkColor="red" accentColor="#E24B4A" />
              <KpiCard label="AI Patches Issued" value="23" meta="18 auto-committed" metaColor="#4CAF7D" sparkColor="orange" accentColor="#4CAF7D" />
              <KpiCard label="Patch Accuracy" value="91%" meta="30 day rolling avg" metaColor="#378ADD" sparkColor="blue" accentColor="#378ADD" />
            </div>

            {/* MAIN GRID */}
            <div className="flex-1 min-h-0 grid grid-cols-12 gap-4 pb-4">
                
                {/* TOWER 1: LOGS & HEATMAP */}
                <div className="col-span-5 flex flex-col gap-4 min-h-0">
                    <div className="flex-none h-[110px] bg-[#111] border border-[#222] rounded-xl p-4 flex flex-col justify-between shadow-lg overflow-hidden">
                        <p className="text-[9px] text-[#666] font-bold uppercase tracking-widest leading-none">Heat Map • Last 24H</p>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                            {[...Array(24)].map((_, i) => (
                                <div key={i} className={`w-[18px] h-4 rounded-sm ${i === 23 ? 'bg-orange-500 shadow-[0_0_10px_orange]' : i % 6 === 0 ? 'bg-orange-600/60' : 'bg-[#222]'}`} />
                            ))}
                        </div>
                        <div className="flex justify-between text-[8px] text-[#444] font-mono mt-2 leading-none uppercase"><span>-24h</span><span>now</span></div>
                    </div>
                    <div className="flex-1 bg-[#0a0a0a] border border-[#1c1c1c] rounded-xl flex flex-col min-h-0 shadow-2xl overflow-hidden">
                       <div className="flex-none px-4 py-3 border-b border-[#1c1c1c] text-[9px] font-bold text-[#666] uppercase tracking-widest flex justify-between items-center bg-[#0d0d0d]">
                           Live Log Stream <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse shadow-[0_0_5px_orange]" />
                       </div>
                       <div className="flex-1 overflow-y-auto p-4 font-mono text-[10px] space-y-4 custom-scrollbar leading-relaxed">
                          {reports.map((r, i) => (
                              <div key={i} className="border-l border-orange-500 pl-4 py-1">
                                  <p className="text-orange-500 font-bold mb-1">14:02:31 | ERR | db.pool.timeout</p>
                                  <p className="text-[#888] truncate">{r.raw_log}</p>
                              </div>
                          ))}
                          <p className="text-[#333]">14:02:30 | INF | [AUTH] validated · ca-central-1</p>
                          <p className="text-[#333]">14:02:29 | INF | heartbeat ok · worker_node_7</p>
                       </div>
                    </div>
                </div>

                {/* TOWER 2: INCIDENTS + NODES */}
                <div className="col-span-4 flex flex-col gap-4 min-h-0">
                    <div className="flex-1 bg-[#111] border border-[#222] rounded-xl flex flex-col min-h-0 shadow-xl overflow-hidden">
                       <div className="flex-none px-4 py-3 border-b border-[#222] text-[9px] font-bold text-[#666] uppercase tracking-widest flex justify-between bg-[#0d0d0d]">
                           Active Incidents <span className="text-red-500">7 open</span>
                       </div>
                       <div className="p-4 space-y-3 flex-1 overflow-y-auto custom-scrollbar">
                           <div className="border border-red-500/20 p-3 rounded-lg bg-[#161616] group cursor-pointer hover:border-red-500 transition-all">
                               <div className="flex justify-between items-start mb-2"><p className="text-xs font-bold text-white group-hover:text-red-500">#0042 - DB pool exhaustion</p><span className="text-[8px] font-bold uppercase bg-red-500/10 text-red-500 border border-red-500/20 px-2 py-0.5 rounded-full">critical</span></div>
                               <p className="text-[10px] text-[#444] font-mono leading-none">Confidence 94% · FP-001</p>
                           </div>
                       </div>
                    </div>
                    <div className="h-[180px] bg-[#111] border border-[#222] rounded-xl flex flex-col overflow-hidden shadow-xl">
                       <div className="px-4 py-3 border-b border-[#222] text-[9px] font-bold text-[#666] uppercase tracking-widest flex justify-between items-center bg-[#0d0d0d]">
                            Agent Nodes <span className="text-green-500 text-[8px] font-bold">5 ONLINE</span>
                       </div>
                       <div className="p-4 space-y-2 text-[10px] font-mono flex-1 overflow-hidden">
                           <div className="flex justify-between items-center text-orange-500 font-bold bg-orange-500/5 p-1 rounded"><span>mcp_source_reader</span><span className="animate-pulse">RUNNING</span></div>
                           <div className="flex justify-between items-center text-[#333]"><span>fingerprint_matcher</span><span>IDLE</span></div>
                           <div className="flex justify-between items-center text-[#333]"><span>patch_generator</span><span>IDLE</span></div>
                       </div>
                       <div className="p-3 border-t border-[#222]">
                            <div className="flex justify-between text-[9px] mb-2 uppercase font-bold tracking-tight"><span className="text-[#444]">RCA confidence avg</span><span className="text-orange-500 font-bold">91%</span></div>
                            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden shadow-inner"><div className="h-full bg-orange-500 w-[91%] shadow-[0_0_8px_orange]" /></div>
                       </div>
                    </div>
                </div>

                {/* TOWER 3: STABILITY + ACTIVITY */}
                <div className="col-span-3 flex flex-col gap-4 min-h-0">
                    <div className="flex-none h-[110px] bg-[#111] border border-[#222] rounded-xl p-4 flex flex-col justify-between shadow-lg">
                        <p className="text-[9px] text-[#555] font-bold uppercase tracking-widest leading-none">System Stability</p>
                        <div className="flex justify-around items-center flex-1">
                            <div className="text-center group"><div className="w-10 h-5 border-t-2 border-orange-500 rounded-t-full mx-auto" /><p className="text-sm font-bold text-white mt-1 leading-none">79%</p><p className="text-[8px] text-[#444] uppercase font-bold">uptime</p></div>
                            <div className="text-center group"><div className="w-10 h-5 border-t-2 border-blue-500 rounded-t-full mx-auto" /><p className="text-sm font-bold text-white mt-1 leading-none">50%</p><p className="text-[8px] text-[#444] uppercase font-bold">pool</p></div>
                            <div className="text-center group"><div className="w-10 h-5 border-t-2 border-red-500 rounded-t-full mx-auto" /><p className="text-sm font-bold text-white mt-1 leading-none">21%</p><p className="text-[8px] text-[#444] uppercase font-bold">errors</p></div>
                        </div>
                    </div>
                    <div className="flex-1 bg-[#111] border border-[#222] rounded-xl flex flex-col min-h-0 shadow-xl overflow-hidden">
                        <div className="px-4 py-3 border-b border-[#222] text-[9px] font-bold text-[#666] uppercase tracking-widest bg-[#0d0d0d]">Activity • Today</div>
                        <div className="p-4 space-y-5 flex-1 overflow-y-auto custom-scrollbar">
                            <div className="flex items-start gap-3 relative"><div className="w-2 h-2 rounded-full bg-red-500 mt-1.5 shadow-[0_0_5px_red] z-10"/><div className="h-10 w-px bg-[#222] absolute top-4 left-1 z-0"/><p className="text-[11px] text-[#888] flex-1 leading-tight">Incident #0042 · DB exhaustion · RCA engine triggered</p><span className="text-[9px] text-[#333] font-mono">14:02</span></div>
                            <div className="flex items-start gap-3 relative"><div className="w-2 h-2 rounded-full bg-orange-500 mt-1.5 shadow-[0_0_5px_orange] z-10"/><div className="h-10 w-px bg-[#222] absolute top-4 left-1 z-0"/><p className="text-[11px] text-[#888] flex-1 leading-tight">Patch #0041 committed · fix deployed to ca-central-1</p><span className="text-[9px] text-[#333] font-mono">09:14</span></div>
                        </div>
                    </div>
                    <div className="h-[150px] bg-[#111] border border-[#222] rounded-xl p-4 flex flex-col justify-between shadow-xl relative min-h-0">
                        <div className="flex justify-between items-center"><p className="text-[9px] text-[#555] font-bold uppercase tracking-widest">Throughput</p><span className="text-[10px] text-orange-500 font-bold font-mono">6.1k/s</span></div>
                        <div className="flex-1 flex gap-px items-end min-h-0 pt-4 pb-1">
                            {[...Array(24)].map((_, i) => (
                                <div key={i} className={`flex-1 bg-gradient-to-t from-orange-600 to-orange-400 rounded-t-sm ${i === 23 ? 'shadow-[0_0_8px_orange]' : 'opacity-40'}`} style={{height: `${20 + Math.random()*80}%`}} />
                            ))}
                        </div>
                        <p className="text-[8px] text-[#333] font-mono uppercase text-right tracking-tighter leading-none pt-2">live stream • last 1h</p>
                    </div>
                </div>

            </div>
        </div>
        
        <footer className="h-8 flex-none border-t border-[#1c1c1c] bg-[#0c0c0c] flex items-center px-6 gap-6 z-20">
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-[#333] font-mono leading-none tracking-tighter uppercase">agent active • mcp_source_reader · reading pool.py:142</span>
          </div>
          <span className="ml-auto text-[10px] text-[#222] font-mono italic tracking-tighter leading-none">Sentinel v2.4.1</span>
        </footer>
      </main>
    </div>
  );
}