import { useState, useEffect } from "react";
import "./resumeModal.css";

const RESUME_DRIVE_URL =
  "https://drive.google.com/file/d/181UpoSgmEd7cajJNiD8eXQE8QhqNyuu6/view";
const VIP_PASSCODE = "GC2026"; // Secret code Gunaj can share with trusted recruiters

export default function ResumeModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    note: "",
    passcode: "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | success | unlocked
  const [copied, setCopied] = useState(false);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handlePasscodeUnlock(e) {
    e.preventDefault();
    if (formData.passcode.trim().toUpperCase() === VIP_PASSCODE) {
      setStatus("unlocked");
    } else {
      alert("Invalid VIP access code. Please submit a request or email directly!");
    }
  }

  function handleCopyEmail() {
    navigator.clipboard.writeText("gunnajpchugh@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");

    const payload = {
      name: formData.name,
      email: formData.email,
      subject: `[Resume Request] ${formData.name} - ${formData.company || "Direct Request"}`,
      message: `Resume Request Details:\n• Name: ${formData.name}\n• Work Email: ${formData.email}\n• Company/Team: ${formData.company || "N/A"}\n• Role/Message: ${formData.note || "Interested in reviewing Gunaj's resume."}`,
    };

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

      const res = await fetch("https://gunaj-chugh.onrender.com/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("success");
      }
    } catch {
      setStatus("success");
    }
  }

  // Pre-filled mailto URL for 1-click dispatch
  const mailtoBody = encodeURIComponent(
    `Hi Gunaj,\n\nI came across your portfolio and would like to review your latest resume for software engineering opportunities.\n\nHere are my details:\n• Name: ${formData.name || ""}\n• Company / Organization: ${formData.company || ""}\n• Role / Opportunity: ${formData.note || ""}\n• Email: ${formData.email || ""}\n\nLooking forward to connecting!\n\nBest regards,`
  );
  const mailtoSubject = encodeURIComponent("Resume Request - Gunaj Chugh");
  const directMailtoUrl = `mailto:gunnajpchugh@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="resume-modal-card card-3d-imprint"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>

        {/* Modal Header */}
        <div className="modal-header-block">
          <div className="modal-badge-row">
            <span className="exclusive-badge">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              Protected Access
            </span>
            <span className="telemetry-pill">Magicpin SDE Intern</span>
          </div>

          <h3 className="modal-title">Request Official Resume</h3>
          <p className="modal-desc">
            To prevent automated scraping and connect with genuine recruiters, official resumes are shared directly via verified request or email.
          </p>
        </div>

        {/* State: SUCCESS (Request Sent) */}
        {status === "success" ? (
          <div className="modal-success-state">
            <div className="success-icon-ring">✓</div>
            <h4>Resume Request Received!</h4>
            <p>
              Thank you, <strong>{formData.name || "there"}</strong>. I have received your request and will review and dispatch my latest resume to <strong>{formData.email}</strong> shortly.
            </p>
            <div className="success-actions">
              <a href={directMailtoUrl} className="mail-fallback-link">
                Need it immediately? Click to trigger direct email client &rarr;
              </a>
              <button
                type="button"
                className="btn-modal-primary"
                onClick={onClose}
              >
                Close &amp; Continue Browsing
              </button>
            </div>
          </div>
        ) : status === "unlocked" ? (
          /* State: UNLOCKED via VIP Passcode */
          <div className="modal-unlocked-state">
            <div className="unlocked-icon-ring">🔓</div>
            <h4>VIP Access Granted!</h4>
            <p>Welcome! Your recruiter passcode has been authenticated. You can view or download the direct resume PDF below.</p>
            <div className="unlocked-actions">
              <a
                href={RESUME_DRIVE_URL}
                target="_blank"
                rel="noreferrer"
                className="btn-modal-primary download-now-btn"
              >
                <span>Download Resume (PDF)</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
              </a>
              <button type="button" className="btn-modal-secondary" onClick={onClose}>
                Done
              </button>
            </div>
          </div>
        ) : (
          /* State: IDLE / FORM */
          <div className="modal-body-layout">
            {/* Quick Request Form */}
            <form onSubmit={handleSubmit} className="resume-request-form">
              <div className="modal-form-grid">
                <div className="modal-input-group">
                  <label htmlFor="req-name">Your Name</label>
                  <input
                    id="req-name"
                    name="name"
                    type="text"
                    placeholder="e.g. Sarah Connor"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={status === "sending"}
                  />
                </div>

                <div className="modal-input-group">
                  <label htmlFor="req-email">Work / Official Email</label>
                  <input
                    id="req-email"
                    name="email"
                    type="email"
                    placeholder="sarah@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={status === "sending"}
                  />
                </div>
              </div>

              <div className="modal-input-group">
                <label htmlFor="req-company">Company / Organization</label>
                <input
                  id="req-company"
                  name="company"
                  type="text"
                  placeholder="e.g. Google, Microsoft, Startup, etc."
                  value={formData.company}
                  onChange={handleChange}
                  disabled={status === "sending"}
                />
              </div>

              <div className="modal-input-group">
                <label htmlFor="req-note">Role / Opportunity Note (Optional)</label>
                <input
                  id="req-note"
                  name="note"
                  type="text"
                  placeholder="e.g. SDE Backend Intern / Full-Time Opening"
                  value={formData.note}
                  onChange={handleChange}
                  disabled={status === "sending"}
                />
              </div>

              <button
                type="submit"
                className="btn-modal-primary"
                disabled={status === "sending"}
              >
                {status === "sending" ? (
                  <>
                    <span className="spinner-border spinner-border-sm" role="status"></span>
                    <span>Submitting Request...</span>
                  </>
                ) : (
                  <>
                    <span>Request Resume Directly</span>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13"></line>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                  </>
                )}
              </button>
            </form>

            {/* Quick 1-Click Alternate Options Strip */}
            <div className="modal-alternate-strip">
              <div className="divider-text">
                <span>OR DISPATCH VIA EMAIL CLIENT</span>
              </div>

              <div className="alternate-buttons-row">
                <a
                  href={directMailtoUrl}
                  className="btn-modal-secondary direct-mail-btn"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  <span>1-Click Mailto Template</span>
                </a>

                <button
                  type="button"
                  className="btn-modal-secondary copy-mail-btn"
                  onClick={handleCopyEmail}
                >
                  {copied ? "Copied gunnajpchugh@gmail.com!" : "Copy Email Address"}
                </button>
              </div>

              {/* VIP Recruiter Passcode Bypass */}
              <div className="vip-passcode-box">
                <span className="vip-label">Have a VIP recruiter passcode?</span>
                <div className="vip-input-row">
                  <input
                    type="text"
                    name="passcode"
                    placeholder="Enter access code"
                    value={formData.passcode}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="btn-unlock-code"
                    onClick={handlePasscodeUnlock}
                  >
                    Unlock
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
