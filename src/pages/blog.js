import { useState, useEffect, useRef } from "react";
import { Layout } from "antd";
import Image from "next/image";
import HeaderComponent from "../components/Header";
import FooterComponent from "../components/Footer";

const { Content } = Layout;

/* ── Brand tokens ── */
const P = {
  blue:     "#1f99ed",
  navy:     "#2e3192",
  black:    "#0a0a0a",
  white:    "#ffffff",
  offwhite: "#f5f8fc",
  border:   "#e4eaf3",
  muted:    "#6b7280",
  dark:     "#1a1d2e",
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
  }, [threshold]);
  return [ref, visible];
};

const FadeUp = ({ children, delay = 0, style = {} }) => {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(38px)",
      transition: `opacity .7s ease ${delay}s, transform .7s ease ${delay}s`,
      ...style,
    }}>{children}</div>
  );
};

/* ── Atoms ── */
const Chip = ({ children }) => (
  <span style={{
    display: "inline-flex", alignItems: "center", gap: 5,
    fontSize: 10, fontWeight: 700, letterSpacing: "0.13em",
    textTransform: "uppercase", color: P.blue,
    background: `${P.blue}14`, border: `1px solid ${P.blue}30`,
    borderRadius: 50, padding: "4px 12px",
  }}>{children}</span>
);

const Bar = ({ center = false }) => (
  <div style={{
    width: 48, height: 4, borderRadius: 2, marginBottom: 16,
    background: `linear-gradient(90deg,${P.blue},${P.navy})`,
    ...(center ? { margin: "0 auto 16px" } : {}),
  }} />
);

const H2 = ({ children, center = false }) => (
  <h2 style={{
    fontFamily: "'Syne',sans-serif",
    fontSize: "clamp(1.7rem,2.5vw,2.5rem)",
    fontWeight: 800, lineHeight: 1.12, color: P.black, marginBottom: 12,
    textAlign: center ? "center" : "left",
  }}>{children}</h2>
);

const BtnSolid = ({ children, onClick }) => {
  const [h, setH] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{
      background: `linear-gradient(135deg,${h ? P.navy : P.blue},${h ? P.blue : P.navy})`,
      color: "#fff", border: "none", padding: "13px 28px", borderRadius: 50,
      fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "0.93rem",
      cursor: "pointer", boxShadow: `0 6px 22px ${P.blue}33`,
      transform: h ? "translateY(-2px)" : "none", transition: "all .25s ease",
    }}>{children}</button>
  );
};

const BtnOutline = ({ children, onClick }) => {
  const [h, setH] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{
      background: h ? `${P.blue}0a` : "transparent",
      color: P.navy, border: `2px solid ${h ? P.blue : P.navy}`,
      padding: "13px 28px", borderRadius: 50,
      fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "0.93rem",
      cursor: "pointer", transform: h ? "translateY(-2px)" : "none", transition: "all .25s ease",
    }}>{children}</button>
  );
};

/* ── Category color map ── */
const CAT_COLOR = {
  "Career Development":     { bg: "#edf0fc", text: "#1f99ed" },
  "Mentorship Stories":     { bg: "#e8f4fd", text: "#1f99ed" },
  "AI & Digital Skills":    { bg: "#e8f7f0", text: "#1f99ed" },
  "School Outreach":        { bg: "#fef3e8", text: "#1f99ed" },
  "Networking & Leadership":{ bg: "#f3e8fe", text: "#1f99ed" },
  "Youth Events":            { bg: "#fde8ed", text: "#1f99ed" },
  "Community Impact":        { bg: "#e8fdf4", text: "#1f99ed" },
  "AI & Digital":            { bg: "#e8f7f0", text: "#1f99ed" },
  "Mentorship":             { bg: "#e8f4fd", text: P.blue },
};
const catCs = (cat) => CAT_COLOR[cat] || { bg: `${P.blue}12`, text: P.blue };

