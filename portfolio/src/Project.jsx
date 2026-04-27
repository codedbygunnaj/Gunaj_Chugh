import { useState, useEffect } from "react";
import "./projects.css";
import ProfileCard from "./ProfileCard";
import defaultPic from "./assets/githubProject.webp";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function loadProjects() {
      const res = await fetch(
        "https://api.github.com/users/codedbygunnaj/repos"
      );
      const data = await res.json();

      const filtered = data
        .filter((repo) => repo.topics && repo.topics.includes("featured"))
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 8); // 👉 top 6 only (clean UI)

      setProjects(filtered);
    }

    loadProjects();
  }, []);

  return (
    <div className="main-layout">

      {/* Sidebar */}
      <ProfileCard />

      {/* Content */}
      <div className="content">

        {/* Hero */}
          <div className="projects-header">
            <h1>Projects</h1>
            <p>Selected work demonstrating practical problem-solving and system design.</p>
          </div>

        {/* Grid */}
        <div className="projects-grid">
          {projects.map((repo) => {
            const imageUrl = `https://raw.githubusercontent.com/${repo.owner.login}/${repo.name}/${repo.default_branch}/preview.png`;

            return (
              <div className="project-card" key={repo.id}>

                <div className="img-wrapper">
                  <img
                    src={imageUrl}
                    onError={(e) => {
                      e.target.src = defaultPic;
                    }}
                    alt={repo.name}
                  />

                  <div className="overlay">
                    <a href={repo.html_url} target="_blank">Code</a>
                    {repo.homepage && (
                      <a href={repo.homepage} target="_blank">Live</a>
                    )}
                  </div>
                </div>

                <div className="card-content">
                  <h4>{repo.name}</h4>
                  <p>{repo.description || "No description available"}</p>
                  <span>{repo.language || "C++"}</span>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}