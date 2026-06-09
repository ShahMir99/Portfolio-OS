"use client"

import { useEffect, useState } from "react";
import { Wifi, Volume2, BatteryFull, Search, LayoutGrid } from "lucide-react";
import { useDesktop } from "@/store/desktop";
import { APPS } from "./apps-registry";

export function Taskbar() {
  const { windows, openApp, focusWindow, minimizeWindow, startOpen, setStartOpen } = useDesktop();
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const pinned: typeof APPS = APPS.filter((a) =>
    ["thispc", "projects", "terminal", "browser"].includes(a.id),
  );

  return (
    <div className="fixed bottom-0 inset-x-0 h-12 taskbar-glass flex items-center px-1 z-[9999]">
      {/* Start */}
      <button
        onClick={() => setStartOpen(!startOpen)}
        className={`h-10 w-12 grid place-items-center rounded transition-colors ${
          startOpen ? "bg-white/15" : "hover:bg-white/10"
        }`}
        aria-label="Start"
      >
        <WindowsLogo />
      </button>

      {/* Search */}
      <button
        onClick={() => setStartOpen(true)}
        className="hidden md:flex items-center gap-2 ml-1 h-9 px-3 bg-white/8 hover:bg-white/12 rounded text-xs text-foreground/70 w-64 transition"
      >
        <Search className="w-3.5 h-3.5" />
        <span>Type here to search</span>
      </button>

      {/* Task view */}
      <button
        className="ml-1 h-10 w-10 grid place-items-center rounded hover:bg-white/10"
        aria-label="Task view"
      >
        <LayoutGrid className="w-4 h-4" />
      </button>

      {/* Pinned + open apps */}
      <div className="flex items-center ml-1 gap-0.5">
        {pinned.map((a) => {
          const win = windows.find((w) => w.appId === a.id);
          const active = !!win && !win.minimized;
          const Icon = a.icon;
          return (
            <button
              key={a.id}
              onClick={() => {
                if (win) {
                  if (win.minimized) focusWindow(win.id);
                  else minimizeWindow(win.id);
                } else openApp(a.id);
              }}
              className={`relative h-10 w-10 grid place-items-center rounded transition ${
                active ? "bg-white/15" : "hover:bg-white/10"
              }`}
              title={a.label}
            >
              <Icon className="w-4.5 h-4.5" style={{ color: a.color, width: 18, height: 18 }} />
              {win && (
                <span
                  className="absolute bottom-0.5 h-0.5 rounded"
                  style={{
                    width: active ? 18 : 8,
                    background: "var(--win-accent)",
                    transition: "width 0.2s",
                  }}
                />
              )}
            </button>
          );
        })}
        {/* Open-only windows not in pinned */}
        {windows
          .filter((w) => !pinned.some((p) => p.id === w.appId))
          .map((w) => {
            const meta = APPS.find((a) => a.id === w.appId)!;
            const Icon = meta.icon;
            const active = !w.minimized;
            return (
              <button
                key={w.id}
                onClick={() => (w.minimized ? focusWindow(w.id) : minimizeWindow(w.id))}
                className={`relative h-10 w-10 grid place-items-center rounded transition ${
                  active ? "bg-white/15" : "hover:bg-white/10"
                }`}
                title={w.title}
              >
                <Icon className="w-4.5 h-4.5" style={{ color: meta.color, width: 18, height: 18 }} />
                <span
                  className="absolute bottom-0.5 h-0.5 rounded"
                  style={{ width: active ? 18 : 8, background: "var(--win-accent)" }}
                />
              </button>
            );
          })}
      </div>

      {/* Tray */}
      <div className="ml-auto flex items-center gap-1 pr-2 text-foreground/85">
        <button className="px-2 h-9 rounded hover:bg-white/10 flex items-center gap-2">
          <Wifi className="w-4 h-4" />
          <Volume2 className="w-4 h-4" />
          <BatteryFull className="w-4 h-4" />
        </button>
        <div className="px-2 h-9 rounded hover:bg-white/10 flex flex-col items-end justify-center leading-tight text-[11px]">
          <span>
            {now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
          <span>{now.toLocaleDateString()}</span>
        </div>
        {/* Show desktop sliver */}
        <div className="w-1 h-full border-l border-white/10" />
      </div>
    </div>
  );
}

function WindowsLogo() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden>
      <g fill="var(--win-accent)">
        <rect x="2" y="2" width="9.5" height="9.5" />
        <rect x="12.5" y="2" width="9.5" height="9.5" />
        <rect x="2" y="12.5" width="9.5" height="9.5" />
        <rect x="12.5" y="12.5" width="9.5" height="9.5" />
      </g>
    </svg>
  );
}
