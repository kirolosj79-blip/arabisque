"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { useLang } from "@/lib/langContext";

export default function HeroSection() {
  const bgRef = useRef<HTMLDivElement>(null);
  const { t } = useLang();

  useEffect(() => {
    const el = bgRef.current;
    if (!el) return;
    const fn = () => { el.style.transform = `translateY(${window.scrollY * 0.3}px)`; };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <section style={{ position: "relative", minHeight: "100svh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "hidden", background: "radial-gradient(ellipse at 50% 100%, #3D2810 0%, #1A1006 40%, #0A0803 100%)" }}>
      {/* BG image with parallax */}
      <div ref={bgRef} style={{ position: "absolute", inset: "-10% 0", zIndex: 0 }}>
        <Image src="/images/brand-poster.jpg" alt="Arabesque by Mimo" fill priority className="img-sepia"
          style={{ objectFit: "cover", objectPosition: "top", opacity: 0.22 }} sizes="100vw"/>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,8,3,0.65) 0%, rgba(10,8,3,0.35) 50%, rgba(10,8,3,0.88) 100%)"}}/>
        <div className="pattern-overlay" style={{ position: "absolute", inset: 0 }}/>
      </div>

      {/* Top/bottom border lines */}
      <div style={{ position:"absolute", top:60, left:16, right:16, height:1, background:"linear-gradient(90deg,transparent,rgba(201,168,76,0.2),transparent)", zIndex:1 }}/>
      <div style={{ position:"absolute", bottom:72, left:16, right:16, height:1, background:"linear-gradient(90deg,transparent,rgba(201,168,76,0.2),transparent)", zIndex:1 }}/>

      {/* Main content */}
      <div style={{ position:"relative", zIndex:2, textAlign:"center", padding:"80px 20px 40px", width:"100%", maxWidth:700, margin:"0 auto" }}>

        {/* Logo — Full SVG (logo + slogan combined) */}
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:0, marginBottom:28 }}>
          {/* Main logo mark — bigger, perfectly centered */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logo-new.svg"
            alt="Arabesque by Mimo"
            style={{
              width: "clamp(140px,28vw,210px)",
              height: "auto",
              objectFit: "contain",
              display: "block",
              margin: "0 auto",
              filter: "drop-shadow(0 0 24px rgba(201,168,76,0.45))",
            }}
          />
          {/* Slogan / text part */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logo-slogan.svg"
            alt="by Mimo"
            style={{
              width: "clamp(180px,40vw,300px)",
              height: "auto",
              objectFit: "contain",
              display: "block",
              margin: "10px auto 0",
              filter: "drop-shadow(0 0 12px rgba(201,168,76,0.25))",
            }}
          />
        </div>

        {/* Tagline */}
        <p style={{ fontFamily:"Inter,sans-serif", fontSize:"clamp(10px,2.5vw,12px)", letterSpacing:"0.25em", textTransform:"uppercase", color:"#9A8660", marginBottom:32, lineHeight:1.6 }}>
          {t("hero_tagline")}
        </p>

        {/* CTAs */}
        <div style={{ display:"flex", flexDirection:"column", gap:12, alignItems:"center", marginBottom:28 }}>
          <a href="#order" className="btn-gold" style={{ width:"100%", maxWidth:280, padding:"14px 24px" }}>
            {t("hero_order")}
          </a>
          <a href="#menu" className="btn-outline" style={{ width:"100%", maxWidth:280, padding:"13px 24px" }}>
            {t("hero_explore")}
          </a>
        </div>

        {/* Halal */}
        <div style={{ display:"flex", justifyContent:"center" }}>
          <div className="halal-badge">
            <span style={{ fontFamily:"Cinzel,serif", fontSize:14, color:"#C9A84C", lineHeight:1 }}>حلال</span>
            <span style={{ fontFamily:"Inter,sans-serif", fontSize:8, letterSpacing:"0.18em", textTransform:"uppercase", color:"rgba(201,168,76,0.7)" }}>HALAL</span>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div style={{ position:"absolute", bottom:24, left:"50%", transform:"translateX(-50%)", display:"flex", flexDirection:"column", alignItems:"center", gap:6, zIndex:2 }}>
        <div style={{ width:1, height:"28px", background:"linear-gradient(180deg,rgba(201,168,76,0.4),transparent)" }}/>
        <div style={{ width:5, height:5, borderRadius:"50%", background:"rgba(201,168,76,0.4)" }}/>
      </div>
    </section>
  );
}
