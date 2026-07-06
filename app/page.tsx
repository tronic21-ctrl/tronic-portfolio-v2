"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import dynamic from "next/dynamic";
import IntroScreen from "./components/IntroScreen";

const ConstellationCanvas = dynamic(
  () => import("./components/ConstellationCanvas"),
  { ssr: false }
);

gsap.registerPlugin(ScrollTrigger);

/* ─── DATA ─── */
const STATS = [
  { num: 107, suffix: "",  label: "Tests Written",        sublabel: "Foundry · 98% coverage" },
  { num: 6,   suffix: "",  label: "Projects Shipped",     sublabel: "4 live deployments" },
  { num: 3,   suffix: "",  label: "Protocols Integrated", sublabel: "The Graph · Chainlink · 0G" },
  { num: 7,   suffix: "",  label: "Contracts Deployed",   sublabel: "Sepolia · verified on-chain" },
];

const ABOUT_VALUE_CARDS = [
  { title: "VERIFY",  desc: "Every smart contract checked line-by-line before mainnet, the same rigor as testing a regression model for edge cases." },
  { title: "BUILD",   desc: "From SimpleBank to TronicLens, six live projects shipped in three months, self-taught from zero in April 2026." },
  { title: "ANALYZE", desc: "DeFi analytics isn't just dashboards, it's reading on-chain data the way an economist reads market signals." },
];

const ABOUT_METRICS = [
  { num: 3,   label: "Months Self-Taught",       unit: " MONTHS", isPercent: false },
  { num: 98,  label: "Test Coverage",            unit: "%",   isPercent: true },
  { num: 100, label: "Subgraph Synced",          unit: "%",   isPercent: true },
  { num: 3,   label: "Smart Contracts Verified", unit: "",    isPercent: false },
];

const PROJECTS = [
  {
    num: "01.",
    title: "TRONICLENS: DEFI ANALYTICS DASHBOARD",
    desc: "Full-stack DeFi analytics dashboard indexing on-chain Sepolia activity. Subgraph indexing via The Graph, Chainlink price feeds, 0G AI insights (Qwen2.5 TEE), on-chain governance. ETHOnline 2026 hackathon submission.",
    tagsString: "The Graph - Chainlink - 0G Storage - 0G Compute - Solidity - React - Foundry ",
    pills: ["The Graph", "Chainlink", "0G", "2026"],
    link: "https://github.com/tronic21-ctrl/troniclens",
    live: "https://troniclens.vercel.app",
    imgMain: "/troniclens-overview.png",
    imgSub: "/troniclens-staking.png"
  },
  {
    num: "02.",
    title: "DEFI DASHBOARD WITH DUNE API & SQL LOGS",
    desc: "Protocol analytics dashboard powered by Dune API. Custom SQL queries decoding raw Sepolia logs, live staking event tracking at dune.com/rikotronic.",
    tagsString: "Dune Analytics - React - Vite - Wagmi - Sepolia ",
    pills: ["Dune API", "React", "Wagmi", "2026"],
    link: "https://github.com/tronic21-ctrl/defi-dashboard",
    live: "https://defi-dashboard-pi.vercel.app",
    imgMain: "/defi-dashboard.png",
    imgSub: "/defi-connect.png"
  },
  {
    num: "03.",
    title: "CRYPTO TRACKER WITH LIVE MARKET DATA",
    desc: "Real-time crypto price tracker with live market data, portfolio view, and historical charts. First production React project.",
    tagsString: "React - Vite - CoinGecko API - CSS Grid ",
    pills: ["React", "CoinGecko", "Vite", "2025"],
    link: "https://github.com/tronic21-ctrl/crypto-tracker",
    live: "https://crypto-tracker-pi-silk.vercel.app",
    imgMain: "/crypto-tracker.png",
    imgSub: "/crypto-tracker.png"
  }
];


// Skills dengan icon warna asli dari v1
type Skill = {
  name: string;
  color: string;
  cat: string;
  level: string;
  svg?: React.ReactNode;
  img?: string;
  tint?: boolean;
  tintDark?: boolean;
};

