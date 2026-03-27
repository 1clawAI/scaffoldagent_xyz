# scaffold-agent

## Purpose

scaffold-agent is an interactive CLI that scaffolds monorepo projects for building **onchain AI agents**. It generates a full-stack project with smart contracts, a frontend, and agent infrastructure in one command.

## Usage

```bash
npx scaffold-agent@latest
```

Or with a project name:

```bash
npx scaffold-agent@latest my-agent
```

### CLI Flags

| Flag | Description |
|---|---|
| `--project <name>` | Specify project directory name |
| `--non-interactive` / `-y` | Run without prompts (uses defaults: Foundry + Next.js + 1Claw Shroud) |
| `--swarm <n>` | Enable multi-agent swarm mode (1-64 agents with wallet rosters and swarm page) |
| `--from-config <file>` | Scaffold from a saved configuration file |
| `--dump-config` | Output current configuration without scaffolding |
| `--env-password` | Password for 1Claw or encrypted secrets (min 6 chars) |
| `--defer-oneclaw-api-key` | Defer 1Claw API key entry (useful for CI/automation) |
| `--skip-npm-install` | Skip npm installation |
| `--skip-auto-fund` | Skip auto-funding deployer wallet |

## Scaffold Wizard (7 Steps)

1. **Project name** — alphanumeric, hyphens, underscores
2. **Secrets management** — 1Claw (HSM vault), Encrypted file (AES-256-GCM), or Plain `.env`
3. **Agent identity** — generate Ethereum wallet for the agent
4. **Ampersend SDK** — optional integration
5. **LLM Provider** — 1Claw (Shroud), Gemini, OpenAI, Anthropic
6. **Chain framework** — Foundry, Hardhat, or None
7. **App framework** — Next.js, Vite, or Python (Google A2A)

## What It Generates

```
project-root/
├── justfile
├── scripts/
│   ├── secrets-crypto.mjs        # encrypt/decrypt
│   ├── with-secrets.mjs          # password prompt, env injection
│   ├── secret-add.mjs            # manage secrets
│   ├── deploy-foundry.mjs        # (or deploy-hardhat.mjs)
│   ├── generate-abi-types.mjs    # TypeScript from ABIs
│   ├── generate-deployer.mjs     # wallet creation + auto-fund
│   └── fund-deployer.mjs         # fund deployer/agent from acct #0
├── packages/
│   ├── foundry/ (or hardhat/)    # Solidity contracts
│   └── nextjs/ (or vite/ or python/)
│       ├── app/
│       │   ├── page.tsx              # shadcn chat UI
│       │   ├── identity/page.tsx     # ERC-8004 / Agent0 registration
│       │   ├── debug/page.tsx        # contract introspection
│       │   └── api/
│       │       ├── chat/route.ts     # LLM streaming (Vercel AI SDK)
│       │       └── agent0/lookup/route.ts
│       ├── components/ui/            # shadcn components
│       └── contracts/                # auto-generated ABI types
├── .env                              # non-sensitive config
└── .env.secrets.encrypted            # encrypted keys (if chosen)
```

## How an AI Agent Should Use This Tool

1. **Determine the user's goal** — Ask what kind of onchain AI agent they want to build. Identify the chain, the contract logic, and the agent's purpose.
2. **Run the CLI** — Execute `npx scaffold-agent@latest` in a clean directory. The CLI is interactive and will prompt for each configuration option. Use `--non-interactive` for defaults.
3. **Select options** — Choose the appropriate framework, LLM provider, and secret management based on the user's requirements.
4. **Post-scaffold setup** — After generation, the agent should:
   - `cd` into the project directory (npm install runs automatically during scaffolding)
   - Run `just chain` to start a local blockchain
   - Run `just fund` to fund the deployer and agent wallets (100 ETH each)
   - Run `just deploy` to deploy contracts and generate ABI types
   - Run `just start` to launch the frontend or agent app
5. **Iterate** — Modify the generated agent logic in the `packages/` directory. The agent has an Ethereum wallet and can sign transactions, read contract state, and call LLM APIs.

## All Just Recipes

| Recipe | Purpose |
|---|---|
| `just chain` | Start local blockchain (Anvil for Foundry, npx hardhat node for Hardhat) |
| `just fund` | Fund DEPLOYER_ADDRESS + AGENT_ADDRESS (100 ETH each from account #0) |
| `just deploy` | Deploy contracts and generate ABI types (deployedContracts.ts) |
| `just start` | Launch frontend or agent dev server |
| `just accounts` | Display QR codes for deployer and agent addresses |
| `just balances` | Show native balance across configured chains |
| `just generate` | Create deployer wallet (auto-funds if RPC available) |
| `just env KEY VALUE` | Update repo-root .env |
| `just enc KEY VALUE` | Update .env.secrets.encrypted (prompts for password) |
| `just vault PATH VALUE` | Store secret in 1Claw vault |
| `just list-1claw` | List vault and agent UUIDs from 1Claw |
| `just sync-1claw-env` | Populate .env with first vault/agent IDs |
| `just reown PROJECT_ID` | Add WalletConnect Cloud project ID to .env |
| `just reset` | Recreate vaults/agents when initial setup hits limits |

## Key Architecture

- Uses `just` as the task runner (`brew install just` or see https://just.systems)
- Monorepo managed with npm workspaces
- Agent wallet is auto-generated and funded on local/test networks
- Smart contract ABIs are auto-exported to the frontend and agent packages (Scaffold-ETH 2 pattern)
- Chat routes use the Vercel AI SDK for LLM streaming
- 1Claw Shroud gateway supports token billing (no provider key needed) or BYOK mode
- Supports Gemini, OpenAI, and Anthropic as direct LLM providers
- Built on Scaffold-ETH 2, RainbowKit, wagmi, and viem

## Key Environment Variables

| Variable | Purpose |
|---|---|
| `RPC_URL` | Blockchain RPC (default: `http://127.0.0.1:8545`) |
| `DEPLOYER_ADDRESS` | Contract deployer wallet |
| `AGENT_ADDRESS` | Agent's Ethereum address |
| `ONECLAW_API_KEY` | 1Claw API key |
| `ONECLAW_VAULT_ID` | 1Claw vault UUID |
| `ONECLAW_AGENT_ID` | 1Claw agent UUID |
| `SHROUD_LLM_PROVIDER` | LLM provider for Shroud gateway |
| `SHROUD_BILLING_MODE` | `token_billing` or `provider_api_key` |
| `SHROUD_DEFAULT_MODEL` | Override default model |

## Ethereum Development Reference

For best practices on building for Ethereum — including Solidity patterns, contract deployment, testing, and frontend integration — agents should also read:

https://ethskills.com/SKILL.md

This provides foundational guidance for writing correct, secure, and idiomatic smart contracts and dapps that scaffold-agent generates.

## Repository

https://github.com/1clawAI/scaffold-agent
