"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";



type Tab = "overview"|"menu"|"categories"|"photos"|"gallery"|"menu-offers"|"reviews"|"orders"|"settings";

interface MenuItem { id:string; name:string; nameAr:string; description:string; price:number; comboPrice:number|null; category:string; isVegetarian:boolean; isFeatured:boolean; spiceLevel:number; note:string; image:string; isAvailable:boolean; }
interface Category { id:string; name:string; slug:string; description:string; icon:string; }
interface Review { id:string|number; name:string; rating:number; text:string; date?:string; created_at?:string; approved:boolean; featured:boolean; }
interface OrderLink { id:string; label:string; url:string; description:string; is_primary:boolean; is_active:boolean; }
interface MenuOffer { id:string; title:string; description:string; original_price:number; offer_price:number; image:string; badge:string; badge_color:string; expires_at:string; is_active:boolean; }
interface SocialLink { id:string; label:string; url:string; icon:string; active:boolean; }
interface DayHours { day:string; open:string; close:string; closed:boolean; }
interface Settings { phone:string; address:string; email:string; grand_opening:string; instagram:string; facebook:string; tiktok:string; hours_daily:string; catering_phone:string; catering_email:string; socials:string; hours_schedule:string; }

const SEED_CATS: Category[] = [
  {id:"1",name:"Signature Classics",slug:"classics",description:"Egyptian street food",icon:"🥙"},
  {id:"2",name:"Signature Plates",slug:"plates",description:"Build your plate",icon:"🍽️"},
  {id:"3",name:"Desserts",slug:"desserts",description:"Egyptian sweets",icon:"🍮"},
  {id:"4",name:"Side Items",slug:"sides",description:"Complete your meal",icon:"🫙"},
  {id:"5",name:"Drinks",slug:"drinks",description:"Beverages",icon:"🥤"},
];
const SEED_ITEMS: MenuItem[] = [
  {id:"c1",name:"Beef Shawarma",nameAr:"",description:"Thinly sliced Egyptian-style beef shawarma, deeply marinated and grilled with onions, tomato and parsley.",price:12.99,comboPrice:17.99,category:"classics",isVegetarian:false,isFeatured:true,spiceLevel:1,note:"Wrap $12.99 · Combo $17.99",image:"",isAvailable:true},
  {id:"c2",name:"Chicken Shawarma",nameAr:"",description:"Egyptian-style chicken shawarma marinated with signature spices, grilled to perfection.",price:12.99,comboPrice:17.99,category:"classics",isVegetarian:false,isFeatured:true,spiceLevel:0,note:"Wrap $12.99 · Combo $17.99",image:"",isAvailable:true},
  {id:"c3",name:"Kebda Eskandarani Sandwich",nameAr:"",description:"Sizzling beef liver sautéed with garlic, chili, and peppers.",price:12.99,comboPrice:17.99,category:"classics",isVegetarian:false,isFeatured:true,spiceLevel:2,note:"Sandwich $12.99 · Combo $17.99",image:"",isAvailable:true},
  {id:"c4",name:"Sujok Sandwich",nameAr:"",description:"Sizzling beef sausage sautéed with peppers and onions.",price:12.99,comboPrice:17.99,category:"classics",isVegetarian:false,isFeatured:false,spiceLevel:1,note:"",image:"",isAvailable:true},
  {id:"c5",name:"Hawawshi",nameAr:"",description:"Golden-crispy Egyptian bread stuffed with juicy spiced minced beef and onions.",price:12.99,comboPrice:17.99,category:"classics",isVegetarian:false,isFeatured:true,spiceLevel:0,note:"Add-ons: Cheese +$2 · Beef Shawarma +$3.5",image:"",isAvailable:true},
  {id:"c6",name:"Koshari",nameAr:"كشري",description:"Fluffy rice, hearty lentils, and tender pasta with crispy golden onions and a rich tangy tomato sauce.",price:15.99,comboPrice:null,category:"classics",isVegetarian:true,isFeatured:true,spiceLevel:0,note:"",image:"",isAvailable:true},
  {id:"c7",name:"Macarona Béchamel",nameAr:"",description:"Layered pasta and seasoned beef baked in creamy béchamel sauce with a golden bubbling crust.",price:16.99,comboPrice:null,category:"classics",isVegetarian:false,isFeatured:true,spiceLevel:0,note:"",image:"",isAvailable:true},
  {id:"p1",name:"Beef Shawarma Plate",nameAr:"",description:"Your choice of base + Beef Shawarma + toppings. Served with one side.",price:17.99,comboPrice:null,category:"plates",isVegetarian:false,isFeatured:true,spiceLevel:0,note:"",image:"",isAvailable:true},
  {id:"p2",name:"Chicken Shawarma Plate",nameAr:"",description:"Your choice of base + Chicken Shawarma + toppings.",price:16.99,comboPrice:null,category:"plates",isVegetarian:false,isFeatured:false,spiceLevel:0,note:"",image:"",isAvailable:true},
  {id:"p3",name:"Kebda Eskandarani Plate",nameAr:"",description:"Your choice of base + Kebda + toppings.",price:16.99,comboPrice:null,category:"plates",isVegetarian:false,isFeatured:false,spiceLevel:2,note:"",image:"",isAvailable:true},
  {id:"p4",name:"Sujok Plate",nameAr:"",description:"Your choice of base + Sujok sausage + toppings.",price:16.99,comboPrice:null,category:"plates",isVegetarian:false,isFeatured:false,spiceLevel:1,note:"",image:"",isAvailable:true},
  {id:"p5",name:"Biftek (2 Pieces) Plate",nameAr:"",description:"Two pieces of Biftek over your choice of base with toppings.",price:18.99,comboPrice:null,category:"plates",isVegetarian:false,isFeatured:false,spiceLevel:0,note:"",image:"",isAvailable:true},
  {id:"d1",name:"Pistachio Kunafa Chocolate Ball",nameAr:"",description:"Kunafa pastry in a chocolate-dipped ball with pistachio cream filling.",price:6.99,comboPrice:null,category:"desserts",isVegetarian:true,isFeatured:true,spiceLevel:0,note:"Contains Nuts",image:"",isAvailable:true},
  {id:"d2",name:"Baklava with Mixed Walnuts & Pistachio",nameAr:"",description:"Flaky phyllo with mixed walnuts and pistachio in honey syrup.",price:6.99,comboPrice:null,category:"desserts",isVegetarian:true,isFeatured:true,spiceLevel:0,note:"6 pcs · Contains Nuts",image:"",isAvailable:true},
  {id:"d3",name:"Om Ali",nameAr:"أم علي",description:"Flaky pastry baked with milk and cream topped with mixed nuts.",price:7.99,comboPrice:null,category:"desserts",isVegetarian:true,isFeatured:false,spiceLevel:0,note:"Contains Nuts",image:"",isAvailable:true},
  {id:"s1",name:"Tahini Sauce",nameAr:"",description:"House-made sesame tahini sauce.",price:1.99,comboPrice:null,category:"sides",isVegetarian:true,isFeatured:false,spiceLevel:0,note:"",image:"",isAvailable:true},
  {id:"s2",name:"Mix Pickles",nameAr:"",description:"Assorted pickled vegetables.",price:3.99,comboPrice:null,category:"sides",isVegetarian:true,isFeatured:false,spiceLevel:0,note:"",image:"",isAvailable:true},
  {id:"s3",name:"Hummus",nameAr:"",description:"Creamy house-made hummus.",price:4.99,comboPrice:null,category:"sides",isVegetarian:true,isFeatured:false,spiceLevel:0,note:"",image:"",isAvailable:true},
  {id:"s4",name:"Garlic Sauce",nameAr:"",description:"Creamy toum garlic sauce.",price:1.99,comboPrice:null,category:"sides",isVegetarian:true,isFeatured:false,spiceLevel:0,note:"",image:"",isAvailable:true},
  {id:"s5",name:"Fries",nameAr:"",description:"Crispy golden fries.",price:3.99,comboPrice:null,category:"sides",isVegetarian:true,isFeatured:false,spiceLevel:0,note:"",image:"",isAvailable:true},
  {id:"s6",name:"Baba Ghanoush",nameAr:"",description:"Smoky fire-roasted eggplant dip.",price:4.99,comboPrice:null,category:"sides",isVegetarian:true,isFeatured:false,spiceLevel:0,note:"",image:"",isAvailable:true},
  {id:"s7",name:"Egyptian Green Salad",nameAr:"",description:"Fresh Egyptian-style chopped salad.",price:3.99,comboPrice:null,category:"sides",isVegetarian:true,isFeatured:false,spiceLevel:0,note:"",image:"",isAvailable:true},
  {id:"s8",name:"Potato Salad",nameAr:"",description:"House-made creamy potato salad.",price:3.99,comboPrice:null,category:"sides",isVegetarian:true,isFeatured:false,spiceLevel:0,note:"",image:"",isAvailable:true},
  {id:"dr1",name:"Birell",nameAr:"",description:"Non-alcoholic malt beverage.",price:2.50,comboPrice:null,category:"drinks",isVegetarian:true,isFeatured:false,spiceLevel:0,note:"",image:"",isAvailable:true},
  {id:"dr2",name:"Fairous Pomegranate",nameAr:"",description:"Non-alcoholic pomegranate malt.",price:2.50,comboPrice:null,category:"drinks",isVegetarian:true,isFeatured:false,spiceLevel:0,note:"",image:"",isAvailable:true},
  {id:"dr3",name:"Schweppes Lemon/Mint",nameAr:"",description:"Refreshing lemon and mint sparkling.",price:2.50,comboPrice:null,category:"drinks",isVegetarian:true,isFeatured:false,spiceLevel:0,note:"",image:"",isAvailable:true},
  {id:"dr4",name:"Schweppes Pomegranate",nameAr:"",description:"Sparkling pomegranate refreshment.",price:2.50,comboPrice:null,category:"drinks",isVegetarian:true,isFeatured:false,spiceLevel:0,note:"",image:"",isAvailable:true},
  {id:"dr5",name:"Schweppes Pineapple",nameAr:"",description:"Tropical pineapple sparkling drink.",price:2.50,comboPrice:null,category:"drinks",isVegetarian:true,isFeatured:false,spiceLevel:0,note:"",image:"",isAvailable:true},
  {id:"dr6",name:"Schweppes Peach",nameAr:"",description:"Sparkling peach refreshment.",price:2.50,comboPrice:null,category:"drinks",isVegetarian:true,isFeatured:false,spiceLevel:0,note:"",image:"",isAvailable:true},
];
const DEFAULT_SOCIALS: SocialLink[] = [
  {id:"ig", label:"Instagram", url:"https://www.instagram.com/arabesque_bymimo?igsh=OHhkeGY0N2FkMnAy", icon:"📸", active:true},
  {id:"fb", label:"Facebook",  url:"https://www.facebook.com/share/1BcD5jjb8N/",                       icon:"👍", active:true},
  {id:"tt", label:"TikTok",    url:"https://www.tiktok.com/@arabesquebymimo?_r=1&_t=ZP-97ASt7K9hEs",  icon:"🎵", active:true},
];
const DEFAULT_HOURS: DayHours[] = [
  {day:"Monday",    open:"9:00 AM", close:"12:00 AM", closed:false},
  {day:"Tuesday",   open:"9:00 AM", close:"12:00 AM", closed:false},
  {day:"Wednesday", open:"9:00 AM", close:"12:00 AM", closed:false},
  {day:"Thursday",  open:"9:00 AM", close:"12:00 AM", closed:false},
  {day:"Friday",    open:"9:00 AM", close:"12:00 AM", closed:false},
  {day:"Saturday",  open:"9:00 AM", close:"12:00 AM", closed:false},
  {day:"Sunday",    open:"9:00 AM", close:"12:00 AM", closed:false},
];
const DEFAULT_SETTINGS: Settings = {
  phone:"657-657-3161", address:"1560 S Lewis St, Anaheim CA 92805",
  email:"Arabesque@mimo-culinary.kitchen", grand_opening:"2026-06-13",
  instagram:"https://www.instagram.com/arabesque_bymimo?igsh=OHhkeGY0N2FkMnAy",
  facebook:"https://www.facebook.com/share/1BcD5jjb8N/",
  tiktok:"https://www.tiktok.com/@arabesquebymimo?_r=1&_t=ZP-97ASt7K9hEs",
  hours_daily:"9:00 AM – 12:00 AM",
  catering_phone:"657-657-3161",
  catering_email:"Arabesque@mimo-culinary.kitchen",
  socials: JSON.stringify(DEFAULT_SOCIALS),
  hours_schedule: JSON.stringify(DEFAULT_HOURS),
};
const DEFAULT_LINKS: OrderLink[] = [
  {id:"o1",label:"Anaheim Food Co",url:"https://anaheimfoodco.com/s/arabesque/1560-s-lewis-st-anaheim/94193ec7-7e7b-4357-8ba6-2d36b8bb1632",description:"Main order page",is_primary:true,is_active:true},
  {id:"o2",label:"GrubHub",url:"https://grubhub.com/restaurant/arabesque-1560-s-lewis-st-anaheim/14655520",description:"GrubHub delivery",is_primary:false,is_active:true},
];

