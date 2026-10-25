import { useState } from "react";
import Card3D from "./components/Card3D";
import {
  GUNAJ_EMAIL,
  BACKEND_API_URL,
  getGmailComposeUrl,
  getMailtoUrl,
  copyToClipboard,
} from "./utils/mailHelper";
import "./contact.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | success | server-asleep
  const [copied, setCopied] = useState(false);
  const [copyMsgNotice, setCopyMsgNotice] = useState(false);

  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleCopyEmail() {
    const ok = await copyToClipboard(GUNAJ_EMAIL);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  }

  async function handleCopyEntireMessage() {
    const textToCopy = `To: ${GUNAJ_EMAIL}\nFrom: ${formData.name} <${formData.email}>\nSubject: ${formData.subject}\n\nMessage:\n${formData.message}`;
    const ok = await copyToClipboard(textToCopy);
    if (ok) {
      setCopyMsgNotice(true);
      setTimeout(() => setCopyMsgNotice(false), 2200);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");

    try {
      // 10 second timeout for Render free-tier spin up
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const res = await fetch(`${BACKEND_API_URL}/api/contact`, {
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
      } else {
        // Backend returned non-200 (e.g. 500 or 503)
        setStatus("server-asleep");
      }
    } catch {
      // Fetch aborted or network failed (Render sleeping / offline)
      setStatus("server-asleep");
    }
  }

  const directGmailUrl = getGmailComposeUrl({
    to: GUNAJ_EMAIL,
    subject: formData.subject || `Inquiry from ${formData.name || "Portfolio Visitor"}`,
    body: `Hi Gunaj,\n\n${formData.message || "I would like to connect regarding software engineering opportunities."}\n\nBest regards,\n${formData.name || ""}\n${formData.email || ""}`,
  });

  const directMailtoUrl = getMailtoUrl({
    to: GUNAJ_EMAIL,
    subject: formData.subject || `Inquiry from ${formData.name || "Portfolio Visitor"}`,
    body: `Hi Gunaj,\n\n${formData.message || ""}\n\nBest regards,\n${formData.name || ""}\n${formData.email || ""}`,
  });

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
              Direct Delivery Engine
            </span>
          </div>

          {/* STATE 1: SUCCESS CONFIRMATION */}
          {status === "success" ? (
            <div className="form-success-state">
              <div className="success-badge-icon">&#10003;</div>
              <h3>Message Dispatched Successfully!</h3>
              <p>
                Thank you, <strong>{formData.name}</strong>. Your message has been received by Gunaj's backend service.
              </p>
              <div className="success-actions-box">
                <a
                  href={directGmailUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="smart-action-btn primary"
                  title="Open a pre-filled draft in Gmail"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  <span>Also Send via Gmail (1-Click)</span>
                </a>
                <button
                  type="button"
                  className="smart-action-btn secondary"
                  onClick={() => {
                    setFormData({ name: "", email: "", subject: "", message: "" });
                    setStatus("idle");
                  }}
                >
                  Send Another Message
                </button>
              </div>
            </div>
          ) : status === "server-asleep" ? (
            /* STATE 2: FALLBACK (Render free tier sleeping or network hiccup) */
            <div className="form-fallback-state">
              <div className="fallback-badge-icon">&#9888;</div>
              <h3>Free Backend Server Spinning Up!</h3>
              <p>
                Render free tier instances go to sleep when inactive and can take 50 seconds to wake up.
                <strong> Don't worry! Your message is preserved below.</strong> Send it directly to Gunaj in 1 click:
              </p>

              <div className="preserved-message-preview">
                <span className="preview-label">PRESERVED MESSAGE</span>
                <p className="preview-text">
                  <strong>Subject:</strong> {formData.subject || "(No subject)"}
                  <br />
                  <strong>Message:</strong> {formData.message}
                </p>
              </div>

              <div className="fallback-actions-box">
                <a
                  href={directGmailUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="smart-action-btn primary"
                  title="Opens directly in browser Gmail with your message ready"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  <span>1-Click Send via Gmail (Guaranteed)</span>
                </a>

                <div className="fallback-secondary-row">
                  <a href={directMailtoUrl} className="smart-action-btn secondary">
                    Default Mail App
                  </a>
                  <button
                    type="button"
                    className="smart-action-btn secondary"
                    onClick={handleCopyEntireMessage}
                  >
                    {copyMsgNotice ? "Copied!" : "Copy Message"}
                  </button>
                  <button
                    type="button"
                    className="smart-action-btn secondary"
                    onClick={handleSubmit}
                  >
                    Retry Server
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* STATE 3: FORM */
            <form onSubmit={handleSubmit} className="styled-contact-form">
              <div className="input-group-custom">
                <label htmlFor="contact-name">Your Name</label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  placeholder="e.g. Alex Smith"
                  required
                  value={formData.name}
                  onChange={handleChange}
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
                  value={formData.email}
                  onChange={handleChange}
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
                  value={formData.subject}
                  onChange={handleChange}
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
                  value={formData.message}
                  onChange={handleChange}
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
            </form>
          )}
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
                  <span className="info-sub">{GUNAJ_EMAIL}</span>
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

            {/* Quick Action Buttons: Guaranteed 100% functional across devices */}
            <div className="cta-buttons">
              {/* Primary 1-Click Compose in Gmail (works in any browser without local client) */}
              <a
                href={getGmailComposeUrl({ subject: "Software Engineering Opportunity - Gunaj Chugh" })}
                target="_blank"
                rel="noreferrer"
                className="cta-btn mail-btn"
                title="Opens compose window in Gmail directly"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                Compose in Gmail
              </a>

              {/* Native Mail Client Fallback */}
              <a
                href={getMailtoUrl({ subject: "Software Engineering Opportunity - Gunaj Chugh" })}
                className="cta-btn"
                title="Open default desktop mail client (Outlook / Apple Mail)"
              >
                Default Mail Client
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
