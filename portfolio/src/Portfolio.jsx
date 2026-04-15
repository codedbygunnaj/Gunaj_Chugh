import { useState, useEffect } from "react";
import "./portFolio.css"
import profilePic from "./assets/gunaj_profilePic.jpg";
import { Link } from "react-router-dom";

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
      <nav className="navbar bg-primary" data-bs-theme="dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Gunaj Chugh</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">About</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/projects">Projects</Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Experience</a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Additional Information
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">Skills</a></li>
                  <li><a className="dropdown-item" href="#">Achievements</a></li>
                  <li><a className="dropdown-item" href="#">Download Resume</a></li>
                  <li><a className="dropdown-item" href="#">Contact</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>

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
                  <a href="#" className="btn btn-outline-primary m-2">Resume</a>
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
    </>
  );
}
