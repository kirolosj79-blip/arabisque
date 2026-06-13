"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useLang } from "@/lib/langContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { lang, setLang, t } = useLang();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    { href: "#about",   label: t("nav_story") },
    { href: "#menu",    label: t("nav_menu") },
    { href: "#gallery", label: t("nav_gallery") },
    { href: "#contact", label: t("nav_contact") },
  ];

  return (
    <>
      <nav
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          transition: "background 0.4s ease, border-color 0.4s ease",
          background: scrolled ? "rgba(10,8,3,0.96)" : "transparent",
          borderBottom: scrolled ? "1px solid #2E2820" : "1px solid transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
        }}
      >
        <div className="container-site" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          {/* Logo — new SVG logo (icon only) */}
          <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo-new.svg" alt="Arabesque by Mimo" style={{ height: 44, width: "auto", objectFit: "contain" }} />
          </Link>

          {/* Desktop links */}
          <div style={{ display: "flex", alignItems: "center", gap: 28 }} className="desktop-nav">
            {links.map(l => (
              <a key={l.href} href={l.href} className="nav-link">{l.label}</a>
            ))}

            {/* Language switcher */}
            <div style={{ display:"flex", alignItems:"center", gap:0, border:"1px solid #2E2820" }}>
              <button onClick={() => setLang("en")}
                style={{ background: lang==="en" ? "rgba(201,168,76,0.15)" : "transparent", border:"none", cursor:"pointer", fontFamily:"Inter,sans-serif", fontSize:11, letterSpacing:"0.1em", padding:"6px 10px", color: lang==="en" ? "#C9A84C" : "#5A4E38", transition:"all .2s" }}>
                EN
              </button>
              <div style={{ width:1, height:14, background:"#2E2820" }}/>
              <button onClick={() => setLang("ar")}
                style={{ background: lang==="ar" ? "rgba(201,168,76,0.15)" : "transparent", border:"none", cursor:"pointer", fontFamily:"Noto Kufi Arabic,serif", fontSize:12, padding:"6px 10px", color: lang==="ar" ? "#C9A84C" : "#5A4E38", transition:"all .2s" }}>
                ع
              </button>
            </div>

            <a href="#order" className="btn-gold" style={{ padding: "9px 20px", fontSize: 11 }}>{t("nav_order")}</a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 8, display: "none" }}
            className="mobile-menu-btn"
            aria-label="Menu"
          >
            <div style={{ width: 22, display: "flex", flexDirection: "column", gap: 5 }}>
              <span style={{ display: "block", height: 1.5, background: "#C9A84C", transition: "all 0.3s", transform: open ? "rotate(45deg) translate(4px, 4px)" : "none" }}/>
              <span style={{ display: "block", height: 1.5, background: "#C9A84C", transition: "all 0.3s", opacity: open ? 0 : 1 }}/>
              <span style={{ display: "block", height: 1.5, background: "#C9A84C", transition: "all 0.3s", transform: open ? "rotate(-45deg) translate(4px, -4px)" : "none" }}/>
            </div>
          </button>
        </div>

        {/* Mobile drawer */}
        <div
          style={{
            background: "rgba(10,8,3,0.98)",
            borderTop: "1px solid #2E2820",
            overflow: "hidden",
            maxHeight: open ? 400 : 0,
            transition: "max-height 0.35s ease",
          }}
          className="mobile-drawer"
        >
          <div style={{ padding: "20px 20px 24px" }}>
            {links.map(l => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                style={{
                  display: "block",
                  fontFamily: "Inter,sans-serif",
                  fontSize: 12,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#9A8660",
                  padding: "12px 0",
                  borderBottom: "1px solid #1A1610",
                  textDecoration: "none",
                }}
              >
                {l.label}
              </a>
            ))}
            <a
              href="#order"
              onClick={() => setOpen(false)}
              className="btn-gold"
              style={{ display: "block", textAlign: "center", marginTop: 16, width: "100%" }}
            >
              {t("nav_order")}
            </a>
          </div>
        </div>
      </nav>

      <style>{`
        @media (max-width: 767px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
        @media (min-width: 768px) {
          .mobile-drawer { display: none !important; }
        }
      `}</style>
    </>
  );
}
