import { useState, useEffect, useRef } from "react";
import Link from "next/link";

/* ─── Brand Colors ─── */
const P = {
  blue:     "#1f99ed",
  navy:     "#2e3192",
  black:    "#0a0a0a",
  white:    "#ffffff",
  offwhite: "#f4f8fc",
  border:   "#e2eaf4",
  muted:    "#6b7280",
  dark:     "#1a1d2e",
};

/* ─── Podcast Playlists ─── */
const PLAYLISTS = [
  {
    id:          "successful",
    icon:        "🌟",
    color:       P.navy,
    label:       "Successful Personalities",
    shortTitle:  "Successful Personalities",
    fullTitle:   "Successful Personalities | VOICE OF TOMORROW PODCAST",
    description: "Learn from accomplished leaders, entrepreneurs, and change-makers who share their inspiring journeys, lessons learned, and advice for the next generation of African talent.",
    epCount:     6,
    updated:     "Feb 1, 2026",
    playlistId:  "PLfB4__ue1tEhMMYcrmKXmj4l3eeYjgZ0q",
    playlistUrl: "https://youtube.com/playlist?list=PLfB4__ue1tEhMMYcrmKXmj4l3eeYjgZ0q&si=eYaLIfGdVwL-Bmg5",
  },
  {
    id:          "young",
    icon:        "🎯",
    color:       P.blue,
    label:       "Young Talents",
    shortTitle:  "Young Talents on the Journey to Greatness",
    fullTitle:   "Young Talents on the Journey to Greatness | VOICE OF TOMORROW PODCAST",
    description: "Follow the inspiring stories of young Africans who are already making their mark. From students to early-career professionals, discover how they overcame challenges, seized opportunities, and are building remarkable futures.",
    epCount:     22,
    updated:     "Feb 6, 2026",
    playlistId:  "PLfB4__ue1tEjn5Jo5Cgs0tp-xSz5RBKfP",
    playlistUrl: "https://youtube.com/playlist?list=PLfB4__ue1tEjn5Jo5Cgs0tp-xSz5RBKfP&si=h3zXZ1fsvXQ2GHQA",
  },
  {
    id:          "business",
    icon:        "🚀",
    color:       "#1f99ed",
    label:       "Visionary Business Minds",
    shortTitle:  "Visionary Minds in Business",
    fullTitle:   "Visionary Minds in Business | VOICE OF TOMORROW PODCAST",
    description: "Gain insights from successful entrepreneurs, business leaders, and innovators who are transforming Africa's business landscape. Learn about their vision, strategies, and how they are creating impact through enterprise.",
    epCount:     3,
    updated:     "Feb 18, 2026",
    playlistId:  "PLfB4__ue1tEjdp_ymcN7EmRca_awFrtVP",
    playlistUrl: "https://youtube.com/playlist?list=PLfB4__ue1tEjdp_ymcN7EmRca_awFrtVP&si=qV7wyECj8OKRvGfv",
  },
];

/* ─── Quick Navigation ─── */
const QuickLinks = () => {
  const links = [
    { label: "HOME", icon: "🏠", href: "/" },
    { label: "PROGRAMS", icon: "🛠️", href: "/workshop" },
    { label: "SERVICES", icon: "💼", href: "/service" },
    { label: "BLOGS", icon: "📝", href: "/blog" },
    { label: "ABOUT US", icon: "ℹ️", href: "/about" },
  ];

  return (
    <section style={{ padding: "14px 6vw", background: P.navy, borderBottom: `4px solid ${P.blue}` }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 8 }}>
        {links.map((link) => (
          <Link key={link.href} href={link.href} passHref legacyBehavior>
            <a
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "#fff",
                padding: "6px 14px",
                borderRadius: 50,
                fontFamily: "'DM Sans',sans-serif",
                fontWeight: 600,
                fontSize: "0.75rem",
                textDecoration: "none",
                transition: "all .25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = P.blue;
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                e.currentTarget.style.transform = "none";
              }}
            >
              <span style={{ fontSize: "0.85rem" }}>{link.icon}</span>
              {link.label}
            </a>
          </Link>
        ))}
      </div>
    </section>
  );
};

/* ─── Scroll Animation ─── */
const useInView = (threshold = 0.08) => {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, vis];
};

const FadeUp = ({ children, delay = 0, style = {} }) => {
  const [ref, vis] = useInView();
  return <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(36px)", transition: `opacity .65s ease ${delay}s, transform .65s ease ${delay}s`, ...style }}>{children}</div>;
};

