// components/ui/CricketElements.tsx
"use client";

import React from "react";

export const CricketScoreboard = ({ score, wickets, overs }: { score: number; wickets: number; overs: number }) => {
  return (
    <div className="cricket-glass p-4 rounded-xl">
      <div className="text-center text-white">
        <div className="text-2xl font-bold score-flash">{score}</div>
        <div className="text-sm opacity-70">
          {wickets} wickets • {overs} overs
        </div>
      </div>
    </div>
  );
};

export const CricketBat = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`bat-swing ${className}`}>
      <div className="relative">
        <div className="w-2 h-16 bg-gradient-to-b from-amber-600 to-amber-800 rounded-full mx-auto"></div>
        <div className="w-8 h-2 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full mx-auto mt-2"></div>
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-1 h-4 bg-amber-700 rounded-full"></div>
      </div>
    </div>
  );
};

export const CricketBall = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`cricket-bounce ${className}`}>
      <div className="w-6 h-6 bg-gradient-to-br from-red-500 to-red-700 rounded-full shadow-lg">
        <div className="w-full h-full bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center">
          <div className="w-1 h-1 bg-red-200 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export const CricketStumps = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`${className}`}>
      <div className="relative">
        {/* Stumps */}
        <div className="flex gap-1 justify-center">
          <div className="w-1 h-8 bg-gradient-to-b from-amber-600 to-amber-800 rounded-full"></div>
          <div className="w-1 h-8 bg-gradient-to-b from-amber-600 to-amber-800 rounded-full"></div>
          <div className="w-1 h-8 bg-gradient-to-b from-amber-600 to-amber-800 rounded-full"></div>
        </div>
        {/* Bails */}
        <div className="absolute -top-1 left-0 right-0 flex justify-center">
          <div className="w-6 h-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"></div>
        </div>
        <div className="absolute -top-1 left-0 right-0 flex justify-center mt-1">
          <div className="w-6 h-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export const ViratKohliSignature = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`text-center ${className}`}>
      <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-yellow-400 to-blue-600">
        VIRAT KOHLI
      </div>
      <div className="text-sm text-white/70 mt-1">King of Cricket</div>
    </div>
  );
};

export const CricketField = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative min-h-screen cricket-field-bg overflow-hidden">
      {/* Field markings */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 border-2 border-white/20 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-white/10 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-white/5 rounded-full"></div>
        
        {/* Pitch */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-32 bg-gradient-to-b from-green-400 to-green-600 rounded-full"></div>
        
        {/* Corner flags */}
        <div className="absolute top-4 left-4 w-2 h-8 bg-red-500 rounded-full"></div>
        <div className="absolute top-4 right-4 w-2 h-8 bg-red-500 rounded-full"></div>
        <div className="absolute bottom-4 left-4 w-2 h-8 bg-red-500 rounded-full"></div>
        <div className="absolute bottom-4 right-4 w-2 h-8 bg-red-500 rounded-full"></div>
      </div>
      
      {children}
    </div>
  );
};
