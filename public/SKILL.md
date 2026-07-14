# scaffold-agent

## Purpose

scaffold-agent is an interactive CLI that scaffolds monorepo projects for building **onchain AI agents**. It generates a full-stack project with smart contracts, a frontend, and agent infrastructure in one command.

**Terminology:** **1claw** = [1claw.xyz](https://1claw.xyz) (vault, Shroud LLM proxy, Intents API). **OpenClaw** ([openclaw.ai](https://openclaw.ai)) is a different product. **@1claw/mcp** = MCP server with 44 tools for vault secrets, Intents API, signing keys, treasury, and execution intents.

## Prerequisites

- **Node.js** and **npm** — for `npx scaffold-agent@latest` and the generated workspace.
- **[just](https://just.systems)** — installed separately (not an npm dependency). Generated repos use a root `justfile` for `just chain`, `just deploy`, `just start`, etc. Without `just`, run the equivalent `npm run` / `npx` scripts from the generated `README.md`.

## Usage

```bash
npx scaffold-agent@latest
npx scaffold-agent@latest my-agent   # creates ./my-agent (skips project name prompt)
scaffold-agent --help                # full flag list; unknown flags error
scaffold-agent --version
```

### CLI Flags

| Flag | Description |
|---|---|
| `--project <name>` | Specify project directory name (or pass as positional arg) |
| `--non-interactive` / `-y` | Run without prompts (defaults: Foundry + Next.js + 1Claw Shroud token billing) |
| `--secrets` | `oneclaw` \| `encrypted` \| `none` |
| `--env-password` | Password for 1Claw or encrypted secrets (min 6 chars, required with `-y` for oneclaw/encrypted) |
| `--defer-oneclaw-api-key` | Defer 1Claw API key entry (useful for CI/automation) |
| `--oneclaw-intents` | Register 1Claw API agent with Intents enabled (with `-y`) |
| `--oneclaw-signing-chains` | Comma-separated chains for HSM signing keys (ethereum, bitcoin, solana, xrp, cardano, tron; default ethereum) |
| `--llm` | `oneclaw` \| `gemini` \| `openai` \| `anthropic` |
| `--shroud-upstream` | `openai` \| `anthropic` \| `google` \| `gemini` \| `mistral` \| `cohere` \| `openrouter` \| `darkbloom` \| `venice` |
| `--shroud-billing` | `token_billing` \| `provider_api_key` |
| `--shroud-provider-api-key` | Required for `provider_api_key` in `-y` |
| `--oneclaw-agent-id` / `--oneclaw-agent-api-key` | For `oneclaw` LLM when secrets are not `oneclaw` |
| `--chain` | `foundry` \| `hardhat` \| `none` |
| `--framework` | `nextjs` \| `vite` \| `python` |
| `--agent` | `generate` \| `none` |
| `--ampersend` | `yes` \| `no` |
| `--swarm <n>` | 1–64 agent wallets with roster and swarm page |
| `--from-config <file>` | Scaffold from a saved configuration file (CLI flags override) |
| `--dump-config` | Output merged configuration JSON without scaffolding |
| `--dump-config-out <file>` | Write config JSON to a file (secrets omitted) |
| `--skip-npm-install` | Skip npm installation |
| `--skip-auto-fund` | Skip auto-funding deployer wallet |

## Scaffold Wizard (7 Steps)

1. **Project name** — alphanumeric, hyphens, underscores
2. **Secrets management** — 1Claw (HSM vault), Encrypted file (AES-256-GCM), or Plain `.env`
3. **Agent identity** — generate Ethereum wallet(s) for the agent (`--swarm` for multiple)
4. **Ampersend SDK** — optional `@ampersend_ai/ampersend-sdk` integration (signing key stored in vault or encrypted env; adds `x402_paid_fetch` tool)
5. **LLM Provider** — 1Claw (Shroud), Gemini, OpenAI, or Anthropic
6. **Chain framework** — Foundry, Hardhat, or None
7. **App framework** — Next.js, Vite, or Python (Google A2A)

## What It Generates

```
project-root/
├── justfile                      # just chain / deploy / start / quickstart / doctor
├── scripts/
│   ├── secrets-crypto.mjs        # encrypt/decrypt .env.secrets.encrypted
│   ├── with-secrets.mjs          # prompt password, run deploy/start with env
│   ├── secret-add.mjs            # just env / enc / vault / reown
│   ├── deploy-foundry.mjs        # or deploy-hardhat.mjs
│   ├── generate-abi-types.mjs    # auto-gen TypeScript from contract ABIs
│   ├── generate-deployer.mjs     # create deployer wallet if missing (+ auto-fund)
│   ├── fund-deployer.mjs         # fund deployer + agents (incl. swarm roster)
│   ├── check-network.mjs         # validate targetNetwork has deployed contracts
│   ├── doctor.mjs                # just doctor — health check
│   └── swarm-agents.mjs          # just swarm — append wallets (Next/Vite)
├── packages/
│   ├── foundry/ (or hardhat/)    # Solidity contracts
│   └── nextjs/ (or vite/ or python/)
│       ├── public/agents.json    # swarm roster (addresses only; Next/Vite)
│       ├── app/
│       │   ├── layout.tsx            # root layout + shared Header nav
│       │   ├── page.tsx              # chat UI with suggested prompts
│       │   ├── identity/page.tsx     # ERC-8004 / Agent0 identity + register
│       │   ├── balances/page.tsx     # deployer + agent balances
│       │   ├── ens/page.tsx          # ENS resolution + registration links
│       │   ├── swarm/page.tsx        # swarm list + local keygen hints
│       │   ├── debug/page.tsx        # deployed contracts (Next only)
│       │   └── api/
│       │       ├── chat/route.ts     # LLM streaming API (Vercel AI SDK)
│       │       └── agent0/lookup/route.ts
│       ├── components/
│       │   ├── Header.tsx            # shared nav (Chat, Balances, ENS, Identity, Swarm, Debug)
│       │   └── ui/                   # shadcn components
│       ├── lib/
│       │   └── agent-onchain-tools.ts  # AI tool definitions for contract interaction
│       ├── contracts/                # auto-generated ABI types
│       └── ...
├── .cursor/mcp.json              # 1Claw MCP for Cursor (when 1Claw is selected)
├── .mcp.json                     # 1Claw MCP for Claude Code (same server config)
├── .env                          # non-sensitive config (gitignored)
├── .env.secrets.encrypted        # AES-256-GCM encrypted keys (if chosen)
├── .gitignore
├── package.json                  # monorepo root (npm workspaces)
└── README.md
```

## How an AI Agent Should Use This Tool

1. **Determine the user's goal** — Ask what kind of onchain AI agent they want to build. Identify the chain, the contract logic, and the agent's purpose.
2. **Run the CLI** — Execute `npx scaffold-agent@latest` in a clean directory. The CLI is interactive and will prompt for each configuration option. Use `-y` for defaults.
3. **Select options** — Choose the appropriate framework, LLM provider, and secret management based on the user's requirements.
4. **Post-scaffold setup** — After generation, the agent should:
   - `cd` into the project directory (npm install runs automatically during scaffolding)
   - Run `just quickstart` for one-command local setup (chain + fund + deploy + start), OR:
   - Run `just chain` to start a local blockchain (second terminal)
   - Run `just fund` to fund the deployer and agent wallets (100 ETH each)
   - Run `just deploy` to deploy contracts and generate ABI types
   - Run `just start` to launch the frontend or agent app
5. **Validate** — Run `just doctor` to health-check the environment, `.env`, 1Claw IDs, and package installs.
6. **Iterate** — Modify the generated agent logic in the `packages/` directory.

## All Just Recipes

| Recipe | Purpose |
|---|---|
| `just chain` | Start local blockchain (Anvil for Foundry, npx hardhat node for Hardhat) |
| `just fund` | Fund DEPLOYER_ADDRESS + AGENT_ADDRESS + swarm addresses (100 ETH each from account #0) |
| `just deploy` | Deploy contracts and generate ABI types (`deployedContracts.ts`) |
| `just start` | Launch frontend or agent dev server (runs `check-network` first as a warning) |
| `just quickstart` | One-command local setup: chain (background) → fund → deploy → start |
| `just doctor` | Health check: validate env, tools, 1Claw IDs, and package installs |
| `just check-network` | Validate `targetNetwork` chainId has contracts in `deployedContracts.ts` |
| `just use-network KEY` | Switch `targetNetwork` in `scaffold.config.ts` and run check (keys: ethereum, base, sepolia, baseSepolia, polygon, bnb, localhost) |
| `just accounts` | Display QR codes for deployer and agent addresses |
| `just balances` | Show native balance across all chains in network-definitions |
| `just generate` | Create deployer wallet (auto-funds if RPC available) |
| `just swarm agents=N` | Add N swarm wallets (`public/agents.json` + `SWARM_AGENT_KEYS_JSON`) |
| `just env KEY VALUE` | Update repo-root `.env` |
| `just enc KEY VALUE` | Update `.env.secrets.encrypted` (prompts for password) |
| `just vault PATH VALUE` | Store secret in 1Claw vault |
| `just list-1claw` | List vault and agent UUIDs from 1Claw |
| `just sync-1claw-env` | Populate `.env` with first vault/agent IDs |
| `just reown PROJECT_ID` | Add WalletConnect Cloud project ID to `.env` |
| `just reset` | Recreate vaults/agents when initial 1Claw setup hits limits (backup `.env` first) |

## Unified Network Model

Generated projects use a single source of truth for the active EVM network:

- **`scaffold.config.ts`** defines `targetNetwork` (e.g. `"localhost"`, `"base"`, `"sepolia"`) and optional `rpcOverrides`.
- **`getActiveNetwork()`** resolves the full `NetworkDefinition` (chainId, RPC, block explorer) with overrides applied.
- **AI agent tools** (`lib/agent-onchain-tools.ts`) default `chainId` and `chain` parameters to the active network.
- **`ONECLAW_CHAIN_NAMES`** maps `chainId` → 1Claw slug for all 29 EVM mainnets + testnets, plus non-EVM chains.

## Agent On-Chain Tools

Next.js and Vite projects include `lib/agent-onchain-tools.ts` — preset Vercel AI SDK tools wired into the chat route:

- **`list_deployed_contracts`** — enumerate addresses from `deployedContracts.ts` (hints active chain).
- **`contract_read`** — call any view/pure function via RPC using the deployed ABI (defaults to active network).
- **`oneclaw_intent_simulate`** — simulate a transaction via 1Claw Intents + Tenderly (when 1Claw SDK is included).
- **`oneclaw_intent_submit`** — submit a signed transaction intent to 1Claw's HSM/TEE (keys never in the model).
- **`oneclaw_intent_sign_only`** — sign a transaction without broadcasting (for MEV protection, Flashbots, custom relayers).
- **`oneclaw_list_signing_keys`** — list the agent's HSM-backed signing keys (address, chain, status).
- **`oneclaw_list_transactions`** — list recent Intents API transactions for this agent.
- **`x402_paid_fetch`** — paid HTTP requests over x402 (when Ampersend is enabled).

The 1Claw intent tools default the `chain` parameter to the active network's 1Claw slug via `ONECLAW_CHAIN_NAMES` — covering all 29 EVM mainnets, testnets, plus non-EVM chains (Bitcoin, Solana, XRP, Cardano, Tron).

## 1Claw MCP Integration

When 1Claw is selected, the scaffold generates `.cursor/mcp.json` (Cursor) and `.mcp.json` (Claude Code) with the **@1claw/mcp** server pre-configured. This gives AI agents access to 44 MCP tools: vault secrets, Intents API (simulate, submit, sign), signing key management, treasury proposals, and execution intents. Only `ONECLAW_AGENT_API_KEY` is required — agent ID and vault are auto-discovered.

## HSM Signing Key Provisioning

When 1Claw Intents is enabled (`--oneclaw-intents`), the CLI provisions HSM signing keys via the 1Claw API for each chain selected. Interactive runs show a multi-select; non-interactive runs use `--oneclaw-signing-chains` (comma-separated: `ethereum`, `bitcoin`, `solana`, `xrp`, `cardano`, `tron`; default `ethereum`). Keys are generated inside the HSM — never exposed. The CLI prints each address with testnet faucet links and dashboard deep links.

## Intents API — Multi-Chain Signing

The 1Claw Intents API supports HSM/TEE transaction signing across:

- **29 EVM mainnets**: Ethereum, Base, Optimism, Arbitrum One, Polygon, Avalanche, BNB, zkSync Era, Linea, Scroll, Mantle, Blast, Gnosis, Fantom, Celo, Aurora, Metis, Moonbeam, Cronos, Sonic, World Chain, Polygon zkEVM, Sei, Kaia, Mode, Arbitrum Nova, Berachain, Taiko, Zora
- **EVM testnets**: Sepolia, Base Sepolia, Holesky, Optimism Sepolia, Arbitrum Sepolia, Polygon Amoy, and more
- **Non-EVM chains**: Bitcoin, Solana, XRP, Cardano, Tron

Per-agent guardrails: allowed chains, recipient allowlists, per-tx value caps, daily spending limits.

## Swarm Mode

`--swarm <n>` (1–64) generates multiple agent wallets:

- First wallet stays `AGENT_ADDRESS` / `AGENT_PRIVATE_KEY`; extras go in encrypted `SWARM_AGENT_KEYS_JSON`.
- Public roster at `packages/*/public/agents.json` (addresses only).
- Generated Next/Vite apps include `lib/agent-swarm.tsx`, a header agent picker, and a `/swarm` page.
- Post-scaffold: `just swarm agents=N` to append more wallets.

## Config File (`agent.json`)

- **`--from-config <file>`** merges JSON into the wizard; CLI flags override the file.
- Shape: `project` / `name`, `swarm`, `agents` (id → preset label), optional `extra` (written to `agent.config.extra.json`), optional `options` with CLI-like keys.
- **`--dump-config`** prints merged JSON (no scaffold). `--dump-config-out <file>` writes to a file. Passwords and API keys are omitted so the file is safe to share.

## LLM Providers

| Choice | Auth / keys | Notes |
|---|---|---|
| **1Claw** (LLM) | `.env`: agent + `SHROUD_LLM_PROVIDER`, `SHROUD_BILLING_MODE` | Shroud proxy; optional `SHROUD_BASE_URL`, `SHROUD_DEFAULT_MODEL`. BYOK + vault: `SHROUD_PROVIDER_VAULT_PATH`; BYOK + no vault: `SHROUD_PROVIDER_API_KEY` |
| **Gemini / OpenAI / Anthropic** + **1Claw secrets** | Vault: `llm-api-key` | Fetched by the app's chat route (not Shroud) |
| **Gemini / OpenAI / Anthropic** + **no 1Claw secrets** | `.env` provider env vars | CLI can prompt to fill `.env` |

### Shroud Upstreams and Default Models

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

### Direct LLM Defaults (not Shroud)

| Provider | Default model | Override |
|---|---|---|
| **Gemini** | `gemini-2.5-flash` | `GOOGLE_GENERATIVE_AI_MODEL` |
| **OpenAI** | `gpt-4o` | Edit the generated chat route |
| **Anthropic** | `claude-sonnet-4-6-20250217` | Edit the generated chat route |

## 1Claw Integration

When you choose 1Claw for secrets:

- Authenticates with `ONECLAW_API_KEY`
- Creates a vault; writes `ONECLAW_VAULT_ID` into `.env`
- Stores deployer private key in vault (not on disk)
- If agent identity is generated, stores it and registers the agent
- If picking 1Claw as LLM, registers a Shroud agent and writes `ONECLAW_AGENT_ID` + `ONECLAW_AGENT_API_KEY`
- If Intents enabled, provisions HSM signing keys for selected chains

**`ONECLAW_AGENT_ID`** is a UUID, not an Ethereum `0x…` address. Chat uses `X-Shroud-Agent-Key`, not `Authorization: Bearer` for Shroud.

## Key Architecture

- Uses `just` as the task runner (https://just.systems)
- Monorepo managed with npm workspaces
- Agent wallet auto-generated and funded on local/test networks
- Smart contract ABIs auto-exported to frontend (Scaffold-ETH 2 pattern via `deployedContracts.ts`)
- Chat routes use the Vercel AI SDK for LLM streaming
- 1Claw Shroud gateway: 9 upstream providers, token billing or BYOK
- @1claw/mcp: 44 MCP tools auto-configured for Cursor and Claude Code
- Intents API: HSM/TEE signing across 29+ EVM chains + Bitcoin, Solana, XRP, Cardano, Tron
- Built on Scaffold-ETH 2, Scaffold UI, RainbowKit, wagmi, and viem
- 1Claw-inspired dark theme (crimson accent, Inter font, sticky glass header)
- Shared Header nav (Chat, Balances, ENS, Identity, Swarm, Debug)
- Suggested prompts on empty chat state
- Burner wallet for local dev via burner-connector

## Key Environment Variables

| Variable | Purpose |
|---|---|
| `RPC_URL` | Blockchain RPC (default: `http://127.0.0.1:8545`) |
| `DEPLOYER_ADDRESS` | Contract deployer wallet |
| `AGENT_ADDRESS` | Agent's Ethereum address |
| `ONECLAW_API_KEY` | 1Claw API key |
| `ONECLAW_VAULT_ID` | 1Claw vault UUID |
| `ONECLAW_AGENT_ID` | 1Claw agent UUID |
| `ONECLAW_AGENT_API_KEY` | 1Claw agent API key (`ocv_…`) |
| `SHROUD_LLM_PROVIDER` | LLM provider for Shroud gateway |
| `SHROUD_BILLING_MODE` | `token_billing` or `provider_api_key` |
| `SHROUD_DEFAULT_MODEL` | Override default model |
| `GOOGLE_GENERATIVE_AI_API_KEY` | Direct Gemini API key |
| `GOOGLE_GENERATIVE_AI_MODEL` | Override Gemini model (default `gemini-2.5-flash`) |

## Ethereum Development Reference

For best practices on building for Ethereum — including Solidity patterns, contract deployment, testing, and frontend integration — agents should also read:

https://ethskills.com/SKILL.md

## Repository

https://github.com/1clawAI/scaffold-agent
