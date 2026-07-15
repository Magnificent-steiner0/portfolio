import { education } from "@/data/education";
import { GraduationCap, MapPin, Calendar, BookOpen } from "lucide-react";
import SectionHeading from "./SectionHeading";

export default function EducationSection() {
  return (
    <section id="education" aria-label="Education" className="section">
      <div className="container-pad">
        <SectionHeading title="Education" subtitle="Academic background" />

        <div
          style={{
            marginTop: "2.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
          }}
        >
          {education.map((edu, index) => (
            <div
              key={index}
              className="glass-card"
              style={{ padding: "1.75rem" }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "auto 1fr",
                  gap: "1.25rem",
                }}
              >
                {/* Icon */}
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "10px",
                    background: "var(--accent-glow)",
                    border: "1px solid rgba(79,156,249,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--accent)",
                    flexShrink: 0,
                  }}
                >
                  <GraduationCap size={22} />
                </div>

                {/* Content */}
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: "0.5rem",
                      marginBottom: "0.375rem",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "1.0625rem",
                        fontWeight: 700,
                        color: "var(--text-primary)",
                        margin: 0,
                      }}
                    >
                      {edu.degree}
                    </h3>
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.3rem",
                        fontSize: "0.8125rem",
                        color: "var(--text-muted)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <Calendar size={13} />
                      {edu.duration}
                    </span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "1rem",
                      marginBottom: "1rem",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.9375rem",
                        fontWeight: 600,
                        color: "var(--accent)",
                      }}
                    >
                      {edu.shortName}
                    </span>
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.3rem",
                        fontSize: "0.8125rem",
                        color: "var(--text-secondary)",
                      }}
                    >
                      <MapPin size={13} />
                      {edu.location}
                    </span>
                  </div>

                  {/* Achievements */}
                  {edu.achievements.length > 0 && (
                    <div style={{ marginBottom: "0.875rem" }}>
                      <p
                        style={{
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          color: "var(--text-muted)",
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                          marginBottom: "0.5rem",
                        }}
                      >
                        Highlights
                      </p>
                      <ul
                        style={{
                          listStyle: "none",
                          padding: 0,
                          margin: 0,
                          display: "flex",
                          flexDirection: "column",
                          gap: "0.375rem",
                        }}
                      >
                        {edu.achievements.map((achievement, i) => (
                          <li
                            key={i}
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: "0.5rem",
                              fontSize: "0.875rem",
                              color: "var(--text-secondary)",
                            }}
                          >
                            <span
                              className="accent-dot"
                              style={{ marginTop: "0.45rem" }}
                            />
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Coursework */}
                  {edu.coursework.length > 0 && (
                    <div>
                      <p
                        style={{
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          color: "var(--text-muted)",
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                          marginBottom: "0.5rem",
                        }}
                      >
                        Key Coursework
                      </p>
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "0.375rem",
                        }}
                      >
                        {edu.coursework.map((course) => (
                          <span
                            key={course}
                            style={{
                              fontSize: "0.75rem",
                              padding: "0.2rem 0.6rem",
                              borderRadius: "4px",
                              border: "1px solid var(--border)",
                              color: "var(--text-muted)",
                              background: "rgba(255,255,255,0.02)",
                            }}
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
