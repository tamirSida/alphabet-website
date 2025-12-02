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
  title: "Alpha-Bet | Entrepreneurship Program for Combat Veterans | The Vetted",
  description: "Alpha-Bet: Elite entrepreneurship program by The Vetted for US and Israeli combat veterans. Alphabet methodology for veteran entrepreneurs. From battlefield to business - your next mission starts here.",
  keywords: "Alpha-Bet, alphabet, entrepreneurship, veterans, combat veterans, thevetted, the vetted, vbv, version bravo, veteran entrepreneurs, military startup accelerator, veteran business program, startup program veterans, combat veteran startup, israeli veterans, us veterans, veteran founded companies, elite veteran founders, military entrepreneur accelerator",
  authors: [{ name: "Alpha-Bet Program by The Vetted" }],
  creator: "The Vetted - Alpha-Bet Program",
  publisher: "The Vetted",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Alpha-Bet | Entrepreneurship Program for Combat Veterans | The Vetted",
    description: "Alpha-Bet: Elite entrepreneurship program by The Vetted for US and Israeli combat veterans. Alphabet methodology for veteran entrepreneurs building world-class companies.",
    url: "https://alphabet.thevetted.vc",
    siteName: "Alpha-Bet by The Vetted",
    type: "website",
    locale: "en_US",
    images: [{
      url: "https://alphabet.thevetted.vc/logo.png",
      width: 1200,
      height: 630,
      alt: "Alpha-Bet Entrepreneurship Program by The Vetted"
    }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@thevetted",
    creator: "@versionbravo",
    title: "Alpha-Bet | Combat Veteran Entrepreneurship | The Vetted",
    description: "Alpha-Bet: Elite entrepreneurship program by The Vetted. Alphabet methodology for veteran entrepreneurs. VBV accelerator program.",
    images: ["https://alphabet.thevetted.vc/logo.png"],
  },
  alternates: {
    canonical: "https://alphabet.thevetted.vc",
  },
  verification: {
    google: "google-site-verification",
  },
  icons: {
    icon: [
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon/favicon.ico', sizes: 'any' }
    ],
    apple: [
      { url: '/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
    other: [
      { url: '/favicon/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' }
    ]
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
        {/* SEO Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        
        {/* Enhanced SEO Keywords for Target Terms */}
        <meta name="description" content="Alpha-Bet: Elite entrepreneurship program by The Vetted for US and Israeli combat veterans. Alphabet methodology for veteran entrepreneurs. From battlefield to business." />
        <meta name="keywords" content="Alpha-Bet, alphabet, entrepreneurship, veterans, combat veterans, thevetted, the vetted, vbv, version bravo, veteran entrepreneurs, military startup accelerator, veteran business program, startup program veterans, combat veteran startup, israeli veterans, us veterans, veteran founded companies, elite veteran founders, military entrepreneur accelerator" />
        <meta name="subject" content="Combat Veteran Entrepreneurship Program by The Vetted" />
        <meta name="copyright" content="The Vetted - Alpha-Bet Program" />
        <meta name="abstract" content="Alpha-Bet accelerator program by The Vetted exclusively for elite combat veterans building startups using alphabet methodology" />
        <meta name="topic" content="Veteran entrepreneurship, alphabet methodology, and startup acceleration" />
        <meta name="summary" content="Elite entrepreneurship program for veteran-founded companies with VBV backing and The Vetted network" />
        <meta name="Classification" content="Business" />
        <meta name="designer" content="The Vetted" />
        <meta name="reply-to" content="info@thevetted.vc" />
        <meta name="owner" content="The Vetted" />
        <meta name="url" content="https://alphabet.thevetted.vc" />
        <meta name="identifier-URL" content="https://alphabet.thevetted.vc" />
        <meta name="directory" content="submission" />
        <meta name="category" content="Business, Startups, Veterans, Military, Entrepreneurship, Alpha-Bet, Alphabet" />
        <meta name="coverage" content="Worldwide" />
        <meta name="distribution" content="Global" />
        <meta name="rating" content="General" />
        
        {/* Geo Meta Tags */}
        <meta name="ICBM" content="25.7617, -80.1918" />
        <meta name="geo.position" content="25.7617;-80.1918" />
        <meta name="geo.region" content="US-FL" />
        <meta name="geo.placename" content="Miami, Florida" />
        
        {/* Web App Meta */}
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="msapplication-TileColor" content="#2563eb" />
        
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "name": "Alpha-Bet by The Vetted",
              "alternateName": ["Alpha-Bet", "Alphabet", "The Vetted Alpha-Bet", "VBV Alpha-Bet"],
              "description": "Alpha-Bet: Elite entrepreneurship program by The Vetted for US and Israeli combat veterans using alphabet methodology",
              "url": "https://alphabet.thevetted.vc",
              "logo": "https://alphabet.thevetted.vc/logo.png",
              "image": "https://alphabet.thevetted.vc/logo.png",
              "sameAs": [
                "https://linkedin.com/company/thevetted",
                "https://thevetted.vc"
              ],
              "parentOrganization": {
                "@type": "Organization",
                "name": "The Vetted",
                "alternateName": ["Version Bravo", "VBV"],
                "url": "https://thevetted.vc"
              },
              "educationalCredentialAwarded": "Alpha-Bet Entrepreneurship Program Certificate",
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Alpha-Bet Entrepreneurship Programs by The Vetted",
                "itemListElement": [
                  {
                    "@type": "Course",
                    "name": "Alpha-Bet 10-Week Combat Veteran Entrepreneurship Program",
                    "alternateName": ["Alphabet Methodology Program", "The Vetted Alpha-Bet"],
                    "description": "Elite entrepreneurship program using alphabet methodology for veteran entrepreneurs with VBV backing and The Vetted network",
                    "provider": {
                      "@type": "Organization",
                      "name": "The Vetted - Alpha-Bet Program"
                    },
                    "courseMode": "Hybrid",
                    "duration": "P10W",
                    "location": [
                      {
                        "@type": "Place",
                        "name": "Israel Program",
                        "address": {
                          "@type": "PostalAddress",
                          "addressCountry": "IL"
                        }
                      },
                      {
                        "@type": "Place", 
                        "name": "Miami Program",
                        "address": {
                          "@type": "PostalAddress",
                          "addressLocality": "Miami",
                          "addressRegion": "FL",
                          "addressCountry": "US"
                        }
                      }
                    ]
                  }
                ]
              },
              "audience": {
                "@type": "Audience",
                "audienceType": "Elite Combat Veterans and Military Entrepreneurs",
                "geographicArea": ["United States", "Israel"]
              },
              "specialty": "Combat Veteran Entrepreneurship using Alphabet Methodology",
              "keywords": "Alpha-Bet, alphabet, entrepreneurship, thevetted, the vetted, vbv, version bravo, veteran entrepreneurs, combat veteran startup"
            })
          }}
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
