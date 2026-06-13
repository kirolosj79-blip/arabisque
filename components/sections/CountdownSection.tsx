"use client";
import { useState, useEffect } from "react";

interface TimeLeft { days:number; hours:number; minutes:number; seconds:number; }
interface Props { openingDate: string; }

function calcLeft(target: number): TimeLeft | null {
  const diff = target - Date.now();
  if (diff <= 0) return null;
  return {
    days:    Math.floor(diff / 86400000),
    hours:   Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000)  / 60000),
    seconds: Math.floor((diff % 60000)    / 1000),
  };
}

export default function CountdownSection({ openingDate }: Props) {
  const [left, setLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const target = new Date(openingDate).getTime();
    const tick = () => setLeft(calcLeft(target));
    const id = setInterval(tick, 1000);
    tick();
    return () => clearInterval(id);
  }, [openingDate]);

  // null means either not mounted yet or past opening — either way: hide
  if (!left) return null;

  const units = [
    { value:left.days,    label:"Days" },
    { value:left.hours,   label:"Hours" },
    { value:left.minutes, label:"Minutes" },
    { value:left.seconds, label:"Seconds" },
  ];

  return (
    <section id="opening" style={{ background:"#0D0B07", position:"relative", overflow:"hidden" }}>
      <div className="pattern-overlay" style={{ position:"absolute", inset:0, opacity:0.25, pointerEvents:"none" }}/>
      <div style={{ position:"absolute", top:0,    left:0, right:0, height:1, background:"linear-gradient(90deg,transparent,#C9A84C,transparent)" }}/>
      <div style={{ position:"absolute", bottom:0, left:0, right:0, height:1, background:"linear-gradient(90deg,transparent,#C9A84C,transparent)" }}/>

      <div className="container-site" style={{ position:"relative", zIndex:1, paddingTop:"clamp(56px,10vw,96px)", paddingBottom:"clamp(56px,10vw,96px)", textAlign:"center" }}>

        <div style={{ fontSize:22, color:"rgba(201,168,76,0.45)", marginBottom:18, letterSpacing:10 }}>✦ ✦ ✦</div>

        <p style={{ fontFamily:"Inter,sans-serif", fontSize:"clamp(10px,2vw,12px)", letterSpacing:"0.3em", textTransform:"uppercase", color:"#9A8660", marginBottom:14 }}>
          Grand Opening Countdown
        </p>

        <h2 style={{ fontFamily:"Cormorant Garamond,Georgia,serif", fontSize:"clamp(2rem,7vw,4.5rem)", color:"#E8C97A", fontWeight:300, lineHeight:1.1, marginBottom:6 }}>
          We&apos;re Opening Soon
        </h2>

        <p style={{ fontFamily:"Cinzel,serif", fontSize:"clamp(12px,2.5vw,15px)", color:"#C9A84C", letterSpacing:"0.15em", marginBottom:4 }}>
          June 13, 2026
        </p>
        <p style={{ fontFamily:"Inter,sans-serif", fontSize:"clamp(10px,1.8vw,12px)", color:"#5A4E38", marginBottom:40 }}>
          📍 Anaheim Food Co · 1560 S Lewis St, Anaheim CA · 11:00 AM Pacific Time
        </p>

        {/* Countdown blocks */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"clamp(8px,2vw,20px)", maxWidth:600, margin:"0 auto 36px" }}>
          {units.map(({ value, label }) => (
            <div key={label} style={{ background:"#1A1610", border:"1px solid rgba(201,168,76,0.3)", padding:"clamp(14px,4vw,28px) 6px", boxShadow:"0 0 20px rgba(201,168,76,0.06)" }}>
              <div style={{ fontFamily:"Cinzel,serif", fontSize:"clamp(1.8rem,8vw,3.8rem)", fontWeight:600, lineHeight:1, marginBottom:8, background:"linear-gradient(135deg,#C9A84C,#E8C97A,#C9A84C)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
                {String(value).padStart(2,"0")}
              </div>
              <div style={{ fontFamily:"Inter,sans-serif", fontSize:"clamp(8px,1.8vw,11px)", letterSpacing:"0.2em", textTransform:"uppercase", color:"#9A8660" }}>
                {label}
              </div>
            </div>
          ))}
        </div>

        <div style={{ height:1, maxWidth:180, margin:"0 auto 22px", background:"linear-gradient(90deg,transparent,rgba(201,168,76,0.5),transparent)" }}/>

        <p style={{ fontFamily:"Inter,sans-serif", fontSize:"clamp(12px,2.5vw,14px)", color:"#5A4E38", lineHeight:1.75, maxWidth:420, margin:"0 auto" }}>
          Authentic Egyptian flavors are coming to Anaheim. Be the first to know when we open our doors.
        </p>
      </div>
    </section>
  );
}
