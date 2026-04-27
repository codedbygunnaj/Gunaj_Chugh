import { Link } from "react-router-dom";
import "./navbar.css";

export default function Navbar() {
  return (
    <nav className="custom-navbar">

      <div className="nav-container">

        {/* Logo */}
        <Link className="nav-logo" to="/">codedbygc</Link>

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

          <li>
            <Link to="/contact">Contact</Link>
          </li>

        </ul>

      </div>

    </nav>
  );
}