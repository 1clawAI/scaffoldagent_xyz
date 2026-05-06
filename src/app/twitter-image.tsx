import { ImageResponse } from "next/og";

export const alt =
  "scaffold-agent — One command to scaffold onchain AI agent monorepos";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 80px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "#22c55e",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
              fontWeight: 700,
              color: "#0a0a0a",
            }}
          >
            S
          </div>
          <span
            style={{
              fontSize: "28px",
              color: "#888",
              letterSpacing: "0.05em",
              textTransform: "uppercase" as const,
              fontWeight: 600,
            }}
          >
            Open Source CLI
          </span>
        </div>
        <div
          style={{
            fontSize: "64px",
            fontWeight: 700,
            color: "#e5e5e5",
            textAlign: "center",
            lineHeight: 1.15,
            marginBottom: "24px",
            display: "flex",
          }}
        >
          <span>Build </span>
          <span style={{ color: "#22c55e", marginLeft: "16px" }}>
            Onchain AI Agents
          </span>
        </div>
        <div
          style={{
            fontSize: "28px",
            color: "#888",
            textAlign: "center",
            lineHeight: 1.5,
            maxWidth: "900px",
            marginBottom: "40px",
            display: "flex",
          }}
        >
          One command to scaffold a full-stack monorepo with smart contracts, a
          frontend, and agent infrastructure.
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            background: "#141414",
            border: "2px solid #333",
            borderRadius: "16px",
            padding: "16px 32px",
          }}
        >
          <span style={{ color: "#22c55e", fontSize: "24px", fontWeight: 600 }}>
            $
          </span>
          <span
            style={{
              fontSize: "24px",
              color: "#e5e5e5",
              fontFamily: "monospace",
            }}
          >
            npx scaffold-agent@latest
          </span>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            display: "flex",
            gap: "32px",
            fontSize: "18px",
            color: "#666",
          }}
        >
          <span>scaffoldagent.xyz</span>
          <span>github.com/1clawAI/scaffold-agent</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
