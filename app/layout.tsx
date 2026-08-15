import type { Metadata, Viewport } from "next";
import { CommandSearchProvider } from "@/components/command-search-provider";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { isAnalyticsEnabled, isProductionEnvironment } from "@/lib/env";
import { buildSearchCatalog } from "@/lib/search-index";
import "katex/dist/katex.min.css";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PrepLoom | Technical Interview Preparation",
  description:
    "Master core concepts with structured notes, curated roadmaps, quizzes, interview questions, and trusted resources - all in one place.",
  applicationName: "PrepLoom",
  category: "education",
  keywords: [
    "technical interview preparation",
    "computer science notes",
    "interview roadmaps",
    "technical quizzes",
    "DSA sheets",
    "web development resources",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    siteName: "PrepLoom",
    title: "PrepLoom | Technical Interview Preparation",
    description:
      "Structured notes, curated roadmaps, quizzes, interview questions, and trusted resources for technical interview preparation.",
  },
  twitter: {
    card: "summary",
    title: "PrepLoom | Technical Interview Preparation",
    description:
      "Structured notes, curated roadmaps, quizzes, interview questions, and trusted resources for technical interview preparation.",
  },
  robots: {
    index: isProductionEnvironment,
    follow: isProductionEnvironment,
  },
  verification: isProductionEnvironment
    ? {
        google: "lucRs8gSNiXBQg-KWyiAJvsYWm8Crf_CC6Ytd-aSQ1w",
      }
    : undefined,
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f7f5" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const searchCatalog = buildSearchCatalog();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("preploom-theme");var d=t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme: dark)").matches);var r=document.documentElement;r.classList.toggle("dark",d);r.dataset.theme=d?"dark":"light";r.style.colorScheme=d?"dark":"light"}catch(e){}})();`,
          }}
        />
      </head>
      <body className="flex min-h-full flex-col">
        <CommandSearchProvider catalog={searchCatalog}>
          {children}
        </CommandSearchProvider>
      </body>
      {isAnalyticsEnabled ? <GoogleAnalytics gaId="G-EL58LD1HMW" /> : null}
    </html>
  );
}
