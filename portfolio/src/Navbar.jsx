import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./navbar.css";

export default function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "About", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Experience", path: "/experience" },
    { name: "Tech Stack", path: "/stack" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="navbar-wrapper">
      <nav className="custom-navbar">
        <div className="nav-container">
          {/* Logo with Terminal Prompt Style */}
          <Link className="nav-logo" to="/" onClick={() => setMobileMenuOpen(false)}>
            <span className="logo-prompt">&gt;</span>
            <span className="logo-text">codedbygc</span>
            <span className="logo-cursor">_</span>
          </Link>

          {/* Desktop Nav Links */}
          <ul className="nav-links desktop-only">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`nav-link-item ${isActive ? "active" : ""}`}
                  >
                    {item.name}
                    {isActive && <span className="active-glow-pill"></span>}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right Status Badge */}
          <div className="nav-actions desktop-only">
            <span className="nav-status-pill">
              <span className="status-dot-sm"></span>
              Open to Roles
            </span>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`mobile-toggle ${mobileMenuOpen ? "open" : ""}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="mobile-menu-dropdown">
            <ul className="mobile-links">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`mobile-link-item ${isActive ? "active" : ""}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
