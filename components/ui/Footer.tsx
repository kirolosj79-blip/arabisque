"use client";
import Link from "next/link";
import { useLang } from "@/lib/langContext";

export default function Footer() {
  const year = new Date().getFullYear();
  const { t } = useLang();

  const socials = [
    {
      href: "https://www.instagram.com/arabesque_bymimo?igsh=OHhkeGY0N2FkMnAy",
      label: "Instagram",
      icon: <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>,
    },
    {
      href: "https://www.facebook.com/share/1BcD5jjb8N/",
      label: "Facebook",
      icon: <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>,
    },
    {
      href: "https://www.tiktok.com/@arabesquebymimo?_r=1&_t=ZP-97ASt7K9hEs",
      label: "TikTok",
      icon: <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.79 1.54V6.79a4.85 4.85 0 01-1.02-.1z"/></svg>,
    },
  ];

  return (
    <footer style={{ background: "#060503", borderTop: "1px solid #1A1610", paddingTop: 52, paddingBottom: 28 }}>
      <div className="container-site">

        {/* 3-column grid */}
        <div className="footer-grid" style={{ marginBottom: 40 }}>

          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/logo-circle.png" alt="Arabesque by Mimo" style={{ height: 64, width: "auto", objectFit: "contain" }} />
              <div>
                <div style={{ fontFamily: "Cormorant Garamond,Georgia,serif", fontSize: 26, fontWeight: 500, color: "#E8C97A", lineHeight: 1 }}>Arabesque</div>
                <div style={{ fontFamily: "Inter,sans-serif", fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "#9A8660", marginTop: 4 }}>by Mimo</div>
              </div>
            </div>

            <p style={{ fontFamily: "Inter,sans-serif", fontSize: 13, color: "#5A4E38", lineHeight: 1.7, marginBottom: 16 }}>
              {t("footer_tagline")}<br/>
              {t("footer_halal")}
            </p>

            <div className="halal-badge" style={{ width: 50, height: 50 }}>
              <span style={{ fontFamily: "Cinzel,serif", fontSize: 13, color: "#C9A84C", lineHeight: 1 }}>حلال</span>
              <span style={{ fontFamily: "Inter,sans-serif", fontSize: 7, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(201,168,76,0.65)" }}>HALAL</span>
            </div>

            {/* Social icons — Instagram + Facebook + TikTok */}
            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              {socials.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  aria-label={s.label}
                  style={{ width: 38, height: 38, border: "1px solid #2E2820", display: "flex", alignItems: "center", justifyContent: "center", color: "#5A4E38", textDecoration: "none", transition: "all 0.2s" }}
                  className="footer-social"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <p style={{ fontFamily: "Cinzel,serif", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9A84C", marginBottom: 18 }}>{t("footer_navigate")}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {[
                { href: "#about",   label: t("nav_story") },
                { href: "#menu",    label: t("nav_menu") },
                { href: "#offers",  label: t("cat_offers") },
                { href: "#gallery", label: t("nav_gallery") },
                { href: "#order",   label: t("nav_order") },
                { href: "#contact", label: t("nav_contact") },
              ].map(l => (
                <a key={l.href} href={l.href} className="footer-link">
                  {l.label}
                </a>
              ))}

            </div>
          </div>

          {/* Contact info */}
          <div>
            <p style={{ fontFamily: "Cinzel,serif", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9A84C", marginBottom: 18 }}>{t("footer_visit")}</p>
            <div style={{ fontFamily: "Inter,sans-serif", fontSize: 13, color: "#5A4E38", lineHeight: 1.9 }}>
              <p>1560 S Lewis St, </p>
              <p>Anaheim, CA 92805</p>
              <p style={{ fontStyle: "italic", fontSize: 11, color: "#3A3228", marginBottom: 8 }}>{t("footer_inside")}</p>
              <a href="tel:+16576573161" style={{ color: "#5A4E38", textDecoration: "none", display: "block" }}>657-657-3161</a>
              <a href="mailto:Arabesque@mimo-culinary.kitchen" style={{ color: "#5A4E38", textDecoration: "none", display: "block", wordBreak: "break-all" }}>Arabesque@mimo-culinary.kitchen</a>
              <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid #1A1610" }}>
                <p style={{ fontFamily: "Cinzel,serif", fontSize: 10, color: "#C9A84C", letterSpacing: "0.15em", marginBottom: 6 }}>{t("footer_hours")}</p>
                <p>{t("hours_daily")}: 9:00 AM – 12:00 AM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ height: 1, background: "linear-gradient(90deg,transparent,rgba(201,168,76,0.3),transparent)", marginBottom: 20 }} />

        <div className="footer-bottom">
          <p style={{ fontFamily: "Inter,sans-serif", fontSize: 11, color: "#3A3228" }}>© {year} Arabesque by Mimo. All rights reserved.</p>
          <p style={{ fontFamily: "Cormorant Garamond,Georgia,serif", fontStyle: "italic", fontSize: 14, color: "#2E2820" }}>&ldquo;Something Worth Finding&rdquo;</p>
          <div style={{ display: "flex", gap: 16 }}>
            <a href="https://www.instagram.com/arabesque_bymimo?igsh=OHhkeGY0N2FkMnAy" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "Inter,sans-serif", fontSize: 11, color: "#3A3228", textDecoration: "none" }}>Instagram</a>
            <a href="https://www.facebook.com/share/1BcD5jjb8N/" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "Inter,sans-serif", fontSize: 11, color: "#3A3228", textDecoration: "none" }}>Facebook</a>
            <a href="https://www.tiktok.com/@arabesquebymimo?_r=1&_t=ZP-97ASt7K9hEs" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "Inter,sans-serif", fontSize: 11, color: "#3A3228", textDecoration: "none" }}>TikTok</a>
          </div>
        </div>
      </div>

      <style>{`
        .footer-grid { display: grid; grid-template-columns: 1fr; gap: 36px; }
        .footer-bottom { display: flex; flex-direction: column; align-items: center; gap: 10px; text-align: center; }
        @media (min-width: 768px) {
          .footer-grid { grid-template-columns: 1.4fr 1fr 1.2fr; gap: 48px; }
          .footer-bottom { flex-direction: row; justify-content: space-between; text-align: left; }
        }
      `}</style>
    </footer>
  );
}
