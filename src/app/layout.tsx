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
  title: {
    default: "scaffold-agent | Build Onchain AI Agents",
    template: "%s | scaffold-agent",
  },
  description:
    "One command to scaffold onchain AI agents. Interactive CLI that generates full-stack monorepo projects with smart contracts (Foundry/Hardhat), frontends (Next.js/Vite/Python), LLM integration (OpenAI, Anthropic, Gemini, 1Claw Shroud), agent wallets, and on-chain tools. Built on Scaffold-ETH 2.",
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
    "Scaffold-ETH 2",
    "1Claw",
    "Shroud",
    "Vercel AI SDK",
    "WalletConnect",
    "wagmi",
    "viem",
    "RainbowKit",
    "agent wallet",
    "smart contract deployment",
    "ABI generation",
    "onchain agent tools",
    "multi-agent swarm",
    "LLM proxy",
  ],
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "scaffold-agent | Build Onchain AI Agents",
    description:
      "One command to scaffold a full-stack monorepo with smart contracts, a frontend, LLM integration, and AI agent infrastructure. Supports Foundry, Hardhat, Next.js, Vite, and Python.",
    url: siteUrl,
    siteName: "scaffold-agent",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "scaffold-agent | Build Onchain AI Agents",
    description:
      "One command to scaffold a full-stack monorepo with smart contracts, a frontend, LLM integration, and AI agent infrastructure.",
    site: "@1clawAI",
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
  category: "Developer Tools",
  creator: "1Claw",
  publisher: "1Claw",
};

