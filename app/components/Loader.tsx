"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface LoaderProps { onComplete: () => void; }

const CRITICAL_ASSETS = ["/hero-bg.png", "/RT.png"];

function preloadImage(src: string) {
  return new Promise<void>((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;
  });
}

export default function Loader({ onComplete }: LoaderProps) {
  const loaderRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // ── Particle ring animation on canvas ──
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const size = Math.min(window.innerWidth, window.innerHeight) * 0.55;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    const cx = size / 2;
    const cy = size / 2;
    const particleCount = 80;
    const baseRadius = size * 0.34;

    // Create orbital particles
    const particles = Array.from({ length: particleCount }, (_, i) => ({
      angle: (i / particleCount) * Math.PI * 2,
      radius: baseRadius + (Math.random() - 0.5) * 20,
      speed: 0.0008 + Math.random() * 0.0012,
      size: 1 + Math.random() * 1.5,
      alpha: 0.15 + Math.random() * 0.35,
      drift: Math.random() * Math.PI * 2,
      driftSpeed: 0.002 + Math.random() * 0.003,
    }));

    let animId: number;
    let globalAlpha = { val: 0 };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, size, size);
      if (globalAlpha.val <= 0) {
        animId = requestAnimationFrame(draw);
        return;
      }

      // Draw soft orbital ring guide
      ctx.beginPath();
      ctx.arc(cx, cy, baseRadius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(56, 189, 248, ${0.04 * globalAlpha.val})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();

      // Draw particles
      for (const p of particles) {
        p.angle += p.speed;
        p.drift += p.driftSpeed;
        const wobble = Math.sin(p.drift) * 6;
        const r = p.radius + wobble;
        const x = cx + Math.cos(p.angle) * r;
        const y = cy + Math.sin(p.angle) * r;

        const pulse = 0.6 + 0.4 * Math.sin(time * 0.001 + p.angle * 3);

        ctx.beginPath();
        ctx.arc(x, y, p.size * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(140, 180, 230, ${p.alpha * pulse * globalAlpha.val})`;
        ctx.fill();

        // Faint glow
        ctx.beginPath();
        ctx.arc(x, y, p.size * pulse * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 189, 248, ${0.04 * pulse * globalAlpha.val})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    // Progress tracker
    const prog = { val: 0 };
    const updateProg = () => {
      if (progressRef.current) progressRef.current.style.width = `${prog.val}%`;
      if (pctRef.current) pctRef.current.textContent = `${Math.round(prog.val)}%`;
    };

    /* ═══════════════════════════════════
       GSAP Timeline — Fluid Loader
       ═══════════════════════════════════ */
    const tl = gsap.timeline();

    // Grid fades in gently
    tl.to(".loader-grid", { opacity: 0.6, duration: 1.0, ease: "sine.out" }, 0);

    // Particle ring fades in
    tl.to(globalAlpha, { val: 1, duration: 1.5, ease: "sine.out" }, 0.2);

    // Logo breathes in
    tl.to(".weave-logo-wrap", {
      opacity: 1, scale: 1,
      duration: 1.0,
      ease: "power2.out",
    }, 0.5);

    // Status text appears
    tl.to(".loader-status", {
      opacity: 1, y: 0, duration: 0.6, ease: "power2.out",
    }, 1.0);

    // Progress fills smoothly
    tl.to(prog, {
      val: 90, duration: 2.5, ease: "power1.out", onUpdate: updateProg,
    }, 0.3);

    // Logo gentle float
    tl.to(".weave-logo-wrap", {
      y: -3,
      duration: 1.5,
      ease: "sine.inOut",
      yoyo: true,
      repeat: 1,
    }, 1.5);

    /* ── EXIT LOGIC ── */
    let assetsLoaded = false;
    let animReady = false;

    const doExit = () => {
      if (!assetsLoaded || !animReady) return;

      // Snap to 100%
      gsap.to(prog, {
        val: 100, duration: 0.3, ease: "power2.out", onUpdate: updateProg,
      });

      // Fade everything
      gsap.to(globalAlpha, { val: 0, duration: 0.5, ease: "power2.in", delay: 0.2 });
      gsap.to([".weave-logo-wrap", ".loader-status", ".loader-grid"], {
        opacity: 0, duration: 0.5, ease: "power2.in", delay: 0.2,
      });

      // Slide away
      gsap.to(loaderRef.current, {
        yPercent: -100,
        duration: 0.8,
        ease: "power3.inOut",
        delay: 0.65,
        onComplete,
      });
    };

    Promise.all(CRITICAL_ASSETS.map(preloadImage)).then(() => {
      assetsLoaded = true;
      doExit();
    });

    tl.call(() => { animReady = true; doExit(); }, [], 3.5);

    const safety = setTimeout(() => {
      assetsLoaded = true;
      animReady = true;
      doExit();
    }, 8000);

    return () => {
      clearTimeout(safety);
      cancelAnimationFrame(animId);
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div className="loader" ref={loaderRef}>
      {/* Faint background grid */}
      <div className="loader-grid" style={{ opacity: 0 }} />

      {/* Particle orbital ring — canvas */}
      <canvas ref={canvasRef} className="loader-particle-canvas" aria-hidden="true" />

      {/* Center logo */}
      <div className="weave-logo-wrap" style={{ opacity: 0, transform: "scale(0.9)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/rt-intro.png" alt="RT" className="weave-logo" />
      </div>

      {/* Loading status */}
      <div className="loader-status" style={{ opacity: 0, transform: "translateY(8px)" }}>
        <span className="loader-status-label">INITIALIZING</span>
        <span className="loader-status-dot">·</span>
        <span className="loader-status-pct" ref={pctRef}>0%</span>
      </div>

      {/* Progress bar */}
      <div className="loader-progress-wrap">
        <div className="loader-progress-bar">
          <div className="loader-progress-fill" ref={progressRef} style={{ width: "0%" }} />
        </div>
      </div>
    </div>
  );
}