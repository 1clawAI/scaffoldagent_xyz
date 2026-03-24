"use client";

import { useState, useEffect, useRef } from "react";
import MatrixRain from "@/components/MatrixRain";

const COMMAND = "npx scaffold-agent";

const SKILL_LINES = [
  "$ curl -s https://scaffoldagent.xyz/SKILL.md",
  "",
  "# scaffold-agent",
  "",
  "## Purpose",
  "scaffold-agent is an interactive CLI that scaffolds monorepo",
  "projects for building **onchain AI agents**.",
  "",
  "## Usage",
  "  npx scaffold-agent",
  "  npx scaffold-agent my-agent",
  "",
  "## What It Generates",
  "  - Smart Contracts (Foundry / Hardhat)",
  "  - Frontend (Next.js / Vite / Python A2A)",
  "  - Agent with Ethereum wallet + LLM integration",
  "",
  "## How an AI Agent Should Use This Tool",
  "  1. Determine the user's goal",
  "  2. Execute: npx scaffold-agent",
  "  3. Select options based on requirements",
  "  4. Post-scaffold:",
  "     just install",
  "     just chain",
  "     just deploy",
  "     just dev",
  "  5. Modify agent logic in packages/agent/",
  "",
  "## Key Architecture",
  "  - Task runner: just",
  "  - Monorepo: npm workspaces",
  "  - Agent wallet: auto-generated + funded",
  "  - ABIs: auto-exported to frontend + agent",
  "  - Inspired by Scaffold-ETH 2",
  "",
  "## Repository",
  "  https://github.com/1clawAI/scaffold-agent",
  "",
  "> SKILL.md parsed. scaffold-agent added to tool registry.",
  "> Ready to build onchain AI agents._",
];

function useTypewriter(lines: string[], active: boolean) {
  const [displayed, setDisplayed] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!active) {
      setDisplayed([]);
      setCurrentLine(0);
      setCurrentChar(0);
      setDone(false);
      return;
    }

    if (currentLine >= lines.length) {
      setDone(true);
      return;
    }

    const line = lines[currentLine];

    if (line === "") {
      const timeout = setTimeout(() => {
        setDisplayed((prev) => [...prev, ""]);
        setCurrentLine((l) => l + 1);
        setCurrentChar(0);
      }, 30);
      return () => clearTimeout(timeout);
    }

    if (currentChar < line.length) {
      const speed = currentLine === 0 ? 15 : 8 + Math.random() * 12;
      const timeout = setTimeout(() => {
        setCurrentChar((c) => c + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setDisplayed((prev) => [...prev, line]);
        setCurrentLine((l) => l + 1);
        setCurrentChar(0);
      }, 20);
      return () => clearTimeout(timeout);
    }
  }, [active, currentLine, currentChar, lines]);

  const current =
    active && currentLine < lines.length
      ? lines[currentLine].slice(0, currentChar)
      : null;

  return { displayed, current, done };
}

