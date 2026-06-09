"use client";

import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  HardDrive,
  Folder,
  FileText,
  Search,
} from "lucide-react";
import { profile, projects } from "@/data/portfolio";
import { useDesktop } from "@/store/desktop";

type Node = {
  name: string;
  type: "drive" | "folder" | "file";
  children?: Node[];
  content?: React.ReactNode;
};

const TREE: Node[] = [
  {
    name: "C: About Me",
    type: "drive",
    children: [
      { name: "Summary.txt", type: "file", content: <pre className="text-xs whitespace-pre-wrap">{profile.summary}</pre> },
      { name: "Contact.txt", type: "file", content: <pre className="text-xs">Email: {profile.email}{"\n"}GitHub: {profile.github}{"\n"}LinkedIn: {profile.linkedin}</pre> },
    ],
  },
  {
    name: "D: Skills",
    type: "drive",
    children: Object.entries(profile.skills).map(([cat, skills]) => ({
      name: cat,
      type: "folder" as const,
      children: skills.map((s) => ({ name: `${s}.skill`, type: "file" as const, content: <p className="text-sm">{s}</p> })),
    })),
  },
  {
    name: "E: Projects",
    type: "drive",
    children: projects.map((p) => ({
      name: p.name,
      type: "folder" as const,
      children: [
        { name: "README.md", type: "file", content: <pre className="text-xs whitespace-pre-wrap">{p.description}{"\n\nStack: "}{p.stack.join(", ")}</pre> },
        { name: "ARCHITECTURE.md", type: "file", content: <pre className="text-xs whitespace-pre-wrap">{p.architecture}</pre> },
      ],
    })),
  },
  {
    name: "F: Experience",
    type: "drive",
    children: profile.experience.map((e) => ({
      name: `${e.company} (${e.period}).txt`,
      type: "file" as const,
      content: <pre className="text-xs whitespace-pre-wrap">{e.role} @ {e.company}{"\n\n"}{e.bullets.map(b=>"• "+b).join("\n")}</pre>,
    })),
  },
  { name: "G: Resume", type: "drive", children: [{ name: "Resume.pdf", type: "file", content: <ResumeRef /> }] },
  { name: "H: Contact", type: "drive", children: [{ name: "Email.lnk", type: "file", content: <a className="text-[var(--win-accent)] underline" href={`mailto:${profile.email}`}>{profile.email}</a> }] },
];

function ResumeRef() {
  const openApp = useDesktop((s) => s.openApp);
  return (
    <button onClick={() => openApp("resume")} className="px-3 py-1.5 rounded bg-[var(--win-accent)] text-white text-sm hover:bg-[var(--win-accent-hover)]">
      Open Resume.pdf
    </button>
  );
}

