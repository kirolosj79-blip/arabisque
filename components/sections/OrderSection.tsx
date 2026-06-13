"use client";

interface Props {
  orderUrl?: string;
  grubhubUrl?: string;
}

const DEFAULT_ORDER = "https://anaheimfoodco.com/s/arabesque/1560-s-lewis-st-anaheim/94193ec7-7e7b-4357-8ba6-2d36b8bb1632";
const DEFAULT_GRUBHUB = "https://grubhub.com/restaurant/arabesque-1560-s-lewis-st-anaheim/14655520?classicAffiliateId=%2Fr%2Fw%2F14655520%2F&utm_source=restaurant.grubhub.com&utm_medium=OOL&utm_campaign=order%20online&utm_content=14655520";

export default function OrderSection({
  orderUrl = DEFAULT_ORDER,
  grubhubUrl = DEFAULT_GRUBHUB,
}: Props) {
  const platforms = [
    {
      name: "Order via",
      sub: "Anaheim Food Co — pickup & delivery",
      href: orderUrl,
      primary: true,
      icon: (
        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      name: "Order on GrubHub",
      sub: "Fast delivery to your door",
      href: grubhubUrl,
      primary: false,
      icon: (
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8zm1-11h-2v4H7v2h4v4h2v-4h4v-2h-4V9z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="order" className="section-pad" style={{ background: "#12100A", position: "relative", overflow: "hidden" }}>
      <div className="pattern-overlay" style={{ position: "absolute", inset: 0, opacity: 0.22, pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: 0,    left: 0, right: 0, height: 1, background: "linear-gradient(90deg,transparent,#C9A84C,transparent)" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg,transparent,#C9A84C,transparent)" }} />
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "min(500px,100%)", height: 200, background: "radial-gradient(ellipse,rgba(201,168,76,0.06),transparent)", pointerEvents: "none" }} />

      <div className="container-site" style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 640 }}>
        <p style={{ fontFamily: "Inter,sans-serif", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "#9A8660", marginBottom: 14 }}>
          Skip the Wait
        </p>

        <h2 style={{ fontFamily: "Cormorant Garamond,Georgia,serif", fontSize: "clamp(2rem,6vw,3.5rem)", color: "#E8C97A", fontWeight: 300, lineHeight: 1.15, marginBottom: 16 }}>
          Order Online
        </h2>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 20 }}>
          <div style={{ height: 1, flex: 1, maxWidth: 80, background: "linear-gradient(90deg,transparent,rgba(201,168,76,0.5))" }} />
          <div className="halal-badge">
            <span style={{ fontFamily: "Cinzel,serif", fontSize: 13, color: "#C9A84C", lineHeight: 1 }}>حلال</span>
            <span style={{ fontFamily: "Inter,sans-serif", fontSize: 7, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(201,168,76,0.6)" }}>HALAL</span>
          </div>
          <div style={{ height: 1, flex: 1, maxWidth: 80, background: "linear-gradient(270deg,transparent,rgba(201,168,76,0.5))" }} />
        </div>

        <p style={{ fontFamily: "Inter,sans-serif", fontSize: "clamp(12px,2vw,14px)", color: "#9A8660", lineHeight: 1.75, marginBottom: 32 }}>
          Fresh, halal, and made to order. Pick up from Anaheim Food Co or get it delivered through GrubHub.
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8, marginBottom: 36 }}>
          {["⚡ Fast Pickup", "🚗 Delivery Available", "🌿 100% Halal", "📍 Anaheim, CA"].map(f => (
            <div key={f} style={{ fontFamily: "Inter,sans-serif", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", border: "1px solid #2E2820", color: "#9A8660", padding: "7px 14px" }}>
              {f}
            </div>
          ))}
        </div>

        {/* Platform buttons — using CSS classes for hover to avoid hydration issues */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
          {platforms.map(p => (
            <a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className={p.primary ? "order-btn-primary" : "order-btn-secondary"}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                {p.icon}
                <div style={{ textAlign: "left" }}>
                  <div style={{ fontFamily: "Inter,sans-serif", fontWeight: 600, fontSize: 14, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                    {p.name}
                  </div>
                  <div style={{ fontFamily: "Inter,sans-serif", fontSize: 12, opacity: 0.7, marginTop: 2 }}>
                    {p.sub}
                  </div>
                </div>
              </div>
              <span style={{ fontSize: 18, opacity: 0.6 }}>→</span>
            </a>
          ))}
        </div>

        <p style={{ fontFamily: "Inter,sans-serif", fontSize: 11, color: "#3A3228", marginTop: 20 }}>
          Powered by Anaheim Food Co. &amp; GrubHub
        </p>
      </div>
    </section>
  );
}
