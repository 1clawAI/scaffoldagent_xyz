import Image from "next/image";
import AgentViewToggle from "@/components/AgentViewToggle";
import CopyButton from "@/components/CopyButton";

const COMMAND = "npx scaffold-agent@latest";
const SKILL_URL = "https://scaffoldagent.xyz/SKILL.md";

const features = [
  {
    title: "Smart Contracts",
    desc: "Foundry or Hardhat with auto-deploy, ABI generation, and type-safe contract hooks via Scaffold UI.",
  },
  {
    title: "Frontend Ready",
    desc: "Next.js, Vite, or Python A2A with WalletConnect, Scaffold UI, shared Header nav, and suggested prompts.",
  },
  {
    title: "9 LLM Providers",
    desc: "1Claw Shroud with 9 upstreams (OpenAI, Anthropic, Gemini, Mistral, Cohere, OpenRouter, Darkbloom, Venice) plus direct provider SDKs.",
  },
  {
    title: "Multi-Chain Signing",
    desc: "1Claw Intents API with HSM/TEE signing across 29+ EVM chains plus Bitcoin, Solana, XRP, Cardano, and Tron.",
  },
  {
    title: "Agent On-Chain Tools",
    desc: "7 Vercel AI SDK tools: contract reads, intent simulate/submit/sign, signing key management, and x402 payments.",
  },
  {
    title: "44 MCP Tools",
    desc: "@1claw/mcp auto-configured for Cursor and Claude Code — vault secrets, Intents, signing keys, and treasury.",
  },
];

const steps = [
  {
    num: "1",
    title: "Scaffold",
    command: "npx scaffold-agent@latest my-agent",
    desc: "The interactive wizard walks through project name, secrets, agent identity, Ampersend, LLM provider, chain framework, and app framework. Or use -y for defaults.",
  },
  {
    num: "2",
    title: "Quickstart",
    command: "just quickstart",
    desc: "One command to start the local chain (background), fund wallets, deploy contracts, and launch the app. Or run just chain / just fund / just deploy / just start individually.",
  },
  {
    num: "3",
    title: "Validate",
    command: "just doctor",
    desc: "Health check your environment — validates .env, tools, 1Claw IDs, package installs, and network config. Run anytime to diagnose issues.",
  },
  {
    num: "4",
    title: "Build",
    command: "just start",
    desc: "Your AI agent is live at localhost:3000 with chat UI, contract interaction, and on-chain tools. Modify agent logic in packages/ and iterate.",
  },
];

const faqItems = [
  {
    q: "What is scaffold-agent?",
    a: "scaffold-agent is an open-source interactive CLI that scaffolds full-stack monorepo projects for building onchain AI agents. It generates smart contracts (Foundry or Hardhat), a frontend (Next.js, Vite, or Python), LLM integration, 1Claw MCP tools, and agent infrastructure in one command.",
  },
  {
    q: "How do I install it?",
    a: "No global installation required — just run npx scaffold-agent@latest in your terminal. You can also pass a project name directly: npx scaffold-agent@latest my-agent. The only prerequisites are Node.js, npm, and optionally the just task runner.",
  },
  {
    q: "What LLM providers are supported?",
    a: "1Claw Shroud supports 9 upstream providers: OpenAI, Anthropic, Google/Gemini, Mistral, Cohere, OpenRouter, Darkbloom (E2E encrypted Apple Silicon TEE), and Venice (zero-retention + optional TEE). You can also use OpenAI, Anthropic, or Gemini directly. All chat routes use the Vercel AI SDK for streaming.",
  },
  {
    q: "What chains does the Intents API support?",
    a: "1Claw Intents supports HSM/TEE transaction signing across 29 EVM mainnets (Ethereum, Base, Optimism, Arbitrum, Polygon, Avalanche, BNB, zkSync, Linea, Scroll, and more), EVM testnets, plus non-EVM chains: Bitcoin, Solana, XRP, Cardano, and Tron. Per-agent guardrails include chain restrictions, recipient allowlists, and daily spending limits.",
  },
  {
    q: "What is @1claw/mcp?",
    a: "When 1Claw is selected, scaffold-agent auto-generates .cursor/mcp.json and .mcp.json with the @1claw/mcp server pre-configured. This gives AI agents access to 44 MCP tools: vault secrets, Intents API (simulate, submit, sign), signing key management, treasury proposals, and execution intents.",
  },
  {
    q: "How do I point my AI assistant at scaffold-agent?",
    a: "Have your AI fetch https://scaffoldagent.xyz/SKILL.md — it contains the full CLI reference, all flags, project structure, just commands, LLM providers, Intents API, MCP integration, and agent tools. Add it to your project rules or tell your assistant directly.",
  },
];

