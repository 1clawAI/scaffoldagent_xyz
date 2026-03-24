import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://scaffoldagent.xyz";

export const metadata: Metadata = {
  title: "scaffold-agent | Build Onchain AI Agents",
  description:
    "One command to scaffold your onchain AI agent. Interactive CLI for full-stack monorepo projects with smart contracts, frontends, and agent infrastructure.",
  keywords: [
    "onchain AI agent",
    "scaffold-agent",
    "AI agent scaffolding",
    "blockchain AI",
    "smart contract CLI",
    "Ethereum AI agent",
    "onchain agent framework",
    "AI agent builder",
    "npx scaffold-agent",
    "web3 AI",
    "Foundry",
    "Hardhat",
    "Next.js",
    "scaffold-eth",
  ],
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "scaffold-agent | Build Onchain AI Agents",
    description:
      "One command to scaffold a full-stack monorepo with smart contracts, a frontend, and AI agent infrastructure.",
    url: siteUrl,
    siteName: "scaffold-agent",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "scaffold-agent | Build Onchain AI Agents",
    description:
      "One command to scaffold a full-stack monorepo with smart contracts, a frontend, and AI agent infrastructure.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "scaffold-agent",
    description:
      "Interactive CLI to scaffold monorepo projects for onchain AI agents",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: siteUrl,
    downloadUrl: "https://www.npmjs.com/package/scaffold-agent",
    softwareHelp: {
      "@type": "CreativeWork",
      url: "https://github.com/1clawAI/scaffold-agent#readme",
    },
    sourceOrganization: {
      "@type": "Organization",
      name: "1Claw",
      url: "https://1claw.xyz",
    },
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
