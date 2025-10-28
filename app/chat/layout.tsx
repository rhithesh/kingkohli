import "../globals.css";
import MusicPlayer from "@/components/Music";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
        <div className="relative min-h-screen w-screen overflow-hidden">
          {/* 🎶 Global Music Player (fixed at bottom) */}
         

          {/* 🧩 Page Content */}
          <main className="relative z-10">{children}</main>
        </div>
  );
}
