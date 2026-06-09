"use client";

import { useEffect, useRef, useState } from "react";
import { profile, projects } from "@/data/portfolio";

type Line = { text: string; kind?: "out" | "in" | "err" };

const HELP = `Available commands:
  help       Show this list
  whoami     Print user info
  skills     List skills
  projects   List projects
  experience Print work history
  contact    Email & socials
  github     Open GitHub
  linkedin   Open LinkedIn
  date       Current date/time
  echo <x>   Echo text
  clear      Clear screen`;

function run(cmd: string): Line[] | "clear" {
  const [c, ...rest] = cmd.trim().split(/\s+/);
  const arg = rest.join(" ");
  switch (c) {
    case "":
      return [];
    case "help":
      return [{ text: HELP }];
    case "whoami":
      return [{ text: `${profile.name} — ${profile.role}\n${profile.location}` }];
    case "skills":
      return Object.entries(profile.skills).map(([k, v]) => ({ text: `${k.padEnd(16)} ${v.join(", ")}` }));
    case "projects":
      return projects.map((p) => ({ text: `• ${p.name.padEnd(14)} ${p.tagline}` }));
    case "experience":
      return profile.experience.map((e) => ({ text: `${e.period}  ${e.role} @ ${e.company}` }));
    case "contact":
      return [
        { text: `email:    ${profile.email}` },
        { text: `github:   ${profile.github}` },
        { text: `linkedin: ${profile.linkedin}` },
      ];
    case "github":
      window.open(profile.github, "_blank");
      return [{ text: `Opening ${profile.github}…` }];
    case "linkedin":
      window.open(profile.linkedin, "_blank");
      return [{ text: `Opening ${profile.linkedin}…` }];
    case "date":
      return [{ text: new Date().toString() }];
    case "echo":
      return [{ text: arg }];
    case "clear":
      return "clear";
    default:
      return [{ text: `'${c}' is not recognized. Type 'help'.`, kind: "err" }];
  }
}

const PROMPT = "C:\\Users\\guest> ";

export function TerminalApp() {
  const [lines, setLines] = useState<Line[]>([
    { text: "Portfolio OS [Version 10.0.19045.4046]" },
    { text: "(c) 2025 Alex Rivera. All rights reserved." },
    { text: "" },
    { text: "Type 'help' to get started." },
    { text: "" },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState<number | null>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const submit = () => {
    const cmd = input;
    const res = run(cmd);
    const newLines: Line[] = [...lines, { text: PROMPT + cmd, kind: "in" }];
    if (res === "clear") {
      setLines([]);
    } else {
      newLines.push(...res, { text: "" });
      setLines(newLines);
    }
    if (cmd.trim()) setHistory((h) => [...h, cmd]);
    setHistIdx(null);
    setInput("");
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") submit();
    else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const next = histIdx === null ? history.length - 1 : Math.max(0, histIdx - 1);
      setHistIdx(next);
      setInput(history[next]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx === null) return;
      const next = histIdx + 1;
      if (next >= history.length) { setHistIdx(null); setInput(""); }
      else { setHistIdx(next); setInput(history[next]); }
    }
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="h-full bg-black/85 text-green-200 font-mono text-[13px] p-3 overflow-auto"
      style={{ fontFamily: "var(--font-mono)" }}
    >
      {lines.map((l, i) => (
        <div key={i} className={l.kind === "err" ? "text-red-300" : ""}>
          <pre className="whitespace-pre-wrap">{l.text}</pre>
        </div>
      ))}
      <div className="flex">
        <span>{PROMPT}</span>
        <input
          ref={inputRef}
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKey}
          className="flex-1 bg-transparent outline-none text-green-100"
          spellCheck={false}
        />
      </div>
      <div ref={endRef} />
    </div>
  );
}