/* ════════════════════════════════════════════════════════════
   FULL ARTICLE CONTENT DATA
════════════════════════════════════════════════════════ */
const ARTICLES = [
  {
    id: "a1",
    cat: "Career Development",
    emoji: "🚀",
    readTime: "5 min read",
    title: "How ONEFOCUS AFRICA Helps Youth Turn Career Dreams Into Reality",
    metaDesc: "Discover how ONEFOCUS AFRICA empowers youth through mentorship, AI guidance, networking events, and career development programs across Rwanda and Africa.",
    excerpt: "Many young people have big dreams but lack career guidance, professional mentors, digital skills, and platforms to showcase their talents. ONEFOCUS AFRICA provides the complete pathway.",
    tags: ["Youth Empowerment", "Career Guidance", "Rwanda"],
    views: 1247,
    likes: 89,
    content: [
      {
        type: "intro",
        text: "Many young people have big dreams but lack the guidance, network, and platform to make them real. This is the gap ONEFOCUS AFRICA was built to close.",
      },
      {
        type: "heading", text: "Why Career Dreams Often Fail",
      },
      {
        type: "text",
        text: "Across Africa, millions of talented young people face the same invisible barriers every day. It is not a lack of ambition — it is a lack of access.",
      },
      {
        type: "list",
        items: [
          "No career guidance or mentors to show the way",
          "Limited exposure to real professional opportunities",
          "Missing digital and entrepreneurial skills",
          "No platforms to showcase their talents",
          "Weak transition from school to employment",
        ],
      },
      {
        type: "text",
        text: "This gap leads to unemployment, confusion, and wasted potential on a continent that has the youngest — and most promising — population in the world.",
      },
      {
        type: "heading", text: "Our Solution: A Full Talent Ecosystem",
      },
      {
        type: "text",
        text: "ONEFOCUS AFRICA provides a complete pathway built on four powerful stages:",
      },
      {
        type: "steps",
        items: [
          { icon: "🔍", step: "Discover", desc: "Through podcast inspiration and school outreach" },
          { icon: "🛠", step: "Develop", desc: "Skills workshops, AI guidance, and mentorship" },
          { icon: "🚀", step: "Elevate", desc: "Media exposure, showcases, and public speaking" },
          { icon: "🤝", step: "Connect", desc: "Mentor matching and real career opportunities" },
        ],
      },
      {
        type: "heading", text: "Programs That Make the Difference",
      },
      {
        type: "program",
        num: "1️⃣",
        title: "AI Talent Companion",
        desc: "Personalized guidance powered by AI to help youth understand career paths, the skills needed, and the concrete next steps to take.",
      },
      {
        type: "program",
        num: "2️⃣",
        title: "Workshops & Mentorship",
        desc: "Hands-on training in multimedia, digital skills, entrepreneurship, public speaking, and leadership — delivered by industry professionals.",
      },
      {
        type: "program",
        num: "3️⃣",
        title: "School Outreach & Career Tours",
        desc: "Weekly clubs, weekend workshops, holiday bootcamps, and networking events inside schools across Rwanda and beyond.",
      },
      {
        type: "program",
        num: "4️⃣",
        title: "Voice of Tomorrow Podcast",
        desc: "A platform where youth share stories, lessons, and inspiration — building their public voice and media presence.",
      },
      {
        type: "heading", text: "Who Benefits?",
      },
      {
        type: "list",
        items: [
          "Secondary & TVET Students",
          "University Students",
          "Young Professionals",
          "Schools & NGOs",
          "Government Institutions",
        ],
      },
      {
        type: "cta",
        text: "Your dream career is possible — but you need guidance, exposure, and the right network. Join ONEFOCUS AFRICA today.",
      },
    ],
  },
  {
    id: "a2",
    cat: "Mentorship Stories",
    emoji: "🤝",
    readTime: "4 min read",
    title: "Why Mentorship and Networking Are the Missing Link in Youth Success",
    metaDesc: "Explore how mentorship and networking programs help young people build confidence, leadership skills, and career direction.",
    excerpt: "Mentorship provides clarity, accountability, real-life insights, and a confidence boost. At ONEFOCUS AFRICA, we connect youth with professionals aligned with their dream careers.",
    tags: ["Mentorship", "Networking", "Leadership"],
    views: 892,
    likes: 67,
    content: [
      {
        type: "intro",
        text: "The difference between a youth who succeeds and one who doesn't is rarely talent. More often, it comes down to one thing: the right mentor at the right time.",
      },
      {
        type: "heading", text: "The Power of Mentorship",
      },
      {
        type: "text",
        text: "Mentorship is not just advice — it is a structured relationship that accelerates growth in ways no classroom ever could.",
      },
      {
        type: "list",
        items: [
          "Clarity in career direction",
          "Accountability and discipline",
          "Real-life professional insights",
          "A genuine confidence boost",
          "Access to networks you could never build alone",
        ],
      },
      {
        type: "text",
        text: "At ONEFOCUS AFRICA, we carefully connect youth with professionals who are aligned with their specific dream careers — not just any mentor, but the right one.",
      },
      {
        type: "heading", text: "Networking Events That Open Doors",
      },
      {
        type: "text",
        text: "We believe that who you know is just as important as what you know. Our events are designed to create meaningful, lasting connections.",
      },
      {
        type: "list",
        items: [
          "Monthly community meetups",
          "School career networking sessions",
          "Youth talent showcases",
          "Leadership panels with industry experts",
        ],
      },
      {
        type: "text",
        text: "These events help youth build confidence, pitch their ideas, gain real feedback, and meet potential employers — all in one place.",
      },
      {
        type: "heading", text: "Youth + Experienced Professionals: A Powerful Bridge",
      },
      {
        type: "text",
        text: "Our ecosystem intentionally brings together experienced professionals, young innovators, entrepreneurs, mentors, and students. This bridge creates genuine knowledge transfer and creates real opportunity for every participant.",
      },
      {
        type: "cta",
        text: "Ready to find your mentor and grow your network? Join the ONEFOCUS AFRICA community and connect with professionals who believe in your potential.",
      },
    ],
  },
  {
    id: "a3",
    cat: "Career Development",
    emoji: "🎓",
    readTime: "6 min read",
    title: "From School to Employment: Closing the Gap for African Youth",
    metaDesc: "Learn how ONEFOCUS AFRICA bridges the gap between education and employment through practical skills training and career guidance.",
    excerpt: "Education alone is not enough. Our four-step journey — Discover, Develop, Elevate, Connect — gives youth the tools and exposure they need to move from the classroom to a career.",
    tags: ["Employment", "Skills", "School-to-Work"],
    views: 1083,
    likes: 92,
    content: [
      {
        type: "intro",
        text: "Across Africa, millions of young people graduate with qualifications but no direction, no network, and no clear path to employment. Education alone is no longer enough.",
      },
      {
        type: "heading", text: "The Problem",
      },
      {
        type: "text",
        text: "The transition from school to work is one of the most critical — and most neglected — phases of a young person's life.",
      },
      {
        type: "list",
        items: [
          "Weak transition support from school to the workplace",
          "No internship or work-experience exposure",
          "Lack of mentorship systems in most institutions",
          "Skills taught in school don't match employer needs",
          "Youth are left to figure out their careers alone",
        ],
      },
      {
        type: "heading", text: "The ONEFOCUS AFRICA Impact Journey",
      },
      {
        type: "steps",
        items: [
          { icon: "🔍", step: "Discover", desc: "Podcast inspiration and school tours identify hidden talent" },
          { icon: "🛠", step: "Develop", desc: "Skills workshops and AI guidance build real-world competencies" },
          { icon: "🚀", step: "Elevate", desc: "Media exposure and showcases make talent visible" },
          { icon: "🤝", step: "Connect", desc: "Mentor matching and opportunity networks open the right doors" },
        ],
      },
      {
        type: "heading", text: "Our Impact So Far",
      },
      {
        type: "list",
        items: [
          "Hundreds of youth trained through hands-on workshops",
          "40+ podcast episodes inspiring the next generation",
          "Growing community events across Rwanda",
          "Expanding digital audience and partner network",
        ],
      },
      {
        type: "text",
        text: "Every number behind these statistics is a real young person whose trajectory has changed. That is the mission — not programs, but lives.",
      },
      {
        type: "cta",
        text: "Whether you are a student, a school administrator, or an NGO — partner with ONEFOCUS AFRICA to close the school-to-employment gap in your community.",
      },
    ],
  },
  {
    id: "a4",
    cat: "AI & Digital Skills",
    emoji: "🤖",
    readTime: "5 min read",
    title: "AI Career Guidance: The Future of Youth Talent Development in Africa",
    metaDesc: "How AI-powered tools are revolutionizing career guidance and skills discovery for African youth.",
    excerpt: "Our AI Talent Companion delivers personalized guidance to help youth understand career paths, identify strengths, and map out actionable next steps — wherever they are in Africa.",
    tags: ["AI Guidance", "Digital Skills", "Innovation"],
    views: 1456,
    likes: 128,
    content: [
      {
        type: "intro",
        text: "For the first time in history, every young person in Africa — regardless of where they live — can access world-class career guidance. Artificial intelligence is making this possible.",
      },
      {
        type: "heading", text: "The Challenge with Traditional Career Guidance",
      },
      {
        type: "text",
        text: "Career counsellors are scarce. When they exist, they are often overloaded, outdated, or unavailable to rural and under-resourced youth. The result is a generation making career choices based on guesswork.",
      },
      {
        type: "heading", text: "Introducing the AI Talent Companion",
      },
      {
        type: "text",
        text: "The ONEFOCUS AFRICA AI Talent Companion changes this entirely. It is a personalized, intelligent guidance system designed specifically for African youth.",
      },
      {
        type: "list",
        items: [
          "Identifies individual strengths and natural talents",
          "Maps career paths aligned to those strengths",
          "Provides actionable next steps for skill development",
          "Delivers guidance in plain, accessible language",
          "Available 24/7, anywhere with internet access",
        ],
      },
      {
        type: "heading", text: "Why AI + Human Mentorship is the Winning Formula",
      },
      {
        type: "text",
        text: "We do not believe AI replaces human connection. But AI amplifies it. Our model pairs AI guidance with real mentors, ensuring every youth has both the intelligence of technology and the wisdom of experience guiding their journey.",
      },
      {
        type: "cta",
        text: "Ready to discover your career path with AI-powered guidance? Access the ONEFOCUS AFRICA AI Talent Companion and take the first step toward your future.",
      },
    ],
  },
  {
    id: "a5",
    cat: "School Outreach",
    emoji: "🏫",
    readTime: "4 min read",
    title: "#INZIRA: Bringing Career Tours Directly Into Schools Across Rwanda",
    metaDesc: "How our school outreach program is transforming career awareness for secondary and TVET students through weekly clubs and bootcamps.",
    excerpt: "Through weekly clubs, weekend workshops, and holiday bootcamps, #INZIRA connects students with mentors and career opportunities inside their own school environment.",
    tags: ["School Outreach", "INZIRA", "TVET"],
    views: 756,
    likes: 54,
    content: [
      {
        type: "intro",
        text: "The best career development doesn't wait for students to come to it. It goes to them. That is the philosophy behind #INZIRA — our flagship school outreach program.",
      },
      {
        type: "heading", text: "What is #INZIRA?",
      },
      {
        type: "text",
        text: "#INZIRA (meaning 'the path' in Kinyarwanda) is ONEFOCUS AFRICA's school-based career development initiative. It is built on a simple but powerful idea: every student deserves career clarity before they leave school.",
      },
      {
        type: "heading", text: "What #INZIRA Delivers",
      },
      {
        type: "list",
        items: [
          "Weekly career clubs inside secondary schools and TVET institutions",
          "Weekend skills workshops led by industry professionals",
          "Holiday bootcamps focused on digital and entrepreneurial skills",
          "Career networking sessions connecting students with mentors",
          "Guest speaker sessions from diverse career fields",
        ],
      },
      {
        type: "heading", text: "The Impact on Students",
      },
      {
        type: "text",
        text: "When we bring career guidance inside the school walls, we remove the biggest barrier of all: access. Students who would never attend an external workshop are now discovering their potential in their own classrooms.",
      },
      {
        type: "text",
        text: "Teachers and school administrators have reported noticeable increases in student motivation, engagement, and clarity about their future paths after the program launches in their institutions.",
      },
      {
        type: "cta",
        text: "Is your school ready to join the #INZIRA program? Partner with ONEFOCUS AFRICA to bring career development directly to your students.",
      },
    ],
  },
  {
    id: "a6",
    cat: "Youth Events",
    emoji: "🎙️",
    readTime: "3 min read",
    title: "Voice of Tomorrow: How Our Podcast Is Amplifying Youth Stories Across Africa",
    metaDesc: "The story behind ONEFOCUS AFRICA's Voice of Tomorrow Podcast — a platform for youth to share insights, dreams, and lessons.",
    excerpt: "With 40+ episodes published, Voice of Tomorrow has become a growing platform where young people share their journeys, inspire peers, and gain media exposure.",
    tags: ["Podcast", "Youth Media", "Storytelling"],
    views: 923,
    likes: 78,
    content: [
      {
        type: "intro",
        text: "Every young person has a story worth telling. Voice of Tomorrow exists to give that story a platform — and an audience.",
      },
      {
        type: "heading", text: "Why We Started the Podcast",
      },
      {
        type: "text",
        text: "Africa's youth are not short of insight, creativity, or wisdom. They are short of platforms. Voice of Tomorrow was created to fix this — a podcast by youth, for youth, about the real journey of building a career and a life on the continent.",
      },
      {
        type: "heading", text: "What You Will Find on the Podcast",
      },
      {
        type: "list",
        items: [
          "Real stories from young Africans navigating career challenges",
          "Lessons from mentors and industry professionals",
          "Practical career and skills development tips",
          "Inspiration and motivation for students and young professionals",
          "Insights on entrepreneurship, digital skills, and leadership",
        ],
      },
      {
        type: "heading", text: "40+ Episodes and Growing",
      },
      {
        type: "text",
        text: "Since launching, Voice of Tomorrow has published over 40 episodes and continues to grow its audience across Rwanda and beyond. Each episode is a window into what is possible when young people are given a mic and a message.",
      },
      {
        type: "text",
        text: "Being featured on the podcast is also a powerful media exposure opportunity for youth — helping them build confidence, communication skills, and a personal brand.",
      },
      {
        type: "cta",
        text: "Want to be featured on Voice of Tomorrow, or share the podcast with a young person who needs to hear it? Reach out to the ONEFOCUS AFRICA team today.",
      },
    ],
  },
];

