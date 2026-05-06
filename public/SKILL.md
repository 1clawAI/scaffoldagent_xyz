# scaffold-agent

## Purpose

scaffold-agent is an interactive CLI that scaffolds monorepo projects for building **onchain AI agents**. It generates a full-stack project with smart contracts, a frontend, and agent infrastructure in one command.

**Terminology:** **1claw** = [1claw.xyz](https://1claw.xyz) (vault, Shroud LLM proxy). **OpenClaw** ([openclaw.ai](https://openclaw.ai)) is a different product.

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
| `--llm` | `oneclaw` \| `gemini` \| `openai` \| `anthropic` |
| `--shroud-upstream` | `openai` \| `anthropic` \| `google` \| `gemini` \| `mistral` \| `cohere` \| `openrouter` |
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
4. **Ampersend SDK** — optional `@ampersend_ai/ampersend-sdk` integration
5. **LLM Provider** — 1Claw (Shroud), Gemini, OpenAI, or Anthropic
6. **Chain framework** — Foundry, Hardhat, or None
7. **App framework** — Next.js, Vite, or Python (Google A2A)

## What It Generates

```
project-root/
├── justfile                      # just chain / deploy / start / generate
├── scripts/
│   ├── secrets-crypto.mjs        # encrypt/decrypt .env.secrets.encrypted
│   ├── with-secrets.mjs          # prompt password, run deploy/start with env
│   ├── secret-add.mjs            # just env / enc / vault / reown
│   ├── deploy-foundry.mjs        # or deploy-hardhat.mjs
│   ├── generate-abi-types.mjs    # auto-gen TypeScript from contract ABIs
│   ├── generate-deployer.mjs     # create deployer wallet if missing (+ auto-fund)
│   ├── fund-deployer.mjs         # fund deployer + agents (incl. swarm roster)
│   ├── check-network.mjs         # validate targetNetwork has deployed contracts
│   └── swarm-agents.mjs          # just swarm — append wallets (Next/Vite)
├── packages/
│   ├── foundry/ (or hardhat/)    # Solidity contracts
│   └── nextjs/ (or vite/ or python/)
│       ├── public/agents.json    # swarm roster (addresses only; Next/Vite)
│       ├── app/
│       │   ├── page.tsx              # shadcn chat UI
│       │   ├── identity/page.tsx     # ERC-8004 / Agent0 identity + register
│       │   ├── swarm/page.tsx        # swarm list + local keygen hints
│       │   ├── debug/page.tsx        # deployed contracts (Next only)
│       │   └── api/
│       │       ├── chat/route.ts     # LLM streaming API (Vercel AI SDK)
│       │       └── agent0/lookup/route.ts
│       ├── lib/
│       │   └── agent-onchain-tools.ts  # AI tool definitions for contract interaction
│       ├── components/ui/            # shadcn components
│       └── contracts/                # auto-generated ABI types
├── .env                              # non-sensitive config (gitignored)
├── .env.secrets.encrypted            # AES-256-GCM encrypted keys (if chosen)
├── .gitignore
├── package.json                      # monorepo root (npm workspaces)
└── README.md
```

## How an AI Agent Should Use This Tool

1. **Determine the user's goal** — Ask what kind of onchain AI agent they want to build. Identify the chain, the contract logic, and the agent's purpose.
2. **Run the CLI** — Execute `npx scaffold-agent@latest` in a clean directory. The CLI is interactive and will prompt for each configuration option. Use `-y` for defaults.
3. **Select options** — Choose the appropriate framework, LLM provider, and secret management based on the user's requirements.
4. **Post-scaffold setup** — After generation, the agent should:
   - `cd` into the project directory (npm install runs automatically during scaffolding)
   - Run `just chain` to start a local blockchain (second terminal)
   - Run `just fund` to fund the deployer and agent wallets (100 ETH each)
   - Run `just deploy` to deploy contracts and generate ABI types
   - Run `just start` to launch the frontend or agent app
5. **Iterate** — Modify the generated agent logic in the `packages/` directory. The agent has an Ethereum wallet and can sign transactions, read contract state, and call LLM APIs.

**Order matters:** the local node (`just chain`) must be up before `just fund` / `just deploy`. Most people run `just chain` first, then scaffold in another terminal — or run `just fund` after `cd` into the project.

## All Just Recipes

| Recipe | Purpose |
|---|---|
| `just chain` | Start local blockchain (Anvil for Foundry, npx hardhat node for Hardhat) |
| `just fund` | Fund DEPLOYER_ADDRESS + AGENT_ADDRESS + swarm addresses in `public/agents.json` (100 ETH each from account #0) |
| `just deploy` | Deploy contracts and generate ABI types (`deployedContracts.ts`) |
| `just start` | Launch frontend or agent dev server (runs `check-network` first as a warning) |
| `just check-network` | Validate `targetNetwork` chainId has contracts in `deployedContracts.ts` |
| `just use-network KEY` | Switch `targetNetwork` in `scaffold.config.ts` and run check (keys: ethereum, base, sepolia, baseSepolia, polygon, bnb, localhost) |
| `just accounts` | Display QR codes for deployer and agent addresses |
| `just balances` | Show native balance across all chains in network-definitions (deployer + agent; rpcOverrides) |
| `just generate` | Create deployer wallet (auto-funds if RPC available) |
| `just swarm agents=N` | Add N swarm wallets (`public/agents.json` + `SWARM_AGENT_KEYS_JSON`; Next/Vite; default `agents=1`) |
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
- **AI agent tools** (`lib/agent-onchain-tools.ts`) default `chainId` and `chain` parameters to the active network — the model doesn't need to guess.
- **`just check-network`** validates that `deployedContracts.ts` has entries for `targetNetwork`'s chainId.
- **`just use-network <key>`** rewrites `targetNetwork` and runs the check in one step.
- **`just start`** runs `check-network` as a precheck (warns if contracts are missing, but doesn't block the dev server).

## Agent On-Chain Tools

Next.js and Vite projects include `lib/agent-onchain-tools.ts` — preset Vercel AI SDK tools wired into the chat route:

- **`list_deployed_contracts`** — enumerate addresses from `deployedContracts.ts` (hints active chain).
- **`contract_read`** — call any view/pure function via RPC using the deployed ABI (defaults to active network).
- **`oneclaw_intent_simulate`** — simulate a transaction via 1Claw Intents + Tenderly (when 1Claw SDK is included).
- **`oneclaw_intent_submit`** — submit a signed transaction intent to 1Claw's TEE (keys never in the model).

The 1Claw intent tools default the `chain` parameter to the active network's 1Claw slug via a built-in `ONECLAW_CHAIN_NAMES` mapping.

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
| `anthropic` | `claude-sonnet-4-20250514` |
| `google` or `gemini` | `gemini-2.0-flash` |
| `mistral` | `mistral-large-latest` |
| `cohere` | `command-r-plus` |
| `openrouter` | `openai/gpt-4o` |

### Direct LLM Defaults (not Shroud)

| Provider | Default model | Override |
|---|---|---|
| **Gemini** | `gemini-2.5-flash` | `GOOGLE_GENERATIVE_AI_MODEL` |
| **OpenAI** | `gpt-4o` | Edit the generated chat route |
| **Anthropic** | `claude-sonnet-4-20250514` | Edit the generated chat route |

## 1Claw Integration

When you choose 1Claw for secrets:

- Authenticates with `ONECLAW_API_KEY`
- Creates a vault; writes `ONECLAW_VAULT_ID` into `.env`
- Stores deployer private key in vault (not on disk)
- If agent identity is generated, stores it and registers the agent
- If picking 1Claw as LLM, registers a Shroud agent and writes `ONECLAW_AGENT_ID` + `ONECLAW_AGENT_API_KEY`

**`ONECLAW_AGENT_ID`** is a UUID, not an Ethereum `0x…` address. Chat uses `X-Shroud-Agent-Key`, not `Authorization: Bearer` for Shroud.

### 1Claw IDs Programmatically

With your `ONECLAW_API_KEY` you can call the same REST API the CLI uses:

- `POST /v1/auth/api-key-token` → Bearer token
- `GET /v1/vaults` → vault UUIDs (`ONECLAW_VAULT_ID`)
- `GET /v1/agents` → agent UUIDs (`ONECLAW_AGENT_ID`)

Use `just list-1claw` and `just sync-1claw-env` in generated projects.

## Key Architecture

- Uses `just` as the task runner (https://just.systems)
- Monorepo managed with npm workspaces
- Agent wallet is auto-generated and funded on local/test networks
- Smart contract ABIs auto-exported to frontend (Scaffold-ETH 2 pattern via `deployedContracts.ts`)
- Chat routes use the Vercel AI SDK for LLM streaming
- 1Claw Shroud gateway supports token billing (no provider key needed) or BYOK mode
- Built on Scaffold-ETH 2 patterns, Scaffold UI (`@scaffold-ui/hooks`, `@scaffold-ui/components`, `@scaffold-ui/debug-contracts`), RainbowKit, wagmi, and viem
- Burner wallet for local dev via burner-connector (Scaffold-ETH / BuidlGuidl style)
- Next.js apps: route-level `loading.tsx` skeletons, `next dev --turbo`, tree-shaken `lucide-react` icons
- Vite apps: `React.lazy` route splitting with shared `PageLoading` skeleton

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

## Non-Interactive / Automation (`-y`)

Use `-y` / `--non-interactive` for CI or agents (no prompts).

- `--env-password` (≥ 6 chars) is required when `--secrets` is `oneclaw` or `encrypted`.
- `--defer-oneclaw-api-key` — skip `ONECLAW_API_KEY` at scaffold time.
- `--oneclaw-intents` — register 1Claw agent with Intents enabled.
- Shroud + `-y`: `--llm oneclaw` with `--secrets none` requires `--oneclaw-agent-id` and `--oneclaw-agent-api-key`. `--shroud-billing provider_api_key` requires `--shroud-provider-api-key`.

Minimal example:

```bash
npx scaffold-agent@latest -y my-app \
  --env-password 'your-password-here' \
  --defer-oneclaw-api-key \
  --skip-npm-install \
  --skip-auto-fund
```

## Security

- Never commit real API keys, agent keys, or deployer private keys.
- `ONECLAW_AGENT_ID` is a UUID, not an Ethereum address.
- Use `--dump-config` for shareable config; secrets are stripped.

## Ethereum Development Reference

For best practices on building for Ethereum — including Solidity patterns, contract deployment, testing, and frontend integration — agents should also read:

https://ethskills.com/SKILL.md

## Repository

https://github.com/1clawAI/scaffold-agent
