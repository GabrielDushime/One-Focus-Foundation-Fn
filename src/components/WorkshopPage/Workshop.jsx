import { useState, useEffect, useRef } from "react";

const programs = [
  {
    id: "01",
    emoji: "🛠️",
    title: "Tech & Professional Skills Workshops",
    tagline: "Build Future-Ready Skills",
    color: "#1F99ED",
    accent: "#1F99ED10",
    description:
      "Our hands-on workshops equip youth with high-demand digital and professional skills needed in today's economy.",
    items: [
      "Digital & AI Literacy",
      "Multimedia & Creative Production",
      "Graphic Design & Branding",
      "Social Media Management",
      "Entrepreneurship & Innovation",
      "Public Speaking & Pitching",
      "Leadership & Career Development",
    ],
    formats: ["1-Day Intensive Workshops", "1–3 Month Professional Programs", "Corporate & Institutional Training"],
    note: "💡 Designed for schools, universities, NGOs, and companies.",
  },
  {
    id: "02",
    emoji: "🤝",
    title: "Mentorship & Career Guidance Program",
    tagline: "Connect with the Right Mentors",
    color: "#1F99ED",
    accent: "#1F99ED10",
    description:
      "We match students and young professionals with experienced mentors aligned with their dream careers.",
    items: [
      "Career Clarity Sessions",
      "One-on-One Mentorship Matching",
      "Group Coaching Circles",
      "Industry Exposure & Networking",
      "Career Roadmap Development",
    ],
    formats: [],
    note: "🎯 Helping youth move from confusion → clarity → confidence.",
  },
  {
    id: "03",
    emoji: "🤖",
    title: "AI Talent Companion – INZIRA AI",
    tagline: "Your Personal Career & Talent Guide",
    color: "#1F99ED",
    accent: "#1F99ED10",
    description:
      "INZIRA AI is our AI-powered talent companion designed to provide personalized career guidance at scale.",
    items: [
      "AI Career Discovery Assessments",
      "Personalized Learning Recommendations",
      "Talent Strength Analysis",
      "Skill Gap Identification",
      "Continuous Growth Tracking",
    ],
    formats: [],
    note: "🌍 Scalable for schools, institutions, and national programs.",
  },
  {
    id: "04",
    emoji: "🎓",
    title: "School Outreach & Career Program",
    tagline: "Taking Opportunity Directly to Schools",
    color: "#1F99ED",
    accent: "#1F99ED10",
    description:
      "Through our School Outreach & Career Tours, we bring inspiration, mentorship, and career awareness directly into classrooms.",
    items: [
      "School Career Talks",
      "Dream Career Inspiration Sessions",
      "Weekly ONEFOCUS Clubs",
      "Weekend Skills Workshops",
      "Career Networking with Professionals",
    ],
    formats: [],
    note: "🎓 Target: Secondary, TVET & University Students (12–25 years)",
  },
  {
    id: "05",
    emoji: "💼",
    title: "Internship & Practical Training Pathways",
    tagline: "Learn by Doing",
    color: "#1F99ED",
    accent: "#1F99ED10",
    description:
      "We bridge the gap between education and employment through real-world experience.",
    items: [
      "Multimedia & Digital Internships",
      "Entrepreneurship Projects",
      "Startup Collaboration",
      "Project-Based Learning",
      "Portfolio Development Support",
    ],
    formats: [],
    note: "🛠 Transitioning youth from classroom → workplace → career success.",
  },
  {
    id: "06",
    emoji: "🎤",
    title: "Community Meetups & Youth Showcases",
    tagline: "Discover. Develop. Elevate. Connect.",
    color: "#1F99ED",
    accent: "#1F99ED10",
    description:
      "We host regular events where youth showcase their ideas, talents, and projects.",
    items: [
      "Monthly Community Meetups",
      "Youth Pitch Sessions",
      "Talent Showcases",
      "Networking Events",
      "Voice of Tomorrow Podcast Features",
    ],
    formats: [],
    note: "🎤 Giving youth visibility, confidence, and exposure.",
  },
];

const impactStages = [
  {label: "Discover", desc: "Inspiration & Career Awareness", color: "#1F99ED" },
  {label: "Develop", desc: "Skills & Mentorship", color: "#2E3192" },
  {label: "Elevate", desc: "Exposure & Showcases", color: "#1F99ED" },
  {label: "Connect", desc: "Opportunities & Career Pathways", color: "#2E3192" },
];

