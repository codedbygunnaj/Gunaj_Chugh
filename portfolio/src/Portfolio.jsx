import { useState, useEffect } from "react";
import "./portFolio.css";
import ProfileCard from "./ProfileCard";

const roles = [
  "Software Engineer",
  "Full Stack Developer",
  "Data Engineer",
  "AI Developer",
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
      }, 80);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCharIndex(0);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }, 1200);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, roleIndex]);

  return (
    <div className="main-layout">

      <ProfileCard />

      <div className="content">

        {/* HERO */}
        <section className="hero">
          <h1>Gunaj Chugh</h1>
          <h2 className="highlight">{displayText}</h2>
        </section>

        {/* ABOUT */}
        <section className="about">
          <div className="about-card">

            <h2>About Me</h2>

            <p>
              <strong>Computer Science undergraduate</strong> experienced in developing
              <strong> real-time</strong> and <strong> full-stack applications</strong>, with
              <em> strong foundations in Data Structures, Algorithms, and backend systems.</em>
              <br /><br />
              Built projects involving <strong>computer vision</strong> and
              <strong> API-driven architectures</strong>, with a
              <em> focus on efficient, scalable, and low-latency systems</em>.
              <br /><br />
              Demonstrated leadership as <strong>Technical Lead</strong>,
              <strong> mentoring 25+ developers</strong> and leading engineering initiatives.
            </p>

          </div>
        </section>

        {/* WHAT I DO */}
        <section className="what-i-do">
          <h2>What I Do</h2>

          <div className="cards">

            <div className="card">
              <h4>Full Stack Development</h4>
              <p>Building scalable web applications using React, Node.js, and REST APIs.</p>
            </div>

            <div className="card">
              <h4>Backend Engineering</h4>
              <p>Designing efficient systems, databases, and high-performance APIs.</p>
            </div>

            <div className="card">
              <h4>AI & Computer Vision</h4>
              <p>Working on real-time systems using OpenCV and machine learning models.</p>
            </div>

            <div className="card">
              <h4>Problem Solving</h4>
              <p>Strong foundation in DSA with consistent practice and optimization mindset.</p>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}