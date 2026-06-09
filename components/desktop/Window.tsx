"use client";

import { motion, useDragControls } from "framer-motion";
import { X, Minus, Square, Copy } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useDesktop, type WindowState } from "@/store/desktop";

interface Props {
  win: WindowState;
  children: ReactNode;
  icon?: ReactNode;
}

export function Window({ win, children, icon }: Props) {
  const {
    focusWindow,
    closeWindow,
    minimizeWindow,
    toggleMaximize,
    moveWindow,
  } = useDesktop();
  const controls = useDragControls();
  const constraintsRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const maximized = win.maximized;

  return (
    <>
      {/* invisible constraints = full viewport above taskbar */}
      <div
        ref={constraintsRef}
        className="pointer-events-none fixed inset-0"
        style={{ bottom: 48 }}
      />
      <motion.div
        drag={!maximized}
        dragListener={false}
        dragControls={controls}
        dragMomentum={false}
        dragConstraints={constraintsRef}
        onDragEnd={(_, info) => {
          moveWindow(win.id, win.x + info.offset.x, win.y + info.offset.y);
        }}
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{
          opacity: win.minimized ? 0 : 1,
          scale: win.minimized ? 0.6 : 1,
          y: win.minimized ? 400 : 0,
          pointerEvents: win.minimized ? "none" : "auto",
        }}
        transition={{ type: "spring", stiffness: 320, damping: 28, mass: 0.6 }}
        onMouseDown={() => focusWindow(win.id)}
        className="fixed glass win-shadow rounded-lg overflow-hidden flex flex-col"
        style={{
          left: maximized ? 0 : win.x,
          top: maximized ? 0 : win.y,
          width: maximized ? "100vw" : win.width,
          height: maximized ? "calc(100vh - 48px)" : win.height,
          zIndex: win.zIndex,
          // mounted gate prevents initial flash at 0,0
          visibility: mounted ? "visible" : "hidden",
        }}
      >
        {/* title bar */}
        <div
          onPointerDown={(e) => !maximized && controls.start(e)}
          onDoubleClick={() => toggleMaximize(win.id)}
          className="h-9 flex items-center justify-between bg-[var(--color-window-header)] border-b border-white/5 select-none cursor-grab active:cursor-grabbing"
        >
          <div className="flex items-center gap-2 px-3 text-xs text-foreground/90">
            {icon}
            <span>{win.title}</span>
          </div>
          <div className="flex h-full">
            <button
              onClick={() => minimizeWindow(win.id)}
              className="w-11 h-full flex items-center justify-center hover:bg-white/10 transition-colors"
              aria-label="Minimize"
            >
              <Minus className="w-4 h-4" />
            </button>
            <button
              onClick={() => toggleMaximize(win.id)}
              className="w-11 h-full flex items-center justify-center hover:bg-white/10 transition-colors"
              aria-label="Maximize"
            >
              {maximized ? (
                <Copy className="w-3.5 h-3.5" />
              ) : (
                <Square className="w-3 h-3" />
              )}
            </button>
            <button
              onClick={() => closeWindow(win.id)}
              className="w-11 h-full flex items-center justify-center hover:bg-destructive transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* body */}
        <div className="flex-1 overflow-auto bg-[var(--color-window)]">
          {children}
        </div>
      </motion.div>
    </>
  );
}