const FEATURED_PROGRAMS = [
  {
    image: "/DSC_0641.jpg", bg: `${P.blue}18`, cat: "AI & Digital",
    title: "AI Talent Companion: Your Personalized Career Guidance System",
    summary: "Discover how our AI-powered tool helps youth across Africa identify strengths, map career paths, and take their next step with confidence.",
    articleId: "a4",
  },
  {
    image: "/_NIY9477.jpg", bg: `${P.navy}12`, cat: "Mentorship",
    title: "Workshops & Mentorship: Hands-On Skills for the Real World",
    summary: "From multimedia to entrepreneurship and public speaking — explore how our mentorship workshops build the skills employers actually need.",
    articleId: "a2",
  },
  {
    image: "/po.png", bg: "#00b89414", cat: "Youth Events",
    title: "Voice of Tomorrow Podcast: Youth Stories That Inspire Africa",
    summary: "Meet the young voices sharing lessons, dreams, and breakthroughs on our fast-growing podcast platform — 40+ episodes and counting.",
    articleId: "a6",
  },
  {
    image: "/s.jpg", bg: "#f5a62320", cat: "School Outreach",
    title: "School Outreach & Career Tours: Bringing Opportunity to Every Classroom",
    summary: "Weekly clubs, holiday bootcamps, and career tours (#INZIRA) connect students directly with mentors and career pathways inside their schools.",
    articleId: "a5",
  },
];

