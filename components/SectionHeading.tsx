interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export default function SectionHeading({
  title,
  subtitle,
  centered = false,
}: SectionHeadingProps) {
  return (
    <div style={{ textAlign: centered ? "center" : "left", marginBottom: "0.5rem" }}>
      <h2
        style={{
          fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
          fontWeight: 800,
          color: "var(--text-primary)",
          letterSpacing: "-0.02em",
          marginBottom: "0.5rem",
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          style={{
            fontSize: "1rem",
            color: "var(--text-secondary)",
          }}
        >
          {subtitle}
        </p>
      )}
      <div
        style={{
          width: "2.5rem",
          height: "3px",
          borderRadius: "9999px",
          background: "var(--gradient-hero)",
          marginTop: "0.75rem",
          marginLeft: centered ? "auto" : undefined,
          marginRight: centered ? "auto" : undefined,
        }}
      />
    </div>
  );
}