export default function Home() {
  const [agentView, setAgentView] = useState(false);
  const [copied, setCopied] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const { displayed, current, done } = useTypewriter(SKILL_LINES, agentView);

  const copy = () => {
    navigator.clipboard.writeText(COMMAND);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [displayed, current]);

  return (
    <main className={`relative h-screen flex flex-col items-center px-6 ${agentView ? "justify-start pt-4 overflow-hidden" : "justify-center py-16 overflow-auto"}`}>
      {agentView && <MatrixRain />}

      {/* Agent View Toggle */}
      <button
        onClick={() => setAgentView(!agentView)}
        className={`fixed top-5 right-5 z-50 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-all duration-300 cursor-pointer ${
          agentView
            ? "bg-accent/20 border-accent/40 text-accent shadow-[0_0_20px_rgba(34,197,94,0.3)]"
            : "bg-surface border-border text-muted hover:text-foreground hover:border-[#444]"
        }`}
      >
        <span className="relative flex h-2 w-2">
          {agentView && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
          )}
          <span
            className={`relative inline-flex rounded-full h-2 w-2 ${
              agentView ? "bg-accent" : "bg-muted"
            }`}
          />
        </span>
        {agentView ? "Agent View" : "View as AI Agent"}
      </button>

      {/* Normal view */}
      <div
        className={`relative z-10 max-w-2xl w-full text-center transition-all duration-500 ${
          agentView ? "hidden" : "opacity-100 scale-100"
        }`}
      >
        <div className="inline-block text-xs font-semibold tracking-widest uppercase text-accent bg-accent-dim border border-accent/20 px-3.5 py-1.5 rounded-full mb-6">
          Open Source CLI
        </div>

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
          <button
            onClick={copy}
            aria-label="Copy command"
            className="shrink-0 p-2 rounded-lg border border-border text-muted hover:text-foreground hover:border-[#444] hover:bg-white/[0.03] transition-all cursor-pointer"
          >
            {copied ? (
              <svg
                className="w-[18px] h-[18px] text-accent"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 12.75 6 6 9-13.5"
                />
              </svg>
            ) : (
              <svg
                className="w-[18px] h-[18px]"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3a2.25 2.25 0 0 0-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9.75a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left mb-10">
          {[
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
          ].map((f) => (
            <div
              key={f.title}
              className="bg-surface border border-border rounded-xl p-4"
            >
              <div className="text-sm font-semibold mb-1">{f.title}</div>
              <div className="text-xs text-muted leading-relaxed">
                {f.desc}
              </div>
            </div>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-6 justify-center">
          {[
            {
              label: "GitHub",
              href: "https://github.com/1clawAI/scaffold-agent",
            },
            {
              label: "Docs",
              href: "https://github.com/1clawAI/scaffold-agent#readme",
            },
            { label: "1Claw", href: "https://1claw.xyz" },
          ].map((l) => (
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
        </div>
      </div>

      {/* Agent view */}
      <div
        className={`fixed inset-0 z-10 flex items-center justify-center transition-all duration-500 ${
          agentView
            ? "opacity-100 scale-100"
            : "hidden"
        }`}
      >
        <div className="w-[720px] h-[560px] flex flex-col bg-black/80 backdrop-blur-sm border border-accent/30 rounded-xl overflow-hidden shadow-[0_0_40px_rgba(34,197,94,0.15)]">
          {/* Terminal chrome */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-accent/20 bg-black/50">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <span className="text-xs text-accent/60 font-mono ml-2">
              agent@scaffold ~ reading SKILL.md
            </span>
          </div>

          {/* Terminal body */}
          <div
            ref={terminalRef}
            className="p-5 font-mono text-sm leading-relaxed flex-1 overflow-y-auto"
          >
            {displayed.map((line, i) => (
              <div key={i} className="min-h-[1.5em]">
                <TerminalLine line={line} />
              </div>
            ))}
            {current !== null && (
              <div className="min-h-[1.5em]">
                <TerminalLine line={current} />
                <span className="inline-block w-2 h-4 bg-accent ml-0.5 animate-pulse" />
              </div>
            )}
            {done && (
              <div className="mt-4 pt-4 border-t border-accent/20 text-accent/80 text-xs">
                [ SKILL.md successfully loaded into agent context ]
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

function TerminalLine({ line }: { line: string }) {
  if (line.startsWith("$")) {
    return (
      <>
        <span className="text-accent">$</span>
        <span className="text-foreground">{line.slice(1)}</span>
      </>
    );
  }
  if (line.startsWith("#")) {
    return <span className="text-accent font-bold">{line}</span>;
  }
  if (line.startsWith(">")) {
    return <span className="text-accent/90">{line}</span>;
  }
  if (
    line.startsWith("  -") ||
    line.startsWith("  1") ||
    line.startsWith("  2") ||
    line.startsWith("  3") ||
    line.startsWith("  4") ||
    line.startsWith("  5")
  ) {
    return <span className="text-foreground/70">{line}</span>;
  }
  if (line.includes("just ")) {
    const parts = line.split(/(just \w+)/);
    return (
      <span className="text-foreground/70">
        {parts.map((part, i) =>
          part.startsWith("just ") ? (
            <span key={i} className="text-accent">
              {part}
            </span>
          ) : (
            part
          )
        )}
      </span>
    );
  }
  if (line.includes("npx scaffold-agent")) {
    const parts = line.split(/(npx scaffold-agent\S*)/);
    return (
      <span className="text-foreground/70">
        {parts.map((part, i) =>
          part.startsWith("npx") ? (
            <span key={i} className="text-accent">
              {part}
            </span>
          ) : (
            part
          )
        )}
      </span>
    );
  }
  return <span className="text-foreground/60">{line}</span>;
}
