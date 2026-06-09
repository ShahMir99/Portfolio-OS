"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, RotateCw, Star, GitMerge, BookHeart, Mail, Globe } from "lucide-react";
import { profile } from "@/data/portfolio";

const TABS = [
  { id: "home", title: "Start", url: "portfolio://home" },
  { id: "github", title: "GitHub", url: profile.github },
  { id: "linkedin", title: "LinkedIn", url: profile.linkedin },
  { id: "email", title: "Email", url: `mailto:${profile.email}` },
];

export function BrowserApp() {
  const [active, setActive] = useState("home");
  const cur = TABS.find((t) => t.id === active)!;

  return (
    <div className="h-full flex flex-col bg-neutral-900">
      {/* tabs */}
      <div className="h-9 flex items-end gap-0.5 pl-2 pt-1.5 bg-neutral-950/60">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className={`px-3 h-7 text-xs rounded-t flex items-center gap-1.5 max-w-[160px] truncate ${
              active === t.id ? "bg-neutral-800" : "bg-neutral-900/70 hover:bg-neutral-800/70"
            }`}
          >
            <Globe className="w-3 h-3" />
            <span className="truncate">{t.title}</span>
          </button>
        ))}
      </div>
      {/* address bar */}
      <div className="h-10 bg-neutral-800 flex items-center gap-1 px-2 border-b border-white/5">
        <button className="w-7 h-7 grid place-items-center rounded hover:bg-white/10"><ArrowLeft className="w-4 h-4" /></button>
        <button className="w-7 h-7 grid place-items-center rounded hover:bg-white/10"><ArrowRight className="w-4 h-4" /></button>
        <button className="w-7 h-7 grid place-items-center rounded hover:bg-white/10"><RotateCw className="w-4 h-4" /></button>
        <div className="flex-1 flex items-center gap-2 bg-neutral-700/60 rounded h-7 px-3 text-xs">
          <Globe className="w-3.5 h-3.5 text-foreground/60" />
          <span className="truncate">{cur.url}</span>
        </div>
        <button className="w-7 h-7 grid place-items-center rounded hover:bg-white/10"><Star className="w-4 h-4" /></button>
      </div>

      {/* viewport */}
      <div className="flex-1 overflow-auto bg-gradient-to-b from-neutral-800 to-neutral-900">
        {active === "home" && <HomeStart setActive={setActive} />}
        {active === "github" && (
          <Embed
            title="GitHub"
            color="#fff"
            bg="linear-gradient(135deg, #1f2937, #0f172a)"
            url={profile.github}
            icon={<GitMerge className="w-10 h-10" />}
          />
        )}
        {active === "linkedin" && (
          <Embed
            title="LinkedIn"
            color="#fff"
            bg="linear-gradient(135deg, #0a66c2, #074a8a)"
            url={profile.linkedin}
            icon={<BookHeart className="w-10 h-10" />}
          />
        )}
        {active === "email" && (
          <Embed
            title="Email"
            color="#fff"
            bg="linear-gradient(135deg, #db4437, #a8311f)"
            url={`mailto:${profile.email}`}
            icon={<Mail className="w-10 h-10" />}
          />
        )}
      </div>
    </div>
  );
}

function HomeStart({ setActive }: { setActive: (id: string) => void }) {
  const links = [
    { id: "github", label: "GitHub", icon: GitMerge, color: "#e5e7eb" },
    { id: "linkedin", label: "LinkedIn", icon: BookHeart, color: "#60a5fa" },
    { id: "email", label: "Email", icon: Mail, color: "#f87171" },
  ];
  return (
    <div className="p-10 max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold mb-1">Good {hourGreet()},</h1>
      <p className="text-foreground/60 text-sm mb-6">Quick links from {profile.name}</p>
      <div className="grid grid-cols-3 gap-3">
        {links.map((l) => {
          const Icon = l.icon;
          return (
            <button
              key={l.id}
              onClick={() => setActive(l.id)}
              className="p-5 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition flex flex-col items-center gap-2"
            >
              <Icon className="w-7 h-7" style={{ color: l.color }} />
              <span className="text-sm">{l.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function hourGreet() {
  const h = new Date().getHours();
  if (h < 12) return "morning";
  if (h < 18) return "afternoon";
  return "evening";
}

function Embed({ title, bg, color, url, icon }: { title: string; bg: string; color: string; url: string; icon: React.ReactNode }) {
  return (
    <div className="h-full grid place-items-center p-6">
      <div className="text-center max-w-md w-full p-10 rounded-xl" style={{ background: bg, color }}>
        <div className="grid place-items-center mb-4 opacity-90">{icon}</div>
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-sm opacity-75 mt-1 break-all">{url}</p>
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="inline-block mt-5 px-4 py-2 rounded bg-white/15 hover:bg-white/25 text-sm"
        >
          Open externally
        </a>
      </div>
    </div>
  );
}
