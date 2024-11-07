import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Camera } from "lucide-react";
import Link from "next/link";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "140thWeBeReal.",
  description: "140thWeb部門の思い出が詰まったアプリ",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black`}
      >
        <header className="font-black text-white fixed top-0 left-0 w-full flex items-center justify-center h-20 bg-transparent text-xl z-10">
          WeBeReal.
        </header>
        {children}
        <footer className="w-full bg-transparent h-[70px] fixed bottom-0 left-0 flex justify-center items-center">
          <Link href="/camera" className="text-white border-2 rounded-full p-3">
            <Camera />
          </Link>
        </footer>
      </body>
    </html>
  );
}
