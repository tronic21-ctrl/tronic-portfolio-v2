"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface IntroScreenProps {
  onComplete: () => void;
}

export default function IntroScreen({ onComplete }: IntroScreenProps) {
  const introRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const logoSolidRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const CRITICAL_ASSETS = ["/hero-bg4.png"];
    const preloadImage = (src: string) =>
      new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => resolve();
        img.src = src;
      });

    let assetsReady = false;
    let initialDelayElapsed = false;
    let exitTriggered = false;

    function triggerExit() {
      if (exitTriggered) return;
      exitTriggered = true;
      
      // Kill the infinite loop immediately
      shineLoop.kill();
      
      // Execute transition
      playFinalSweepAndExit();
    }

    Promise.all(CRITICAL_ASSETS.map(preloadImage)).then(() => {
      assetsReady = true;
      if (initialDelayElapsed) {
        triggerExit();
      }
    });

    const master = gsap.timeline();
    master.to(".intro-ambient-orb", { opacity: 0.2, scale: 1, duration: 1.6, ease: "sine.out" }, 0);
    master.fromTo(logoRef.current,
      { opacity: 0, scale: 0.92 },
      { opacity: 1, scale: 1, duration: 2.0, ease: "power1.out" },
      0.4
    );

    function playFinalSweepAndExit() {
      if (introRef.current) {
        introRef.current.classList.add("exiting");
      }
      const exitTl = gsap.timeline({ onComplete });

      // ── 0s–1.1s: Final luxurious shine sweep across outline logo ──
      exitTl.set(".intro-logo-shine", { opacity: 1 }, 0)
        .fromTo(".intro-logo-shine",
          { backgroundPosition: "-120% -120%" },
          { backgroundPosition: "120% 120%", duration: 1.1, ease: "power2.inOut" },
          0
        )
        .to(".intro-logo-shine", { opacity: 0, duration: 0.4, ease: "power1.out" }, 0.9);

      // ── 0.5s–1.8s: Smooth cross-dissolve — outline fades as solid materializes ──
      exitTl.to(logoRef.current, {
        opacity: 0,
        scale: 1.04,
        filter: "saturate(0.15) brightness(1.6) blur(3px)",
        duration: 1.3,
        ease: "power2.inOut",
      }, 0.5);

      exitTl.fromTo(logoSolidRef.current,
        {
          opacity: 0,
          scale: 0.96,
          filter: "brightness(1.25) saturate(1.15) blur(6px) drop-shadow(0 0 20px rgba(56,130,248,0.5))",
        },
        {
          opacity: 1,
          scale: 1,
          filter: "brightness(1) saturate(1) blur(0px) drop-shadow(0 5px 10px rgba(0,0,0,0.75))",
          duration: 1.4,
          ease: "power2.out",
        },
        0.6
      );

      // ── Ambient orb: subtle glow pulse during the cross-fade moment ──
      exitTl.to(".intro-ambient-orb", {
        scale: 1.15,
        opacity: 0.28,
        duration: 0.8,
        ease: "power1.inOut",
      }, 0.6);
      exitTl.to(".intro-ambient-orb", {
        scale: 1,
        opacity: 0.2,
        duration: 0.6,
        ease: "power2.out",
      }, 1.4);

      // ── 2.0s–2.8s: Solid logo fades out gracefully ──
      exitTl.to(logoSolidRef.current, {
        opacity: 0,
        scale: 1.04,
        filter: "brightness(1.1) saturate(0.8) blur(2px) drop-shadow(0 5px 10px rgba(0,0,0,0))",
        duration: 0.9,
        ease: "power2.in",
      }, 2.1);

      // ── 2.3s–3.0s: Ambient orb + whole screen fade out ──
      exitTl.to(".intro-ambient-orb", {
        opacity: 0,
        scale: 0.85,
        duration: 0.7,
        ease: "power2.in",
      }, 2.3);
      exitTl.to(introRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",
      }, 2.5);
    }

    const shineLoop = gsap.timeline({
      repeat: -1,
      repeatDelay: 0.6,
    });
    shineLoop.set(".intro-logo-shine", { opacity: 1 })
      .fromTo(".intro-logo-shine",
        { backgroundPosition: "-120% -120%" },
        { backgroundPosition: "120% 120%", duration: 1.1, ease: "power2.inOut" }
      )
      .to(".intro-logo-shine", { opacity: 0, duration: 0.35 });
    master.add(shineLoop, 2.4);

    const startCheck = setTimeout(() => {
      initialDelayElapsed = true;
      if (assetsReady) {
        triggerExit();
      }
    }, 2800); // Snappier minimum intro display time

    const safety = setTimeout(() => {
      triggerExit();
    }, 6000); // 6s maximum fallback timeout to prevent hangs

    // Click handler to allow manual skip
    const handleSkip = () => {
      triggerExit();
    };
    const introEl = introRef.current;
    if (introEl) {
      introEl.addEventListener("click", handleSkip);
      introEl.addEventListener("touchstart", handleSkip);
    }

    return () => {
      clearTimeout(startCheck);
      clearTimeout(safety);
      master.kill();
      shineLoop.kill();
      if (introEl) {
        introEl.removeEventListener("click", handleSkip);
        introEl.removeEventListener("touchstart", handleSkip);
      }
    };
  }, [onComplete]);

  return (
    <div className="intro-screen" ref={introRef}>
      {/* Subtle film-grain noise */}
      <div className="intro-noise" />

      {/* Ambient orb — soft, warm glow */}
      <div
        className="intro-ambient-orb"
        style={{ opacity: 0, transform: "scale(0.7)" }}
      />

      {/* Center logo */}
      <div className="intro-logo-container">
        <div ref={logoRef} className="intro-logo-base" />
        <div ref={logoSolidRef} className="intro-logo-solid" style={{ opacity: 0 }} />
        <div className="intro-logo-shine" />
      </div>
    </div>
  );
}
