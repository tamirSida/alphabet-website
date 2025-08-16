import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AdminProvider } from "@/lib/cms/admin-context";
import Navigation from "@/components/public/navigation";
import Footer from "@/components/public/footer";
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
      <head>
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        <AdminProvider>
          <Navigation />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </AdminProvider>
      </body>
    </html>
  );
}
