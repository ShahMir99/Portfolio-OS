"use client";

import { Download, Printer, FileText } from "lucide-react";
import { profile } from "@/data/portfolio";

export function ResumeApp() {
  const download = () => {
    const blob = new Blob([resumeText()], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${profile.name.replace(/\s+/g, "_")}_Resume.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="h-full flex flex-col bg-neutral-800">
      <div className="h-10 bg-neutral-900 border-b border-white/5 flex items-center px-3 gap-2 text-xs">
        <FileText className="w-4 h-4 text-rose-400" />
        <span className="text-foreground/80">Resume.pdf</span>
        <div className="ml-auto flex gap-1">
          <button onClick={() => window.print()} className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/15 flex items-center gap-1.5">
            <Printer className="w-3.5 h-3.5" /> Print
          </button>
          <button onClick={download} className="px-2.5 py-1 rounded bg-[var(--win-accent)] hover:bg-[var(--win-accent-hover)] flex items-center gap-1.5 text-white">
            <Download className="w-3.5 h-3.5" /> Download
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-auto p-6 grid place-items-start">
        <div className="bg-white text-neutral-900 w-full max-w-[680px] mx-auto p-10 shadow-xl rounded-sm font-sans text-[13px] leading-relaxed">
          <div className="border-b border-neutral-200 pb-3 mb-4">
            <h1 className="text-2xl font-bold tracking-tight">{profile.name}</h1>
            <p className="text-neutral-600">{profile.role}</p>
            <p className="text-xs text-neutral-500 mt-1">
              {profile.email} · {profile.github.replace("https://", "")} · {profile.linkedin.replace("https://", "")}
            </p>
          </div>
          <section className="mb-4">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-1">Summary</h2>
            <p>{profile.summary}</p>
          </section>
          <section className="mb-4">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-1">Experience</h2>
            {profile.experience.map((e) => (
              <div key={e.company} className="mb-3">
                <div className="flex justify-between">
                  <strong>{e.role} — {e.company}</strong>
                  <span className="text-neutral-500 text-xs">{e.period}</span>
                </div>
                <ul className="list-disc pl-5 mt-1 text-[12.5px]">
                  {e.bullets.map((b) => <li key={b}>{b}</li>)}
                </ul>
              </div>
            ))}
          </section>
          <section>
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-1">Skills</h2>
            {Object.entries(profile.skills).map(([k, v]) => (
              <p key={k}><strong>{k}:</strong> {v.join(", ")}</p>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}

function resumeText() {
  return [
    profile.name,
    profile.role,
    profile.email,
    profile.github,
    profile.linkedin,
    "",
    "SUMMARY",
    profile.summary,
    "",
    "EXPERIENCE",
    ...profile.experience.flatMap((e) => [
      `${e.role} — ${e.company} (${e.period})`,
      ...e.bullets.map((b) => `  • ${b}`),
      "",
    ]),
    "SKILLS",
    ...Object.entries(profile.skills).map(([k, v]) => `${k}: ${v.join(", ")}`),
  ].join("\n");
}
