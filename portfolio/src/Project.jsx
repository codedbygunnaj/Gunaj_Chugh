import { useState, useEffect } from "react";
import "./projects.css"
import defaultPic from "./assets/githubProject.webp";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";

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
        <Navbar />
      <div className="container py-5">
        <div className="projects-hero text-center mb-5">
            <h1 className="fw-bold">My Projects</h1>
            <p className="text-muted">
            A collection of my work across Web Development, AI/ML, and Backend Systems.
            </p>

            <div className="d-flex justify-content-center gap-3 mt-3 flex-wrap">
            <span className="badge bg-dark p-2">Full Stack</span>
            <span className="badge bg-primary p-2">AI/ML</span>
            <span className="badge bg-success p-2">Real-time Systems</span>
            </div>
        </div>
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
      <Footer />
    </>
  );
}