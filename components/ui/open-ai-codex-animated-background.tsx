"use client";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import UnicornScene from "unicornstudio-react";
import Image from "next/image";
import Letter3DSwap from "../fancy/text/letter-3d-swap";
import localFont from "next/font/local";

const NirvanaFont = localFont({
  src: "../../app/fonts/fontc.otf",
  display: "swap",
});

export const Component = () => {
  const [mounted, setMounted] = useState(false);
  const [size, setSize] = useState({ width: 0, height: 0 });
    const [debug, setDebug] = useState(false)


  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize(); // set initial size
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!mounted) return null; // ⬅️ avoid hydration mismatch

  return (
    <div className="relative flex h-screen w-screen items-center justify-center overflow-hidden">
      {/* UnicornScene in background */}
      <UnicornScene
        production={true}
        projectId="1grEuiVDSVmyvEMAYhA6"
        width={size.width}
        height={size.height}
      />

      {/* Centered text */}
  <div
  className={cn(
    "absolute font-bold drop-shadow-lg flex  flex-col"
  )}
>
  {/* Parent acts as a stacking container */}
  <div className="relative flex items-center justify-center">
    
    {/* Buddha SVG (background layer) */}
    <Image
      src="/buddha.svg"
      alt="Logo"
      width={700}
      height={700}
      className="absolute    z-0 drop-shadow-lg"
    />

    {/* Text on top (foreground layer) */}
    {/* <Letter3DSwap
      mainClassName="relative z-10 text-2xl sm:text-3xl md:text-7xl text-pink-600 bg-transparent"
      frontFaceClassName={`bg-transparent ${debug ? "border" : ""}`}
      secondFaceClassName={`bg-transparent ${debug ? "border" : ""}`}
      rotateDirection="top"
      staggerDuration={0.03}
      staggerFrom="first"
      transition={{ type: "spring", damping: 25, stiffness: debug ? 50 : 160 }}
    >
      NIRVANA!
    </Letter3DSwap> */}
    
  </div>
<div className="text-center mt-50 ">
  <h1 className={`${NirvanaFont.className} text-5xl font-bold text-white`}>
    let us{" "}
    <a href="/chat" className="font-bold underline hover:text-pink-600">
      /chat
    </a>{" "}
    to feel better
  </h1>
</div>
</div>

    </div>
  );
};
