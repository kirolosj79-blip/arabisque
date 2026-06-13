"use client";
import { useState } from "react";
import Image from "next/image";
import { featuredItems } from "@/lib/data/menu";

// Same photo mapping as MenuSection — uses local files from /public/images/dishes/
const LOCAL_PHOTOS: Record<string, string> = {
  c1:"/images/dishes/beef-shawarma.jpg",
  c2:"/images/dishes/chicken-shawarma.jpg",
  c3:"/images/dishes/kebda-eskandarani.jpg",
  c4:"/images/dishes/sujok.jpg",
  c5:"/images/dishes/hawawshi.jpg",
  c6:"/images/dishes/koshari.jpg",
  c7:"/images/dishes/macarona-bechamel.jpg",
  p1:"/images/dishes/beef-shawarma-plate.jpg",
  p2:"/images/dishes/chicken-shawarma-plate.jpg",
  d1:"/images/dishes/kunafa-ball.jpg",
  d2:"/images/dishes/baklava.jpg",
  d3:"/images/dishes/om-ali.jpg",
};

const BRAND_POOL = ["/images/menu-board.jpg","/images/cairo-scene.jpg","/images/brand-poster.jpg"];
function getBrand(id: string) {
  let h=0; for(let i=0;i<id.length;i++) h=id.charCodeAt(i)+h*31;
  return BRAND_POOL[Math.abs(h)%BRAND_POOL.length];
}

function DishPhoto({ id, name }: { id: string; name: string }) {
  const [err, setErr] = useState(false);
  const src = LOCAL_PHOTOS[id];
  if (src && !err) {
    return <Image src={src} alt={name} fill style={{objectFit:"cover"}} sizes="280px" onError={()=>setErr(true)}/>;
  }
  return (
    <div style={{position:"relative",width:"100%",height:"100%",overflow:"hidden"}}>
      <Image src={getBrand(id)} alt={name} fill style={{objectFit:"cover",opacity:0.38,filter:"sepia(40%) brightness(0.55)"}} sizes="280px"/>
      <div style={{position:"absolute",inset:0,background:"linear-gradient(160deg,rgba(20,12,4,.75),rgba(10,8,3,.6))",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"14px 12px",gap:7}}>
        <div style={{width:28,height:1,background:"rgba(201,168,76,.6)"}}/>
        <p style={{fontFamily:"Cormorant Garamond,Georgia,serif",fontSize:"clamp(13px,1.8vw,16px)",color:"#E8C97A",fontWeight:500,textAlign:"center",lineHeight:1.25}}>{name}</p>
        <div style={{width:28,height:1,background:"rgba(201,168,76,.6)"}}/>
      </div>
    </div>
  );
}

export default function FeaturedDishes() {
  const items = featuredItems.slice(0, 6);

  return (
    <section className="section-pad" style={{background:"#12100A",position:"relative",overflow:"hidden"}}>
      <div className="pattern-overlay" style={{position:"absolute",inset:0,opacity:0.18,pointerEvents:"none"}}/>
      <div className="gold-divider" style={{position:"absolute",top:0,left:0,right:0}}/>
      <div className="gold-divider" style={{position:"absolute",bottom:0,left:0,right:0}}/>

      <div className="container-site" style={{position:"relative",zIndex:1}}>
        <div className="section-header">
          <p style={{fontFamily:"Inter,sans-serif",fontSize:10,letterSpacing:"0.3em",textTransform:"uppercase",color:"#9A8660",marginBottom:12}}>Chef&apos;s Selection</p>
          <h2 style={{fontFamily:"Cormorant Garamond,Georgia,serif",fontSize:"clamp(2rem,6vw,3.5rem)",color:"#E8C97A",fontWeight:300,marginBottom:16}}>Featured Dishes</h2>
          <div style={{height:1,maxWidth:200,margin:"0 auto",background:"linear-gradient(90deg,transparent,#C9A84C,transparent)"}}/>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(min(100%,280px),1fr))",gap:16}}>
          {items.map(item => (
            <div key={item.id} style={{background:"#1A1610",border:"1px solid #2E2820",overflow:"hidden",display:"flex",flexDirection:"column",transition:"border-color .3s"}}
              onMouseOver={e=>(e.currentTarget.style.borderColor="rgba(201,168,76,.3)")}
              onMouseOut={e=>(e.currentTarget.style.borderColor="#2E2820")}>

              {/* Real photo */}
              <div style={{position:"relative",width:"100%",aspectRatio:"16/9",background:"#12100A",overflow:"hidden"}}>
                <DishPhoto id={item.id} name={item.name}/>
                {item.isVegetarian && (
                  <div style={{position:"absolute",top:8,right:8,width:18,height:18,borderRadius:"50%",border:"2px solid rgba(34,197,94,.7)",background:"rgba(10,8,3,.7)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <div style={{width:8,height:8,borderRadius:"50%",background:"rgb(134,239,172)"}}/>
                  </div>
                )}
                {item.comboPrice && (
                  <div style={{position:"absolute",top:8,left:8}}>
                    <span style={{fontFamily:"Cinzel,serif",fontSize:10,background:"rgba(201,168,76,.85)",color:"#0A0803",padding:"3px 8px",letterSpacing:"0.1em"}}>COMBO</span>
                  </div>
                )}
              </div>

              {/* Text */}
              <div style={{padding:"16px",flex:1,display:"flex",flexDirection:"column",gap:8}}>
                <h3 style={{fontFamily:"Cormorant Garamond,Georgia,serif",fontSize:"clamp(1rem,2.5vw,1.2rem)",color:"#E8C97A",fontWeight:500,lineHeight:1.3}}>
                  {item.name}
                  {item.nameAr && <span style={{fontFamily:"Cormorant Garamond,serif",fontSize:13,color:"#9A8660",fontWeight:300,marginLeft:6}} dir="rtl">{item.nameAr}</span>}
                </h3>
                <p style={{fontFamily:"Inter,sans-serif",fontSize:"clamp(11px,1.8vw,12px)",color:"#5A4E38",lineHeight:1.7,flex:1,display:"-webkit-box",WebkitLineClamp:3,WebkitBoxOrient:"vertical",overflow:"hidden"}}>
                  {item.description}
                </p>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",paddingTop:10,borderTop:"1px solid #221E16",marginTop:"auto"}}>
                  <div>
                    <span style={{fontFamily:"Cinzel,serif",fontSize:17,color:"#C9A84C"}}>${item.price.toFixed(2)}</span>
                    {item.comboPrice && <span style={{fontFamily:"Inter,sans-serif",fontSize:11,color:"#5A4E38",marginLeft:8}}>Combo ${item.comboPrice.toFixed(2)}</span>}
                  </div>
                  {(item.spiceLevel??0)>0 && (
                    <div style={{display:"flex",gap:3}}>
                      {[1,2,3].map(s=><span key={s} style={{width:6,height:6,borderRadius:"50%",background:s<=(item.spiceLevel??0)?"#C9A84C":"#2E2820",display:"inline-block"}}/>)}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{textAlign:"center",marginTop:36}}>
          <a href="#menu" className="btn-outline" style={{display:"inline-flex",alignItems:"center",gap:8,fontSize:12}}>
            View Full Menu →
          </a>
        </div>
      </div>
    </section>
  );
}
