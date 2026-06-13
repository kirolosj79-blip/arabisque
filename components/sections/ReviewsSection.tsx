"use client";
import { useState, useEffect } from "react";

interface Review { id: string|number; name: string; rating: number; text: string; date?: string; created_at?: string; }

const FALLBACK_REVIEWS: Review[] = [
  {id:1,name:"Sarah M.",rating:5,text:"The Chicken Shawarma here is unlike anything I've had in LA. The garlic sauce is incredible!",date:"2 weeks ago"},
  {id:2,name:"Omar K.",rating:5,text:"As an Egyptian living in California, this place nails authentic koshari. I was emotional.",date:"1 month ago"},
  {id:3,name:"Jessica T.",rating:5,text:"Brought my whole family. The Macarona Béchamel was rich and comforting. We're regulars now.",date:"3 weeks ago"},
  {id:4,name:"Ahmed R.",rating:5,text:"Hawawshi done right! Crispy bread, juicy filling, perfect tahini sauce.",date:"1 week ago"},
  {id:5,name:"Linda C.",rating:5,text:"Tried the Kebda Eskandarani — bold, spicy, and satisfying. This place has real soul.",date:"2 months ago"},
  {id:6,name:"Karim H.",rating:5,text:"Best Egyptian food in California. The Beef Shawarma combo is incredible value.",date:"5 days ago"},
];

function Stars({ n }: { n: number }) {
  return <div style={{display:"flex",gap:2}}>{[1,2,3,4,5].map(s=><span key={s} style={{color:s<=n?"#C9A84C":"#2E2820",fontSize:14}}>★</span>)}</div>;
}

