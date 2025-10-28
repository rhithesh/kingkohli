// app/layout.tsx
import "./globals.css";

export const metadata = {
  title: "King Kohli — Cricket Chat",
  description: "Chat interface inspired by Virat Kohli's cricket legacy",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="cricket-field-bg">{children}</body>
    </html>
  );
}
