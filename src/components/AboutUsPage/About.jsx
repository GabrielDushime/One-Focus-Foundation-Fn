import { useState, useEffect, useRef } from "react";

const P = {
  blue: "#1f99ed",
  navy: "#2e3192",
  black: "#0a0a0a",
  white: "#ffffff",
  offwhite: "#f5f8fc",
  border: "#e4eaf3",
  muted: "#6b7280",
  dark: "#1a1d2e",
};

/* ── Scroll-reveal hook ── */
const useInView = (threshold = 0.12) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
};

const FadeUp = ({ children, delay = 0, style = {} }) => {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(40px)",
      transition: `opacity .75s ease ${delay}s, transform .75s ease ${delay}s`,
      ...style,
    }}>{children}</div>
  );
};

const Chip = ({ children }) => (
  <span style={{
    display: "inline-flex", alignItems: "center", gap: 6,
    fontSize: 11, fontWeight: 700, letterSpacing: "0.13em",
    textTransform: "uppercase", color: P.blue,
    background: `${P.blue}12`, border: `1px solid ${P.blue}30`,
    borderRadius: 50, padding: "5px 14px", marginBottom: 10,
  }}>{children}</span>
);

const Bar = ({ center = false }) => (
  <div style={{
    width: 48, height: 4, borderRadius: 2, marginBottom: 18,
    background: `linear-gradient(90deg,${P.blue},${P.navy})`,
    ...(center ? { margin: "0 auto 18px" } : {}),
  }} />
);

const H2 = ({ children, center = false }) => (
  <h2 style={{
    fontFamily: "'Syne',sans-serif", fontSize: "clamp(1.75rem,2.6vw,2.6rem)",
    fontWeight: 800, lineHeight: 1.12, color: P.black, marginBottom: 14,
    textAlign: center ? "center" : "left",
  }}>{children}</h2>
);

const Sub = ({ children, center = false, maxW = 560 }) => (
  <p style={{
    color: P.muted, fontSize: "0.96rem", lineHeight: 1.8, maxWidth: maxW,
    textAlign: center ? "center" : "left",
    ...(center ? { margin: "0 auto" } : {}),
  }}>{children}</p>
);

const BtnSolid = ({ children }) => {
  const [h, setH] = useState(false);
  return (
    <button onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{
      background: `linear-gradient(135deg,${h ? P.navy : P.blue},${h ? P.blue : P.navy})`,
      color: "#fff", border: "none", padding: "13px 28px", borderRadius: 50,
      fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "0.93rem",
      cursor: "pointer", boxShadow: `0 6px 22px ${P.blue}33`,
      transform: h ? "translateY(-2px)" : "none", transition: "all .25s ease",
    }}>{children}</button>
  );
};

const BtnOutline = ({ children, dark = false }) => {
  const [h, setH] = useState(false);
  return (
    <button onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{
      background: h ? (dark ? "rgba(255,255,255,0.14)" : `${P.blue}0a`) : "transparent",
      color: dark ? "#fff" : P.navy,
      border: `2px solid ${h ? P.blue : (dark ? "rgba(255,255,255,0.4)" : P.navy)}`,
      padding: "13px 28px", borderRadius: 50,
      fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "0.93rem",
      cursor: "pointer", transform: h ? "translateY(-2px)" : "none", transition: "all .25s ease",
    }}>{children}</button>
  );
};