export function ThisPCApp({ initialPath }: { initialPath?: string }) {
  const [history, setHistory] = useState<string[][]>([initialPath ? initialPath.split("/").filter(Boolean) : []]);
  const [idx, setIdx] = useState(0);
  const [q, setQ] = useState("");
  const [openFile, setOpenFile] = useState<Node | null>(null);

  const path = history[idx];

  const currentChildren = useMemo(() => {
    let nodes: Node[] = TREE;
    for (const seg of path) {
      const found = nodes.find((n) => n.name === seg);
      if (!found || !found.children) return [];
      nodes = found.children;
    }
    return nodes;
  }, [path]);

  const filtered = q.trim()
    ? currentChildren.filter((n) => n.name.toLowerCase().includes(q.toLowerCase()))
    : currentChildren;

  const navigate = (segs: string[]) => {
    const next = history.slice(0, idx + 1);
    next.push(segs);
    setHistory(next);
    setIdx(next.length - 1);
    setOpenFile(null);
  };

  return (
    <div className="flex flex-col h-full">
      {/* toolbar */}
      <div className="h-10 flex items-center gap-1 px-2 border-b border-white/5 bg-black/20">
        <button
          disabled={idx === 0}
          onClick={() => { setIdx(idx - 1); setOpenFile(null); }}
          className="w-8 h-8 grid place-items-center rounded hover:bg-white/10 disabled:opacity-30"
        ><ArrowLeft className="w-4 h-4" /></button>
        <button
          disabled={idx === history.length - 1}
          onClick={() => { setIdx(idx + 1); setOpenFile(null); }}
          className="w-8 h-8 grid place-items-center rounded hover:bg-white/10 disabled:opacity-30"
        ><ArrowRight className="w-4 h-4" /></button>
        <button
          disabled={path.length === 0}
          onClick={() => navigate(path.slice(0, -1))}
          className="w-8 h-8 grid place-items-center rounded hover:bg-white/10 disabled:opacity-30"
        ><ArrowUp className="w-4 h-4" /></button>
        <div className="flex-1 flex items-center gap-1 ml-2 bg-white/5 rounded h-8 px-2 text-xs">
          <HardDrive className="w-3.5 h-3.5 text-foreground/60" />
          <button onClick={() => navigate([])} className="hover:underline">This PC</button>
          {path.map((seg, i) => (
            <span key={i} className="flex items-center gap-1">
              <span className="text-foreground/40">›</span>
              <button
                onClick={() => navigate(path.slice(0, i + 1))}
                className="hover:underline"
              >{seg}</button>
            </span>
          ))}
        </div>
        <div className="flex items-center gap-1 bg-white/5 rounded h-8 px-2 w-48">
          <Search className="w-3.5 h-3.5 text-foreground/50" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search"
            className="bg-transparent outline-none text-xs flex-1"
          />
        </div>
      </div>

      <div className="flex-1 flex">
        {/* sidebar */}
        <aside className="w-48 p-2 border-r border-white/5 bg-black/10 text-xs">
          <div className="text-[10px] uppercase tracking-wider text-foreground/50 px-2 pb-1">Quick access</div>
          {TREE.map((d) => (
            <button
              key={d.name}
              onClick={() => navigate([d.name])}
              className={`w-full flex items-center gap-2 px-2 h-7 rounded text-left hover:bg-white/10 ${
                path[0] === d.name ? "bg-white/10" : ""
              }`}
            >
              <HardDrive className="w-3.5 h-3.5 text-amber-300" />
              <span className="truncate">{d.name}</span>
            </button>
          ))}
        </aside>

        {/* content */}
        <div className="flex-1 overflow-auto">
          {openFile ? (
            <div className="p-6">
              <div className="text-xs text-foreground/60 mb-2">{openFile.name}</div>
              <div className="p-4 rounded bg-black/20 border border-white/5">{openFile.content}</div>
            </div>
          ) : (
            <div className="p-4 grid grid-cols-[repeat(auto-fill,110px)] auto-rows-[96px] gap-1 content-start">
              {filtered.map((node) => {
                const Icon = node.type === "file" ? FileText : node.type === "drive" ? HardDrive : Folder;
                const color = node.type === "file" ? "#cbd5e1" : node.type === "drive" ? "#fbbf24" : "#60a5fa";
                return (
                  <button
                    key={node.name}
                    onDoubleClick={() => {
                      if (node.type === "file") setOpenFile(node);
                      else navigate([...path, node.name]);
                    }}
                    className="flex flex-col items-center gap-1 p-2 rounded hover:bg-white/5 focus:bg-white/10 outline-none"
                  >
                    <Icon className="w-10 h-10" style={{ color }} />
                    <span className="text-[11px] text-center leading-tight line-clamp-2">{node.name}</span>
                  </button>
                );
              })}
              {filtered.length === 0 && (
                <p className="text-xs text-foreground/50 col-span-full p-4">Empty.</p>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="h-6 border-t border-white/5 bg-black/30 px-3 flex items-center text-[11px] text-foreground/60">
        {filtered.length} item{filtered.length !== 1 ? "s" : ""}
      </div>
    </div>
  );
}
