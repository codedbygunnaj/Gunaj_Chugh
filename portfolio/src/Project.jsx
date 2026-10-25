import { useState, useEffect } from "react";
import Card3D from "./components/Card3D";
import AILoader from "./components/AILoader";
import defaultPic from "./assets/githubProject.webp";
import "./projects.css";

// Comprehensive fallback with Gunaj's real projects in case GitHub API rate limits
const fallbackProjects = [
  {
    id: 101,
    name: "SafeWalk",
    description: "AI-powered real-time pedestrian safety & route monitoring system using computer vision and geolocation hazard alerts.",
    html_url: "https://github.com/codedbygunnaj/safewalk",
    homepage: "https://safewalk.vercel.app",
    language: "Python / React",
    stargazers_count: 7,
    forks_count: 2,
    topics: ["live", "computer-vision", "fastapi", "react", "safety", "ai"],
    category: "ai",
    isLive: true,
    isAi: true,
    isSystem: true,
  },
  {
    id: 102,
    name: "Online-Code-Editor",
    description: "Cloud-based collaborative developer IDE featuring real-time multi-language code compilation and syntax highlighting.",
    html_url: "https://github.com/codedbygunnaj/code-editor",
    homepage: "https://codedbygunnaj.github.io/code-editor",
    language: "JavaScript / React",
    stargazers_count: 11,
    forks_count: 3,
    topics: ["live", "react", "web-compiler", "node", "websockets"],
    category: "live",
    isLive: true,
    isAi: false,
    isSystem: true,
  },
  {
    id: 103,
    name: "portfolio",
    description: "Next-gen 3D glassmorphic developer portfolio built with React 19, Vite, custom cursor canvas, and responsive mobile architecture.",
    html_url: "https://github.com/codedbygunnaj/portfolio",
    homepage: "https://codedbygc.vercel.app",
    language: "JavaScript / React",
    stargazers_count: 8,
    forks_count: 1,
    topics: ["live", "website", "react", "vite", "glassmorphism"],
    category: "live",
    isLive: true,
    isAi: false,
    isSystem: false,
  },
  {
    id: 104,
    name: "SkillSync - AI Resume Analyzer",
    description: "Intelligent NLP-driven resume parsing and skill gap recommendation engine for software engineering candidates.",
    html_url: "https://github.com/codedbygunnaj",
    homepage: "",
    language: "Python / NLP",
    stargazers_count: 6,
    forks_count: 1,
    topics: ["nlp", "ai", "fastapi", "machine-learning"],
    category: "ai",
    isLive: false,
    isAi: true,
    isSystem: true,
  },
  {
    id: 105,
    name: "FastAPI-CRM-Data-Pipeline",
    description: "Automated legacy Excel-to-PostgreSQL ETL data pipeline with dynamic schema synchronization, JWT auth, and RBAC.",
    html_url: "https://github.com/codedbygunnaj",
    homepage: "",
    language: "Python / FastAPI",
    stargazers_count: 9,
    forks_count: 2,
    topics: ["fastapi", "postgresql", "sqlalchemy", "jwt", "etl"],
    category: "system",
    isLive: false,
    isAi: false,
    isSystem: true,
  },
  {
    id: 106,
    name: "Driver-Drowsiness-Detection",
    description: "Real-time facial landmark and eye-aspect-ratio (EAR) computer vision system for alert monitoring and driver safety.",
    html_url: "https://github.com/codedbygunnaj",
    homepage: "",
    language: "Python / OpenCV",
    stargazers_count: 5,
    forks_count: 1,
    topics: ["opencv", "mediapipe", "computer-vision", "real-time", "ai"],
    category: "ai",
    isLive: false,
    isAi: true,
    isSystem: false,
  },
  {
    id: 107,
    name: "MemoryCard Game",
    description: "Interactive React card game emphasizing algorithmic shuffling, dynamic memory state tracking, and fluid transitions.",
    html_url: "https://github.com/codedbygunnaj",
    homepage: "https://codedbygunnaj.github.io/memory-card",
    language: "React",
    stargazers_count: 4,
    forks_count: 1,
    topics: ["live", "react", "frontend", "game"],
    category: "live",
    isLive: true,
    isAi: false,
    isSystem: false,
  },
  {
    id: 108,
    name: "Inventory-Donation-Platform",
    description: "Full-stack resource donation and inventory management system with automated dispatch tracking and analytics.",
    html_url: "https://github.com/codedbygunnaj",
    homepage: "",
    language: "Node.js / Express",
    stargazers_count: 5,
    forks_count: 1,
    topics: ["nodejs", "express", "mongodb", "inventory"],
    category: "system",
    isLive: false,
    isAi: false,
    isSystem: true,
  },
];

