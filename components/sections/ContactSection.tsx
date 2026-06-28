"use client";
import { useLang } from "@/lib/langContext";
import { useState, useEffect } from "react";

interface SocialLink { id:string; label:string; url:string; icon:string; active:boolean; }
interface DayHours   { day:string; open:string; close:string; closed:boolean; }

const FALLBACK_SOCIALS: SocialLink[] = [
  {id:"ig", label:"Instagram", url:"https://www.instagram.com/arabesque_bymimo?igsh=OHhkeGY0N2FkMnAy", icon:"📸", active:true},
  {id:"fb", label:"Facebook",  url:"https://www.facebook.com/share/1BcD5jjb8N/",                       icon:"👍", active:true},
  {id:"tt", label:"TikTok",    url:"https://www.tiktok.com/@arabesquebymimo?_r=1&_t=ZP-97ASt7K9hEs",  icon:"🎵", active:true},
];
const FALLBACK_HOURS: DayHours[] = [
  {day:"Monday",    open:"9:00 AM", close:"12:00 AM", closed:false},
  {day:"Tuesday",   open:"9:00 AM", close:"12:00 AM", closed:false},
  {day:"Wednesday", open:"9:00 AM", close:"12:00 AM", closed:false},
  {day:"Thursday",  open:"9:00 AM", close:"12:00 AM", closed:false},
  {day:"Friday",    open:"9:00 AM", close:"12:00 AM", closed:false},
  {day:"Saturday",  open:"9:00 AM", close:"12:00 AM", closed:false},
  {day:"Sunday",    open:"9:00 AM", close:"12:00 AM", closed:false},
];

const STATIC = {
  address:   "1560 S Lewis St,",
  city:      "Anaheim, CA 92805",
  mapEmbed:  "https://maps.google.com/maps?q=1560+S+Lewis+St+Anaheim+CA+92805&output=embed&z=16",
  mapsLink:  "https://maps.google.com/?q=1560+S+Lewis+St+Anaheim+CA+92805",
  orderLink: "https://anaheimfoodco.com/s/arabesque/1560-s-lewis-st-anaheim/94193ec7-7e7b-4357-8ba6-2d36b8bb1632",
};

