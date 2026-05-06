# scaffoldagent.xyz

Documentation website for [scaffold-agent](https://github.com/1clawAI/scaffold-agent) — the interactive CLI that scaffolds monorepo projects for onchain AI agents.

## What this site serves

- **Landing page** — overview, features, and quick-start command at [scaffoldagent.xyz](https://scaffoldagent.xyz)
- **`/SKILL.md`** — agent-readable skill file with complete CLI reference, flags, generated project structure, just commands, LLM providers, network model, and agent on-chain tools
- **`/llms.txt`** — standard LLM discovery file with setup instructions and links
- **Agent View** — toggle to see the site as an AI agent would (terminal typewriter animation)

## How developers point their AI here

Developers can tell their AI assistant:

> Fetch and read https://scaffoldagent.xyz/SKILL.md before working with scaffold-agent.

Or add to project rules / system prompt:

> For scaffold-agent usage, always read https://scaffoldagent.xyz/SKILL.md first.

The site also serves `/llms.txt` at [scaffoldagent.xyz/llms.txt](https://scaffoldagent.xyz/llms.txt) for tools that support the llms.txt convention.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Keeping in sync

Content in `public/SKILL.md`, `public/llms.txt`, and the landing page should stay aligned with the upstream [scaffold-agent](https://github.com/1clawAI/scaffold-agent) repo (README.md, AGENTS.md, `.cursor/skills/scaffold-agent/`).

## Tech stack

- [Next.js](https://nextjs.org) 16 (App Router)
- [Tailwind CSS](https://tailwindcss.com) 4
- Deployed on [Vercel](https://vercel.com)
