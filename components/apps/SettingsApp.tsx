"use client";

import { useDesktop } from "@/store/desktop";
import { wallpapers, accents } from "@/data/portfolio";
import { Volume2, VolumeX, Palette, Image as ImageIcon, RefreshCw } from "lucide-react";

export function SettingsApp() {
  const { wallpaper, setWallpaper, accent, setAccent, soundOn, toggleSound } = useDesktop();

  return (
    <div className="flex h-full">
      <aside className="w-52 p-2 border-r border-white/5 bg-black/15 text-xs space-y-0.5">
        {["Personalization", "System", "About"].map((s, i) => (
          <button
            key={s}
            className={`w-full text-left px-3 h-8 rounded ${i === 0 ? "bg-[var(--win-accent)]/30" : "hover:bg-white/10"}`}
          >
            {s}
          </button>
        ))}
      </aside>
      <div className="flex-1 overflow-auto p-6 space-y-6">
        <div>
          <h2 className="text-lg font-semibold">Personalization</h2>
          <p className="text-xs text-foreground/60">Make Portfolio OS feel like home.</p>
        </div>

        <section>
          <h3 className="text-xs uppercase tracking-wider text-foreground/60 mb-2 flex items-center gap-1.5">
            <ImageIcon className="w-3.5 h-3.5" /> Wallpaper
          </h3>
          <div className="grid grid-cols-4 gap-2">
            {wallpapers.map((w) => (
              <button
                key={w.id}
                onClick={() => setWallpaper(w.id)}
                className={`aspect-video rounded border-2 transition ${
                  wallpaper === w.id ? "border-[var(--win-accent)]" : "border-white/10 hover:border-white/30"
                }`}
                style={{backgroundImage: `url(${w.image})`, backgroundSize: "cover", backgroundPosition: "center"}}
                title={w.name}
              />
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-xs uppercase tracking-wider text-foreground/60 mb-2 flex items-center gap-1.5">
            <Palette className="w-3.5 h-3.5" /> Accent color
          </h3>
          <div className="flex gap-2">
            {accents.map((a) => (
              <button
                key={a.id}
                onClick={() => setAccent(a.value)}
                className={`w-10 h-10 rounded-full border-2 transition ${
                  accent === a.value ? "border-white" : "border-white/20 hover:border-white/50"
                }`}
                style={{ background: a.value }}
                title={a.name}
              />
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-xs uppercase tracking-wider text-foreground/60 mb-2">System</h3>
          <button
            onClick={toggleSound}
            className="flex items-center gap-3 p-3 rounded bg-white/5 hover:bg-white/10 w-full text-left"
          >
            {soundOn ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5 text-foreground/60" />}
            <div className="flex-1">
              <div className="text-sm">Sound effects</div>
              <div className="text-[11px] text-foreground/60">Subtle UI clicks and notifications</div>
            </div>
            <span className={`w-9 h-5 rounded-full p-0.5 transition ${soundOn ? "bg-[var(--win-accent)]" : "bg-white/15"}`}>
              <span className={`block w-4 h-4 bg-white rounded-full transition ${soundOn ? "translate-x-4" : ""}`} />
            </span>
          </button>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 flex items-center gap-3 p-3 rounded bg-white/5 hover:bg-white/10 w-full text-left"
          >
            <RefreshCw className="w-5 h-5" />
            <div className="flex-1">
              <div className="text-sm">Restart Portfolio OS</div>
              <div className="text-[11px] text-foreground/60">Replay the boot animation</div>
            </div>
          </button>
        </section>

        <section className="text-[11px] text-foreground/50">
          Portfolio OS · v1.0 · Crafted with React + Framer Motion
        </section>
      </div>
    </div>
  );
}
