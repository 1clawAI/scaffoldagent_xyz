import AgentViewToggle from "@/components/AgentViewToggle";
import CopyButton from "@/components/CopyButton";

const COMMAND = "npx scaffold-agent";

const features = [
  {
    title: "Smart Contracts",
    desc: "Foundry or Hardhat with auto-deploy and ABI generation.",
  },
  {
    title: "Frontend Ready",
    desc: "Next.js, Vite, or Python with WalletConnect built in.",
  },
  {
    title: "LLM Providers",
    desc: "Plug in OpenAI, Anthropic, Gemini, or 1Claw.",
  },
  {
    title: "Secure by Default",
    desc: "HSM-backed vault, encrypted secrets, and wallet generation.",
  },
];

const links = [
  { label: "GitHub", href: "https://github.com/1clawAI/scaffold-agent" },
  { label: "Docs", href: "https://github.com/1clawAI/scaffold-agent#readme" },
  { label: "1Claw", href: "https://1claw.xyz" },
];

export default function Home() {
  return (
    <main className="relative h-screen flex flex-col items-center justify-center px-6 py-16 overflow-auto">
      <AgentViewToggle>
        <article className="relative z-10 max-w-2xl w-full text-center">
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
          <div className="bg-surface border border-border rounded-xl px-5 py-4 flex items-center justify-between gap-4 mb-10 group hover:border-[#333] transition-colors">
            <code className="font-mono text-base sm:text-lg">
              <span className="text-accent select-none">$&nbsp;</span>
              {COMMAND}
            </code>
            <CopyButton text={COMMAND} />
          </div>

          {/* Features */}
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left mb-10">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-surface border border-border rounded-xl p-4"
              >
                <h2 className="text-sm font-semibold mb-1">{f.title}</h2>
                <p className="text-xs text-muted leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </section>

          {/* Links */}
          <nav className="flex gap-6 justify-center">
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
    </main>
  );
}