// Helper to determine AI relevance
function checkIsAi(repo) {
  const text = `${repo.name || ""} ${repo.description || ""} ${(repo.topics || []).join(" ")}`.toLowerCase();
  return /ai|ml|vision|opencv|mediapipe|drowsiness|skillsync|safewalk|nlp|detection|intelligence|learning|model/i.test(text);
}

export default function Projects() {
  const [allProjects, setAllProjects] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGitHubData() {
      const minLoadTime = new Promise((resolve) => setTimeout(resolve, 1900));

      try {
        const fetchPromise = fetch(
          "https://api.github.com/users/codedbygunnaj/repos?per_page=100&sort=updated"
        ).then((res) => {
          if (!res.ok) throw new Error("GitHub rate limit or network issue");
          return res.json();
        });

        const [repos] = await Promise.all([fetchPromise, minLoadTime]);

        if (Array.isArray(repos) && repos.length > 0) {
          // Normalize and categorize repos
          const processed = repos.map((repo) => {
            const hasLiveTag =
              repo.topics &&
              (repo.topics.includes("live") ||
                repo.topics.includes("website") ||
                repo.topics.includes("deployed"));
            const hasHomepage = Boolean(repo.homepage && repo.homepage.trim() !== "");
            const isLive = hasLiveTag || hasHomepage;
            const isAi = checkIsAi(repo);
            const isSystem = !isLive || (repo.topics && repo.topics.includes("api")) || Boolean(repo.language && ["Python", "C++", "TypeScript"].includes(repo.language));

            let category = "system";
            if (isLive) category = "live";
            else if (isAi) category = "ai";

            return {
              id: repo.id,
              name: repo.name,
              description: repo.description,
              html_url: repo.html_url,
              homepage: repo.homepage || "",
              language: repo.language || "Full Stack",
              stargazers_count: repo.stargazers_count || 0,
              forks_count: repo.forks_count || 0,
              topics: repo.topics || [],
              category,
              isLive,
              isAi,
              isSystem,
              owner: repo.owner,
              default_branch: repo.default_branch || "main",
            };
          });

          // Also ensure key flagship AI & System projects are always represented if not yet on GitHub
          const existingNames = new Set(processed.map((p) => p.name.toLowerCase()));
          const extraProjects = fallbackProjects.filter(
            (fb) => !existingNames.has(fb.name.toLowerCase())
          );

          const merged = [...processed, ...extraProjects];

          // Sort: Live first, then by stars
          merged.sort((a, b) => {
            if (a.isLive && !b.isLive) return -1;
            if (!a.isLive && b.isLive) return 1;
            return b.stargazers_count - a.stargazers_count;
          });

          setAllProjects(merged);
        } else {
          setAllProjects(fallbackProjects);
        }
      } catch {
        await minLoadTime;
        setAllProjects(fallbackProjects);
      } finally {
        setLoading(false);
      }
    }

    fetchGitHubData();
  }, []);

  // Filtered lists
  const filteredProjects = allProjects.filter((p) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "live") return p.isLive;
    if (activeFilter === "systems") return p.isSystem || p.category === "system";
    if (activeFilter === "ai") return p.isAi || p.category === "ai";
    return true;
  });

  const liveCount = allProjects.filter((p) => p.isLive).length;
  const aiCount = allProjects.filter((p) => p.isAi || p.category === "ai").length;
  const systemsCount = allProjects.filter((p) => p.isSystem || p.category === "system").length;

  return (
    <div className="projects-page">
      {/* Header */}
      <div className="projects-header">
        <div className="projects-title-row">
          <h1>Featured Engineering &amp; Projects</h1>
          <span className="code-tag">&lt;production_builds /&gt;</span>
        </div>
        <p className="projects-subtitle">
          Live cloud deployments, scalable backend APIs, AI computer vision models, and architectural systems built by Gunaj Chugh.
        </p>

        {/* Real-Time Telemetry Bar */}
        <div className="telemetry-bar">
          <div className="telemetry-item">
            <span className="pulse-dot"></span>
            <span>Live Deployments: <strong>{liveCount} Active</strong></span>
          </div>
          <div className="telemetry-item">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#facc15" strokeWidth="2.5">
              <polyline points="16 18 22 12 16 6"></polyline>
              <polyline points="8 6 2 12 8 18"></polyline>
            </svg>
            <span>Total Projects: <strong>{allProjects.length || 8} Repositories</strong></span>
          </div>
          <div className="telemetry-item desktop-only">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
            <span>AI &amp; Computer Vision: <strong>{aiCount} Systems</strong></span>
          </div>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="project-filters">
          <button
            className={`filter-btn ${activeFilter === "all" ? "active" : ""}`}
            onClick={() => setActiveFilter("all")}
          >
            All Work ({allProjects.length || 8})
          </button>
          <button
            className={`filter-btn ${activeFilter === "live" ? "active" : ""}`}
            onClick={() => setActiveFilter("live")}
          >
            <span className="filter-dot green"></span>
            Live Currently ({liveCount})
          </button>
          <button
            className={`filter-btn ${activeFilter === "systems" ? "active" : ""}`}
            onClick={() => setActiveFilter("systems")}
          >
            <span className="filter-dot cyan"></span>
            Systems &amp; Full Stack ({systemsCount})
          </button>
          <button
            className={`filter-btn ${activeFilter === "ai" ? "active" : ""}`}
            onClick={() => setActiveFilter("ai")}
          >
            <span className="filter-dot purple"></span>
            AI &amp; Computer Vision ({aiCount})
          </button>
        </div>
      </div>

      {/* 3D AI CYBERPUNK LOADER */}
      {loading ? (
        <AILoader />
      ) : (
        /* Grid of 3D Imprint Cards */
        <div className="projects-grid">
          {filteredProjects.map((repo, index) => {
            const imageUrl = repo.owner
              ? `https://raw.githubusercontent.com/${repo.owner.login}/${repo.name}/${repo.default_branch || "main"}/preview.png`
              : defaultPic;

            const isLive = repo.isLive;
            const isAi = repo.isAi || repo.category === "ai";

            return (
              <Card3D className="project-card" key={repo.id || index}>
                {/* Media Preview Box */}
                <div className="img-wrapper">
                  <img
                    src={imageUrl}
                    onError={(e) => {
                      e.target.src = defaultPic;
                    }}
                    alt={repo.name}
                    loading="lazy"
                  />

                  {/* Top Status Banner */}
                  <div className="card-top-tags">
                    {isLive ? (
                      <span className="category-badge live-badge">
                        <span className="pulse-dot-sm"></span>
                        LIVE DEPLOYMENT
                      </span>
                    ) : isAi ? (
                      <span className="category-badge ai-badge">
                        🤖 AI &amp; CV ENGINE
                      </span>
                    ) : (
                      <span className="category-badge system-badge">
                        ⚡ SYSTEM &amp; API
                      </span>
                    )}

                    <span className="card-index-tag">
                      #{String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Dark Grid Vignette */}
                  <div className="img-grid-overlay"></div>
                </div>

                {/* Card Body Content */}
                <div className="card-content">
                  <div className="project-title-row">
                    <h4 title={repo.name}>
                      <span className="title-prompt">&gt;</span> {repo.name}
                    </h4>

                    {repo.stargazers_count > 0 && (
                      <span className="star-badge">
                        ★ {repo.stargazers_count}
                      </span>
                    )}
                  </div>

                  <p className="project-desc">
                    {repo.description ||
                      "Architected and engineered software system repository by Gunaj Chugh."}
                  </p>

                  {/* Tech Stack Pills */}
                  <div className="project-tech-row">
                    <span className="tech-pill gold">
                      {repo.language || "Full Stack"}
                    </span>

                    {isAi && (
                      <span className="tech-pill purple">
                        #ai-vision
                      </span>
                    )}

                    {repo.topics &&
                      repo.topics.slice(0, 3).map((topic, i) => (
                        <span key={i} className="tech-pill">
                          #{topic}
                        </span>
                      ))}
                  </div>

                  {/* Dual Action Buttons (Always accessible on Mobile & Desktop) */}
                  <div className="card-actions-bar">
                    {repo.homepage ? (
                      <a
                        href={repo.homepage}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-live-preview"
                      >
                        <span>Live Demo</span>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                          <polyline points="15 3 21 3 21 9"></polyline>
                          <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                      </a>
                    ) : null}

                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-source-code"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                      </svg>
                      <span>Code</span>
                    </a>
                  </div>
                </div>
              </Card3D>
            );
          })}
        </div>
      )}
    </div>
  );
}
