"use client";

export const Component = () => {
  return (
    <div className="relative w-[65px] aspect-square">
      {/* Base ring - white */}
      <span className="absolute inset-0 rounded-full border-4 border-white" />

      {/* Animated ring - black */}
      <span className="absolute inset-0 rounded-full animate-loaderAnim animation-delay border-4 border-black" />

      <style jsx>{`
        @keyframes loaderAnim {
          0% {
            inset: 0 35px 35px 0;
          }
          12.5% {
            inset: 0 35px 0 0;
          }
          25% {
            inset: 35px 35px 0 0;
          }
          37.5% {
            inset: 35px 0 0 0;
          }
          50% {
            inset: 35px 0 0 35px;
          }
          62.5% {
            inset: 0 0 0 35px;
          }
          75% {
            inset: 0 0 35px 35px;
          }
          87.5% {
            inset: 0 0 35px 0;
          }
          100% {
            inset: 0 35px 35px 0;
          }
        }

        .animate-loaderAnim {
          animation: loaderAnim 2.5s infinite;
        }

        .animation-delay {
          animation-delay: -1.25s;
        }
      `}</style>
    </div>
  );
};
