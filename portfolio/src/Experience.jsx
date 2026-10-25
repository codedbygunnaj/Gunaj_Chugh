import Card3D from "./components/Card3D";
import "./experience.css";

const experiences = [
  {
    role: "Software Development Intern",
    company: "Magicpin",
    time: "October, 2026 - Present",
    current: true,
    summary:
      "Working on backend engineering, data-driven systems, and product features driving user growth, transactions, and cloud infrastructure modernization.",
    bullets: [
      "Developed and maintained backend APIs, optimized database queries, and implemented core business logic for growth, coupons, and cashback services",
      "Contributed to financial and transactional workflows, handling chargebacks and Gross Merchandise Value (GMV) computation pipelines",
      "Participated in the cloud migration from GCP to Azure, building and managing migration-related workflows using Databricks and Microsoft Fabric",
      "Debugged production issues, analyzed legacy codebases, and collaborated cross-functionally to deliver scalable product enhancements",
    ],
    tech: ["Databricks", "Microsoft Fabric", "Azure", "GCP", "FastAPI / APIs", "PostgreSQL", "GMV Pipelines"],
  },
  {
    role: "Software Development Intern",
    company: "Elegant Technologies",
    time: "August, 2026 - September, 2026",
    current: false,
    summary:
      "Built a full-stack CRM platform using React, FastAPI, and PostgreSQL to streamline business operations, data processing, and user management.",
    bullets: [
      "Architected and implemented secure RESTful APIs using FastAPI and SQLAlchemy, integrating JWT authentication and role-based access control (RBAC)",
      "Engineered an automated data pipeline to parse inconsistent legacy Excel files, dynamically sync schemas, and ingest structured records into PostgreSQL",
      "Developed interactive analytics dashboards in React using Recharts, visualizing key CRM metrics and business insights",
      "Delivered end-to-end full-stack integration, managed relational database schemas, and followed clean code practices for maintainability",
    ],
    tech: ["React", "FastAPI", "PostgreSQL", "SQLAlchemy", "JWT / RBAC", "Recharts", "ETL Pipeline"],
  },
  {
    role: "Product Developement Intern",
    company: "Social[CX]",
    time: "May, 2026 - Present",
    current: false,
    summary:
      "Working on product development, debugging, and feature enhancement for a scalable social media analytics platform.",
    bullets: [
      "Improved frontend components and fixed UI/UX inconsistencies across dashboards",
      "Worked on sentiment-analysis related modules and post-inspection workflows",
      "Debugged performance issues, API integration flows, and infinite-scroll behavior",
      "Collaborated with the development team on production-level feature updates",
    ],
    tech: ["React", "Sentiment Analysis", "REST APIs", "UI/UX", "Dashboard Workflows"],
  },
  {
    role: "Technical Lead",
    company: "CICE",
    time: "May, 2025 - June, 2026",
    current: false,
    summary:
      "Leading technical initiatives and mentoring 25+ students in development and project building.",
    bullets: [
      "Organized technical workshops & coding sessions",
      "Guided teams in building real-world projects",
      "Managed event execution and technical planning",
    ],
    tech: ["Engineering Leadership", "Technical Workshops", "Project Mentorship", "Agile Execution"],
  },
  {
    role: "AI/ML Developer",
    company: "Specialization",
    time: "2025 - Present",
    current: false,
    summary:
      "Exploring machine learning, computer vision, and deep learning architectures.",
    bullets: [
      "Driver drowsiness detection system",
      "AI Resume Analyser (SkillSync)",
      "Worked with OpenCV & ML models",
      "Focused on real-time inference systems",
    ],
    tech: ["OpenCV", "MediaPipe", "Computer Vision", "NLP", "Real-Time Inference"],
  },
  {
    role: "Full Stack Developer",
    company: "Projects",
    time: "2024 - Present",
    current: false,
    summary:
      "Built scalable applications involving backend systems, APIs, and real-time features.",
    bullets: [
      "Developed SafeWalk (AI-based safety app)",
      "Developed Online Code-Editor Platform",
      "Developed MemoryCard (React Based Game)",
      "Worked on inventory & donation platforms",
      "Integrated APIs, databases, and authentication",
    ],
    tech: ["React", "Node.js", "Express", "MongoDB", "REST APIs", "System Architecture"],
  },
];

export default function Experience() {
  return (
    <div className="experience-page">
      {/* Header */}
      <div className="exp-header">
        <div className="exp-title-row">
          <h1>Experience</h1>
          <span className="code-tag">&lt;career_timeline /&gt;</span>
        </div>
        <p className="exp-subtitle">
          My engineering journey building production systems, migrating cloud data stacks, and solving real-world challenges.
        </p>
      </div>

      {/* Cyber Timeline Spine */}
      <div className="timeline">
        {experiences.map((exp, index) => (
          <div className="timeline-item" key={index}>
            {/* Glowing 3D Node Dot */}
            <div className={`timeline-node ${exp.current ? "current-node" : ""}`}>
              <div className="node-core"></div>
              {exp.current && <div className="node-pulse"></div>}
            </div>

            {/* 3D Imprint Card */}
            <Card3D className="timeline-content-card">
              <div className="timeline-card-header">
                <div>
                  <h4 className="exp-role-title">
                    {exp.role}{" "}
                    <span className="exp-company-separator">&bull;</span>{" "}
                    <span className="exp-company-name">{exp.company}</span>
                  </h4>
                  <div className="time-badge">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    <span>{exp.time}</span>
                    {exp.current && <span className="current-pill">Current</span>}
                  </div>
                </div>
              </div>

              <p className="exp-summary">{exp.summary}</p>

              <ul className="exp-bullet-list">
                {exp.bullets.map((bullet, bIndex) => (
                  <li key={bIndex}>
                    <span className="bullet-marker">&gt;</span>
                    <span className="bullet-text">{bullet}</span>
                  </li>
                ))}
              </ul>

              {/* Tech Pills */}
              <div className="exp-tech-row">
                {exp.tech.map((t, tIndex) => (
                  <span key={tIndex} className="tech-pill">
                    {t}
                  </span>
                ))}
              </div>
            </Card3D>
          </div>
        ))}
      </div>
    </div>
  );
}
