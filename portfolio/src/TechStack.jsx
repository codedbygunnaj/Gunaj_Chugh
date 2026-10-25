import { useState, useMemo } from "react";
import Card3D from "./components/Card3D";
import "./techStack.css";

// Realistic, resume-accurate tech stack data reflecting Gunaj's verified skills
const techItems = [
  // BACKEND & SYSTEMS
  {
    id: "fastapi",
    name: "FastAPI",
    category: "backend",
    categoryLabel: "Backend & APIs",
    badge: "Core Backend Framework",
    badgeColor: "cyan",
    level: "Primary Framework",
    description:
      "Building RESTful APIs, request validation, database interactions with SQLAlchemy, and business logic for growth features and CRM services.",
    appliedIn: ["Elegant Tech CRM", "Magicpin Backend", "REST Microservices"],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
      </svg>
    ),
  },
  {
    id: "postgresql-sqlalchemy",
    name: "PostgreSQL & SQLAlchemy",
    category: "backend",
    categoryLabel: "Databases & ORM",
    badge: "Primary Relational DB",
    badgeColor: "gold",
    level: "Core Stack",
    description:
      "Relational database schema modeling, dynamic Excel-to-DB sync routines at Elegant Tech, and query optimization for backend services.",
    appliedIn: ["Elegant Tech CRM Pipeline", "Relational Schemas", "Backend Services"],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#facc15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
      </svg>
    ),
  },
  {
    id: "jwt-rbac",
    name: "JWT & Role-Based Access Control",
    category: "backend",
    categoryLabel: "Security & Auth",
    badge: "Auth & Permissions",
    badgeColor: "purple",
    level: "Security",
    description:
      "Implemented stateless JWT token authentication and role-based access control (RBAC) to enforce multi-tier user permissions in production CRM.",
    appliedIn: ["Elegant Tech CRM", "API Auth Gateways", "Protected Endpoints"],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
      </svg>
    ),
  },
  {
    id: "nodejs-express",
    name: "Node.js & Express",
    category: "backend",
    categoryLabel: "Runtime & APIs",
    badge: "Full Stack Runtime",
    badgeColor: "emerald",
    level: "Backend & Microservices",
    description:
      "Asynchronous backend utilities, REST endpoints, and contact telemetry services for full-stack web applications.",
    appliedIn: ["Portfolio Contact Server", "Full Stack Web Apps", "REST APIs"],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16.5 9.4 7.55 4.24a1.78 1.78 0 0 0-1.78 0L2.8 6a1.78 1.78 0 0 0-.89 1.54v8.92a1.78 1.78 0 0 0 .89 1.54l2.97 1.72a1.78 1.78 0 0 0 1.78 0l8.95-5.16a1.78 1.78 0 0 0 .89-1.54V10.94a1.78 1.78 0 0 0-.89-1.54z"></path>
      </svg>
    ),
  },

  // LANGUAGES & ALGORITHMIC CORE
  {
    id: "cpp",
    name: "C++ (STL & Algorithmic Core)",
    category: "languages",
    categoryLabel: "Systems & Algorithms",
    badge: "600+ DSA & 350+ LeetCode",
    badgeColor: "gold",
    level: "Algorithmic Foundations",
    description:
      "Strong problem-solving foundation in Data Structures and Algorithms with 600+ problems solved across LeetCode and GeeksforGeeks.",
    appliedIn: ["LeetCode (350+ Solved)", "GeeksforGeeks", "Competitive Coding"],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#facc15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
      </svg>
    ),
  },
  {
    id: "python",
    name: "Python 3",
    category: "languages",
    categoryLabel: "Backend & Scripting",
    badge: "Primary Language",
    badgeColor: "cyan",
    level: "Core Development",
    description:
      "Primary language for backend engineering (FastAPI), data ingestion scripts, API services, and computer vision models.",
    appliedIn: ["FastAPI CRM Engine", "Magicpin Backend", "OpenCV / AI Models"],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14h2v2h-2zm0-10h2v8h-2z"></path>
      </svg>
    ),
  },
  {
    id: "javascript-typescript",
    name: "JavaScript (ES6+) & TypeScript",
    category: "languages",
    categoryLabel: "Web & Full Stack",
    badge: "Modern Web Core",
    badgeColor: "emerald",
    level: "Frontend & Full Stack",
    description:
      "Modern ES6+, async/await flows, typed interfaces, dynamic DOM events, and client-server REST communication.",
    appliedIn: ["React Dashboards", "Interactive UI", "Web Applications"],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="4"></rect>
        <line x1="8" y1="16" x2="8" y2="12"></line>
        <line x1="16" y1="16" x2="16" y2="8"></line>
      </svg>
    ),
  },
  {
    id: "sql",
    name: "SQL & Query Optimization",
    category: "languages",
    categoryLabel: "Database Querying",
    badge: "Relational Querying",
    badgeColor: "gold",
    level: "Databases",
    description:
      "Writing structured joins, aggregations, schema normalization, indexing, and querying relational data in PostgreSQL.",
    appliedIn: ["PostgreSQL Schemas", "Backend Queries", "Data Normalization"],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#facc15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
      </svg>
    ),
  },

  // FRONTEND & DATA VISUALIZATION
  {
    id: "react",
    name: "React (React 19 & Hooks)",
    category: "frontend",
    categoryLabel: "Frontend Architecture",
    badge: "Full Stack Frontend",
    badgeColor: "cyan",
    level: "Frontend Core",
    description:
      "Building responsive dashboards, state management, modular components, and real-time UI interactions.",
    appliedIn: ["Elegant Tech CRM", "Social[CX]", "SafeWalk", "Code Editor"],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="2"></circle>
        <path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"></path>
      </svg>
    ),
  },
  {
    id: "recharts",
    name: "Recharts & Analytics Dashboards",
    category: "frontend",
    categoryLabel: "Data Visualization",
    badge: "Analytics Dashboards",
    badgeColor: "purple",
    level: "Data Visualization",
    description:
      "Interactive charts and metric dashboards visualizing CRM KPIs, revenue trends, and user analytics.",
    appliedIn: ["Elegant Tech Analytics", "Social[CX] Dashboards"],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"></line>
        <line x1="12" y1="20" x2="12" y2="4"></line>
        <line x1="6" y1="20" x2="6" y2="14"></line>
      </svg>
    ),
  },
  {
    id: "vite-css",
    name: "Vite & Responsive UI Design",
    category: "frontend",
    categoryLabel: "Modern Styling & Bundling",
    badge: "Fast Bundling & Modern CSS",
    badgeColor: "emerald",
    level: "Modern Web UI",
    description:
      "Modern CSS variables, flex/grid layouts, responsive breakpoints, tactile 3D perspective physics, and lightning-fast Vite tooling.",
    appliedIn: ["Production Portfolio", "Interactive Canvas Physics", "Mobile Responsive UI"],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
        <path d="M12 22V12"></path>
      </svg>
    ),
  },

  // DATA PIPELINES & CLOUD (HONEST, GROUNDED PROFILE)
  {
    id: "etl-pipelines",
    name: "Data Ingestion & Excel Sync Pipeline",
    category: "cloud",
    categoryLabel: "Data Engineering",
    badge: "Data Ingestion & Sync",
    badgeColor: "gold",
    level: "Data Processing",
    description:
      "Engineered automated data ingestion parsing irregular Excel sheets into structured PostgreSQL tables at Elegant Tech; learning transaction computation flows.",
    appliedIn: ["Elegant Tech Excel Sync", "Data Ingestion", "Schema Normalization"],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#facc15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="6" y1="3" x2="6" y2="15"></line>
        <circle cx="18" cy="6" r="3"></circle>
        <circle cx="6" cy="18" r="3"></circle>
        <path d="M18 9a9 9 0 0 1-9 9"></path>
      </svg>
    ),
  },
  {
    id: "databricks-fabric",
    name: "Databricks & Microsoft Fabric",
    category: "cloud",
    categoryLabel: "Cloud Analytics & Migration",
    badge: "Cloud & Migration Focus",
    badgeColor: "cyan",
    level: "Team Stack & Tooling",
    description:
      "Ramping up on cloud data lakehouses and migration workflows from GCP to Azure as part of the Magicpin backend team's planned modernization.",
    appliedIn: ["Magicpin (Upcoming Migration)", "Data Analytics", "Azure Stack"],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
        <path d="M2 17l10 5 10-5"></path>
        <path d="M2 12l10 5 10-5"></path>
      </svg>
    ),
  },
  {
    id: "azure-gcp",
    name: "Azure & Google Cloud Platform",
    category: "cloud",
    categoryLabel: "Cloud Platforms",
    badge: "Cloud Platforms",
    badgeColor: "cyan",
    level: "Cloud Infrastructure",
    description:
      "Understanding cloud deployment environments, service provisioning, and backend infrastructure transition from GCP to Azure.",
    appliedIn: ["Magicpin Cloud Stack", "Cloud Services", "Staging Environments"],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path>
      </svg>
    ),
  },

  // AI & COMPUTER VISION
  {
    id: "opencv-mediapipe",
    name: "OpenCV & MediaPipe",
    category: "ai",
    categoryLabel: "Computer Vision & ML",
    badge: "Computer Vision Projects",
    badgeColor: "purple",
    level: "Applied AI / CV",
    description:
      "Real-time facial landmark tracking and eye aspect ratio (EAR) drowsiness inference for computer vision safety applications.",
    appliedIn: ["Driver Drowsiness System", "SafeWalk AI", "Real-Time Inference"],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"></circle>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
      </svg>
    ),
  },
  {
    id: "nlp-sentiment",
    name: "NLP & Sentiment Analysis",
    category: "ai",
    categoryLabel: "Natural Language Processing",
    badge: "Text Analytics",
    badgeColor: "purple",
    level: "Applied Intelligence",
    description:
      "Text sentiment scoring, resume skill extraction heuristics (SkillSync), and post-inspection workflows for social analytics.",
    appliedIn: ["Social[CX] Analytics", "SkillSync AI Analyser"],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
    ),
  },

  // DEVOPS & DEVELOPER TOOLING
  {
    id: "docker",
    name: "Docker & Containerization",
    category: "devops",
    categoryLabel: "DevOps & Containers",
    badge: "Containerization",
    badgeColor: "cyan",
    level: "DevOps Tooling",
    description:
      "Writing Dockerfiles and container configurations for environment parity across local development and deployments.",
    appliedIn: ["Container Setup", "Dev Environments"],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
        <path d="M6 9h12v8H6z"></path>
        <line x1="9" y1="9" x2="9" y2="17"></line>
        <line x1="15" y1="9" x2="15" y2="17"></line>
      </svg>
    ),
  },
  {
    id: "git-github",
    name: "Git, GitHub & Team Workflows",
    category: "devops",
    categoryLabel: "Version Control",
    badge: "Version Control",
    badgeColor: "emerald",
    level: "Daily Driver",
    description:
      "Git branching workflows, PR reviews, merge conflict resolution, and collaborative project development as Technical Lead.",
    appliedIn: ["Magicpin Repos", "Elegant Tech Team", "Mentoring 25+ Developers"],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="18" r="3"></circle>
        <circle cx="6" cy="6" r="3"></circle>
        <path d="M13 6h3a2 2 0 0 1 2 2v7"></path>
        <line x1="6" y1="9" x2="6" y2="21"></line>
      </svg>
    ),
  },
  {
    id: "linux-bash",
    name: "Linux, Bash & Postman",
    category: "devops",
    categoryLabel: "Systems & API Testing",
    badge: "Systems & API Testing",
    badgeColor: "gold",
    level: "Daily Driver",
    description:
      "Linux CLI environments, shell scripting for task automation, and Postman API contract testing & documentation.",
    appliedIn: ["Development Environments", "API Testing", "Shell Scripting"],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#facc15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="4 17 10 11 4 5"></polyline>
        <line x1="12" y1="19" x2="20" y2="19"></line>
      </svg>
    ),
  },
];

