"use client";
import Image from "next/image";

export default function AboutSection() {
  return (
    <section id="about" className="section-pad" style={{ background:"#0A0803", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", top:0, left:"50%", transform:"translateX(-50%)", width:"min(700px,100%)", height:300, background:"radial-gradient(ellipse,rgba(201,168,76,0.04),transparent)", pointerEvents:"none" }} />

      <div className="container-site">
        {/* Header */}
        <div className="section-header">
          <p style={{ fontFamily:"Inter,sans-serif", fontSize:10, letterSpacing:"0.3em", textTransform:"uppercase", color:"#9A8660", marginBottom:14 }}>Our Story</p>
          <h2 style={{ fontFamily:"Cormorant Garamond,Georgia,serif", fontSize:"clamp(2rem,6vw,3.8rem)", color:"#E8C97A", fontWeight:300, lineHeight:1.15, marginBottom:16 }}>
            A Taste of Cairo,{" "}<em style={{ fontStyle:"italic" }}>in California</em>
          </h2>
          <div style={{ height:1, maxWidth:200, margin:"0 auto", background:"linear-gradient(90deg,transparent,#C9A84C,transparent)" }} />
        </div>

        {/* Two columns */}
        <div className="about-grid">

          {/* ── Image column ── */}
          <div style={{ position:"relative" }}>
            {/* Corner borders */}
            <div style={{ position:"absolute", top:-10, left:-10, width:60, height:60, borderTop:"1px solid rgba(201,168,76,0.4)", borderLeft:"1px solid rgba(201,168,76,0.4)", zIndex:2 }} />
            <div style={{ position:"absolute", bottom:-10, right:-10, width:60, height:60, borderBottom:"1px solid rgba(201,168,76,0.4)", borderRight:"1px solid rgba(201,168,76,0.4)", zIndex:2 }} />

            {/* Full image — not cropped */}
            <div style={{ position:"relative", width:"100%", overflow:"hidden" }}>
              <Image
                src="/images/cairo-scene.jpg"
                alt="Cairo — the inspiration behind Arabesque by Mimo"
                width={900}
                height={600}
                className="img-sepia"
                style={{ width:"100%", height:"auto", display:"block", objectFit:"contain" }}
                sizes="(max-width:900px) 100vw, 50vw"
                priority
              />
              {/* Bottom fade */}
              <div style={{ position:"absolute", bottom:0, left:0, right:0, height:80, background:"linear-gradient(to top,rgba(10,8,3,0.5),transparent)" }} />
            </div>

            {/* Halal badge */}
            <div style={{ position:"absolute", bottom:16, left:16, zIndex:3 }}>
              <div className="halal-badge">
                <span style={{ fontFamily:"Cinzel,serif", fontSize:13, color:"#C9A84C", lineHeight:1 }}>حلال</span>
                <span style={{ fontFamily:"Inter,sans-serif", fontSize:7, letterSpacing:"0.18em", textTransform:"uppercase", color:"rgba(201,168,76,0.65)" }}>HALAL</span>
              </div>
            </div>
          </div>

          {/* ── Text column ── */}
          <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
            <p style={{ fontFamily:"Cormorant Garamond,Georgia,serif", fontSize:"clamp(1.2rem,3vw,1.6rem)", fontStyle:"italic", color:"#C9A84C", lineHeight:1.55, fontWeight:300 }}>
              &ldquo;Every dish carries the warmth of an Egyptian kitchen and the memory of a meal shared with family.&rdquo;
            </p>
            <div style={{ height:1, background:"linear-gradient(90deg,transparent,rgba(201,168,76,0.4),transparent)" }} />
            <p style={{ fontFamily:"Inter,sans-serif", fontSize:"clamp(13px,2vw,14px)", color:"#9A8660", lineHeight:1.8 }}>
              Arabesque by Mimo was born from a deep love of Egyptian culinary heritage. The name carries two meanings: the intricate geometric artistry of Islamic design, and the spirit of storytelling through food.
            </p>
            <p style={{ fontFamily:"Inter,sans-serif", fontSize:"clamp(13px,2vw,14px)", color:"#9A8660", lineHeight:1.8 }}>
              Mimo grew up watching the bustling streets of Cairo come alive at mealtime — vendors grilling shawarma over open flame, families gathering around steaming pots of Koshari, the sweet perfume of kunafa wafting from corner bakeries. Every recipe served here is a love letter to those memories.
            </p>
            <p style={{ fontFamily:"Inter,sans-serif", fontSize:"clamp(13px,2vw,14px)", color:"#9A8660", lineHeight:1.8 }}>
              We source the finest halal meats and authentic Egyptian spice blends, and present them in the warmth of genuine Egyptian hospitality. This isn&apos;t a restaurant &mdash; it&apos;s a journey.
            </p>

            {/* Pillars */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, marginTop:4 }}>
              {[
                { icon:"🌿", label:"100% Halal", sub:"Certified meats" },
                { icon:"🫒", label:"Fresh Daily", sub:"Made from scratch" },
                { icon:"🏺", label:"Authentic",   sub:"Egyptian recipes" },
              ].map(p => (
                <div key={p.label} style={{ textAlign:"center", padding:"16px 8px", background:"#1A1610", border:"1px solid #2E2820" }}>
                  <div style={{ fontSize:22, marginBottom:6 }}>{p.icon}</div>
                  <div style={{ fontFamily:"Cinzel,serif", fontSize:10, letterSpacing:"0.12em", textTransform:"uppercase", color:"#C9A84C" }}>{p.label}</div>
                  <div style={{ fontFamily:"Inter,sans-serif", fontSize:10, color:"#5A4E38", marginTop:3 }}>{p.sub}</div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div style={{ paddingTop:4 }}>
              <a href="#menu" className="btn-gold" style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"12px 28px" }}>
                Explore Our Menu →
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
        }
        @media (min-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr 1fr;
            gap: 64px;
            align-items: start;
          }
        }
      `}</style>
    </section>
  );
}
