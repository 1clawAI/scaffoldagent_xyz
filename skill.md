---
name: scaffold-agent
description: >-
  How to use the scaffold-agent npm CLI to generate onchain AI agent monorepos
  (Foundry/Hardhat + Next.js/Vite/Python): npx invocation, -y flags, agent.json,
  swarm, 1Claw/Shroud, Intents API, @1claw/mcp, just commands, and security.
  Upstream source lives at https://github.com/1clawAI/scaffold-agent.
---

# scaffold-agent — AI / agent instructions

This file documents the **`scaffold-agent`** CLI published on npm ([scaffold-agent](https://www.npmjs.com/package/scaffold-agent)). The CLI **generates** new project directories; this repo (scaffoldagent.xyz) is the **documentation website**, not the CLI source tree.

**Upstream reference:** [https://github.com/1clawAI/scaffold-agent](https://github.com/1clawAI/scaffold-agent) — authoritative files there are `AGENTS.md`, `README.md`, and `.cursor/skills/scaffold-agent/`.

---

## What it does

- Interactive (or fully flagged) CLI that scaffolds a **monorepo**: Solidity (**Foundry** or **Hardhat** or none) + app (**Next.js**, **Vite**, or **Python** A2A).
- Optional **1Claw** vault/secrets, **Shroud** LLM proxy (9 upstreams), **Ampersend** SDK, **Intents API** (multi-chain HSM signing), **@1claw/mcp** (44 tools), multiple **swarm** agent wallets.
- Generated apps follow patterns from [Scaffold-ETH 2](https://github.com/scaffold-eth/scaffold-eth-2) (wagmi, ABIs, `/debug` on Next, etc.) using [Scaffold UI](https://github.com/scaffold-eth/scaffold-ui) packages (`@scaffold-ui/hooks`, `@scaffold-ui/components`, `@scaffold-ui/debug-contracts`).

**Terminology:** **1claw** = [1claw.xyz](https://1claw.xyz) (vault, Shroud, Intents API). **OpenClaw** ([openclaw.ai](https://openclaw.ai)) is a different product. **@1claw/mcp** = MCP server with 44 tools for vault secrets, Intents API, signing keys, treasury, and execution intents.

---

## Prerequisites

- **Node.js** ≥ 18 and **npm** (for `npx scaffold-agent` and the generated workspace).
- **[just](https://just.systems)** installed on the host (not an npm dependency). Generated repos use a root `justfile` for `just chain`, `just deploy`, `just start`, etc. Without `just`, run the equivalent `npm run` scripts from the generated `README.md`.

---

## Invoke the CLI

```bash
npx scaffold-agent@latest
npx scaffold-agent@latest my-agent    # creates ./my-agent, skips name prompt
scaffold-agent --help                 # full flag list; unknown flags error
scaffold-agent --version
```

---

## Typical flow (generated repo, local chain)

Order matters: the local node must be up before auto-fund / deploy.

1. Scaffold: `npx scaffold-agent@latest my-agent` → `cd my-agent`
2. **Quickstart (one command):** `just quickstart` — starts chain (background), funds wallets, deploys contracts, launches app.
3. **Or step-by-step:** `just chain` → `just fund` → `just deploy` → `just start`
4. **Validate:** `just doctor` — health check for env, tools, 1Claw IDs, and package installs.

Skip chain steps if you chose **no chain**; configure RPC / `scaffold.config.ts` per generated README.

**Env skips:** `SCAFFOLD_SKIP_NPM_INSTALL=1` or `--skip-npm-install`; `SCAFFOLD_SKIP_AUTO_FUND=1` or `--skip-auto-fund` when scaffolding.

---

## Non-interactive / automation (`-y`)

Use `-y` / `--non-interactive` for CI or agents (no prompts).

- `--env-password` (≥ 6 characters) is **required** when `--secrets` is `oneclaw` or `encrypted`, unless `--secrets none`.
- `--defer-oneclaw-api-key` — skip `ONECLAW_API_KEY` at scaffold time.
- `--oneclaw-intents` — register 1Claw agent with Intents enabled.
- `--oneclaw-signing-chains` — comma-separated chains for HSM key provisioning (ethereum, bitcoin, solana, xrp, cardano, tron; default ethereum).
- Defaults under `-y` match `scaffold-agent --help` (e.g. Foundry + Next.js + 1Claw Shroud + token billing).

**Shroud + `-y` validation:**

- `--llm oneclaw` with `--secrets none` (or non-oneclaw): supply `--oneclaw-agent-id` and `--oneclaw-agent-api-key`.
- `--shroud-billing provider_api_key`: supply `--shroud-provider-api-key` (vault vs `.env` depends on `--secrets`).

---

## CLI flags (common)

Strict parsing: unknown options **error**. Full list: `scaffold-agent --help`.

| Flag | Notes |
|------|--------|
| `-y` / `--non-interactive` | No prompts |
| `--project <name>` | Or single positional directory name |
| `--secrets` | `oneclaw` \| `encrypted` \| `none` |
| `--env-password` | Required for `oneclaw` / `encrypted` with `-y` (min 6 chars) |
| `--defer-oneclaw-api-key` | Skip user API key at scaffold |
| `--oneclaw-intents` | Register 1Claw agent with Intents enabled (with `-y`) |
| `--oneclaw-signing-chains` | Comma-separated: ethereum, bitcoin, solana, xrp, cardano, tron |
| `--llm` | `oneclaw` \| `gemini` \| `openai` \| `anthropic` |
| `--shroud-upstream` | `openai` \| `anthropic` \| `google` \| `gemini` \| `mistral` \| `cohere` \| `openrouter` \| `darkbloom` \| `venice` |
| `--shroud-billing` | `token_billing` \| `provider_api_key` |
| `--shroud-provider-api-key` | Required for `provider_api_key` in `-y` |
| `--oneclaw-agent-id` / `--oneclaw-agent-api-key` | For `oneclaw` LLM when secrets are not `oneclaw` |
| `--chain` | `foundry` \| `hardhat` \| `none` |
| `--framework` | `nextjs` \| `vite` \| `python` |
| `--agent` | `generate` \| `none` |
| `--ampersend` | `yes` \| `no` |
| `--ampersend-signing-key` | Ampersend signing key (vault or encrypted `.env`) |
| `--ampersend-smart-account` | Ampersend smart account address |
| `--graph` | `none` \| `mcp` \| `x402` \| `both` — The Graph subgraph integration |
| `--graph-api-key` | Optional Graph API key (vault path `api-keys/thegraph`) |
| `--llm-api-key` | Direct provider API key (non-Shroud LLM) |
| `--skip-npm-install` | |
| `--skip-auto-fund` | |
| `--swarm <n>` | 1–64 agent wallets; extras in `SWARM_AGENT_KEYS_JSON` |
| `--from-config <file>` | Merge `agent.json`; **CLI overrides file** |
| `--dump-config` | Print merged config JSON to stdout (secrets omitted) |
| `--dump-config-out <file>` | Write that JSON to a file |

---

## `agent.json` (`--from-config` / `--dump-config`)

- Merge with `--from-config <file>`; any flag passed on the CLI **wins** over the file.
- Shape: `project` or `name`, `swarm`, `agents`: `{ "my-agent-id": "preset-label" }`, optional `extra` (written to generated `agent.config.extra.json`), optional `options`: `{ "secrets": "encrypted", … }`.
- Top-level keys may mirror CLI long-option names.

`--dump-config` prints merged JSON (no scaffold). `--dump-config-out` writes the same; **passwords and API keys are omitted** so the file is safe to share.

---

## Swarm (`--swarm`)

- `--swarm <n>` (1–64): multiple generated agent wallets; first remains `AGENT_ADDRESS` / `AGENT_PRIVATE_KEY`; extras in encrypted `SWARM_AGENT_KEYS_JSON`.
- Public roster: `packages/*/public/agents.json` (addresses only).
- Next/Vite: `lib/agent-swarm.tsx`, header picker, `/swarm` page; balances/identity follow selected agent.
- Post-scaffold: `just swarm agents=N` (see generated `justfile`).

---

## Unified network model

`scaffold.config.ts` → `targetNetwork` is the single source of truth for the active EVM network across UI, API routes, and AI agent tools.

- `getActiveNetwork()` resolves `targetNetwork` to a `NetworkDefinition` with `rpcOverrides` applied.
- Agent on-chain tools default `chainId` and `chain` parameters to `getActiveNetwork()`.
- `ONECLAW_CHAIN_NAMES` maps `chainId` → 1Claw slug for all 29 EVM mainnets + testnets + non-EVM chains.

---

## Agent on-chain tools (generated repos)

`lib/agent-onchain-tools.ts` — Vercel AI SDK `tool`s in the chat route:

**Always included:** `list_project_addresses`, `get_wallet_balance`, `resolve_ens`, `lookup_erc8004_agents`, `list_deployed_contracts`, `contract_read`.

**When 1Claw SDK is included:** `oneclaw_check_signing_balances`, `oneclaw_intent_simulate`, `oneclaw_intent_submit`, `oneclaw_intent_sign_only`, `oneclaw_list_signing_keys`, `oneclaw_list_transactions`.

**When Ampersend is enabled:** `x402_paid_fetch`.

**When The Graph is enabled (`--graph x402` or `both`):** `graph_search_subgraphs`, `graph_subgraph_query` (+ `/data` page, `lib/graph-client.ts`, optional `@graphprotocol/subgraph-mcp` in MCP config when `mcp` or `both`).

---

## The Graph integration (`--graph`)

| Mode | What it adds |
|---|---|
| `none` | No Graph integration (default under `-y`) |
| `mcp` | `@graphprotocol/subgraph-mcp` in `.cursor/mcp.json` / `.mcp.json` |
| `x402` | Runtime agent tools + `/data` page + `lib/graph-client.ts` |
| `both` | MCP for IDE + x402 agent tools at runtime |

Optional `--graph-api-key` or vault `api-keys/thegraph` (`GRAPH_API_KEY`). Substreams subgraphs may require x402 USDC per query.

---

## @1claw/mcp (generated repos)

When 1Claw is selected, the scaffold generates `.cursor/mcp.json` (Cursor) and `.mcp.json` (Claude Code) with @1claw/mcp pre-configured. 44 MCP tools: vault secrets, Intents API (simulate, submit, sign), signing key management, treasury proposals, and execution intents. Only `ONECLAW_AGENT_API_KEY` is required.

---

## 1Claw Intents API — multi-chain signing

HSM/TEE transaction signing across:
- **29 EVM mainnets**: Ethereum, Base, Optimism, Arbitrum, Polygon, Avalanche, BNB, zkSync Era, Linea, Scroll, Mantle, Blast, Gnosis, Fantom, Celo, Aurora, Metis, Moonbeam, Cronos, Sonic, World Chain, Polygon zkEVM, Sei, Kaia, Mode, Arbitrum Nova, Berachain, Taiko, Zora
- **EVM testnets**: Sepolia, Base Sepolia, Holesky, Optimism Sepolia, Arbitrum Sepolia, Polygon Amoy, and more
- **Non-EVM chains**: Bitcoin, Solana, XRP, Cardano, Tron

Per-agent guardrails: allowed chains, recipient allowlists, per-tx value caps, daily spending limits.

HSM signing key provisioning via `--oneclaw-signing-chains` (interactive multi-select or comma-separated with `-y`).

---

## Generated layout (high level)

After scaffold, expect roughly:

- Root `justfile`, `package.json` (workspaces), `README.md`, `.env` (gitignored), optional `.env.secrets.encrypted`
- `.cursor/mcp.json`, `.mcp.json` — 1Claw MCP config (when 1Claw is selected)
- `scripts/` — `fund-deployer.mjs`, `swarm-agents.mjs`, `with-secrets.mjs`, `check-network.mjs`, `doctor.mjs`, deploy scripts, etc.
- `packages/foundry` or `packages/hardhat` (if chain chosen)
- `packages/nextjs` or `packages/vite` or `packages/python` — chat UI, `/api/chat`, identity/ENS/balances/swarm/debug routes, shared Header nav

---

## `just` commands (generated repo)

| Command | Description |
|---------|-------------|
| `just chain` | Local blockchain |
| `just fund` | Fund deployer + agent (+ swarm from `public/agents.json`) |
| `just deploy` | Deploy + ABI generation |
| `just start` | Dev server / agent (runs `check-network` precheck) |
| `just quickstart` | One-command: chain (background) → fund → deploy → start |
| `just doctor` | Health check: env, tools, 1Claw IDs, packages |
| `just check-network` | Validate `targetNetwork` chainId in `deployedContracts.ts` |
| `just use-network KEY` | Switch `targetNetwork` and run check (ethereum, base, sepolia, baseSepolia, polygon, bnb, localhost) |
| `just accounts` | QR for deployer + agent |
| `just balances` | Balances across configured chains |
| `just generate` | Deployer wallet (+ auto-fund if RPC up) |
| `just swarm agents=N` | Append swarm wallets |
| `just env KEY VALUE` | Upsert `.env` |
| `just enc KEY VALUE` | Update encrypted secrets (password prompt) |
| `just vault PATH VALUE` | 1Claw vault secret |
| `just list-1claw` | List vault and agent UUIDs |
| `just sync-1claw-env` | Write first vault + agent UUIDs to `.env` |
| `just reown PROJECT_ID` | WalletConnect project id → env |
| `just reset` | Re-bootstrap 1Claw vault + agent (**backup `.env` first**) |

---

## LLM providers and models

### Shroud upstreams

| `SHROUD_LLM_PROVIDER` | Default `SHROUD_DEFAULT_MODEL` |
|---|---|
| `openai` | `gpt-4o` |
| `anthropic` | `claude-sonnet-4-6-20250217` |
| `google` or `gemini` | `gemini-2.5-flash` |
| `mistral` | `mistral-large-latest` |
| `cohere` | `command-a-03-2025` |
| `openrouter` | `openai/gpt-4o` |
| `darkbloom` | `gpt-4o` (E2E encrypted Apple Silicon TEE) |
| `venice` | `llama-3.3-70b` (zero-retention + optional TEE/E2EE) |

### Direct LLM defaults (not Shroud)

| Provider | Default model | Override |
|---|---|---|
| Gemini | `gemini-2.5-flash` | `GOOGLE_GENERATIVE_AI_MODEL` |
| OpenAI | `gpt-4o` | Edit the generated chat route |
| Anthropic | `claude-sonnet-4-6-20250217` | Edit the generated chat route |

---

## 1Claw / Shroud (essentials)

- `ONECLAW_AGENT_ID` is a **UUID**, not an Ethereum `0x…` address.
- Shroud docs: [Shroud guide](https://docs.1claw.xyz/docs/guides/shroud). Chat uses `X-Shroud-Agent-Key`, not `Authorization: Bearer` for Shroud.
- `SHROUD_BILLING_MODE`: `token_billing` (1Claw billing) vs `provider_api_key` (BYOK in vault or `SHROUD_PROVIDER_API_KEY`).

---

## Security

- Never commit real keys, agent API keys, or deployer private keys.
- Do not put Ethereum addresses in `ONECLAW_AGENT_ID`.
- Prefer `--dump-config` for shareable config; secrets are stripped.

---

## Links

- npm: [https://www.npmjs.com/package/scaffold-agent](https://www.npmjs.com/package/scaffold-agent)
- GitHub: [https://github.com/1clawAI/scaffold-agent](https://github.com/1clawAI/scaffold-agent)
- Shroud: [https://docs.1claw.xyz/docs/guides/shroud](https://docs.1claw.xyz/docs/guides/shroud)
- Intents: [https://1claw.xyz/intents](https://1claw.xyz/intents)
- @1claw/mcp: [https://www.npmjs.com/package/@1claw/mcp](https://www.npmjs.com/package/@1claw/mcp)
- SKILL.md (for AI agents): [https://scaffoldagent.xyz/SKILL.md](https://scaffoldagent.xyz/SKILL.md)

---

*Synthesized from upstream (SKILL.md, reference.md, README.md, AGENTS.md). If behavior diverges, trust `scaffold-agent --help` and the upstream repo.*
