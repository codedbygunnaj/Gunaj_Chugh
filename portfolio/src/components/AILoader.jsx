import { useState, useEffect } from "react";
import "./aiLoader.css";

const telemetrySteps = [
  "CONNECTING_TO_GITHUB_GRAPH_API...",
  "PARSING_REPOSITORIES_AND_TELEMETRY...",
  "RESOLVING_LIVE_DEPLOYMENTS_AND_SYSTEMS...",
  "SYNCHRONIZING_3D_PROJECT_MATRICES...",
  "AI_TELEMETRY_INITIALIZED_READY.",
];

export default function AILoader() {
  const [stepIndex, setStepIndex] = useState(0);
  const [progress, setProgress] = useState(12);

  useEffect(() => {
    // Step progression paced smoothly over ~1.9s
    const stepInterval = setInterval(() => {
      setStepIndex((prev) => (prev < telemetrySteps.length - 1 ? prev + 1 : prev));
    }, 360);

    // Progress counter animation reaching 100% at ~1.85s
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 98) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 8 + 4);
      });
    }, 90);

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