// ─── Shared styles ─────────────────────────────────────────────────────────
const S = {
  inp: {width:"100%",background:"#0D0B07",border:"1px solid #3A3228",color:"#E8C97A",padding:"10px 14px",fontFamily:"Inter,sans-serif",fontSize:14,outline:"none"} as React.CSSProperties,
  lbl: {fontFamily:"Inter,sans-serif",fontSize:12,letterSpacing:"0.1em",textTransform:"uppercase" as const,color:"#9A8660",display:"block",marginBottom:6},
  head1: {fontFamily:"Cormorant Garamond,Georgia,serif",fontSize:34,color:"#E8C97A",fontWeight:400,marginBottom:4} as React.CSSProperties,
  sub: {fontFamily:"Inter,sans-serif",fontSize:13,color:"#5A4E38"} as React.CSSProperties,
  catTitle: {fontFamily:"Cinzel,serif",fontSize:12,letterSpacing:"0.18em",textTransform:"uppercase" as const,color:"#C9A84C",marginBottom:16,display:"block"},
  card: {background:"#1A1610",border:"1px solid #2E2820",padding:20} as React.CSSProperties,
  btnGold: {background:"linear-gradient(135deg,#C9A84C,#E8C97A,#C9A84C)",color:"#0A0803",border:"none",padding:"11px 24px",fontFamily:"Inter,sans-serif",fontSize:13,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase" as const,cursor:"pointer"} as React.CSSProperties,
  btnGhost: {background:"transparent",border:"1px solid #3A3228",color:"#9A8660",padding:"11px 20px",fontFamily:"Inter,sans-serif",fontSize:13,cursor:"pointer"} as React.CSSProperties,
  btnDel: {background:"transparent",border:"1px solid #3A3228",color:"#5A4E38",padding:"8px 16px",fontFamily:"Inter,sans-serif",fontSize:12,cursor:"pointer",transition:"all .2s"} as React.CSSProperties,
};

// ─── API helpers ────────────────────────────────────────────────────────────
async function api(path: string, method="GET", body?: unknown) {
  const res = await fetch(`/api/${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  return res.json();
}

// ─── Sub-components ─────────────────────────────────────────────────────────
function Toast({ msg }: { msg: string }) {
  if (!msg) return null;
  return <div style={{position:"fixed",top:20,right:20,zIndex:999,background:"#1A1610",border:"1px solid rgba(201,168,76,.5)",color:"#C9A84C",padding:"12px 20px",fontFamily:"Inter,sans-serif",fontSize:14,boxShadow:"0 4px 20px rgba(0,0,0,.5)"}}>✓ {msg}</div>;
}

function Confirm({ msg, onYes, onNo }: { msg:string; onYes:()=>void; onNo:()=>void }) {
  return (
    <div style={{position:"fixed",inset:0,zIndex:200,background:"rgba(0,0,0,0.85)",display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
      <div style={{background:"#1A1610",border:"1px solid #3A3228",padding:32,maxWidth:360,width:"100%",textAlign:"center"}}>
        <div style={{fontSize:32,marginBottom:12}}>⚠️</div>
        <p style={{fontFamily:"Inter,sans-serif",fontSize:15,color:"#9A8660",marginBottom:24,lineHeight:1.6}}>{msg}</p>
        <div style={{display:"flex",gap:12}}>
          <button onClick={onYes} style={{flex:1,background:"transparent",border:"1px solid rgba(239,68,68,.5)",color:"#f87171",padding:"11px",fontFamily:"Inter,sans-serif",fontSize:13,cursor:"pointer"}}>Delete</button>
          <button onClick={onNo} style={{flex:1,...S.btnGhost}}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

function ImageUpload({ value, onChange, size=80 }: { value:string; onChange:(u:string)=>void; size?:number }) {
  const ref = useRef<HTMLInputElement>(null);
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return;
    const r = new FileReader(); r.onload = ev => onChange(ev.target?.result as string); r.readAsDataURL(f);
  };
  return (
    <div style={{width:size,height:size,border:"1px dashed #3A3228",cursor:"pointer",overflow:"hidden",background:"#0D0B07",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center"}} onClick={()=>ref.current?.click()}>
      {value ? <img src={value} alt="preview" style={{width:"100%",height:"100%",objectFit:"cover"}}/> : (
        <div style={{textAlign:"center",padding:8}}><div style={{fontSize:20,marginBottom:3}}>📷</div><span style={{fontFamily:"Inter,sans-serif",fontSize:9,color:"#5A4E38",textTransform:"uppercase",letterSpacing:"0.1em"}}>Add Photo</span></div>
      )}
      <input ref={ref} type="file" accept="image/*" onChange={handleFile} style={{display:"none"}}/>
    </div>
  );
}

function Toggle({ value, onChange, labelOn="Active", labelOff="Hidden" }: { value:boolean; onChange:(v:boolean)=>void; labelOn?:string; labelOff?:string }) {
  return (
    <label style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer"}}>
      <div onClick={()=>onChange(!value)} style={{width:44,height:24,borderRadius:12,background:value?"#C9A84C":"#2E2820",position:"relative",transition:"background .2s",cursor:"pointer",flexShrink:0}}>
        <div style={{position:"absolute",top:2,left:value?22:2,width:20,height:20,borderRadius:"50%",background:"white",transition:"left .2s"}}/>
      </div>
      <span style={{fontFamily:"Inter,sans-serif",fontSize:14,color:value?"#C9A84C":"#5A4E38"}}>{value?labelOn:labelOff}</span>
    </label>
  );
}

// ─── Gallery Admin ────────────────────────────────────────────────────────────
interface GalleryImg { id:number; src:string; alt:string; caption:string; w:number; h:number; }

function GalleryAdmin({ showToast }: { showToast:(m:string)=>void }) {
  const [imgs, setImgs] = useState<GalleryImg[]>(() => {
    try { const s = localStorage.getItem("arabesque_gallery"); return s ? JSON.parse(s) : []; } catch { return []; }
  });

  const save = (next: GalleryImg[]) => {
    setImgs(next);
    try {
      localStorage.setItem("arabesque_gallery", JSON.stringify(next));
      window.dispatchEvent(new Event("arabesque:gallery:update"));
    } catch {}
    showToast("Gallery updated!");
  };

  const addImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return;
    const r = new FileReader();
    r.onload = ev => {
      save([...imgs, { id:Date.now(), src:ev.target?.result as string, alt:f.name, caption:f.name.replace(/\.[^/.]+$/,"").replace(/-|_/g," "), w:1200, h:800 }]);
    };
    r.readAsDataURL(f);
  };

  return (
    <div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8,flexWrap:"wrap",gap:12}}>
        <div>
          <h1 style={{fontFamily:"Cormorant Garamond,Georgia,serif",fontSize:34,color:"#E8C97A",fontWeight:400,marginBottom:4}}>Gallery</h1>
          <p style={{fontFamily:"Inter,sans-serif",fontSize:13,color:"#5A4E38"}}>Photos appear instantly on the website gallery.</p>
        </div>
        <label style={{background:"linear-gradient(135deg,#C9A84C,#E8C97A,#C9A84C)",color:"#0A0803",border:"none",padding:"11px 24px",fontFamily:"Inter,sans-serif",fontSize:13,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",cursor:"pointer",display:"inline-flex",alignItems:"center",gap:8}}>
          + Add Photo <input type="file" accept="image/*" onChange={addImg} style={{display:"none"}}/>
        </label>
      </div>
      <div style={{background:"rgba(201,168,76,.05)",border:"1px solid rgba(201,168,76,.15)",padding:14,marginBottom:20,marginTop:12}}>
        <p style={{fontFamily:"Inter,sans-serif",fontSize:12,color:"#9A8660",lineHeight:1.7}}>
          <strong style={{color:"#C9A84C"}}>Default images</strong> always show. Photos you add here appear after them instantly.
        </p>
      </div>
      {imgs.length === 0 ? (
        <div style={{textAlign:"center",padding:"60px 0",border:"1px dashed #2E2820"}}>
          <div style={{fontSize:40,marginBottom:12}}>🖼️</div>
          <p style={{fontFamily:"Inter,sans-serif",fontSize:14,color:"#5A4E38"}}>No extra photos yet. Click &ldquo;+ Add Photo&rdquo; to upload.</p>
        </div>
      ) : (
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(min(100%,220px),1fr))",gap:14}}>
          {imgs.map(img => (
            <div key={img.id} style={{background:"#1A1610",border:"1px solid #2E2820",overflow:"hidden"}}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.src} alt={img.alt} style={{width:"100%",aspectRatio:"16/9",objectFit:"cover",display:"block"}}/>
              <div style={{padding:"10px 12px"}}>
                <input type="text" value={img.caption}
                  onChange={e => save(imgs.map(x => x.id===img.id ? {...x,caption:e.target.value} : x))}
                  style={{width:"100%",background:"#0D0B07",border:"1px solid #3A3228",color:"#E8C97A",padding:"8px 10px",fontFamily:"Inter,sans-serif",fontSize:13,outline:"none",marginBottom:8}}
                  placeholder="Caption..."/>
                <button onClick={() => save(imgs.filter(x => x.id!==img.id))}
                  style={{background:"transparent",border:"1px solid #3A3228",color:"#5A4E38",padding:"8px",fontFamily:"Inter,sans-serif",fontSize:12,cursor:"pointer",width:"100%"}}
                  onMouseOver={e=>{e.currentTarget.style.borderColor="rgba(239,68,68,.4)";e.currentTarget.style.color="#f87171";}}
                  onMouseOut={e=>{e.currentTarget.style.borderColor="#3A3228";e.currentTarget.style.color="#5A4E38";}}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Login ──────────────────────────────────────────────────────────────────
function Login({ onLogin }: { onLogin:()=>void }) {
  const [pw,setPw]=useState(""); const [err,setErr]=useState(""); const [loading,setLoading]=useState(false);
  const go = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pw }),
      });
      const data = await res.json();
      if (data.ok) { onLogin(); } else { setErr("Incorrect password."); }
    } catch { setErr("Connection error. Please try again."); }
    setLoading(false);
  };
  return (
    <div suppressHydrationWarning style={{minHeight:"100vh",background:"#060503",display:"flex",alignItems:"center",justifyContent:"center",padding:24}}>
      <div style={{width:"100%",maxWidth:380}}>
        <div style={{textAlign:"center",marginBottom:32}}>
          <svg suppressHydrationWarning viewBox="0 0 100 100" style={{width:"52px",height:"52px",margin:"0 auto 14px"}}>
            <circle cx="50" cy="50" r="46" fill="none" stroke="#C9A84C" strokeWidth="1.5"/>
            <circle cx="50" cy="50" r="36" fill="none" stroke="#C9A84C" strokeWidth=".7" strokeDasharray="4 3"/>
            {[0,60,120,180,240,300].map((d,i)=><line key={i} x1="50" y1="14" x2="50" y2="26" stroke="#C9A84C" strokeWidth="1.5" transform={`rotate(${d} 50 50)`}/>)}
            <text x="50" y="58" textAnchor="middle" fontFamily="Cinzel,serif" fontSize="22" fontWeight="600" fill="#C9A84C">A</text>
          </svg>
          <h1 style={{fontFamily:"Cormorant Garamond,Georgia,serif",fontSize:26,color:"#E8C97A",fontWeight:400}}>Arabesque by Mimo</h1>
          <p style={{fontFamily:"Inter,sans-serif",fontSize:11,color:"#5A4E38",letterSpacing:"0.2em",textTransform:"uppercase",marginTop:4}}>لوحة التحكم</p>
        </div>
        <form onSubmit={go} style={{background:"#1A1610",border:"1px solid #2E2820",padding:28,display:"flex",flexDirection:"column",gap:16}}>
          <div><label style={S.lbl}>كلمة المرور / Password</label>
            <input style={S.inp} type="password" value={pw} onChange={e=>{setPw(e.target.value);setErr("");}} required autoFocus placeholder="أدخل كلمة المرور" autoComplete="current-password"/>
          </div>
          {err&&<p style={{color:"#f87171",fontFamily:"Inter,sans-serif",fontSize:13}}>{err}</p>}
          <button type="submit" disabled={loading} style={{...S.btnGold,width:"100%",padding:"13px"}}>{loading?"جاري الدخول...":"دخول"}</button>
        </form>
        <div style={{textAlign:"center",marginTop:16}}><Link href="/" style={{fontFamily:"Inter,sans-serif",fontSize:12,color:"#5A4E38",textDecoration:"none"}}>← Back to website</Link></div>
      </div>
    </div>
  );
}

// ─── Item Modal ─────────────────────────────────────────────────────────────
function ItemModal({ item, cats, onSave, onClose }: { item:MenuItem|null; cats:Category[]; onSave:(i:MenuItem)=>void; onClose:()=>void }) {
  const blank: MenuItem = {id:"",name:"",nameAr:"",description:"",price:0,comboPrice:null,category:"classics",isVegetarian:false,isFeatured:false,spiceLevel:0,note:"",image:"",isAvailable:true};
  const [f,setF]=useState<MenuItem>(item??blank);
  const set=(k:keyof MenuItem,v:unknown)=>setF(p=>({...p,[k]:v}));
  return (
    <div style={{position:"fixed",inset:0,zIndex:100,background:"rgba(0,0,0,0.87)",display:"flex",alignItems:"center",justifyContent:"center",padding:16}} onClick={onClose}>
      <div style={{background:"#1A1610",border:"1px solid #3A3228",width:"100%",maxWidth:640,maxHeight:"92vh",overflowY:"auto",display:"flex",flexDirection:"column"}} onClick={e=>e.stopPropagation()}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"18px 24px",borderBottom:"1px solid #2E2820"}}>
          <h2 style={{fontFamily:"Cormorant Garamond,Georgia,serif",fontSize:22,color:"#E8C97A",fontWeight:400}}>{item?.id?"Edit Item":"Add New Item"}</h2>
          <button onClick={onClose} style={{background:"none",border:"1px solid #3A3228",color:"#9A8660",width:"34px",height:"34px",fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>×</button>
        </div>
        <div style={{padding:24,display:"flex",flexDirection:"column",gap:18,flex:1}}>
          <div style={{display:"flex",gap:16,alignItems:"flex-start"}}>
            <ImageUpload value={f.image} onChange={v=>set("image",v)}/>
            <div style={{flex:1}}><label style={S.lbl}>Item Name</label><input style={S.inp} type="text" value={f.name} onChange={e=>set("name",e.target.value)} placeholder="e.g. Beef Shawarma"/></div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
            <div><label style={S.lbl}>Arabic Name</label><input style={S.inp} type="text" value={f.nameAr} onChange={e=>set("nameAr",e.target.value)} placeholder="الاسم بالعربي" dir="rtl"/></div>
            <div><label style={S.lbl}>Category</label>
              <select style={{...S.inp,cursor:"pointer"}} value={f.category} onChange={e=>set("category",e.target.value)}>
                {cats.map(c=><option key={c.slug} value={c.slug} style={{background:"#0D0B07"}}>{c.icon} {c.name}</option>)}
              </select>
            </div>
          </div>
          <div><label style={S.lbl}>Description</label><textarea style={{...S.inp,resize:"vertical"}} value={f.description} onChange={e=>set("description",e.target.value)} rows={3}/></div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:16}}>
            <div><label style={S.lbl}>Price ($)</label><input style={S.inp} type="number" step="0.01" min="0" value={f.price} onChange={e=>set("price",parseFloat(e.target.value)||0)}/></div>
            <div><label style={S.lbl}>Combo Price ($)</label><input style={S.inp} type="number" step="0.01" min="0" value={f.comboPrice??""} onChange={e=>set("comboPrice",e.target.value?parseFloat(e.target.value):null)} placeholder="Optional"/></div>
            <div><label style={S.lbl}>Spice Level</label>
              <select style={{...S.inp,cursor:"pointer"}} value={f.spiceLevel} onChange={e=>set("spiceLevel",parseInt(e.target.value))}>
                {[["0","None"],["1","Mild 🌶"],["2","Medium 🌶🌶"],["3","Hot 🌶🌶🌶"]].map(([v,l])=><option key={v} value={v} style={{background:"#0D0B07"}}>{l}</option>)}
              </select>
            </div>
          </div>
          <div><label style={S.lbl}>Note / Add-ons</label><input style={S.inp} type="text" value={f.note} onChange={e=>set("note",e.target.value)} placeholder="e.g. Add cheese +$2"/></div>
          <div style={{background:"#0D0B07",border:"1px solid #2E2820",padding:16,display:"flex",flexDirection:"column",gap:14}}>
            <p style={{fontFamily:"Cinzel,serif",fontSize:11,color:"#C9A84C",letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:4}}>Item Flags</p>
            <div style={{display:"flex",gap:24,flexWrap:"wrap"}}>
              <div><Toggle value={f.isVegetarian} onChange={v=>set("isVegetarian",v)} labelOn="Vegetarian ✓" labelOff="Not Vegetarian"/><p style={{fontFamily:"Inter,sans-serif",fontSize:11,color:"#3A3228",marginTop:4}}>Shows green dot on card</p></div>
              <div><Toggle value={f.isFeatured} onChange={v=>set("isFeatured",v)} labelOn="Featured ★" labelOff="Not Featured"/><p style={{fontFamily:"Inter,sans-serif",fontSize:11,color:"#3A3228",marginTop:4}}>Appears in Chef&apos;s Selection on homepage</p></div>
              <div><Toggle value={f.isAvailable} onChange={v=>set("isAvailable",v)} labelOn="Available" labelOff="Unavailable"/><p style={{fontFamily:"Inter,sans-serif",fontSize:11,color:"#3A3228",marginTop:4}}>Unavailable items hidden from customers</p></div>
            </div>
          </div>
        </div>
        <div style={{display:"flex",gap:12,padding:"16px 24px",borderTop:"1px solid #2E2820"}}>
          <button onClick={()=>{if(!f.name.trim())return;onSave({...f,id:f.id||`item_${Date.now()}`});}} style={{...S.btnGold,flex:1,padding:"13px"}}>{item?.id?"Save Changes":"Add Item"}</button>
          <button onClick={onClose} style={S.btnGhost}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

// ─── Offer Modal ────────────────────────────────────────────────────────────
function OfferModal({ offer, onSave, onClose }: { offer:MenuOffer|null; onSave:(o:MenuOffer)=>void; onClose:()=>void }) {
  const blank: MenuOffer = {id:"",title:"",description:"",original_price:0,offer_price:0,image:"",badge:"SPECIAL",badge_color:"gold",expires_at:"",is_active:true};
  const [f,setF]=useState<MenuOffer>(offer??blank);
  const set=(k:keyof MenuOffer,v:unknown)=>setF(p=>({...p,[k]:v}));
  const pct=f.original_price>0&&f.offer_price>0?Math.round((1-f.offer_price/f.original_price)*100):0;
  return (
    <div style={{position:"fixed",inset:0,zIndex:100,background:"rgba(0,0,0,0.87)",display:"flex",alignItems:"center",justifyContent:"center",padding:16}} onClick={onClose}>
      <div style={{background:"#1A1610",border:"1px solid #3A3228",width:"100%",maxWidth:600,maxHeight:"92vh",overflowY:"auto",display:"flex",flexDirection:"column"}} onClick={e=>e.stopPropagation()}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"18px 24px",borderBottom:"1px solid #2E2820"}}>
          <h2 style={{fontFamily:"Cormorant Garamond,Georgia,serif",fontSize:22,color:"#E8C97A",fontWeight:400}}>{offer?.id?"Edit Offer":"Add Offer"}</h2>
          <button onClick={onClose} style={{background:"none",border:"1px solid #3A3228",color:"#9A8660",width:"34px",height:"34px",fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>×</button>
        </div>
        <div style={{padding:24,display:"flex",flexDirection:"column",gap:16,flex:1}}>
          <div style={{display:"flex",gap:16,alignItems:"flex-start"}}>
            <ImageUpload value={f.image} onChange={v=>set("image",v)} size={90}/>
            <div style={{flex:1}}><label style={S.lbl}>Offer Title</label><input style={S.inp} type="text" value={f.title} onChange={e=>set("title",e.target.value)} placeholder="e.g. Combo Deal"/></div>
          </div>
          <div><label style={S.lbl}>Description</label><textarea style={{...S.inp,resize:"vertical"}} value={f.description} onChange={e=>set("description",e.target.value)} rows={2}/></div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14}}>
            <div><label style={S.lbl}>Original Price ($)</label><input style={S.inp} type="number" step="0.01" min="0" value={f.original_price||""} onChange={e=>set("original_price",parseFloat(e.target.value)||0)}/></div>
            <div><label style={S.lbl}>Offer Price ($)</label><input style={{...S.inp,color:"#C9A84C"}} type="number" step="0.01" min="0" value={f.offer_price||""} onChange={e=>set("offer_price",parseFloat(e.target.value)||0)}/></div>
            <div style={{display:"flex",flexDirection:"column",justifyContent:"flex-end"}}>
              {pct>0?<div style={{background:"rgba(34,197,94,.1)",border:"1px solid rgba(34,197,94,.3)",padding:"10px",textAlign:"center"}}><p style={{fontFamily:"Cinzel,serif",fontSize:20,color:"#86efac"}}>-{pct}%</p></div>:<div style={{background:"#0D0B07",border:"1px solid #2E2820",padding:"10px",textAlign:"center"}}><p style={{fontFamily:"Inter,sans-serif",fontSize:11,color:"#3A3228"}}>Set both prices</p></div>}
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
            <div><label style={S.lbl}>Badge Text</label><input style={{...S.inp,fontFamily:"Cinzel,serif",letterSpacing:"0.1em"}} type="text" value={f.badge} onChange={e=>set("badge",e.target.value.toUpperCase())} placeholder="20% OFF"/></div>
            <div><label style={S.lbl}>Badge Color</label>
              <select style={{...S.inp,cursor:"pointer"}} value={f.badge_color} onChange={e=>set("badge_color",e.target.value)}>
                <option value="gold" style={{background:"#0D0B07"}}>🟡 Gold</option>
                <option value="red"  style={{background:"#0D0B07"}}>🔴 Red</option>
                <option value="green"style={{background:"#0D0B07"}}>🟢 Green</option>
              </select>
            </div>
          </div>
          <div><label style={S.lbl}>Expiry Date (optional)</label><input style={S.inp} type="date" value={f.expires_at} onChange={e=>set("expires_at",e.target.value)}/></div>
          <Toggle value={f.is_active} onChange={v=>set("is_active",v)} labelOn="Visible on website" labelOff="Hidden from website"/>
        </div>
        <div style={{display:"flex",gap:12,padding:"16px 24px",borderTop:"1px solid #2E2820"}}>
          <button onClick={()=>{if(!f.title)return;onSave({...f,id:f.id||`offer_${Date.now()}`});}} style={{...S.btnGold,flex:1,padding:"13px"}}>{offer?.id?"Save Changes":"Add Offer"}</button>
          <button onClick={onClose} style={S.btnGhost}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN ───────────────────────────────────────────────────────────────────
export default function Admin() {
  const [authed,setAuthed]=useState(false);
  const [checkingSession,setCheckingSession]=useState(true);
  const [tab,setTab]=useState<Tab>("overview");

  // Check existing session on mount (cookie-based)
  useEffect(()=>{
    fetch("/api/auth/check").then(r=>r.json()).then(d=>{
      if(d.authenticated) setAuthed(true);
    }).catch(()=>{}).finally(()=>setCheckingSession(false));
  },[]);

  const [items,setItems]=useState<MenuItem[]>(SEED_ITEMS);
  const [cats] = useState<Category[]>(SEED_CATS);
  const [reviews,setReviews]=useState<Review[]>([]);
  const [offers,setOffers]=useState<MenuOffer[]>([]);
  const [orderLinks,setOrderLinks]=useState<OrderLink[]>(DEFAULT_LINKS);
  const [settings,setSettings]=useState<Settings>(DEFAULT_SETTINGS);
  const [loading,setLoading]=useState(false);
  const [editItem,setEditItem]=useState<MenuItem|null|"new">(null);
  const [editOffer,setEditOffer]=useState<MenuOffer|null|"new">(null);
  const [delTarget,setDelTarget]=useState<{type:string;id:string|number;name:string}|null>(null);
  const [toast,setToast]=useState("");
  const [catFilter,setCatFilter]=useState("all");
  const [search,setSearch]=useState("");

  const showToast=useCallback((m:string)=>{setToast(m);setTimeout(()=>setToast(""),2500);},[]);

  // Load data from Supabase on login
  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      // Load reviews
      const rv = await api("reviews");
      if (rv.reviews) setReviews(rv.reviews.map((r: Review & {name?:string}) => ({
        id: r.id, name: r.name, rating: r.rating, text: r.text,
        date: r.created_at ? new Date(r.created_at).toLocaleDateString() : "",
        approved: r.approved, featured: r.featured
      })));

      // Load order links
      const ol = await api("order-links");
      if (ol.links && ol.links.length > 0) setOrderLinks(ol.links);

      // Load offers
      const of = await api("menu-offers");
      if (of.offers) setOffers(of.offers);

      // Load settings
      const st = await api("settings");
      if (st && Object.keys(st).length > 0) {
        setSettings(prev => ({ ...prev, ...st }));
      }

      // Load menu items (custom overrides)
      const mi = await api("menu-items");
      if (mi.items && mi.items.length > 0) {
        setItems(prev => {
          const map = new Map(prev.map(i => [i.id, i]));
          mi.items.forEach((item: MenuItem) => map.set(item.id, item));
          return Array.from(map.values());
        });
      }
    } catch {
      // Supabase not connected yet — use seed data
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (authed) {
      const id = setTimeout(() => loadData(), 0);
      return () => clearTimeout(id);
    }
  }, [authed, loadData]);

  if(checkingSession) return <div style={{minHeight:"100vh",background:"#060503",display:"flex",alignItems:"center",justifyContent:"center"}}><div style={{fontFamily:"Cinzel,serif",color:"#C9A84C",fontSize:14,letterSpacing:"0.2em"}}>ARABESQUE</div></div>;

  // ── Save handlers ──
  const saveItem = async (item: MenuItem) => {
    setItems(p => p.some(i=>i.id===item.id) ? p.map(i=>i.id===item.id?item:i) : [...p,item]);
    setEditItem(null);
    try { await api("menu-items","POST",item); } catch {}
    showToast(item.id ? "Item updated!" : "Item added!");
  };

  const saveReview = async (id: string|number, updates: Partial<Review>) => {
    setReviews(p => p.map(r => r.id===id ? {...r,...updates} : r));
    try { await api("reviews","PATCH",{id,...updates}); } catch {}
    showToast("Review updated!");
  };

  const deleteReview = async (id: string|number) => {
    setReviews(p => p.filter(r => r.id!==id));
    setDelTarget(null);
    try { await api("reviews","DELETE",{id}); } catch {}
    showToast("Review deleted.");
  };

  const saveOrderLink = async (link: OrderLink) => {
    setOrderLinks(p => p.some(l=>l.id===link.id) ? p.map(l=>l.id===link.id?link:l) : [...p,link]);
    try {
      if (link.id.startsWith("o_") || link.id.startsWith("o1") || link.id.startsWith("o2")) {
        await api("order-links","POST",link);
      } else {
        await api("order-links","PATCH",link);
      }
    } catch {}
    showToast("Order link saved!");
  };

  const deleteOrderLink = async (id: string) => {
    setOrderLinks(p => p.filter(l => l.id!==id));
    setDelTarget(null);
    try { await api("order-links","DELETE",{id}); } catch {}
    showToast("Link deleted.");
  };

  const saveOffer = async (offer: MenuOffer) => {
    setOffers(p => p.some(o=>o.id===offer.id) ? p.map(o=>o.id===offer.id?offer:o) : [...p,offer]);
    setEditOffer(null);
    try {
      if (offer.id.startsWith("offer_")) { await api("menu-offers","POST",offer); }
      else { await api("menu-offers","PATCH",offer); }
    } catch {}
    showToast("Offer saved!");
  };

  const deleteOffer = async (id: string) => {
    setOffers(p => p.filter(o => o.id!==id));
    setDelTarget(null);
    try { await api("menu-offers","DELETE",{id}); } catch {}
    showToast("Offer deleted.");
  };

  const saveSettings = async () => {
    try { await api("settings","POST",settings); } catch {}
    showToast("Settings saved!");
  };

  // submitReview is called from ReviewsSection via API directly

  const confirmDel = () => {
    if (!delTarget) return;
    const { type, id } = delTarget;
    if (type==="review")  deleteReview(id);
    if (type==="offer")   deleteOffer(id as string);
    if (type==="order")   deleteOrderLink(id as string);
    if (type==="item")    { setItems(p=>p.filter(i=>i.id!==id)); setDelTarget(null); showToast("Item deleted."); }
  };

  const filtered = items.filter(i => {
    const mc = catFilter==="all" || i.category===catFilter;
    const ms = !search || i.name.toLowerCase().includes(search.toLowerCase());
    return mc && ms;
  });

  if (!authed) return <Login onLogin={()=>setAuthed(true)}/>;

  const TABS = [
    {id:"overview" as Tab,   label:"Overview",    icon:"📊"},
    {id:"menu" as Tab,       label:"Menu Items",  icon:"🥙"},
    {id:"photos" as Tab,     label:"Dish Photos",  icon:"📸"},
    {id:"gallery" as Tab,    label:"Gallery",      icon:"🖼️"},
    {id:"menu-offers" as Tab,label:"Menu Offers", icon:"🏷️"},
    {id:"reviews" as Tab,    label:"Reviews",     icon:"⭐"},
    {id:"orders" as Tab,     label:"Order Links", icon:"🛒"},
    {id:"settings" as Tab,   label:"Settings",    icon:"⚙️"},
  ];

  return (
    <div suppressHydrationWarning style={{display:"flex",minHeight:"100vh",background:"#060503",fontFamily:"Inter,sans-serif"}}>
      <Toast msg={toast}/>

      {/* Sidebar */}
      <aside style={{width:220,flexShrink:0,background:"#0A0803",borderRight:"1px solid #1A1610",display:"flex",flexDirection:"column",position:"fixed",height:"100vh",zIndex:50}}>
        <div style={{padding:"22px 18px",borderBottom:"1px solid #1A1610",display:"flex",alignItems:"center",gap:10}}>
          <svg suppressHydrationWarning viewBox="0 0 100 100" style={{width:"34px",height:"34px",flexShrink:0}}>
            <circle cx="50" cy="50" r="46" fill="none" stroke="#C9A84C" strokeWidth="1.5"/>
            <circle cx="50" cy="50" r="36" fill="none" stroke="#C9A84C" strokeWidth=".7" strokeDasharray="4 3"/>
            {[0,60,120,180,240,300].map((d,i)=><line key={i} x1="50" y1="14" x2="50" y2="26" stroke="#C9A84C" strokeWidth="1.5" transform={`rotate(${d} 50 50)`}/>)}
            <text x="50" y="57" textAnchor="middle" fontFamily="Cinzel,serif" fontSize="22" fontWeight="600" fill="#C9A84C">A</text>
          </svg>
          <div>
            <div style={{fontFamily:"Cormorant Garamond,Georgia,serif",fontSize:17,color:"#E8C97A",lineHeight:1}}>Arabesque</div>
            <div style={{fontFamily:"Inter,sans-serif",fontSize:9,color:"#5A4E38",letterSpacing:"0.2em",textTransform:"uppercase",marginTop:2}}>Admin Panel</div>
          </div>
        </div>
        <nav style={{flex:1,padding:"10px 8px",overflowY:"auto"}}>
          {TABS.map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)} style={{width:"100%",display:"flex",alignItems:"center",gap:10,padding:"11px 12px",marginBottom:1,background:tab===t.id?"rgba(201,168,76,.1)":"transparent",border:tab===t.id?"1px solid rgba(201,168,76,.2)":"1px solid transparent",color:tab===t.id?"#E8C97A":"#5A4E38",fontFamily:"Inter,sans-serif",fontSize:14,cursor:"pointer",textAlign:"left",transition:"all .2s"}}>
              <span style={{fontSize:16}}>{t.icon}</span>{t.label}
            </button>
          ))}
        </nav>
        <div style={{padding:"10px 8px",borderTop:"1px solid #1A1610"}}>
          <button onClick={loadData} style={{width:"100%",display:"flex",alignItems:"center",gap:8,padding:"10px 12px",color:"#5A4E38",background:"none",border:"none",fontFamily:"Inter,sans-serif",fontSize:13,cursor:"pointer",textAlign:"left"}}>
            🔄 {loading?"Loading...":"Refresh Data"}
          </button>
          <Link href="/" style={{display:"flex",alignItems:"center",gap:8,padding:"10px 12px",color:"#3A3228",fontFamily:"Inter,sans-serif",fontSize:13,textDecoration:"none"}}>← View Site</Link>
          <button onClick={async()=>{ await fetch("/api/auth/logout",{method:"POST"}); setAuthed(false); }} style={{width:"100%",display:"flex",alignItems:"center",gap:8,padding:"10px 12px",color:"#3A3228",background:"none",border:"none",fontFamily:"Inter,sans-serif",fontSize:13,cursor:"pointer",textAlign:"left"}}>🚪 Sign Out</button>
        </div>
      </aside>

      {/* Main */}
      <main style={{marginLeft:220,flex:1,overflowX:"hidden"}}>
        <div style={{maxWidth:1080,margin:"0 auto",padding:"36px 28px"}}>

          {/* ══ OVERVIEW ══ */}
          {tab==="overview" && (
            <div>
              <h1 style={S.head1}>Dashboard</h1>
              <p style={{...S.sub,marginBottom:6}}>Welcome back, Mimo.</p>
              {loading && <p style={{fontFamily:"Inter,sans-serif",fontSize:12,color:"#C9A84C",marginBottom:16}}>⟳ Loading data from Supabase...</p>}
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(190px,1fr))",gap:14,marginBottom:28}}>
                {[
                  {label:"Menu Items",val:items.length,sub:`${items.filter(i=>i.isAvailable).length} available`,icon:"🥙"},
                  {label:"Pending Reviews",val:reviews.filter(r=>!r.approved).length,sub:`${reviews.filter(r=>r.approved).length} approved`,icon:"⭐"},
                  {label:"Active Offers",val:offers.filter(o=>o.is_active).length,sub:"In menu",icon:"🏷️"},
                  {label:"Order Links",val:orderLinks.filter(o=>o.is_active).length,sub:"Active",icon:"🛒"},
                ].map(s=>(
                  <div key={s.label} style={{...S.card,position:"relative",overflow:"hidden"}}>
                    <div style={{height:1,background:"linear-gradient(90deg,transparent,rgba(201,168,76,.3),transparent)",position:"absolute",top:0,left:0,right:0}}/>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                      <div>
                        <p style={{fontFamily:"Inter,sans-serif",fontSize:11,color:"#5A4E38",letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:5}}>{s.label}</p>
                        <p style={{fontFamily:"Cinzel,serif",fontSize:30,color:"#C9A84C",fontWeight:600,lineHeight:1}}>{s.val}</p>
                        <p style={{fontFamily:"Inter,sans-serif",fontSize:11,color:"#3A3228",marginTop:3}}>{s.sub}</p>
                      </div>
                      <span style={{fontSize:26,opacity:.5}}>{s.icon}</span>
                    </div>
                  </div>
                ))}
              </div>
              <span style={S.catTitle}>Quick Actions</span>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:10}}>
                {[
                  {label:"Add Menu Item",icon:"➕",go:()=>{setEditItem("new");setTab("menu")}},
                  {label:"Add Offer",icon:"🏷️",go:()=>{setEditOffer("new");setTab("menu-offers")}},
                  {label:"Review Pending",icon:"✅",go:()=>setTab("reviews")},
                  {label:"Add Order Link",icon:"🔗",go:()=>setTab("orders")},
                  {label:"Refresh Data",icon:"🔄",go:loadData},
                  {label:"View Website",icon:"🌐",go:()=>window.open("/","_blank")},
                ].map(a=>(
                  <button key={a.label} onClick={a.go} style={{...S.card,border:"1px solid #2E2820",cursor:"pointer",textAlign:"left",transition:"border-color .2s"}}
                    onMouseOver={e=>(e.currentTarget.style.borderColor="rgba(201,168,76,.3)")}
                    onMouseOut={e=>(e.currentTarget.style.borderColor="#2E2820")}>
                    <span style={{display:"block",fontSize:20,marginBottom:7}}>{a.icon}</span>
                    <span style={{fontFamily:"Inter,sans-serif",fontSize:13,color:"#9A8660"}}>{a.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ══ MENU ITEMS ══ */}
          {tab==="menu" && (
            <div>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:6,flexWrap:"wrap",gap:12}}>
                <div><h1 style={S.head1}>Menu Items</h1><p style={S.sub}>{items.length} items · {cats.length} categories</p></div>
                <button onClick={()=>setEditItem("new")} style={S.btnGold}>+ Add Item</button>
              </div>
              <div style={{display:"flex",gap:10,marginBottom:18,flexWrap:"wrap",marginTop:16}}>
                <input type="text" value={search} onChange={e=>setSearch(e.target.value)} style={{...S.inp,width:200,fontSize:13}} placeholder="Search items..."/>
                <select value={catFilter} onChange={e=>setCatFilter(e.target.value)} style={{...S.inp,width:"auto",cursor:"pointer",fontSize:13}}>
                  <option value="all" style={{background:"#0D0B07"}}>All Categories</option>
                  {cats.map(c=><option key={c.slug} value={c.slug} style={{background:"#0D0B07"}}>{c.icon} {c.name}</option>)}
                </select>
              </div>
              <div style={{background:"#1A1610",border:"1px solid #2E2820",overflow:"hidden"}}>
                <table style={{width:"100%",borderCollapse:"collapse"}}>
                  <thead><tr style={{borderBottom:"1px solid #2E2820"}}>
                    {["Item","Category","Price","Flags","Actions"].map(h=>(
                      <th key={h} style={{padding:"13px 16px",textAlign:"left",fontFamily:"Inter,sans-serif",fontSize:11,letterSpacing:"0.15em",textTransform:"uppercase",color:"#5A4E38",fontWeight:400}}>{h}</th>
                    ))}
                  </tr></thead>
                  <tbody>
                    {filtered.map(item=>(
                      <tr key={item.id} style={{borderBottom:"1px solid #2E2820",opacity:item.isAvailable?1:0.45,transition:"background .2s"}}
                        onMouseOver={e=>(e.currentTarget.style.background="rgba(255,255,255,.02)")}
                        onMouseOut={e=>(e.currentTarget.style.background="transparent")}>
                        <td style={{padding:"13px 16px"}}>
                          <div style={{display:"flex",alignItems:"center",gap:11}}>
                            {item.image
                              /* eslint-disable-next-line @next/next/no-img-element */
                              ? <img src={item.image} alt={item.name} style={{width:"36px",height:"36px",objectFit:"cover",border:"1px solid #2E2820",flexShrink:0}}/>
                              : <div style={{width:"36px",height:"36px",background:"#12100A",border:"1px solid #2E2820",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:16}}>{cats.find(c=>c.slug===item.category)?.icon||"🍽️"}</div>
                            }
                            <div>
                              <div style={{fontFamily:"Inter,sans-serif",fontSize:14,color:"#E8C97A"}}>{item.name}</div>
                              {item.nameAr&&<div style={{fontFamily:"Inter,sans-serif",fontSize:11,color:"#5A4E38"}} dir="rtl">{item.nameAr}</div>}
                            </div>
                          </div>
                        </td>
                        <td style={{padding:"13px 16px",fontFamily:"Inter,sans-serif",fontSize:13,color:"#5A4E38"}}>{cats.find(c=>c.slug===item.category)?.name||item.category}</td>
                        <td style={{padding:"13px 16px"}}>
                          <span style={{fontFamily:"Cinzel,serif",fontSize:15,color:"#C9A84C"}}>${item.price.toFixed(2)}</span>
                          {item.comboPrice&&<span style={{fontFamily:"Inter,sans-serif",fontSize:11,color:"#5A4E38",marginLeft:5}}>+${item.comboPrice.toFixed(2)}</span>}
                        </td>
                        <td style={{padding:"13px 16px"}}>
                          <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                            {item.isFeatured&&<span style={{fontFamily:"Inter,sans-serif",fontSize:10,border:"1px solid rgba(201,168,76,.3)",color:"rgba(201,168,76,.8)",padding:"2px 7px"}}>★ Featured</span>}
                            {item.isVegetarian&&<span style={{fontFamily:"Inter,sans-serif",fontSize:10,border:"1px solid rgba(34,197,94,.3)",color:"rgba(134,239,172,.8)",padding:"2px 7px"}}>Veg</span>}
                            {!item.isAvailable&&<span style={{fontFamily:"Inter,sans-serif",fontSize:10,border:"1px solid rgba(239,68,68,.3)",color:"rgba(248,113,113,.7)",padding:"2px 7px"}}>Off</span>}
                          </div>
                        </td>
                        <td style={{padding:"13px 16px"}}>
                          <div style={{display:"flex",gap:14}}>
                            <button onClick={()=>setEditItem(item)} style={{background:"none",border:"none",color:"#9A8660",fontFamily:"Inter,sans-serif",fontSize:13,cursor:"pointer",padding:0}}
                              onMouseOver={e=>(e.currentTarget.style.color="#C9A84C")} onMouseOut={e=>(e.currentTarget.style.color="#9A8660")}>Edit</button>
                            <button onClick={()=>setDelTarget({type:"item",id:item.id,name:item.name})} style={{background:"none",border:"none",color:"#5A4E38",fontFamily:"Inter,sans-serif",fontSize:13,cursor:"pointer",padding:0}}
                              onMouseOver={e=>(e.currentTarget.style.color="#f87171")} onMouseOut={e=>(e.currentTarget.style.color="#5A4E38")}>Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ══ DISH PHOTOS ══ */}
          {tab==="photos" && (
            <div>
              <h1 style={S.head1}>Dish Photos</h1>
              <p style={{...S.sub,marginBottom:20}}>Click any photo to upload a new one. Changes save to menu instantly.</p>
              {[
                {cat:"classics",label:"🥙 Signature Classics"},
                {cat:"plates",  label:"🍽️ Signature Plates"},
                {cat:"desserts",label:"🍮 Desserts"},
                {cat:"sides",   label:"🫙 Side Items"},
                {cat:"drinks",  label:"🥤 Drinks"},
              ].map(({cat,label})=>{
                const catItems=items.filter(i=>i.category===cat);
                return (
                  <div key={cat} style={{marginBottom:28}}>
                    <p style={S.catTitle}>{label}</p>
                    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(min(100%,180px),1fr))",gap:10}}>
                      {catItems.map(item=>(
                        <div key={item.id} style={{background:"#1A1610",border:"1px solid #2E2820",overflow:"hidden"}}>
                          <div style={{position:"relative",width:"100%",aspectRatio:"16/9",background:"#0D0B07",overflow:"hidden",cursor:"pointer"}}
                            onClick={()=>document.getElementById(`photo-${item.id}`)?.click()}>
                            {item.image
                              /* eslint-disable-next-line @next/next/no-img-element */
                              ? <img src={item.image} alt={item.name} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                              : <div style={{width:"100%",height:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:6,background:"#12100A"}}>
                                  <span style={{fontSize:28}}>📷</span>
                                  <span style={{fontFamily:"Inter,sans-serif",fontSize:9,color:"#3A3228",letterSpacing:"0.12em",textTransform:"uppercase"}}>Click to upload</span>
                                </div>
                            }
                            <input id={`photo-${item.id}`} type="file" accept="image/*" style={{display:"none"}}
                              onChange={e=>{
                                const f=e.target.files?.[0]; if(!f) return;
                                const r=new FileReader(); r.onload=async ev=>{
                                  const url=ev.target?.result as string;
                                  const updated={...item,image:url};
                                  setItems(p=>p.map(x=>x.id===item.id?updated:x));
                                  try { await api("menu-items","POST",updated); } catch {}
                                  showToast(`Photo updated for ${item.name}!`);
                                }; r.readAsDataURL(f);
                              }}
                            />
                          </div>
                          <div style={{padding:"8px 10px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:6}}>
                            <p style={{fontFamily:"Inter,sans-serif",fontSize:11,color:"#9A8660",flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{item.name}</p>
                            {item.image&&<button onClick={async()=>{
                              const updated={...item,image:""};
                              setItems(p=>p.map(x=>x.id===item.id?updated:x));
                              try { await api("menu-items","POST",updated); } catch {}
                              showToast("Photo removed.");
                            }} style={{background:"none",border:"none",color:"#5A4E38",fontSize:11,cursor:"pointer",fontFamily:"Inter,sans-serif",flexShrink:0,padding:0}}
                              onMouseOver={e=>(e.currentTarget.style.color="#f87171")}
                              onMouseOut={e=>(e.currentTarget.style.color="#5A4E38")}>✕</button>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* ══ GALLERY ══ */}
          {tab==="gallery" && <GalleryAdmin showToast={showToast}/>}

          {/* ══ MENU OFFERS ══ */}
          {tab==="menu-offers" && (
            <div>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8,flexWrap:"wrap",gap:12}}>
                <div><h1 style={S.head1}>Menu Offers</h1><p style={S.sub}>Appear as 🏷️ Offers tab. Saved to database permanently.</p></div>
                <button onClick={()=>setEditOffer("new")} style={S.btnGold}>+ Add Offer</button>
              </div>
              {offers.length===0
                ? <div style={{textAlign:"center",padding:"60px 0",border:"1px dashed #2E2820"}}><div style={{fontSize:40,marginBottom:12}}>🏷️</div><p style={S.sub}>No offers yet. Click &ldquo;+ Add Offer&rdquo;.</p></div>
                : <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(min(100%,320px),1fr))",gap:14}}>
                    {offers.map(o=>{
                      const pct=o.original_price>0?Math.round((1-o.offer_price/o.original_price)*100):0;
                      return (
                        <div key={o.id} style={{...S.card,border:`1px solid ${o.is_active?"rgba(201,168,76,.3)":"#2E2820"}`}}>
                          <div style={{display:"flex",gap:12,marginBottom:10}}>
                            {o.image
                              /* eslint-disable-next-line @next/next/no-img-element */
                              ? <img src={o.image} alt={o.title} style={{width:"56px",height:"56px",objectFit:"cover",flexShrink:0,border:"1px solid #2E2820"}}/>
                              : <div style={{width:"56px",height:"56px",background:"#12100A",border:"1px solid #2E2820",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:24}}>🏷️</div>
                            }
                            <div style={{flex:1}}>
                              <h3 style={{fontFamily:"Cormorant Garamond,Georgia,serif",fontSize:17,color:"#E8C97A",fontWeight:400,marginBottom:4}}>{o.title}</h3>
                              <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
                                <span style={{fontFamily:"Cinzel,serif",fontSize:15,color:"#C9A84C"}}>${o.offer_price.toFixed(2)}</span>
                                {o.original_price>0&&<span style={{fontFamily:"Inter,sans-serif",fontSize:12,color:"#5A4E38",textDecoration:"line-through"}}>${o.original_price.toFixed(2)}</span>}
                                {pct>0&&<span style={{fontFamily:"Cinzel,serif",fontSize:11,color:"#86efac",background:"rgba(34,197,94,.1)",padding:"2px 7px",border:"1px solid rgba(34,197,94,.25)"}}>-{pct}%</span>}
                              </div>
                            </div>
                          </div>
                          <p style={{fontFamily:"Inter,sans-serif",fontSize:12,color:"#5A4E38",marginBottom:10,lineHeight:1.6}}>{o.description}</p>
                          {o.expires_at&&<p style={{fontFamily:"Inter,sans-serif",fontSize:11,color:"rgba(239,68,68,.7)",marginBottom:10}}>⏱ Expires {o.expires_at}</p>}
                          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:10,borderTop:"1px solid #2E2820",flexWrap:"wrap",gap:8}}>
                            <Toggle value={o.is_active} onChange={async v=>{
                              const updated={...o,is_active:v};
                              setOffers(p=>p.map(x=>x.id===o.id?updated:x));
                              try { await api("menu-offers","PATCH",{id:o.id,is_active:v}); } catch {}
                            }} labelOn="Visible" labelOff="Hidden"/>
                            <div style={{display:"flex",gap:10}}>
                              <button onClick={()=>setEditOffer(o)} style={{...S.btnGhost,padding:"7px 14px",fontSize:12}}>Edit</button>
                              <button onClick={()=>setDelTarget({type:"offer",id:o.id,name:o.title})} style={{...S.btnDel,padding:"7px 14px",fontSize:12}}
                                onMouseOver={e=>{e.currentTarget.style.borderColor="rgba(239,68,68,.4)";e.currentTarget.style.color="#f87171";}}
                                onMouseOut={e=>{e.currentTarget.style.borderColor="#3A3228";e.currentTarget.style.color="#5A4E38";}}>Delete</button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
              }
            </div>
          )}

          {/* ══ REVIEWS ══ */}
          {tab==="reviews" && (
            <div>
              <h1 style={S.head1}>Reviews</h1>
              <p style={{...S.sub,marginBottom:8}}>
                {reviews.filter(r=>!r.approved).length} pending · {reviews.filter(r=>r.approved).length} approved · {reviews.filter(r=>r.featured).length} pinned
              </p>
              <p style={{fontFamily:"Inter,sans-serif",fontSize:12,color:"rgba(201,168,76,.6)",marginBottom:20}}>
                ✓ Connected to Supabase — changes save permanently
              </p>

              {reviews.length===0
                ? <div style={{textAlign:"center",padding:"40px 0",border:"1px dashed #2E2820"}}>
                    <div style={{fontSize:36,marginBottom:12}}>⭐</div>
                    <p style={S.sub}>No reviews yet. Customer reviews appear here after submission.</p>
                    <p style={{fontFamily:"Inter,sans-serif",fontSize:11,color:"#3A3228",marginTop:8}}>Press 🔄 Refresh Data to load from Supabase.</p>
                  </div>
                : <div style={{display:"flex",flexDirection:"column",gap:12}}>
                    {reviews.map(r=>(
                      <div key={r.id} style={{...S.card,border:`1px solid ${r.approved?"#2E2820":"rgba(234,179,8,.25)"}`}}>
                        <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:16,flexWrap:"wrap"}}>
                          <div style={{flex:1}}>
                            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:8,flexWrap:"wrap"}}>
                              <span style={{fontFamily:"Cinzel,serif",fontSize:14,color:"#C9A84C"}}>{r.name}</span>
                              <span style={{color:"#C9A84C",fontSize:16}}>{"★".repeat(r.rating)}{"☆".repeat(5-r.rating)}</span>
                              <span style={{fontFamily:"Inter,sans-serif",fontSize:11,color:"#3A3228"}}>{r.date||""}</span>
                              {!r.approved&&<span style={{fontFamily:"Inter,sans-serif",fontSize:10,background:"rgba(234,179,8,.1)",border:"1px solid rgba(234,179,8,.3)",color:"#fde047",padding:"2px 8px"}}>Pending</span>}
                              {r.featured&&<span style={{fontFamily:"Inter,sans-serif",fontSize:10,background:"rgba(201,168,76,.1)",border:"1px solid rgba(201,168,76,.3)",color:"#C9A84C",padding:"2px 8px"}}>★ Pinned</span>}
                            </div>
                            <p style={{fontFamily:"Inter,sans-serif",fontSize:14,color:"#9A8660",lineHeight:1.7}}>{r.text}</p>
                          </div>
                          <div style={{display:"flex",gap:8,flexWrap:"wrap",flexShrink:0}}>
                            <button onClick={()=>saveReview(r.id,{approved:!r.approved})}
                              style={{padding:"8px 14px",background:"transparent",border:`1px solid ${r.approved?"rgba(239,68,68,.4)":"rgba(34,197,94,.4)"}`,color:r.approved?"#f87171":"#86efac",fontFamily:"Inter,sans-serif",fontSize:12,cursor:"pointer"}}>
                              {r.approved?"Unpublish":"Approve"}
                            </button>
                            <button onClick={()=>saveReview(r.id,{featured:!r.featured})}
                              style={{padding:"8px 14px",background:"transparent",border:`1px solid ${r.featured?"rgba(201,168,76,.4)":"#2E2820"}`,color:r.featured?"#C9A84C":"#5A4E38",fontFamily:"Inter,sans-serif",fontSize:12,cursor:"pointer"}}>
                              {r.featured?"Unpin":"Pin"}
                            </button>
                            <button onClick={()=>setDelTarget({type:"review",id:r.id,name:r.name})}
                              style={{padding:"8px 14px",background:"transparent",border:"1px solid #2E2820",color:"#5A4E38",fontFamily:"Inter,sans-serif",fontSize:12,cursor:"pointer"}}
                              onMouseOver={e=>{e.currentTarget.style.color="#f87171";e.currentTarget.style.borderColor="rgba(239,68,68,.3)";}}
                              onMouseOut={e=>{e.currentTarget.style.color="#5A4E38";e.currentTarget.style.borderColor="#2E2820";}}>Delete</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
              }
            </div>
          )}

          {/* ══ ORDER LINKS ══ */}
          {tab==="orders" && (
            <div>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8,flexWrap:"wrap",gap:12}}>
                <div><h1 style={S.head1}>Order Links</h1><p style={S.sub}>Saved to database. Add as many platforms as you want.</p></div>
                <button onClick={()=>{
                  const newLink: OrderLink = {id:`o_${Date.now()}`,label:"New Platform",url:"",description:"",is_primary:false,is_active:true};
                  setOrderLinks(p=>[...p,newLink]);
                }} style={S.btnGold}>+ Add Link</button>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:14,marginTop:16}}>
                {orderLinks.map(link=>(
                  <div key={link.id} style={{...S.card,border:`1px solid ${link.is_active?"rgba(201,168,76,.25)":"#2E2820"}`}}>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:14}}>
                      <div><label style={S.lbl}>Platform Name</label>
                        <input style={S.inp} type="text" value={link.label}
                          onChange={e=>setOrderLinks(p=>p.map(x=>x.id===link.id?{...x,label:e.target.value}:x))}
                          placeholder="e.g. GrubHub, DoorDash"/>
                      </div>
                      <div><label style={S.lbl}>Description</label>
                        <input style={S.inp} type="text" value={link.description}
                          onChange={e=>setOrderLinks(p=>p.map(x=>x.id===link.id?{...x,description:e.target.value}:x))}
                          placeholder="e.g. Delivery available"/>
                      </div>
                    </div>
                    <div style={{marginBottom:14}}>
                      <label style={S.lbl}>Order URL</label>
                      <input style={S.inp} type="url" value={link.url}
                        onChange={e=>setOrderLinks(p=>p.map(x=>x.id===link.id?{...x,url:e.target.value}:x))}
                        placeholder="https://..."/>
                    </div>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12}}>
                      <div style={{display:"flex",gap:20,flexWrap:"wrap"}}>
                        <Toggle value={link.is_active} onChange={v=>setOrderLinks(p=>p.map(x=>x.id===link.id?{...x,is_active:v}:x))} labelOn="Active" labelOff="Hidden"/>
                        <Toggle value={link.is_primary} onChange={v=>setOrderLinks(p=>p.map(x=>x.id===link.id?{...x,is_primary:v}:x))} labelOn="Primary Button" labelOff="Secondary"/>
                      </div>
                      <div style={{display:"flex",gap:10}}>
                        <button onClick={()=>saveOrderLink(link)} style={S.btnGold}>Save</button>
                        {link.url&&<a href={link.url} target="_blank" rel="noopener noreferrer" style={{...S.btnGhost,padding:"8px 14px",fontSize:12,textDecoration:"none",display:"inline-flex"}}>Test ↗</a>}
                        <button onClick={()=>setDelTarget({type:"order",id:link.id,name:link.label})} style={S.btnDel}
                          onMouseOver={e=>{e.currentTarget.style.borderColor="rgba(239,68,68,.4)";e.currentTarget.style.color="#f87171";}}
                          onMouseOut={e=>{e.currentTarget.style.borderColor="#3A3228";e.currentTarget.style.color="#5A4E38";}}>Delete</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ══ SETTINGS ══ */}
          {tab==="settings" && (() => {
            // Parse socials and hours from JSON strings in settings
            let socials: SocialLink[] = DEFAULT_SOCIALS;
            let hoursSchedule: DayHours[] = DEFAULT_HOURS;
            try { socials = JSON.parse(settings.socials || "[]"); if(!socials.length) socials=DEFAULT_SOCIALS; } catch {}
            try { hoursSchedule = JSON.parse(settings.hours_schedule || "[]"); if(!hoursSchedule.length) hoursSchedule=DEFAULT_HOURS; } catch {}

            const setSocials = (s: SocialLink[]) => setSettings({...settings, socials: JSON.stringify(s)});
            const setHours   = (h: DayHours[])   => setSettings({...settings, hours_schedule: JSON.stringify(h)});

            const addSocial = () => setSocials([...socials, {id:`s_${Date.now()}`, label:"New Platform", url:"https://", icon:"🔗", active:true}]);
            const delSocial = (id:string) => setSocials(socials.filter(s=>s.id!==id));
            const updSocial = (id:string, field:keyof SocialLink, val:string|boolean) =>
              setSocials(socials.map(s=>s.id===id ? {...s,[field]:val} : s));
            const updHours = (day:string, field:keyof DayHours, val:string|boolean) =>
              setHours(hoursSchedule.map(h=>h.day===day ? {...h,[field]:val} : h));

            return (
            <div>
              <h1 style={{...S.head1,marginBottom:6}}>الإعدادات</h1>
              <p style={{...S.sub,marginBottom:24}}>كل التعديلات بتتحفظ في Supabase مباشرة.</p>

              {/* Row 1: Contact + Catering */}
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:18,marginBottom:18}}>
                <div style={S.card}>
                  <span style={S.catTitle}>معلومات التواصل</span>
                  {([["phone","التليفون"],["address","العنوان"],["email","الإيميل"]] as const).map(([k,l])=>(
                    <div key={k} style={{marginBottom:14}}><label style={S.lbl}>{l}</label>
                      <input style={{...S.inp,fontSize:13}} type="text" value={settings[k]} onChange={e=>setSettings({...settings,[k]:e.target.value})}/>
                    </div>
                  ))}
                </div>
                <div style={S.card}>
                  <span style={S.catTitle}>🍽️ الكاترينج</span>
                  <p style={{fontFamily:"Inter,sans-serif",fontSize:12,color:"#5A4E38",marginBottom:14,lineHeight:1.6}}>بيظهر في صفحة التواصل كمعلومات الكاترينج.</p>
                  {([["catering_phone","تليفون الكاترينج"],["catering_email","إيميل الكاترينج"]] as const).map(([k,l])=>(
                    <div key={k} style={{marginBottom:14}}><label style={S.lbl}>{l}</label>
                      <input style={{...S.inp,fontSize:13}} type="text" value={settings[k]} onChange={e=>setSettings({...settings,[k]:e.target.value})}/>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Links — dynamic */}
              <div style={{...S.card, marginBottom:18}}>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
                  <span style={S.catTitle}>📱 روابط السوشيال ميديا</span>
                  <button onClick={addSocial} style={{...S.btnGold,padding:"7px 16px",fontSize:12}}>+ إضافة منصة</button>
                </div>
                <p style={{fontFamily:"Inter,sans-serif",fontSize:12,color:"#5A4E38",marginBottom:16,lineHeight:1.6}}>
                  الروابط دي بتظهر في صفحة التواصل والفوتر. تقدر تضيف، تعدل، أو تخفي أي منصة.
                </p>
                {socials.length === 0 && <p style={{color:"#5A4E38",fontFamily:"Inter,sans-serif",fontSize:13}}>لا يوجد روابط. اضغط &quot;+ إضافة منصة&quot;</p>}
                {socials.map(s => (
                  <div key={s.id} style={{display:"grid",gridTemplateColumns:"48px 1fr 2fr auto",gap:10,alignItems:"center",marginBottom:12,padding:"10px 12px",background:"#0D0B07",border:"1px solid #2E2820"}}>
                    {/* Icon */}
                    <input style={{...S.inp,textAlign:"center",fontSize:20,padding:"6px 4px"}} value={s.icon}
                      onChange={e=>updSocial(s.id,"icon",e.target.value)} title="Emoji icon"/>
                    {/* Label */}
                    <input style={{...S.inp,fontSize:13}} placeholder="اسم المنصة" value={s.label}
                      onChange={e=>updSocial(s.id,"label",e.target.value)}/>
                    {/* URL */}
                    <input style={{...S.inp,fontSize:12}} placeholder="https://..." value={s.url}
                      onChange={e=>updSocial(s.id,"url",e.target.value)}/>
                    {/* Active toggle + delete */}
                    <div style={{display:"flex",gap:6,alignItems:"center"}}>
                      <button
                        onClick={()=>updSocial(s.id,"active",!s.active)}
                        title={s.active?"إخفاء":"إظهار"}
                        style={{background:s.active?"rgba(201,168,76,0.15)":"transparent",border:`1px solid ${s.active?"#C9A84C":"#3A3228"}`,color:s.active?"#C9A84C":"#5A4E38",padding:"7px 10px",cursor:"pointer",fontSize:12,fontFamily:"Inter,sans-serif"}}>
                        {s.active?"✓ ظاهر":"○ مخفي"}
                      </button>
                      <button onClick={()=>delSocial(s.id)} style={{...S.btnDel,padding:"7px 10px"}}
                        onMouseOver={e=>{e.currentTarget.style.borderColor="#f87171";e.currentTarget.style.color="#f87171";}}
                        onMouseOut={e=>{e.currentTarget.style.borderColor="#3A3228";e.currentTarget.style.color="#5A4E38";}}>
                        🗑
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Hours Schedule — per day */}
              <div style={{...S.card, marginBottom:18}}>
                <span style={S.catTitle}>🕐 مواعيد الشغل</span>
                <p style={{fontFamily:"Inter,sans-serif",fontSize:12,color:"#5A4E38",marginBottom:16,lineHeight:1.6}}>
                  حدد مواعيد كل يوم لوحده. لو اليوم إجازة، فعّل &quot;مغلق&quot;.
                </p>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:10}}>
                  {hoursSchedule.map(h => (
                    <div key={h.day} style={{padding:"12px 14px",background:"#0D0B07",border:`1px solid ${h.closed?"#3A3228":"#2E2820"}`,opacity:h.closed?0.5:1}}>
                      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:h.closed?0:10}}>
                        <span style={{fontFamily:"Cinzel,serif",fontSize:11,color:h.closed?"#5A4E38":"#C9A84C",letterSpacing:"0.1em"}}>{h.day}</span>
                        <button onClick={()=>updHours(h.day,"closed",!h.closed)}
                          style={{background:h.closed?"rgba(201,168,76,0.08)":"transparent",border:`1px solid ${h.closed?"#C9A84C":"#3A3228"}`,color:h.closed?"#C9A84C":"#5A4E38",padding:"4px 10px",cursor:"pointer",fontSize:11,fontFamily:"Inter,sans-serif"}}>
                          {h.closed?"مغلق":"مفتوح"}
                        </button>
                      </div>
                      {!h.closed && (
                        <div style={{display:"flex",gap:8,alignItems:"center"}}>
                          <input style={{...S.inp,fontSize:12,flex:1}} placeholder="9:00 AM" value={h.open}
                            onChange={e=>updHours(h.day,"open",e.target.value)}/>
                          <span style={{color:"#5A4E38",fontFamily:"Inter,sans-serif",fontSize:12}}>–</span>
                          <input style={{...S.inp,fontSize:12,flex:1}} placeholder="12:00 AM" value={h.close}
                            onChange={e=>updHours(h.day,"close",e.target.value)}/>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <button onClick={saveSettings} style={{...S.btnGold,marginTop:8}}>💾 حفظ كل الإعدادات</button>
            </div>
            );
          })()}

        </div>
      </main>

      {/* Modals */}
      {editItem!==null && <ItemModal item={editItem==="new"?null:editItem} cats={cats} onSave={saveItem} onClose={()=>setEditItem(null)}/>}
      {editOffer!==null && <OfferModal offer={editOffer==="new"?null:editOffer} onSave={saveOffer} onClose={()=>setEditOffer(null)}/>}
      {delTarget && <Confirm msg={`Delete "${delTarget.name}"? This cannot be undone.`} onYes={confirmDel} onNo={()=>setDelTarget(null)}/>}
    </div>
  );
}
