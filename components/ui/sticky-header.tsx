"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState } from "react";

import localFont from "next/font/local";
const NirvanaFont = localFont({
  src: "../../app/fonts/fontc.otf",
  display: "swap",
});
export const GlassmorphicStickyHeader = () => {
  const [bgPosition, setBgPosition] = useState(80); // Start a bit above bottom
  return (
    <header
      className={cn(
        "fixed top-4  left-1/2 z-50 w-[90%] max-w-5xl -translate-x-1/2",
        "rounded-2xl border border-white/20 shadow-lg backdrop-blur-xl",
        "bg-cover bg-no-repeat"
      )}
      style={{
        backgroundImage: "url('/high.jpeg')",
        // backgroundPosition: `center 80%`,
      }}
    >
      <div
      
      className="mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo / Title */}
        <Link href="/" className={`text-3xl mt-5 font-bold text-white drop-shadow `}>
          🚀 Virat Kohli
        </Link>

        {/* Background Position Control */}
        {/* <div className="flex items-center gap-3">
          <span className="text-xs text-white/70">Position:</span>
          <input
            type="range"
            min="0"
            max="100"
            value={bgPosition}
            onChange={(e) => setBgPosition(Number(e.target.value))}
            className="w-20 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.3) ${bgPosition}%, rgba(255,255,255,0.1) ${bgPosition}%, rgba(255,255,255,0.1) 100%)`
            }}
          />
          <span className="text-xs text-white/70 w-8">{bgPosition}%</span>
        </div> */}

        {/* Nav Links */}
        <nav className="flex gap-6 text-sm font-medium text-white/80">
          <Link href="/chat" className="hover:text-white transition-colors">
            Chat
          </Link>
        </nav>
      </div>
    </header>
  );
};
