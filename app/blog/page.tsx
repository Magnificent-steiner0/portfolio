"use client";

import { useState } from "react";
import BlogCard from "@/components/BlogCard";
import { blogPosts } from "@/data/blog";
import { Search } from "lucide-react";

const allTags = ["All", ...Array.from(new Set(blogPosts.flatMap((p) => p.tags)))];

export default function BlogPage() {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState("All");

  const filtered = blogPosts.filter((post) => {
    const matchesTag = activeTag === "All" || post.tags.includes(activeTag);
    const matchesSearch =
      search === "" ||
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchesTag && matchesSearch;
  });

  return (
    <div style={{ paddingTop: "80px", minHeight: "100vh" }}>
      <div className="container-pad section">
        {/* Header */}
        <div style={{ marginBottom: "3rem" }}>
          <h1
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 800,
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
              marginBottom: "0.75rem",
            }}
          >
            Articles
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1rem", maxWidth: "500px" }}>
            Technical writing on AI, machine learning, and software engineering.
          </p>
          <div
            style={{ width: "2.5rem", height: "3px", borderRadius: "9999px", background: "var(--gradient-hero)", marginTop: "1rem" }}
          />
        </div>

        {/* Search */}
        <div style={{ position: "relative", maxWidth: "400px", marginBottom: "1.5rem" }}>
          <Search
            size={15}
            style={{
              position: "absolute",
              left: "0.875rem",
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--text-muted)",
              pointerEvents: "none",
            }}
          />
          <input
            id="blog-search"
            type="search"
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search blog posts"
            style={{
              width: "100%",
              padding: "0.625rem 0.875rem 0.625rem 2.5rem",
              borderRadius: "8px",
              border: "1px solid var(--border)",
              background: "var(--bg-card)",
              color: "var(--text-primary)",
              fontSize: "0.9rem",
              outline: "none",
              fontFamily: "inherit",
            }}
          />
        </div>

        {/* Tag filters */}
        <div
          role="tablist"
          aria-label="Filter by tag"
          style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "2.5rem" }}
        >
          {allTags.map((tag) => {
            const isActive = activeTag === tag;
            return (
              <button
                key={tag}
                role="tab"
                aria-selected={isActive}
                id={`blog-filter-${tag.toLowerCase().replace(/\s+/g, "-")}`}
                onClick={() => setActiveTag(tag)}
                style={{
                  padding: "0.375rem 0.875rem",
                  borderRadius: "9999px",
                  fontSize: "0.8125rem",
                  fontWeight: isActive ? 600 : 400,
                  border: "1px solid",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  background: isActive ? "var(--accent)" : "transparent",
                  color: isActive ? "#fff" : "var(--text-secondary)",
                  borderColor: isActive ? "var(--accent)" : "var(--border)",
                }}
              >
                {tag}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {filtered.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "4rem 0", color: "var(--text-muted)" }}>
            No articles found. Try a different search or filter.
          </div>
        )}
      </div>
    </div>
  );
}
