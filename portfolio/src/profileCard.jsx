import { useState } from "react";
import profilePic from "./assets/gunaj_profilePic.jpg";
import ResumeModal from "./components/ResumeModal";
import "./profileCard.css";

export default function ProfileCard() {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  return (
    <>
      <div className="profile-card card-3d-imprint">
        {/* 3D Specular Highlight on Card */}
        <div className="card-specular-edge"></div>

        {/* Top Image with Glowing Halo */}
        <div className="profile-img">
          <img src={profilePic} alt="Gunaj Chugh" />
          <span className="avatar-badge" title="Active & Coding"></span>
        </div>

        {/* Header Info */}
        <div className="profile-header-info">
          <h2>Gunaj Chugh</h2>

          <div className="role-badge-container">
            <span className="role">Software Developer</span>
            <span className="company-badge">SDE Intern @ Magicpin</span>
          </div>
        </div>

        <hr className="profile-divider" />

        {/* Info Rows */}
        <div className="info">
          <div className="info-item">
            <span className="info-label">Email</span>
            <a href="mailto:gunnajpchugh@gmail.com" className="info-value">
              gunnajpchugh@gmail.com
            </a>
          </div>
          <div className="info-item">
            <span className="info-label">Location</span>
            <span className="info-value">Delhi, India</span>
          </div>
        </div>

        {/* Social Links with Tech Badges */}
        <div className="socials">
          <a 
            href="https://github.com/codedbygunnaj" 
            target="_blank" 
            rel="noreferrer"
            className="social-pill"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            GitHub
          </a>

          <a 
            href="https://www.linkedin.com/in/gunnaj/" 
            target="_blank" 
            rel="noreferrer"
            className="social-pill"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
            LinkedIn
          </a>
        </div>

        {/* 3D Tactile Request Resume Button */}
        <button 
          type="button"
          onClick={() => setIsResumeModalOpen(true)}
          className="resume-btn"
        >
          <span>Request Resume</span>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>

      {/* 3D Exclusive Resume Access Modal */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />
    </>
  );
}
