"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Mail,
  Phone,
  Menu,
  X,
  ArrowRight,
  Users,
  BookOpen,
  Heart,
  Globe,
  ExternalLink,
} from "lucide-react";

/* ─────────────────────────────────────────────
   HOOK: useInView  (replaces IntersectionObserver boilerplate)
───────────────────────────────────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const NAV_LINKS = ["About", "Initiatives", "Impact", "Get Involved", "Contact"];

const HERO_LINES = [
  "Faith in Action.",
  "Service with Purpose.",
  "Rooted in London.",
];

const PILLARS = [
  {
    icon: BookOpen,
    tag: "Leadership",
    title: "Church Leadership Training",
    body: "We equip current and emerging church leaders with theological grounding, practical skills, and mentorship — building capacity for lasting Kingdom impact across London and beyond.",
    accent: "#C8A96E",
    image: "/images/one-london-6.jpg",
  },
  {
    icon: Users,
    tag: "Community",
    title: "Community Service",
    body: "From food banks to housing support, our teams meet practical needs in underserved London communities — because faith without works is incomplete.",
    accent: "#6EA8C8",
    image: "/images/one-london-7.jpg",
  },
  {
    icon: Heart,
    tag: "Welfare",
    title: "Social Welfare & Support",
    body: "We walk alongside vulnerable individuals and families — offering counselling, financial guidance, and pastoral care rooted in Christian compassion.",
    accent: "#C86E8A",
    image: "/images/one-london-3.jpg",
  },
  {
    icon: Globe,
    tag: "Mission",
    title: "Missional Partnerships",
    body: "We collaborate with churches, charities, and community organisations to amplify impact — building a united Christian voice for justice and renewal in the city.",
    accent: "#6EC89A",
    image: "/images/one-london-2.jpg",
  },
];

const STATS = [
  { value: "10+", label: "Years Serving London" },
  { value: "500+", label: "Leaders Trained" },
  { value: "20+", label: "Partner Churches" },
  { value: "3,000+", label: "Lives Impacted" },
];

const STORIES = [
  {
    name: "Pastor James Osei",
    role: "Leadership Programme Graduate",
    quote:
      "The training I received through One London gave me not just knowledge, but the confidence and community to lead with purpose. My church has grown in health and in numbers.",
    image: "/images/one-london-1.jpg",
  },
  {
    name: "The Mensah Family",
    role: "Community Support Beneficiaries",
    quote:
      "When we went through our hardest season, One London was there — practically and spiritually. We didn't just receive help; we found a family.",
    image: "/images/one-london-2.jpg",
  },
  {
    name: "Rev. Sarah Adeyemi",
    role: "Partner Church Leader",
    quote:
      "One London has been a true partner — not just in resources, but in vision. Together we are doing things neither of us could do alone.",
    image: "/images/one-london-3.jpg",
  },
];

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export default function OneLondonCharity() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeStory, setActiveStory] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [heroLine, setHeroLine] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });

  const heroRef = useRef<HTMLDivElement>(null);
  const about = useInView();
  const pillarsSection = useInView();
  const statsSection = useInView();
  const storiesSection = useInView();
  const ctaSection = useInView();
  const contactSection = useInView();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const id = setInterval(
      () => setHeroLine((p) => (p + 1) % HERO_LINES.length),
      3200,
    );
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) =>
      setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const prevStory = () =>
    setActiveStory((p) => (p - 1 + STORIES.length) % STORIES.length);
  const nextStory = () => setActiveStory((p) => (p + 1) % STORIES.length);

  return (
    <>
      {/* ── Global styles ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --ink: #0D0D0D;
          --cream: #F7F3EE;
          --gold: #C8A96E;
          --gold-light: #E8D5A8;
          --muted: #6B6560;
          --border: rgba(13,13,13,0.12);
          --font-display: 'Cormorant Garamond', Georgia, serif;
          --font-body: 'DM Sans', sans-serif;
        }

        html { scroll-behavior: smooth; }

        body {
          font-family: var(--font-body);
          background: var(--cream);
          color: var(--ink);
          overflow-x: hidden;
        }

        /* Custom cursor */
        .custom-cursor {
          position: fixed;
          width: 12px; height: 12px;
          border-radius: 50%;
          background: var(--gold);
          pointer-events: none;
          z-index: 9999;
          transform: translate(-50%, -50%);
          transition: transform 0.1s ease;
          mix-blend-mode: multiply;
        }

        /* Scroll reveal */
        .reveal { opacity: 0; transform: translateY(36px); transition: opacity 0.9s cubic-bezier(.2,.8,.3,1), transform 0.9s cubic-bezier(.2,.8,.3,1); }
        .reveal.visible { opacity: 1; transform: none; }
        .reveal-delay-1 { transition-delay: 0.1s; }
        .reveal-delay-2 { transition-delay: 0.22s; }
        .reveal-delay-3 { transition-delay: 0.34s; }
        .reveal-delay-4 { transition-delay: 0.46s; }

        /* Fade from left */
        .reveal-left { opacity: 0; transform: translateX(-40px); transition: opacity 0.9s cubic-bezier(.2,.8,.3,1), transform 0.9s cubic-bezier(.2,.8,.3,1); }
        .reveal-left.visible { opacity: 1; transform: none; }

        /* Noise texture overlay */
        .noise::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 1;
        }

        /* Gold underline link */
        .gold-link {
          position: relative;
          text-decoration: none;
          color: inherit;
        }
        .gold-link::after {
          content: '';
          position: absolute;
          left: 0; bottom: -2px;
          width: 0; height: 1px;
          background: var(--gold);
          transition: width 0.35s ease;
        }
        .gold-link:hover::after { width: 100%; }

        /* Hero text cycling */
        @keyframes fadeSlideUp {
          0% { opacity: 0; transform: translateY(24px); }
          15% { opacity: 1; transform: translateY(0); }
          80% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-20px); }
        }
        .hero-cycling { animation: fadeSlideUp 3.2s ease-in-out infinite; }

        /* Nav link */
        .nav-link {
          font-size: 0.82rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-weight: 500;
          color: inherit;
          text-decoration: none;
          position: relative;
          padding-bottom: 2px;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 0; height: 1px;
          background: var(--gold);
          transition: width 0.3s ease;
        }
        .nav-link:hover::after { width: 100%; }

        /* Pill tag */
        .tag {
          font-family: var(--font-body);
          font-size: 0.68rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          font-weight: 600;
          padding: 4px 12px;
          border-radius: 999px;
          display: inline-block;
        }

        /* Pillar card */
        .pillar-card {
          background: #fff;
          border: 1px solid var(--border);
          border-radius: 2px;
          overflow: hidden;
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }
        .pillar-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 24px 60px rgba(0,0,0,0.1);
        }
        .pillar-card .card-img {
          height: 220px;
          position: relative;
          overflow: hidden;
        }
        .pillar-card .card-img img {
          transition: transform 0.6s ease;
        }
        .pillar-card:hover .card-img img {
          transform: scale(1.06);
        }

        /* Stat counter */
        .stat-number {
          font-family: var(--font-display);
          font-weight: 300;
          font-size: clamp(3rem, 6vw, 5.5rem);
          line-height: 1;
          color: var(--gold);
        }

        /* Story card */
        .story-card {
          background: var(--ink);
          color: var(--cream);
          border-radius: 2px;
          overflow: hidden;
        }

        /* Gold btn */
        .btn-gold {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--gold);
          color: var(--ink);
          font-family: var(--font-body);
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 14px 28px;
          border: none;
          border-radius: 0;
          cursor: pointer;
          text-decoration: none;
          transition: background 0.3s ease, gap 0.3s ease;
        }
        .btn-gold:hover {
          background: #b89455;
          gap: 14px;
        }

        /* Outline btn */
        .btn-outline {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          color: var(--ink);
          font-family: var(--font-body);
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 13px 27px;
          border: 1px solid var(--ink);
          border-radius: 0;
          cursor: pointer;
          text-decoration: none;
          transition: background 0.3s ease, color 0.3s ease, gap 0.3s ease;
        }
        .btn-outline:hover {
          background: var(--ink);
          color: var(--cream);
          gap: 14px;
        }

        /* Outline white btn */
        .btn-outline-white {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          color: var(--cream);
          font-family: var(--font-body);
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 13px 27px;
          border: 1px solid rgba(247,243,238,0.4);
          border-radius: 0;
          cursor: pointer;
          text-decoration: none;
          transition: background 0.3s ease, color 0.3s ease, gap 0.3s ease, border-color 0.3s ease;
        }
        .btn-outline-white:hover {
          background: var(--cream);
          color: var(--ink);
          border-color: var(--cream);
          gap: 14px;
        }

        /* Divider line */
        .divider {
          width: 48px; height: 1px;
          background: var(--gold);
          margin-bottom: 24px;
        }

        /* Section label */
        .section-label {
          font-family: var(--font-body);
          font-size: 0.68rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          font-weight: 600;
          color: var(--gold);
          margin-bottom: 16px;
          display: block;
        }

        /* Contact input */
        .contact-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(247,243,238,0.25);
          padding: 14px 0;
          font-family: var(--font-body);
          font-size: 0.9rem;
          color: var(--cream);
          outline: none;
          transition: border-color 0.3s ease;
        }
        .contact-input::placeholder { color: rgba(247,243,238,0.4); }
        .contact-input:focus { border-bottom-color: var(--gold); }

        /* Marquee */
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-inner {
          display: flex;
          gap: 0;
          animation: marquee 22s linear infinite;
          width: max-content;
        }
        .marquee-inner:hover { animation-play-state: paused; }

        /* Mobile nav */
        .mobile-menu {
          position: fixed;
          inset: 0;
          background: var(--ink);
          z-index: 200;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 40px;
          transform: translateY(-100%);
          transition: transform 0.5s cubic-bezier(.77,0,.175,1);
        }
        .mobile-menu.open { transform: translateY(0); }
        .mobile-nav-link {
          font-family: var(--font-display);
          font-size: clamp(2rem, 8vw, 3.5rem);
          font-weight: 300;
          color: var(--cream);
          text-decoration: none;
          letter-spacing: 0.02em;
          transition: color 0.3s ease;
        }
        .mobile-nav-link:hover { color: var(--gold); }

        /* Responsive */
        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>

      {/* Custom cursor */}
      <div
        className="custom-cursor"
        style={{ left: cursorPos.x, top: cursorPos.y }}
      />

      {/* ──────────────────────────────────────────
          MOBILE MENU
      ────────────────────────────────────────── */}
      <div className={`mobile-menu ${mobileOpen ? "open" : ""}`}>
        <button
          onClick={() => setMobileOpen(false)}
          style={{
            position: "absolute",
            top: 28,
            right: 24,
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#F7F3EE",
          }}
        >
          <X size={28} />
        </button>
        {NAV_LINKS.map((l) => (
          <a
            key={l}
            href={`#${l.toLowerCase().replace(" ", "-")}`}
            className="mobile-nav-link"
            onClick={() => setMobileOpen(false)}
          >
            {l}
          </a>
        ))}
        <a
          href="mailto:info@onelondonchurch.org"
          className="btn-gold"
          style={{ marginTop: 16 }}
        >
          Get In Touch
        </a>
      </div>

      {/* ──────────────────────────────────────────
          NAVIGATION
      ────────────────────────────────────────── */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "0 clamp(24px, 5vw, 64px)",
          height: 72,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: scrolled ? "rgba(247,243,238,0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border)" : "none",
          transition: "all 0.4s ease",
        }}
      >
        {/* Logo */}
        <a
          href="#home"
          style={{
            textDecoration: "none",
            color: scrolled ? "var(--ink)" : "#F7F3EE",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.5rem",
              fontWeight: 600,
              letterSpacing: "0.04em",
            }}
          >
            ONE<span style={{ color: "var(--gold)" }}>LONDON</span>
          </span>
          <div
            style={{
              fontSize: "0.6rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              fontFamily: "var(--font-body)",
              fontWeight: 500,
              marginTop: 1,
              opacity: 0.7,
            }}
          >
            Christian Charity
          </div>
        </a>

        {/* Desktop links */}
        <div
          className="hide-mobile"
          style={{ display: "flex", alignItems: "center", gap: 36 }}
        >
          {NAV_LINKS.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase().replace(" ", "-")}`}
              className="nav-link"
              style={{ color: scrolled ? "var(--ink)" : "#F7F3EE" }}
            >
              {l}
            </a>
          ))}
          <a
            href="mailto:info@onelondonchurch.org"
            className="btn-gold"
            style={{ padding: "10px 22px", fontSize: "0.72rem" }}
          >
            Donate
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="show-mobile"
          onClick={() => setMobileOpen(true)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: scrolled ? "var(--ink)" : "#F7F3EE",
            alignItems: "center",
          }}
        >
          <Menu size={26} />
        </button>
      </nav>

      {/* ──────────────────────────────────────────
          HERO
      ────────────────────────────────────────── */}
      <section
        id="home"
        ref={heroRef}
        className="noise"
        style={{
          minHeight: "100vh",
          position: "relative",
          display: "flex",
          alignItems: "flex-end",
          paddingBottom: "clamp(60px, 8vh, 100px)",
          overflow: "hidden",
          background: "var(--ink)",
        }}
      >
        {/* Background image */}
        <div style={{ position: "absolute", inset: 0 }}>
          <Image
            src="/images/one-london-12.png"
            alt="One London"
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            priority
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(13,13,13,0.92) 0%, rgba(13,13,13,0.55) 50%, rgba(13,13,13,0.3) 100%)",
            }}
          />
        </div>

        <div
          style={{
            position: "relative",
            zIndex: 2,
            width: "100%",
            padding: "0 clamp(24px, 6vw, 96px)",
          }}
        >
          {/* Charity tag */}
          <div
            style={{
              marginBottom: 24,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div style={{ width: 32, height: 1, background: "var(--gold)" }} />
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.72rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--gold)",
                fontWeight: 600,
              }}
            >
              Registered Christian Charity · London
            </span>
          </div>

          {/* Cycling headline */}
          <div
            style={{
              overflow: "hidden",
              height: "clamp(60px, 9vw, 120px)",
              marginBottom: 16,
            }}
          >
            <h1
              key={heroLine}
              className="hero-cycling"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(3.2rem, 9vw, 9rem)",
                fontWeight: 300,
                lineHeight: 1,
                color: "#F7F3EE",
                letterSpacing: "-0.01em",
              }}
            >
              {HERO_LINES[heroLine]}
            </h1>
          </div>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(0.95rem, 1.8vw, 1.2rem)",
              color: "rgba(247,243,238,0.7)",
              maxWidth: 520,
              lineHeight: 1.7,
              marginBottom: 40,
            }}
          >
            One London is a Christian charity equipping leaders, serving
            communities, and partnering with churches to bring hope and
            transformation across London.
          </p>

          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <a href="#initiatives" className="btn-gold">
              Our Work <ArrowRight size={15} />
            </a>
            <a href="#get-involved" className="btn-outline-white">
              Get Involved <ArrowRight size={15} />
            </a>
          </div>

          {/* Scroll indicator */}
          <div
            style={{
              position: "absolute",
              right: "clamp(24px, 5vw, 64px)",
              bottom: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
            }}
          >
            <div
              style={{
                width: 1,
                height: 60,
                background:
                  "linear-gradient(to bottom, transparent, rgba(200,169,110,0.8))",
                animation: "grow 2s ease-in-out infinite",
              }}
            />
            <span
              style={{
                fontSize: "0.6rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(247,243,238,0.4)",
                writingMode: "vertical-rl",
              }}
            >
              Scroll
            </span>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────
          MARQUEE BAND
      ────────────────────────────────────────── */}
      <div
        style={{
          background: "var(--gold)",
          padding: "14px 0",
          overflow: "hidden",
          borderTop: "none",
        }}
      >
        <div className="marquee-inner">
          {[...Array(2)].map((_, i) => (
            <React.Fragment key={i}>
              {[
                "Church Leadership Training",
                "Community Service",
                "Social Welfare",
                "Missional Partnerships",
                "Faith in Action",
                "Rooted in London",
              ].map((t) => (
                <span
                  key={t}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "var(--ink)",
                    padding: "0 40px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {t} <span style={{ opacity: 0.4, marginLeft: 8 }}>✦</span>
                </span>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ──────────────────────────────────────────
          ABOUT
      ────────────────────────────────────────── */}
      <section
        id="about"
        style={{
          background: "var(--cream)",
          padding: "clamp(80px, 12vh, 140px) clamp(24px, 6vw, 96px)",
        }}
      >
        <div ref={about.ref} style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "clamp(40px, 6vw, 100px)",
              alignItems: "center",
            }}
            className="responsive-grid"
          >
            {/* Left: image stack */}
            <div
              className={`reveal reveal-left ${about.inView ? "visible" : ""}`}
              style={{ position: "relative", aspectRatio: "4/5" }}
            >
              <div style={{ position: "absolute", inset: 0, borderRadius: 0 }}>
                <Image
                  src="/images/one-london-13.png"
                  alt="One London"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              {/* Accent card */}
              <div
                style={{
                  position: "absolute",
                  bottom: -24,
                  right: -24,
                  background: "var(--ink)",
                  padding: "24px 28px",
                  borderRadius: 0,
                  zIndex: 2,
                  maxWidth: 220,
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "2.8rem",
                    fontWeight: 300,
                    color: "var(--gold)",
                    lineHeight: 1,
                  }}
                >
                  10+
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.78rem",
                    color: "rgba(247,243,238,0.7)",
                    marginTop: 6,
                    letterSpacing: "0.06em",
                  }}
                >
                  Years serving the London community
                </div>
              </div>
            </div>

            {/* Right: text */}
            <div>
              <span
                className={`section-label reveal ${about.inView ? "visible" : ""}`}
              >
                Who We Are
              </span>
              <div className="divider" />
              <h2
                className={`reveal reveal-delay-1 ${about.inView ? "visible" : ""}`}
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2.4rem, 4.5vw, 4rem)",
                  fontWeight: 400,
                  lineHeight: 1.1,
                  letterSpacing: "-0.01em",
                  marginBottom: 28,
                  color: "var(--ink)",
                }}
              >
                A Charity Rooted in Christian Faith & Service
              </h2>
              <p
                className={`reveal reveal-delay-2 ${about.inView ? "visible" : ""}`}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "1rem",
                  lineHeight: 1.85,
                  color: "var(--muted)",
                  marginBottom: 20,
                }}
              >
                One London is a registered Christian charity operating across
                London. We exist not as a worship centre, but as an organisation
                that equips, serves, and partners — working through churches and
                communities to bring lasting change.
              </p>
              <p
                className={`reveal reveal-delay-3 ${about.inView ? "visible" : ""}`}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "1rem",
                  lineHeight: 1.85,
                  color: "var(--muted)",
                  marginBottom: 36,
                }}
              >
                From training the next generation of church leaders to running
                practical community support programmes, our work is anchored in
                the belief that faith must be demonstrated in action.
              </p>
              <div
                className={`reveal reveal-delay-4 ${about.inView ? "visible" : ""}`}
                style={{ display: "flex", gap: 16, flexWrap: "wrap" }}
              >
                <a href="#initiatives" className="btn-gold">
                  Our Initiatives <ArrowRight size={14} />
                </a>
                <a href="#contact" className="btn-outline">
                  Partner With Us <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
        <style>{`
          @media (max-width: 768px) {
            .responsive-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* ──────────────────────────────────────────
          INITIATIVES (PILLARS)
      ────────────────────────────────────────── */}
      <section
        id="initiatives"
        style={{
          background: "#F0EBE3",
          padding: "clamp(80px, 12vh, 140px) clamp(24px, 6vw, 96px)",
        }}
      >
        <div
          ref={pillarsSection.ref}
          style={{ maxWidth: 1200, margin: "0 auto" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: "clamp(40px, 6vh, 72px)",
              flexWrap: "wrap",
              gap: 24,
            }}
          >
            <div>
              <span
                className={`section-label reveal ${pillarsSection.inView ? "visible" : ""}`}
              >
                What We Do
              </span>
              <div className="divider" />
              <h2
                className={`reveal reveal-delay-1 ${pillarsSection.inView ? "visible" : ""}`}
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2.4rem, 4.5vw, 4rem)",
                  fontWeight: 400,
                  lineHeight: 1.1,
                  color: "var(--ink)",
                  maxWidth: 500,
                }}
              >
                Our Core Initiatives
              </h2>
            </div>
            <p
              className={`reveal reveal-delay-2 ${pillarsSection.inView ? "visible" : ""}`}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.95rem",
                color: "var(--muted)",
                maxWidth: 340,
                lineHeight: 1.7,
              }}
            >
              Four pillars of purposeful work — each grounded in Christian
              values, each transforming lives across London.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 24,
            }}
          >
            {PILLARS.map((p, i) => (
              <div
                key={p.tag}
                className={`pillar-card reveal reveal-delay-${i + 1} ${pillarsSection.inView ? "visible" : ""}`}
              >
                <div className="card-img">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: `linear-gradient(to top, rgba(13,13,13,0.7) 0%, transparent 60%)`,
                    }}
                  />
                  <span
                    className="tag"
                    style={{
                      position: "absolute",
                      top: 16,
                      left: 16,
                      background: p.accent,
                      color: "var(--ink)",
                    }}
                  >
                    {p.tag}
                  </span>
                </div>
                <div style={{ padding: "28px 28px 32px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      marginBottom: 14,
                    }}
                  >
                    <p.icon size={18} color={p.accent} strokeWidth={1.5} />
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1.4rem",
                        fontWeight: 600,
                        color: "var(--ink)",
                        lineHeight: 1.2,
                      }}
                    >
                      {p.title}
                    </h3>
                  </div>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.9rem",
                      lineHeight: 1.75,
                      color: "var(--muted)",
                    }}
                  >
                    {p.body}
                  </p>
                  <div
                    style={{
                      marginTop: 20,
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      color: p.accent,
                      fontSize: "0.78rem",
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      cursor: "pointer",
                    }}
                  >
                    Learn More <ArrowRight size={13} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────
          STATS BAND
      ────────────────────────────────────────── */}
      <section
        style={{
          background: "var(--ink)",
          padding: "clamp(60px, 10vh, 100px) clamp(24px, 6vw, 96px)",
        }}
      >
        <div
          ref={statsSection.ref}
          style={{ maxWidth: 1200, margin: "0 auto" }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: 40,
            }}
          >
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className={`reveal reveal-delay-${i + 1} ${statsSection.inView ? "visible" : ""}`}
                style={{ textAlign: "center" }}
              >
                <div className="stat-number">{s.value}</div>
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.82rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "rgba(247,243,238,0.5)",
                    marginTop: 10,
                    fontWeight: 500,
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────
          IMPACT / STORIES
      ────────────────────────────────────────── */}
      <section
        id="impact"
        style={{
          background: "var(--cream)",
          padding: "clamp(80px, 12vh, 140px) clamp(24px, 6vw, 96px)",
        }}
      >
        <div
          ref={storiesSection.ref}
          style={{ maxWidth: 1200, margin: "0 auto" }}
        >
          <div style={{ marginBottom: "clamp(40px, 6vh, 72px)" }}>
            <span
              className={`section-label reveal ${storiesSection.inView ? "visible" : ""}`}
            >
              Real Impact
            </span>
            <div className="divider" />
            <h2
              className={`reveal reveal-delay-1 ${storiesSection.inView ? "visible" : ""}`}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.4rem, 4.5vw, 4rem)",
                fontWeight: 400,
                lineHeight: 1.1,
                color: "var(--ink)",
                maxWidth: 560,
              }}
            >
              Lives Changed, Communities Transformed
            </h2>
          </div>

          {/* Story slider */}
          <div
            className={`story-card reveal reveal-delay-2 ${storiesSection.inView ? "visible" : ""}`}
          >
            <div
              style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr" }}
              className="story-grid"
            >
              {/* Image */}
              <div
                style={{
                  position: "relative",
                  minHeight: 400,
                  overflow: "hidden",
                }}
              >
                <Image
                  src={STORIES[activeStory].image}
                  alt={STORIES[activeStory].name}
                  fill
                  style={{
                    objectFit: "cover",
                    transition: "opacity 0.5s ease",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(13,13,13,0.3)",
                  }}
                />
              </div>
              {/* Content */}
              <div
                style={{
                  padding: "clamp(40px, 5vw, 72px)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "5rem",
                      color: "var(--gold)",
                      lineHeight: 1,
                      display: "block",
                      marginBottom: 8,
                      opacity: 0.6,
                    }}
                  >
                    &quot;
                  </span>
                  <p
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(1.2rem, 2.2vw, 1.7rem)",
                      fontWeight: 300,
                      lineHeight: 1.6,
                      color: "var(--cream)",
                      fontStyle: "italic",
                      marginBottom: 32,
                    }}
                  >
                    {STORIES[activeStory].quote}
                  </p>
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.95rem",
                        fontWeight: 600,
                        color: "var(--cream)",
                      }}
                    >
                      {STORIES[activeStory].name}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.8rem",
                        color: "var(--gold)",
                        marginTop: 4,
                        letterSpacing: "0.06em",
                      }}
                    >
                      {STORIES[activeStory].role}
                    </div>
                  </div>
                </div>

                {/* Controls */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    marginTop: 40,
                  }}
                >
                  <button
                    onClick={prevStory}
                    style={{
                      width: 44,
                      height: 44,
                      border: "1px solid rgba(247,243,238,0.25)",
                      background: "transparent",
                      color: "var(--cream)",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "background 0.3s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background =
                        "rgba(200,169,110,0.2)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "transparent")
                    }
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={nextStory}
                    style={{
                      width: 44,
                      height: 44,
                      border: "1px solid rgba(247,243,238,0.25)",
                      background: "transparent",
                      color: "var(--cream)",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "background 0.3s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background =
                        "rgba(200,169,110,0.2)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "transparent")
                    }
                  >
                    <ChevronRight size={18} />
                  </button>
                  <div style={{ display: "flex", gap: 8 }}>
                    {STORIES.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveStory(i)}
                        style={{
                          width: i === activeStory ? 28 : 8,
                          height: 2,
                          background:
                            i === activeStory
                              ? "var(--gold)"
                              : "rgba(247,243,238,0.3)",
                          border: "none",
                          cursor: "pointer",
                          padding: 0,
                          transition: "all 0.3s ease",
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <style>{`
          @media (max-width: 768px) {
            .story-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* ──────────────────────────────────────────
          GET INVOLVED CTA
      ────────────────────────────────────────── */}
      <section
        id="get-involved"
        className="noise"
        style={{
          position: "relative",
          background: "var(--ink)",
          padding: "clamp(80px, 14vh, 160px) clamp(24px, 6vw, 96px)",
          overflow: "hidden",
        }}
      >
        {/* Decorative background img */}
        <div style={{ position: "absolute", inset: 0, opacity: 0.08 }}>
          <Image
            src="/images/one-london-11.png"
            alt=""
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div
          ref={ctaSection.ref}
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            position: "relative",
            zIndex: 2,
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "clamp(40px, 6vw, 80px)",
              alignItems: "center",
            }}
            className="cta-grid"
          >
            <div>
              <span
                className={`section-label reveal ${ctaSection.inView ? "visible" : ""}`}
                style={{ color: "var(--gold)" }}
              >
                Join the Mission
              </span>
              <div className="divider" />
              <h2
                className={`reveal reveal-delay-1 ${ctaSection.inView ? "visible" : ""}`}
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2.4rem, 4.5vw, 4.2rem)",
                  fontWeight: 300,
                  color: "#F7F3EE",
                  lineHeight: 1.1,
                  marginBottom: 24,
                }}
              >
                There Are Many Ways to Get Involved
              </h2>
              <p
                className={`reveal reveal-delay-2 ${ctaSection.inView ? "visible" : ""}`}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "1rem",
                  lineHeight: 1.85,
                  color: "rgba(247,243,238,0.65)",
                  marginBottom: 36,
                }}
              >
                Whether you want to volunteer your time, partner as a church or
                organisation, support financially, or refer someone who needs
                our services — we&apos;d love to hear from you.
              </p>
              <a
                href="mailto:info@onelondonchurch.org"
                className={`btn-gold reveal reveal-delay-3 ${ctaSection.inView ? "visible" : ""}`}
              >
                Reach Out <ArrowRight size={15} />
              </a>
            </div>
            {/* Cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                {
                  title: "Volunteer",
                  desc: "Give your time and skills to support our programmes on the ground.",
                },
                {
                  title: "Church Partnership",
                  desc: "Collaborate with us to extend our reach and deepen our impact.",
                },
                {
                  title: "Donate",
                  desc: "Your financial support enables us to serve and equip more people.",
                },
              ].map((item, i) => (
                <div
                  key={item.title}
                  className={`reveal reveal-delay-${i + 2} ${ctaSection.inView ? "visible" : ""}`}
                  style={{
                    border: "1px solid rgba(247,243,238,0.12)",
                    padding: "22px 26px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                    transition: "border-color 0.3s ease, background 0.3s ease",
                    gap: 16,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor =
                      "var(--gold)";
                    (e.currentTarget as HTMLDivElement).style.background =
                      "rgba(200,169,110,0.05)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor =
                      "rgba(247,243,238,0.12)";
                    (e.currentTarget as HTMLDivElement).style.background =
                      "transparent";
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1.3rem",
                        fontWeight: 600,
                        color: "#F7F3EE",
                        marginBottom: 6,
                      }}
                    >
                      {item.title}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.85rem",
                        color: "rgba(247,243,238,0.5)",
                        lineHeight: 1.5,
                      }}
                    >
                      {item.desc}
                    </div>
                  </div>
                  <ArrowRight
                    size={18}
                    color="var(--gold)"
                    style={{ flexShrink: 0 }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <style>{`
          @media (max-width: 768px) {
            .cta-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* ──────────────────────────────────────────
          CONTACT
      ────────────────────────────────────────── */}
      <section
        id="contact"
        style={{
          background: "var(--ink)",
          borderTop: "1px solid rgba(247,243,238,0.08)",
          padding: "clamp(80px, 12vh, 140px) clamp(24px, 6vw, 96px)",
        }}
      >
        <div
          ref={contactSection.ref}
          style={{ maxWidth: 1200, margin: "0 auto" }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "clamp(40px, 8vw, 100px)",
            }}
            className="contact-grid"
          >
            {/* Left */}
            <div>
              <span
                className={`section-label reveal ${contactSection.inView ? "visible" : ""}`}
                style={{ color: "var(--gold)" }}
              >
                Contact
              </span>
              <div className="divider" />
              <h2
                className={`reveal reveal-delay-1 ${contactSection.inView ? "visible" : ""}`}
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2.2rem, 4vw, 3.6rem)",
                  fontWeight: 300,
                  color: "#F7F3EE",
                  lineHeight: 1.15,
                  marginBottom: 32,
                }}
              >
                Let&apos;s Start a Conversation
              </h2>
              <div
                className={`reveal reveal-delay-2 ${contactSection.inView ? "visible" : ""}`}
                style={{ display: "flex", flexDirection: "column", gap: 24 }}
              >
                {[
                  {
                    icon: Mail,
                    label: "Email",
                    value: "info@onelondonchurch.org",
                    href: "mailto:info@onelondonchurch.org",
                  },
                  {
                    icon: MapPin,
                    label: "Location",
                    value: "London, United Kingdom",
                    href: "#",
                  },
                  {
                    icon: Phone,
                    label: "Phone",
                    value: "Get in touch via email",
                    href: "mailto:info@onelondonchurch.org",
                  },
                ].map(({ icon: Icon, label, value, href }) => (
                  <a
                    key={label}
                    href={href}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 18,
                      textDecoration: "none",
                    }}
                    className="gold-link"
                  >
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        border: "1px solid rgba(247,243,238,0.15)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={16} color="var(--gold)" strokeWidth={1.5} />
                    </div>
                    <div>
                      <div
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "0.68rem",
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                          color: "rgba(247,243,238,0.35)",
                          marginBottom: 4,
                        }}
                      >
                        {label}
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "0.9rem",
                          color: "#F7F3EE",
                        }}
                      >
                        {value}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Right: form */}
            <div
              className={`reveal reveal-delay-2 ${contactSection.inView ? "visible" : ""}`}
            >
              <form
                onSubmit={(e) => e.preventDefault()}
                style={{ display: "flex", flexDirection: "column", gap: 28 }}
              >
                <div>
                  <label
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.68rem",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "rgba(247,243,238,0.4)",
                    }}
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="contact-input"
                  />
                </div>
                <div>
                  <label
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.68rem",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "rgba(247,243,238,0.4)",
                    }}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="contact-input"
                  />
                </div>
                <div>
                  <label
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.68rem",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "rgba(247,243,238,0.4)",
                    }}
                  >
                    How Can We Help?
                  </label>
                  <textarea
                    placeholder="Tell us about your interest or enquiry..."
                    className="contact-input"
                    rows={4}
                    style={{ resize: "none" }}
                  />
                </div>
                <button
                  type="submit"
                  className="btn-gold"
                  style={{ alignSelf: "flex-start" }}
                >
                  Send Message <ArrowRight size={15} />
                </button>
              </form>
            </div>
          </div>
        </div>
        <style>{`
          @media (max-width: 768px) {
            .contact-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* ──────────────────────────────────────────
          FOOTER
      ────────────────────────────────────────── */}
      <footer
        style={{
          background: "#080808",
          borderTop: "1px solid rgba(247,243,238,0.06)",
          padding: "clamp(40px, 6vh, 60px) clamp(24px, 6vw, 96px)",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexWrap: "wrap",
              gap: 40,
              marginBottom: 48,
            }}
          >
            {/* Brand */}
            <div style={{ maxWidth: 280 }}>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.8rem",
                  fontWeight: 600,
                  color: "#F7F3EE",
                  letterSpacing: "0.04em",
                  marginBottom: 8,
                }}
              >
                ONE<span style={{ color: "var(--gold)" }}>LONDON</span>
              </div>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.68rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  marginBottom: 16,
                }}
              >
                Christian Charity
              </div>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.85rem",
                  color: "rgba(247,243,238,0.4)",
                  lineHeight: 1.7,
                }}
              >
                Equipping leaders. Serving communities. Partnering for change
                across London.
              </p>
            </div>
            {/* Links */}
            <div
              style={{
                display: "flex",
                gap: "clamp(32px, 6vw, 80px)",
                flexWrap: "wrap",
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.68rem",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "rgba(247,243,238,0.35)",
                    marginBottom: 16,
                  }}
                >
                  Organisation
                </div>
                {["About", "Initiatives", "Impact", "Partners"].map((l) => (
                  <a
                    key={l}
                    href={`#${l.toLowerCase()}`}
                    style={{
                      display: "block",
                      fontFamily: "var(--font-body)",
                      fontSize: "0.85rem",
                      color: "rgba(247,243,238,0.55)",
                      textDecoration: "none",
                      marginBottom: 10,
                      transition: "color 0.3s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#F7F3EE")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "rgba(247,243,238,0.55)")
                    }
                  >
                    {l}
                  </a>
                ))}
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.68rem",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "rgba(247,243,238,0.35)",
                    marginBottom: 16,
                  }}
                >
                  Get Involved
                </div>
                {["Volunteer", "Donate", "Church Partnership", "Contact"].map(
                  (l) => (
                    <a
                      key={l}
                      href="#get-involved"
                      style={{
                        display: "block",
                        fontFamily: "var(--font-body)",
                        fontSize: "0.85rem",
                        color: "rgba(247,243,238,0.55)",
                        textDecoration: "none",
                        marginBottom: 10,
                        transition: "color 0.3s ease",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "#F7F3EE")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "rgba(247,243,238,0.55)")
                      }
                    >
                      {l}
                    </a>
                  ),
                )}
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.68rem",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "rgba(247,243,238,0.35)",
                    marginBottom: 16,
                  }}
                >
                  Contact
                </div>
                <a
                  href="mailto:info@onelondonchurch.org"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    fontFamily: "var(--font-body)",
                    fontSize: "0.82rem",
                    color: "var(--gold)",
                    textDecoration: "none",
                  }}
                >
                  <Mail size={13} /> info@onelondonchurch.org
                </a>
              </div>
            </div>
          </div>
          {/* Bottom bar */}
          <div
            style={{
              borderTop: "1px solid rgba(247,243,238,0.07)",
              paddingTop: 24,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.75rem",
                color: "rgba(247,243,238,0.25)",
              }}
            >
              © 2026 One London. Registered Christian Charity. All rights
              reserved.
            </p>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.75rem",
                color: "rgba(247,243,238,0.2)",
              }}
            >
              Built with faith & purpose
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
