"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { menuCategories, menuItems, platesBases, platesToppings, mimoSauceSuggestions } from "@/lib/data/menu";
import { useLang } from "@/lib/langContext";

const LOCAL_PHOTOS: Record<string, string> = {
  c1:  "/images/dishes/beef-shawarma.jpg",
  c2:  "/images/dishes/chicken-shawarma.jpg",
  c3:  "/images/dishes/kebda-eskandarani.jpg",
  c4:  "/images/dishes/sujok.jpg",
  c5:  "/images/dishes/hawawshi.jpg",
  c6:  "/images/dishes/koshari.jpg",
  c7:  "/images/dishes/macarona-bechamel.jpg",
  p1:  "/images/dishes/beef-shawarma-plate.jpg",
  p2:  "/images/dishes/chicken-shawarma-plate.jpg",
  p3:  "/images/dishes/kebda-plate.jpg",
  p4:  "/images/dishes/sujok-plate.jpg",
  p5:  "/images/dishes/bitok-plate.jpg",
  d1:  "/images/dishes/kunafa-ball.jpg",
  d2:  "/images/dishes/baklava.jpg",
  d3:  "/images/dishes/om-ali.jpg",
  s1:  "/images/dishes/tahini.jpg",
  s2:  "/images/dishes/pickles.jpg",
  s3:  "/images/dishes/hummus.jpg",
  s4:  "/images/dishes/garlic-sauce.jpg",
  s5:  "/images/dishes/fries.jpg",
  s6:  "/images/dishes/baba-ghanoush.jpg",
  s7:  "/images/dishes/green-salad.jpg",
  s8:  "/images/dishes/potato-salad.jpg",
  dr1: "/images/dishes/birell.jpg",
  dr2: "/images/dishes/fairous-pomegranate.jpg",
  dr3: "/images/dishes/schweppes-lemon-mint.jpg",
  dr4: "/images/dishes/schweppes-pomegranate.jpg",
  dr5: "/images/dishes/schweppes-pineapple.jpg",
  dr6: "/images/dishes/schweppes-peach.jpg",
};

const BRAND_POOL = ["/images/menu-board.jpg", "/images/cairo-scene.jpg", "/images/brand-poster.jpg"];
function getBrand(id: string) {
  let h = 0; for (let i = 0; i < id.length; i++) h = id.charCodeAt(i) + h * 31;
  return BRAND_POOL[Math.abs(h) % BRAND_POOL.length];
}

function DishPhotoInner({ src, itemName }: { src: string; itemName: string }) {
  const [err, setErr] = useState(false);
  if (src && !err) {
    return <Image src={src} alt={itemName} fill style={{ objectFit: "cover" }} sizes="280px" onError={() => setErr(true)} />;
  }
  return null;
}

function DishPhoto({ itemId, itemName, customImage }: { itemId: string; itemName: string; customImage?: string }) {
  const rawSrc = customImage || LOCAL_PHOTOS[itemId];
  // Add cache-busting for Supabase Storage URLs so mobile browsers fetch fresh image
  const src = rawSrc && rawSrc.startsWith("https://") && rawSrc.includes("supabase")
    ? rawSrc + (rawSrc.includes("?") ? "&" : "?") + "v=" + encodeURIComponent(rawSrc.slice(-8))
    : rawSrc;
  if (src) {
    // key={src} forces remount when image changes, resetting error state
    return <DishPhotoInner key={src} src={src} itemName={itemName} />;
  }
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
      <Image src={getBrand(itemId)} alt={itemName} fill style={{ objectFit: "cover", opacity: 0.4, filter: "sepia(40%) brightness(0.55)" }} sizes="280px" />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg,rgba(20,12,4,.75),rgba(10,8,3,.6))", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "14px 12px", gap: 7 }}>
        <div style={{ width: 28, height: 1, background: "rgba(201,168,76,.6)" }} />
        <p style={{ fontFamily: "Cormorant Garamond,Georgia,serif", fontSize: "clamp(13px,1.8vw,16px)", color: "#E8C97A", fontWeight: 500, textAlign: "center", lineHeight: 1.25 }}>{itemName}</p>
        <div style={{ width: 28, height: 1, background: "rgba(201,168,76,.6)" }} />
      </div>
    </div>
  );
}