/* ─── UI Components ─── */
const GradText = ({ children }) => (
  <span style={{ background: `linear-gradient(135deg,${P.blue},${P.navy})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{children}</span>
);

const SectionLabel = ({ children, color = P.blue, style = {} }) => (
  <div style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color, background: `${color}12`, border: `1px solid ${color}28`, borderRadius: 50, padding: "5px 14px", marginBottom: 12, ...style }}>
    <span style={{ width: 6, height: 6, borderRadius: "50%", background: color, display: "inline-block" }}>{children}</span>
  </div>
);

const AccentBar = ({ center = false }) => (
  <div style={{ width: 48, height: 4, borderRadius: 2, marginBottom: 16, background: `linear-gradient(90deg,${P.blue},${P.navy})`, ...(center ? { margin: "0 auto 16px" } : {}) }} />
);

const BtnPrimary = ({ children, href }) => {
  const [h, setH] = useState(false);
  const s = { background: `linear-gradient(135deg,${h ? P.navy : P.blue},${h ? P.blue : P.navy})`, color: "#fff", border: "none", padding: "12px 24px", borderRadius: 50, fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer", boxShadow: `0 6px 24px ${P.blue}44`, transform: h ? "translateY(-2px)" : "none", transition: "all .25s ease", display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none" };
  return <a href={href} target="_blank" rel="noreferrer" onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={s}>{children}</a>;
};

/* ─── YouTube Modal ─── */
const PlayerModal = ({ playlistId, title, onClose }) => {
  useEffect(() => { document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = ""; }; }, []);
  useEffect(() => {
    const h = e => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h); return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  return (
    <div onClick={e => { if (e.target === e.currentTarget) onClose(); }}
      style={{ position: "fixed", inset: 0, zIndex: 3000, background: "rgba(3,7,18,0.93)", backdropFilter: "blur(14px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "20px" }}>
      <div style={{ width: "100%", maxWidth: 920, display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <div style={{ flex: 1, paddingRight: 16 }}>
          <div style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 4 }}>Voice of Tomorrow Podcast</div>
          <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1rem", color: "#fff", lineHeight: 1.3 }}>{title}</h3>
        </div>
        <button onClick={onClose} style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.18)", color: "#fff", cursor: "pointer", fontSize: "0.9rem" }}>✕</button>
      </div>
      <div style={{ width: "100%", maxWidth: 920, position: "relative", paddingBottom: "52%", height: 0, borderRadius: 16, overflow: "hidden" }}>
        <iframe src={`https://www.youtube.com/embed/videoseries?list=${playlistId}&autoplay=1`} title={title} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
      </div>
      <div style={{ display: "flex", gap: 10, marginTop: 14, flexWrap: "wrap", justifyContent: "center" }}>
        <a href={`https://www.youtube.com/playlist?list=${playlistId}`} target="_blank" rel="noreferrer" style={{ background: "#FF0000", color: "#fff", borderRadius: 50, padding: "8px 18px", fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.75rem", textDecoration: "none" }}>▶ Open on YouTube</a>
        <button onClick={onClose} style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.14)", borderRadius: 50, padding: "8px 16px", fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "0.75rem", cursor: "pointer" }}>✕ Close</button>
      </div>
    </div>
  );
};

/* ─── Hero Section ─── */
const Hero = ({ scrollTo }) => (
  <section style={{ minHeight: "100vh", position: "relative", display: "flex", flexDirection: "column", justifyContent: "center", overflow: "hidden" }}>
    <div style={{ position: "absolute", inset: 0, zIndex: 0, backgroundImage: `url("https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=1800")`, backgroundSize: "cover", backgroundPosition: "center 30%" }} />
    <div style={{ position: "absolute", inset: 0, zIndex: 1, background: `linear-gradient(135deg,rgba(46,49,146,0.85) 0%,rgba(10,12,40,0.8) 50%,rgba(31,153,237,0.6) 100%)` }} />
    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 100, zIndex: 2, background: "linear-gradient(to bottom,transparent,rgba(255,255,255,0.05))" }} />

    <div className="podcast-hero-grid" style={{ position: "relative", zIndex: 3, maxWidth: 1200, margin: "0 auto", width: "100%", padding: "70px 6vw 50px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2.5rem", alignItems: "center" }}>
      <div>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,0.12)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: 50, padding: "6px 16px", marginBottom: 24 }}>
          <span style={{ fontSize: "0.9rem" }}>🎙️</span>
          <div>
            <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)" }}>by</div>
            <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "#fff", letterSpacing: "0.05em" }}>ONEFOCUS AFRICA</div>
          </div>
        </div>

        <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(1.8rem,5vw,3rem)", fontWeight: 800, lineHeight: 1.1, color: "#fff", marginBottom: 14 }}>
          Stories that <span style={{ color: "#60c4ff" }}>Inspire</span>.
        </h1>
        <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(1.8rem,5vw,3rem)", fontWeight: 800, lineHeight: 1.1, color: "#fff", marginBottom: 14 }}>
          Voices that <span style={{ color: "#60c4ff" }}>Empower</span>.
        </h1>
        <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(1.8rem,5vw,3rem)", fontWeight: 800, lineHeight: 1.1, color: "#fff", marginBottom: 24 }}>
          Futures that <span style={{ color: "#a5f3fc" }}>Change Africa</span>.
        </h1>

        <p style={{ color: "rgba(255,255,255,0.78)", fontSize: "0.95rem", lineHeight: 1.8, maxWidth: 450, marginBottom: 28 }}>
          A purpose-driven podcast amplifying youth talent, visionary leaders, and business minds shaping Africa's future.
        </p>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 28 }}>
          <button onClick={scrollTo} style={{ background: `linear-gradient(135deg,${P.blue},${P.navy})`, color: "#fff", border: "none", padding: "12px 24px", borderRadius: 50, fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer", boxShadow: `0 6px 20px rgba(31,153,237,0.4)`, display: "inline-flex", alignItems: "center", gap: 8 }}>▶ Watch Episodes</button>
          <a href="https://www.youtube.com/@ONEFOCUSAFRICA" target="_blank" rel="noreferrer" style={{ background: "rgba(255,255,255,0.12)", color: "#fff", border: "1.5px solid rgba(255,255,255,0.35)", padding: "12px 20px", borderRadius: 50, fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none" }}>🎬 Our Channel</a>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 2, height: 28 }}>
            {[0, 0.1, 0.2, 0.15, 0.05].map((d, i) => (
              <div key={i} style={{ width: 3, borderRadius: 2, background: "linear-gradient(to top,#60c4ff,#ffffff)", animation: `wave 1.2s ease-in-out ${d}s infinite alternate` }} />
            ))}
          </div>
          <div>
            <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#fff" }}>31+ Episodes Live on YouTube</div>
            <div style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.6)" }}>3 Playlists · New episodes weekly</div>
          </div>
        </div>
      </div>

      <div style={{ background: "rgba(255,255,255,0.09)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: 24, overflow: "hidden", boxShadow: "0 24px 60px rgba(0,0,0,0.3)" }}>
        <div style={{ background: "rgba(255,255,255,0.08)", borderBottom: "1px solid rgba(255,255,255,0.12)", padding: "16px 20px", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 44, height: 44, borderRadius: "50%", background: `linear-gradient(135deg,${P.blue},${P.navy})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem" }}>🎙️</div>
          <div>
            <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "0.9rem", color: "#fff" }}>ONEFOCUS AFRICA</div>
            <div style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.55)", fontWeight: 600 }}>@ONEFOCUSAFRICA</div>
          </div>
          <div style={{ marginLeft: "auto", fontSize: "0.55rem", fontWeight: 800, background: "#FF0000", color: "#fff", borderRadius: 4, padding: "3px 6px" }}>▶ YOUTUBE</div>
        </div>
        <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.13em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>Podcast Playlists</div>
          {PLAYLISTS.map((pl) => (
            <a key={pl.id} href={pl.playlistUrl} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
              <div style={{ background: "rgba(255,255,255,0.07)", border: `1px solid ${pl.color}40`, borderLeft: `3px solid ${pl.color}`, borderRadius: 10, padding: "10px 12px", display: "flex", alignItems: "center", gap: 10, cursor: "pointer", transition: "background .2s" }}>
                <div style={{ width: 34, height: 34, borderRadius: "50%", background: `${pl.color}22`, border: `1px solid ${pl.color}50`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem" }}>{pl.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "0.75rem", color: "#fff" }}>{pl.label}</div>
                  <div style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.5)" }}>{pl.epCount} episodes</div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>

    <div style={{ position: "absolute", bottom: 20, left: "50%", transform: "translateX(-50%)", zIndex: 3, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, cursor: "pointer" }} onClick={scrollTo}>
      <div style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)" }}>Scroll to Watch</div>
      <div style={{ width: 20, height: 34, borderRadius: 10, border: "2px solid rgba(255,255,255,0.25)", display: "flex", justifyContent: "center", padding: "3px 0" }}>
        <div style={{ width: 3, height: 6, borderRadius: 2, background: "rgba(255,255,255,0.6)", animation: "scrollDot 1.8s ease infinite" }} />
      </div>
    </div>
  </section>
);

/* ─── About Section ─── */
const About = () => (
  <section style={{ padding: "4rem 6vw", background: P.offwhite }}>
    <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2.5rem", alignItems: "center" }}>
      <FadeUp>
        <div style={{ aspectRatio: "4/3", borderRadius: 20, position: "relative", overflow: "hidden", backgroundImage: "url(/po.png)", backgroundSize: "cover", backgroundPosition: "center" }}>
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)" }} />
          <div style={{ position: "relative", zIndex: 1, height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14, padding: "1.5rem" }}>
            <div style={{ fontSize: "3.5rem" }}>🎙️</div>
            <div style={{ background: P.white, borderRadius: 12, padding: "10px 18px", boxShadow: `0 6px 20px ${P.navy}14`, border: `1px solid ${P.blue}14`, textAlign: "center" }}>
              <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "0.85rem", color: P.black }}>Real Conversations</div>
              <div style={{ fontSize: "0.65rem", color: P.muted, marginTop: 2 }}>31+ episodes · 3 playlists</div>
            </div>
          </div>
        </div>
      </FadeUp>
      <FadeUp delay={0.1}>
        <SectionLabel>About the Podcast</SectionLabel>
        <AccentBar />
        <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(1.4rem,3vw,2rem)", fontWeight: 800, lineHeight: 1.2, color: P.black, marginBottom: 10 }}>Why Voice of Tomorrow Exists</h2>
        <p style={{ color: P.muted, fontSize: "0.9rem", lineHeight: 1.8, marginBottom: 20 }}>Voice of Tomorrow is more than a podcast — it is a platform for inspiration, learning, and real conversations that shape tomorrow's leaders.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
          {[["🔍","Discover & amplify African youth talent"],["🌉","Transfer wisdom across generations"],["💡","Equip youth with mindset & skills"],["🤝","Connect ideas to opportunities"]].map(([icon, text]) => (
            <div key={text} style={{ display: "flex", alignItems: "center", gap: 10, background: P.white, borderRadius: 10, padding: "8px 12px", border: `1px solid ${P.border}` }}>
              <span style={{ width: 28, height: 28, borderRadius: "50%", background: `${P.blue}10`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem" }}>{icon}</span>
              <span style={{ fontWeight: 500, color: P.dark, fontSize: "0.8rem" }}>{text}</span>
            </div>
          ))}
        </div>
        <BtnPrimary href="https://www.youtube.com/@ONEFOCUSAFRICA">▶ Watch on YouTube</BtnPrimary>
      </FadeUp>
    </div>
  </section>
);

/* ─── Episodes Section ─── */
const PlaylistCard = ({ pl }) => {
  const [playAll, setPlayAll] = useState(false);
  return (
    <div style={{ background: P.white, border: `1.5px solid ${pl.color}22`, borderRadius: 18, overflow: "hidden", boxShadow: `0 4px 24px ${pl.color}0e` }}>
      <div style={{ background: `linear-gradient(135deg, ${pl.color}, ${P.navy})`, padding: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(255,255,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem" }}>{pl.icon}</div>
          <div>
            <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "0.8rem", color: "#fff" }}>{pl.shortTitle}</div>
            <div style={{ fontSize: "0.55rem", color: "rgba(255,255,255,0.6)" }}>{pl.epCount} episodes</div>
          </div>
        </div>
        {pl.description && (
          <p style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.75)", marginTop: 8, lineHeight: 1.5 }}>{pl.description}</p>
        )}
      </div>
      <div style={{ padding: "6px 10px", background: P.offwhite, display: "flex", gap: 6 }}>
        <button onClick={() => setPlayAll(true)} style={{ flex: 1, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 5, background: "#FF0000", color: "#fff", border: "none", borderRadius: 50, padding: "6px 10px", fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.7rem", cursor: "pointer" }}>▶ Play All</button>
        <a href={pl.playlistUrl} target="_blank" rel="noreferrer" style={{ flex: 1, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 4, background: "transparent", color: pl.color, border: `1.5px solid ${pl.color}40`, borderRadius: 50, padding: "6px 10px", fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.7rem", textDecoration: "none" }}>🔗 YouTube</a>
      </div>
      <div style={{ position: "relative", paddingBottom: "56%", height: 0 }}>
        <iframe src={`https://www.youtube.com/embed/videoseries?list=${pl.playlistId}&rel=0&modestbranding=1`} title={pl.fullTitle} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy" />
      </div>
      {playAll && <PlayerModal playlistId={pl.playlistId} title={pl.fullTitle} onClose={() => setPlayAll(false)} />}
    </div>
  );
};

const EpisodesSection = () => (
  <section id="episodes" style={{ padding: "4rem 6vw", background: P.white }}>
    <div style={{ maxWidth: 1320, margin: "0 auto" }}>
      <FadeUp style={{ textAlign: "center", marginBottom: 36 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: P.blue, background: `${P.blue}12`, border: `1px solid ${P.blue}28`, borderRadius: 50, padding: "5px 14px", marginBottom: 12 }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: P.blue }} />All Episodes
        </div>
        <div style={{ width: 40, height: 3, borderRadius: 2, background: `linear-gradient(90deg,${P.blue},${P.navy})`, margin: "0 auto 14px" }} />
        <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(1.4rem,3vw,2rem)", fontWeight: 800, color: P.black, marginBottom: 10 }}>Browse by Category</h2>
        <p style={{ color: P.muted, fontSize: "0.9rem", lineHeight: 1.8, maxWidth: 450, margin: "0 auto" }}>Three playlists. 31+ episodes. All live on YouTube.</p>
      </FadeUp>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
        {PLAYLISTS.map((pl, i) => (
          <FadeUp key={pl.id} delay={i * 0.1}>
            <PlaylistCard pl={pl} />
          </FadeUp>
        ))}
      </div>
    </div>
  </section>
);

/* ─── Become Guest Section ─── */
const BecomeGuest = () => {
  const [h, setH] = useState(false);
  return (
    <section style={{ padding: "4rem 6vw", background: P.offwhite }}>
      <div style={{ maxWidth: 650, margin: "0 auto" }}>
        <FadeUp>
          <div style={{ background: P.white, border: `1.5px solid ${P.blue}20`, borderRadius: 20, padding: "2.5rem", textAlign: "center", boxShadow: `0 16px 48px ${P.blue}10` }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg,${P.blue},${P.navy})` }} />
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(1.4rem,3vw,1.8rem)", fontWeight: 800, color: P.black, lineHeight: 1.2, marginBottom: 12 }}>Inspire Africa's<br /><GradText>Next Generation</GradText></h2>
            <p style={{ color: P.muted, fontSize: "0.9rem", lineHeight: 1.8, maxWidth: 400, margin: "0 auto 20px" }}>Are you a young talent, professional, or visionary business leader? Share your journey.</p>
            <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap", marginBottom: 20 }}>
              {["🎓 Young Talent", "👔 Professional", "🚀 Business"].map(label => (
                <span key={label} style={{ background: P.offwhite, border: `1px solid ${P.border}`, borderRadius: 50, padding: "5px 12px", fontSize: "0.7rem", fontWeight: 500 }}>{label}</span>
              ))}
            </div>
            <a href="https://linktr.ee/onefocusafrica" target="_blank" rel="noreferrer" onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ background: `linear-gradient(135deg,${h ? P.navy : P.blue},${h ? P.blue : P.navy})`, color: "#fff", border: "none", padding: "12px 28px", borderRadius: 50, fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.9rem", cursor: "pointer", boxShadow: `0 6px 20px ${P.blue}44`, transform: h ? "translateY(-2px)" : "none", transition: "all .25s ease", textDecoration: "none", display: "inline-block" }}>📩 Apply to Be a Guest</a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
};

/* ─── Community Section ─── */
const Community = () => (
  <section style={{ padding: "3.5rem 6vw", background: `linear-gradient(135deg,${P.navy} 0%,${P.blue} 100%)`, position: "relative", overflow: "hidden" }}>
    <FadeUp>
      <div style={{ maxWidth: 550, margin: "0 auto", textAlign: "center" }}>
        <div style={{ fontSize: "2rem", marginBottom: 14 }}>🌍</div>
        <div style={{ display: "inline-block", background: "rgba(255,255,255,0.14)", border: "1px solid rgba(255,255,255,0.28)", borderRadius: 50, padding: "4px 12px", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.13em", textTransform: "uppercase", color: "#fff", marginBottom: 14 }}>Join the Movement</div>
        <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(1.4rem,3vw,1.8rem)", fontWeight: 800, color: "#fff", lineHeight: 1.2, marginBottom: 12 }}>Be Part of Africa's<br />Youth Revolution</h2>
        <p style={{ color: "rgba(255,255,255,0.78)", fontSize: "0.9rem", lineHeight: 1.8, marginBottom: 24 }}>Support our mission to inspire the next generation of African leaders.</p>
        <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
          {[
            { icon: "🔔", label: "Subscribe", href: "https://www.youtube.com/@ONEFOCUSAFRICA", solid: true },
            { icon: "☕", label: "Support", href: "https://buymeacoffee.com/onefocusafrica", solid: false },
            { icon: "📱", label: "Follow", href: "https://www.instagram.com/onefocusafrica", solid: false },
          ].map(({ icon, label, href, solid }) => {
            const [h, setH] = useState(false);
            return (
              <a key={label} href={href} target="_blank" rel="noreferrer" onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ background: solid ? "#fff" : "rgba(255,255,255,0.13)", color: solid ? P.blue : "#fff", border: solid ? "none" : "2px solid rgba(255,255,255,0.4)", borderRadius: 50, padding: "10px 18px", fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.8rem", transform: h ? "translateY(-2px)" : "none", transition: "all .25s ease", display: "inline-flex", alignItems: "center", gap: 6, textDecoration: "none" }}>
                {icon} {label}
              </a>
            );
          })}
        </div>
      </div>
    </FadeUp>
  </section>
);

/* ─── Main Component ─── */
export default function VoiceOfTomorrowPodcast() {
  const scrollTo = () => document.getElementById("episodes")?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { font-family: 'DM Sans', sans-serif; background: #fff; overflow-x: hidden; }
        @keyframes fu { from{opacity:0;transform:translateY(34px)}to{opacity:1;transform:none} }
        @keyframes wave { from{height:6px}to{height:24px} }
        @keyframes scrollDot { 0%{transform:translateY(0);opacity:1} 80%{transform:translateY(12px);opacity:0} 100%{transform:translateY(0);opacity:0} }
        ::-webkit-scrollbar { width: 5px }
        ::-webkit-scrollbar-track { background: #f4f8fc }
        ::-webkit-scrollbar-thumb { background: #1f99ed44; border-radius: 3px }
        
        /* Responsive Styles */
        @media (max-width: 768px) {
          .podcast-hero-grid { grid-template-columns: 1fr !important; }
          .podcast-about-grid { grid-template-columns: 1fr !important; }
          .podcast-episodes-grid { grid-template-columns: 1fr !important; }
          .podcast-hero-content { padding: 60px 4vw 40px !important; }
          .podcast-section { padding: 3rem 4vw !important; }
          .podcast-quick-links { gap: 6px !important; }
          .podcast-quick-links a { padding: 5px 10px !important; font-size: 0.65rem !important; }
          .podcast-hero-card { margin-top: 2rem !important; }
          .podcast-h1 { font-size: 1.6rem !important; }
          .podcast-hero-btn { padding: 10px 18px !important; font-size: 0.8rem !important; }
          .podcast-community-btns { gap: 8px !important; }
          .podcast-community-btns a { padding: 8px 14px !important; font-size: 0.75rem !important; }
        }
        
        @media (min-width: 769px) and (max-width: 1024px) {
          .podcast-hero-grid { grid-template-columns: 1fr 1fr !important; gap: 1.5rem !important; }
          .podcast-about-grid { grid-template-columns: 1fr 1fr !important; gap: 2rem !important; }
          .podcast-episodes-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .podcast-h1 { font-size: 2rem !important; }
        }
        
        @media (min-width: 1025px) {
          .podcast-hero-grid { grid-template-columns: 1.1fr 1fr !important; gap: 3rem !important; }
          .podcast-h1 { font-size: 2.8rem !important; }
        }
      `}</style>

      <QuickLinks />
      <Hero scrollTo={scrollTo} />
      <About />
      <EpisodesSection />
      <BecomeGuest />
      <Community />
    </>
  );
}