const CATEGORIES = [
  "All", "Career Development", "Mentorship Stories", "Youth Events",
  "Networking & Leadership", "AI & Digital Skills", "School Outreach", "Community Impact",
];

/* ════════════════════════════════════════════════════════════
   ARTICLE DETAIL MODAL
════════════════════════════════════════════════════════ */
const ArticleModal = ({ article, onClose }) => {
  const scrollRef = useRef(null);
  const [liked, setLiked] = useState(false);
  const [showShare, setShowShare] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
    return () => { document.body.style.overflow = ""; };
  }, [article]);

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!article) return null;
  const cs = catCs(article.cat);
  const views = article.views || Math.floor(Math.random() * 500) + 500;
  const likes = article.likes || Math.floor(Math.random() * 50) + 20;

  const handleShare = (platform) => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(article.title);
    
    let shareUrl = '';
    switch(platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${title}&url=${url}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${title}%20${url}`;
        break;
    }
    if (shareUrl) window.open(shareUrl, '_blank');
    setShowShare(false);
  };

  const renderBlock = (block, i) => {
    switch (block.type) {
      case "intro":
        return (
          <p key={i} style={{
            fontSize: "1.1rem", lineHeight: 1.9, color: P.dark,
            fontWeight: 500, borderLeft: `4px solid ${P.blue}`,
            paddingLeft: 20, marginBottom: 28,
            fontStyle: "italic",
          }}>{block.text}</p>
        );
      case "heading":
        return (
          <h3 key={i} style={{
            fontFamily: "'Syne',sans-serif", fontSize: "1.2rem",
            fontWeight: 800, color: P.black, marginTop: 32, marginBottom: 12,
          }}>{block.text}</h3>
        );
      case "text":
        return (
          <p key={i} style={{
            fontSize: "0.97rem", lineHeight: 1.85, color: "#374151", marginBottom: 16,
          }}>{block.text}</p>
        );
      case "list":
        return (
          <ul key={i} style={{ listStyle: "none", marginBottom: 24, paddingLeft: 0 }}>
            {block.items.map((item, j) => (
              <li key={j} style={{
                display: "flex", alignItems: "flex-start", gap: 12,
                padding: "10px 0",
                borderBottom: `1px solid ${P.border}`,
                fontSize: "0.93rem", color: "#374151", lineHeight: 1.65,
              }}>
                <span style={{
                  width: 22, height: 22, borderRadius: "50%", flexShrink: 0, marginTop: 1,
                  background: `linear-gradient(135deg,${P.blue},${P.navy})`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "0.6rem", color: "#fff", fontWeight: 800,
                }}>✓</span>
                {item}
              </li>
            ))}
          </ul>
        );
      case "steps":
        return (
          <div key={i} style={{
            display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 14, marginBottom: 28,
          }}>
            {block.items.map((s, j) => (
              <div key={j} style={{
                background: P.offwhite, border: `1px solid ${P.border}`,
                borderRadius: 14, padding: "16px",
                display: "flex", gap: 14, alignItems: "flex-start",
              }}>
                <div style={{
                  width: 42, height: 42, borderRadius: "50%", flexShrink: 0,
                  background: `linear-gradient(135deg,${P.blue},${P.navy})`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.1rem",
                }}>{s.icon}</div>
                <div>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "0.9rem", color: P.black, marginBottom: 3 }}>{s.step}</div>
                  <div style={{ fontSize: "0.8rem", color: P.muted, lineHeight: 1.6 }}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        );
      case "program":
        return (
          <div key={i} style={{
            background: `${P.blue}08`, border: `1px solid ${P.blue}20`,
            borderRadius: 14, padding: "18px 20px", marginBottom: 14,
            display: "flex", gap: 14, alignItems: "flex-start",
          }}>
            <span style={{ fontSize: "1.4rem", flexShrink: 0 }}>{block.num}</span>
            <div>
              <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "0.95rem", color: P.navy, marginBottom: 5 }}>{block.title}</div>
              <p style={{ fontSize: "0.87rem", color: "#374151", lineHeight: 1.7, margin: 0 }}>{block.desc}</p>
            </div>
          </div>
        );
      case "cta":
        return (
          <div key={i} style={{
            marginTop: 36,
            background: `linear-gradient(135deg,${P.blue},${P.navy})`,
            borderRadius: 18, padding: "2rem",
            color: "#fff", textAlign: "center",
          }}>
            <p style={{ fontSize: "1.02rem", lineHeight: 1.75, marginBottom: 20, opacity: 0.92 }}>{block.text}</p>
            <a href="https://linktr.ee/onefocusafrica" target="_blank" rel="noreferrer" style={{
              background: "#fff", color: P.blue,
              border: "none", borderRadius: 50,
              padding: "12px 28px", fontFamily: "'DM Sans',sans-serif",
              fontWeight: 700, fontSize: "0.9rem", cursor: "pointer",
              boxShadow: "0 6px 20px rgba(0,0,0,0.14)",
              textDecoration: "none", display: "inline-block",
            }}>Join ONEFOCUS AFRICA →</a>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 1000,
      background: "rgba(10,14,30,0.65)",
      backdropFilter: "blur(6px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "20px",
      animation: "fadeIn .25s ease",
    }} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>

      <div ref={scrollRef} style={{
        background: P.white,
        borderRadius: 24,
        width: "100%", maxWidth: 760,
        maxHeight: "92vh",
        overflowY: "auto",
        boxShadow: "0 40px 100px rgba(0,0,0,0.25)",
        animation: "slideUp .35s ease",
        position: "relative",
      }}>
        {/* Header band */}
        <div style={{
          height: 6,
          background: `linear-gradient(90deg,${P.blue},${P.navy})`,
          borderRadius: "24px 24px 0 0",
        }} />

        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: "sticky", top: 16, float: "right", marginRight: 20, marginTop: 16,
            width: 36, height: 36, borderRadius: "50%",
            background: P.offwhite, border: `1px solid ${P.border}`,
            cursor: "pointer", fontSize: "1rem", color: P.muted,
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 10, transition: "all .2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = P.blue; e.currentTarget.style.color = "#fff"; }}
          onMouseLeave={e => { e.currentTarget.style.background = P.offwhite; e.currentTarget.style.color = P.muted; }}
        >✕</button>

        {/* Article hero */}
        <div style={{ padding: "28px 40px 0", clear: "both" }}>
          {/* Meta row */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
            <span style={{
              background: cs.bg, color: cs.text,
              fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em",
              textTransform: "uppercase", borderRadius: 50, padding: "4px 12px",
            }}>{article.cat}</span>
            <span style={{ fontSize: "0.78rem", color: P.muted }}>{article.readTime}</span>
          </div>

          {/* Emoji + title */}
          <div style={{ display: "flex", gap: 18, alignItems: "flex-start", marginBottom: 16 }}>
            <div style={{
              width: 64, height: 64, borderRadius: 18, flexShrink: 0,
              background: `${P.blue}10`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "2rem",
            }}>{article.emoji}</div>
            <h1 style={{
              fontFamily: "'Syne',sans-serif",
              fontSize: "clamp(1.3rem,2vw,1.7rem)",
              fontWeight: 800, color: P.black, lineHeight: 1.25,
            }}>{article.title}</h1>
          </div>

          {/* Tags */}
          <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginBottom: 20 }}>
            {article.tags.map(t => (
              <span key={t} style={{
                background: P.offwhite, border: `1px solid ${P.border}`,
                borderRadius: 50, padding: "4px 12px",
                fontSize: "0.72rem", color: P.muted, fontWeight: 500,
              }}>{t}</span>
            ))}
          </div>

          {/* Views, Likes, Share */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20, flexWrap: "wrap" }}>
            <span style={{ fontSize: "0.8rem", color: P.muted, display: "flex", alignItems: "center", gap: 4 }}>
              👁️ {views.toLocaleString()} views
            </span>
            <button 
              onClick={() => setLiked(!liked)}
              style={{ 
                background: "transparent", border: "none", cursor: "pointer",
                fontSize: "0.8rem", color: liked ? "#e74c3c" : P.muted,
                display: "flex", alignItems: "center", gap: 4,
                padding: "4px 8px", borderRadius: 4, transition: "all .2s"
              }}
            >
              {liked ? "❤️" : "🤍"} {liked ? likes + 1 : likes} likes
            </button>
            <div style={{ position: "relative" }}>
              <button 
                onClick={() => setShowShare(!showShare)}
                style={{ 
                  background: "transparent", border: "none", cursor: "pointer",
                  fontSize: "0.8rem", color: P.muted,
                  display: "flex", alignItems: "center", gap: 4,
                  padding: "4px 8px", borderRadius: 4,
                }}
              >
                🔗 Share
              </button>
              {showShare && (
                <div style={{
                  position: "absolute", top: "100%", left: 0,
                  background: P.white, border: `1px solid ${P.border}`,
                  borderRadius: 8, padding: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  display: "flex", gap: 8, zIndex: 10
                }}>
                  <button onClick={() => handleShare('facebook')} style={{ background: "#1877F2", color: "#fff", border: "none", borderRadius: 4, padding: "6px 10px", cursor: "pointer", fontSize: "0.8rem" }}>Facebook</button>
                  <button onClick={() => handleShare('twitter')} style={{ background: "#1DA1F2", color: "#fff", border: "none", borderRadius: 4, padding: "6px 10px", cursor: "pointer", fontSize: "0.8rem" }}>Twitter</button>
                  <button onClick={() => handleShare('linkedin')} style={{ background: "#0A66C2", color: "#fff", border: "none", borderRadius: 4, padding: "6px 10px", cursor: "pointer", fontSize: "0.8rem" }}>LinkedIn</button>
                  <button onClick={() => handleShare('whatsapp')} style={{ background: "#25D366", color: "#fff", border: "none", borderRadius: 4, padding: "6px 10px", cursor: "pointer", fontSize: "0.8rem" }}>WhatsApp</button>
                </div>
              )}
            </div>
          </div>

          <hr style={{ border: "none", borderTop: `1px solid ${P.border}`, marginBottom: 28 }} />
        </div>

        {/* Article body */}
        <div style={{ padding: "0 40px 40px" }}>
          {article.content.map((block, i) => renderBlock(block, i))}
        </div>
      </div>
    </div>
  );
};

/* ════════════════════════════════════════════════════════════
   1. HERO
════════════════════════════════════════════════════════ */
const Hero = ({ onOpenArticle }) => (
  <section style={{ background: P.white, padding: "90px 6vw 80px", position: "relative", overflow: "hidden" }}>
    {[
      { s: 600, t: -120, r: -100, c: `${P.blue}13` },
      { s: 350, b: -80, l: "5%", c: `${P.navy}0e` },
      { s: 200, t: "35%", r: "22%", c: `${P.blue}0b` },
    ].map((b, i) => (
      <div key={i} style={{
        position: "absolute", borderRadius: "50%", pointerEvents: "none",
        width: b.s, height: b.s,
        background: `radial-gradient(circle,${b.c} 0%,transparent 70%)`,
        top: b.t, right: b.r, bottom: b.b, left: b.l,
      }} />
    ))}

    <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "clamp(2rem, 5vw, 5rem)", alignItems: "center", position: "relative", zIndex: 1 }}>
      <div>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 7,
          fontSize: 11, fontWeight: 700, letterSpacing: "0.13em", textTransform: "uppercase",
          color: P.blue, background: `${P.blue}10`, border: `1px solid ${P.blue}28`,
          borderRadius: 50, padding: "5px 14px", marginBottom: 20,
          animation: "fu .8s ease both",
        }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: P.blue, display: "inline-block" }} />
          ONEFOCUS AFRICA Blog
        </div>

        <h1 style={{
          fontFamily: "'Syne',sans-serif", fontSize: "clamp(2.1rem,3.6vw,3.6rem)",
          fontWeight: 800, lineHeight: 1.1, color: P.black, marginBottom: 20,
          animation: "fu .8s .1s ease both",
        }}>
          Empowering Africa's Youth Through{" "}
          <span style={{ color: P.blue }}>Skills</span>,{" "}
          <span style={{ background: `linear-gradient(135deg,${P.blue},${P.navy})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Mentorship</span>{" "}
          &amp; Career Opportunities
        </h1>

        <p style={{ color: P.muted, fontSize: "1rem", lineHeight: 1.82, maxWidth: 500, marginBottom: 32, animation: "fu .8s .2s ease both" }}>
          Discover career pathways, mentorship stories, networking events, AI guidance, and youth empowerment programs designed to unlock your potential.
        </p>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", animation: "fu .8s .3s ease both" }}>
          <BtnSolid onClick={() => onOpenArticle(ARTICLES[0])}>🔵 Join a Program</BtnSolid>
          <a href="https://linktr.ee/onefocusafrica" target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}><BtnOutline>Partner With Us</BtnOutline></a>
          <a href="https://linktr.ee/onefocusafrica" target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}><BtnOutline>Subscribe to Updates</BtnOutline></a>
        </div>
      </div>

      <div style={{ animation: "fu .8s .45s ease both" }}>
        <div style={{
          background: `linear-gradient(135deg,${P.blue}12,${P.navy}0d)`,
          border: `1.5px solid ${P.blue}1e`, borderRadius: 28, padding: "2.5rem",
          display: "flex", flexDirection: "column", gap: 18,
          position: "relative", overflow: "hidden",
        }}>
          <div style={{ position: "absolute", top: -50, right: -50, width: 180, height: 180, borderRadius: "50%", background: `radial-gradient(circle,${P.blue}1a 0%,transparent 70%)` }} />
          <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1rem", color: P.black }}>Topics We Cover</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {[["Career Development", "#1f99ed"], ["Mentorship Stories", "#1f99ed"], ["Youth Events", "#1f99ed"], ["Networking & Leadership", "#1f99ed"], ["AI & Digital Skills", "#1f99ed"], ["School Outreach", "#1f99ed"], ["Community Impact", "#1f99ed"]].map(([label, color]) => (
              <span key={label} style={{ background: P.white, border: `1.5px solid ${color}28`, borderRadius: 50, padding: "7px 14px", fontSize: "0.78rem", fontWeight: 600, color, boxShadow: `0 2px 10px ${color}14` }}>{label}</span>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 4 }}>
            {[["6 Articles Published"], ["40+ Podcast Episodes"], ["Pan-African Reach"], ["Growing Community"]].map(([ic, lb]) => (
              <div key={lb} style={{ background: P.white, borderRadius: 14, padding: "12px 14px", display: "flex", alignItems: "center", gap: 10, border: `1px solid ${P.border}`, boxShadow: `0 2px 12px ${P.blue}0e` }}>
                <span style={{ fontSize: "1.2rem" }}>{ic}</span>
                <span style={{ fontFamily: "'Syne',sans-serif", fontSize: "0.76rem", fontWeight: 700, color: P.dark }}>{lb}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ════════════════════════════════════════════════════════════
   2. FEATURED SECTION
════════════════════════════════════════════════════════ */
const FeaturedSection = ({ onOpenArticle }) => (
  <section style={{ padding: "5rem 6vw", background: P.offwhite }}>
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <FadeUp style={{ marginBottom: 42 }}>
        <Chip>Featured Programs</Chip>
        <Bar />
        <H2>Our Core Ecosystem Programs</H2>
        <p style={{ color: P.muted, fontSize: "0.95rem", lineHeight: 1.8, maxWidth: 540 }}>
          Explore the four pillars of the ONEFOCUS AFRICA talent ecosystem — each designed to take youth from discovery to opportunity.
        </p>
      </FadeUp>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
        {FEATURED_PROGRAMS.map(({ image, bg, cat, title, summary, articleId }, i) => {
          const [h, setH] = useState(false);
          const article = ARTICLES.find(a => a.id === articleId);
          const cs = catCs(cat);
          return (
            <FadeUp key={title} delay={i * 0.09}>
  <div
    onMouseEnter={() => setH(true)}
    onMouseLeave={() => setH(false)}
    style={{
      background: P.white,
      border: `1.5px solid ${h ? P.blue : P.border}`,
      borderRadius: 20,
      overflow: "hidden",
      transform: h ? "translateY(-7px)" : "none",
      boxShadow: h ? `0 22px 50px ${P.blue}18` : "0 3px 16px rgba(0,0,0,0.055)",
      transition: "all .35s ease",
      display: "flex",
      flexDirection: "column",
    }}
  >
    {/* Image section */}
    <div
      style={{
        height: 140,
        background: bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderBottom: `1px solid ${P.border}`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: h
            ? `linear-gradient(135deg,${P.blue}18,${P.navy}10)`
            : "transparent",
          transition: "background .35s ease",
        }}
      />

      <Image
        src={image}
        alt={title}
        fill
        style={{
          objectFit: "cover",
          objectPosition: "center",
          position: "relative",
          zIndex: 1,
        }}
      />
    </div>

    {/* Content */}
    <div
      style={{
        padding: "1.4rem",
        display: "flex",
        flexDirection: "column",
        flex: 1,
      }}
    >
      <span
        style={{
          display: "inline-block",
          background: cs.bg,
          color: cs.text,
          fontSize: "0.68rem",
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          borderRadius: 50,
          padding: "3px 10px",
          marginBottom: 10,
          width: "fit-content",
        }}
      >
        {cat}
      </span>

      <h3
        style={{
          fontFamily: "'Syne',sans-serif",
          fontSize: "0.93rem",
          fontWeight: 800,
          color: P.black,
          lineHeight: 1.45,
          marginBottom: 8,
          flex: 1,
        }}
      >
        {title}
      </h3>

      <p
        style={{
          fontSize: "0.8rem",
          color: P.muted,
          lineHeight: 1.65,
          marginBottom: 14,
        }}
      >
        {summary}
      </p>

      <ReadMoreBtn
        onClick={() => article && onOpenArticle(article)}
        hover={h}
      />
    </div>
  </div>
</FadeUp>
          );
        })}
      </div>
    </div>
  </section>
);

/* ── Read More Button ── */
const ReadMoreBtn = ({ onClick, hover = false, label = "Read More →" }) => {
  const [h, setH] = useState(false);
  const active = h || hover;
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        alignSelf: "flex-start",
        background: active ? `linear-gradient(135deg,${P.blue},${P.navy})` : "transparent",
        border: `1.5px solid ${active ? "transparent" : P.blue}`,
        color: active ? "#fff" : P.blue,
        borderRadius: 50, padding: "8px 18px",
        fontSize: "0.78rem", fontWeight: 600,
        cursor: "pointer", fontFamily: "'DM Sans',sans-serif",
        transition: "all .25s ease",
        boxShadow: active ? `0 6px 18px ${P.blue}30` : "none",
      }}>{label}</button>
  );
};

