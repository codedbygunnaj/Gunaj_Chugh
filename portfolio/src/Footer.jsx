import { getGmailComposeUrl } from "./utils/mailHelper";
import "./footer.css";

export default function Footer() {
  const gmailUrl = getGmailComposeUrl({
    subject: "Engineering Opportunity / Discussion - Gunaj Chugh",
  });
  return (
    <footer className="modern-footer">
      <div className="footer-card card-3d-imprint">
        <div className="footer-main-row">
          <div className="footer-info">
            <h3 className="footer-title">
              Let’s build something <span className="gradient-heading">impactful</span>.
            </h3>
            <p className="footer-subtext">
              Open to high-impact software engineering roles, distributed systems challenges, and ambitious collaborations.
            </p>
          </div>

          <div className="footer-action-block">
            <a
              href={gmailUrl}
              target="_blank"
              rel="noreferrer"
              className="hire-btn"
              title="Compose message directly in Gmail"
            >
              <span>Hire Me / Email</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </a>
          </div>
        </div>

        <div className="footer-bottom-row">
          <div className="footer-social-links">
            <a href="https://github.com/codedbygunnaj" target="_blank" rel="noreferrer" className="tech-pill">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/gunnaj/" target="_blank" rel="noreferrer" className="tech-pill">
              LinkedIn
            </a>
            <a href="https://leetcode.com/codedbygunnaj" target="_blank" rel="noreferrer" className="tech-pill gold">
              LeetCode (350+)
            </a>
          </div>

          <div className="footer-meta">
            <span className="footer-copy">
              &copy; {new Date().getFullYear()} Gunaj Chugh &bull; Full Stack &amp; SDE Intern
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
