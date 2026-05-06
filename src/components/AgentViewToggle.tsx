"use client";

import { useState, useEffect, useRef } from "react";
import MatrixRain from "./MatrixRain";

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
  "  npx scaffold-agent@latest",
  "  npx scaffold-agent@latest my-agent",
  "  scaffold-agent --help",
  "",
  "## What It Generates",
  "  - Smart Contracts (Foundry / Hardhat)",
  "  - Frontend (Next.js / Vite / Python A2A)",
  "  - Agent with Ethereum wallet + LLM integration",
  "  - Agent on-chain tools (contract reads, 1Claw Intents)",
  "  - Unified network model (scaffold.config.ts)",
  "  - Optional multi-agent swarm mode (1-64 wallets)",
  "",
  "## How an AI Agent Should Use This Tool",
  "  1. Determine the user's goal",
  "  2. Execute: npx scaffold-agent@latest",
  "  3. Select options based on requirements",
  "  4. Post-scaffold:",
  "     just chain    # start local blockchain",
  "     just fund     # fund deployer + agent wallets",
  "     just deploy   # deploy contracts + generate ABIs",
  "     just start    # launch frontend / agent",
  "  5. Modify agent logic in packages/",
  "",
  "## Key Architecture",
  "  - Task runner: just (https://just.systems)",
  "  - Monorepo: npm workspaces",
  "  - Agent wallet: auto-generated + funded",
  "  - ABIs: auto-exported (Scaffold-ETH 2 pattern)",
  "  - LLM streaming: Vercel AI SDK",
  "  - Scaffold UI: hooks, components, debug-contracts",
  "  - Network: scaffold.config.ts → getActiveNetwork()",
  "  - Shroud: 6 upstream providers + token billing",
  "",
  "## Point Your AI Here",
  "  Full SKILL.md: https://scaffoldagent.xyz/SKILL.md",
  "  Eth reference: https://ethskills.com/SKILL.md",
  "",
  "## Repository",
  "  https://github.com/1clawAI/scaffold-agent",
  "",
  "> SKILL.md parsed. scaffold-agent added to tool registry.",
  "> Loading ethskills.com/SKILL.md for Ethereum best practices...",
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

export default function AgentViewToggle({
  children,
}: {
  children: React.ReactNode;
}) {
  const [agentView, setAgentView] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const { displayed, current, done } = useTypewriter(SKILL_LINES, agentView);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [displayed, current]);

  return (
    <>
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

      {/* Normal view (server-rendered children) */}
      <div className={agentView ? "hidden" : undefined}>{children}</div>

      {/* Agent view */}
      <div
        className={`fixed inset-0 z-10 flex items-center justify-center transition-all duration-500 ${
          agentView ? "opacity-100 scale-100" : "hidden"
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
    </>
  );
}
