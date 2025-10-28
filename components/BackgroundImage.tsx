// components/BackgroundImage.tsx
"use client";
import Image from "next/image";

export default function BackgroundImage() {
  return (
    <div className="fixed inset-0 -z-50 pointer-events-none">
      <Image
        src="/viratscene.png" // Put your image in /public
        alt="Virat Kohli Background"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      {/* Optional gradient overlay for contrast */}
      <div className="absolute   " />
    </div>
  );
}
