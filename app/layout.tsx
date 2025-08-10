import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AdminProvider } from "@/lib/cms/admin-context";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Alpha-Bet | Entrepreneurship Program for Combat Veterans",
  description: "Free entrepreneurship program for US and Israeli combat veterans. From battlefield to business - your next mission starts here.",
  keywords: "veterans, entrepreneurship, startup, combat veterans, business program, Version Bravo",
  openGraph: {
    title: "Alpha-Bet | Entrepreneurship Program for Combat Veterans",
    description: "Free entrepreneurship program for US and Israeli combat veterans. From battlefield to business - your next mission starts here.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        <AdminProvider>
          {children}
        </AdminProvider>
      </body>
    </html>
  );
}
