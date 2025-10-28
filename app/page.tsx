"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { GlassmorphicStickyHeader } from "@/components/ui/sticky-header";
import { Component as Loader } from "@/components/ui/luma-spin";
import Preview from "@/components/typewriter";

export default function TestPage() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center px-6">
      <GlassmorphicStickyHeader />

      {/* Main container */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16 z-20 w-full max-w-6xl">
        {/* Left side: Typewriter preview + Chat Button */}
        <div className="flex flex-col items-center md:items-start justify-center mb-10 md:mb-0 text-center md:text-left gap-6">
          
          <>
          <Preview />

          {/* Chat Button */}
          <div className="ml-[120px]">

          <button
            onClick={() => router.push("/chat")}
            className=" p-3  cursor-pointer rounded-2xl bg-white/10 border text-black  border-white/20 
                        font-medium backdrop-blur-md shadow-lg 
                       hover:bg-white/20 hover:scale-105 transition-all duration-300"
          >
            💬 Start Chat
          </button>
          </div>

          </>
        </div>

        {/* Right side: Tilted card stack */}
        <div className="relative w-[200px] h-[300px] md:w-[220px] md:h-[350px] flex-shrink-0">
          {/* Card 1 */}
          <div
            className="absolute w-48 h-64 md:w-64 md:h-80 rounded-2xl overflow-hidden shadow-lg 
                       bg-white/10 backdrop-blur-md border border-white/20 transform 
                       rotate-[-8deg] translate-x-[-10px] translate-y-[20px] 
                       hover:scale-105 transition-transform duration-300"
            style={{ zIndex: 1 }}
          >
            <img
              src="/v4.jpg"
              alt="Kohli 1"
              className="object-cover w-full h-full"
            />
          </div>

          {/* Card 2 */}
          <div
            className="absolute w-48 h-64 md:w-64 md:h-80 rounded-2xl overflow-hidden shadow-lg 
                       bg-white/10 backdrop-blur-md border border-white/20 transform 
                       rotate-[0deg] translate-x-[10px] translate-y-[10px] 
                       hover:scale-105 transition-transform duration-300"
            style={{ zIndex: 2 }}
          >
            <img
              src="/v1.jpeg"
              alt="Kohli 2"
              className="object-cover w-full h-full"
            />
          </div>

          {/* Card 3 */}
          <div
            className="absolute w-48 h-64 md:w-64 md:h-80 rounded-2xl overflow-hidden shadow-lg 
                       bg-white/10 backdrop-blur-md border border-white/20 transform 
                       rotate-[8deg] translate-x-[30px] translate-y-[-10px] 
                       hover:scale-105 transition-transform duration-300"
            style={{ zIndex: 3 }}
          >
            <img
              src="/v2.jpg"
              alt="Kohli 3"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
