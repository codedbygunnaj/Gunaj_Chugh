import { useEffect, useRef } from "react";

export default function CursorEffect() {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Check if device is touch-based or user prefers reduced motion
    const isTouch = window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isTouch || prefersReducedMotion) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Mouse coordinates
    const mouse = {
      x: -100,
      y: -100,
      targetX: -100,
      targetY: -100,
      isHovering: false,
      isClicking: false,
      hasMoved: false,
    };

    // Trailing dots (snake / constellation trail)
    const TRAIL_LENGTH = 14;
    const trail = Array.from({ length: TRAIL_LENGTH }, () => ({
      x: -100,
      y: -100,
    }));

    // Sparkle particles spawned on movement
    const particles = [];
    const MAX_PARTICLES = 35;

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      if (!mouse.hasMoved) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        trail.forEach((t) => {
          t.x = e.clientX;
          t.y = e.clientY;
        });
        mouse.hasMoved = true;
      }

      // Check if hovering interactive element
      const target = e.target;
      if (
        target &&
        (target.closest("a") ||
          target.closest("button") ||
          target.closest("input") ||
          target.closest("textarea") ||
          target.closest(".card") ||
          target.closest(".timeline-content") ||
          target.closest(".project-card") ||
          target.closest(".profile-card"))
      ) {
        mouse.isHovering = true;
      } else {
        mouse.isHovering = false;
      }

      // Add a couple of micro-particles on move
      if (particles.length < MAX_PARTICLES && Math.random() > 0.4) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 1.5 + 0.5;
        particles.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          decay: Math.random() * 0.03 + 0.02,
          size: Math.random() * 2.5 + 1,
          color: Math.random() > 0.3 ? "#facc15" : "#38bdf8",
        });
      }
    };

    const handleMouseDown = () => {
      mouse.isClicking = true;
      // Burst 8 particles on click
      for (let i = 0; i < 8; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 3 + 1;
        particles.push({
          x: mouse.x,
          y: mouse.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          decay: 0.04,
          size: Math.random() * 3 + 1.5,
          color: "#facc15",
        });
      }
    };

    const handleMouseUp = () => {
      mouse.isClicking = false;
    };

    const handleMouseLeave = () => {
      mouse.targetX = -100;
      mouse.targetY = -100;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Animation Loop
    let ringRadius = 14;
    let targetRingRadius = 14;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.35;
      mouse.y += (mouse.targetY - mouse.y) * 0.35;

      // Update trail positions
      let prevX = mouse.x;
      let prevY = mouse.y;

      trail.forEach((point, index) => {
        point.x += (prevX - point.x) * 0.45;
        point.y += (prevY - point.y) * 0.45;
        prevX = point.x;
        prevY = point.y;

        // Render trail dots
        if (mouse.hasMoved && mouse.x > 0 && mouse.y > 0) {
          const ratio = (TRAIL_LENGTH - index) / TRAIL_LENGTH;
          const radius = ratio * 3.2;
          const alpha = ratio * 0.45;

          ctx.beginPath();
          ctx.arc(point.x, point.y, Math.max(0.5, radius), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(250, 204, 21, ${alpha})`;
          ctx.fill();

          // Connect with subtle line to previous point
          if (index > 0) {
            ctx.beginPath();
            ctx.moveTo(point.x, point.y);
            ctx.lineTo(trail[index - 1].x, trail[index - 1].y);
            ctx.strokeStyle = `rgba(250, 204, 21, ${alpha * 0.3})`;
            ctx.lineWidth = radius * 0.8;
            ctx.stroke();
          }
        }
      });

      // Update & render sparkle particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life * 0.8;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      // Draw active cursor target
      if (mouse.hasMoved && mouse.x > 0 && mouse.y > 0) {
        // Adjust ring radius on hover / click
        targetRingRadius = mouse.isClicking ? 9 : mouse.isHovering ? 24 : 15;
        ringRadius += (targetRingRadius - ringRadius) * 0.2;

        // Outer smooth aura ring
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, ringRadius, 0, Math.PI * 2);
        ctx.strokeStyle = mouse.isHovering
          ? "rgba(250, 204, 21, 0.9)"
          : "rgba(250, 204, 21, 0.45)";
        ctx.lineWidth = mouse.isHovering ? 2 : 1.2;
        ctx.stroke();

        // Subtle glowing backdrop inside ring on hover
        if (mouse.isHovering) {
          ctx.beginPath();
          ctx.arc(mouse.x, mouse.y, ringRadius, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(250, 204, 21, 0.08)";
          ctx.fill();
        }

        // Center sharp point
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();

        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = "#facc15";
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="cursor-canvas"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 99999,
      }}
    />
  );
}
