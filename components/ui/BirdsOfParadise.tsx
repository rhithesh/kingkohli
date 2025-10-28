"use client";

import Image from "next/image";

interface Props {
  projectId?: string;
  className?: string;
}

export default function BirdsOfParadiseScene({ className }: Props) {
  return (
    <div className={`absolute inset-0 -z-10 ${className || ""}`}>
      <Image
        src="https://noeawrojjd.ufs.sh/f/hhi7TjKirdIgsw461qU2PMmcntxhTqy9rGa2BdoOKCXDLUHl"
        alt="Virat Kohli Background"
        priority
        className="object-cover"
        fill
      />
      {/* subtle gradient overlay for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
    </div>
  );
}
