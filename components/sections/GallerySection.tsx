"use client";
import { useLang } from "@/lib/langContext";
import { useState, useEffect } from "react";
import Image from "next/image";

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  caption: string;
  w: number;
  h: number;
}

const DEFAULT_IMAGES: GalleryImage[] = [
  { id: 1, src: "/images/cairo-scene.jpg", alt: "Cairo — The Inspiration Behind Arabesque", caption: "The Spirit of Cairo", w: 1920, h: 1080 },
  { id: 2, src: "/images/menu-board.jpg", alt: "Arabesque by Mimo Menu", caption: "Signature Classics", w: 2925, h: 1950 },
];

function GalleryCard({ img, onClick }: { img: GalleryImage; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  const isBase64 = img.src.startsWith("data:");

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative", cursor: "pointer",
        overflow: "hidden", background: "#1A1610",
        // Fixed height per card — ensures 2 columns × N rows layout
        height: "clamp(200px, 30vw, 380px)",
      }}
    >
      {isBase64 ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img src={img.src} alt={img.alt} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s ease", transform: hovered ? "scale(1.03)" : "scale(1)" }} />
      ) : (
        <Image src={img.src} alt={img.alt} fill
          style={{ objectFit: "cover", transition: "transform 0.6s ease", transform: hovered ? "scale(1.03)" : "scale(1)" }}
          sizes="(max-width: 767px) 100vw, 50vw" />
      )}
      {/* Caption */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px 20px 18px", background: "linear-gradient(to top,rgba(10,8,3,0.8),transparent)", opacity: hovered ? 1 : 0.75, transition: "opacity 0.3s" }}>
        <p style={{ fontFamily: "Cormorant Garamond,Georgia,serif", fontSize: "clamp(14px,2vw,20px)", color: "#E8C97A", fontWeight: 400 }}>
          {img.caption}
        </p>
      </div>
      <div style={{ position: "absolute", top: 10, left: 10, width: 24, height: 24, borderTop: "1px solid rgba(201,168,76,0.5)", borderLeft: "1px solid rgba(201,168,76,0.5)", opacity: hovered ? 1 : 0, transition: "opacity 0.3s" }} />
      <div style={{ position: "absolute", bottom: 10, right: 10, width: 24, height: 24, borderBottom: "1px solid rgba(201,168,76,0.5)", borderRight: "1px solid rgba(201,168,76,0.5)", opacity: hovered ? 1 : 0, transition: "opacity 0.3s" }} />
    </div>
  );
}

