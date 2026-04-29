import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        <h2>Let’s Connect</h2>

        <p className="footer-subtext">
          Open to collaborations, internships, and building impactful systems.
        </p>

        <div className="footer-links">
          <a href="mailto:gunnajpchugh@gmail.com" className="hire-btn">Hire Me</a>
          <a href="https://www.linkedin.com/in/gunnaj/" target="_blank">LinkedIn</a>
          <a href="https://github.com/codedbygunnaj" target="_blank">GitHub</a>
          <a href="https://leetcode.com/codedbygunnaj" target="_blank">LeetCode</a>
        </div>

        <p className="footer-copy">
          © {new Date().getFullYear()} Gunaj Chugh
        </p>

      </div>

    </footer>
  );
}