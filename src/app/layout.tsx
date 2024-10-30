import "./globals.css";

import { ReactNode } from "react";
import { Plus_Jakarta_Sans, Space_Mono } from "next/font/google";
import type { Viewport } from "next";

import { Providers } from "./providers";

export const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
});

export const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  weight: ["400", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata = {
  title: "Step",
  description: "Step Finance is the front page of Solana. Visualize, Analyze, Aggregate and Execute transactions across Solana in one easy to use Dashboard",
};

export default function RootLayout({
  children,
  topbar,
}: {
  children: ReactNode;
  topbar: ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${spaceMono.variable} ${plusJakartaSans.className} ${plusJakartaSans.variable} $ antialiased`}
      >
        <Providers>
          <div className="relative h-screen w-screen overflow-auto bg-black">
            {topbar}
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