const links = [
  { label: "GitHub", href: "https://github.com/1clawAI/scaffold-agent" },
  { label: "npm", href: "https://www.npmjs.com/package/scaffold-agent" },
  { label: "1Claw", href: "https://1claw.xyz" },
  { label: "Scaffold-ETH 2", href: "https://scaffoldeth.io" },
];

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center px-6 py-12">
      <AgentViewToggle>
        <article className="relative z-10 max-w-2xl w-full text-center">
          {/* Hero */}
          <Image
            src="/logo-medium.png"
            alt="scaffold-agent logo"
            width={280}
            height={200}
            className="mx-auto mb-6 w-[200px] sm:w-[280px] h-auto"
            priority
          />

          <p className="inline-block text-xs font-semibold tracking-widest uppercase text-accent bg-accent-dim border border-accent/20 px-3.5 py-1.5 rounded-full mb-6">
            Open Source CLI
          </p>

          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Build <span className="text-accent">Onchain AI Agents</span>
          </h1>

          <p className="text-lg text-muted leading-relaxed mb-10">
            One command to scaffold a full-stack monorepo with smart contracts, a
            frontend, and agent infrastructure.
          </p>

          {/* Command box */}
          <div
            id="get-started"
            className="bg-surface border border-border rounded-xl px-5 py-4 flex items-center justify-between gap-4 mb-12 group hover:border-[#333] transition-colors"
          >
            <code className="font-mono text-base sm:text-lg">
              <span className="text-accent select-none">$&nbsp;</span>
              {COMMAND}
            </code>
            <CopyButton text={COMMAND} />
          </div>

          {/* Features */}
          <section aria-label="Features" className="mb-12">
            <h2 className="sr-only">Features</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="bg-surface border border-border rounded-xl p-4"
                >
                  <h3 className="text-sm font-semibold mb-1">{f.title}</h3>
                  <p className="text-xs text-muted leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* How It Works */}
          <section aria-labelledby="how-it-works" className="mb-12 text-left">
            <h2
              id="how-it-works"
              className="text-xl font-bold tracking-tight mb-6 text-center"
            >
              How It Works
            </h2>
            <ol className="space-y-4">
              {steps.map((s) => (
                <li
                  key={s.num}
                  className="bg-surface border border-border rounded-xl p-4 flex gap-4"
                >
                  <span className="shrink-0 w-8 h-8 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-bold flex items-center justify-center">
                    {s.num}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold mb-1">{s.title}</h3>
                    <code className="text-xs text-accent block mb-1.5 font-mono">
                      $ {s.command}
                    </code>
                    <p className="text-xs text-muted leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Point Your AI Here */}
          <section
            aria-labelledby="point-ai"
            className="bg-surface border border-accent/20 rounded-xl p-6 mb-12 text-left"
          >
            <h2
              id="point-ai"
              className="text-sm font-semibold mb-3 text-accent"
            >
              Point Your AI Here
            </h2>
            <p className="text-xs text-muted leading-relaxed mb-4">
              Give your AI agent full knowledge of scaffold-agent by having it
              fetch the skill file. Add this to your project rules or tell your
              assistant directly:
            </p>
            <div className="bg-background border border-border rounded-lg px-4 py-3 flex items-center justify-between gap-3 group hover:border-[#333] transition-colors">
              <code className="font-mono text-xs sm:text-sm text-foreground/90 break-all">
                Fetch {SKILL_URL}
              </code>
              <CopyButton text={`Fetch ${SKILL_URL}`} />
            </div>
            <div className="flex gap-4 mt-3">
              <a
                href={SKILL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-accent hover:text-accent/80 transition-colors"
              >
                SKILL.md
              </a>
              <a
                href="/llms.txt"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted hover:text-foreground transition-colors"
              >
                llms.txt
              </a>
              <a
                href="https://ethskills.com/SKILL.md"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted hover:text-foreground transition-colors"
              >
                Ethereum SKILL.md
              </a>
            </div>
          </section>

          {/* FAQ */}
          <section aria-labelledby="faq" className="mb-12 text-left">
            <h2
              id="faq"
              className="text-xl font-bold tracking-tight mb-6 text-center"
            >
              Frequently Asked Questions
            </h2>
            <dl className="space-y-4">
              {faqItems.map((item) => (
                <div
                  key={item.q}
                  className="bg-surface border border-border rounded-xl p-4"
                >
                  <dt className="text-sm font-semibold mb-2">{item.q}</dt>
                  <dd className="text-xs text-muted leading-relaxed">
                    {item.a}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          {/* Nav links */}
          <nav aria-label="External links" className="flex gap-6 justify-center mb-8">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted hover:text-foreground transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </article>
      </AgentViewToggle>

      {/* Semantic footer for crawlers */}
      <footer className="relative z-10 mt-auto pt-8 pb-6 border-t border-border w-full max-w-2xl text-center">
        <p className="text-xs text-muted">
          scaffold-agent is open source under the{" "}
          <a
            href="https://github.com/1clawAI/scaffold-agent/blob/main/LICENSE"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-foreground transition-colors underline underline-offset-2"
          >
            MIT License
          </a>
          . Built by{" "}
          <a
            href="https://1claw.xyz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-foreground transition-colors underline underline-offset-2"
          >
            1Claw
          </a>
          . Inspired by{" "}
          <a
            href="https://scaffoldeth.io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-foreground transition-colors underline underline-offset-2"
          >
            Scaffold-ETH 2
          </a>{" "}
          and the{" "}
          <a
            href="https://buidlguidl.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-foreground transition-colors underline underline-offset-2"
          >
            BuidlGuidl
          </a>
          .
        </p>
      </footer>
    </main>
  );
}
