import type { Metadata } from "next";
import { Inter, Black_Ops_One } from "next/font/google";
import { AdminProvider } from "@/lib/cms/admin-context";
import ConditionalNavigation from "@/components/layout/conditional-navigation";
import ConditionalFooter from "@/components/layout/conditional-footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const blackOpsOne = Black_Ops_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-black-ops-one",
});

export const metadata: Metadata = {
  title: "Alpha-Bet | Entrepreneurship Program for Combat Veterans",
  description: "Entrepreneurship program for US and Israeli combat veterans. From battlefield to business - your next mission starts here.",
  keywords: "veterans, entrepreneurship, startup, combat veterans, business program, Version Bravo",
  openGraph: {
    title: "Alpha-Bet | Entrepreneurship Program for Combat Veterans",
    description: "Entrepreneurship program for US and Israeli combat veterans. From battlefield to business - your next mission starts here.",
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
        <link
          href="https://fonts.googleapis.com/css2?family=Black+Ops+One&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${inter.variable} ${blackOpsOne.variable} font-sans antialiased`}
      >
        <AdminProvider>
          <ConditionalNavigation />
          <main className="min-h-screen">
            {children}
          </main>
          <ConditionalFooter />
        </AdminProvider>
      </body>
    </html>
  );
}
