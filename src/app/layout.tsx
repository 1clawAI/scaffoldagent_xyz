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
    "One command to scaffold onchain AI agents. Interactive CLI that generates full-stack monorepo projects with smart contracts (Foundry/Hardhat), frontends (Next.js/Vite/Python), 9 LLM providers via 1Claw Shroud, HSM/TEE multi-chain signing (29+ EVM chains + Bitcoin, Solana, XRP, Cardano, Tron), 44 MCP tools, agent on-chain tools, and swarm mode. Built on Scaffold-ETH 2.",
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
    "1Claw Intents API",
    "MCP tools",
    "HSM signing",
    "multi-chain signing",
    "Bitcoin Solana XRP agent",
  ],
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "scaffold-agent | Build Onchain AI Agents",
    description:
      "One command to scaffold a full-stack monorepo with smart contracts, 9 LLM providers, HSM multi-chain signing, 44 MCP tools, and AI agent infrastructure. Supports Foundry, Hardhat, Next.js, Vite, and Python.",
    url: siteUrl,
    siteName: "scaffold-agent",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "scaffold-agent | Build Onchain AI Agents",
    description:
      "One command to scaffold a full-stack monorepo with smart contracts, 9 LLM providers, HSM multi-chain signing, 44 MCP tools, and AI agent infrastructure.",
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
      "scaffold-agent is an open-source interactive CLI that scaffolds full-stack monorepo projects for building onchain AI agents. It generates smart contracts (Foundry or Hardhat), a frontend (Next.js, Vite, or Python), 9 LLM providers, 44 MCP tools, HSM multi-chain signing, and agent infrastructure in one command.",
  },
  {
    question: "How do I install and run scaffold-agent?",
    answer:
      "Run 'npx scaffold-agent@latest' in your terminal. No global installation is required — npx downloads and runs the latest version. You can also pass a project name directly: 'npx scaffold-agent@latest my-agent'. The CLI walks you through 8 steps: project name, secrets management, agent identity, Ampersend SDK, The Graph integration, LLM provider, chain framework, and app framework. Use 'just quickstart' for one-command local setup after scaffolding.",
  },
  {
    question: "What LLM providers does scaffold-agent support?",
    answer:
      "1Claw Shroud supports 9 upstream providers: OpenAI, Anthropic, Google/Gemini, Mistral, Cohere, OpenRouter, Darkbloom (E2E encrypted Apple Silicon TEE), and Venice (zero-retention + optional TEE/E2EE). You can also use OpenAI, Anthropic, or Gemini directly with their SDKs. All chat routes use the Vercel AI SDK for streaming.",
  },
  {
    question: "What chains does the Intents API support?",
    answer:
      "1Claw Intents supports HSM/TEE transaction signing across 29 EVM mainnets (Ethereum, Base, Optimism, Arbitrum, Polygon, Avalanche, BNB, zkSync, Linea, Scroll, and more), EVM testnets, plus non-EVM chains: Bitcoin, Solana, XRP, Cardano, and Tron. Per-agent guardrails include allowed chains, recipient allowlists, per-tx value caps, and daily spending limits.",
  },
  {
    question: "What is The Graph integration in scaffold-agent?",
    answer:
      "Use --graph none|mcp|x402|both during scaffolding. MCP adds @graphprotocol/subgraph-mcp to .cursor/mcp.json for IDE-time subgraph queries. x402 adds runtime agent tools (graph_search_subgraphs, graph_subgraph_query), a /data page, and lib/graph-client.ts. Optional GRAPH_API_KEY or vault path api-keys/thegraph; Substreams-powered subgraphs may require x402 USDC payment per query.",
  },
  {
    question: "What is @1claw/mcp?",
    answer:
      "When 1Claw is selected, scaffold-agent auto-generates .cursor/mcp.json (Cursor) and .mcp.json (Claude Code) with the @1claw/mcp server pre-configured. This gives AI agents access to 44 MCP tools: vault secrets, Intents API (simulate, submit, sign), signing key management, treasury proposals, and execution intents. Only ONECLAW_AGENT_API_KEY is required — agent ID and vault are auto-discovered.",
  },
  {
    question:
      "How do I set up a local development environment after scaffolding?",
    answer:
      "After scaffolding, run 'just quickstart' for one-command setup (starts chain in background, funds wallets, deploys contracts, launches app). Or step by step: 1) 'just chain' to start a local blockchain, 2) 'just fund' to fund deployer and agent wallets, 3) 'just deploy' to deploy contracts and generate ABI types, 4) 'just start' to launch the frontend. Run 'just doctor' anytime to health-check your environment.",
  },
  {
    question: "How do I tell my AI assistant about scaffold-agent?",
    answer:
      "Have your AI fetch https://scaffoldagent.xyz/SKILL.md — this is a comprehensive skill file with the full CLI reference, all flags, generated project structure, just commands, LLM providers, Intents API, MCP integration, and agent on-chain tools. Add 'Fetch https://scaffoldagent.xyz/SKILL.md' to your project rules or system prompt.",
  },
  {
    question: "What is the relationship between scaffold-agent and Scaffold-ETH 2?",
    answer:
      "scaffold-agent builds on patterns and tooling from Scaffold-ETH 2 by the BuidlGuidl community. Generated projects use Scaffold UI packages (@scaffold-ui/hooks, @scaffold-ui/components, @scaffold-ui/debug-contracts), the wagmi/viem stack, RainbowKit wallet connection, ABI type generation via deployedContracts.ts, and the /debug contracts page. scaffold-agent extends this foundation with AI agent infrastructure, LLM integration, MCP tools, multi-chain signing, and multi-agent swarm support.",
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
      "9 LLM providers via 1Claw Shroud (OpenAI, Anthropic, Gemini, Mistral, Cohere, OpenRouter, Darkbloom, Venice)",
      "HSM/TEE multi-chain signing via 1Claw Intents (29+ EVM chains + Bitcoin, Solana, XRP, Cardano, Tron)",
      "44 MCP tools via @1claw/mcp (vault, Intents, signing keys, treasury)",
      "Agent on-chain tools (wallet balances, ENS, ERC-8004, contract reads, 1Claw Intents, optional Graph subgraph queries)",
      "The Graph subgraph integration (--graph mcp|x402|both) with /data page",
      "@1claw/mcp: 44 MCP tools auto-configured for Cursor and Claude Code",
      "Agent Ethereum wallet generation",
      "Multi-agent swarm mode (1-64 agents)",
      "ABI type generation (Scaffold-ETH 2 pattern)",
      "1Claw HSM vault secrets management",
      "Vercel AI SDK streaming chat",
      "Unified network model with scaffold.config.ts",
      "One-command quickstart (just quickstart) and health check (just doctor)",
      "Non-interactive CI/automation mode with config file support (agent.json)",
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
        text: "Run 'npx scaffold-agent@latest' or 'npx scaffold-agent@latest my-agent' to create a new project. The interactive wizard walks through project name, secrets, agent identity, Ampersend, LLM provider, chain framework, and app framework.",
        url: `${siteUrl}#get-started`,
      },
      {
        "@type": "HowToStep",
        name: "Quickstart or step-by-step",
        text: "Run 'just quickstart' for one-command setup (chain in background → fund → deploy → start). Or individually: 'just chain', 'just fund', 'just deploy', 'just start'.",
      },
      {
        "@type": "HowToStep",
        name: "Validate your environment",
        text: "Run 'just doctor' to health-check your setup — validates .env, tools, 1Claw IDs, package installs, and network config.",
      },
      {
        "@type": "HowToStep",
        name: "Build and iterate",
        text: "Your AI agent is live at http://localhost:3000 with chat UI, contract interaction, and on-chain tools. Modify agent logic in packages/ and iterate. Use 'just use-network base' to switch networks.",
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
