# scaffold-agent

## Purpose

scaffold-agent is an interactive CLI that scaffolds monorepo projects for building **onchain AI agents**. It generates a full-stack project with smart contracts, a frontend, and agent infrastructure in one command.

## Usage

```bash
npx scaffold-agent
```

Or with a project name:

```bash
npx scaffold-agent my-agent
```

## What It Generates

A monorepo with the following packages:

- **Smart Contracts** — Foundry or Hardhat, with auto-deploy scripts and ABI type generation
- **Frontend** — Next.js, Vite, or Python (Google A2A), with WalletConnect integration
- **Agent** — LLM-powered agent with an Ethereum wallet, configured to interact onchain

## Options Available During Scaffolding

| Option | Choices |
|---|---|
| Contract framework | Foundry, Hardhat, None |
| Frontend framework | Next.js, Vite, Python/A2A |
| LLM provider | 1Claw, Gemini, OpenAI, Anthropic |
| Secret management | 1Claw HSM vault, Encrypted file, Plain .env |
| Extras | Ampersend SDK, WalletConnect |

## How an AI Agent Should Use This Tool

1. **Determine the user's goal** — Ask what kind of onchain AI agent they want to build. Identify the chain, the contract logic, and the agent's purpose.
2. **Run the CLI** — Execute `npx scaffold-agent` in a clean directory. The CLI is interactive and will prompt for each configuration option.
3. **Select options** — Choose the appropriate framework, LLM provider, and secret management based on the user's requirements.
4. **Post-scaffold setup** — After generation, the agent should:
   - `cd` into the project directory (npm install runs automatically during scaffolding)
   - Run `just chain` to start a local blockchain
   - Run `just fund` to fund the deployer and agent wallets
   - Run `just deploy` to deploy contracts and generate ABI types
   - Run `just start` to launch the frontend or agent app
5. **Iterate** — Modify the generated agent logic in the `packages/agent/` directory. The agent has an Ethereum wallet and can sign transactions, read contract state, and call LLM APIs.

## Key Architecture

- Uses `just` as the task runner (like `make` but simpler)
- Monorepo managed with npm workspaces
- Agent wallet is auto-generated and funded on local/test networks
- Smart contract ABIs are auto-exported to the frontend and agent packages
- Inspired by Scaffold-ETH 2

## Ethereum Development Reference

For best practices on building for Ethereum — including Solidity patterns, contract deployment, testing, and frontend integration — agents should also read:

https://ethskills.com/SKILL.md

This provides foundational guidance for writing correct, secure, and idiomatic smart contracts and dapps that scaffold-agent generates.

## Repository

https://github.com/1clawAI/scaffold-agent