const partners = [
  "Schools & Universities",
  "NGOs & Youth Organizations",
  "Government Institutions",
  "Private Companies",
  "Sponsors & Mentors",
];

/* ─── Modal ─────────────────────────────────────────────────────────────── */
function ProgramModal({ program, onClose }) {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(8px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 24,
        animation: "fadeIn 0.2s ease",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#ffffff",
          border: `1px solid #1F99ED30`,
          borderRadius: 24,
          maxWidth: 580,
          width: "100%",
          maxHeight: "88vh",
          overflowY: "auto",
          padding: "40px 36px",
          position: "relative",
          boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
          animation: "slideUp 0.3s cubic-bezier(0.23,1,0.32,1)",
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: 16, right: 16,
            background: "#f5f5f5",
            border: "none",
            borderRadius: "50%", width: 36, height: 36,
            color: "#666", fontSize: 14, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.2s",
            fontFamily: "sans-serif",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "#eee"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "#f5f5f5"; }}
        >
          ✕
        </button>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
          <div style={{
            fontSize: 34, width: 62, height: 62, borderRadius: 16,
            background: "#1F99ED10", border: "1px solid #1F99ED30",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            {program.emoji}
          </div>
          <div>
            <div style={{
              fontSize: 10, fontWeight: 700, letterSpacing: "0.14em",
              color: "#1F99ED", fontFamily: "'Space Mono', monospace", marginBottom: 5,
            }}>
              PROGRAM {program.id}
            </div>
            <h2 style={{
              margin: 0, fontSize: "clamp(17px, 2.4vw, 21px)",
              fontWeight: 800, color: "#1F99ED", lineHeight: 1.25,
              fontFamily: "'Syne', sans-serif",
            }}>
              {program.title}
            </h2>
          </div>
        </div>

        {/* Tagline */}
        <p style={{
          fontSize: 13, color: "#2E3192", fontWeight: 600,
          fontStyle: "italic", margin: "0 0 14px",
          fontFamily: "'Syne', sans-serif",
        }}>
          {program.tagline}
        </p>

        {/* Description */}
        <p style={{
          fontSize: 15, color: "#666",
          lineHeight: 1.8, margin: "0 0 28px",
          borderBottom: "1px solid #eee",
          paddingBottom: 24,
        }}>
          {program.description}
        </p>

        {/* Items */}
        <div style={{ marginBottom: 24 }}>
          <div style={{
            fontSize: 10, fontWeight: 700, letterSpacing: "0.14em",
            color: "#999", fontFamily: "'Space Mono', monospace",
            marginBottom: 14,
          }}>
            {program.id === "01" ? "KEY FOCUS AREAS" : "WHAT WE PROVIDE"}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            {program.items.map((item) => (
              <div key={item} style={{
                display: "flex", alignItems: "center", gap: 12,
                fontSize: 14, color: "#333",
                background: "#fafafa",
                border: "1px solid #eee",
                borderRadius: 10, padding: "10px 14px",
              }}>
                <span style={{
                  width: 7, height: 7, borderRadius: "50%",
                  background: "#1F99ED", flexShrink: 0,
                }} />
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Formats */}
        {program.formats.length > 0 && (
          <div style={{ marginBottom: 24 }}>
            <div style={{
              fontSize: 10, fontWeight: 700, letterSpacing: "0.14em",
              color: "#999", fontFamily: "'Space Mono', monospace",
              marginBottom: 12,
            }}>
              FORMATS
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {program.formats.map((f) => (
                <span key={f} style={{
                  fontSize: 12, padding: "6px 16px", borderRadius: 100,
                  border: "1px solid #1F99ED30", color: "#1F99ED",
                  fontFamily: "'Space Mono', monospace", fontWeight: 600,
                  background: "#1F99ED10",
                }}>
                  {f}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Note */}
        <div style={{
          fontSize: 13, color: "#888", fontStyle: "italic",
          background: "#fafafa",
          border: "1px solid #eee",
          borderRadius: 10, padding: "12px 16px",
        }}>
          {program.note}
        </div>
      </div>
    </div>
  );
}

/* ─── Card (collapsed — title + description + Read More) ──────────────── */
function ProgramCard({ program, index, onReadMore }) {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.12 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "#1F99ED10" : "#ffffff",
        border: `1px solid ${hovered ? "#1F99ED" : "#e0e0e0"}`,
        borderRadius: 20,
        padding: "30px 26px",
        transition: "all 0.4s cubic-bezier(0.23,1,0.32,1)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transitionDelay: `${index * 0.08}s`,
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        boxShadow: hovered ? "0 8px 30px #1F99ED20" : "0 2px 10px rgba(0,0,0,0.05)",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 14 }}>
        <div style={{
          fontSize: 26, width: 50, height: 50, borderRadius: 13,
          background: "#1F99ED10", border: "1px solid #1F99ED30",
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          {program.emoji}
        </div>
        <div>
          <div style={{
            fontSize: 10, fontWeight: 700, letterSpacing: "0.14em",
            color: "#1F99ED", fontFamily: "'Space Mono', monospace", marginBottom: 4,
          }}>
            PROGRAM {program.id}
          </div>
          <h3 style={{
            margin: 0, fontSize: "clamp(15px, 1.7vw, 17px)",
            fontWeight: 700, color: "#1F99ED", lineHeight: 1.3,
            fontFamily: "'Syne', sans-serif",
          }}>
            {program.title}
          </h3>
        </div>
      </div>

      {/* Tagline */}
      <p style={{ fontSize: 12, color: "#2E3192", fontWeight: 600, fontStyle: "italic", margin: "0 0 10px" }}>
        {program.tagline}
      </p>

      {/* Description */}
      <p style={{
        fontSize: 14, color: "#666",
        lineHeight: 1.75, margin: "0 0 22px", flex: 1,
      }}>
        {program.description}
      </p>

      {/* Read More */}
      <button
        onClick={() => onReadMore(program)}
        style={{
          alignSelf: "flex-start",
          display: "flex", alignItems: "center", gap: 8,
          background: "transparent",
          border: "1px solid #1F99ED",
          borderRadius: 100,
          padding: "9px 22px",
          color: "#1F99ED",
          fontSize: 13, fontWeight: 700,
          fontFamily: "'Syne', sans-serif",
          cursor: "pointer",
          transition: "all 0.25s",
          letterSpacing: "0.02em",
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = "#1F99ED";
          e.currentTarget.style.color = "#fff";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = "transparent";
          e.currentTarget.style.color = "#1F99ED";
        }}
      >
        Read More <span>→</span>
      </button>
    </div>
  );
}

/* ─── Main Page ──────────────────────────────────────────────────────── */
export default function ProgramsSection() {
  const [activeStage, setActiveStage] = useState(0);
  const [selectedProgram, setSelectedProgram] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => setActiveStage((s) => (s + 1) % 4), 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Space+Mono:wght@400;700&family=DM+Sans:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes slideUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        
        @media (max-width: 768px) {
          .workshop-hero { padding: 80px 4vw 40px !important; }
          .workshop-slider { height: 280px !important; }
          .workshop-cards { grid-template-columns: 1fr !important; gap: 16px !important; }
          .workshop-impact { padding: 40px 4vw !important; flex-direction: column !important; gap: 24px !important; }
          .workshop-partner { grid-template-columns: 1fr !important; gap: 24px !important; padding: 24px !important; }
          .workshop-cta { padding: 40px 4vw !important; }
        }
        
        @media (min-width: 769px) and (max-width: 1024px) {
          .workshop-cards { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>

      {/* Modal overlay */}
      {selectedProgram && (
        <ProgramModal program={selectedProgram} onClose={() => setSelectedProgram(null)} />
      )}

      <section style={{
        background: "#ffffff", minHeight: "100vh",
        fontFamily: "'Syne', sans-serif",
        position: "relative", overflow: "hidden", padding: "100px 0",
      }}>
        {/* Subtle pattern */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.03,
          backgroundImage: `linear-gradient(#1F99ED 1px,transparent 1px),linear-gradient(90deg,#1F99ED 1px,transparent 1px)`,
          backgroundSize: "40px 40px", pointerEvents: "none",
        }} />

        <div className="workshop-hero" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>

          {/* Hero */}
          <div style={{ textAlign: "center", marginBottom: 80, animation: "fadeUp 0.8s ease forwards" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(31,153,237,0.1)", border: "1px solid rgba(31,153,237,0.3)",
              borderRadius: 100, padding: "8px 20px", marginBottom: 24,
            }}>
              <span style={{ fontSize: 16 }}>🚀</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#1F99ED", letterSpacing: "0.12em", fontFamily: "'Space Mono',monospace" }}>
                PROGRAMS & WORKSHOPS
              </span>
            </div>
            <h1 style={{
              fontSize: "clamp(36px,6vw,72px)", fontWeight: 800,
              margin: "0 0 16px", color: "#1F99ED", lineHeight: 1.1, letterSpacing: "-0.02em",
            }}>
              Empowering Africa's Youth<br />
              <span style={{
                color: "#2E3192",
              }}>
                Through Skills, Mentorship & AI
              </span>
            </h1>
            <p style={{
              fontSize: "clamp(15px,2vw,18px)", color: "#666",
              maxWidth: 620, margin: "0 auto", lineHeight: 1.8,
            }}>
              At ONEFOCUS AFRICA, we build a complete youth talent ecosystem — guiding young people from discovery to opportunity.
            </p>
          </div>

          {/* Image Slider Section - 3 Slides */}
          <div className="workshop-slider" style={{
            borderRadius: 24, marginBottom: 80,
            position: "relative", overflow: "hidden",
            height: "400px",
          }}>
            {[
              { img: "/_NIY1931.jpg", title: "Skills Workshop", desc: "Hands-on learning experience" },
              { img: "/our.jpg", title: "Youth Empowerment", desc: "Building future leaders" },
              { img: "/s.jpg", title: "Community Impact", desc: "Transforming lives together" }
            ].map((slide, i) => (
              <div key={i} style={{
                position: "absolute", inset: 0,
                opacity: activeStage === i ? 1 : 0,
                transition: "opacity 1s ease-in-out",
                zIndex: activeStage === i ? 1 : 0,
              }}>
                <img
                  src={slide.img}
                  alt={slide.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to top, rgba(31,153,237,0.9) 0%, rgba(46,49,146,0.6) 100%)",
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                  padding: "40px",
                }}>
                  <h3 style={{
                    fontSize: "clamp(28px,4vw,42px)", fontWeight: 800,
                    color: "#fff", margin: "0 0 12px", fontFamily: "'Syne',sans-serif",
                    textAlign: "center",
                  }}>
                    {slide.title}
                  </h3>
                  <p style={{
                    fontSize: "clamp(16px,2vw,20px)", color: "rgba(255,255,255,0.9)",
                    margin: 0, fontFamily: "'Space Mono',monospace", fontWeight: 500,
                    textAlign: "center",
                  }}>
                    {slide.desc}
                  </p>
                </div>
              </div>
            ))}
            {/* Navigation Dots */}
            <div style={{
              position: "absolute", bottom: 20, left: "50%", transform: "translateX(-50%)",
              display: "flex", gap: 12, zIndex: 10,
            }}>
              {[0,1,2].map((i) => (
                <button
                  key={i}
                  onClick={() => setActiveStage(i)}
                  style={{
                    width: activeStage === i ? 32 : 10,
                    height: 10, borderRadius: 5,
                    background: activeStage === i ? "#fff" : "rgba(255,255,255,0.5)",
                    border: "none", cursor: "pointer", transition: "all 0.3s",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Cards grid */}
          <div className="workshop-cards" style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
            gap: 24, marginBottom: 100,
          }}>
            {programs.map((program, i) => (
              <ProgramCard
                key={program.id}
                program={program}
                index={i}
                onReadMore={setSelectedProgram}
              />
            ))}
          </div>

          {/* Impact Journey */}
          <div className="workshop-impact" style={{
            background: "#f8f9fa",
            border: "1px solid #e0e0e0",
            borderRadius: 24, padding: "60px 48px",
            marginBottom: 80, textAlign: "center",
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", color: "#1F99ED", fontFamily: "'Space Mono',monospace", marginBottom: 12 }}>
              OUR IMPACT JOURNEY MODEL
            </div>
            <h2 style={{ fontSize: "clamp(24px,3vw,36px)", fontWeight: 800, color: "#1F99ED", margin: "0 0 48px" }}>
              Four Powerful Stages
            </h2>
            <div style={{ display: "flex", justifyContent: "center", gap: "clamp(16px,4vw,48px)", flexWrap: "wrap", alignItems: "center" }}>
              {impactStages.map((stage, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "clamp(12px,3vw,32px)" }}>
                  <div style={{ textAlign: "center", transition: "all 0.4s", transform: activeStage === i ? "scale(1.1)" : "scale(1)" }}>
                    <div style={{
                      width: 72, height: 72, borderRadius: "50%",
                      background: activeStage === i ? `${stage.color}15` : "#fff",
                      border: `2px solid ${activeStage === i ? stage.color : "#ddd"}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 28, margin: "0 auto 12px",
                      boxShadow: activeStage === i ? `0 0 24px ${stage.color}30` : "none",
                      transition: "all 0.4s",
                    }}>
                      {stage.icon}
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: activeStage === i ? stage.color : "#333", marginBottom: 4, transition: "color 0.4s" }}>
                      {stage.label}
                    </div>
                    <div style={{ fontSize: 11, color: "#888", maxWidth: 120 }}>{stage.desc}</div>
                  </div>
                  {i < impactStages.length - 1 && (
                    <div style={{ color: "#ccc", fontSize: 20 }}>→</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Partner */}
          <div className="workshop-partner" style={{
            background: "#fff", border: "1px solid #e0e0e0",
            borderRadius: 24, padding: "48px", marginBottom: 80,
          }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", color: "#1F99ED", fontFamily: "'Space Mono',monospace", marginBottom: 12 }}>
                  PARTNERSHIPS
                </div>
                <h2 style={{ fontSize: "clamp(22px,3vw,32px)", fontWeight: 800, color: "#1F99ED", margin: "0 0 16px" }}>
                  Partner With Us
                </h2>
                <p style={{ color: "#666", lineHeight: 1.8, margin: 0, fontSize: 15 }}>
                  Together, we are building Africa's next generation of leaders, creators, and innovators.
                </p>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                {partners.map((p) => (
                  <div key={p} style={{
                    padding: "10px 20px", border: "1px solid rgba(31,153,237,0.3)",
                    borderRadius: 100, fontSize: 13, color: "#333",
                    background: "rgba(31,153,237,0.05)", fontWeight: 500,
                  }}>{p}</div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="workshop-cta" style={{
            background: "linear-gradient(135deg,rgba(31,153,237,0.1) 0%,rgba(46,49,146,0.1) 100%)",
            border: "1px solid rgba(31,153,237,0.2)",
            borderRadius: 28, padding: "72px 48px",
            textAlign: "center", position: "relative", overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", inset: 0, opacity: 0.5,
              backgroundImage: "radial-gradient(circle at 20% 50%,rgba(31,153,237,0.1) 0%,transparent 50%),radial-gradient(circle at 80% 50%,rgba(46,49,146,0.1) 0%,transparent 50%)",
              pointerEvents: "none",
            }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", color: "#1F99ED", fontFamily: "'Space Mono',monospace", marginBottom: 16 }}>
                GET INVOLVED
              </div>
              <h2 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 800, color: "#1F99ED", margin: "0 0 16px", lineHeight: 1.2 }}>
                Ready to Empower Your<br />Students or Community?
              </h2>
              <p style={{ color: "#666", fontSize: 16, margin: "0 0 40px", lineHeight: 1.8 }}>
                Join the movement. Shape Africa's future.
              </p>
              <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
                <a href="https://linktr.ee/onefocusafrica" target="_blank" rel="noreferrer" className="cta-btn cta-primary" style={{ textDecoration: 'none', display: 'inline-block' }}>Partner with Us</a>
                <a href="https://linktr.ee/onefocusafrica" target="_blank" rel="noreferrer" className="cta-btn cta-secondary" style={{ textDecoration: 'none', display: 'inline-block' }}>Book a Workshop</a>
                <a href="https://linktr.ee/onefocusafrica" target="_blank" rel="noreferrer" className="cta-btn cta-secondary" style={{ textDecoration: 'none', display: 'inline-block' }}>Explore INZIRA AI</a>
                <a href="https://linktr.ee/onefocusafrica" target="_blank" rel="noreferrer" className="cta-btn cta-secondary" style={{ textDecoration: 'none', display: 'inline-block' }}>Join a Program</a>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