/* ════ HERO ════ */
const Hero = () => (
  <section style={{ minHeight: "100vh", background: P.white, display: "flex", alignItems: "center", padding: "80px 6vw", position: "relative", overflow: "hidden" }}>
    {[[640,-140,-140],[380,null,null,null,"8%"],[220,null,null,null,null,"38%","28%"]].map(([s,t,r,b,l,tp,rp],i) => (
      <div key={i} style={{ position:"absolute", borderRadius:"50%", pointerEvents:"none", width:s, height:s, background:`radial-gradient(circle, ${i===0?P.blue:i===1?P.navy:P.blue}${i===0?"14":i===1?"0f":"0c"} 0%,transparent 70%)`, top:t??tp, right:r??rp, bottom:b, left:l }} />
    ))}
    <div className="about-hero-grid" style={{ maxWidth:1200, margin:"0 auto", width:"100%", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"5rem", alignItems:"center", position:"relative", zIndex:1 }}>
      <div>
        <div style={{ display:"inline-flex", alignItems:"center", gap:7, fontSize:11, fontWeight:700, letterSpacing:"0.13em", textTransform:"uppercase", color:P.blue, background:`${P.blue}10`, border:`1px solid ${P.blue}28`, borderRadius:50, padding:"5px 14px", marginBottom:22, animation:"fu .8s ease both" }}>
          <span style={{ width:7, height:7, borderRadius:"50%", background:P.blue, display:"inline-block" }} /> Pan-African Youth Empowerment
        </div>
        <h1 style={{ fontFamily:"'Syne',sans-serif", fontSize:"clamp(2.3rem,3.8vw,3.8rem)", fontWeight:800, lineHeight:1.09, color:P.black, marginBottom:22, animation:"fu .8s .1s ease both" }}>
          Unlocking Africa's Youth <span style={{ color:P.blue }}>Potential</span> Through Skills, Mentorship &{" "}
          <span style={{ background:`linear-gradient(135deg,${P.blue},${P.navy})`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>Innovation</span>
        </h1>
        <p style={{ color:P.muted, fontSize:"1.03rem", lineHeight:1.8, maxWidth:500, marginBottom:32, animation:"fu .8s .2s ease both" }}>
          ONEFOCUS AFRICA is a youth empowerment ecosystem discovering, nurturing, and elevating the next generation of African leaders, creators, and innovators.
        </p>
        <div style={{ display:"flex", gap:14, flexWrap:"wrap", animation:"fu .8s .3s ease both" }}>
          <a href="https://linktr.ee/onefocusafrica" target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}><BtnSolid>Explore Our Programs</BtnSolid></a>
          <a href="https://linktr.ee/onefocusafrica" target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}><BtnOutline>Partner With Us</BtnOutline></a>
        </div>
        <div style={{ display:"flex", gap:40, marginTop:40, animation:"fu .8s .4s ease both" }}>
          {[["10K+","Vision to Impact Youth"],["54+","African Countries & Beyond"],["3+","Programs Ongoing"]].map(([n,l]) => (
            <div key={l}>
              <div style={{ fontFamily:"'Syne',sans-serif", fontSize:"1.7rem", fontWeight:800, color:P.blue }}>{n}</div>
              <div style={{ fontSize:"0.76rem", color:P.muted, fontWeight:500, marginTop:2 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ animation:"fu .8s .5s ease both" }}>
        <div style={{ borderRadius:28, padding:"2.5rem", display:"flex", flexDirection:"column", alignItems:"center", gap:22, position:"relative", overflow:"hidden", height: "100%", minHeight: "400px" }}>
          {/* Single Background Image */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: "url(/Rwanda.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              zIndex: 1,
            }}
          />
          {/* 60% Overlay */}
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            zIndex: 2,
          }} />
          {/* Content in front of overlay */}
          <div style={{
            position: "relative",
            zIndex: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 22,
          }}>
            
            <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"1.05rem", color:P.white, textAlign:"center" }}>Africa's Talent Ecosystem</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, width:"100%" }}>
              {[["Discover"],["Develop"],["Elevate"],["Connect"]].map(([ic,lb]) => (
                <div key={lb} style={{ background:P.white, borderRadius:16, padding:"16px 12px", textAlign:"center", boxShadow:`0 4px 18px ${P.blue}14`, border:`1px solid ${P.blue}14` }}>
                  <div style={{ fontSize:"1.5rem", marginBottom:6 }}>{ic}</div>
                  <div style={{ fontFamily:"'Syne',sans-serif", fontSize:"0.8rem", fontWeight:700, color:P.navy }}>{lb}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ════ WHO WE ARE ════ */
const WhoWeAre = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [
    "/our.jpg",
    "/zi.jpg",
    "/nda.jpg",
    "/_NIY4.jpeg",
    "/NIY3185.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section style={{ padding:"6rem 6vw", background:P.offwhite }}>
      <div className="about-who-grid" style={{ maxWidth:1200, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"5rem", alignItems:"center" }}>
        <FadeUp>
          <div style={{ aspectRatio:"1", borderRadius:24, position:"relative", overflow:"hidden" }}>
            {/* Background Image Slider */}
            {images.map((img, index) => (
              <div
                key={index}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundImage: `url(${img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  opacity: currentSlide === index ? 1 : 0,
                  transition: "opacity 1s ease-in-out",
                  zIndex: 1,
                }}
              />
            ))}
            {/* 60% Overlay */}
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              zIndex: 2,
            }} />
            {/* Content in front of overlay */}
            <div style={{
              position: "relative",
              zIndex: 3,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 18,
              padding: "2rem",
            }}>
              <div style={{ fontSize:"5rem" }}>🎙️</div>
              <div style={{ background:P.white, borderRadius:14, padding:"14px 22px", boxShadow:`0 8px 28px ${P.navy}12`, border:`1px solid ${P.blue}14`, textAlign:"center" }}>
                <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"1rem", color:P.black }}>Workshop & Podcast Studio</div>
                <div style={{ fontSize:"0.76rem", color:P.muted, marginTop:3 }}>Where Talent Meets Opportunity</div>
              </div>
            </div>
            {/* Slide Indicators */}
            <div style={{
              position: "absolute",
              bottom: 16,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 4,
              display: "flex",
              gap: 8,
            }}>
              {images.map((_, index) => (
                <div
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  style={{
                    width: currentSlide === index ? 24 : 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: currentSlide === index ? P.blue : "rgba(255,255,255,0.5)",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                />
              ))}
            </div>
          </div>
        </FadeUp>
        <FadeUp delay={0.15}>
          <Chip>Our Identity</Chip><Bar />
          <H2>Who We Are</H2>
          <p style={{ color:P.muted, lineHeight:1.8, marginBottom:20, fontSize:"0.96rem" }}>ONEFOCUS AFRICA is a pan-African talent development ecosystem designed to bridge the gap between education and opportunity.</p>
          <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:24 }}>
            {[["AI-powered career guidance"],["Real-world mentorship"],["Skills-based workshops"],["Media exposure through storytelling"]].map(([ic,tx]) => (
              <div key={tx} style={{ display:"flex", alignItems:"center", gap:12, background:P.white, borderRadius:12, padding:"12px 16px", border:`1px solid ${P.border}`, boxShadow:"0 2px 8px rgba(0,0,0,0.04)" }}>
                <span style={{ fontSize:"1.1rem" }}>{ic}</span>
                <span style={{ fontWeight:500, color:P.dark, fontSize:"0.9rem" }}>{tx}</span>
              </div>
            ))}
          </div>
          <div style={{ borderLeft:`4px solid ${P.blue}`, paddingLeft:16, fontFamily:"'Syne',sans-serif", color:P.navy, fontSize:"0.93rem", fontStyle:"italic", fontWeight:600 }}>
            We are not just a training center, we are a long-term talent pipeline for Africa.
          </div>
        </FadeUp>
      </div>
    </section>
  );
};

/* ════ MISSION & VISION ════ */
const MissionVision = () => {
  const cards = [
    { icon:"🎯", title:"Our Mission", text:"To discover, nurture, and empower young African talents by providing platforms, mentorship, and opportunities that turn dreams into real impact." },
    { icon:"🌟", title:"Our Vision",  text:"To create a thriving Africa where every young talent is recognized, nurtured, and empowered to become leaders of positive change." },
  ];
  return (
    <section style={{ padding:"6rem 6vw", background:P.white }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <FadeUp style={{ textAlign:"center", marginBottom:48 }}>
          <Chip>Purpose &amp; Direction</Chip><Bar center /><H2 center>Mission &amp; Vision</H2>
        </FadeUp>
        <div className="about-mission-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24 }}>
          {cards.map(({ icon, title, text }, i) => {
            const [h, setH] = useState(false);
            return (
              <FadeUp key={title} delay={i * 0.12}>
                <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{
                  background: h ? `linear-gradient(135deg,${P.blue},${P.navy})` : P.white,
                  border:`2px solid ${h ? "transparent" : P.border}`,
                  borderRadius:24, padding:"2.5rem",
                  boxShadow: h ? `0 22px 60px ${P.blue}28` : "0 4px 22px rgba(0,0,0,0.06)",
                  transform: h ? "translateY(-6px)" : "none", transition:"all .35s ease", cursor:"default",
                }}>
                  <div style={{ width:56, height:56, borderRadius:16, fontSize:"1.6rem", background: h ? "rgba(255,255,255,0.18)" : `${P.blue}10`, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:18 }}>{icon}</div>
                  <h3 style={{ fontFamily:"'Syne',sans-serif", fontSize:"1.35rem", fontWeight:800, color: h ? "#fff" : P.black, marginBottom:10 }}>{title}</h3>
                  <p style={{ color: h ? "rgba(255,255,255,0.82)" : P.muted, lineHeight:1.75, fontSize:"0.94rem" }}>{text}</p>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ════ PROBLEM ════ */
const Problem = () => {
  const items = [
    { icon:"👥", text:"Access to mentors" },
    { icon:"🧭", text:"Career guidance & exposure" },
    { icon:"💡", text:"Digital & entrepreneurial skills" },
    { icon:"🎤", text:"Platforms to showcase talent" },
    { icon:"🎓", text:"School-to-employment transition" },
  ];
  return (
    <section style={{ padding:"6rem 6vw", background:P.offwhite }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <FadeUp>
          <Chip>The Challenge</Chip><Bar />
          <H2>Why ONEFOCUS AFRICA Exists</H2>
          <Sub maxW={580}>Africa has the youngest population in the world, yet millions of youth lack the resources to reach their potential.</Sub>
        </FadeUp>
        <div className="about-problem-grid" style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:14, margin:"32px 0 20px" }}>
          {items.map(({ icon, text }, i) => {
            const [h, setH] = useState(false);
            return (
              <FadeUp key={text} delay={i * 0.07}>
                <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{
                  background: h ? `linear-gradient(135deg,${P.blue},${P.navy})` : P.white,
                  border:`1.5px solid ${h ? "transparent" : P.border}`,
                  borderRadius:18, padding:"1.8rem 1rem", textAlign:"center",
                  transform: h ? "translateY(-6px)" : "none",
                  boxShadow: h ? `0 16px 40px ${P.blue}22` : "0 2px 12px rgba(0,0,0,0.05)",
                  transition:"all .3s ease", cursor:"default",
                }}>
                  <div style={{ fontSize:"2rem", marginBottom:10 }}>{icon}</div>
                  <p style={{ fontSize:"0.82rem", color: h ? "rgba(255,255,255,0.9)" : P.muted, lineHeight:1.55, fontWeight:500 }}>{text}</p>
                </div>
              </FadeUp>
            );
          })}
        </div>
        <FadeUp delay={0.4}>
          <div style={{ background:`${P.navy}08`, border:`1px solid ${P.navy}20`, borderRadius:14, padding:"16px 24px", textAlign:"center", color:P.navy, fontWeight:600, fontSize:"0.9rem" }}>
            Result: Lost potential, unemployment, and reduced innovation across the continent.
          </div>
        </FadeUp>
      </div>
    </section>
  );
};

/* ════ ECOSYSTEM ════ */
const Ecosystem = () => {
  const steps = [
    { icon:"🔍", num:"01", title:"Discover", desc:"Podcast inspiration & school outreach to identify hidden talent across Africa" },
    { icon:"🛠",  num:"02", title:"Develop",  desc:"Workshops, AI talent scans, and hands-on mentorship programs" },
    { icon:"🚀", num:"03", title:"Elevate",  desc:"Showcases, media exposure, and public speaking opportunities" },
    { icon:"🤝", num:"04", title:"Connect",  desc:"Mentor matching & real career opportunities for growth" },
  ];
  return (
    <section style={{ padding:"6rem 6vw", background:P.white }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <FadeUp style={{ textAlign:"center", marginBottom:48 }}>
          <Chip>Our Approach</Chip><Bar center />
          <H2 center>Our Holistic Talent Ecosystem</H2>
          <Sub center maxW={500}>A four-step journey transforming raw potential into real-world impact.</Sub>
        </FadeUp>
        <div className="about-ecosystem-grid" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:20, position:"relative" }}>
          <div style={{ position:"absolute", top:68, left:"12%", right:"12%", height:2, background:`linear-gradient(90deg,${P.blue},${P.navy})`, opacity:.18, zIndex:0 }} />
          {steps.map(({ icon, num, title, desc }, i) => {
            const [h, setH] = useState(false);
            return (
              <FadeUp key={title} delay={i * 0.1}>
                <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{
                  background:P.white, border:`2px solid ${h ? P.blue : P.border}`,
                  borderRadius:22, padding:"2rem 1.5rem", textAlign:"center", position:"relative", zIndex:1,
                  transform: h ? "translateY(-8px)" : "none",
                  boxShadow: h ? `0 24px 56px ${P.blue}1e` : "0 4px 18px rgba(0,0,0,0.06)",
                  transition:"all .35s ease", cursor:"default",
                }}>
                  <div style={{ width:54, height:54, borderRadius:"50%", background: h ? `linear-gradient(135deg,${P.blue},${P.navy})` : P.offwhite, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 14px", boxShadow: h ? `0 8px 24px ${P.blue}3a` : "none", transition:"all .35s ease", fontSize:"1.4rem" }}>{icon}</div>
                  <div style={{ fontSize:"0.62rem", fontWeight:700, letterSpacing:"0.14em", color:P.blue, marginBottom:6 }}>STEP {num}</div>
                  <h3 style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"1.02rem", color: h ? P.blue : P.black, marginBottom:8, transition:"color .3s" }}>{title}</h3>
                  <p style={{ fontSize:"0.81rem", color:P.muted, lineHeight:1.65 }}>{desc}</p>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ════ DIFFERENTIATORS ════ */
const Differentiators = () => {
  const items = [
    { icon:"🤖", title:"AI-Powered Guidance",  desc:"Personalized talent discovery and career pathfinding using cutting-edge AI tools." },
    { icon:"🔗", title:"Integrated Ecosystem",  desc:"Mentorship, media, and outreach unified in one seamless experience." },
    { icon:"📐", title:"Scalable Programs",      desc:"Flexible solutions designed for schools, governments, and large institutions." },
    { icon:"🌍", title:"Pan-African Vision",     desc:"Built for scale across borders — one continent, one ecosystem, one focus." },
    { icon:"📈", title:"Long-Term Pipeline",     desc:"A sustained development journey from school to career." },
    { icon:"🎙️", title:"Media & Storytelling",  desc:"Youth voices amplified through podcasts, showcases, and public platforms." },
  ];
  return (
    <section style={{ padding:"6rem 6vw", background:P.offwhite }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <FadeUp style={{ textAlign:"center", marginBottom:48 }}>
          <Chip>Our Edge</Chip><Bar center /><H2 center>Why ONEFOCUS AFRICA is Different</H2>
        </FadeUp>
        <div className="about-diff-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20 }}>
          {items.map(({ icon, title, desc }, i) => {
            const [h, setH] = useState(false);
            return (
              <FadeUp key={title} delay={i * 0.07}>
                <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{
                  background:P.white, border:`1.5px solid ${h ? P.blue : P.border}`,
                  borderRadius:18, padding:"2rem",
                  transform: h ? "translateY(-5px)" : "none",
                  boxShadow: h ? `0 16px 40px ${P.blue}16` : "0 2px 12px rgba(0,0,0,0.04)",
                  transition:"all .3s ease", cursor:"default",
                }}>
                  <div style={{ width:52, height:52, borderRadius:14, fontSize:"1.4rem", background: h ? `${P.blue}12` : P.offwhite, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:14, transition:"background .3s" }}>{icon}</div>
                  <h3 style={{ fontFamily:"'Syne',sans-serif", fontSize:"0.95rem", fontWeight:800, color:P.black, marginBottom:6 }}>{title}</h3>
                  <p style={{ fontSize:"0.82rem", color:P.muted, lineHeight:1.65 }}>{desc}</p>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ════ PROGRAMS ════ */
const Programs = () => {
  const programs = [
    { icon:"🤖", bg:`${P.blue}18`,  title:"AI Talent Companion",       desc:"Personalized AI-guided career discovery and skills development for every youth." },
    { icon:"🛠️", bg:`${P.navy}14`, title:"Workshops & Mentorship",     desc:"Hands-on skills workshops paired with direct mentorship from industry leaders." },
    { icon:"🎙️", bg:"#00b89414",   title:"Voice of Tomorrow Podcast",  desc:"A platform where youth stories, ideas, and innovations meet the world." },
    { icon:"🏫", bg:"#f5a62318",    title:"School Outreach #INZIRA",    desc:"Career tours and outreach programs bringing opportunity directly to schools." },
  ];
  return (
    <section style={{ padding:"6rem 6vw", background:P.white }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <FadeUp style={{ marginBottom:48 }}>
          <Chip>What We Offer</Chip><Bar /><H2>Our Programs</H2>
        </FadeUp>
        <div className="about-programs-grid" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:20 }}>
          {programs.map(({ icon, bg, title, desc }, i) => {
            const [h, setH] = useState(false);
            return (
              <FadeUp key={title} delay={i * 0.09}>
                <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{
                  background:P.white, border:`1.5px solid ${h ? P.blue : P.border}`,
                  borderRadius:20, overflow:"hidden",
                  transform: h ? "translateY(-6px)" : "none",
                  boxShadow: h ? `0 20px 50px ${P.blue}16` : "0 3px 16px rgba(0,0,0,0.05)",
                  transition:"all .35s ease",
                }}>
                  <div style={{ height:130, background:bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"3rem", borderBottom:`1px solid ${P.border}` }}>{icon}</div>
                  <div style={{ padding:"1.4rem" }}>
                    <h3 style={{ fontFamily:"'Syne',sans-serif", fontSize:"0.96rem", fontWeight:800, color:P.black, marginBottom:6 }}>{title}</h3>
                    <p style={{ fontSize:"0.81rem", color:P.muted, lineHeight:1.65, marginBottom:14 }}>{desc}</p>
                    <button style={{ background:"transparent", border:`1px solid ${P.blue}38`, color:P.blue, borderRadius:50, padding:"6px 14px", fontSize:"0.76rem", fontWeight:600, cursor:"pointer", fontFamily:"'DM Sans',sans-serif" }}>Learn More →</button>
                  </div>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ════ COMMUNITY ════ */
const Community = () => (
  <section style={{ padding:"6rem 6vw", background:P.offwhite }}>
    <div style={{ maxWidth:1200, margin:"0 auto" }}>
      <FadeUp style={{ marginBottom:40 }}>
        <Chip>Who We Serve</Chip><Bar /><H2>Our Target Community</H2>
      </FadeUp>
      <div className="about-community-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24 }}>
        <FadeUp>
          <div style={{ background:`linear-gradient(135deg,${P.blue},${P.navy})`, borderRadius:24, padding:"2.5rem", color:"#fff", boxShadow:`0 20px 60px ${P.blue}28` }}>
            <div style={{ fontSize:"0.68rem", fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", opacity:.7, marginBottom:8 }}>Primary Audience</div>
            <h3 style={{ fontFamily:"'Syne',sans-serif", fontSize:"1.4rem", fontWeight:800, marginBottom:12 }}>Youth (Ages 12–25)</h3>
            <p style={{ opacity:.83, lineHeight:1.78, marginBottom:24, fontSize:"0.93rem" }}>Secondary school students, TVET learners, and young professionals ready to discover their full potential and take the next step.</p>
            <a href="https://linktr.ee/onefocusafrica" target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}><button style={{ background:"rgba(255,255,255,0.18)", color:"#fff", border:"2px solid rgba(255,255,255,0.4)", borderRadius:50, padding:"11px 24px", fontFamily:"'DM Sans',sans-serif", fontWeight:600, fontSize:"0.88rem", cursor:"pointer" }}>Join the Community</button></a>
          </div>
        </FadeUp>
        <FadeUp delay={0.1}>
          <div style={{ background:P.white, border:`1.5px solid ${P.border}`, borderRadius:24, padding:"2.5rem", boxShadow:"0 4px 22px rgba(0,0,0,0.05)" }}>
            <div style={{ fontSize:"0.68rem", fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:P.blue, marginBottom:8 }}>Strategic Partners</div>
            <h3 style={{ fontFamily:"'Syne',sans-serif", fontSize:"1.4rem", fontWeight:800, color:P.black, marginBottom:12 }}>Our Ecosystem Partners</h3>
            <p style={{ color:P.muted, lineHeight:1.78, marginBottom:22, fontSize:"0.93rem" }}>Institutions committed to investing in African youth development and workforce readiness.</p>
            <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
              {["🏫 Schools","🤝 NGOs","🏛️ Government","👔 Corporates","🧑‍🏫 Mentors"].map(p => (
                <span key={p} style={{ background:P.offwhite, border:`1px solid ${P.border}`, borderRadius:50, padding:"6px 14px", fontSize:"0.78rem", color:P.dark, fontWeight:500 }}>{p}</span>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </div>
  </section>
);

/* ════ CTA ════ */
const CTA = () => (
  <section style={{ padding:"7rem 6vw", background:`linear-gradient(135deg,${P.navy} 0%,${P.blue} 100%)`, position:"relative", overflow:"hidden" }}>
    <div style={{ position:"absolute", top:-100, right:-100, width:400, height:400, borderRadius:"50%", background:"rgba(255,255,255,0.06)", pointerEvents:"none" }} />
    <div style={{ position:"absolute", bottom:-80, left:"12%", width:280, height:280, borderRadius:"50%", background:"rgba(255,255,255,0.04)", pointerEvents:"none" }} />
    <FadeUp>
      <div style={{ maxWidth:680, margin:"0 auto", textAlign:"center", position:"relative", zIndex:1 }}>
        <div style={{ display:"inline-block", background:"rgba(255,255,255,0.14)", border:"1px solid rgba(255,255,255,0.28)", borderRadius:50, padding:"5px 16px", fontSize:"0.7rem", fontWeight:700, letterSpacing:"0.13em", textTransform:"uppercase", color:"#fff", marginBottom:20 }}>Take Action</div>
        <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:"clamp(2rem,3vw,3rem)", fontWeight:800, color:"#fff", lineHeight:1.12, marginBottom:18 }}>Invest in Africa's Future Talent Economy</h2>
        <p style={{ color:"rgba(255,255,255,0.78)", fontSize:"1.02rem", lineHeight:1.8, marginBottom:36 }}>ONEFOCUS AFRICA is building the next generation of leaders, innovators, and creators. Your support changes lives and shapes continents.</p>
        <div style={{ display:"flex", justifyContent:"center", gap:14, flexWrap:"wrap" }}>
          {[
            { label:"🔵 Partner With Us", solid:true },
            { label:"Support a Program",  solid:false },
            { label:"🔷 Join the Community", solid:false },
          ].map(({ label, solid }) => (
            <a key={label} href="https://linktr.ee/onefocusafrica" target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
              <button style={{ background: solid ? "#fff" : "rgba(255,255,255,0.13)", color: solid ? P.blue : "#fff", border: solid ? "none" : "2px solid rgba(255,255,255,0.4)", borderRadius:50, padding:"13px 26px", fontFamily:"'DM Sans',sans-serif", fontWeight:600, fontSize:"0.93rem", cursor:"pointer", boxShadow: solid ? "0 8px 28px rgba(0,0,0,0.14)" : "none" }}>{label}</button>
            </a>
          ))}
        </div>
      </div>
    </FadeUp>
  </section>
);

/* ════ ROOT ════ */
export default function OneFocusAfricaPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { font-family: 'DM Sans', sans-serif; background: #fff; overflow-x: hidden; }
        @keyframes fu { from { opacity:0; transform:translateY(34px); } to { opacity:1; transform:none; } }
        
        /* Responsive Styles */
        @media (max-width: 768px) {
          .about-hero-grid { grid-template-columns: 1fr !important; gap: 30px !important; padding: 60px 4vw !important; }
          .about-who-grid { grid-template-columns: 1fr !important; gap: 30px !important; }
          .about-mission-grid { grid-template-columns: 1fr !important; }
          .about-problem-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .about-ecosystem-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
          .about-diff-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
          .about-programs-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 16px !important; }
          .about-community-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
        }
        
        @media (min-width: 769px) and (max-width: 1024px) {
          .about-hero-grid { grid-template-columns: 1fr 1fr !important; gap: 30px !important; }
          .about-who-grid { grid-template-columns: 1fr 1fr !important; gap: 30px !important; }
          .about-problem-grid { grid-template-columns: repeat(3, 1fr) !important; }
          .about-ecosystem-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .about-diff-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .about-programs-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
      <Hero />
      <WhoWeAre />
      <MissionVision />
      <Problem />
      <Ecosystem />
      <Differentiators />
      <Programs />
      <Community />
      <CTA />
    </>
  );
}
