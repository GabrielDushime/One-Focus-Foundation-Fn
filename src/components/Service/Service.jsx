import { useState, useEffect, useRef } from "react";

/* ══════════════════════════════════════════════════════════════════
   BRAND TOKENS
   Primary Blue  : #1f99ed
   Deep Navy     : #2e3192
   White         : #ffffff
   Off-White bg  : #f7f9fc
   Dark text     : #111827
   Mid text      : #4b5563
   Light border  : #e5eaf2
══════════════════════════════════════════════════════════════════ */

/* ── Youth Services ─────────────────────────────────────────────── */
const services = [
  {
    id: "01",
    icon: "🔍",
    title: "Discover Potential",
    tagline: "Uncover strengths & career direction",
    color: "#1f99ed",
    light: "#e8f5fd",
    description:
      "We help young people uncover their strengths and career direction through intelligent, human-centred tools and inspiring real-world exposure.",
    items: [
      { title: "AI Talent Companion (INZIRA AI)", desc: "An AI-powered platform that helps students identify strengths, explore career paths, and get personalized learning recommendations." },
      { title: "Talent Discovery & Career Assessments", desc: "Structured tools to uncover natural abilities and align them with real-world opportunities." },
      { title: "Career Guidance & Clarity Sessions", desc: "One-on-one and group sessions that help youth move from confusion to clarity to confidence." },
      { title: "School Outreach & Dream Career Talks", desc: "Inspiring programs delivered directly in schools to expose students to diverse career pathways." },
      { title: "Voice of Tomorrow Podcast Inspiration", desc: "A storytelling platform amplifying youth voices and professional journeys to inspire action." },
    ],
  },
  {
    id: "02",
    icon: "🛠️",
    title: "Develop Skills",
    tagline: "Practical, future-ready training",
    color: "#2e3192",
    light: "#ebebf7",
    description:
      "We equip youth with practical, future-ready skills that are in demand in today's rapidly evolving economy.",
    items: [
      { title: "Digital & Technology Training", desc: "Foundational and advanced digital skills for the modern workforce." },
      { title: "AI & Emerging Tech Programs", desc: "Future-ready learning focused on innovation and technology trends." },
      { title: "Multimedia Training", desc: "Photography, videography, and professional video editing." },
      { title: "Graphic Design & Branding", desc: "Creative design and visual communication skills for the digital age." },
      { title: "Social Media Management", desc: "Content strategy, growth systems, and digital brand positioning." },
      { title: "Entrepreneurship & Innovation", desc: "From idea validation to building sustainable ventures." },
      { title: "Leadership & Personal Development", desc: "Confidence-building, mindset, and leadership frameworks." },
      { title: "Public Speaking & Confidence Building", desc: "Communication, storytelling, and stage presence training." },
      { title: "CV Writing & Interview Preparation", desc: "Professional readiness skills for entering the job market." },
    ],
  },
  {
    id: "03",
    icon: "🤝",
    title: "Connect to Mentorship & Industry",
    tagline: "Bridge learning & real-world success",
    color: "#1f99ed",
    light: "#e8f5fd",
    description:
      "We bridge the gap between education and employment through direct mentorship, industry partnerships, and scalable institutional programs.",
    items: [
      { title: "One-on-One Mentor Matching", desc: "Direct connection with experienced industry professionals aligned with career goals." },
      { title: "Group Mentorship Programs", desc: "Cohort-based mentoring circles with industry leaders and professionals." },
      { title: "Industry Expert Talks", desc: "Live sessions with real-world professionals sharing insights and career paths." },
      { title: "Corporate Training Programs", desc: "Customized training solutions for companies investing in youth talent." },
      { title: "Institutional Workshops", desc: "Tailored workshops delivered within schools, universities, and NGOs." },
      { title: "AI Platform Licensing for Schools & Government", desc: "Scalable INZIRA AI deployment for institutions and national programs." },
    ],
  },
  {
    id: "04",
    icon: "🎤",
    title: "Elevate & Expose Talent",
    tagline: "Visibility, growth & opportunity",
    color: "#2e3192",
    light: "#ebebf7",
    description:
      "We provide powerful platforms for visibility, growth, and real-world opportunity — giving youth the exposure they deserve.",
    items: [
      { title: "Youth Showcases & Business Pitch Events", desc: "Platforms for students to present ideas and gain industry feedback." },
      { title: "Community Meetups & Networking", desc: "Monthly youth networking and empowerment sessions." },
      { title: "Internship Placement Support", desc: "Bridging education and employment through practical work experience." },
      { title: "Practical Training & Portfolio Development", desc: "Hands-on projects that build job-ready, industry-standard portfolios." },
      { title: "Holiday Bootcamps & Intensive Skill Camps", desc: "Accelerated learning programs with measurable, real outcomes." },
      { title: "Student Exhibitions & End-of-Term Showcases", desc: "Public celebrations of youth talent, creativity, and achievement." },
    ],
  },
];

