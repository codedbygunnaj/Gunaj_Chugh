import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer mt-5">
      <div className="container text-center">

        <h5 className="mb-3">Let’s Connect</h5>

        <div className="footer-links">

          <a href="mailto:gunnajpchugh@gmail.com">
            Email
          </a>

          <a href="https://www.linkedin.com/in/gunnaj/" target="_blank" rel="noreferrer">
            LinkedIn
          </a>

          <a href="https://github.com/codedbygunnaj" target="_blank" rel="noreferrer">
            GitHub
          </a>

          <a href="https://leetcode.com/codedbygunnaj" target="_blank" rel="noreferrer">
            LeetCode
          </a>

        </div>

        {/* <p className="mt-3 small text-muted"> */}
        <p className="mt-3 small primary">
          © {new Date().getFullYear()} Gunaj Chugh
        </p>

      </div>
    </footer>
  );
}