/* ════════════════════════════════════════════════════════════
   3. SEO KEYWORD STRIP
════════════════════════════════════════════════════════ */
const KeywordStrip = () => (
  <div style={{ background: P.offwhite, borderTop: `1px solid ${P.border}`, borderBottom: `1px solid ${P.border}`, padding: "1.2rem 6vw", overflow: "hidden" }}>
    <div style={{ display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "center" }}>
      {["Youth Empowerment in Africa", "Career Mentorship Programs", "Skills Development for Youth", "School Career Guidance", "AI Career Guidance Africa", "Networking Events for Youth", "Professional Development Rwanda", "Youth Leadership Programs", "Internship Pathways", "TVET Mentorship Support", "Career Workshops Rwanda", "Dream Career Support"].map(kw => (
        <span key={kw} style={{ fontSize: "0.76rem", color: P.muted, display: "flex", alignItems: "center", gap: 6, whiteSpace: "nowrap" }}>
          <span style={{ color: P.blue, fontSize: "0.6rem" }}>●</span>{kw}
        </span>
      ))}
    </div>
  </div>
);

/* ════════════════════════════════════════════════════════════
   4. BLOG ARTICLES SECTION
════════════════════════════════════════════════════════ */
const BlogSection = ({ onOpenArticle }) => {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? ARTICLES : ARTICLES.filter(a => a.cat === active);

  return (
    <section style={{ padding: "5rem 6vw", background: P.white }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        <FadeUp style={{ marginBottom: 36 }}>
          <Chip>Explore Articles</Chip>
          <Bar />
          <H2>Latest From Our Blog</H2>
        </FadeUp>

        {/* Filter tabs */}
        <FadeUp delay={0.05} style={{ marginBottom: 40, overflowX: "auto", paddingBottom: 4 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, padding: "6px", background: P.offwhite, border: `1px solid ${P.border}`, borderRadius: 50, width: "fit-content" }}>
            {CATEGORIES.map(cat => {
              const isActive = cat === active;
              return (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  style={{
                    background: isActive ? `linear-gradient(135deg,${P.blue},${P.navy})` : "transparent",
                    color: isActive ? "#fff" : P.muted,
                    border: "none", borderRadius: 50, padding: "8px 18px",
                    fontSize: "0.8rem", fontWeight: 600, cursor: "pointer",
                    fontFamily: "'DM Sans',sans-serif",
                    boxShadow: isActive ? `0 4px 14px ${P.blue}33` : "none",
                    transition: "all .25s ease", whiteSpace: "nowrap",
                  }}>{cat}</button>
              );
            })}
          </div>
        </FadeUp>

        {/* Articles grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
          {filtered.map((article, i) => {
            const [h, setH] = useState(false);
            const cs = catCs(article.cat);
            const views = article.views || Math.floor(Math.random() * 500) + 500;
            return (
              <FadeUp key={article.id} delay={i * 0.07}>
                <div
                  onMouseEnter={() => setH(true)}
                  onMouseLeave={() => setH(false)}
                  style={{
                    background: P.white, border: `1.5px solid ${h ? P.blue : P.border}`,
                    borderRadius: 20, transform: h ? "translateY(-6px)" : "none",
                    boxShadow: h ? `0 20px 50px ${P.blue}16` : "0 3px 16px rgba(0,0,0,0.05)",
                    transition: "all .3s ease", overflow: "hidden",
                    display: "flex", flexDirection: "column",
                  }}>
                  {/* accent band */}
                  <div style={{ height: 5, background: `linear-gradient(90deg,${P.blue},${P.navy})` }} />

                  <div style={{ padding: "1.6rem", display: "flex", flexDirection: "column", flex: 1 }}>
                    {/* meta */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                      <span style={{ background: cs.bg, color: cs.text, fontSize: "0.66rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: 50, padding: "3px 10px" }}>{article.cat}</span>
                      <span style={{ fontSize: "0.72rem", color: P.muted }}>{article.readTime}</span>
                    </div>

                    {/* emoji + title */}
                    <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 10 }}>
                      <span style={{ fontSize: "1.8rem", flexShrink: 0, width: 48, height: 48, background: P.offwhite, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>{article.emoji}</span>
                      <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: "0.93rem", fontWeight: 800, color: P.black, lineHeight: 1.45 }}>{article.title}</h3>
                    </div>

                    <p style={{ fontSize: "0.81rem", color: P.muted, lineHeight: 1.68, marginBottom: 16, flex: 1 }}>{article.excerpt}</p>

                    {/* tags */}
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
                      {article.tags.map(t => (
                        <span key={t} style={{ background: P.offwhite, border: `1px solid ${P.border}`, borderRadius: 50, padding: "3px 10px", fontSize: "0.7rem", color: P.muted, fontWeight: 500 }}>{t}</span>
                      ))}
                    </div>

                    {/* Views and likes preview */}
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12, fontSize: "0.75rem", color: P.muted }}>
                      <span style={{ display: "flex", alignItems: "center", gap: 3 }}>👁️ {views.toLocaleString()}</span>
                      <span style={{ display: "flex", alignItems: "center", gap: 3 }}>❤️ {(article.likes || 20) + Math.floor(Math.random() * 30)}</span>
                    </div>

                    <ReadMoreBtn onClick={() => onOpenArticle(article)} hover={h} label="Read Article →" />
                  </div>
                </div>
              </FadeUp>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "4rem", color: P.muted }}>
            <div style={{ fontSize: "3rem", marginBottom: 16 }}>📭</div>
            <p style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700 }}>No articles in this category yet.</p>
          </div>
        )}
      </div>
    </section>
  );
};

