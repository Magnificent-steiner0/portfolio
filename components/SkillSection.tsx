"use client";

import { skillGroups } from "@/data/skills";
import {
  Code2,
  Monitor,
  Server,
  Brain,
  Database,
  Cloud,
  Wrench,
} from "lucide-react";
import SectionHeading from "./SectionHeading";

const iconMap: Record<string, React.ReactNode> = {
  Code2: <Code2 size={16} />,
  Monitor: <Monitor size={16} />,
  Server: <Server size={16} />,
  Brain: <Brain size={16} />,
  Database: <Database size={16} />,
  Cloud: <Cloud size={16} />,
  Wrench: <Wrench size={16} />,
};

export default function SkillSection() {
  return (
    <section id="skills" aria-label="Skills" className="section">
      <div className="container-pad">
        <SectionHeading
          title="Skills"
          subtitle="Technologies and tools I work with"
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1rem",
            marginTop: "2.5rem",
          }}
        >
          {skillGroups.map((group) => (
            <div
              key={group.category}
              className="glass-card"
              style={{ padding: "1.25rem" }}
            >
              {/* Category header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginBottom: "1rem",
                }}
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "30px",
                    height: "30px",
                    borderRadius: "6px",
                    background: "var(--accent-glow)",
                    color: "var(--accent)",
                    flexShrink: 0,
                  }}
                >
                  {iconMap[group.icon]}
                </span>
                <h3
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    margin: 0,
                  }}
                >
                  {group.category}
                </h3>
              </div>

              {/* Skills */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    style={{
                      padding: "0.3rem 0.7rem",
                      borderRadius: "6px",
                      fontSize: "0.8125rem",
                      fontWeight: 400,
                      color: "var(--text-secondary)",
                      border: "1px solid var(--border)",
                      background: "rgba(255,255,255,0.02)",
                      transition: "border-color 0.2s ease, color 0.2s ease",
                      cursor: "default",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget;
                      el.style.borderColor = "var(--accent)";
                      el.style.color = "var(--accent)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget;
                      el.style.borderColor = "var(--border)";
                      el.style.color = "var(--text-secondary)";
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