const categories = [
  { id: "all", label: "All Stacks" },
  { id: "backend", label: "Backend & Systems" },
  { id: "languages", label: "Languages & DSA" },
  { id: "frontend", label: "Frontend & Visualization" },
  { id: "cloud", label: "Cloud & Data Ingestion" },
  { id: "ai", label: "AI & Computer Vision" },
  { id: "devops", label: "DevOps & Tooling" },
];

export default function TechStack() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = useMemo(() => {
    return techItems.filter((item) => {
      const matchesCategory =
        activeCategory === "all" || item.category === activeCategory;

      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;

      const matchesSearch =
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.categoryLabel.toLowerCase().includes(q) ||
        item.appliedIn.some((tag) => tag.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="tech-stack-page">
      {/* PAGE HEADER */}
      <section className="stack-header">
        <div className="stack-title-row">
          <h1>Tech Stack & Tooling</h1>
          <span className="code-tag">&lt;engineering_matrix /&gt;</span>
        </div>
        <p className="stack-subtitle">
          Core languages, backend frameworks, relational databases, and developer tooling
          utilized across software internships, real-world full-stack systems, and algorithmic problem-solving.
        </p>

        {/* Grounded Telemetry Bar */}
        <div className="stack-telemetry-bar">
          <div className="stack-telemetry-item">
            <span className="telemetry-dot live"></span>
            <span>Current Role: <strong>SDE Intern @ Magicpin (Oct 2026–Present)</strong></span>
          </div>
          <div className="stack-telemetry-item">
            <span className="telemetry-dot cyan"></span>
            <span>Core Focus: <strong>Backend APIs &amp; Full-Stack Systems</strong></span>
          </div>
          <div className="stack-telemetry-item">
            <span className="telemetry-dot gold"></span>
            <span>Foundations: <strong>600+ DSA &bull; 350+ LeetCode</strong></span>
          </div>
        </div>
      </section>

      {/* VERIFIED PROJECTS & SYSTEMS HIGHLIGHT */}
      <section className="architecture-showcase-section">
        <Card3D className="architecture-showcase-card">
          <div className="showcase-header">
            <div className="showcase-badge">
              <span className="pulse-dot"></span>
              <span>Engineering Highlights &amp; Systems</span>
            </div>
            <span className="showcase-tag">Verified Internship Systems</span>
          </div>

          <div className="showcase-grid">
            {/* Project 1: Elegant Technologies Full-Stack CRM (Genuinely built end-to-end) */}
            <div className="showcase-pillar">
              <div className="pillar-header">
                <span className="pillar-num">01</span>
                <div>
                  <h4 className="pillar-title">Full-Stack CRM &amp; Dynamic Data Pipeline</h4>
                  <span className="pillar-sub">Elegant Technologies &bull; Aug–Sep 2026</span>
                </div>
              </div>
              <p className="pillar-desc">
                Built an end-to-end CRM backend using FastAPI, SQLAlchemy, and PostgreSQL. Created an automated data pipeline that parses irregular legacy Excel files and syncs schemas dynamically. Built RBAC/JWT authentication and Recharts dashboards.
              </p>
              <div className="pillar-tags">
                <span className="tech-pill">FastAPI</span>
                <span className="tech-pill gold">PostgreSQL</span>
                <span className="tech-pill gold">SQLAlchemy</span>
                <span className="tech-pill">React</span>
                <span className="tech-pill purple">JWT &amp; RBAC</span>
                <span className="tech-pill purple">Recharts</span>
              </div>
            </div>

            {/* Project 2: Magicpin Backend Engineering (Grounded SDE Intern onboarding) */}
            <div className="showcase-pillar">
              <div className="pillar-header">
                <span className="pillar-num">02</span>
                <div>
                  <h4 className="pillar-title">Backend Engineering &amp; Growth Services</h4>
                  <span className="pillar-sub">Magicpin &bull; SDE Intern (Oct 2026–Present)</span>
                </div>
              </div>
              <p className="pillar-desc">
                Contributing as an SDE intern to backend services powering growth, coupon distribution, and cashback. Exploring production codebases, optimizing database queries, and ramping up on the team's planned cloud migration workflows from GCP to Azure.
              </p>
              <div className="pillar-tags">
                <span className="tech-pill cyan">FastAPI / Python</span>
                <span className="tech-pill gold">PostgreSQL</span>
                <span className="tech-pill">Backend APIs</span>
                <span className="tech-pill cyan">GCP &amp; Azure (Migration Focus)</span>
              </div>
            </div>
          </div>
        </Card3D>
      </section>

      {/* INTERACTIVE CONTROLS: CATEGORIES & SEARCH */}
      <section className="stack-controls">
        <div className="category-tabs">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                className={`category-tab-btn ${isActive ? "active" : ""}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        <div className="search-and-count">
          <div className="search-box-wrapper">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              className="stack-search-input"
              placeholder="Search tech, e.g. FastAPI, PostgreSQL, C++, React..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                className="clear-search-btn"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
              >
                &times;
              </button>
            )}
          </div>

          <div className="stack-count-badge">
            <span>Showing <strong>{filteredItems.length}</strong> of {techItems.length} skills</span>
          </div>
        </div>
      </section>

      {/* TECH CARDS 3D GRID */}
      <section className="tech-grid">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <Card3D key={item.id} className="tech-card">
              <div className="tech-card-top">
                <div className="tech-icon-box">{item.icon}</div>
                <div className="tech-card-meta">
                  <span className={`tech-badge ${item.badgeColor || "default"}`}>
                    {item.badge}
                  </span>
                  <span className="tech-category-label">{item.categoryLabel}</span>
                </div>
              </div>

              <h3 className="tech-name">{item.name}</h3>
              <p className="tech-desc">{item.description}</p>

              <div className="tech-card-footer">
                <div className="applied-label">
                  <span className="terminal-arrow">&gt;</span> Applied in:
                </div>
                <div className="applied-tags">
                  {item.appliedIn.map((tag, idx) => (
                    <span key={idx} className="applied-pill">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Card3D>
          ))
        ) : (
          <div className="no-stack-match">
            <span className="no-match-icon">&#9888;</span>
            <p>No technologies matched your filter criteria <code>"{searchQuery}"</code>.</p>
            <button
              className="reset-filter-btn"
              onClick={() => {
                setActiveCategory("all");
                setSearchQuery("");
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
