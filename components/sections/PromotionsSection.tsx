"use client";
import { useState, useEffect } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
export interface Promo {
  id: string;
  title: string;
  description: string;
  badge: string;          // e.g. "20% OFF" or "BOGO" or "FREE SIDE"
  badgeColor: string;     // "gold" | "red" | "green"
  startDate: string;      // ISO string
  endDate: string;        // ISO string
  code?: string;          // optional coupon code
  emoji: string;
  isActive: boolean;
}

// ─── Default promos — edit from Admin Dashboard ───────────────────────────────
export const DEFAULT_PROMOS: Promo[] = [
  {
    id: "p1",
    title: "Grand Opening Special",
    description: "Get 20% off your entire order during our first week of opening. Use code at checkout.",
    badge: "20% OFF",
    badgeColor: "gold",
    startDate: "2025-09-15T00:00:00Z",
    endDate:   "2025-09-22T23:59:59Z",
    code: "MIMO20",
    emoji: "🎉",
    isActive: true,
  },
  {
    id: "p2",
    title: "Family Meal Deal",
    description: "Order any 2 Signature Plates + 2 Sandwiches and get a FREE dessert of your choice.",
    badge: "FREE DESSERT",
    badgeColor: "green",
    startDate: "2025-09-15T00:00:00Z",
    endDate:   "2025-10-15T23:59:59Z",
    code: "FAMILY",
    emoji: "👨‍👩‍👧‍👦",
    isActive: true,
  },
  {
    id: "p3",
    title: "Lunch Special",
    description: "Every weekday 11 AM – 2 PM: Any Classic sandwich + Fries + Drink for only $14.99.",
    badge: "$14.99",
    badgeColor: "red",
    startDate: "2025-09-15T00:00:00Z",
    endDate:   "2025-12-31T23:59:59Z",
    code: "",
    emoji: "🕐",
    isActive: true,
  },
];

