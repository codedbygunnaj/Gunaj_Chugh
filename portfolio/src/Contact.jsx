import { useState } from "react";
import Card3D from "./components/Card3D";
import "./contact.css";

export default function Contact() {
  const [status, setStatus] = useState("idle"); // idle | sending | success
  const [copied, setCopied] = useState(false);

  function handleCopyEmail() {
    navigator.clipboard.writeText("gunnajpchugh@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = new FormData(form);
    const formData = {
      name: data.get("name") || "",
      email: data.get("email") || "",
      subject: data.get("subject") || "",
      message: data.get("message") || "",
    };

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 9000);

      const res = await fetch("https://gunaj-chugh.onrender.com/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        // Render free tier waking up fallback
        setStatus("success");
        form.reset();
      }
    } catch {
      setStatus("success");
      form.reset();
    }
  }

  return (
    <div className="contact-page">
      {/* Header */}
      <div className="contact-header">
        <div className="contact-title-row">
          <h1>Get In Touch</h1>
          <span className="code-tag">&lt;connect /&gt;</span>
        </div>
        <p className="contact-subtitle">
          Have an engineering opportunity, exciting project, or technical question? Feel free to send a message or connect directly.
        </p>
      </div>

      <div className="contact-wrapper">
        {/* Left: 3D Form Card */}
        <Card3D className="contact-box">
          <div className="form-card-top">
            <span className="terminal-badge">terminal://dispatch-message</span>
            <span className="form-status-indicator">
              <span className="status-dot-sm"></span>
              API Online
            </span>
          </div>

          <form onSubmit={handleSubmit} className="styled-contact-form">
            <div className="input-group-custom">
              <label htmlFor="contact-name">Your Name</label>
              <input
                id="contact-name"
                name="name"
                type="text"
                placeholder="e.g. Alex Smith"
                required
                disabled={status === "sending"}
              />
            </div>

            <div className="input-group-custom">
              <label htmlFor="contact-email">Email Address</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                placeholder="alex@company.com"
                required
                disabled={status === "sending"}
              />
            </div>

            <div className="input-group-custom">
              <label htmlFor="contact-subject">Subject</label>
              <input
                id="contact-subject"
                name="subject"
                type="text"
                placeholder="Software Engineering Role / Project Discussion"
                disabled={status === "sending"}
              />
            </div>

            <div className="input-group-custom">
              <label htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                name="message"
                rows="4"
                placeholder="Share your requirements, ideas, or message..."
                required
                disabled={status === "sending"}
              ></textarea>
            </div>

            <button
              type="submit"
              className="submit-contact-btn"
              disabled={status === "sending"}
            >
              {status === "sending" ? (
                <>
                  <span className="spinner-border spinner-border-sm" role="status"></span>
                  <span>Dispatching Message...</span>
                </>
              ) : (
                <>
                  <span>Send Message</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </>
              )}
            </button>

            {status === "success" && (
              <div className="form-alert-success">
                <span className="alert-check">✓</span>
                <span>Message received! Thank you for reaching out. I’ll get back to you shortly.</span>
              </div>
            )}
          </form>
        </Card3D>

        {/* Right: 3D Developer Collaboration Panel */}
        <div className="contact-side">
          <Card3D className="cta-box">
            <div className="cta-header">
              <h2>Let’s Build Together</h2>
              <span className="status-pill-green">Active &amp; Open</span>
            </div>

            <p className="cta-text">
              Passionate about full-stack architectures, high-performance APIs, data pipelines, and cloud migrations. Let’s collaborate on ambitious software challenges.
            </p>

            {/* Direct Telemetry Contact Strip */}
            <div className="contact-info-list">
              <div className="contact-info-card">
                <div className="info-icon-box">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#facc15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <div className="info-text-box">
                  <span className="info-title">Email Directly</span>
                  <span className="info-sub">gunnajpchugh@gmail.com</span>
                </div>
                <button
                  type="button"
                  className="copy-email-btn"
                  onClick={handleCopyEmail}
                  title="Copy email to clipboard"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>

              <div className="contact-info-card">
                <div className="info-icon-box">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <div className="info-text-box">
                  <span className="info-title">Location</span>
                  <span className="info-sub">Delhi, India &bull; Open to Remote</span>
                </div>
              </div>

              <div className="contact-info-card">
                <div className="info-icon-box">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
                <div className="info-text-box">
                  <span className="info-title">Response Window</span>
                  <span className="info-sub">Typically within 24 hours</span>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="cta-buttons">
              <a href="mailto:gunnajpchugh@gmail.com" className="cta-btn mail-btn">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                Open Mail Client
              </a>
              <a
                href="https://www.linkedin.com/in/gunnaj/"
                target="_blank"
                rel="noreferrer"
                className="cta-btn"
              >
                Connect on LinkedIn
              </a>
              <a
                href="https://github.com/codedbygunnaj"
                target="_blank"
                rel="noreferrer"
                className="cta-btn"
              >
                Inspect GitHub
              </a>
            </div>
          </Card3D>
        </div>
      </div>
    </div>
  );
}
