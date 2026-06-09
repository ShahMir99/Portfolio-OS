import { create } from "zustand";
import { persist } from "zustand/middleware";

export type AppId =
  | "about"
  | "thispc"
  | "projects"
  | "terminal"
  | "resume"
  | "browser"
  | "recyclebin"
  | "settings";

export interface WindowState {
  id: string;
  appId: AppId;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  minimized: boolean;
  maximized: boolean;
  // optional initial path for ThisPC etc
  initialPath?: string;
}

interface DesktopState {
  windows: WindowState[];
  topZ: number;
  wallpaper: string;
  accent: string;
  soundOn: boolean;
  booted: boolean;
  startOpen: boolean;
  openApp: (appId: AppId, opts?: { title?: string; initialPath?: string }) => void;
  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  toggleMaximize: (id: string) => void;
  moveWindow: (id: string, x: number, y: number) => void;
  resizeWindow: (id: string, w: number, h: number) => void;
  setWallpaper: (w: string) => void;
  setAccent: (a: string) => void;
  toggleSound: () => void;
  setBooted: (b: boolean) => void;
  setStartOpen: (b: boolean) => void;
}

const APP_TITLES: Record<AppId, string> = {
  about: "About Me",
  thispc: "This PC",
  projects: "Projects",
  terminal: "Terminal",
  resume: "Resume.pdf",
  browser: "Edge",
  recyclebin: "Recycle Bin",
  settings: "Settings",
};

const DEFAULT_SIZE: Record<AppId, { w: number; h: number }> = {
  about: { w: 820, h: 560 },
  thispc: { w: 900, h: 580 },
  projects: { w: 960, h: 620 },
  terminal: { w: 720, h: 460 },
  resume: { w: 780, h: 640 },
  browser: { w: 900, h: 600 },
  recyclebin: { w: 700, h: 480 },
  settings: { w: 820, h: 560 },
};

export const useDesktop = create<DesktopState>()(
  persist(
    (set, get) => ({
      windows: [],
      topZ: 10,
      wallpaper: "aurora",
      accent: "#3b82f6",
      soundOn: false,
      booted: false,
      startOpen: false,

      openApp: (appId, opts) => {
        const existing = get().windows.find((w) => w.appId === appId);
        if (existing) {
          set((s) => ({
            windows: s.windows.map((w) =>
              w.id === existing.id
                ? { ...w, minimized: false, zIndex: s.topZ + 1 }
                : w,
            ),
            topZ: s.topZ + 1,
          }));
          return;
        }
        const size = DEFAULT_SIZE[appId];
        const count = get().windows.length;
        const offset = count * 28;
        const id = `${appId}-${Date.now()}`;
        set((s) => ({
          topZ: s.topZ + 1,
          windows: [
            ...s.windows,
            {
              id,
              appId,
              title: opts?.title ?? APP_TITLES[appId],
              x: 120 + offset,
              y: 80 + offset,
              width: size.w,
              height: size.h,
              zIndex: s.topZ + 1,
              minimized: false,
              maximized: false,
              initialPath: opts?.initialPath,
            },
          ],
        }));
      },

      closeWindow: (id) =>
        set((s) => ({ windows: s.windows.filter((w) => w.id !== id) })),

      focusWindow: (id) =>
        set((s) => ({
          topZ: s.topZ + 1,
          windows: s.windows.map((w) =>
            w.id === id ? { ...w, zIndex: s.topZ + 1, minimized: false } : w,
          ),
        })),

      minimizeWindow: (id) =>
        set((s) => ({
          windows: s.windows.map((w) =>
            w.id === id ? { ...w, minimized: !w.minimized } : w,
          ),
        })),

      toggleMaximize: (id) =>
        set((s) => ({
          windows: s.windows.map((w) =>
            w.id === id ? { ...w, maximized: !w.maximized } : w,
          ),
        })),

      moveWindow: (id, x, y) =>
        set((s) => ({
          windows: s.windows.map((w) => (w.id === id ? { ...w, x, y } : w)),
        })),

      resizeWindow: (id, width, height) =>
        set((s) => ({
          windows: s.windows.map((w) =>
            w.id === id ? { ...w, width, height } : w,
          ),
        })),

      setWallpaper: (wallpaper) => set({ wallpaper }),
      setAccent: (accent) => set({ accent }),
      toggleSound: () => set((s) => ({ soundOn: !s.soundOn })),
      setBooted: (booted) => set({ booted }),
      setStartOpen: (startOpen) => set({ startOpen }),
    }),
    {
      name: "portfolio-os-state",
      partialize: (s) => ({
        wallpaper: s.wallpaper,
        accent: s.accent,
        soundOn: s.soundOn,
      }),
    },
  ),
);
