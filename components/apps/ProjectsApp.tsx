"use client";

import { useMemo, useState } from "react";
import { GitMerge, ExternalLink, Filter, X } from "lucide-react";
import { projects } from "@/data/portfolio";

export function ProjectsApp() {
  const [selected, setSelected] = useState<typeof projects[number] | null>(null);
  const [filters, setFilters] = useState<string[]>([]);

  const allTags = useMemo(() => {
    const s = new Set<string>();
    projects.forEach((p) => p.stack.forEach((t) => s.add(t)));
    return Array.from(s).sort();
  }, []);

  const visible = useMemo(() => {
    if (filters.length === 0) return projects;
    return projects.filter((p) => filters.every((f) => p.stack.includes(f)));
  }, [filters]);

  const toggle = (t: string) =>
    setFilters((f) => (f.includes(t) ? f.filter((x) => x !== t) : [...f, t]));

  return (
    <div className="flex h-full">
      <aside className="w-56 p-3 border-r border-white/5 bg-black/15 overflow-auto">
        <div className="flex items-center gap-2 text-xs text-foreground/60 mb-2">
          <Filter className="w-3.5 h-3.5" />
          <span>Filter by tech</span>
          {filters.length > 0 && (
            <button onClick={() => setFilters([])} className="ml-auto text-[10px] text-foreground/80 hover:text-white">
              clear
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-1">
          {allTags.map((t) => {
            const on = filters.includes(t);
            return (
              <button
                key={t}
                onClick={() => toggle(t)}
                className={`text-[11px] px-2 py-0.5 rounded border transition ${
                  on
                    ? "bg-[var(--win-accent)] border-[var(--win-accent)] text-white"
                    : "bg-white/5 border-white/10 hover:bg-white/10"
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>
      </aside>

      <div className="flex-1 overflow-auto p-4">
        {!selected ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {visible.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelected(p)}
                className="text-left p-4 rounded-lg bg-white/5 border border-white/5 hover:border-[var(--win-accent)]/50 hover:bg-white/8 transition group"
              >
                <div
                  className="h-28 rounded mb-3 relative overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, oklch(0.45 0.18 ${(p.id.charCodeAt(0) * 7) % 360}), oklch(0.25 0.12 ${(p.id.charCodeAt(1) * 11) % 360}))`,
                  }}
                >
                  <div className="absolute inset-0 grid place-items-center text-3xl font-bold text-white/80">
                    {p.name[0]}
                  </div>
                </div>
                <h3 className="text-sm font-semibold group-hover:text-[var(--win-accent)] transition">{p.name}</h3>
                <p className="text-xs text-foreground/60 mt-0.5">{p.tagline}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {p.stack.slice(0, 3).map((s) => (
                    <span key={s} className="text-[10px] px-1.5 py-0.5 rounded bg-white/10">{s}</span>
                  ))}
                  {p.stack.length > 3 && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10">+{p.stack.length - 3}</span>
                  )}
                </div>
              </button>
            ))}
            {visible.length === 0 && (
              <p className="text-sm text-foreground/60 col-span-full">No projects match those filters.</p>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <button
              onClick={() => setSelected(null)}
              className="text-xs text-foreground/60 hover:text-white flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" /> Close
            </button>
            <div
              className="h-44 rounded-lg relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, oklch(0.45 0.18 ${(selected.id.charCodeAt(0) * 7) % 360}), oklch(0.22 0.12 ${(selected.id.charCodeAt(1) * 11) % 360}))`,
              }}
            >
              <div className="absolute inset-0 grid place-items-center text-6xl font-bold text-white/80">
                {selected.name[0]}
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold">{selected.name}</h2>
              <p className="text-sm text-foreground/70">{selected.tagline}</p>
            </div>
            <p className="text-sm text-foreground/85">{selected.description}</p>
            <div className="flex flex-wrap gap-1.5">
              {selected.stack.map((s) => (
                <span key={s} className="text-[11px] px-2 py-0.5 rounded bg-[var(--win-accent)]/20 border border-[var(--win-accent)]/30">
                  {s}
                </span>
              ))}
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="p-3 rounded bg-black/20 border border-white/5">
                <div className="text-[11px] uppercase tracking-wider text-foreground/60 mb-1">Challenges solved</div>
                <p className="text-xs">{selected.challenges}</p>
              </div>
              <div className="p-3 rounded bg-black/20 border border-white/5">
                <div className="text-[11px] uppercase tracking-wider text-foreground/60 mb-1">Architecture</div>
                <p className="text-xs">{selected.architecture}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <a href={selected.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-white/10 hover:bg-white/15 text-sm">
                <GitMerge className="w-4 h-4" /> Source
              </a>
              <a href={selected.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-[var(--win-accent)] hover:bg-[var(--win-accent-hover)] text-sm">
                <ExternalLink className="w-4 h-4" /> Live demo
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