function PlatesGuide({ customItems = {} }: { customItems?: Record<string, Partial<typeof menuItems[0]>> }) {
  const [show, setShow] = useState(false);
  const { t } = useLang();
  const getItem = (item: typeof menuItems[0]) => {
    const custom = customItems[item.id];
    if (!custom) return item;
    // Only use custom image if it's a real Storage URL (starts with http), not old base64
    const image = custom.image && custom.image.startsWith("http") 
      ? custom.image 
      : item.image || "";
    return { ...item, ...custom, image };
  };
  return (
    <div className="plates-guide">
      <p style={{ fontFamily: "Inter,sans-serif", fontSize: 13, color: "#5A4E38", textAlign: "center", marginBottom: 6 }}>
        ALL Plates served with Tahini sauce or Garlic sauce and one of your choices of the following sides: Fries, Egyptian Salad or Potato Salad.
      </p>
      <p style={{ fontFamily: "Inter,sans-serif", fontSize: 13, color: "#C9A84C", textAlign: "center", marginBottom: 24 }}>
        Add +$1 for Baba Ghanoush Or Hummus
      </p>
      <div className="plates-steps">
        <div>
          <p className="step-label">First Step: Choose Your Base</p>
          <div className="bases-grid">{platesBases.map(b => <div key={b} className="base-chip">{b}</div>)}</div>
        </div>
        <div>
          <p className="step-label">Second Step: Choose Your Protein</p>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {(["p1","p2","p3","p4","p5"] as const).map(id => {
              const base = menuItems.find(i => i.id === id);
              if (!base) return null;
              const item = getItem(base);
              // Strip " Plate" suffix for display in the protein list
              const label = item.name.replace(/ Plate$/, "").replace(/ \((\d+) Pieces?\)/, " ($1PCs)");
              return (
                <div key={id} className="protein-row">
                  <span>{label}</span>
                  <span style={{ color: "#C9A84C" }}>${item.price.toFixed(2)}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <p className="step-label">Third Step: Choose Your Toppings</p>
          <div className="bases-grid" style={{ marginBottom: 12 }}>{platesToppings.map(topping => <div key={topping} className="base-chip">{topping}</div>)}</div>
          <button className="sauce-toggle" onClick={() => setShow(!show)}>{t('sauce_tips')} {show ? "▲" : "▼"}</button>
          {show && (
            <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 8 }}>
              {mimoSauceSuggestions.map(s => (
                <p key={s.item} style={{ fontFamily: "Inter,sans-serif", fontSize: 12, lineHeight: 1.65 }}>
                  <span style={{ color: "#C9A84C", fontWeight: 600 }}>{s.item}: </span>
                  <span style={{ color: "#5A4E38" }}>{s.suggestion}</span>
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface MenuOffer {
  id: string; title: string; description: string;
  original_price: number; offer_price: number;
  image: string; badge: string; badge_color: string;
  expires_at: string; is_active: boolean;
}

export default function MenuSection({ offers = [] }: { offers?: MenuOffer[] }) {
  const [activeCat, setActiveCat] = useState("classics");
  const { t, isAr } = useLang();
  const [mounted, setMounted] = useState(false);
  const [customItems, setCustomItems] = useState<Record<string, Partial<typeof menuItems[0]>>>({});
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const tabsRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef(false);

  // Merge static menu with Supabase overrides
  useEffect(() => {
    fetch("/api/menu-items").then(r=>r.json()).then(d => {
      if (d.items && d.items.length > 0) {
        const map: Record<string, typeof d.items[0]> = {};
        d.items.forEach((item: typeof d.items[0]) => { map[item.id] = item; });
        setCustomItems(map);
      }
    }).catch(() => {});
  }, []);

  // Helper: get merged item (Supabase overrides static)
  const getItem = (item: typeof menuItems[0]) => {
    const custom = customItems[item.id];
    if (!custom) return item;
    // Only use custom image if it's a real Storage URL (starts with http), not old base64
    const image = custom.image && custom.image.startsWith("http") 
      ? custom.image 
      : item.image || "";
    return { ...item, ...custom, image };
  };

  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(id);
  }, []);

  // Scroll spy — update active tab while user scrolls
  useEffect(() => {
    if (!mounted) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrolling.current) return;
        // Find the topmost visible section
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          const slug = visible[0].target.getAttribute("data-slug");
          if (slug) setActiveCat(slug);
        }
      },
      {
        threshold: 0,
        rootMargin: "-80px 0px -60% 0px"
      }
    );
    Object.values(sectionRefs.current).forEach(el => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, [mounted]);

  // Auto-scroll the tab bar so the active tab is always visible
  useEffect(() => {
    if (!tabsRef.current) return;
    const activeBtn = tabsRef.current.querySelector<HTMLElement>(".menu-tab-active");
    if (activeBtn) {
      activeBtn.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [activeCat]);

  // Click tab → smooth scroll to section
  const handleTabClick = useCallback((slug: string) => {
    setActiveCat(slug);
    isScrolling.current = true;
    const el = sectionRefs.current[slug];
    if (el) {
      const offset = 120;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
      setTimeout(() => { isScrolling.current = false; }, 800);
    }
  }, []);

  const visibleCats = menuCategories.filter(c => {
    if (c.slug === "offers") return offers.filter(o => o.is_active).length > 0;
    return true;
  });

  return (
    <section id="menu" style={{ background: "#0A0803", position: "relative" }}>
      <style>{`
        .menu-sticky-tabs { position:sticky; top:64px; z-index:40; background:#0A0803; border-bottom:1px solid rgba(201,168,76,.15); padding:12px 0; backdrop-filter:blur(8px); }
        .menu-tabs-inner { display:flex; gap:6px; width:max-content; margin:0 auto; padding:0 16px; }
        .menu-tab { display:inline-flex; align-items:center; gap:6px; padding:9px 18px; font-family:Inter,sans-serif; font-size:12px; letter-spacing:0.12em; text-transform:uppercase; cursor:pointer; transition:all .25s; white-space:nowrap; border:1px solid #2E2820; background:transparent; color:#5A4E38; }
        .menu-tab:hover { border-color:rgba(201,168,76,.4); color:#9A8660; }
        .menu-tab-active { border-color:#C9A84C !important; background:rgba(201,168,76,.1) !important; color:#E8C97A !important; }
        .menu-section-block { padding:40px 0 20px; }
        .menu-section-title { font-family:"Cormorant Garamond",Georgia,serif; font-size:clamp(1.4rem,3vw,2rem); color:#E8C97A; font-weight:300; margin-bottom:6px; }
        .menu-section-divider { height:1px; max-width:160px; background:linear-gradient(90deg,transparent,#C9A84C,transparent); margin-bottom:24px; }
        .plates-guide { background:#1A1610; border:1px solid rgba(201,168,76,.18); padding:clamp(16px,4vw,28px); margin-bottom:28px; }
        .plates-steps { display:grid; grid-template-columns:repeat(auto-fill,minmax(min(100%,200px),1fr)); gap:20px; }
        .step-label { font-family:Cinzel,serif; font-size:11px; color:#C9A84C; letter-spacing:.12em; text-transform:uppercase; margin-bottom:10px; }
        .bases-grid { display:grid; grid-template-columns:1fr 1fr; gap:6px; }
        .base-chip { background:#221E16; border:1px solid #2E2820; padding:9px 10px; font-family:Inter,sans-serif; font-size:11px; color:#9A8660; text-align:center; display:flex; align-items:center; justify-content:center; min-height:48px; }
        .protein-row { display:flex; justify-content:space-between; font-family:Inter,sans-serif; font-size:13px; color:#5A4E38; padding:8px 0; border-bottom:1px solid #1A1610; }
        .sauce-toggle { background:none; border:none; cursor:pointer; font-family:Inter,sans-serif; font-size:11px; color:rgba(201,168,76,.6); letter-spacing:.12em; text-transform:uppercase; display:flex; align-items:center; gap:6px; padding:0; }
        .menu-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(min(100%,280px),1fr)); gap:16px; }
        .menu-card { background:#1A1610; border:1px solid #2E2820; overflow:hidden; display:flex; flex-direction:column; transition:border-color .3s; }
        .menu-card:hover { border-color:rgba(201,168,76,.3); }
        .menu-card-img { position:relative; width:100%; aspect-ratio:16/9; background:#12100A; overflow:hidden; }
        .menu-card-body { padding:16px; flex:1; display:flex; flex-direction:column; gap:8px; }
        .menu-card-name { font-family:"Cormorant Garamond",Georgia,serif; font-size:clamp(1rem,2.5vw,1.2rem); color:#E8C97A; font-weight:500; line-height:1.3; }
        .menu-card-desc { font-family:Inter,sans-serif; font-size:clamp(11px,1.8vw,12px); color:#5A4E38; line-height:1.7; flex:1; }
        .menu-card-price-row { display:flex; align-items:center; justify-content:space-between; padding-top:10px; border-top:1px solid #221E16; margin-top:auto; }
        .price-main { font-family:Cinzel,serif; font-size:17px; color:#C9A84C; }
        .card-note { font-family:Inter,sans-serif; font-size:10px; color:#5A4E38; font-style:italic; }
        .veg-dot { width:14px; height:14px; border-radius:50%; border:1.5px solid rgba(34,197,94,.5); display:flex; align-items:center; justify-content:center; position:absolute; top:8px; right:8px; background:rgba(10,8,3,.7); }
        .spice-dots { display:flex; gap:3px; }
        .spice-dot { width:6px; height:6px; border-radius:50%; background:#C9A84C; display:inline-block; }
        .spice-dot-empty { width:6px; height:6px; border-radius:50%; background:#2E2820; display:inline-block; }
        .tabs-scroll { overflow-x:auto; -webkit-overflow-scrolling:touch; scrollbar-width:none; }
        .tabs-scroll::-webkit-scrollbar { display:none; }
      `}</style>

      {/* Section header */}
      <div className="section-pad" style={{ paddingBottom: 0 }}>
        <div className="container-site">
          <div className="section-header">
            <h2 style={{ fontFamily: "Cormorant Garamond,Georgia,serif", fontSize: "clamp(2rem,6vw,3.5rem)", color: "#E8C97A", fontWeight: 300, marginBottom: 16 }}>
              Our Menu
            </h2>
            <div style={{ height: 1, maxWidth: 180, margin: "0 auto", background: "linear-gradient(90deg,transparent,#C9A84C,transparent)" }} />
          </div>
        </div>
      </div>

      {/* Sticky tabs */}
      <div className="menu-sticky-tabs" ref={tabsRef}>
        <div className="tabs-scroll">
          <div className="menu-tabs-inner">
            {mounted
              ? visibleCats.map(c => (
                  <button key={c.slug} onClick={() => handleTabClick(c.slug)}
                    className={activeCat === c.slug ? "menu-tab menu-tab-active" : "menu-tab"}>
                    {c.name}
                  </button>
                ))
              : visibleCats.map(c => (
                  <div key={c.slug} className="menu-tab" style={{ opacity: .4 }}>{c.name}</div>
                ))
            }
          </div>
        </div>
      </div>

      {/* All sections rendered together — continuous scroll */}
      <div className="container-site">
        {visibleCats.map(cat => {
          const items = menuItems.filter(i => i.category === cat.slug).map(getItem).filter(i => i.isAvailable !== false);
          const isOffers = cat.slug === "offers";
          const activeOffers = offers.filter(o => o.is_active);

          return (
            <div
              key={cat.slug}
              data-slug={cat.slug}
              ref={el => { sectionRefs.current[cat.slug] = el; }}
              className="menu-section-block"
            >
              <h3 className="menu-section-title">{cat.name}</h3>
              <div className="menu-section-divider" />

              {cat.slug === "plates" && <PlatesGuide customItems={customItems} />}

              {isOffers ? (
                <div className="menu-grid">
                  {activeOffers.map(o => {
                    const pct = o.original_price > 0 ? Math.round((1 - o.offer_price / o.original_price) * 100) : 0;
                    const bgC = o.badge_color === "red" ? "rgba(220,38,38,.9)" : o.badge_color === "green" ? "rgba(22,163,74,.9)" : "rgba(201,168,76,.9)";
                    return (
                      <div key={o.id} className="menu-card" style={{ border: "1px solid rgba(201,168,76,.25)" }}>
                        <div className="menu-card-img">
                          {o.image
                            ? <Image src={o.image} alt={o.title} fill style={{ objectFit: "cover" }} sizes="280px" />
                            : <div style={{ width: "100%", height: "100%", background: "#2A1A00", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontSize: 40 }}>🏷️</span></div>
                          }
                          <div style={{ position: "absolute", top: 10, left: 10 }}>
                            <span style={{ fontFamily: "Cinzel,serif", fontSize: 12, fontWeight: 700, padding: "5px 12px", background: bgC, color: o.badge_color === "gold" ? "#0A0803" : "#fff" }}>{o.badge}</span>
                          </div>
                        </div>
                        <div className="menu-card-body">
                          <h3 className="menu-card-name">{o.title}</h3>
                          <p className="menu-card-desc">{o.description}</p>
                          {o.expires_at && <p style={{ fontFamily: "Inter,sans-serif", fontSize: 10, color: "rgba(239,68,68,.7)" }}>⏱ Expires {o.expires_at}</p>}
                          <div className="menu-card-price-row">
                            <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                              <span className="price-main">${o.offer_price.toFixed(2)}</span>
                              {o.original_price > 0 && <span style={{ fontFamily: "Inter,sans-serif", fontSize: 13, color: "#5A4E38", textDecoration: "line-through" }}>${o.original_price.toFixed(2)}</span>}
                            </div>
                            {pct > 0 && <span style={{ fontFamily: "Cinzel,serif", fontSize: 12, color: "rgba(201,168,76,.7)", border: "1px solid rgba(201,168,76,.2)", padding: "3px 8px" }}>-{pct}%</span>}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="menu-grid">
                  {items.map(item => (
                    <div key={item.id} className="menu-card">
                      <div className="menu-card-img">
                        <DishPhoto itemId={item.id} itemName={item.name} customImage={item.image} />
                        {item.isVegetarian && <div className="veg-dot"><div style={{ width: 6, height: 6, borderRadius: "50%", background: "rgb(134,239,172)" }} /></div>}
                      </div>
                      <div className="menu-card-body">
                        <h3 className="menu-card-name">
                          {item.name}
                          {item.nameAr && <span style={{ fontFamily: "Cormorant Garamond,serif", fontSize: 13, color: "#9A8660", fontWeight: 300, marginLeft: 6 }} dir="rtl">{item.nameAr}</span>}
                        </h3>
                        <p className="menu-card-desc">{item.description}</p>
                        <div className="menu-card-price-row">
                          <span className="price-main">${item.price.toFixed(2)}</span>
                          {(item.spiceLevel ?? 0) > 0 && (
                            <div className="spice-dots">
                              {[1, 2, 3].map(s => <span key={s} className={s <= (item.spiceLevel ?? 0) ? "spice-dot" : "spice-dot-empty"} />)}
                            </div>
                          )}
                        </div>
                        {item.note && <p className="card-note">{item.note}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        <div style={{ textAlign: "center", marginTop: 48, paddingTop: 28, paddingBottom: 48, borderTop: "1px solid #1A1610" }}>
          <p style={{ fontFamily: "Cormorant Garamond,Georgia,serif", fontSize: "clamp(1.1rem,3vw,1.4rem)", fontStyle: "italic", color: "#C9A84C", marginBottom: 16 }}>{t('menu_ready')}</p>
          <a href="#order" className="btn-gold" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 36px" }}>{t('menu_order_cta')}</a>
        </div>
      </div>
    </section>
  );
}