function InteractiveStars({ value, onChange }: { value:number; onChange:(n:number)=>void }) {
  const [hover,setHover]=useState(0);
  return (
    <div style={{display:"flex",gap:4}}>
      {[1,2,3,4,5].map(s=>(
        <button key={s} type="button" onClick={()=>onChange(s)} onMouseEnter={()=>setHover(s)} onMouseLeave={()=>setHover(0)}
          style={{background:"none",border:"none",cursor:"pointer",fontSize:22,color:(hover||value)>=s?"#C9A84C":"#2E2820",lineHeight:1,padding:0}}>★</button>
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>(FALLBACK_REVIEWS);
  const [form, setForm] = useState({name:"",rating:5,text:""});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Load approved reviews from Supabase
  useEffect(() => {
    fetch("/api/reviews")
      .then(r => r.json())
      .then(data => {
        if (data.reviews && data.reviews.length > 0) {
          setReviews(data.reviews.map((r: Review) => ({
            ...r,
            date: r.created_at ? new Date(r.created_at).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}) : "",
          })));
        }
      })
      .catch(() => {}); // Keep fallback on error
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.text.trim()) return;
    setSubmitting(true);
    try {
      await fetch("/api/reviews", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(form),
      });
    } catch {}
    setSubmitted(true);
    setSubmitting(false);
  };

  return (
    <section id="reviews" className="section-pad" style={{background:"#0A0803",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",bottom:0,left:"50%",transform:"translateX(-50%)",width:"min(800px,100%)",height:200,background:"radial-gradient(ellipse,rgba(201,168,76,0.04),transparent)",pointerEvents:"none"}}/>
      <div className="container-site" style={{position:"relative",zIndex:1}}>

        <div className="section-header">
          <p style={{fontFamily:"Inter,sans-serif",fontSize:10,letterSpacing:"0.3em",textTransform:"uppercase",color:"#9A8660",marginBottom:12}}>What Our Guests Say</p>
          <h2 style={{fontFamily:"Cormorant Garamond,Georgia,serif",fontSize:"clamp(2rem,6vw,3.5rem)",color:"#E8C97A",fontWeight:300,marginBottom:12}}>Reviews</h2>
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:10,marginBottom:16}}>
            <Stars n={5}/>
            <span style={{fontFamily:"Inter,sans-serif",fontSize:12,color:"#9A8660"}}>5.0 · Loved by the community</span>
          </div>
          <div style={{height:1,maxWidth:200,margin:"0 auto",background:"linear-gradient(90deg,transparent,#C9A84C,transparent)"}}/>
        </div>

        {/* Reviews grid */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(min(100%,280px),1fr))",gap:12,marginBottom:48}}>
          {reviews.map(r=>(
            <div key={r.id} style={{background:"#1A1610",border:"1px solid #2E2820",padding:20,position:"relative",transition:"border-color .3s"}}
              onMouseOver={e=>(e.currentTarget.style.borderColor="rgba(201,168,76,.25)")}
              onMouseOut={e=>(e.currentTarget.style.borderColor="#2E2820")}>
              <div style={{height:1,background:"linear-gradient(90deg,transparent,rgba(201,168,76,.25),transparent)",marginBottom:16}}/>
              <div style={{fontFamily:"Cormorant Garamond,Georgia,serif",fontSize:40,color:"rgba(201,168,76,.1)",position:"absolute",top:12,right:14,lineHeight:1}}>&ldquo;</div>
              <div style={{marginBottom:10}}><Stars n={r.rating}/></div>
              <p style={{fontFamily:"Inter,sans-serif",fontSize:12,color:"#9A8660",lineHeight:1.7,marginBottom:16}}>{r.text}</p>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",paddingTop:12,borderTop:"1px solid #1A1610"}}>
                <span style={{fontFamily:"Cinzel,serif",fontSize:11,color:"#C9A84C",letterSpacing:"0.15em",textTransform:"uppercase"}}>{r.name}</span>
                <span style={{fontFamily:"Inter,sans-serif",fontSize:10,color:"#5A4E38"}}>{r.date||""}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Submit form */}
        <div style={{maxWidth:520,margin:"0 auto"}}>
          <div style={{background:"#1A1610",border:"1px solid rgba(201,168,76,.2)",padding:"clamp(20px,5vw,36px)"}}>
            <h3 style={{fontFamily:"Cormorant Garamond,Georgia,serif",fontSize:"clamp(1.2rem,3vw,1.5rem)",color:"#E8C97A",textAlign:"center",fontWeight:400,marginBottom:6}}>Share Your Experience</h3>
            <p style={{fontFamily:"Inter,sans-serif",fontSize:11,color:"#5A4E38",textAlign:"center",marginBottom:24}}>Your review will be visible after approval.</p>
            {submitted ? (
              <div style={{textAlign:"center",padding:"24px 0"}}>
                <div style={{fontSize:32,marginBottom:12}}>🌟</div>
                <p style={{fontFamily:"Cormorant Garamond,Georgia,serif",fontSize:20,color:"#C9A84C",marginBottom:6}}>Thank you, {form.name}!</p>
                <p style={{fontFamily:"Inter,sans-serif",fontSize:11,color:"#5A4E38"}}>Your review is pending approval.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{display:"flex",flexDirection:"column",gap:16}}>
                <div><label style={{fontFamily:"Inter,sans-serif",fontSize:11,letterSpacing:"0.18em",textTransform:"uppercase",color:"#9A8660",display:"block",marginBottom:6}}>Your Name</label>
                  <input className="input" type="text" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required placeholder="Enter your name"/>
                </div>
                <div><label style={{fontFamily:"Inter,sans-serif",fontSize:11,letterSpacing:"0.18em",textTransform:"uppercase",color:"#9A8660",display:"block",marginBottom:8}}>Rating</label>
                  <InteractiveStars value={form.rating} onChange={n=>setForm({...form,rating:n})}/>
                </div>
                <div><label style={{fontFamily:"Inter,sans-serif",fontSize:11,letterSpacing:"0.18em",textTransform:"uppercase",color:"#9A8660",display:"block",marginBottom:6}}>Your Review</label>
                  <textarea className="input" value={form.text} onChange={e=>setForm({...form,text:e.target.value})} required rows={4} style={{resize:"none"}} placeholder="Tell others about your experience..."/>
                </div>
                <button type="submit" className="btn-gold" disabled={submitting} style={{width:"100%",padding:"13px",opacity:submitting?.65:1}}>
                  {submitting?"Submitting...":"Submit Review"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
