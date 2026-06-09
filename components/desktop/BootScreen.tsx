"use client"

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const STEPS = [
  "Starting Portfolio OS…",
  "Loading kernel modules…",
  "Mounting /projects…",
  "Initializing window manager…",
  "Welcome.",
];

export function BootScreen({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (step >= STEPS.length - 1) {
      const t = setTimeout(() => {
        setShow(false);
        setTimeout(onDone, 400);
      }, 600);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setStep((s) => s + 1), 500);
    return () => clearTimeout(t);
  }, [step, onDone]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center gap-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <svg viewBox="0 0 64 64" className="w-20 h-20 drop-shadow-[0_0_3px_rgba(0,120,215,0.3)]">
              <g fill="#0078D7">
                <rect x="0" y="0" width="30" height="30" />
                <rect x="34" y="0" width="30" height="30" />
                <rect x="0" y="34" width="30" height="30" />
                <rect x="34" y="34" width="30" height="30" />
              </g>
            </svg>
          </motion.div>

          <div className="relative w-9 h-9">
            <div
              className="absolute animate-spin inset-0 rounded-full border-2 border-transparent border-t-white"
              style={{ animation: "spin 1.1s cubic-bezier(0.53,0.21,0.29,0.67) infinite" }}
            />
          </div>
          {/* <motion.p
            key={step}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-white/70 tracking-wide"
          >
            {STEPS[step]}
          </motion.p> */}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
