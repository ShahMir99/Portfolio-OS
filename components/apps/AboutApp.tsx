"use client";

import { profile } from "@/data/portfolio";
import { Mail, GitMerge, BookHeart, MapPin } from "lucide-react";

export function AboutApp() {
  return (
    <div className="flex flex-col md:flex-row h-full">
      <aside className="md:w-60 p-6 bg-black/20 border-r border-white/5 flex flex-col items-center text-center gap-3">
        <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-400 via-violet-500 to-fuchsia-500 grid place-items-center text-3xl font-semibold shadow-lg">
          {profile.name.split(" ").map((n) => n[0]).join("")}
        </div>
        <div>
          <h2 className="text-lg font-semibold">{profile.name}</h2>
          <p className="text-xs text-foreground/60">{profile.role}</p>
        </div>
        <div className="flex flex-col items-center gap-1 text-xs text-foreground/70 mt-2">
          <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3" />{profile.location}</span>
          <a href={`mailto:${profile.email}`} className="flex items-center gap-1.5 hover:text-foreground">
            <Mail className="w-3 h-3" />{profile.email}
          </a>
        </div>
        <div className="flex gap-2 mt-3">
          <a href={profile.github} target="_blank" rel="noreferrer" className="w-8 h-8 grid place-items-center rounded bg-white/8 hover:bg-white/15">
            <GitMerge className="w-4 h-4" />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="w-8 h-8 grid place-items-center rounded bg-white/8 hover:bg-white/15">
            <BookHeart className="w-4 h-4" />
          </a>
        </div>
      </aside>

      <main className="flex-1 p-6 overflow-auto space-y-6">
        <section>
          <h3 className="text-xs uppercase tracking-wider text-foreground/50 mb-2">Tagline</h3>
          <p className="text-sm">{profile.tagline}</p>
        </section>
        <section>
          <h3 className="text-xs uppercase tracking-wider text-foreground/50 mb-2">Summary</h3>
          <p className="text-sm leading-relaxed text-foreground/85">{profile.summary}</p>
        </section>
        <section>
          <h3 className="text-xs uppercase tracking-wider text-foreground/50 mb-2">Skills</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Object.entries(profile.skills).map(([cat, skills]) => (
              <div key={cat} className="p-3 rounded bg-white/5 border border-white/5">
                <div className="text-[11px] uppercase tracking-wider text-foreground/60 mb-2">{cat}</div>
                <div className="flex flex-wrap gap-1.5">
                  {skills.map((s) => (
                    <span key={s} className="text-[11px] px-2 py-0.5 rounded bg-[var(--win-accent)]/20 border border-[var(--win-accent)]/30">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
        <section>
          <h3 className="text-xs uppercase tracking-wider text-foreground/50 mb-2">Experience</h3>
          <div className="space-y-3">
            {profile.experience.map((e) => (
              <div key={e.company} className="p-3 rounded bg-white/5 border border-white/5">
                <div className="flex justify-between gap-3 flex-wrap">
                  <div>
                    <div className="text-sm font-medium">{e.role}</div>
                    <div className="text-xs text-foreground/60">{e.company}</div>
                  </div>
                  <span className="text-[11px] text-foreground/50">{e.period}</span>
                </div>
                <ul className="mt-2 space-y-1 text-xs text-foreground/80 list-disc pl-4">
                  {e.bullets.map((b) => <li key={b}>{b}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
