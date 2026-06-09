"use client"

import {
  User,
  HardDrive,
  FolderGit2,
  TerminalSquare,
  FileText,
  Globe,
  Trash2,
  Settings as SettingsIcon,
  type LucideIcon,
} from "lucide-react";
import type { AppId } from "@/store/desktop";

export interface AppMeta {
  id: AppId;
  label: string;
  icon: LucideIcon;
  color: string;
}

export const APPS: AppMeta[] = [
  { id: "about", label: "About Me", icon: User, color: "#60a5fa" },
  { id: "thispc", label: "This PC", icon: HardDrive, color: "#fbbf24" },
  { id: "projects", label: "Projects", icon: FolderGit2, color: "#a78bfa" },
  { id: "terminal", label: "Terminal", icon: TerminalSquare, color: "#34d399" },
  { id: "resume", label: "Resume.pdf", icon: FileText, color: "#f87171" },
  { id: "browser", label: "Edge", icon: Globe, color: "#38bdf8" },
  { id: "recyclebin", label: "Recycle Bin", icon: Trash2, color: "#9ca3af" },
  { id: "settings", label: "Settings", icon: SettingsIcon, color: "#cbd5e1" },
];

export function getApp(id: AppId): AppMeta {
  return APPS.find((a) => a.id === id)!;
}
