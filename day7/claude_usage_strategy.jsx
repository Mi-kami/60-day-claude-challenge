import { useState } from "react";

const data = {
  profile: {
    role: "Advanced Beginner / Early Junior",
    activities: ["ML Engineering", "Career Portfolio Building"],
    usage: "Daily",
    outputs: ["Coding & Debugging", "Deep Research", "Learning Support", "Creative & Strategic Work"],
  },

  primaryModel: "Claude Sonnet 4.6",
  primaryReason: "You're a daily user with a wide task surface — coding, learning, content, and career strategy all in one day. Sonnet is the precision blade that covers ~75% of your needs without the wait of Opus or the ceiling of Haiku. It's fast enough to iterate, smart enough to teach, and capable enough for your current project complexity.",

  modelGuides: [
    {
      model: "Haiku 4.5",
      icon: "⚡",
      color: "#38bdf8",
      badge: "Speed Layer",
      uses: [
        "Quick syntax lookups (e.g. 'how do I sort a dict in Python')",
        "Brainstorming bullet lists fast (e.g. LinkedIn post ideas)",
        "Simple code snippet generation for known patterns",
        "Grammar / spelling checks on short text",
        "Fast definitions of known ML terms",
      ],
      avoid: "Complex debugging, architecture decisions, or anything you'll publish",
    },
    {
      model: "Sonnet 4.6",
      icon: "🎯",
      color: "#f59e0b",
      badge: "Daily Workhorse",
      uses: [
        "Debugging Python & ML code (your #1 daily task)",
        "Writing LinkedIn posts for the 60-Day Claude Challenge",
        "Explaining ML concepts with examples and analogies",
        "GitHub README & portfolio documentation",
        "Code review and optimization",
        "Data visualization code (matplotlib, seaborn, plotly)",
        "Prompt engineering experiments",
        "Career strategy conversations",
      ],
      avoid: "Production architecture decisions or very complex research synthesis",
    },
    {
      model: "Opus 4.6 / 4.7 / 4.8",
      icon: "🧠",
      color: "#a78bfa",
      badge: "Heavy Lifter",
      uses: [
        "Designing full ML pipeline architectures from scratch",
        "Complex debugging where root cause isn't obvious",
        "Synthesizing multiple research papers or methodologies",
        "Building career roadmaps with multi-year strategy",
        "Capstone / thesis-level technical writing",
        "When you're genuinely stuck and Sonnet gave shallow answers",
        "Crypto AI & Food Price Forecasting system design decisions",
      ],
      avoid: "Routine tasks — Opus on simple work wastes time and budget",
    },
  ],

  effortLevels: [
    {
      level: "Low",
      icon: "🔋",
      color: "#64748b",
      when: "Almost never for your profile.",
      examples: ["Trivial one-line lookups", "Checking if a function name is correct"],
      verdict: "Skip this. You need reasoning depth even on quick tasks.",
    },
    {
      level: "Standard",
      icon: "⚙️",
      color: "#38bdf8",
      when: "Your default — covers ~70% of all daily work.",
      examples: [
        "Debugging known errors",
        "Writing LinkedIn posts",
        "README documentation",
        "Code generation for familiar patterns",
        "Portfolio formatting",
      ],
      verdict: "Start here. Only escalate when you're stuck or the task is genuinely hard.",
    },
    {
      level: "High",
      icon: "🔥",
      color: "#f59e0b",
      when: "When depth matters — learning new concepts, tricky bugs, design decisions.",
      examples: [
        "Learning a new ML architecture (transformers, LSTMs, etc.)",
        "Multi-step debugging with unclear root cause",
        "Code review needing nuanced judgment",
        "Research comparison (SARIMA vs XGBoost vs Prophet)",
        "Designing a new project module",
      ],
      verdict: "Use this when Standard gives you shallow answers. ~20% of your tasks.",
    },
    {
      level: "Max",
      icon: "💎",
      color: "#a78bfa",
      when: "Reserved for your highest-stakes, most complex tasks only.",
      examples: [
        "Full ML system architecture design",
        "Career strategy roadmapping",
        "Synthesis across many research sources",
        "When you're about to make an irreversible technical decision",
      ],
      verdict: "Powerful but slow. Use intentionally, not by default. ~5-10% of tasks.",
    },
  ],

  taskTable: [
    { task: "Debug Python / ML code", model: "Sonnet", effort: "Standard", icon: "🐛", reason: "Fast feedback loop; catches most bugs" },
    { task: "Learn a new ML concept", model: "Sonnet", effort: "High", icon: "📚", reason: "Needs reasoning depth for quality explanation" },
    { task: "LinkedIn posts (60-Day Challenge)", model: "Sonnet", effort: "Standard", icon: "✍️", reason: "Creative but not structurally complex" },
    { task: "GitHub README / docs", model: "Sonnet", effort: "Standard", icon: "📄", reason: "Structured writing, no heavy reasoning needed" },
    { task: "Design ML project architecture", model: "Opus", effort: "High", icon: "🏗️", reason: "System design requires genuine depth" },
    { task: "Research papers / method comparison", model: "Opus", effort: "High", icon: "🔬", reason: "Synthesis across complex material" },
    { task: "Quick syntax lookup", model: "Haiku", effort: "Standard", icon: "⚡", reason: "No heavy lifting needed" },
    { task: "Career roadmap planning", model: "Opus", effort: "High", icon: "🗺️", reason: "High-stakes, multi-variable strategic thinking" },
    { task: "Code optimization / review", model: "Sonnet", effort: "High", icon: "⚙️", reason: "Nuanced judgment beyond surface fixes" },
    { task: "Prompt engineering experiments", model: "Sonnet", effort: "Standard", icon: "🧪", reason: "Iterative and creative — fast cycles win" },
    { task: "Data visualization code", model: "Sonnet", effort: "Standard", icon: "📊", reason: "Pattern-based code generation" },
    { task: "Capstone / thesis writing", model: "Opus", effort: "High", icon: "🎓", reason: "Highest output quality required" },
  ],

  mistakes: [
    { icon: "❌", title: "Using Haiku for complex debugging", desc: "Haiku will give you plausible-sounding but shallow answers on hard ML bugs. You'll waste time chasing bad leads." },
    { icon: "❌", title: "Defaulting to Max effort for everything", desc: "Slower, and overkill on 90% of tasks. You'll lose the iteration speed that makes daily work effective." },
    { icon: "❌", title: "Never escalating to Opus when stuck", desc: "If Sonnet gives you the same wrong answer twice, stop — switch to Opus. It reasons differently." },
    { icon: "❌", title: "Using Low effort for learning sessions", desc: "When you're learning, you need reasoning depth. Low effort skips the 'why' and gives you the 'what'." },
    { icon: "❌", title: "Treating all coding tasks equally", desc: "A quick syntax fix ≠ a system architecture decision. Match model + effort to task complexity, not habit." },
    { icon: "❌", title: "Vague prompts on hard problems", desc: "The model is only as sharp as your input. For Opus/High effort tasks, give full context and be specific about what you want." },
  ],

  finalPick: {
    model: "Claude Sonnet 4.6",
    effort: "Standard (with intentional escalation to High)",
    reason: "Sonnet + Standard is your daily engine — fast, versatile, and capable across coding, learning, and content. It matches your pace as a daily user building real projects. The one rule: the moment you feel like the answer is 'too shallow' or 'not quite right', bump to High. That single habit alone will make your outputs noticeably better without slowing you down.",
  },
};

