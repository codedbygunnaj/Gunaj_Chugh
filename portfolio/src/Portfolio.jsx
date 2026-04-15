import { useState, useEffect } from "react";
import "./portFolio.css"
import profilePic from "./assets/gunaj_profilePic.jpg";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";

const roles = [
  "Software Engineer",
  "Full Stack Developer",
  "Data Engineer",
  "Generative AI Developer",
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
    <>

      <Navbar />
      <section className="container vh-100 d-flex align-items-center">
        <div className="row w-100">

          {/* Left */}
          <div className="col-md-6 text-center text-md-start">
            <h1 className="fw-bold gunajChugh">Gunaj Chugh</h1>
            <h2 className="fw-bold lead">{displayText}</h2>

            <section className="container py-5" id="about">
              <div className="row align-items-center">

                {/* About text */}
                <div className="col-md-10">
                  <h2>About Me</h2>
                  <p>
                    <strong>Computer Science undergraduate</strong> experienced in developing{" "}
                    <strong>real-time</strong> and <strong>full-stack applications</strong>, with{" "}
                    <em>strong foundations in Data Structures, Algorithms, and backend systems.</em>{" "}
                    <br />
                    Built projects involving <strong>computer vision</strong> and{" "}
                    <strong>API-driven architectures</strong>, with a{" "}
                    <em>focus on efficient, scalable, and low-latency systems</em>. <br />
                    Demonstrated leadership as <strong>Technical Lead</strong>,{" "}
                    <strong>mentoring 25+ developers</strong> and leading engineering initiatives.
                  </p>
                </div>

                {/* Buttons */}
                <div className="col-md-8 text-center">
                  <a
                    href="https://www.linkedin.com/in/gunnaj/"
                    className="btn btn-primary m-2"
                    target="_blank"
                    rel="noreferrer"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="https://github.com/codedbygunnaj"
                    className="btn btn-dark m-2"
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub
                  </a>
                  <a target="_blank" href="https://drive.google.com/file/d/181UpoSgmEd7cajJNiD8eXQE8QhqNyuu6/view?usp=sharing" className="btn btn-outline-primary m-2">Resume</a>
                </div>

              </div>
            </section>
          </div>

          {/* Right */}
          <div className="col-md-6 text-center">
            <img
              src={profilePic}
              className="img-fluid hero-img"
              alt="Gunaj Chugh"
            />
          </div>

        </div>
      </section>
      <section>
        <div className="container py-5" id="skills">
        <h2 className="text-center mb-5 fw-bold">Skills</h2>

        <div className="row g-4">

            {/* Programming */}
            <div className="col-md-4">
            <div className="skill-box">
                <h5>💻 Programming</h5>
                <p>C++ • Python • JavaScript • C</p>
            </div>
            </div>

            {/* Core CS */}
            <div className="col-md-4">
            <div className="skill-box">
                <h5>🧠 Core CS</h5>
                <p>DSA • OOP • OS • DBMS • CN</p>
            </div>
            </div>

            {/* Web */}
            <div className="col-md-4">
            <div className="skill-box">
                <h5>🌐 Web Dev</h5>
                <p>React • Node.js • Express • Flask • REST APIs</p>
            </div>
            </div>

            {/* Databases */}
            <div className="col-md-4">
            <div className="skill-box">
                <h5>🗄️ Databases</h5>
                <p>MySQL • MongoDB • SQLite</p>
            </div>
            </div>

            {/* AI/ML */}
            <div className="col-md-4">
            <div className="skill-box">
                <h5>🤖 AI/ML</h5>
                <p>OpenCV • MediaPipe • NLP • Feature Engineering</p>
            </div>
            </div>

            {/* Tools */}
            <div className="col-md-4">
            <div className="skill-box">
                <h5>🛠️ Tools</h5>
                <p>Git • Linux • Streamlit • UML • Agile</p>
            </div>
            </div>

        </div>
        </div>
    </section>     
    <section>
        <div className="container py-5" id="achievements">
            <h2 className="text-center mb-5 fw-bold">Achievements</h2>

            <div className="row g-4">

                <div className="col-md-4">
                <div className="achievement-card">
                    <h5>🏆 Hackathon Performance</h5>
                    <p>Top 7% (Top 25 out of 350+ teams) in CodeClash 2.0 (GGSIPU)</p>
                </div>
                </div>

                <div className="col-md-4">
                <div className="achievement-card">
                    <h5>💻 Problem Solving</h5>
                    <p>Solved 390+ DSA problems across LeetCode & GeeksforGeeks</p>
                </div>
                </div>

                <div className="col-md-4">
                <div className="achievement-card">
                    <h5>📈 Technical Contribution</h5>
                    <p>Published solutions with 2900+ community views on LeetCode</p>
                </div>
                </div>

                <div className="col-md-4">
                <div className="achievement-card">
                    <h5>🎓 Academic Excellence</h5>
                    <p>Ranked 2nd in Class XII (Science Stream)</p>
                </div>
                </div>

                <div className="col-md-4">
                <div className="achievement-card">
                    <h5>📊 Consistency</h5>
                    <p>Among top 10% in B.Tech CSE batch</p>
                </div>
                </div>

            </div>
            </div>
    </section> 
    <Footer />
    </>
  );
}
