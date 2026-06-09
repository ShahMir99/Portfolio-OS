"use client"

import type { AppId } from "@/store/desktop";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { useDesktop } from "@/store/desktop";
import { BootScreen } from "./BootScreen";
import { DesktopIcons } from "./DesktopIcons";
import { Taskbar } from "./Taskbar";
import { StartMenu } from "./StartMenu";
import { DesktopContextMenu } from "./DesktopContextMenu";
import { Window } from "./Window";
import { APPS, getApp } from "./apps-registry";
import { AboutApp } from "../apps/AboutApp";
import { ThisPCApp } from "../apps/ThisPCApp";
import { ProjectsApp } from "../apps/ProjectsApp";
import { TerminalApp } from "../apps/TerminalApp";
import { ResumeApp } from "../apps/ResumeApp";
import { BrowserApp } from "../apps/BrowserApp";
import { RecycleBinApp } from "../apps/RecycleBinApp";
import { SettingsApp } from "../apps/SettingsApp";
import { wallpapers } from "@/data/portfolio";

function renderApp(appId: AppId, initialPath?: string) {
  switch (appId) {
    case "about": return <AboutApp />;
    case "thispc": return <ThisPCApp initialPath={initialPath} />;
    case "projects": return <ProjectsApp />;
    case "terminal": return <TerminalApp />;
    case "resume": return <ResumeApp />;
    case "browser": return <BrowserApp />;
    case "recyclebin": return <RecycleBinApp />;
    case "settings": return <SettingsApp />;
  }
}

export function Desktop() {
  const { booted, setBooted, wallpaper, accent, windows, openApp, setStartOpen } = useDesktop();

  useEffect(() => {
    if (accent) {
    }
  }, [accent]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const meta = e.metaKey || e.ctrlKey;
      if (meta && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setStartOpen(true);
      } else if (e.key === "Escape") {
        setStartOpen(false);
      } else if (meta && e.altKey && e.key.toLowerCase() === "t") {
        e.preventDefault();
        openApp("terminal");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openApp, setStartOpen]);

  const wp = wallpapers.find((w) => w.id === wallpaper) ?? wallpapers[0];

  return (
    <>
      {!booted && <BootScreen onDone={() => setBooted(true)} />}

      <div
  className="fixed inset-0 overflow-hidden bg-center bg-cover bg-no-repeat"
  style={{
    backgroundImage: `url(${wp.image})`,
  }}
>
        {/* subtle layered glow */}
        <div className="absolute inset-0 opacity-60"
          style={{
            background: "radial-gradient(800px 500px at 20% 20%, oklch(0.65 0.18 245 / 0.18), transparent 60%), radial-gradient(700px 500px at 80% 80%, oklch(0.55 0.18 320 / 0.15), transparent 60%)",
          }}
        />

        <DesktopContextMenu>
          <div className="absolute inset-0">
            <DesktopIcons />
          </div>
        </DesktopContextMenu>

        {/* Windows */}
        <AnimatePresence>
          {windows.map((w) => {
            const meta = getApp(w.appId);
            const Icon = meta.icon;
            return (
              <Window
                key={w.id}
                win={w}
                icon={<Icon className="w-3.5 h-3.5" style={{ color: meta.color }} />}
              >
                {renderApp(w.appId, w.initialPath)}
              </Window>
            );
          })}
        </AnimatePresence>

        <StartMenu />
        <Taskbar />
      </div>

      <span className="hidden">{APPS.length}</span>
    </>
  );
}
