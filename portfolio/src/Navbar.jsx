import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
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
        <div className="collapse navbar-collapse show" id="navbarNavDropdown">
            <ul className="navbar-nav">
            <li className="nav-item">
                <Link className="nav-link" to="/">About</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/projects">Projects</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/experience">Experience</Link>
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
                <Link className="dropdown-item" to="/#skills">Skills</Link>
                <Link className="dropdown-item" to="/#achievements">Achievements</Link>
                <li><a className="dropdown-item" target="_blank" href="https://drive.google.com/file/d/181UpoSgmEd7cajJNiD8eXQE8QhqNyuu6/view?usp=sharing">View Resume</a></li>
                <li><a className="dropdown-item" href="/contact">Contact</a></li>
                </ul>
            </li>
            </ul>
        </div>
        </div>
    </nav>
  );
}