/* ════════════════════════════════════════════════════════════
   5. SUBSCRIBE
════════════════════════════════════════════════════════ */
const Subscribe = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <section style={{ padding: "4rem 6vw", background: P.white }}>
      <FadeUp>
        <div style={{ maxWidth: 720, margin: "0 auto", background: `linear-gradient(135deg,${P.blue}10,${P.navy}0a)`, border: `1.5px solid ${P.blue}20`, borderRadius: 24, padding: "3rem 2.5rem", textAlign: "center" }}>
          <div style={{ fontSize: "2.5rem", marginBottom: 14 }}>📬</div>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "1.5rem", fontWeight: 800, color: P.black, marginBottom: 10 }}>Stay Updated on Youth Empowerment in Africa</h2>
          <p style={{ color: P.muted, fontSize: "0.92rem", lineHeight: 1.75, marginBottom: 24 }}>Get the latest articles, mentorship opportunities, career tips, and program updates delivered straight to your inbox.</p>
          {sent ? (
            <div style={{ background: "#e8f7f0", border: "1px solid #0a8a5530", borderRadius: 14, padding: "14px 24px", color: "#0a8a55", fontWeight: 600, fontSize: "0.9rem" }}>✅ You're subscribed! Welcome to the ONEFOCUS AFRICA community.</div>
          ) : (
            <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email address" style={{ flex: 1, minWidth: 220, maxWidth: 340, padding: "12px 18px", borderRadius: 50, border: `1.5px solid ${P.border}`, fontFamily: "'DM Sans',sans-serif", fontSize: "0.88rem", outline: "none", color: P.dark }} />
              <button onClick={() => email && setSent(true)} style={{ background: `linear-gradient(135deg,${P.blue},${P.navy})`, color: "#fff", border: "none", padding: "12px 26px", borderRadius: 50, fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "0.88rem", cursor: "pointer", boxShadow: `0 6px 20px ${P.blue}33` }}>Subscribe →</button>
            </div>
          )}
        </div>
      </FadeUp>
    </section>
  );
};