const effortColorMap = { Standard: "#38bdf8", High: "#f59e0b", Low: "#64748b", Max: "#a78bfa" };
const modelColorMap = { Haiku: "#38bdf8", Sonnet: "#f59e0b", Opus: "#a78bfa" };

function Badge({ text, color }) {
  return (
    <span style={{
      background: color + "20",
      color: color,
      border: `1px solid ${color}40`,
      borderRadius: "4px",
      padding: "2px 8px",
      fontSize: "11px",
      fontFamily: "'IBM Plex Mono', monospace",
      fontWeight: 600,
      letterSpacing: "0.05em",
      textTransform: "uppercase",
    }}>{text}</span>
  );
}

function SectionTitle({ children, accent = "#f59e0b" }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
      <div style={{ width: "3px", height: "22px", background: accent, borderRadius: "2px" }} />
      <h2 style={{ margin: 0, fontSize: "13px", fontFamily: "'IBM Plex Mono', monospace", color: accent, textTransform: "uppercase", letterSpacing: "0.12em" }}>
        {children}
      </h2>
    </div>
  );
}

export default function ClaudeStrategy() {
  const [activeTab, setActiveTab] = useState("models");

  const tabs = [
    { id: "models", label: "Models" },
    { id: "effort", label: "Effort Levels" },
    { id: "tasks", label: "Task Table" },
    { id: "mistakes", label: "Mistakes" },
  ];

  return (
    <div style={{
      background: "#080c14",
      minHeight: "100vh",
      color: "#e2e8f0",
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      padding: "0",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Blueprint grid background */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: `
          linear-gradient(rgba(248,180,58,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(248,180,58,0.03) 1px, transparent 1px)`,
        backgroundSize: "40px 40px",
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "820px", margin: "0 auto", padding: "40px 24px" }}>

        {/* Header */}
        <div style={{
          borderBottom: "1px solid rgba(248,180,58,0.15)",
          paddingBottom: "28px",
          marginBottom: "32px",
        }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                <span style={{ fontSize: "11px", fontFamily: "'IBM Plex Mono', monospace", color: "#f59e0b", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                  ◆ The Midnight Architect
                </span>
              </div>
              <h1 style={{ margin: 0, fontSize: "26px", fontWeight: 700, color: "#f1f5f9", lineHeight: 1.2, letterSpacing: "-0.02em" }}>
                My Claude Usage Strategy
              </h1>
              <p style={{ margin: "8px 0 0", fontSize: "13px", color: "#64748b" }}>
                Personalized for: Advanced Beginner / ML Engineering + Career Portfolio
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px", alignItems: "flex-end" }}>
              <Badge text="Daily User" color="#f59e0b" />
              <Badge text="AI Workflow Optimized" color="#a78bfa" />
            </div>
          </div>
        </div>

        {/* Primary Model Banner */}
        <div style={{
          background: "linear-gradient(135deg, rgba(245,158,11,0.08) 0%, rgba(167,139,250,0.05) 100%)",
          border: "1px solid rgba(245,158,11,0.25)",
          borderRadius: "10px",
          padding: "24px",
          marginBottom: "32px",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: "-30px", right: "-30px", width: "120px", height: "120px",
            background: "radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)",
            borderRadius: "50%",
          }} />
          <SectionTitle accent="#f59e0b">Recommended Primary Model</SectionTitle>
          <div style={{ display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" }}>
            <span style={{ fontSize: "28px" }}>🎯</span>
            <div>
              <div style={{ fontSize: "22px", fontWeight: 700, color: "#f59e0b", fontFamily: "'IBM Plex Mono', monospace" }}>
                {data.primaryModel}
              </div>
              <p style={{ margin: "6px 0 0", fontSize: "13.5px", color: "#94a3b8", lineHeight: 1.6, maxWidth: "600px" }}>
                {data.primaryReason}
              </p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{ display: "flex", gap: "4px", marginBottom: "24px", background: "#0f1624", borderRadius: "8px", padding: "4px", border: "1px solid rgba(255,255,255,0.06)" }}>
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1, padding: "8px 12px", border: "none", cursor: "pointer", borderRadius: "6px",
                fontSize: "12px", fontWeight: 600, fontFamily: "'IBM Plex Mono', monospace",
                textTransform: "uppercase", letterSpacing: "0.06em",
                background: activeTab === tab.id ? "rgba(245,158,11,0.15)" : "transparent",
                color: activeTab === tab.id ? "#f59e0b" : "#64748b",
                transition: "all 0.2s",
              }}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB: Models */}
        {activeTab === "models" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {data.modelGuides.map((m) => (
              <div key={m.model} style={{
                background: "#0f1624",
                border: `1px solid ${m.color}25`,
                borderLeft: `3px solid ${m.color}`,
                borderRadius: "10px",
                padding: "20px",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
                  <span style={{ fontSize: "20px" }}>{m.icon}</span>
                  <div>
                    <span style={{ fontSize: "15px", fontWeight: 700, color: m.color, fontFamily: "'IBM Plex Mono', monospace" }}>{m.model}</span>
                    <span style={{ marginLeft: "10px" }}><Badge text={m.badge} color={m.color} /></span>
                  </div>
                </div>
                <div style={{ marginBottom: "12px" }}>
                  <div style={{ fontSize: "11px", fontFamily: "'IBM Plex Mono', monospace", color: "#475569", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>✓ Use When</div>
                  <ul style={{ margin: 0, padding: "0 0 0 16px" }}>
                    {m.uses.map((u, i) => (
                      <li key={i} style={{ fontSize: "13.5px", color: "#cbd5e1", marginBottom: "4px", lineHeight: 1.5 }}>{u}</li>
                    ))}
                  </ul>
                </div>
                <div style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.15)", borderRadius: "6px", padding: "8px 12px" }}>
                  <span style={{ fontSize: "11px", fontFamily: "'IBM Plex Mono', monospace", color: "#ef4444", textTransform: "uppercase", letterSpacing: "0.1em" }}>⚠ Avoid: </span>
                  <span style={{ fontSize: "12.5px", color: "#94a3b8" }}>{m.avoid}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB: Effort Levels */}
        {activeTab === "effort" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {data.effortLevels.map((e) => (
              <div key={e.level} style={{
                background: "#0f1624",
                border: `1px solid ${e.color}25`,
                borderLeft: `3px solid ${e.color}`,
                borderRadius: "10px",
                padding: "20px",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                  <span style={{ fontSize: "18px" }}>{e.icon}</span>
                  <span style={{ fontSize: "14px", fontWeight: 700, color: e.color, fontFamily: "'IBM Plex Mono', monospace" }}>{e.level} Effort</span>
                </div>
                <p style={{ margin: "0 0 10px", fontSize: "13.5px", color: "#94a3b8" }}><strong style={{ color: "#e2e8f0" }}>When:</strong> {e.when}</p>
                {e.examples.length > 0 && (
                  <ul style={{ margin: "0 0 12px", padding: "0 0 0 16px" }}>
                    {e.examples.map((ex, i) => (
                      <li key={i} style={{ fontSize: "13px", color: "#cbd5e1", marginBottom: "4px" }}>{ex}</li>
                    ))}
                  </ul>
                )}
                <div style={{ background: `${e.color}10`, border: `1px solid ${e.color}25`, borderRadius: "6px", padding: "8px 12px" }}>
                  <span style={{ fontSize: "12.5px", color: e.color, fontWeight: 600 }}>Verdict: </span>
                  <span style={{ fontSize: "12.5px", color: "#94a3b8" }}>{e.verdict}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB: Task Table */}
        {activeTab === "tasks" && (
          <div style={{ background: "#0f1624", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "10px", overflow: "hidden" }}>
            <div style={{
              display: "grid", gridTemplateColumns: "2fr 1fr 1fr 2fr",
              background: "#060a12", padding: "10px 16px", borderBottom: "1px solid rgba(248,180,58,0.12)",
            }}>
              {["Task", "Model", "Effort", "Reason"].map(h => (
                <span key={h} style={{ fontSize: "10px", fontFamily: "'IBM Plex Mono', monospace", color: "#475569", textTransform: "uppercase", letterSpacing: "0.12em" }}>{h}</span>
              ))}
            </div>
            {data.taskTable.map((row, i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "2fr 1fr 1fr 2fr",
                padding: "11px 16px", alignItems: "center",
                borderBottom: i < data.taskTable.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)",
              }}>
                <span style={{ fontSize: "13px", color: "#e2e8f0" }}>{row.icon} {row.task}</span>
                <span>
                  <Badge text={row.model} color={modelColorMap[row.model] || "#38bdf8"} />
                </span>
                <span>
                  <Badge text={row.effort} color={effortColorMap[row.effort] || "#38bdf8"} />
                </span>
                <span style={{ fontSize: "12px", color: "#64748b" }}>{row.reason}</span>
              </div>
            ))}
          </div>
        )}

        {/* TAB: Mistakes */}
        {activeTab === "mistakes" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {data.mistakes.map((m, i) => (
              <div key={i} style={{
                background: "#0f1624", border: "1px solid rgba(239,68,68,0.12)",
                borderLeft: "3px solid rgba(239,68,68,0.5)", borderRadius: "10px", padding: "16px 20px",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                  <span style={{ fontSize: "16px" }}>{m.icon}</span>
                  <span style={{ fontSize: "14px", fontWeight: 600, color: "#f1f5f9" }}>{m.title}</span>
                </div>
                <p style={{ margin: 0, fontSize: "13px", color: "#94a3b8", lineHeight: 1.6 }}>{m.desc}</p>
              </div>
            ))}
          </div>
        )}

        {/* Final Recommendation — always visible */}
        <div style={{
          marginTop: "32px",
          background: "linear-gradient(135deg, rgba(167,139,250,0.08) 0%, rgba(245,158,11,0.05) 100%)",
          border: "1px solid rgba(167,139,250,0.25)",
          borderRadius: "10px",
          padding: "24px",
        }}>
          <SectionTitle accent="#a78bfa">Final Recommendation</SectionTitle>
          <p style={{ margin: "0 0 16px", fontSize: "12px", color: "#64748b", fontFamily: "'IBM Plex Mono', monospace" }}>
            IF YOU COULD USE ONLY ONE MODEL + ONE EFFORT LEVEL:
          </p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "16px" }}>
            <div style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.3)", borderRadius: "8px", padding: "10px 18px" }}>
              <div style={{ fontSize: "11px", color: "#64748b", fontFamily: "'IBM Plex Mono', monospace", marginBottom: "4px" }}>MODEL</div>
              <div style={{ fontSize: "16px", fontWeight: 700, color: "#f59e0b" }}>{data.finalPick.model}</div>
            </div>
            <div style={{ background: "rgba(167,139,250,0.1)", border: "1px solid rgba(167,139,250,0.3)", borderRadius: "8px", padding: "10px 18px" }}>
              <div style={{ fontSize: "11px", color: "#64748b", fontFamily: "'IBM Plex Mono', monospace", marginBottom: "4px" }}>EFFORT</div>
              <div style={{ fontSize: "16px", fontWeight: 700, color: "#a78bfa" }}>{data.finalPick.effort}</div>
            </div>
          </div>
          <p style={{ margin: 0, fontSize: "13.5px", color: "#94a3b8", lineHeight: 1.7 }}>
            {data.finalPick.reason}
          </p>
        </div>

        <div style={{ textAlign: "center", marginTop: "28px", fontSize: "11px", color: "#334155", fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.08em" }}>
          ABTALKS 60 DAYS CLAUDE CHALLENGE · THE MIDNIGHT ARCHITECT · CLAUDE AI STRATEGY
        </div>
      </div>
    </div>
  );
}
