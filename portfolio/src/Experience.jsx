import "./experience.css";
import ProfileCard from "./profileCard";

export default function Experience() {
  return (
    <div className="main-layout">

      {/* Sidebar */}
      <ProfileCard />

      {/* Content */}
      <div className="content">

        {/* Header */}
        <div className="exp-header">
          <h1>Experience</h1>
          <p>My journey building systems, leading teams, and solving real-world problems.</p>
        </div>

        {/* Timeline */}
        <div className="timeline">

          <div className="timeline-item">
            <div className="timeline-content">
              <h4>Technical Lead - CICE</h4>
              <span className="time">2025 - Present</span>
              <p>
                Leading technical initiatives and mentoring 25+ students in
                development and project building.
              </p>
              <ul>
                <li>Organized technical workshops & coding sessions</li>
                <li>Guided teams in building real-world projects</li>
                <li>Managed event execution and technical planning</li>
              </ul>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-content">
              <h4>AI/ML Developer</h4>
              <span className="time">2025 - Present</span>
              <p>
                Exploring machine learning, computer vision, and deep learning.
              </p>
              <ul>
                <li>Driver drowsiness detection system</li>
                <li>AI Resume Analyser (SkillSync)</li>
                <li>Worked with OpenCV & ML models</li>
                <li>Focused on real-time inference systems</li>
              </ul>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-content">
              <h4>Full Stack Developer (Projects)</h4>
              <span className="time">2024 - Present</span>
              <p>
                Built scalable applications involving backend systems,
                APIs, and real-time features.
              </p>
              <ul>
                <li>Developed SafeWalk (AI-based safety app)</li>
                <li>Developed Online Code-Editor Platform</li>
                <li>Developed MemoryCard (React Based Game)</li>
                <li>Worked on inventory & donation platforms</li>
                <li>Integrated APIs, databases, and authentication</li>
              </ul>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}