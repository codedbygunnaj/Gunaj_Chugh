import "./experience.css";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Experience() {
  return (
    <>
      <Navbar />
      <div className="container py-5">

        <h1 className="mb-5 text-center">Experience</h1>

        <div className="timeline">

          {/* EXPERIENCE 1 */}
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

          {/* EXPERIENCE 2 */}
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
        
          {/* EXPERIENCE 3 */}
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
      <Footer />
    </>
  );
}