// ─── Countdown timer for a single promo ──────────────────────────────────────
function PromoTimer({ endDate }: { endDate: string }) {
  const [left, setLeft] = useState<{ d: number; h: number; m: number; s: number } | null>(null);

  useEffect(() => {
    const calc = () => {
      const diff = new Date(endDate).getTime() - Date.now();
      if (diff <= 0) { setLeft(null); return; }
      setLeft({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [endDate]);

  if (!left) return <span style={{ fontFamily: "Inter,sans-serif", fontSize: 11, color: "#5A4E38" }}>Offer ended</span>;

  const parts = [
    { n: left.d, l: "d" },
    { n: left.h, l: "h" },
    { n: left.m, l: "m" },
    { n: left.s, l: "s" },
  ];

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <span style={{ fontFamily: "Inter,sans-serif", fontSize: 10, color: "#5A4E38", letterSpacing: "0.12em", textTransform: "uppercase" }}>Ends in</span>
      <div style={{ display: "flex", gap: 4 }}>
        {parts.map(({ n, l }) => (
          <div key={l} style={{ display: "flex", alignItems: "baseline", gap: 1 }}>
            <span style={{ fontFamily: "Cinzel,serif", fontSize: 15, color: "#C9A84C", fontWeight: 600, lineHeight: 1, minWidth: l === "d" ? "auto" : 20, textAlign: "center" }}>
              {String(n).padStart(2, "0")}
            </span>
            <span style={{ fontFamily: "Inter,sans-serif", fontSize: 9, color: "#5A4E38" }}>{l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Badge color helper ───────────────────────────────────────────────────────
function getBadgeStyle(color: string): React.CSSProperties {
  if (color === "red")   return { background: "rgba(220,38,38,0.12)",  border: "1px solid rgba(220,38,38,0.35)",  color: "#f87171" };
  if (color === "green") return { background: "rgba(34,197,94,0.1)",   border: "1px solid rgba(34,197,94,0.3)",   color: "#86efac" };
  return                        { background: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.4)",  color: "#E8C97A" };
}

// ─── Single promo card ────────────────────────────────────────────────────────
function PromoCard({ promo }: { promo: Promo }) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    if (!promo.code) return;
    navigator.clipboard.writeText(promo.code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div style={{
      background: "#1A1610",
      border: "1px solid #2E2820",
      padding: "clamp(20px, 4vw, 28px)",
      position: "relative",
      overflow: "hidden",
      transition: "border-color 0.3s ease",
    }}
      className="promo-card-hover"
    >
      {/* Top accent line */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)" }} />

      {/* Badge + emoji row */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14, gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: "clamp(24px, 5vw, 32px)", lineHeight: 1 }}>{promo.emoji}</span>
          <span style={{
            fontFamily: "Cinzel,serif",
            fontSize: "clamp(12px, 2.5vw, 14px)",
            fontWeight: 600,
            letterSpacing: "0.12em",
            padding: "5px 12px",
            ...getBadgeStyle(promo.badgeColor),
          }}>
            {promo.badge}
          </span>
        </div>
        {/* Timer */}
        <PromoTimer endDate={promo.endDate} />
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: "Cormorant Garamond,Georgia,serif",
        fontSize: "clamp(1.2rem, 3vw, 1.45rem)",
        color: "#E8C97A",
        fontWeight: 500,
        lineHeight: 1.3,
        marginBottom: 10,
      }}>
        {promo.title}
      </h3>

      {/* Description */}
      <p style={{
        fontFamily: "Inter,sans-serif",
        fontSize: "clamp(12px, 2vw, 13px)",
        color: "#9A8660",
        lineHeight: 1.7,
        marginBottom: promo.code ? 16 : 0,
      }}>
        {promo.description}
      </p>

      {/* Coupon code */}
      {promo.code && (
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 4 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 0, border: "1px dashed rgba(201,168,76,0.4)", overflow: "hidden" }}>
            <div style={{ padding: "7px 14px", background: "rgba(201,168,76,0.06)" }}>
              <span style={{ fontFamily: "Cinzel,serif", fontSize: 14, color: "#C9A84C", letterSpacing: "0.15em" }}>
                {promo.code}
              </span>
            </div>
            <button
              onClick={copyCode}
              style={{
                background: copied ? "rgba(34,197,94,0.15)" : "rgba(201,168,76,0.1)",
                border: "none",
                borderLeft: "1px dashed rgba(201,168,76,0.4)",
                padding: "7px 12px",
                cursor: "pointer",
                fontFamily: "Inter,sans-serif",
                fontSize: 10,
                color: copied ? "#86efac" : "#C9A84C",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                transition: "all 0.2s",
                whiteSpace: "nowrap",
              }}
            >
              {copied ? "✓ Copied!" : "Copy"}
            </button>
          </div>
          <span style={{ fontFamily: "Inter,sans-serif", fontSize: 10, color: "#5A4E38" }}>Use at checkout</span>
        </div>
      )}
    </div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────
interface Props {
  promos?: Promo[];
}

export default function PromotionsSection({ promos = DEFAULT_PROMOS }: Props) {
  const [now] = useState(() => Date.now());
  const active = promos.filter(p => {
    if (!p.isActive) return false;
    const start = new Date(p.startDate).getTime();
    const end   = new Date(p.endDate).getTime();
    return now >= start && now <= end;
  });

  if (active.length === 0) return null;

  return (
    <section id="offers" style={{ background: "#0D0B07", position: "relative", overflow: "hidden" }}>
      {/* Top / bottom lines */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg,transparent,rgba(201,168,76,0.5),transparent)" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg,transparent,rgba(201,168,76,0.5),transparent)" }} />

      {/* Ambient glow */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "min(700px,100%)", height: 200, background: "radial-gradient(ellipse,rgba(201,168,76,0.05),transparent)", pointerEvents: "none" }} />

      <div className="container-site" style={{ position: "relative", zIndex: 1, paddingTop: "clamp(48px,8vw,80px)", paddingBottom: "clamp(48px,8vw,80px)" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "clamp(32px,5vw,56px)" }}>
          {/* Flashing dot */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 12 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#C9A84C", display: "inline-block", boxShadow: "0 0 8px #C9A84C" }} className="promo-pulse" />
            <p style={{ fontFamily: "Inter,sans-serif", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "#9A8660" }}>
              Limited Time Offers
            </p>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#C9A84C", display: "inline-block", boxShadow: "0 0 8px #C9A84C" }} className="promo-pulse" />
          </div>

          <h2 style={{
            fontFamily: "Cormorant Garamond,Georgia,serif",
            fontSize: "clamp(2rem, 6vw, 3.5rem)",
            color: "#E8C97A",
            fontWeight: 300,
            lineHeight: 1.15,
            marginBottom: 14,
          }}>
            Special Offers
          </h2>

          <p style={{ fontFamily: "Inter,sans-serif", fontSize: "clamp(12px,2vw,14px)", color: "#5A4E38", maxWidth: 400, margin: "0 auto 16px" }}>
            Exclusive deals for a limited time only. Don&apos;t miss out — these offers won&apos;t last long.
          </p>

          <div style={{ height: 1, maxWidth: 180, margin: "0 auto", background: "linear-gradient(90deg,transparent,#C9A84C,transparent)" }} />
        </div>

        {/* Promo cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))", gap: 16 }}>
          {active.map(promo => (
            <PromoCard key={promo.id} promo={promo} />
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center", marginTop: 32 }}>
          <a
            href="https://anaheimfoodco.com/s/arabesque/1560-s-lewis-st-anaheim/94193ec7-7e7b-4357-8ba6-2d36b8bb1632"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 32px" }}
          >
            🛒 Order & Redeem
          </a>
        </div>
      </div>

      <style>{`
        @keyframes promoPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(0.8); }
        }
        .promo-pulse { animation: promoPulse 2s ease-in-out infinite; }
      `}</style>
    </section>
  );
}