/* ── Business / Commercial Services ────────────────────────────── */
const bizServices = [
  {
    id: "B1",
    icon: "💻",
    title: "Software for SMEs",
    tagline: "Custom digital tools built for small & medium businesses",
    color: "#1f99ed",
    light: "#e8f5fd",
    description:
      "We design and develop affordable, tailored software solutions that help small and medium enterprises streamline operations, manage clients, and grow digitally — from simple web apps to full business management systems.",
    items: [
      { title: "Business Management Systems", desc: "Custom dashboards to track sales, inventory, and operations in one place." },
      { title: "Web Application Development", desc: "Lightweight, fast, and mobile-friendly web apps built for your workflow." },
      { title: "Client & CRM Portals", desc: "Manage customers, bookings, and communications efficiently." },
      { title: "E-commerce & Online Stores", desc: "Fully functional online stores with payment integration." },
      { title: "Automation & Workflow Tools", desc: "Save time by automating repetitive business tasks." },
    ],
  },
  {
    id: "B2",
    icon: "📸",
    title: "Photography Service",
    tagline: "Professional photography for every occasion",
    color: "#2e3192",
    light: "#ebebf7",
    description:
      "Our professional photography team captures your brand, events, and moments with precision and creativity — delivering stunning visuals that tell your story and elevate your presence.",
    items: [
      { title: "Corporate & Brand Photography", desc: "Professional headshots, team photos, and brand imagery." },
      { title: "Event Photography", desc: "Conferences, graduations, launches, and community events." },
      { title: "Product Photography", desc: "Clean, high-quality product images for e-commerce and marketing." },
      { title: "Portrait & Lifestyle Photography", desc: "Personal and storytelling-focused portrait sessions." },
      { title: "Photo Editing & Retouching", desc: "Professional post-production for flawless final images." },
    ],
  },
  {
    id: "B3",
    icon: "🎬",
    title: "Videography Service",
    tagline: "Cinematic storytelling for your brand & events",
    color: "#1f99ed",
    light: "#e8f5fd",
    description:
      "We produce high-quality video content that captures attention, builds trust, and drives results — from event coverage to full brand films, we bring your vision to life through the lens.",
    items: [
      { title: "Event Videography", desc: "Full coverage of conferences, ceremonies, launches, and activations." },
      { title: "Brand & Corporate Films", desc: "Professional company profile and brand story videos." },
      { title: "Social Media Video Content", desc: "Short-form, engaging videos optimized for Instagram, TikTok, and YouTube." },
      { title: "Documentary & Storytelling", desc: "Compelling narratives that humanize your brand or cause." },
      { title: "Video Editing & Post-Production", desc: "Professional color grading, sound design, and motion graphics." },
    ],
  },
  {
    id: "B4",
    icon: "🎨",
    title: "Graphic Design & Social Media Management",
    tagline: "Visual identity & consistent online presence",
    color: "#2e3192",
    light: "#ebebf7",
    description:
      "We create bold, on-brand visuals and manage your social media channels so you can focus on running your business while we build your digital audience and brand consistency.",
    items: [
      { title: "Logo & Brand Identity Design", desc: "Memorable logos, color palettes, and complete brand guidelines." },
      { title: "Marketing Collateral", desc: "Flyers, posters, banners, brochures, and digital assets." },
      { title: "Social Media Content Creation", desc: "Scroll-stopping graphics and captions tailored to each platform." },
      { title: "Social Media Strategy & Scheduling", desc: "Content calendars, platform management, and audience growth plans." },
      { title: "Community Management", desc: "Engaging with your audience to build loyalty and trust." },
    ],
  },
  {
    id: "B5",
    icon: "📊",
    title: "Digital Marketing & Branding",
    tagline: "Grow your reach, leads, and revenue online",
    color: "#1f99ed",
    light: "#e8f5fd",
    description:
      "We develop and execute data-driven digital marketing strategies that amplify your brand, attract the right audience, and convert them into loyal customers — across every relevant digital channel.",
    items: [
      { title: "Brand Strategy & Positioning", desc: "Defining your unique voice, values, and market positioning." },
      { title: "Search Engine Optimization (SEO)", desc: "Ranking your business higher on Google and search engines." },
      { title: "Paid Advertising (Meta & Google Ads)", desc: "Targeted ad campaigns that deliver measurable ROI." },
      { title: "Email Marketing Campaigns", desc: "Automated sequences and newsletters that nurture leads." },
      { title: "Analytics & Performance Reporting", desc: "Monthly reports to track growth, engagement, and conversions." },
    ],
  },
];

const whoWeServe = [
  {label: "Schools & TVET Institutions" },
  {label: "Universities" },
  {label: "NGOs & Youth Organizations" },
  { label: "Corporates & Companies" },
  { label: "Ministries & Government Institutions" },
];

const whyUs = [
  {text: "AI-powered personalized guidance" },
  {text: "Real mentorship ecosystem" },
  {text: "Media & exposure platforms" },
  { text: "Scalable institutional programs" },
  { text: "Long-term youth talent pipeline" },
];

const slides = [
  {
    url: "ss.png",
    label: "Youth Skills Workshop",
    sub: "Hands-on training in action",
    color: "#1f99ed",
  },
  {
    url: "/_NIY9477.JPG",
    label: "Mentorship & Collaboration",
    sub: "Real connections, real growth",
    color: "#2e3192",
  },
  {
    url: "Rwanda.jpg",
    label: "AI & Technology Programs",
    sub: "Future-ready learning",
    color: "#1f99ed",
  },
  {
    url: "/_NIY1687.JPG",
    label: "Youth Showcases & Events",
    sub: "Elevating African talent",
    color: "#2e3192",
  },
];

