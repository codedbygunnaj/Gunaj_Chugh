import React from "react";
import profilePic from "./assets/gunaj_profilePic.jpg";
import "./profileCard.css";

export default function ProfileCard() {
  return (
    <div className="profile-card">

      {/* Image */}
      <div className="profile-img">
        <img src={profilePic} alt="Gunaj Chugh" />
      </div>

      {/* Name */}
      <h2>Gunaj Chugh</h2>
      <p className="role">Software Developer</p>

      {/* Divider */}
      <hr />

      {/* Info */}
      <div className="info">
        <p><span>Email</span>gunnajpchugh@gmail.com</p>
        <p><span>Location</span>Delhi, India</p>
      </div>

      {/* Socials */}
      <div className="socials">
        <a href="https://github.com/codedbygunnaj" target="_blank">GitHub</a>
        <a href="https://www.linkedin.com/in/gunnaj/" target="_blank">LinkedIn</a>
      </div>

      {/* Button */}
      <a 
        href="https://drive.google.com/file/d/181UpoSgmEd7cajJNiD8eXQE8QhqNyuu6/view"
        target="_blank"
        className="resume-btn"
      >
        Download Resume
      </a>

    </div>
  );
}