const SKILLS: Skill[] = [
  // Frontend
  { name:"React",          color:"#61dafb", cat:"Frontend",    level:"intermediate", img:"https://cdn.simpleicons.org/react/61dafb" },
  { name:"JavaScript",     color:"#f7df1e", cat:"Frontend",    level:"intermediate", svg: <svg viewBox="0 0 24 24" fill="#f7df1e"><path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/></svg> },
  { name:"TypeScript",     color:"#3178c6", cat:"Frontend",    level:"intermediate", svg: <svg viewBox="0 0 24 24" fill="#3178c6"><path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/></svg> },
  { name:"HTML & CSS",     color:"#e34f26", cat:"Frontend",    level:"intermediate", svg: <svg viewBox="0 0 24 24" fill="#e34f26"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"/></svg> },
  { name:"Next.js",        color:"#e2e8f0", cat:"Frontend",    level:"intermediate", svg: <svg viewBox="0 0 24 24" fill="#e2e8f0"><path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.499-.054z"/></svg> },
  { name:"Vite",           color:"#646cff", cat:"Frontend",    level:"intermediate", svg: <svg viewBox="0 0 24 24" fill="#646cff"><path d="M12 0L1.605 21.173h4.6L12 8.131l5.795 13.042h4.6L12 0z"/></svg> },
  { name:"Framer Motion",  color:"#0055ff", cat:"Frontend",    level:"intermediate", svg: <svg viewBox="0 0 24 24" fill="#0055ff"><path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z"/></svg> },
  // Blockchain / Web3
  { name:"Solidity",       color:"#627eea", cat:"Blockchain",  level:"intermediate", img:"https://cdn.simpleicons.org/solidity/627eea" },
  { name:"Ethereum",       color:"#627eea", cat:"Blockchain",  level:"intermediate", svg: <svg viewBox="0 0 24 24" fill="#627eea"><path d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z"/></svg> },
  { name:"DeFi",           color:"#10b981", cat:"Blockchain",  level:"intermediate", svg: <svg viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6"/><path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6"/></svg> },
  { name:"Smart Contract\nSecurity", color:"#f43f5e", cat:"Blockchain", level:"intermediate", svg: <svg viewBox="0 0 24 24" fill="none" stroke="#f43f5e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
  { name:"Foundry",        color:"#38bdf8", cat:"Blockchain",  level:"intermediate", svg: <svg viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 18h14"/><path d="M7 18v-3a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v3"/><path d="M9 13V9a3 3 0 0 1 6 0v4"/><path d="M12 6V3"/><path d="M9 3h6"/></svg> },
  { name:"Hardhat",        color:"#fff100", cat:"Blockchain",  level:"beginner",     img: "/hardhat.svg" },
  // Protocols
  { name:"The Graph",      color:"#38bdf8", cat:"Protocols",   level:"intermediate", img: "/thegraph-logo.svg" },
  { name:"Chainlink",      color:"#375bd2", cat:"Protocols",   level:"intermediate", img:"https://cdn.simpleicons.org/chainlink/375bd2" },
  { name:"0G Storage",     color:"#38bdf8", cat:"Protocols",   level:"intermediate", img: "/0g-logo.svg" },
  { name:"0G Compute",     color:"#818cf8", cat:"Protocols",   level:"beginner",     img: "/0g-logo.svg" },
  { name:"IPFS",           color:"#65c2cb", cat:"Protocols",   level:"intermediate", svg: <svg viewBox="0 0 24 24" fill="#65c2cb"><path d="M12 0L2 6v12l10 6 10-6V6L12 0zm-1 3.236L3.88 7.459l-1.645-.969L12 1.032l9.765 5.458-1.645.97L12 3.235zm1 17.53l-8-4.707v-9.32l8 4.706v9.32zm1-9.32l8-4.707v9.32l-8 4.707v-9.32zm-8.76-5.18L12 10.944l7.76-4.578.97 1.645L12 12.703l-8.73-4.692.97-1.645z"/></svg> },
  { name:"Dune Analytics", color:"#ff5e00", cat:"Protocols",   level:"intermediate", img: "/dune-logo.svg", tintDark: true },
  { name:"Wagmi",          color:"#38bdf8", cat:"Frontend",    level:"intermediate", img: "/wagmi-logo.svg", tintDark: true },
  { name:"viem",           color:"#fbbf24", cat:"Frontend",    level:"intermediate", img: "/viem-logo.svg", tintDark: true },
  { name:"Reown AppKit", color:"#38bdf8", cat:"Frontend", level:"intermediate", img: "/reown-icon-light.svg" },
  { name:"RainbowKit",     color:"#7c3aed", cat:"Frontend",    level:"intermediate", img: "/rainbowkit-logo.svg" },
  // Economics
  { name:"Market Analysis",color:"#38bdf8", cat:"Economics",   level:"intermediate", svg: <svg viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg> },
  { name:"Economics",      color:"#818cf8", cat:"Economics",   level:"advanced",     svg: <svg viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> },
  { name:"SPSS",           color:"#10b981", cat:"Economics",   level:"intermediate", svg: <svg viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg> },
  { name:"EViews",         color:"#f59e0b", cat:"Economics",   level:"intermediate", svg: <svg viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M7 16l4-8 4 8"/><path d="M9 12h4"/></svg> },
  { name:"MS Office",      color:"#d83b01", cat:"Economics",   level:"intermediate", svg: <svg viewBox="0 0 24 24" fill="#d83b01"><path d="M21.18 3H14l-2 2H5.82A2.82 2.82 0 0 0 3 7.82v8.36A2.82 2.82 0 0 0 5.82 19H14l2-2h5.18A2.82 2.82 0 0 0 24 14.18V5.82A2.82 2.82 0 0 0 21.18 3zM14 17H5.82A.82.82 0 0 1 5 16.18V7.82A.82.82 0 0 1 5.82 7H12l2 2v8zm8-2.82a.82.82 0 0 1-.82.82H16V9l-2-2h-2V5h8.18a.82.82 0 0 1 .82.82v8.36z"/></svg> },
  { name:"Canva",          color:"#00c4cc", cat:"Economics",   level:"intermediate", img:"/Canva-logo.svg" },
];

const JOURNEY = [
  {
    role: "Content Creator",
    company: "YouTube & TikTok",
    date: "2017 - 2024",
    desc: "Active on YouTube & TikTok as a content creator.",
  },
  {
    role: "B.Sc. Development Economics",
    company: "UNINGRAT Tual",
    date: "2021 - 2025",
    desc: "Studied Development Economics at University of Doctor Husni Ingratubun (UNINGRAT) Tual. Graduated December 1, 2025.",
  },
  {
    role: "Market Analyst & Trader",
    company: "Independent",
    date: "2025 - Mar 2026",
    desc: "Focused on investment and trading independently across stocks, cryptocurrency, and commodities.",
  },
  {
    role: "Web Development & Web3 Journey",
    company: "Self-Directed",
    date: "Mar 2026 - Present",
    desc: "Started learning web development from scratch (HTML, CSS, JavaScript, React). Now building production-grade smart contracts with NatSpec documentation, security patterns (ReentrancyGuard, CEI), Foundry testing, and integrating DeFi protocols (The Graph, Chainlink, 0G Storage, 0G Compute).",
  },
];

/* ─── SKILL ICON ─── */
function SkillIcon({ skill }: { skill: Skill }) {
  if (skill.img) {
    return (
      <div className="skill-icon">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={skill.img}
          alt={skill.name}
          style={{
            filter: skill.tintDark
              ? "brightness(0) invert(1)"
              : skill.tint
              ? `drop-shadow(0 0 4px ${skill.color})`
              : undefined,
          }}
        />
      </div>
    );
  }
  return <div className="skill-icon" style={{ color: skill.color }}>{skill.svg}</div>;
}

/* ─── MAIN PAGE ─── */
export default function Portfolio() {
  const [introDone, setIntroDone] = useState(() => {
    // Skip intro if already shown in this browser session (e.g. on reload)
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("intro_shown") === "true";
    }
    return false;
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollTopVisible, setScrollTopVisible] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const heroEyebrowRef = useRef<HTMLDivElement>(null);
  const heroTaglineRef = useRef<HTMLParagraphElement>(null);
  const heroCtaRef     = useRef<HTMLDivElement>(null);
  const heroScrollRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrollTopVisible(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!introDone) return;

    // Lenis smooth scroll, synced to GSAP's ticker + ScrollTrigger
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });
    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // In-page anchor links (#work, #skills, etc.) — scroll via Lenis instead of native jump
    const onAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href) return;
      e.preventDefault();
      if (href === "#") {
        lenis.scrollTo(0);
        return;
      }
      const target = document.querySelector(href);
      if (target) lenis.scrollTo(target as HTMLElement, { offset: -90 });
    };
    document.addEventListener("click", onAnchorClick);

    // Glowing Custom Cursor Blob Mouse Move
    const blob = document.querySelector(".cursor-glow-blob") as HTMLElement;
    const onMouseMoveGlow = (e: MouseEvent) => {
      if (blob) {
        gsap.to(blob, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.25,
          ease: "power2.out"
        });
      }
    };
    window.addEventListener("mousemove", onMouseMoveGlow);

    // Hover scale effects on interactive elements
    const interactives = document.querySelectorAll("a, button, .mockup-perspective-wrapper");
    const onMouseEnterGlow = () => blob?.classList.add("hovered");
    const onMouseLeaveGlow = () => blob?.classList.remove("hovered");
    interactives.forEach(el => {
      el.addEventListener("mouseenter", onMouseEnterGlow);
      el.addEventListener("mouseleave", onMouseLeaveGlow);
    });

    // Holds the journey-dot ticker callback so it's reachable from the
    // cleanup function below (it's assigned inside gsap.context()).
    let updateJourneyDot: (() => void) | null = null;

    const ctx = gsap.context(() => {

      // Nav scroll
      ScrollTrigger.create({
        start: "80px top",
        onEnter:     () => navRef.current?.classList.add("scrolled"),
        onLeaveBack: () => navRef.current?.classList.remove("scrolled"),
      });

      // Hero background fade-in
      gsap.fromTo(".hero-bg-layer",
        { opacity: 0, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out", delay: 0.1 }
      );

      // Hero name clip wipe
      gsap.fromTo(".hero-name-line",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power2.out", stagger: 0.15, delay: 0.3 }
      );

      // Hero sub elements (eyebrow, tagline, CTA, scroll, signature, socials)
      gsap.fromTo(
        [
          heroEyebrowRef.current,
          heroTaglineRef.current,
          heroCtaRef.current,
          heroScrollRef.current,
          ".hero-signature",
          ".hero-social-pill"
        ],
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out", delay: 0.8 }
      );

      // Interactive parallax on hero card background
      const card = document.querySelector(".hero") as HTMLElement;
      const bg = document.querySelector(".hero-card-bg") as HTMLElement;
      if (card && bg) {
        const onMouseMove = (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          const clampedX = Math.max(-25, Math.min(25, x * 0.02));
          const clampedY = Math.max(-25, Math.min(25, y * 0.02));
          gsap.to(bg, {
            x: clampedX,
            y: clampedY,
            duration: 0.6,
            ease: "power2.out",
          });
        };
        const onMouseLeave = () => {
          gsap.to(bg, {
            x: 0,
            y: 0,
            duration: 1.0,
            ease: "power2.out",
          });
        };
        card.addEventListener("mousemove", onMouseMove);
        card.addEventListener("mouseleave", onMouseLeave);
      }

      // Stats count-up
      STATS.forEach((s, i) => {
        const el  = document.querySelector(`.sn-${i}`);
        if (!el) return;
        const obj = { val: 0 };
        ScrollTrigger.create({
          trigger: el, start: "top 85%", once: true,
          onEnter: () => gsap.to(obj, {
            val: s.num, duration: 1.6, ease: "power2.out",
            onUpdate: () => { el.textContent = Math.round(obj.val) + s.suffix; },
          }),
        });
      });

      // About track-record glass table — count-up + bar fill
      const aboutGlass = document.querySelector(".about-stats-glass");
      if (aboutGlass) {
        gsap.fromTo(aboutGlass,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
            scrollTrigger: { trigger: aboutGlass, start: "top 85%" } }
        );
        ABOUT_METRICS.forEach((m, i) => {
          const numEl = document.querySelector(`.amn-${i}`);
          const barEl = document.querySelector(`.amb-${i}`) as HTMLElement | null;
          if (!numEl) return;
          const obj = { val: 0 };
          ScrollTrigger.create({
            trigger: aboutGlass, start: "top 80%", once: true,
            onEnter: () => {
              gsap.to(obj, {
                val: m.num, duration: 1.4, ease: "power2.out", delay: i * 0.12,
                onUpdate: () => { numEl.textContent = String(Math.round(obj.val)) + m.unit; },
              });
              if (m.isPercent && barEl) {
                gsap.to(barEl, { width: `${m.num}%`, duration: 1.4, ease: "power2.out", delay: i * 0.12 });
              }
            },
          });
        });
      }

      // Generic reveal-up
      gsap.utils.toArray<HTMLElement>(".reveal-up").forEach(el => {
        gsap.fromTo(el,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 85%" } }
        );
      });

      // Skills & Stack — scroll fade per baris kategori
      gsap.utils.toArray<HTMLElement>(".skills-row-v2").forEach((row) => {
        const targets = row.querySelectorAll(".skills-row-cat, .skill-pill-v2");
        gsap.fromTo(targets,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.05,
            scrollTrigger: {
              trigger: row,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play reverse play reverse",
            }
          }
        );
      });

      // Selected Projects Section Intro Reveal
      gsap.fromTo(".projects-section-intro .intro-title",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: ".projects-section-intro", start: "top 80%" }
        }
      );
      gsap.fromTo(".projects-section-intro .intro-desc",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.15,
          ease: "power2.out",
          scrollTrigger: { trigger: ".projects-section-intro", start: "top 80%" }
        }
      );

      // Project rows animations
      PROJECTS.forEach((_, idx) => {
        const row = document.querySelector(`#project-${idx}`) as HTMLElement;
        if (!row) return;

        // Reveal content on enter
        gsap.fromTo(row.querySelectorAll(".project-sticky-left, .project-scroll-right > :not(.mockup-perspective-wrapper)"),
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: { trigger: row, start: "top 85%" }
          }
        );

        // Reveal mockup wrapper
        gsap.fromTo(row.querySelector(".mockup-perspective-wrapper"),
          { opacity: 0, y: 60, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.0,
            ease: "power2.out",
            scrollTrigger: { trigger: row, start: "top 75%" }
          }
        );

        // Parallax scroll on secondary mockup
        const secondary = row.querySelector(".mockup-card-secondary") as HTMLElement;
        if (secondary) {
          gsap.fromTo(secondary,
            { y: 30 },
            {
              y: -50,
              ease: "none",
              scrollTrigger: {
                trigger: row,
                start: "top bottom",
                end: "bottom top",
                scrub: 1
              }
            }
          );
        }
      });

      // 3D Hover Tilt Effect
      const wrappers = document.querySelectorAll(".mockup-perspective-wrapper");
      wrappers.forEach(wrapper => {
        const primary = wrapper.querySelector(".mockup-card-primary") as HTMLElement;
        const secondary = wrapper.querySelector(".mockup-card-secondary") as HTMLElement;
        if (!primary || !secondary) return;

        const onMouseMoveTilt = (e: Event) => {
          const mouseEvent = e as MouseEvent;
          const rect = wrapper.getBoundingClientRect();
          const x = mouseEvent.clientX - rect.left - rect.width / 2;
          const y = mouseEvent.clientY - rect.top - rect.height / 2;
          
          const xNorm = x / (rect.width / 2);
          const yNorm = y / (rect.height / 2);
          
          gsap.to(primary, {
            rotateY: xNorm * 8 - 8,  // Add default offset rotation
            rotateX: -yNorm * 8 + 4,
            transformPerspective: 1200,
            duration: 0.4,
            ease: "power2.out"
          });
          
          gsap.to(secondary, {
            rotateY: xNorm * 12 - 12,
            rotateX: -yNorm * 12 + 6,
            transformPerspective: 1200,
            x: xNorm * 15,
            y: yNorm * 15,
            duration: 0.4,
            ease: "power2.out"
          });
        };
        
        const onMouseLeaveTilt = () => {
          gsap.to(primary, {
            rotateY: -8,
            rotateX: 4,
            duration: 0.8,
            ease: "power2.out"
          });
          gsap.to(secondary, {
            rotateY: -12,
            rotateX: 6,
            x: 0,
            y: 0,
            duration: 0.8,
            ease: "power2.out"
          });
        };
        
        wrapper.addEventListener("mousemove", onMouseMoveTilt);
        wrapper.addEventListener("mouseleave", onMouseLeaveTilt);
      });

      // Skills section — staggered row reveal (label fade-in is handled by
      // the generic .reveal-up batch above, since .section-label has that class)
      gsap.utils.toArray<HTMLElement>(".skills-row-v2").forEach((row) => {
        const cat = row.querySelector(".skills-row-cat");
        const pills = row.querySelectorAll(".skill-pill-v2");
        gsap.fromTo(cat,
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 0.7, ease: "power2.out",
            scrollTrigger: { trigger: row, start: "top 80%" } }
        );
        gsap.fromTo(pills,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.04, ease: "power2.out",
            scrollTrigger: { trigger: row, start: "top 80%" }, delay: 0.15 }
        );
      });

      // Journey: single tracking dot + progress line
      const journeyRail = document.querySelector(".journey-rail") as HTMLElement | null;
      const journeyRailFill = document.querySelector(".journey-rail-fill") as HTMLElement | null;
      const journeyItems = gsap.utils.toArray<HTMLElement>(".journey-item-box");

      // Fade reveal per row (independent timing, unaffected by dot-tracking logic)
      journeyItems.forEach((item) => {
        gsap.fromTo(item,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.7, ease: "power2.out",
            scrollTrigger: { trigger: item, start: "top 75%" },
          }
        );
      });

      // Single source of truth: line fill + tracking dot, measured directly
      // from the rail's real bounding box vs the viewport center on every
      // animation frame — runs on gsap.ticker (not a bounded ScrollTrigger
      // start/end range) so it can never "freeze" partway down the page.
      if (journeyRail && journeyRailFill) {
        updateJourneyDot = () => {
          const railRect = journeyRail.getBoundingClientRect();
          const viewportCenter = window.innerHeight / 2;
          const fillPx = viewportCenter - railRect.top;
          const pct = Math.max(0, Math.min(100, (fillPx / railRect.height) * 100));
          gsap.set(journeyRailFill, { height: `${pct}%` });
        };
        gsap.ticker.add(updateJourneyDot);
      }

      // About: scroll-pin stacking panels. Only panels that get COVERED by
      // a following panel need to be pinned — the last panel has nothing
      // stacking on top of it within this flow, so it stays a normal,
      // unpinned section.
      const aboutPanels = gsap.utils.toArray<HTMLElement>(".about-flow-section");

      aboutPanels.forEach((panel, i) => {
        const isLast = i === aboutPanels.length - 1;
        if (isLast) return;

        ScrollTrigger.create({
          trigger: panel,
          start: "top top",
          end: () => "+=" + window.innerHeight,
          pin: true,
          pinSpacing: false,
          anticipatePin: 1,
        });

        // Card stack transition (opacity + scale scrub) is active on both mobile and desktop
        const inner = panel.querySelector(".about-flow-inner");
        gsap.to(inner, {
          scale: 0.88, opacity: 0.25, ease: "none",
          transformOrigin: "bottom left",
          scrollTrigger: {
            trigger: panel,
            start: "top top",
            end: () => "+=" + window.innerHeight,
            scrub: true,
          },
        });
      });

      // Layout above (pins, journey rail, etc.) can shift measured positions
      // after mount — force ScrollTrigger to recalculate everything once
      // more so later sections (Stats, Journey, Projects) line up correctly.
      requestAnimationFrame(() => ScrollTrigger.refresh());
    });
    return () => {
      window.removeEventListener("mousemove", onMouseMoveGlow);
      interactives.forEach(el => {
        el.removeEventListener("mouseenter", onMouseEnterGlow);
        el.removeEventListener("mouseleave", onMouseLeaveGlow);
      });
      document.removeEventListener("click", onAnchorClick);
      if (updateJourneyDot) gsap.ticker.remove(updateJourneyDot);
      gsap.ticker.remove(raf);
      lenis.destroy();
      ctx.revert();
    };
  }, [introDone]);

  return (
    <>
      {!introDone && <IntroScreen onComplete={() => {
        sessionStorage.setItem("intro_shown", "true");
        setIntroDone(true);
      }} />}}
      {/* Global constellation background — fixed, renders behind everything */}
      <ConstellationCanvas />

      {/* ── HEADER / NAV ── */}
      <header className="hero-header" ref={navRef}>
        <nav className="hero-nav">
          <div className="hero-nav-name">
            <a href="#" className="hero-nav-name-link">
              <h2>RIKO<br />TRONIC</h2>
            </a>
          </div>
          <div className="hero-nav-status">
            <p>Available for<br />Work &amp;<br />Freelance</p>
          </div>
          <div className="hero-nav-tagline">
            <span className="hero-nav-tagline-gradient">Economics</span>
            <span className="hero-nav-tagline-x"> × </span>
            <span className="hero-nav-tagline-white">Blockchain</span>
          </div>
          <div className="hero-nav-burger">
            <button className="burger-btn" aria-label="Menu" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen
                ? <span style={{ fontSize:"1.2rem", color:"#18181b", fontWeight:700, lineHeight:1 }}>✕</span>
                : <><span className="burger-line" /><span className="burger-line" /></>
              }
            </button>
          </div>
        </nav>
      </header>

      {/* ── FULLSCREEN MENU ── */}
      <div className={`fullscreen-menu ${menuOpen ? "open" : ""}`}>
        <nav className="fullscreen-menu-nav">
          <a href="#about"   className="fullscreen-menu-link" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#journey" className="fullscreen-menu-link" onClick={() => setMenuOpen(false)}>Career</a>
          <a href="#work"    className="fullscreen-menu-link" onClick={() => setMenuOpen(false)}>Projects</a>
          <a href="#skills"  className="fullscreen-menu-link" onClick={() => setMenuOpen(false)}>Skills</a>
          <a href="#contact" className="fullscreen-menu-link" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>
      </div>

      {/* ── HERO ── */}
      <section className="hero" id="home">
        {/* Full-bleed background image — parallax target */}
        <div className="hero-bg-layer">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hero-bg4.png"
            alt="Workspace"
            className="hero-card-bg"
            style={{
              width: '130%',
              height: '130%',
              maxWidth: 'none',
              objectFit: 'cover',
              position: 'absolute',
              top: '-15%',
              left: '-15%',
              opacity: 0.75,           
              filter: 'brightness(0.85) saturate(1.2)'  
            }}
          />
          <div className="hero-card-overlay" />
        </div>

        <div className="hero-card-content">
          <div className="hero-grid">
            {/* LEFT COLUMN — Signature + Social */}
            <div className="hero-col-left">
              <div className="hero-signature">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/RT.png" alt="RT" className="hero-sig-logo" />
              </div>
              <div className="hero-social-pill">
                <a href="https://github.com/tronic21-ctrl" target="_blank" rel="noreferrer" className="hero-social-circle">
                  <svg viewBox="0 0 496 512" fill="currentColor" width="20" height="20"><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8z"/></svg>
                </a>
                <a href="https://x.com/rikotronic" target="_blank" rel="noreferrer" className="hero-social-circle">
                  <svg viewBox="0 0 512 512" fill="currentColor" width="18" height="18"><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/></svg>
                </a>
                <a href="mailto:rikotronic.dev@gmail.com" target="_blank" rel="noreferrer" className="hero-social-circle">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path fill="none" d="M0 0h24v24H0z"/><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/></svg>
                </a>
              </div>
            </div>

            {/* RIGHT COLUMN — Name + Title + CTA */}
            <div className="hero-col-right">
              <div className="hero-eyebrow" ref={heroEyebrowRef}>
                Web3 Developer · DeFi Analytics · Indonesia
              </div>
              <h1 className="hero-name">
                <div className="hero-name-mask">
                  <span className="hero-name-line">RIKO</span>
                </div>
                <div className="hero-name-mask">
                  <span className="hero-name-line accent-word">TRONIC</span>
                </div>
              </h1>
              <p className="hero-tagline" ref={heroTaglineRef}>
                Web3 Developer<br />based in Indonesia
              </p>
              <div className="hero-cta-wrap" ref={heroCtaRef}>
                <a href="/CV_Demianus_Toatubun.pdf" target="_blank" rel="noreferrer" className="space-btn">
                  <strong>DOWNLOAD CV</strong>
                  <span className="space-btn-glow" />
                </a>
              </div>
            </div>
          </div>

          <div className="hero-scroll-hint" ref={heroScrollRef}>
            <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
              <path d="M8 0v20M1 13l7 7 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            SCROLL
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <div id="about" className="about-flow-container">
        {/* Panel 01 — Executive Overview */}
        <section className="about-flow-section about-panel-base" aria-label="Executive Overview">
          <div className="about-flow-inner">
            <div className="about-flow-label">— 01 — EXECUTIVE OVERVIEW</div>
            <h2 className="about-flow-heading">
              ECONOMICS <span className="accent-word">× WEB3</span><br/>LEADERSHIP.
            </h2>
            <p className="about-flow-body">
              I&apos;m <strong>Riko Toatubun</strong> known online as <strong>Riko Tronic</strong>.
              Fresh Economics graduate (S1 Ekonomi Pembangunan, UNINGRAT Tual, Dec 2025)
              from Indonesia, self-directed into Web3 development in April 2026.
            </p>
            <p className="about-flow-body about-flow-body-sub">
              My Economics background isn&apos;t just a credential it shapes how I think about
              protocol design, incentive structures, and DeFi analytics.
            </p>
          </div>
        </section>

        {/* Panel 02 — Strategic Mission */}
        <section className="about-flow-section about-panel-invert" aria-label="Strategic Mission">
          <div className="about-flow-inner">
            <div className="about-flow-label">— 02 — STRATEGIC MISSION</div>
            <h2 className="about-flow-heading">
              BUILDING <span className="accent-word-dark">ON-CHAIN.</span><br/>DEFI ANALYTICS.
            </h2>
            <p className="about-flow-body">
              My strategic focus is building at the intersection of protocol economics and on-chain analytics. 
              I develop secure full-stack dApps using Solidity and React, and construct deep indexing pipelines 
              via The Graph to decode raw blockchain logs into structured, value-proven economic insights.
            </p>
            <div className="pipeline-flow">
              <div className="pipeline-track" />
              <div className="pipeline-flow-dot" />
              {ABOUT_VALUE_CARDS.map((c) => (
                <div className="pipeline-node" key={c.title}>
                  <div className="pipeline-node-marker">
                    <svg viewBox="0 0 20 20" width="28" height="28">
                      <polygon points="10,3 16,6.5 10,10 4,6.5" fill="var(--accent)" />
                      <polygon points="4,6.5 10,10 10,17 4,13.5" fill="rgba(56,189,248,0.6)" />
                      <polygon points="16,6.5 10,10 10,17 16,13.5" fill="rgba(56,189,248,0.32)" />
                    </svg>
                  </div>
                  <div className="pipeline-node-label">{c.title}</div>
                  <p className="pipeline-node-desc">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Panel 03 — Track Record */}
        <section className="about-flow-section about-panel-deep" aria-label="Track Record">
          <div className="about-flow-inner">
            <div className="about-flow-label">— 03 — TRACK RECORD</div>
            <h2 className="about-flow-heading">
              PROVEN <span className="accent-word">BY CODE.</span>
            </h2>
            <div className="about-stats-glass code-editor-container">
              <div className="code-editor-header">
                <div className="code-editor-dots">
                  <span className="dot dot-red"></span>
                  <span className="dot dot-yellow"></span>
                  <span className="dot dot-green"></span>
                </div>
                <div className="code-editor-tabs">
                  <div className="code-editor-tab active">
                    <span className="tab-icon">{"{ }"}</span>
                    <span className="tab-name">proven_by_code.json</span>
                  </div>
                </div>
                <span className="about-stats-status">Verified</span>
              </div>
              <div className="code-editor-body">
                <div className="code-line">
                  <span className="line-number">01</span>
                  <span className="code-token bracket">{"{"}</span>
                </div>
                
                {/* Months Self-Taught */}
                <div className="code-line">
                  <span className="line-number">02</span>
                  <span className="code-indent">  </span>
                  <span className="code-token key">&quot;months_self_taught&quot;</span>
                  <span className="code-token colon">:</span>{" "}
                  <span className="code-token string">&quot;</span>
                  <span className="code-token number amn-0">0</span>
                  <span className="code-token string">&quot;</span>
                  <span className="code-token comma">,</span>
                  <span className="code-token comment">{" // self-directed route in Web3"}</span>
                </div>

                {/* Test Coverage */}
                <div className="code-line flex-wrap-bar">
                  <div className="code-line-main">
                    <span className="line-number">03</span>
                    <span className="code-indent">  </span>
                    <span className="code-token key">&quot;test_coverage&quot;</span>
                    <span className="code-token colon">:</span>{" "}
                    <span className="code-token string">&quot;</span>
                    <span className="code-token number amn-1">0</span>
                    <span className="code-token string">&quot;</span>
                    <span className="code-token comma">,</span>
                    <span className="code-token comment">{" // unit testing via Foundry"}</span>
                  </div>
                  <div className="code-inline-bar-wrapper">
                    <div className="code-inline-bar-track">
                      <div className="code-inline-bar-fill amb-1" />
                    </div>
                  </div>
                </div>

                {/* Subgraph Synced */}
                <div className="code-line flex-wrap-bar">
                  <div className="code-line-main">
                    <span className="line-number">04</span>
                    <span className="code-indent">  </span>
                    <span className="code-token key">&quot;subgraph_synced&quot;</span>
                    <span className="code-token colon">:</span>{" "}
                    <span className="code-token string">&quot;</span>
                    <span className="code-token number amn-2">0</span>
                    <span className="code-token string">&quot;</span>
                    <span className="code-token comma">,</span>
                    <span className="code-token comment">{" // indexing decentralized logs"}</span>
                  </div>
                  <div className="code-inline-bar-wrapper">
                    <div className="code-inline-bar-track">
                      <div className="code-inline-bar-fill amb-2" />
                    </div>
                  </div>
                </div>

                {/* Smart Contracts Verified */}
                <div className="code-line">
                  <span className="line-number">05</span>
                  <span className="code-indent">  </span>
                  <span className="code-token key">&quot;verified_contracts&quot;</span>
                  <span className="code-token colon">:</span>{" "}
                  <span className="code-token number amn-3">0</span>
                  <span className="code-token comment">{" // Sepolia contracts deployed"}</span>
                </div>

                <div className="code-line">
                  <span className="line-number">06</span>
                  <span className="code-token bracket">{"}"}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ── STATS ── */}
      <section className="stats-section" id="stats">
        <div className="stats-grid">
          {STATS.map((s, i) => (
            <div className="stat-item" key={i}>
              <div className={`stat-number sn-${i}`}>0{s.suffix}</div>
              <div className="stat-label">{s.label}</div>
              <div className="stat-sublabel">{s.sublabel}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CAREER & EXPERIENCE TIMELINE ── */}
      <section className="journey-section" id="journey">
        <div className="section-label reveal-up" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2.5rem' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-[spin_7s_linear_infinite]" style={{ color: 'var(--text-muted)' }}><path d="M12 2v20M17 5l-10 14M22 12H2M19 17L5 7"/></svg>
          <span style={{ fontSize: '1rem', fontWeight: 600, letterSpacing: '0.05em', color: 'var(--text-main)', textTransform: 'uppercase' }}>Career & Experience</span>
        </div>

        <div className="journey-container">
          <div className="journey-rail">
            <div className="journey-rail-fill">
              <span className="journey-track-dot" />
            </div>
          </div>

          {JOURNEY.map((item, i) => (
            <div className="journey-item-box" key={i} data-journey-index={i}>
              {/* Desktop layout: split columns */}
              <div className="journey-desktop-row">
                <div className="journey-info-side">
                  <div className="journey-title-company">
                    <h4 className="journey-role-title">{item.role}</h4>
                    <h5 className="journey-role-company">{item.company}</h5>
                  </div>
                  <h3 className="journey-date">{item.date}</h3>
                </div>
                
                <div className="journey-rail-spacer" />
                
                <div className="journey-desc-side">
                  <p className="journey-desc">{item.desc}</p>
                </div>
              </div>

              {/* Mobile layout: stacked */}
              <div className="journey-mobile-row">
                <div className="journey-info-side">
                  <h4 className="journey-role-title">{item.role}</h4>
                  <h5 className="journey-role-company">{item.company}</h5>
                  <h3 className="journey-date">{item.date}</h3>
                </div>
                <p className="journey-desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SELECTED PROJECTS INTRO ── */}
      <section className="projects-section-intro" id="work">
        <div className="intro-container">
          <div className="section-label reveal-up" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2.5rem' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-[spin_7s_linear_infinite]" style={{ color: 'var(--text-muted)' }}><path d="M12 2v20M17 5l-10 14M22 12H2M19 17L5 7"/></svg>
            <span style={{ fontSize: '1rem', fontWeight: 600, letterSpacing: '0.05em', color: 'var(--text-main)', textTransform: 'uppercase' }}>Projects</span>
          </div>
          <div className="intro-main">
            <h2 className="intro-title">
              SELECTED <span className="purple-gradient-text">PROJECTS</span> / <span className="projects-count">( {PROJECTS.length} )</span>
            </h2>
            <p className="intro-desc">
              Self-directed builds shipped from zero to mainnet in three months — each one a step in learning Web3 by actually building it.
            </p>
          </div>
        </div>
      </section>

      {/* ── PROJECTS LIST ── */}
      <section className="projects-list-section">
        {PROJECTS.map((p, i) => (
          <div className="project-item-row" key={p.num} id={`project-${i}`}>
            {/* Sticky left column containing project index number */}
            <div className="project-sticky-left">
              <span className="project-row-number">{p.num}</span>
            </div>
            
            {/* Right column containing details and mockups */}
            <div className="project-scroll-right">
              {/* Project Meta */}
              <div className="project-meta-tags">
                {p.tagsString.split(" - ").join(" / ")}
                <span className="project-meta-year">— {p.pills[p.pills.length - 1]}</span>
              </div>

              {/* Project Title */}
              <h3 className="project-row-title">{p.title}</h3>
              
              {/* Project Description */}
              <p className="project-row-desc">{p.desc}</p>
              
              {/* Project Actions */}
              <div className="project-row-actions">
                <a href={p.link} target="_blank" rel="noreferrer" className="project-link">
                  GitHub <span className="project-link-arrow">↗</span>
                </a>
                {p.live !== "#" && (
                  <a href={p.live} target="_blank" rel="noreferrer" className="project-link">
                    Live Demo <span className="project-link-arrow">↗</span>
                  </a>
                )}
              </div>

              {/* 3D Perspective Mockup Showcase */}
              <div className="mockup-perspective-wrapper">
                <div className="mockup-card-primary">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.imgMain} alt={`${p.title} Desktop`} className="mockup-img" />
                </div>
                <div className="mockup-card-secondary" data-y-offset="-20">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.imgSub} alt={`${p.title} Mobile`} className="mockup-img" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>


      {/* ── STACK MARQUEE ── */}
      <section className="marquee-section">
        <div className="marquee-track track-left">
          {[...Array(6)].map((_, i) => (
            <React.Fragment key={i}>
              <span className="marquee-text">WEB3 DEVELOPER</span>
              <svg className="marquee-star animate-[spin_7s_linear_infinite]" viewBox="0 0 100 101" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M49.8234 1.99099C49.4293 9.09696 46.8886 17.4122 43.0707 24.0426C35.0272 38.01 21.1141 47.4665 5.21739 49.7899C4.1712 49.9394 2.55435 50.1024 1.65761 50.1567C0.747283 50.1975 0 50.279 0 50.3334C0 50.3877 0.747283 50.4692 1.65761 50.51C2.55435 50.5644 4.1712 50.7274 5.21739 50.8769C21.1141 53.2002 35.0272 62.6567 43.0707 76.6241C46.8886 83.2546 49.4293 91.5698 49.8234 98.6758C49.8641 99.5861 49.9457 100.333 50 100.333C50.0543 100.333 50.1359 99.5861 50.1766 98.6758C50.5707 91.5698 53.1114 83.2546 56.9293 76.6241C64.9728 62.6567 78.8859 53.2002 94.7826 50.8769C95.8288 50.7274 97.4456 50.5644 98.3424 50.51C99.2527 50.4692 100 50.3877 100 50.3334C100 50.279 99.2527 50.1975 98.3424 50.1567C97.4456 50.1024 95.8288 49.9394 94.7826 49.7899C78.8859 47.4665 64.9728 38.01 56.9293 24.0426C53.1114 17.4122 50.5707 9.09696 50.1766 1.99099C50.1359 1.08066 50.0543 0.333377 50 0.333377C49.9457 0.333377 49.8641 1.08066 49.8234 1.99099Z" />
              </svg>
              <span className="marquee-text">ECONOMICS × BLOCKCHAIN</span>
              <svg className="marquee-star animate-[spin_7s_linear_infinite]" viewBox="0 0 100 101" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M49.8234 1.99099C49.4293 9.09696 46.8886 17.4122 43.0707 24.0426C35.0272 38.01 21.1141 47.4665 5.21739 49.7899C4.1712 49.9394 2.55435 50.1024 1.65761 50.1567C0.747283 50.1975 0 50.279 0 50.3334C0 50.3877 0.747283 50.4692 1.65761 50.51C2.55435 50.5644 4.1712 50.7274 5.21739 50.8769C21.1141 53.2002 35.0272 62.6567 43.0707 76.6241C46.8886 83.2546 49.4293 91.5698 49.8234 98.6758C49.8641 99.5861 49.9457 100.333 50 100.333C50.0543 100.333 50.1359 99.5861 50.1766 98.6758C50.5707 91.5698 53.1114 83.2546 56.9293 76.6241C64.9728 62.6567 78.8859 53.2002 94.7826 50.8769C95.8288 50.7274 97.4456 50.5644 98.3424 50.51C99.2527 50.4692 100 50.3877 100 50.3334C100 50.279 99.2527 50.1975 98.3424 50.1567C97.4456 50.1024 95.8288 49.9394 94.7826 49.7899C78.8859 47.4665 64.9728 38.01 56.9293 24.0426C53.1114 17.4122 50.5707 9.09696 50.1766 1.99099C50.1359 1.08066 50.0543 0.333377 50 0.333377C49.9457 0.333377 49.8641 1.08066 49.8234 1.99099Z" />
              </svg>
              <span className="marquee-text">BUILDING ON-CHAIN</span>
              <svg className="marquee-star animate-[spin_7s_linear_infinite]" viewBox="0 0 100 101" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M49.8234 1.99099C49.4293 9.09696 46.8886 17.4122 43.0707 24.0426C35.0272 38.01 21.1141 47.4665 5.21739 49.7899C4.1712 49.9394 2.55435 50.1024 1.65761 50.1567C0.747283 50.1975 0 50.279 0 50.3334C0 50.3877 0.747283 50.4692 1.65761 50.51C2.55435 50.5644 4.1712 50.7274 5.21739 50.8769C21.1141 53.2002 35.0272 62.6567 43.0707 76.6241C46.8886 83.2546 49.4293 91.5698 49.8234 98.6758C49.8641 99.5861 49.9457 100.333 50 100.333C50.0543 100.333 50.1359 99.5861 50.1766 98.6758C50.5707 91.5698 53.1114 83.2546 56.9293 76.6241C64.9728 62.6567 78.8859 53.2002 94.7826 50.8769C95.8288 50.7274 97.4456 50.5644 98.3424 50.51C99.2527 50.4692 100 50.3877 100 50.3334C100 50.279 99.2527 50.1975 98.3424 50.1567C97.4456 50.1024 95.8288 49.9394 94.7826 49.7899C78.8859 47.4665 64.9728 38.01 56.9293 24.0426C53.1114 17.4122 50.5707 9.09696 50.1766 1.99099C50.1359 1.08066 50.0543 0.333377 50 0.333377C49.9457 0.333377 49.8641 1.08066 49.8234 1.99099Z" />
              </svg>
            </React.Fragment>
          ))}
        </div>
        <div className="marquee-track track-right">
          {[...Array(6)].map((_, i) => (
            <React.Fragment key={i}>
              <span className="marquee-text">DEFI ANALYTICS</span>
              <svg className="marquee-star animate-[spin_7s_linear_infinite]" viewBox="0 0 100 101" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M49.8234 1.99099C49.4293 9.09696 46.8886 17.4122 43.0707 24.0426C35.0272 38.01 21.1141 47.4665 5.21739 49.7899C4.1712 49.9394 2.55435 50.1024 1.65761 50.1567C0.747283 50.1975 0 50.279 0 50.3334C0 50.3877 0.747283 50.4692 1.65761 50.51C2.55435 50.5644 4.1712 50.7274 5.21739 50.8769C21.1141 53.2002 35.0272 62.6567 43.0707 76.6241C46.8886 83.2546 49.4293 91.5698 49.8234 98.6758C49.8641 99.5861 49.9457 100.333 50 100.333C50.0543 100.333 50.1359 99.5861 50.1766 98.6758C50.5707 91.5698 53.1114 83.2546 56.9293 76.6241C64.9728 62.6567 78.8859 53.2002 94.7826 50.8769C95.8288 50.7274 97.4456 50.5644 98.3424 50.51C99.2527 50.4692 100 50.3877 100 50.3334C100 50.279 99.2527 50.1975 98.3424 50.1567C97.4456 50.1024 95.8288 49.9394 94.7826 49.7899C78.8859 47.4665 64.9728 38.01 56.9293 24.0426C53.1114 17.4122 50.5707 9.09696 50.1766 1.99099C50.1359 1.08066 50.0543 0.333377 50 0.333377C49.9457 0.333377 49.8641 1.08066 49.8234 1.99099Z" />
              </svg>
              <span className="marquee-text">SMART CONTRACT SECURITY</span>
              <svg className="marquee-star animate-[spin_7s_linear_infinite]" viewBox="0 0 100 101" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M49.8234 1.99099C49.4293 9.09696 46.8886 17.4122 43.0707 24.0426C35.0272 38.01 21.1141 47.4665 5.21739 49.7899C4.1712 49.9394 2.55435 50.1024 1.65761 50.1567C0.747283 50.1975 0 50.279 0 50.3334C0 50.3877 0.747283 50.4692 1.65761 50.51C2.55435 50.5644 4.1712 50.7274 5.21739 50.8769C21.1141 53.2002 35.0272 62.6567 43.0707 76.6241C46.8886 83.2546 49.4293 91.5698 49.8234 98.6758C49.8641 99.5861 49.9457 100.333 50 100.333C50.0543 100.333 50.1359 99.5861 50.1766 98.6758C50.5707 91.5698 53.1114 83.2546 56.9293 76.6241C64.9728 62.6567 78.8859 53.2002 94.7826 50.8769C95.8288 50.7274 97.4456 50.5644 98.3424 50.51C99.2527 50.4692 100 50.3877 100 50.3334C100 50.279 99.2527 50.1975 98.3424 50.1567C97.4456 50.1024 95.8288 49.9394 94.7826 49.7899C78.8859 47.4665 64.9728 38.01 56.9293 24.0426C53.1114 17.4122 50.5707 9.09696 50.1766 1.99099C50.1359 1.08066 50.0543 0.333377 50 0.333377C49.9457 0.333377 49.8641 1.08066 49.8234 1.99099Z" />
              </svg>
              <span className="marquee-text">INDONESIA</span>
              <svg className="marquee-star animate-[spin_7s_linear_infinite]" viewBox="0 0 100 101" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M49.8234 1.99099C49.4293 9.09696 46.8886 17.4122 43.0707 24.0426C35.0272 38.01 21.1141 47.4665 5.21739 49.7899C4.1712 49.9394 2.55435 50.1024 1.65761 50.1567C0.747283 50.1975 0 50.279 0 50.3334C0 50.3877 0.747283 50.4692 1.65761 50.51C2.55435 50.5644 4.1712 50.7274 5.21739 50.8769C21.1141 53.2002 35.0272 62.6567 43.0707 76.6241C46.8886 83.2546 49.4293 91.5698 49.8234 98.6758C49.8641 99.5861 49.9457 100.333 50 100.333C50.0543 100.333 50.1359 99.5861 50.1766 98.6758C50.5707 91.5698 53.1114 83.2546 56.9293 76.6241C64.9728 62.6567 78.8859 53.2002 94.7826 50.8769C95.8288 50.7274 97.4456 50.5644 98.3424 50.51C99.2527 50.4692 100 50.3877 100 50.3334C100 50.279 99.2527 50.1975 98.3424 50.1567C97.4456 50.1024 95.8288 49.9394 94.7826 49.7899C78.8859 47.4665 64.9728 38.01 56.9293 24.0426C53.1114 17.4122 50.5707 9.09696 50.1766 1.99099C50.1359 1.08066 50.0543 0.333377 50 0.333377C49.9457 0.333377 49.8641 1.08066 49.8234 1.99099Z" />
              </svg>
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section className="skills-section" id="skills">
        <div className="section-label reveal-up" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2.5rem' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-[spin_7s_linear_infinite]" style={{ color: 'var(--text-muted)' }}><path d="M12 2v20M17 5l-10 14M22 12H2M19 17L5 7"/></svg>
          <span style={{ fontSize: '1rem', fontWeight: 600, letterSpacing: '0.05em', color: 'var(--text-main)', textTransform: 'uppercase' }}>Skills &amp; Stack</span>
        </div>

        <div className="skills-container-v2">
          {(["Frontend", "Blockchain", "Protocols", "Economics"] as const).map((cat) => {
            const catSkills = SKILLS.filter(s => s.cat === cat);
            return (
              <div className="skills-row-v2" key={cat}>
                <div className="skills-row-left">
                  <span className="skills-row-cat">{cat}</span>
                </div>
                <div className="skills-row-right">
                  {catSkills.map((skill, i) => (
                    <div className="skill-pill-v2" key={i}>
                      <SkillIcon skill={skill} />
                      <span className="skill-pill-name">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── FOOTER / CONTACT ── */}
      <section className="footer-section" id="contact">
        <div className="section-label reveal-up" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '4rem' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-[spin_7s_linear_infinite]" style={{ color: 'var(--text-muted)' }}><path d="M12 2v20M17 5l-10 14M22 12H2M19 17L5 7"/></svg>
          <span style={{ fontSize: '1rem', fontWeight: 600, letterSpacing: '0.05em', color: 'var(--text-main)', textTransform: 'uppercase' }}>Get in Touch</span>
        </div>

        <div className="footer-contact-grid">
          <div className="footer-particles" aria-hidden="true">
            {[...Array(16)].map((_, i) => <span className="footer-particle" key={i} />)}
          </div>
          <div className="contact-details-side">
            <h2 className="contact-heading reveal-up">
              LET&apos;S TALK<br />
              <span className="accent-word">ABOUT YOUR IDEA.</span>
            </h2>
            <p className="contact-desc reveal-up">
              Have a protocol to launch, a DeFi dashboard to build, or want to discuss tokenomics and incentive design? Let&apos;s connect and create something secure and powerful together.
            </p>
            
            <div className="contact-info-list reveal-up">
              <div className="contact-info-card group">
                <div className="contact-info-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </div>
                <div className="contact-info-text">
                  <span className="contact-info-label">Email Me</span>
                  <a href="mailto:rikotronic.dev@gmail.com" className="contact-info-val-link">rikotronic.dev@gmail.com</a>
                </div>
              </div>

              <div className="contact-info-card group">
                <div className="contact-info-icon">
                  <svg viewBox="0 0 496 512" fill="currentColor" width="20" height="20">
                    <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8z"/>
                  </svg>
                </div>
                <div className="contact-info-text">
                  <span className="contact-info-label">GitHub Profile</span>
                  <a href="https://github.com/tronic21-ctrl" target="_blank" rel="noreferrer" className="contact-info-val-link">github.com/tronic21-ctrl</a>
                </div>
              </div>

              <div className="contact-info-card group">
                <div className="contact-info-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                    <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div className="contact-info-text">
                  <span className="contact-info-label">Location</span>
                  <span className="contact-info-val">Indonesia</span>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-side reveal-up">
            <form action="https://formspree.io/f/mwvznanb" method="POST">
              <div className="contact-form-group">
                <label>Name</label>
                <input type="text" name="name" placeholder="Your name" required />
              </div>
              <div className="contact-form-group">
                <label>Email</label>
                <input type="email" name="email" placeholder="your@email.com" required />
              </div>
              <div className="contact-form-group">
                <label>Message</label>
                <textarea name="message" rows={5} placeholder="What are you building?" required />
              </div>
              <button type="submit" className="space-btn" style={{ width: "100%", marginTop: "1rem" }}>
                <strong>SEND MESSAGE</strong>
                <span className="space-btn-glow" />
              </button>
            </form>
          </div>
        </div>

        {/* Ghost name marquee divider */}
        <div className="footer-hero-wrap">
          <div className="footer-ghost-marquee" aria-hidden="true">
            <div className="marquee-track track-left">
              {[...Array(6)].map((_, i) => (
                <span className="ghost-marquee-text" key={i}>Riko Tronic&nbsp;•&nbsp;</span>
              ))}
            </div>
          </div>

        {/* Closing statement */}
        <div className="footer-closing">
          <div className="footer-closing-left">
            <h3 className="footer-closing-heading">
              LET&apos;S BUILD<br /><span className="accent-word">ON-CHAIN.</span>
            </h3>
            <a href="/CV_Demianus_Toatubun.pdf" target="_blank" rel="noreferrer" className="space-btn">
              <strong>DOWNLOAD CV</strong>
              <span className="space-btn-glow" />
            </a>
          </div>
          <div className="footer-closing-right">
            <div className="footer-closing-block">
              <span className="footer-closing-label">Socials</span>
              <div className="footer-closing-icons">
                <a href="https://github.com/tronic21-ctrl" target="_blank" rel="noreferrer" aria-label="GitHub">
                  <svg viewBox="0 0 496 512" fill="currentColor" width="18" height="18"><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8z"/></svg>
                </a>
                <a href="https://x.com/rikotronic" target="_blank" rel="noreferrer" aria-label="X">
                  <svg viewBox="0 0 512 512" fill="currentColor" width="16" height="16"><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/></svg>
                </a>
                <a href="https://dune.com/rikotronic" target="_blank" rel="noreferrer" aria-label="Dune">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18"><path d="M3 3v18h18"/><path d="M18.7 8 12 15l-3-3-4 4"/></svg>
                </a>
              </div>
            </div>
            <div className="footer-closing-block">
              <span className="footer-closing-label">Contact</span>
              <a href="mailto:rikotronic.dev@gmail.com" className="footer-closing-email">rikotronic.dev@gmail.com</a>
            </div>
          </div>
        </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-left">
            © 2026 Riko Tronic · Portfolio v2 · Built with Next.js + GSAP
          </div>
          <div className="footer-tagline">
            <span>Build</span><span className="dot">•</span><span>Test</span><span className="dot">•</span><span className="accent">Deploy</span>
          </div>
        </div>
      </section>

      {/* Floating scroll-to-top */}
      <button
        className={`scroll-top-btn${scrollTopVisible ? " visible" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll to top"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
      </button>

      {/* Custom Glowing Cursor Blob */}
      <div className="cursor-glow-blob" />
    </>
  );
}