/* ── useInView ──────────────────────────────────────────────────── */
function useInView(threshold = 0.1) {
  const [visible, setVisible] = useState(false);
  const ref = useRef();
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

/* ── Modal ──────────────────────────────────────────────────────── */
function ServiceModal({ service, onClose }) {
  useEffect(() => {
    const h = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", h);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", h); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 2000,
      background: "rgba(17,24,39,.55)", backdropFilter: "blur(16px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 24, animation: "mFadeIn .2s ease",
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "#fff",
        borderRadius: 24, maxWidth: 600, width: "100%",
        maxHeight: "88vh", overflowY: "auto",
        padding: "44px 40px", position: "relative",
        boxShadow: "0 32px 80px rgba(0,0,0,.18)",
        animation: "mSlideUp .32s cubic-bezier(.23,1,.32,1)",
        border: `2px solid ${service.color}`,
      }}>
        {/* colored top bar */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 5,
          borderRadius: "22px 22px 0 0",
          background: `linear-gradient(90deg, ${service.color}, #2e3192)`,
        }} />

        {/* close */}
        <button onClick={onClose} style={{
          position: "absolute", top: 18, right: 18,
          background: "#f3f4f6", border: "none",
          borderRadius: "50%", width: 36, height: 36,
          color: "#6b7280", fontSize: 14, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all .2s", fontFamily: "sans-serif",
        }}
          onMouseEnter={e => { e.currentTarget.style.background = service.color; e.currentTarget.style.color = "#fff"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "#f3f4f6"; e.currentTarget.style.color = "#6b7280"; }}
        >✕</button>

        {/* header */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 10, marginTop: 8 }}>
          <div style={{
            fontSize: 30, width: 58, height: 58, borderRadius: 16,
            background: service.light, border: `2px solid ${service.color}30`,
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>{service.icon}</div>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".14em", color: service.color, fontFamily: "'Space Mono',monospace", marginBottom: 5 }}>
              SERVICE {service.id}
            </div>
            <h2 style={{ margin: 0, fontSize: "clamp(17px,2.4vw,22px)", fontWeight: 800, color: "#111827", fontFamily: "'Syne',sans-serif", lineHeight: 1.2 }}>
              {service.title}
            </h2>
          </div>
        </div>

        <p style={{ fontSize: 13, color: service.color, fontWeight: 600, fontStyle: "italic", margin: "0 0 14px" }}>
          {service.tagline}
        </p>
        <p style={{ fontSize: 15, color: "#4b5563", lineHeight: 1.8, margin: "0 0 28px", paddingBottom: 24, borderBottom: "1px solid #e5eaf2" }}>
          {service.description}
        </p>

        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".14em", color: "#9ca3af", fontFamily: "'Space Mono',monospace", marginBottom: 14 }}>
          WHAT'S INCLUDED
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {service.items.map((item, i) => (
            <div key={i} style={{
              background: service.light,
              border: `1px solid ${service.color}25`,
              borderLeft: `4px solid ${service.color}`,
              borderRadius: 12, padding: "13px 16px",
            }}>
              <div style={{ fontSize: 13.5, fontWeight: 700, color: "#111827", marginBottom: 4, fontFamily: "'Syne',sans-serif" }}>{item.title}</div>
              <div style={{ fontSize: 12.5, color: "#6b7280", lineHeight: 1.65 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Service Card ───────────────────────────────────────────────── */
function ServiceCard({ service, index, onOpen }) {
  const [ref, visible] = useInView();
  const [hovered, setHovered] = useState(false);

  return (
    <div ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "#fff" : "#fff",
        border: `1.5px solid ${hovered ? service.color : "#e5eaf2"}`,
        borderRadius: 20, padding: "30px 26px",
        transition: "all .35s cubic-bezier(.23,1,.32,1)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transitionDelay: `${index * .08}s`,
        position: "relative", overflow: "hidden",
        display: "flex", flexDirection: "column",
        boxShadow: hovered
          ? `0 20px 50px ${service.color}18, 0 4px 16px rgba(0,0,0,.06)`
          : "0 2px 12px rgba(0,0,0,.05)",
      }}
    >
      {/* top color bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 4,
        background: `linear-gradient(90deg,${service.color},#2e3192)`,
        borderRadius: "18px 18px 0 0",
        opacity: hovered ? 1 : 0.4,
        transition: "opacity .3s",
      }} />

      {/* watermark */}
      <div style={{
        position: "absolute", bottom: -10, right: 16,
        fontSize: 80, fontWeight: 900,
        color: hovered ? `${service.color}08` : "#f3f4f6",
        fontFamily: "'Syne',sans-serif", lineHeight: 1,
        pointerEvents: "none", userSelect: "none",
        transition: "color .3s",
      }}>{service.id}</div>

      {/* icon + title */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 16, marginTop: 8 }}>
        <div style={{
          fontSize: 26, width: 54, height: 54, borderRadius: 14,
          background: hovered ? service.color : service.light,
          border: `2px solid ${hovered ? service.color : service.color + "30"}`,
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          transition: "all .3s",
          transform: hovered ? "scale(1.06) rotate(-3deg)" : "scale(1)",
        }}>{service.icon}</div>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".14em", color: service.color, fontFamily: "'Space Mono',monospace", marginBottom: 5 }}>
            SERVICE {service.id}
          </div>
          <h3 style={{
            margin: 0, fontSize: "clamp(15px,1.7vw,17px)",
            fontWeight: 800, color: "#111827", lineHeight: 1.3,
            fontFamily: "'Syne',sans-serif",
            transition: "color .3s",
          }}>{service.title}</h3>
        </div>
      </div>

      {/* tagline */}
      <p style={{ fontSize: 12.5, color: service.color, fontWeight: 600, fontStyle: "italic", margin: "0 0 10px" }}>
        {service.tagline}
      </p>

      {/* description */}
      <p style={{ fontSize: 14, color: "#4b5563", lineHeight: 1.75, margin: "0 0 18px", flex: 1 }}>
        {service.description}
      </p>

      {/* bullets */}
      <div style={{ display: "flex", flexDirection: "column", gap: 7, marginBottom: 22 }}>
        {service.items.slice(0, 3).map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 13, color: "#374151" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: service.color, flexShrink: 0 }} />
            {item.title}
          </div>
        ))}
        {service.items.length > 3 && (
          <div style={{ fontSize: 12, color: "#9ca3af", paddingLeft: 15 }}>+{service.items.length - 3} more services…</div>
        )}
      </div>

      {/* CTA */}
      <button onClick={() => onOpen(service)} style={{
        alignSelf: "flex-start",
        display: "flex", alignItems: "center", gap: 8,
        background: hovered ? service.color : "transparent",
        border: `1.5px solid ${service.color}`,
        borderRadius: 100, padding: "10px 24px",
        color: hovered ? "#fff" : service.color,
        fontSize: 13, fontWeight: 700,
        fontFamily: "'Syne',sans-serif", cursor: "pointer",
        transition: "all .25s", letterSpacing: ".03em",
      }}
        onMouseEnter={e => { e.currentTarget.style.background = service.color; e.currentTarget.style.color = "#fff"; }}
        onMouseLeave={e => {
          if (!hovered) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = service.color; }
        }}
      >
        Read More →
      </button>
    </div>
  );
}

