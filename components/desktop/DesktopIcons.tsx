"use client";

import { useRef, useState } from "react";
import { useDesktop } from "@/store/desktop";
import { APPS } from "./apps-registry";

const GRID_SIZE = 90;

function snap(value: number) {
  return Math.round(value / GRID_SIZE) * GRID_SIZE;
}

export function DesktopIcons() {
  const openApp = useDesktop((s) => s.openApp);

  const COLS = 2; 
  const ROWS = Math.ceil(APPS.length / COLS);

  const [positions, setPositions] = useState(() =>
    Object.fromEntries(
      APPS.map((app, index) => {
        const col = Math.floor(index / ROWS);
        const row = index % ROWS;

        return [
          app.id,
          {
            x: col * GRID_SIZE,
            y: row * GRID_SIZE,
          },
        ];
      }),
    ),
  );

  const dragRef = useRef<{
    id: string | null;
    offsetX: number;
    offsetY: number;
  }>({ id: null, offsetX: 0, offsetY: 0 });

  const onPointerDown = (e: any, id: string) => {
    const rect = e.currentTarget.getBoundingClientRect();

    dragRef.current = {
      id,
      offsetX: e.clientX - rect.left,
      offsetY: e.clientY - rect.top,
    };

    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: any) => {
    const id = dragRef.current.id;
    if (!id) return;

    const x = e.clientX - dragRef.current.offsetX;
    const y = e.clientY - dragRef.current.offsetY;

    setPositions((prev) => ({
      ...prev,
      [id]: {
        x: snap(x),
        y: snap(y),
      },
    }));
  };

  const onPointerUp = () => {
    dragRef.current.id = null;
  };

  return (
    <div
      className="absolute inset-0 p-2"
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      {APPS.map((app) => {
        const Icon = app.icon;
        const pos = positions[app.id];

        return (
          <div
            key={app.id}
            className="absolute w-[80px] select-none"
            style={{
              transform: `translate(${pos.x}px, ${pos.y}px)`,
            }}
            onDoubleClick={() => openApp(app.id)}
          >
            <button
              className="
                flex flex-col items-center gap-1 p-2 rounded
                hover:bg-white/5 focus:bg-white/10 outline-none
              "
              onPointerDown={(e) => onPointerDown(e, app.id)}
            >
              <div
                className="w-14 h-14 rounded-xl grid place-items-center"
                style={{
                  background: `linear-gradient(180deg, ${app.color}33, ${app.color}11)`,
                  boxShadow: `inset 0 0 0 1px ${app.color}55`,
                }}
              >
                <Icon className="w-7 h-7" style={{ color: app.color }} />
              </div>

              <span className="text-[11px] text-white text-center drop-shadow">
                {app.label}
              </span>
            </button>
          </div>
        );
      })}
    </div>
  );
}
