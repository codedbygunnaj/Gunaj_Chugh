import { useState, useEffect } from "react";
import "./projects.css"
import defaultPic from "./assets/githubProject.webp";
import { Link } from "react-router-dom";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function loadProjects() {
      const res = await fetch(
        "https://api.github.com/users/codedbygunnaj/repos",
        {
          headers: {
            Accept: "application/vnd.github.mercy-preview+json",
          },
        }
      );
      const data = await res.json();

      const filtered = data
        .filter((repo) => repo.topics && repo.topics.includes("featured"))
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 9);

      setProjects(filtered);
    }

    loadProjects();
  }, []);

  return (
    <>
      <nav className="navbar bg-primary" data-bs-theme="dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">Gunaj Chugh</a>
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

      <div className="container py-5">
        <div className="row" id="projects-container">
          {projects.map((repo) => {
            const imageUrl = `https://raw.githubusercontent.com/${repo.owner.login}/${repo.name}/${repo.default_branch}/preview.png`;

            return (
              <div className="col-md-4 mb-4" key={repo.id}>
                <div className="project-card">

                  <div className="img-wrapper">
                    <img
                      src={imageUrl}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = defaultPic;
                      }}
                      alt={repo.name}
                    />
                    <div className="overlay">
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-light btn-sm"
                      >
                        View Code
                      </a>
                      {repo.homepage && (
                        <a
                          href={repo.homepage}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-success btn-sm ms-2"
                        >
                          Live
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="card-content">
                    <h5>{repo.name}</h5>
                    <p>{repo.description || "No description available"}</p>
                    <span className="badge bg-primary">
                      {repo.language || "C++"}
                    </span>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}