/* ── HeroSection ────────────────────────────────────────────────── */
function HeroSection({ heroVis }) {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setAnimating(true);
      setTimeout(() => { setCurrent(c => (c + 1) % slides.length); setAnimating(false); }, 500);
    }, 4200);
    return () => clearInterval(t);
  }, []);

  const goTo = (i) => {
    if (i === current) return;
    setAnimating(true);
    setTimeout(() => { setCurrent(i); setAnimating(false); }, 400);
  };

  const slide = slides[current];

  return (
    <section style={{
      padding: "100px clamp(20px,5vw,80px) 80px",
      background: "linear-gradient(135deg, #f0f7ff 0%, #ffffff 50%, #eef0fa 100%)",
      position: "relative", overflow: "hidden",
      minHeight: "100vh", display: "flex", alignItems: "center",
      borderBottom: "1px solid #e5eaf2",
    }}>
      {/* decorative circles */}
      <div style={{ position:"absolute", top:-120, right:-120, width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle,#1f99ed08 0%,transparent 70%)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:-80, left:-80, width:380, height:380, borderRadius:"50%", background:"radial-gradient(circle,#2e319208 0%,transparent 70%)", pointerEvents:"none" }} />
      {/* grid dots */}
      <div style={{
        position:"absolute", inset:0, opacity:.4,
        backgroundImage:"radial-gradient(#2e319212 1px,transparent 1px)",
        backgroundSize:"32px 32px", pointerEvents:"none",
      }} />

      <div className="hero-grid" style={{ maxWidth: 1160, margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(40px,5vw,80px)", alignItems: "center" }}>

          {/* LEFT */}
          <div style={{
            opacity: heroVis ? 1 : 0,
            transform: heroVis ? "translateX(0)" : "translateX(-50px)",
            transition: "all 1s cubic-bezier(.23,1,.32,1)",
          }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "#e8f5fd", border: "1.5px solid #1f99ed40",
              borderRadius: 100, padding: "7px 18px", marginBottom: 28,
            }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#1f99ed", letterSpacing: ".12em", fontFamily: "'Space Mono',monospace" }}>
                OUR SERVICES
              </span>
            </div>

            <h1 style={{
              fontSize: "clamp(32px,4.5vw,62px)", fontWeight: 800,
              fontFamily: "'Syne',sans-serif", lineHeight: 1.08,
              letterSpacing: "-.025em", marginBottom: 20,
            }}>
              <span style={{ color: "#111827" }}>Empowering<br />Africa's Youth</span><br />
              <span style={{
                background: "linear-gradient(120deg,#1f99ed 0%,#2e3192 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>Through One<br />Powerful Ecosystem</span>
            </h1>

            <p style={{ fontSize: "clamp(14px,1.5vw,17px)", color: "#4b5563", lineHeight: 1.85, marginBottom: 32, maxWidth: 460 }}>
              At ONEFOCUS AFRICA, we don't just offer programs, we build a complete youth empowerment pipeline that guides talent from discovery to opportunity.
            </p>

            {/* live slide label */}
            <div style={{
              display: "flex", alignItems: "center", gap: 12, marginBottom: 30,
              opacity: animating ? 0 : 1,
              transform: animating ? "translateY(6px)" : "translateY(0)",
              transition: "all .4s ease",
            }}>
              <div style={{ width: 4, height: 40, borderRadius: 4, background: `linear-gradient(180deg,${slide.color},#2e3192)`, flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#111827", fontFamily: "'Syne',sans-serif" }}>{slide.label}</div>
                <div style={{ fontSize: 12, color: "#6b7280" }}>{slide.sub}</div>
              </div>
            </div>

            <div className="hero-buttons" style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 32 }}>
              <a href="https://linktr.ee/onefocusafrica" target="_blank" rel="noreferrer" style={{
                padding: "13px 30px", borderRadius: 100,
                background: "linear-gradient(135deg,#1f99ed,#2e3192)",
                border: "none", color: "#fff", fontSize: 14, fontWeight: 700,
                fontFamily: "'Syne',sans-serif", cursor: "pointer", transition: "all .3s",
                boxShadow: "0 6px 24px #1f99ed30",
                textDecoration: "none", display: "inline-block",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 36px #1f99ed40"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 6px 24px #1f99ed30"; }}
              >
                Book a Consultation
              </a>
              <a href="https://linktr.ee/onefocusafrica" target="_blank" rel="noreferrer" style={{
                padding: "13px 30px", borderRadius: 100,
                background: "transparent", border: "2px solid #2e3192",
                color: "#2e3192", fontSize: 14, fontWeight: 700,
                fontFamily: "'Syne',sans-serif", cursor: "pointer", transition: "all .3s",
                textDecoration: "none", display: "inline-block",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "#2e3192"; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#2e3192"; }}
              >
                Become a Partner
              </a>
            </div>

            {/* dots */}
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              {slides.map((s, i) => (
                <button key={i} onClick={() => goTo(i)} style={{
                  width: current === i ? 28 : 8, height: 8, borderRadius: 100,
                  background: current === i ? s.color : "#d1d5db",
                  border: "none", cursor: "pointer",
                  transition: "all .4s cubic-bezier(.23,1,.32,1)", padding: 0,
                  boxShadow: current === i ? `0 0 10px ${s.color}60` : "none",
                }} />
              ))}
            </div>
          </div>

          {/* RIGHT — slideshow */}
          <div style={{
            opacity: heroVis ? 1 : 0,
            transform: heroVis ? "translateX(0)" : "translateX(50px)",
            transition: "all 1s cubic-bezier(.23,1,.32,1) .2s",
          }}>
            {/* frame */}
            <div style={{
              borderRadius: 24, overflow: "hidden", aspectRatio: "4/3",
              border: `3px solid ${slide.color}`,
              boxShadow: `0 30px 80px ${slide.color}25, 0 8px 24px rgba(0,0,0,.1)`,
              position: "relative", transition: "border-color 1s, box-shadow 1s",
            }}>
              <img src={slide.url} alt={slide.label} style={{
                width: "100%", height: "100%", objectFit: "cover", display: "block",
                opacity: animating ? 0 : 1,
                transform: animating ? "scale(1.04)" : "scale(1)",
                transition: "opacity .5s, transform .5s",
              }} />
              {/* dark overlay */}
              <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(17,24,39,.7) 0%,transparent 55%)" }} />

              {/* caption */}
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0, padding: "22px 24px",
                opacity: animating ? 0 : 1,
                transform: animating ? "translateY(8px)" : "translateY(0)",
                transition: "all .5s ease .1s",
              }}>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 7,
                  background: "rgba(255,255,255,.15)", backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,.3)",
                  borderRadius: 100, padding: "5px 14px", marginBottom: 8,
                }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff" }} />
                  <span style={{ fontSize: 10, fontWeight: 700, color: "#fff", letterSpacing: ".1em", fontFamily: "'Space Mono',monospace" }}>ONEFOCUS AFRICA</span>
                </div>
                <div style={{ fontSize: 17, fontWeight: 800, color: "#fff", fontFamily: "'Syne',sans-serif" }}>{slide.label}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,.75)", marginTop: 2 }}>{slide.sub}</div>
              </div>

              {/* counter */}
              <div style={{
                position: "absolute", top: 16, right: 16,
                background: "rgba(255,255,255,.9)", backdropFilter: "blur(8px)",
                borderRadius: 100, padding: "5px 12px",
                fontSize: 11, fontWeight: 700, color: "#111827",
                fontFamily: "'Space Mono',monospace",
              }}>
                {String(current + 1).padStart(2,"0")} / {String(slides.length).padStart(2,"0")}
              </div>
            </div>

            {/* thumbnails */}
            <div style={{ display: "flex", gap: 10, marginTop: 14, justifyContent: "center" }}>
              {slides.map((s, i) => (
                <div key={i} onClick={() => goTo(i)} style={{
                  width: 64, height: 46, borderRadius: 10, overflow: "hidden",
                  border: `2.5px solid ${current === i ? s.color : "#e5eaf2"}`,
                  cursor: "pointer", transition: "all .3s",
                  opacity: current === i ? 1 : 0.55,
                  transform: current === i ? "scale(1.06)" : "scale(1)",
                  flexShrink: 0,
                  boxShadow: current === i ? `0 4px 14px ${s.color}30` : "none",
                }}>
                  <img src={s.url} alt="" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", pointerEvents:"none" }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Main ───────────────────────────────────────────────────────── */
export default function ServicesSection() {
  const [selected, setSelected] = useState(null);
  const [heroVis, setHeroVis] = useState(false);

  useEffect(() => { const t = setTimeout(() => setHeroVis(true), 100); return () => clearTimeout(t); }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Space+Mono:wght@400;700&family=DM+Sans:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #f7f9fc; }
        ::-webkit-scrollbar-thumb { background: #1f99ed; border-radius: 4px; }
        @keyframes mFadeIn { from{opacity:0} to{opacity:1} }
        @keyframes mSlideUp { from{opacity:0;transform:translateY(40px) scale(.97)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes sectionIn { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        
        /* Responsive Styles */
        @media (max-width: 768px) {
          .hero-grid > div { grid-template-columns: 1fr !important; gap: 30px !important; }
          .hero-grid { padding: 80px 4vw 40px !important; }
          .why-section > div { grid-template-columns: 1fr !important; gap: 40px !important; }
          nav { padding: 0 4vw !important; }
          nav .desktop-nav { display: none !important; }
          section { padding: 60px 4vw !important; }
          .hero-buttons { flex-direction: column !important; gap: 12px !important; align-items: flex-start !important; }
          .hero-buttons a { width: 100% !important; max-width: 280px !important; text-align: center !important; }
          .cta-buttons { flex-direction: column !important; gap: 12px !important; align-items: center !important; }
          .cta-buttons a { width: 100% !important; max-width: 280px !important; text-align: center !important; }
        }
        
        @media (min-width: 769px) and (max-width: 1024px) {
          .hero-grid > div { grid-template-columns: 1fr 1fr !important; gap: 30px !important; }
          .why-section > div { grid-template-columns: 1fr 1fr !important; gap: 40px !important; }
        }
        
        @media (min-width: 1025px) {
          .hero-grid > div { grid-template-columns: 1.1fr 1fr !important; gap: 60px !important; }
        }
      `}</style>

      {selected && <ServiceModal service={selected} onClose={() => setSelected(null)} />}

      <div style={{ background: "#ffffff", fontFamily: "'DM Sans',sans-serif", color: "#111827", overflowX: "hidden" }}>

        {/* ── NAV ─────────────────────────────────────────────────── */}
        <nav style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          background: "rgba(255,255,255,.95)", backdropFilter: "blur(20px)",
          borderBottom: "1px solid #e5eaf2",
          padding: "0 clamp(20px,5vw,60px)", height: 68,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          boxShadow: "0 2px 12px rgba(0,0,0,.06)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: "linear-gradient(135deg,#1f99ed,#2e3192)",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16,
            }}>🚀</div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, color: "#111827", fontFamily: "'Syne',sans-serif", letterSpacing: "-.01em" }}>ONEFOCUS</div>
              <div style={{ fontSize: 9, color: "#1f99ed", letterSpacing: ".12em", fontFamily: "'Space Mono',monospace" }}>AFRICA</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button style={{
              padding: "9px 22px", borderRadius: 100,
              background: "transparent", border: "2px solid #2e3192",
              color: "#2e3192", fontSize: 13, fontWeight: 700,
              fontFamily: "'Syne',sans-serif", cursor: "pointer", transition: "all .25s",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "#2e3192"; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#2e3192"; }}
            >Our Programs</button>
            <button style={{
              padding: "9px 22px", borderRadius: 100,
              background: "linear-gradient(135deg,#1f99ed,#2e3192)",
              border: "none", color: "#fff", fontSize: 13, fontWeight: 700,
              fontFamily: "'Syne',sans-serif", cursor: "pointer", transition: "all .25s",
              boxShadow: "0 4px 16px #1f99ed30",
            }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-1px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
            >📩 Partner With Us</button>
          </div>
        </nav>

        {/* ── HERO ────────────────────────────────────────────────── */}
        <HeroSection heroVis={heroVis} />

        {/* ── PIPELINE STRIP ──────────────────────────────────────── */}
        <div style={{
          background: "#fff",
          borderBottom: "1px solid #e5eaf2",
          padding: "18px clamp(20px,5vw,60px)",
          overflowX: "auto",
        }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", gap: 0, minWidth: "max-content" }}>
            {services.map((s, i) => (
              <div key={s.id} style={{ display: "flex", alignItems: "center" }}>
                <div style={{
                  display: "flex", alignItems: "center", gap: 8,
                  padding: "8px 18px", borderRadius: 100,
                  background: s.light, border: `1.5px solid ${s.color}40`,
                  cursor: "pointer", transition: "all .25s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = s.color; e.currentTarget.querySelector("span:last-child").style.color = "#fff"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = s.light; e.currentTarget.querySelector("span:last-child").style.color = s.color; }}
                  onClick={() => document.getElementById(`service-${s.id}`)?.scrollIntoView({ behavior: "smooth", block: "center" })}
                >
                  <span style={{ fontSize: 15 }}>{s.icon}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: s.color, fontFamily: "'Syne',sans-serif", whiteSpace: "nowrap", transition: "color .25s" }}>
                    {s.title}
                  </span>
                </div>
                {i < services.length - 1 && (
                  <div style={{ color: "#d1d5db", fontSize: 16, padding: "0 8px" }}>→</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── YOUTH SERVICES ──────────────────────────────────────── */}
        <section style={{ padding: "90px clamp(20px,5vw,60px)", background: "#f7f9fc" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "#e8f5fd", border: "1.5px solid #1f99ed40",
                borderRadius: 100, padding: "7px 18px", marginBottom: 18,
              }}>
                <span>🌟</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: "#1f99ed", letterSpacing: ".12em", fontFamily: "'Space Mono',monospace" }}>YOUTH EMPOWERMENT SERVICES</span>
              </div>
              <h2 style={{ fontSize: "clamp(26px,4vw,42px)", fontWeight: 800, fontFamily: "'Syne',sans-serif", marginBottom: 14, lineHeight: 1.15 }}>
                <span style={{ color: "#111827" }}>Our Core </span>
                <span style={{ background: "linear-gradient(120deg,#1f99ed,#2e3192)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Youth Services</span>
              </h2>
              <p style={{ fontSize: 16, color: "#6b7280", maxWidth: 560, margin: "0 auto", lineHeight: 1.8 }}>
                A complete ecosystem from discovering potential to creating real career pathways for Africa's youth.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(290px,1fr))", gap: 22 }}>
              {services.map((s, i) => (
                <div key={s.id} id={`service-${s.id}`}>
                  <ServiceCard service={s} index={i} onOpen={setSelected} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BUSINESS SERVICES ───────────────────────────────────── */}
        <section style={{ padding: "90px clamp(20px,5vw,60px)", background: "#fff" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            {/* divider heading */}
            <div style={{
              display: "flex", alignItems: "center", gap: 20, marginBottom: 56,
              padding: "0 0 40px", borderBottom: "2px solid #e5eaf2",
            }}>
              <div style={{
                width: 6, height: 56, borderRadius: 4,
                background: "linear-gradient(180deg,#1f99ed,#2e3192)", flexShrink: 0,
              }} />
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".14em", color: "#1f99ed", fontFamily: "'Space Mono',monospace", marginBottom: 6 }}>
                  🏢 BUSINESS & CREATIVE SERVICES
                </div>
                <h2 style={{ fontSize: "clamp(24px,3.5vw,38px)", fontWeight: 800, fontFamily: "'Syne',sans-serif", lineHeight: 1.2 }}>
                  <span style={{ color: "#111827" }}>We Also Serve </span>
                  <span style={{ background: "linear-gradient(120deg,#1f99ed,#2e3192)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Businesses & Brands</span>
                </h2>
                <p style={{ fontSize: 15, color: "#6b7280", maxWidth: 560, marginTop: 10, lineHeight: 1.75 }}>
                  Beyond youth empowerment, ONEFOCUS AFRICA delivers professional creative and digital services to SMEs, brands, and organizations.
                </p>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 22 }}>
              {bizServices.map((s, i) => (
                <ServiceCard key={s.id} service={s} index={i} onOpen={setSelected} />
              ))}
            </div>
          </div>
        </section>

        {/* ── WHO WE SERVE + WHY US ───────────────────────────────── */}
        <section className="why-section" style={{
          padding: "80px clamp(20px,5vw,60px)",
          background: "linear-gradient(135deg,#f0f7ff 0%,#eef0fa 100%)",
          borderTop: "1px solid #e5eaf2",
        }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "start" }}>
            {/* Who */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".14em", color: "#1f99ed", fontFamily: "'Space Mono',monospace", marginBottom: 12 }}>💼 WHO WE SERVE</div>
              <h2 style={{ fontSize: "clamp(22px,3vw,32px)", fontWeight: 800, fontFamily: "'Syne',sans-serif", marginBottom: 28, lineHeight: 1.2, color: "#111827" }}>
                Built for Every Institution
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {whoWeServe.map((w, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: 14,
                    background: "#fff", border: "1.5px solid #e5eaf2",
                    borderRadius: 14, padding: "14px 18px",
                    boxShadow: "0 2px 8px rgba(0,0,0,.04)",
                    transition: "all .25s", cursor: "default",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "#1f99ed"; e.currentTarget.style.boxShadow = "0 6px 20px #1f99ed15"; e.currentTarget.style.transform = "translateX(4px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "#e5eaf2"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,.04)"; e.currentTarget.style.transform = "translateX(0)"; }}
                  >
                    <span style={{ fontSize: 22, flexShrink: 0 }}>{w.icon}</span>
                    <span style={{ fontSize: 14, fontWeight: 600, color: "#111827", fontFamily: "'Syne',sans-serif" }}>{w.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Why */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".14em", color: "#2e3192", fontFamily: "'Space Mono',monospace", marginBottom: 12 }}>🔥 WHY CHOOSE US</div>
              <h2 style={{ fontSize: "clamp(22px,3vw,32px)", fontWeight: 800, fontFamily: "'Syne',sans-serif", marginBottom: 14, lineHeight: 1.2, color: "#111827" }}>
                Why Clients Choose ONEFOCUS AFRICA
              </h2>
              <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.8, marginBottom: 28 }}>
                We are not just a training center. We are building Africa's youth empowerment ecosystem.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {whyUs.map((w, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: 14,
                    background: "#fff", border: "1.5px solid #e5eaf2",
                    borderRadius: 14, padding: "13px 18px",
                    boxShadow: "0 2px 8px rgba(0,0,0,.04)",
                    transition: "all .25s",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "#2e3192"; e.currentTarget.style.boxShadow = "0 6px 20px #2e319215"; e.currentTarget.style.transform = "translateX(4px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "#e5eaf2"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,.04)"; e.currentTarget.style.transform = "translateX(0)"; }}
                  >
                    <div style={{
                      width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                      background: "linear-gradient(135deg,#1f99ed15,#2e319215)",
                      border: "1px solid #2e319220",
                      display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18,
                    }}>{w.icon}</div>
                    <span style={{ fontSize: 14, fontWeight: 500, color: "#374151" }}>{w.text}</span>
                    <span style={{ marginLeft: "auto", color: "#1f99ed", fontSize: 16, fontWeight: 700 }}>✓</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ─────────────────────────────────────────────────── */}
        <section style={{ padding: "90px clamp(20px,5vw,60px) 100px", background: "#fff" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <div style={{
              background: "linear-gradient(135deg,#1f99ed,#2e3192)",
              borderRadius: 28, padding: "72px 52px", textAlign: "center",
              position: "relative", overflow: "hidden",
              boxShadow: "0 30px 80px #1f99ed30",
            }}>
              {/* dots pattern */}
              <div style={{
                position: "absolute", inset: 0, opacity: .08,
                backgroundImage: "radial-gradient(rgba(255,255,255,.8) 1px,transparent 1px)",
                backgroundSize: "24px 24px", pointerEvents: "none",
              }} />
              {/* light orbs */}
              <div style={{ position:"absolute", top:-60, right:-60, width:240, height:240, borderRadius:"50%", background:"rgba(255,255,255,.08)", pointerEvents:"none" }} />
              <div style={{ position:"absolute", bottom:-40, left:-40, width:180, height:180, borderRadius:"50%", background:"rgba(255,255,255,.06)", pointerEvents:"none" }} />

              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: "rgba(255,255,255,.15)", border: "1px solid rgba(255,255,255,.3)",
                  borderRadius: 100, padding: "7px 18px", marginBottom: 22,
                }}>
                  <span>🚀</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#fff", letterSpacing: ".12em", fontFamily: "'Space Mono',monospace" }}>GET STARTED TODAY</span>
                </div>
                <h2 style={{ fontSize: "clamp(28px,4.5vw,52px)", fontWeight: 800, fontFamily: "'Syne',sans-serif", lineHeight: 1.12, color: "#fff", marginBottom: 16 }}>
                  Ready to Build Africa's<br />Next Generation?
                </h2>
                <p style={{ fontSize: 16, color: "rgba(255,255,255,.8)", marginBottom: 44, lineHeight: 1.8, maxWidth: 520, margin: "0 auto 44px" }}>
                  Whether you're a school, organization, company, or government institution, we design scalable solutions tailored to your needs.
                </p>
                <div className="cta-buttons" style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
                  {[
                    { label: "📩 Book a Consultation", href: "https://linktr.ee/onefocusafrica" },
                    { label: "🏫 Bring ONEFOCUS AFRICA to Your Institution", href: "https://linktr.ee/onefocusafrica" },
                    { label: "🤝 Become a Partner", href: "https://linktr.ee/onefocusafrica" }
                  ].map((item, i) => (
                    <a key={i} href={item.href} target="_blank" rel="noreferrer" style={{
                      padding: "14px 28px", borderRadius: 100,
                      background: i === 0 ? "#fff" : "transparent",
                      border: `2px solid ${i === 0 ? "#fff" : "rgba(255,255,255,.6)"}`,
                      color: i === 0 ? "#2e3192" : "#fff",
                      fontSize: 14, fontWeight: 700,
                      fontFamily: "'Syne',sans-serif", cursor: "pointer", transition: "all .3s",
                      textDecoration: "none", display: "inline-block",
                    }}
                      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,.15)"; }}
                      onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                    >{item.label}</a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FOOTER ──────────────────────────────────────────────── */}
        <footer style={{
          borderTop: "1px solid #e5eaf2",
          padding: "28px clamp(20px,5vw,60px)",
          background: "#f7f9fc",
          display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 9, background: "linear-gradient(135deg,#1f99ed,#2e3192)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>🚀</div>
            <div style={{ fontSize: 14, fontWeight: 800, color: "#111827", fontFamily: "'Syne',sans-serif" }}>ONEFOCUS AFRICA</div>
          </div>
          <div style={{ fontSize: 12, color: "#9ca3af", fontFamily: "'Space Mono',monospace" }}>Empowering Talent. Transforming Futures.</div>
          <div style={{ display: "flex", gap: 6 }}>
            {["#1f99ed","#2e3192"].map((c,i) => <div key={i} style={{ width:8, height:8, borderRadius:"50%", background:c }} />)}
          </div>
        </footer>

      </div>
    </>
  );
}
