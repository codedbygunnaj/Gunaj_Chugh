import { Link } from "react-router-dom";
import "./navbar.css";

export default function Navbar() {
  return (
    <nav className="custom-navbar">

      <div className="nav-container">

        {/* Logo */}
        <Link className="nav-logo" to="/">Gunaj Chugh</Link>

        {/* Links */}
        <ul className="nav-links">

          <li>
            <Link to="/">About</Link>
          </li>

          <li>
            <Link to="/projects">Projects</Link>
          </li>

          <li>
            <Link to="/experience">Experience</Link>
          </li>

          {/* Dropdown */}
          <li className="dropdown">
            <span className="dropbtn">More ▾</span>

            <div className="dropdown-content">
              <Link to="/#skills">Skills</Link>
              <Link to="/#achievements">Achievements</Link>
              <a href="https://drive.google.com" target="_blank" rel="noreferrer">
                Resume
              </a>
              <Link to="/contact">Contact</Link>
            </div>
          </li>

        </ul>

      </div>

    </nav>
  );
}