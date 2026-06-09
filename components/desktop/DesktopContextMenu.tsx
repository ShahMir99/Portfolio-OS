"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  RefreshCw,
  Palette,
  ArrowUpDown,
  Grid3x3,
  FolderPlus,
  TerminalSquare,
  ChevronRight,
} from "lucide-react";
import { useDesktop } from "@/store/desktop";

export function DesktopContextMenu({
  children,
}: {
  children: React.ReactNode;
}) {
  const [menu, setMenu] = useState<{ x: number; y: number } | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const openApp = useDesktop((s) => s.openApp);

  useEffect(() => {
    const close = () => setMenu(null);
    window.addEventListener("click", close);
    window.addEventListener("blur", close);
    return () => {
      window.removeEventListener("click", close);
      window.removeEventListener("blur", close);
    };
  }, []);

  const items = [
    {
      label: "View",
      icon: Grid3x3,
      submenu: [
        { label: "Large icons", action: () => {}, },
        { label: "Medium icons", action: () => {}, },
        { label: "Small icons", action: () => {}, },
      ],
    },
    {
      label: "Sort by",
      icon: ArrowUpDown,
      submenu: [
        { label: "Name", action: () => {} },
        { label: "Size", action: () => {} },
        { label: "Type", action: () => {} },
        { label: "Date", action: () => {} },
      ],
    },
    {
      label: "Refresh",
      icon: RefreshCw,
      action: () => window.location.reload(),
    },
    { divider: true } as const,
    { label: "New folder", icon: FolderPlus, action: () => {} },
    { divider: true } as const,
    {
      label: "Open Terminal",
      icon: TerminalSquare,
      action: () => openApp("terminal"),
    },
    { label: "Personalize", icon: Palette, action: () => openApp("settings") },
  ];

  return (
    <div
      className="w-full h-full"
      onContextMenu={(e) => {
        e.preventDefault();
        const x = Math.min(e.clientX, window.innerWidth - 240);
        const y = Math.min(e.clientY, window.innerHeight - 320);
        setMenu({ x, y });
      }}
    >
      {children}
      <AnimatePresence>
        {menu && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.12 }}
            className="fixed z-[9999] w-56 glass win-shadow rounded py-1 text-sm"
            style={{ left: menu.x, top: menu.y }}
          >
            {items.map((item, i) => {
              if ("divider" in item) {
                return <div key={i} className="h-px bg-white/10 my-1" />;
              }

              const Icon = item.icon;

              return (
                <div
                  key={i}
                  className="relative"
                  onMouseEnter={() => setHoverIndex(i)}
                  onMouseLeave={() => setHoverIndex(null)}
                >
                  <button
                    onClick={() => {
                      item.action?.();
                      setMenu(null);
                    }}
                    className="w-full flex items-center gap-3 px-3 h-8 hover:bg-white/10 text-left"
                  >
                    <Icon className="w-4 h-4 text-foreground/70" />
                    <span className="flex-1">{item.label}</span>

                    {"submenu" in item && item.submenu && (
                      <ChevronRight className="w-3.5 h-3.5 text-foreground/50" />
                    )}
                  </button>

                  {/* SUBMENU */}
                  {"submenu" in item && item.submenu && hoverIndex === i && (
                    <div className="absolute left-full top-0 ml-1 w-48 glass win-shadow rounded py-1 text-sm">
                      {item.submenu.map((sub, idx) => (
                        <button
                          key={idx}
                          className="w-full text-left px-3 h-8 hover:bg-white/10"
                          onClick={() => {
                            sub.action?.();
                            setMenu(null);
                          }}
                        >
                          {sub.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
