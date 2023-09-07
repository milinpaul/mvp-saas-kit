import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { Toaster } from "@/co/ui/toaster";

import { cn } from "@/lib/utils";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const fontHeading = localFont({
  src: "../assets/CalSans-SemiBold.woff2",
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "Remarks.io",
  description: "A simple bookmarking application.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable,
          fontHeading.variable
        )}
      >
        {children}
        <Toaster />
        {/* <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Analytics />
          <TailwindIndicator />
        </ThemeProvider> */}
      </body>
    </html>
  );
}