const faqItems = [
  {
    question: "What is scaffold-agent?",
    answer:
      "scaffold-agent is an open-source interactive CLI that scaffolds full-stack monorepo projects for building onchain AI agents. It generates smart contracts (Foundry or Hardhat), a frontend (Next.js, Vite, or Python), LLM integration, and agent infrastructure in one command.",
  },
  {
    question: "How do I install and run scaffold-agent?",
    answer:
      "Run 'npx scaffold-agent@latest' in your terminal. No global installation is required — npx downloads and runs the latest version. You can also pass a project name directly: 'npx scaffold-agent@latest my-agent'. The CLI walks you through 7 steps: project name, secrets management, agent identity, Ampersend SDK, LLM provider, chain framework, and app framework.",
  },
  {
    question: "What LLM providers does scaffold-agent support?",
    answer:
      "scaffold-agent supports OpenAI, Anthropic, Google Gemini, and 1Claw Shroud as LLM providers. 1Claw Shroud is a proxy that supports 6 upstream providers (OpenAI, Anthropic, Google/Gemini, Mistral, Cohere, OpenRouter) with token billing or bring-your-own-key mode. All chat routes use the Vercel AI SDK for streaming.",
  },
  {
    question: "What smart contract frameworks are supported?",
    answer:
      "scaffold-agent supports Foundry and Hardhat for smart contract development. Both frameworks include auto-deploy scripts, ABI type generation (the Scaffold-ETH 2 pattern), and a debug contracts page. You can also choose no chain framework if you only need the frontend and agent infrastructure.",
  },
  {
    question:
      "How do I set up a local development environment after scaffolding?",
    answer:
      "After scaffolding, run these commands in order: 1) 'just chain' to start a local blockchain (in a second terminal), 2) 'just fund' to fund the deployer and agent wallets with 100 ETH each, 3) 'just deploy' to deploy contracts and generate ABI types, 4) 'just start' to launch the frontend at http://localhost:3000. The 'just' task runner (https://just.systems) must be installed separately.",
  },
  {
    question: "What is swarm mode in scaffold-agent?",
    answer:
      "Swarm mode (--swarm <n>, 1-64 agents) generates multiple Ethereum wallets for multi-agent setups. The first wallet stays as AGENT_ADDRESS; extras are stored in encrypted SWARM_AGENT_KEYS_JSON. Generated Next.js and Vite apps include a swarm roster page at /swarm, a header agent picker, and balance/identity views per agent. Post-scaffold, use 'just swarm agents=N' to add more.",
  },
  {
    question: "How do I tell my AI assistant about scaffold-agent?",
    answer:
      "Have your AI fetch https://scaffoldagent.xyz/SKILL.md — this is a comprehensive skill file with the full CLI reference, all flags, generated project structure, just commands, LLM provider details, network model, and agent on-chain tools. Add 'Fetch https://scaffoldagent.xyz/SKILL.md' to your project rules or system prompt.",
  },
  {
    question: "What is the relationship between scaffold-agent and Scaffold-ETH 2?",
    answer:
      "scaffold-agent builds on patterns and tooling from Scaffold-ETH 2 by the BuidlGuidl community. Generated projects use Scaffold UI packages (@scaffold-ui/hooks, @scaffold-ui/components, @scaffold-ui/debug-contracts), the wagmi/viem stack, RainbowKit wallet connection, ABI type generation via deployedContracts.ts, and the /debug contracts page. scaffold-agent extends this foundation with AI agent infrastructure, LLM integration, and multi-agent swarm support.",
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const softwareAppLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "scaffold-agent",
    description:
      "Interactive CLI to scaffold monorepo projects for onchain AI agents. Generates smart contracts, frontends, LLM integration, and agent infrastructure.",
    applicationCategory: "DeveloperApplication",
    applicationSubCategory: "CLI Tool",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: siteUrl,
    downloadUrl: "https://www.npmjs.com/package/scaffold-agent",
    installUrl: "https://www.npmjs.com/package/scaffold-agent",
    softwareHelp: {
      "@type": "CreativeWork",
      url: "https://github.com/1clawAI/scaffold-agent#readme",
    },
    codeRepository: "https://github.com/1clawAI/scaffold-agent",
    programmingLanguage: ["TypeScript", "Solidity"],
    runtimePlatform: "Node.js",
    license: "https://github.com/1clawAI/scaffold-agent/blob/main/LICENSE",
    sourceOrganization: {
      "@type": "Organization",
      name: "1Claw",
      url: "https://1claw.xyz",
    },
    isAccessibleForFree: true,
    featureList: [
      "Smart contract scaffolding (Foundry, Hardhat)",
      "Frontend generation (Next.js, Vite, Python A2A)",
      "LLM integration (OpenAI, Anthropic, Gemini, 1Claw Shroud)",
      "Agent Ethereum wallet generation",
      "Multi-agent swarm mode (1-64 agents)",
      "ABI type generation (Scaffold-ETH 2 pattern)",
      "1Claw HSM vault secrets management",
      "Vercel AI SDK streaming chat",
      "Agent on-chain tools (contract reads, 1Claw Intents)",
      "Unified network model with scaffold.config.ts",
      "Non-interactive CI/automation mode",
      "Config file support (agent.json)",
    ],
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const howToLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to build an onchain AI agent with scaffold-agent",
    description:
      "Step-by-step guide to scaffold and run a full-stack onchain AI agent project using the scaffold-agent CLI.",
    totalTime: "PT10M",
    tool: [
      { "@type": "HowToTool", name: "Node.js" },
      { "@type": "HowToTool", name: "npm" },
      { "@type": "HowToTool", name: "just (https://just.systems)" },
    ],
    step: [
      {
        "@type": "HowToStep",
        name: "Scaffold the monorepo",
        text: "Run 'npx scaffold-agent@latest' or 'npx scaffold-agent@latest my-agent' to create a new project. The interactive wizard walks through project name, secrets, agent identity, LLM provider, chain framework, and app framework.",
        url: `${siteUrl}#get-started`,
      },
      {
        "@type": "HowToStep",
        name: "Start a local blockchain",
        text: "Open a second terminal, navigate to the project directory, and run 'just chain' to start a local blockchain (Anvil for Foundry or Hardhat node).",
      },
      {
        "@type": "HowToStep",
        name: "Fund the wallets",
        text: "Run 'just fund' to fund the deployer and agent wallets with 100 ETH each from the local chain's account #0.",
      },
      {
        "@type": "HowToStep",
        name: "Deploy contracts",
        text: "Run 'just deploy' to deploy your smart contracts and auto-generate TypeScript ABI types in deployedContracts.ts.",
      },
      {
        "@type": "HowToStep",
        name: "Start the app",
        text: "Run 'just start' to launch the frontend dev server (usually at http://localhost:3000). The AI agent is now ready to interact with your contracts via the chat interface.",
        url: "http://localhost:3000",
      },
    ],
  };

  const webSiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "scaffold-agent",
    url: siteUrl,
    description:
      "Official website for scaffold-agent — an interactive CLI to scaffold monorepo projects for onchain AI agents.",
    publisher: {
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
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([softwareAppLd, faqLd, howToLd, webSiteLd]),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