export default function ContactSection() {
  const { t } = useLang();
  const [phone,   setPhone]   = useState("657-657-3161");
  const [email,   setEmail]   = useState("Arabesque@mimo-culinary.kitchen");
  const [socials, setSocials] = useState<SocialLink[]>(FALLBACK_SOCIALS);
  const [hours,   setHours]   = useState<DayHours[]>(FALLBACK_HOURS);

  useEffect(() => {
    fetch("/api/settings")
      .then(r => r.json())
      .then(data => {
        if (!data || data.error) return;
        if (data.phone) setPhone(data.phone);
        if (data.email) setEmail(data.email);
        if (data.socials) {
          try {
            const s: SocialLink[] = JSON.parse(data.socials);
            if (s.length) setSocials(s);
          } catch {}
        }
        if (data.hours_schedule) {
          try {
            const h: DayHours[] = JSON.parse(data.hours_schedule);
            if (h.length) setHours(h);
          } catch {}
        }
      })
      .catch(() => {});
  }, []);

  const activeSocials = socials.filter(s => s.active);

  return (
    <section id="contact" className="section-pad" style={{ background:"#0A0803", position:"relative", overflow:"hidden" }}>
      <div className="container-site">

        {/* Header */}
        <div className="section-header">
          <p style={{ fontFamily:"Inter,sans-serif", fontSize:10, letterSpacing:"0.3em", textTransform:"uppercase", color:"#9A8660", marginBottom:14 }}>{t("contact_find")}</p>
          <h2 style={{ fontFamily:"Cormorant Garamond,Georgia,serif", fontSize:"clamp(2rem,6vw,3.5rem)", color:"#E8C97A", fontWeight:300, lineHeight:1.15, marginBottom:16 }}>
            {t("contact_title")}
          </h2>
          <div style={{ height:1, maxWidth:200, margin:"0 auto", background:"linear-gradient(90deg,transparent,#C9A84C,transparent)" }} />
        </div>

        <div className="contact-grid">

          {/* Col 1: Info */}
          <div>
            <p style={{ fontFamily:"Cinzel,serif", fontSize:11, letterSpacing:"0.2em", textTransform:"uppercase", color:"#C9A84C", marginBottom:20 }}>{t("contact_find")}</p>

            {/* Address */}
            <a href={STATIC.mapsLink} target="_blank" rel="noopener noreferrer"
              style={{ display:"flex", gap:16, marginBottom:20, textDecoration:"none" }}>
              <div style={{ width:44, height:44, flexShrink:0, border:"1px solid #2E2820", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>📍</div>
              <div>
                <div style={{ fontFamily:"Inter,sans-serif", fontSize:10, letterSpacing:"0.2em", textTransform:"uppercase", color:"#5A4E38", marginBottom:4 }}>{t("contact_address")}</div>
                <div style={{ fontFamily:"Inter,sans-serif", fontSize:14, color:"#9A8660", lineHeight:1.6 }}>{STATIC.address}<br/>{STATIC.city}</div>
                <div style={{ fontFamily:"Inter,sans-serif", fontSize:11, color:"#5A4E38", fontStyle:"italic", marginTop:2 }}>Inside Arabesque by Mimo.</div>
              </div>
            </a>

            {/* Phone */}
            <a href={`tel:${phone.replace(/\D/g,"")}`}
              style={{ display:"flex", gap:16, marginBottom:20, textDecoration:"none" }}>
              <div style={{ width:44, height:44, flexShrink:0, border:"1px solid #2E2820", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>📞</div>
              <div>
                <div style={{ fontFamily:"Inter,sans-serif", fontSize:10, letterSpacing:"0.2em", textTransform:"uppercase", color:"#5A4E38", marginBottom:4 }}>{t("contact_phone")}</div>
                <div style={{ fontFamily:"Inter,sans-serif", fontSize:14, color:"#9A8660" }}>{phone}</div>
              </div>
            </a>

            {/* Email */}
            <a href={`mailto:${email}`}
              style={{ display:"flex", gap:16, marginBottom:24, textDecoration:"none" }}>
              <div style={{ width:44, height:44, flexShrink:0, border:"1px solid #2E2820", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>✉️</div>
              <div>
                <div style={{ fontFamily:"Inter,sans-serif", fontSize:10, letterSpacing:"0.2em", textTransform:"uppercase", color:"#5A4E38", marginBottom:4 }}>{t("contact_email")}</div>
                <div style={{ fontFamily:"Inter,sans-serif", fontSize:14, color:"#9A8660", wordBreak:"break-all" }}>{email}</div>
              </div>
            </a>

            {/* Hours — per day from settings */}
            <p style={{ fontFamily:"Cinzel,serif", fontSize:11, letterSpacing:"0.2em", textTransform:"uppercase", color:"#C9A84C", marginBottom:14 }}>{t("contact_hours")}</p>
            <div style={{ marginBottom:24 }}>
              {hours.map(h => (
                <div key={h.day} style={{ display:"flex", justifyContent:"space-between", gap:12, padding:"10px 0", borderBottom:"1px solid #1A1610" }}>
                  <span style={{ fontFamily:"Inter,sans-serif", fontSize:13, color:"#5A4E38" }}>{h.day}</span>
                  <span style={{ fontFamily:"Inter,sans-serif", fontSize:13, color: h.closed ? "#3A3228" : "#9A8660", flexShrink:0, fontStyle: h.closed ? "italic" : "normal" }}>
                    {h.closed ? "Closed" : `${h.open} – ${h.close}`}
                  </span>
                </div>
              ))}
            </div>

            {/* Social links — dynamic from settings */}
            {activeSocials.length > 0 && (
              <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
                {activeSocials.map(s => (
                  <a key={s.id} href={s.url} target="_blank" rel="noopener noreferrer"
                    className="social-link"
                    style={{ display:"flex", alignItems:"center", gap:8, padding:"8px 14px", border:"1px solid #2E2820", textDecoration:"none", transition:"border-color .2s" }}>
                    <span style={{ fontSize:16 }}>{s.icon}</span>
                    <span style={{ fontFamily:"Inter,sans-serif", fontSize:12, color:"#9A8660" }}>{s.label}</span>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Col 2: Map */}
          <div>
            <p style={{ fontFamily:"Cinzel,serif", fontSize:11, letterSpacing:"0.2em", textTransform:"uppercase", color:"#C9A84C", marginBottom:14 }}>{t("contact_location")}</p>

            <div style={{ border:"1px solid #2E2820", overflow:"hidden", marginBottom:12 }}>
              <iframe
                src={STATIC.mapEmbed}
                style={{ width:"100%", height:"clamp(280px,40vw,420px)", border:0, filter:"invert(90%) hue-rotate(180deg) brightness(0.55) saturate(0.5)", display:"block" }}
                loading="lazy"
                title="Arabesque by Mimo Location"
              />
            </div>

            <a href={STATIC.mapsLink} target="_blank" rel="noopener noreferrer"
              className="btn-outline"
              style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, width:"100%", fontSize:12, padding:"13px" }}>
              📍 {t("contact_maps")}
            </a>

            <div style={{ marginTop:14, background:"#1A1610", border:"1px solid #2E2820", padding:"14px 16px" }}>
              <p style={{ fontFamily:"Cinzel,serif", fontSize:11, color:"#C9A84C", letterSpacing:"0.12em", marginBottom:8 }}>Arabesque by Mimo.</p>
              <p style={{ fontFamily:"Inter,sans-serif", fontSize:13, color:"#9A8660", lineHeight:1.6 }}>
                1560 S Lewis St,<br/>Anaheim, CA 92805
              </p>
              <p style={{ fontFamily:"Inter,sans-serif", fontSize:11, color:"#5A4E38", marginTop:6, fontStyle:"italic" }}>
                Ghost kitchen — online ordering &amp; pickup only.
              </p>
            </div>

            <div style={{ marginTop:16 }}>
              <a href={STATIC.orderLink} target="_blank" rel="noopener noreferrer"
                className="btn-gold"
                style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, width:"100%", padding:"14px", fontSize:13 }}>
                🛒 {t("contact_order_now")}
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .contact-grid { display:grid; grid-template-columns:1fr; gap:40px; }
        @media (min-width:768px) { .contact-grid { grid-template-columns:1fr 1fr; gap:56px; align-items:start; } }
        .social-link:hover { border-color:#C9A84C !important; }
      `}</style>
    </section>
  );
}
