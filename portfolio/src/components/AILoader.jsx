import { useState, useEffect } from "react";
import "./aiLoader.css";

const telemetrySteps = [
  "CONNECTING_TO_GITHUB_GRAPH_API...",
  "RESOLVING_LIVE_DEPLOYMENTS...",
  "PARSING_ENGINEERING_REPOSITORIES...",
  "SYNCHRONIZING_3D_METRICS...",
  "AI_TELEMETRY_READY.",
];

export default function AILoader() {
  const [stepIndex, setStepIndex] = useState(0);
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    // Step progression timer
    const stepInterval = setInterval(() => {
      setStepIndex((prev) => (prev < telemetrySteps.length - 1 ? prev + 1 : prev));
    }, 280);

    // Progress counter animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 98) {
          clearInterval(progressInterval);
          return 99;
        }
        return prev + Math.floor(Math.random() * 15 + 8);
      });
    }, 120);

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="ai-loader-container">
      {/* Background Holographic Laser Scan */}
      <div className="ai-laser-scanner"></div>

      {/* 3D Holographic Gyroscope Orb */}
      <div className="ai-gyro-wrapper">
        <div className="gyro-ring ring-outer"></div>
        <div className="gyro-ring ring-middle"></div>
        <div className="gyro-ring ring-inner"></div>
        <div className="gyro-core">
          <div className="core-pulse"></div>
        </div>
      </div>

      {/* Cyber AI Telemetry Badge */}
      <div className="ai-status-box">
        <div className="ai-status-header">
          <span className="ai-chip">NEURAL_GRAPH_V2</span>
          <span className="ai-percentage">{Math.min(progress, 100)}%</span>
        </div>

        {/* Progress Bar */}
        <div className="ai-progress-track">
          <div
            className="ai-progress-fill"
            style={{ width: `${Math.min(progress, 100)}%` }}
          ></div>
        </div>

        {/* Terminal Line */}
        <div className="ai-terminal-line">
          <span className="terminal-prefix">&gt;</span>
          <span className="terminal-text">{telemetrySteps[stepIndex]}</span>
          <span className="terminal-cursor">_</span>
        </div>
      </div>
    </div>
  );
}
