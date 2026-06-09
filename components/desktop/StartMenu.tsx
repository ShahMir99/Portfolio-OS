"use client"

import { AnimatePresence, motion } from "framer-motion";
import { Power, User, Settings as SettingsIcon, FileText, Search } from "lucide-react";
import { useState, useMemo } from "react";
import { useDesktop, type AppId } from "@/store/desktop";
import { APPS } from "./apps-registry";
import { profile, projects } from "@/data/portfolio";

export function StartMenu() {
  const { startOpen, setStartOpen, openApp } = useDesktop();
  const [q, setQ] = useState("");

  const results = useMemo(() => {
    if (!q.trim()) return null;
    const needle = q.toLowerCase();
    const appHits = APPS.filter((a) => a.label.toLowerCase().includes(needle));
    const projHits = projects.filter(
      (p) =>
        p.name.toLowerCase().includes(needle) ||
        p.stack.some((s) => s.toLowerCase().includes(needle)),
    );
    return { appHits, projHits };
  }, [q]);

  const open = (id: AppId) => {
    openApp(id);
    setStartOpen(false);
    setQ("");
  };

  return (
    <AnimatePresence>
      {startOpen && (
        <>
          <div
            className="fixed inset-0 z-[9998]"
            onClick={() => setStartOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            className="fixed bottom-14 left-2 w-[560px] max-w-[95vw] h-[600px] max-h-[80vh] glass win-shadow rounded-lg z-[9999] overflow-hidden flex flex-col"
          >
            <div className="p-4 border-b border-white/5">
              <div className="flex items-center gap-2 bg-white/8 rounded px-3 h-10">
                <Search className="w-4 h-4 text-foreground/60" />
                <input
                  autoFocus
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search apps, projects, skills…"
                  className="bg-transparent outline-none text-sm flex-1 placeholder:text-foreground/40"
                />
              </div>
            </div>

            <div className="flex-1 overflow-auto p-4">
              {results ? (
                <div className="space-y-4">
                  {results.appHits.length > 0 && (
                    <div>
                      <h3 className="text-[11px] uppercase tracking-wider text-foreground/60 mb-2">Apps</h3>
                      <div className="grid grid-cols-2 gap-1">
                        {results.appHits.map((a) => {
                          const Icon = a.icon;
                          return (
                            <button
                              key={a.id}
                              onClick={() => open(a.id)}
                              className="flex items-center gap-3 p-2 rounded hover:bg-white/10 text-left"
                            >
                              <Icon className="w-5 h-5" style={{ color: a.color }} />
                              <span className="text-sm">{a.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  {results.projHits.length > 0 && (
                    <div>
                      <h3 className="text-[11px] uppercase tracking-wider text-foreground/60 mb-2">Projects</h3>
                      <div className="space-y-1">
                        {results.projHits.map((p) => (
                          <button
                            key={p.id}
                            onClick={() => open("projects")}
                            className="w-full flex flex-col items-start gap-0.5 p-2 rounded hover:bg-white/10 text-left"
                          >
                            <span className="text-sm">{p.name}</span>
                            <span className="text-[11px] text-foreground/60">{p.tagline}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  {results.appHits.length === 0 && results.projHits.length === 0 && (
                    <p className="text-sm text-foreground/60">No results.</p>
                  )}
                </div>
              ) : (
                <>
                  <h3 className="text-[11px] uppercase tracking-wider text-foreground/60 mb-2">Pinned</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {APPS.map((a) => {
                      const Icon = a.icon;
                      return (
                        <button
                          key={a.id}
                          onClick={() => open(a.id)}
                          className="flex flex-col items-center gap-2 p-3 rounded hover:bg-white/10 transition"
                        >
                          <div
                            className="w-10 h-10 rounded grid place-items-center"
                            style={{
                              background: `linear-gradient(180deg, ${a.color}33, ${a.color}11)`,
                              boxShadow: `inset 0 0 0 1px ${a.color}55`,
                            }}
                          >
                            <Icon className="w-5 h-5" style={{ color: a.color }} />
                          </div>
                          <span className="text-[11px] text-center leading-tight">{a.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  <h3 className="text-[11px] uppercase tracking-wider text-foreground/60 mt-6 mb-2">
                    Recommended
                  </h3>
                  <div className="space-y-1">
                    <button
                      onClick={() => open("resume")}
                      className="w-full flex items-center gap-3 p-2 rounded hover:bg-white/10 text-left"
                    >
                      <FileText className="w-5 h-5 text-rose-400" />
                      <div className="flex-1">
                        <div className="text-sm">Resume.pdf</div>
                        <div className="text-[11px] text-foreground/60">Recently opened</div>
                      </div>
                    </button>
                    <button
                      onClick={() => open("about")}
                      className="w-full flex items-center gap-3 p-2 rounded hover:bg-white/10 text-left"
                    >
                      <User className="w-5 h-5 text-blue-400" />
                      <div className="flex-1">
                        <div className="text-sm">About {profile.name}</div>
                        <div className="text-[11px] text-foreground/60">Profile</div>
                      </div>
                    </button>
                  </div>
                </>
              )}
            </div>

            <div className="h-14 border-t border-white/5 flex items-center justify-between px-4 bg-black/20">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-violet-500 grid place-items-center text-xs font-semibold">
                  {profile.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <span className="text-sm">{profile.name}</span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => open("settings")}
                  className="w-9 h-9 grid place-items-center rounded hover:bg-white/10"
                  title="Settings"
                >
                  <SettingsIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="w-9 h-9 grid place-items-center rounded hover:bg-white/10"
                  title="Restart"
                >
                  <Power className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