/* ════════════════════════════════════════════════════════════
   6. CTA
════════════════════════════════════════════════════════ */
const CTA = () => {
  const cards = [
    { icon: "🎓", label: "A student searching for direction", btn: "Join a Program" },
    { icon: "🧑‍💼", label: "A professional wanting to mentor", btn: "Become a Mentor" },
    { icon: "🏫", label: "A school looking for partnership", btn: "Partner With Us" },
    { icon: "🤝", label: "An NGO seeking youth programs", btn: "Explore Collaboration" },
  ];
  return (
    <section style={{ padding: "6rem 6vw", background: `linear-gradient(135deg,${P.navy} 0%,${P.blue} 100%)`, position: "relative", overflow: "hidden" }}>
      {[{ s: 420, t: -110, r: -110 }, { s: 260, b: -70, l: "8%" }].map((b, i) => (
        <div key={i} style={{ position: "absolute", borderRadius: "50%", pointerEvents: "none", width: b.s, height: b.s, background: "rgba(255,255,255,0.055)", top: b.t, right: b.r, bottom: b.b, left: b.l }} />
      ))}
      <FadeUp>
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div style={{ display: "inline-block", background: "rgba(255,255,255,0.14)", border: "1px solid rgba(255,255,255,0.28)", borderRadius: 50, padding: "5px 16px", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.13em", textTransform: "uppercase", color: "#fff", marginBottom: 18 }}>Ready to Unlock Your Potential?</div>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(1.9rem,3vw,3rem)", fontWeight: 800, color: "#fff", lineHeight: 1.12, marginBottom: 16 }}>ONEFOCUS AFRICA Is Building<br />Africa's Future Talent Ecosystem</h2>
            <p style={{ color: "rgba(255,255,255,0.78)", fontSize: "1rem", lineHeight: 1.8, maxWidth: 560, margin: "0 auto" }}>Whether you are a student, mentor, school, NGO, or sponsor — there is a place for you in our ecosystem.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 18, marginBottom: 48 }}>
            {cards.map(({ icon, label, btn }) => {
              const [h, setH] = useState(false);
              return (
                <div key={label} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ background: h ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.10)", border: `1.5px solid ${h ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.2)"}`, borderRadius: 18, padding: "1.8rem 1.3rem", textAlign: "center", transform: h ? "translateY(-5px)" : "none", transition: "all .3s ease" }}>
                  <div style={{ fontSize: "2.2rem", marginBottom: 12 }}>{icon}</div>
                  <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.85rem", lineHeight: 1.6, marginBottom: 16 }}>{label}</p>
                  <a href="https://linktr.ee/onefocusafrica" target="_blank" rel="noreferrer" style={{ background: h ? "#fff" : "rgba(255,255,255,0.15)", color: h ? P.blue : "#fff", border: "none", borderRadius: 50, padding: "8px 16px", fontSize: "0.75rem", fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans',sans-serif", transition: "all .25s ease", textDecoration: "none", display: "inline-block" }}>{btn}</a>
                </div>
              );
            })}
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
            {[{ label: "🔵 Join a Program", solid: true, href: "https://linktr.ee/onefocusafrica" }, { label: "Become a Partner", solid: false, href: "https://linktr.ee/onefocusafrica" }, { label: "Sponsor Youth Development", solid: false, href: "https://linktr.ee/onefocusafrica" }].map(({ label, solid, href }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" style={{ background: solid ? "#fff" : "rgba(255,255,255,0.13)", color: solid ? P.blue : "#fff", border: solid ? "none" : "2px solid rgba(255,255,255,0.4)", borderRadius: 50, padding: "14px 30px", fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.95rem", cursor: "pointer", boxShadow: solid ? "0 10px 30px rgba(0,0,0,0.15)" : "none", textDecoration: "none", display: "inline-block" }}>{label}</a>
            ))}
          </div>
        </div>
      </FadeUp>
    </section>
  );
};

/* ════════════════════════════════════════════════════════════
   ROOT EXPORT
════════════════════════════════════════════════════════ */
export default function OneFocusAfricaBlog() {
  const [openArticle, setOpenArticle] = useState(null);

  return (
    <Layout className="min-h-screen">
      <HeaderComponent />
      <Content>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
          html { scroll-behavior: smooth; }
          body { font-family: 'DM Sans', sans-serif; background: #fff; overflow-x: hidden; }
          @keyframes fu { from { opacity:0; transform:translateY(34px); } to { opacity:1; transform:none; } }
          @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
          @keyframes slideUp { from { opacity:0; transform:translateY(40px); } to { opacity:1; transform:none; } }
          input:focus { border-color: #1f99ed !important; box-shadow: 0 0 0 3px #1f99ed18; }
          ::-webkit-scrollbar { width: 6px; }
          ::-webkit-scrollbar-track { background: #f5f8fc; }
          ::-webkit-scrollbar-thumb { background: #1f99ed44; border-radius: 3px; }
        `}</style>

        <Hero onOpenArticle={setOpenArticle} />
        <FeaturedSection onOpenArticle={setOpenArticle} />
        <KeywordStrip />
        <BlogSection onOpenArticle={setOpenArticle} />
        <Subscribe />
        <CTA />

        {openArticle && (
          <ArticleModal article={openArticle} onClose={() => setOpenArticle(null)} />
        )}
      </Content>
      <FooterComponent />
    </Layout>
  );
}
