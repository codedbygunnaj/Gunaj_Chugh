import { useState, useEffect } from "react";
import Card3D from "./components/Card3D";
import "./portFolio.css";

const roles = [
  "Software Engineer",
  "Full Stack Developer",
  "Backend Engineer",
  "Data Engineer",
  "AI Developer",
];

const techStack = [
  { name: "Python", type: "gold" },
  { name: "C++", type: "gold" },
  { name: "FastAPI", type: "cyan" },
  { name: "React", type: "cyan" },
  { name: "PostgreSQL", type: "gold" },
  { name: "SQLAlchemy", type: "" },
  { name: "JavaScript / TypeScript", type: "" },
  { name: "REST APIs", type: "" },
  { name: "Docker", type: "" },
  { name: "Git", type: "" },
];

export default function Portfolio() {
  const [displayText, setDisplayText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentText = roles[roleIndex];

    if (charIndex < currentText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(currentText.substring(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      }, 75);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCharIndex(0);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }, 1400);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, roleIndex]);

  return (
    <div className="portfolio-content">
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="live-status-badge">
          <span className="pulse-dot"></span>
          <span>SDE Intern @ Magicpin &bull; Open to High-Impact Opportunities</span>
        </div>

        <h1 className="hero-name">
          Gunaj <span className="gradient-heading">Chugh</span>
        </h1>

        <div className="typewriter-container">
          <span className="typewriter-prefix">&gt; </span>
          <span className="typewriter-text">{displayText}</span>
          <span className="typewriter-cursor">_</span>
        </div>

        {/* Tech Stack Marquee / Pills */}
        <div className="tech-stack-row">
          {techStack.map((tech) => (
            <span key={tech.name} className={`tech-pill ${tech.type}`}>
              {tech.name}
            </span>
          ))}
        </div>
      </section>

      {/* ABOUT ME SECTION WITH 3D CARD */}
      <section className="about-section">
        <Card3D className="about-card-3d">
          <div className="card-header-row">
            <h2>About Me</h2>
            <span className="code-tag">&lt;overview /&gt;</span>
          </div>

          <p className="about-lead">
            <strong>Computer Science undergraduate</strong> experienced in developing{" "}
            <strong>real-time</strong> and <strong>full-stack applications</strong>, with{" "}
            <em>strong foundations in Data Structures, Algorithms, and backend systems</em>.
          </p>

          <p className="about-lead">
            Experienced in building <strong>full-stack web applications</strong>,{" "}
            <strong>RESTful backend APIs</strong>, and <strong>automated data pipelines</strong>, with a{" "}
            <em>focus on clean architecture, relational database schemas, and efficient problem solving</em>.
          </p>

          <p className="about-lead">
            Demonstrated engineering leadership as <strong>Technical Lead</strong>,{" "}
            <strong>mentoring 25+ developers</strong> and guiding production project implementations.
          </p>

          {/* Quick Metrics Bar - Updated with verified 600+ DSA and 350+ LeetCode */}
          <div className="metrics-grid">
            <div className="metric-box">
              <span className="metric-number">600+</span>
              <span className="metric-label">DSA Solved</span>
            </div>
            <div className="metric-box">
              <span className="metric-number">350+</span>
              <span className="metric-label">LeetCode Qs</span>
            </div>
            <div className="metric-box">
              <span className="metric-number">3+</span>
              <span className="metric-label">SDE Internships</span>
            </div>
            <div className="metric-box">
              <span className="metric-number">25+</span>
              <span className="metric-label">Developers Mentored</span>
            </div>
            <div className="metric-box">
              <span className="metric-number">Top 7%</span>
              <span className="metric-label">CodeClash Hackathon</span>
            </div>
          </div>
        </Card3D>
      </section>

      {/* WHAT I DO SECTION WITH 3D IMPRINT CARDS */}
      <section className="what-i-do-section">
        <div className="section-title-row">
          <h2>What I Do</h2>
          <span className="section-subtitle">Core engineering disciplines & system design focus</span>
        </div>

        <div className="services-grid">
          {/* Card 1 */}
          <Card3D className="service-card">
            <div className="service-icon-wrapper">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#facc15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6"></polyline>
                <polyline points="8 6 2 12 8 18"></polyline>
              </svg>
            </div>
            <h4>Full Stack Engineering</h4>
            <p>
              Designing and building responsive web applications using React, modern JavaScript/TypeScript, and scalable RESTful microservices.
            </p>
            <div className="card-pills">
              <span className="tech-pill">React</span>
              <span className="tech-pill">Node.js</span>
              <span className="tech-pill">FastAPI</span>
            </div>
          </Card3D>

          {/* Card 2 */}
          <Card3D className="service-card">
            <div className="service-icon-wrapper">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
                <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
              </svg>
            </div>
            <h4>Backend & Data Engineering</h4>
            <p>
              Developing robust APIs, relational database schemas, and data pipelines using FastAPI, PostgreSQL, SQLAlchemy, and modern cloud services.
            </p>
            <div className="card-pills">
              <span className="tech-pill cyan">FastAPI</span>
              <span className="tech-pill cyan">PostgreSQL</span>
              <span className="tech-pill cyan">Python</span>
            </div>
          </Card3D>

          {/* Card 3 */}
          <Card3D className="service-card">
            <div className="service-icon-wrapper">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </svg>
            </div>
            <h4>AI & Computer Vision</h4>
            <p>
              Engineering computer vision systems and ML-integrated applications with real-time inference using OpenCV, MediaPipe, and NLP models.
            </p>
            <div className="card-pills">
              <span className="tech-pill">OpenCV</span>
              <span className="tech-pill">Python</span>
              <span className="tech-pill">Inference</span>
            </div>
          </Card3D>

          {/* Card 4 */}
          <Card3D className="service-card">
            <div className="service-icon-wrapper">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="4 17 10 11 4 5"></polyline>
                <line x1="12" y1="19" x2="20" y2="19"></line>
              </svg>
            </div>
            <h4>Algorithmic Problem Solving</h4>
            <p>
              Strong computer science foundations in Data Structures and Algorithms with 600+ problems solved across platforms, including 350+ on LeetCode and GeeksforGeeks.
            </p>
            <div className="card-pills">
              <span className="tech-pill gold">600+ DSA</span>
              <span className="tech-pill gold">350+ LeetCode</span>
              <span className="tech-pill gold">C++</span>
              <span className="tech-pill gold">System Design</span>
            </div>
          </Card3D>
        </div>
      </section>
    </div>
  );
}