export default function GallerySection() {
  const { t } = useLang();
  const [lb, setLb] = useState<number | null>(null);
  const [images, setImages] = useState<GalleryImage[]>(DEFAULT_IMAGES);

  useEffect(() => {
    const loadGallery = () => {
      fetch("/api/gallery").then(r=>r.json()).then(d => {
        if (d.images && d.images.length > 0) {
          // Map Supabase images to GalleryImage format
          const dbImgs: GalleryImage[] = d.images.map((img: {id:string|number; src:string; alt?:string; caption?:string}, idx:number) => ({
            id: typeof img.id === "string" ? parseInt(img.id) || idx+100 : img.id,
            src: img.src,
            alt: img.alt || "Arabesque",
            caption: img.caption || "",
            w: 1200, h: 800,
          }));
          setImages(dbImgs);
        } else {
          setImages(DEFAULT_IMAGES);
        }
      }).catch(() => setImages(DEFAULT_IMAGES));
    };

    loadGallery();
    window.addEventListener("arabesque:gallery:update", loadGallery);
    return () => {
      window.removeEventListener("arabesque:gallery:update", loadGallery);
    };
  }, []);

  const lbImg = lb !== null ? images[lb] : null;

  return (
    <section id="gallery" style={{ background: "#12100A", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg,transparent,#C9A84C,transparent)" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg,transparent,#C9A84C,transparent)" }} />

      {/* Header */}
      <div style={{ paddingTop: "clamp(48px,7vw,80px)", paddingBottom: 32, textAlign: "center" }}>
        <div className="container-site">
          <p style={{ fontFamily: "Inter,sans-serif", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "#9A8660", marginBottom: 12 }}>{t("gallery_journey")}</p>
          <h2 style={{ fontFamily: "Cormorant Garamond,Georgia,serif", fontSize: "clamp(2rem,6vw,3.5rem)", color: "#E8C97A", fontWeight: 300, marginBottom: 16 }}>{t("gallery_title")}</h2>
          <div style={{ height: 1, maxWidth: 180, margin: "0 auto", background: "linear-gradient(90deg,transparent,#C9A84C,transparent)" }} />
        </div>
      </div>

      {/* Images grid — always 2 columns */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: 2,
      }}>
        {images.map((img, i) => (
          <GalleryCard key={img.id} img={img} onClick={() => setLb(i)} />
        ))}
      </div>

      {/* Instagram CTA */}
      <div style={{ paddingTop: 28, paddingBottom: "clamp(48px,7vw,80px)", textAlign: "center" }}>
        <div className="container-site">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
            <a href="https://www.instagram.com/arabesque_bymimo?igsh=OHhkeGY0N2FkMnAy" target="_blank" rel="noopener noreferrer"
              className="btn-outline" style={{ display: "inline-flex", gap: 8, alignItems: "center", fontSize: 12 }}>
              📷 Follow @arabesque_bymimo
            </a>
            <a href="https://www.tiktok.com/@arabesquebymimo?_r=1&_t=ZP-97ASt7K9hEs" target="_blank" rel="noopener noreferrer"
              className="btn-outline" style={{ display: "inline-flex", gap: 8, alignItems: "center", fontSize: 12 }}>
              🎵 TikTok @arabesquebymimo
            </a>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lb !== null && lbImg && (
        <div onClick={() => setLb(null)} style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.95)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <button onClick={() => setLb(null)} style={{ position: "absolute", top: 20, right: 20, background: "none", border: "1px solid rgba(201,168,76,0.4)", color: "#C9A84C", width: 40, height: 40, fontSize: 22, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
          {lb > 0 && <button onClick={e => { e.stopPropagation(); setLb(lb - 1); }} style={{ position: "absolute", left: 20, top: "50%", transform: "translateY(-50%)", background: "none", border: "1px solid rgba(201,168,76,0.4)", color: "#C9A84C", width: 40, height: 40, fontSize: 22, cursor: "pointer" }}>‹</button>}
          {lb < images.length - 1 && <button onClick={e => { e.stopPropagation(); setLb(lb + 1); }} style={{ position: "absolute", right: 20, top: "50%", transform: "translateY(-50%)", background: "none", border: "1px solid rgba(201,168,76,0.4)", color: "#C9A84C", width: 40, height: 40, fontSize: 22, cursor: "pointer" }}>›</button>}
          <div style={{ maxWidth: "90vw", maxHeight: "90vh" }} onClick={e => e.stopPropagation()}>
            {lbImg.src.startsWith("data:")
              /* eslint-disable-next-line @next/next/no-img-element */
              ? <img src={lbImg.src} alt={lbImg.alt} style={{ maxWidth: "90vw", maxHeight: "88vh", objectFit: "contain", display: "block" }} />
              : <Image src={lbImg.src} alt={lbImg.alt} width={lbImg.w} height={lbImg.h} style={{ maxWidth: "90vw", maxHeight: "88vh", width: "auto", height: "auto", display: "block" }} />
            }
            {lbImg.caption && <p style={{ fontFamily: "Cormorant Garamond,Georgia,serif", fontSize: 18, color: "#E8C97A", textAlign: "center", marginTop: 12 }}>{lbImg.caption}</p>}
          </div>
        </div>
      )}
    </section>
  );
}
