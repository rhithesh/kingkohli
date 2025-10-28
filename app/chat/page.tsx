"use client";

import { useEffect, useState } from "react";
import Chat from "../../components/Chat";
import { Component as Loader } from "@/components/ui/luma-spin";
import { CricketField, CricketBat } from "@/components/ui/CricketElements";
import MusicPlayer from "@/components/Music";

export default function Page() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // show loader for at least 2 seconds
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
        <div className="flex items-center justify-center z-20 min-h-screen">
        
            <Loader />
        </div>
    );
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Chat />
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-11">
        {/* <MusicPlayer /> */}
      </div>
      </>
  );
}
