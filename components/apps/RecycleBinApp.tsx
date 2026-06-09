"use client";

import { Trash2, FileX2 } from "lucide-react";
import { recycleBin } from "@/data/portfolio";

export function RecycleBinApp() {
  return (
    <div className="h-full flex flex-col">
      <div className="h-10 px-3 border-b border-white/5 bg-black/20 flex items-center gap-2 text-xs">
        <Trash2 className="w-4 h-4 text-foreground/60" />
        <span>Recycle Bin — {recycleBin.length} items</span>
        <span className="ml-auto text-foreground/50">Empty Bin (just kidding)</span>
      </div>
      <div className="flex-1 overflow-auto p-4 grid grid-cols-[repeat(auto-fill,140px)] auto-rows-[120px] gap-2 content-start">
        {recycleBin.map((item) => (
          <div
            key={item.name}
            className="flex flex-col items-center text-center gap-1 p-2 rounded hover:bg-white/5 group"
            title={item.note}
          >
            <FileX2 className="w-10 h-10 text-foreground/40 group-hover:text-rose-400 transition" />
            <span className="text-[11px] leading-tight line-clamp-2">{item.name}</span>
            <span className="text-[10px] text-foreground/50 line-clamp-2">{item.note}</span>
          </div>
        ))}
      </div>
      <div className="h-6 px-3 border-t border-white/5 bg-black/30 text-[11px] text-foreground/60 flex items-center">
        These ideas were harmed in the making of this portfolio.
      </div>
    </div>
  );
}
