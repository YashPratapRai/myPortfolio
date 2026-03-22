import { useState } from "react";

// ── Certificate images from assets ──
import cCpImg from "../assets/C_cp.png";
import cppCsImg from "../assets/c++_cs.png";
import dsaImg from "../assets/dsa_neocolab.png";
import infosysImg from "../assets/infosys_genAI.png";
import nptelImg from "../assets/nptel.png";
import Chatbot from "../components/chatbot";
import ContactPopup from "../components/ContactPopup";

const certs = [
  {
    id: 1,
    title: "C Programming",
    issuer: "Coding Ninjas",
    about: "Fundamentals of C programming — memory management, pointers, data structures, and algorithmic problem solving.",
    started: "Jan 2024",
    completed: "May 2024",
    verifyLink: "#",
    image: cCpImg,
    tag: "Programming",
    color: "#64ffda",
  },
  {
    id: 2,
    title: "C++ & Data Structures",
    issuer: "Coding Ninjas",
    about: "Object-oriented programming with C++, STL, templates, and core data structures including trees, graphs, and heaps.",
    started: "Aug 2024",
    completed: "Dec 2024",
    verifyLink: "#",
    image: cppCsImg,
    tag: "DSA",
    color: "#7b8cff",
  },
  {
    id: 3,
    title: "DSA Bootcamp",
    issuer: "NeoColab",
    about: "Intensive bootcamp covering advanced data structures & algorithms — dynamic programming, graphs, greedy, and competitive programming patterns.",
    started: "Aug 2024",
    completed: "Dec 2024",
    verifyLink: "#",
    image: dsaImg,
    tag: "Algorithms",
    color: "#ffd166",
  },
  {
    id: 4,
    title: "Generative AI",
    issuer: "Infosys Springboard",
    about: "Comprehensive course on Generative AI — LLMs, prompt engineering, RAG pipelines, transformer architecture, and real-world AI applications.",
    started: "July 2025",
    completed: "Aug 2025",
    verifyLink: "#",
    image: infosysImg,
    tag: "AI / ML",
    color: "#ff6b9d",
  },
  {
    id: 5,
    title: "NPTEL Certification",
    issuer: "NPTEL · IIT",
    about: "Government-accredited course from IIT faculty covering advanced computer science topics and problem-solving methodologies.",
    started: "Jan 2025",
    completed: "May 2025",
    verifyLink: "#",
    image: nptelImg,
    tag: "Academic",
    color: "#4ecdc4",
  },
];

const Modal = ({ cert, onClose }) => {
  if (!cert) return null;
  return (
    <div className="cert-modal-overlay" onClick={onClose}>
      <div className="cert-modal" onClick={(e) => e.stopPropagation()}>
        <button className="cert-modal-close" onClick={onClose}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </button>
        <div className="cert-modal-img-wrap">
          <img src={cert.image} alt={cert.title} className="cert-modal-img" />
          <div className="cert-modal-img-overlay" style={{ background: `${cert.color}18` }} />
        </div>
        <div className="cert-modal-body">
          <span className="cert-tag" style={{ color: cert.color, borderColor: `${cert.color}44`, background: `${cert.color}11` }}>
            {cert.tag}
          </span>
          <h2 className="cert-modal-title">{cert.title}</h2>
          <p className="cert-modal-issuer">{cert.issuer}</p>
          <p className="cert-modal-about">{cert.about}</p>
          <div className="cert-modal-dates">
            <div className="cert-date-item">
              <span className="cert-date-label">Started</span>
              <span className="cert-date-val">{cert.started}</span>
            </div>
            <div className="cert-date-divider" />
            <div className="cert-date-item">
              <span className="cert-date-label">Completed</span>
              <span className="cert-date-val">{cert.completed}</span>
            </div>
          </div>
          <a
            href={cert.verifyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="cert-verify-btn"
            style={{ background: cert.color }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 12l2 2 4-4"/><path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"/>
            </svg>
            Verify Certificate
          </a>
        </div>
      </div>
    </div>
  );
};

export default function Certifications() {
  const [active, setActive] = useState(null);
  const [filter, setFilter] = useState("All");

  const tags = ["All", ...Array.from(new Set(certs.map((c) => c.tag)))];
const filtered = filter === "All" ? [...certs].reverse() : [...certs].filter((c) => c.tag === filter).reverse();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');

        .cert-page {
          min-height: 100vh;
          background: #080c10;
          padding: 80px 24px 100px;
          font-family: 'DM Mono', monospace;
          position: relative;
          overflow-x: hidden;
        }

        /* Background grid */
        .cert-page::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image:
            linear-gradient(rgba(100,255,218,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(100,255,218,0.03) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
          z-index: 0;
        }

        /* Radial glow top-left */
        .cert-page::after {
          content: '';
          position: fixed;
          top: -200px; left: -200px;
          width: 600px; height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(100,255,218,0.05) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .cert-inner {
          max-width: 1100px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        /* ── Header ── */
        .cert-header {
          margin-bottom: 56px;
        }
        .cert-eyebrow {
          font-size: 11px;
          letter-spacing: 0.2em;
          color: #64ffda;
          text-transform: uppercase;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .cert-eyebrow::before {
          content: '';
          display: block;
          width: 28px;
          height: 1px;
          background: #64ffda;
        }
        .cert-h1 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(72px, 3.5vw, 38px);
          font-weight: 700;
          color: #e6f1ff;
          line-height: 1.1;
          letter-spacing: -0.02em;
          margin: 0 0 12px;
        }
        .cert-h1 em {
          font-style: normal;
          color: #64ffda;
          position: relative;
        }
        .cert-h1 em::after {
          content: '';
          position: absolute;
          bottom: 2px; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, #64ffda, transparent);
          border-radius: 2px;
        }
        .cert-subtitle {
          font-size: 14px;
          color: #4a5568;
          max-width: 480px;
          line-height: 1.7;
        }

        /* ── Filter tabs ── */
        .cert-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 48px;
        }
        .cert-filter-btn {
          padding: 7px 18px;
          border-radius: 40px;
          border: 1px solid #1e2a35;
          background: transparent;
          color: #4a5568;
          font-family: 'DM Mono', monospace;
          font-size: 12px;
          cursor: pointer;
          transition: all 0.2s;
          letter-spacing: 0.04em;
        }
        .cert-filter-btn:hover {
          border-color: #64ffda44;
          color: #a8b2d8;
        }
        .cert-filter-btn.active {
          background: rgba(100,255,218,0.1);
          border-color: #64ffda55;
          color: #64ffda;
        }

        /* ── Grid ── */
        .cert-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 24px;
        }

        /* ── Card ── */
        .cert-card {
          background: #0d1117;
          border: 1px solid #161b22;
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), border-color 0.3s, box-shadow 0.3s;
          animation: certFadeUp 0.5s ease both;
          position: relative;
        }
        .cert-card:hover {
          transform: translateY(-6px);
          border-color: var(--card-color, #64ffda33);
          box-shadow: 0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px var(--card-color, rgba(100,255,218,0.1));
        }
        @keyframes certFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .cert-card-img-wrap {
          position: relative;
          height: 180px;
          overflow: hidden;
          background: #0a0f14;
        }
        .cert-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top;
          transition: transform 0.4s ease;
          filter: brightness(0.85);
        }
        .cert-card:hover .cert-card-img {
          transform: scale(1.04);
          filter: brightness(1);
        }
        .cert-card-img-tint {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent 40%, #0d1117 100%);
        }

        /* Corner accent */
        .cert-card-corner {
          position: absolute;
          top: 12px; right: 12px;
          width: 32px; height: 32px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(6px);
        }

        .cert-card-body {
          padding: 18px 20px 20px;
        }

        .cert-tag {
          display: inline-block;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 3px 10px;
          border-radius: 20px;
          border: 1px solid;
          margin-bottom: 10px;
        }

        .cert-card-title {
          font-family: 'Syne', sans-serif;
          font-size: 17px;
          font-weight: 700;
          color: #ccd6f6;
          margin: 0 0 4px;
          line-height: 1.3;
        }
        .cert-card-issuer {
          font-size: 12px;
          color: #3d4f63;
          margin: 0 0 14px;
        }

        .cert-card-meta {
          display: flex;
          gap: 16px;
          border-top: 1px solid #161b22;
          padding-top: 14px;
          margin-top: 4px;
        }
        .cert-meta-item {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .cert-meta-label {
          font-size: 10px;
          color: #2d3748;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .cert-meta-val {
          font-size: 12px;
          color: #8892b0;
        }

        .cert-card-cta {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: #64ffda;
          margin-top: 14px;
          opacity: 0;
          transform: translateX(-6px);
          transition: opacity 0.25s, transform 0.25s;
        }
        .cert-card:hover .cert-card-cta {
          opacity: 1;
          transform: translateX(0);
        }

        /* ── Modal ── */
        .cert-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.85);
          backdrop-filter: blur(8px);
          z-index: 5000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          animation: overlayIn 0.2s ease;
        }
        @keyframes overlayIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .cert-modal {
          background: #0d1117;
          border: 1px solid #1e2a35;
          border-radius: 20px;
          width: 100%;
          max-width: 540px;
          overflow: hidden;
          position: relative;
          animation: modalIn 0.3s cubic-bezier(0.16,1,0.3,1);
          box-shadow: 0 40px 100px rgba(0,0,0,0.8);
        }
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.94) translateY(12px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        .cert-modal-close {
          position: absolute;
          top: 14px; right: 14px;
          width: 32px; height: 32px;
          border-radius: 50%;
          background: rgba(0,0,0,0.5);
          border: 1px solid #1e2a35;
          color: #8892b0;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.2s, color 0.2s, transform 0.2s;
          z-index: 2;
        }
        .cert-modal-close:hover {
          background: rgba(100,255,218,0.1);
          color: #64ffda;
          transform: rotate(90deg);
        }
        .cert-modal-img-wrap {
          position: relative;
          height: 240px;
          overflow: hidden;
          background: #080c10;
        }
        .cert-modal-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top;
        }
        .cert-modal-img-overlay {
          position: absolute;
          inset: 0;
        }
        .cert-modal-body {
          padding: 24px 28px 28px;
        }
        .cert-modal-title {
          font-family: 'Syne', sans-serif;
          font-size: 24px;
          font-weight: 800;
          color: #e6f1ff;
          margin: 8px 0 4px;
          letter-spacing: -0.02em;
        }
        .cert-modal-issuer {
          font-size: 13px;
          color: #4a5568;
          margin: 0 0 14px;
        }
        .cert-modal-about {
          font-size: 13.5px;
          color: #8892b0;
          line-height: 1.7;
          margin: 0 0 20px;
        }
        .cert-modal-dates {
          display: flex;
          align-items: center;
          gap: 20px;
          background: #080c10;
          border: 1px solid #161b22;
          border-radius: 12px;
          padding: 14px 20px;
          margin-bottom: 20px;
        }
        .cert-date-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .cert-date-label {
          font-size: 10px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #2d3748;
        }
        .cert-date-val {
          font-size: 14px;
          color: #ccd6f6;
          font-weight: 500;
        }
        .cert-date-divider {
          width: 1px;
          height: 36px;
          background: #1e2a35;
        }
        .cert-verify-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          border-radius: 10px;
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 14px;
          color: #080c10;
          text-decoration: none;
          width: 100%;
          justify-content: center;
          transition: opacity 0.2s, transform 0.2s, box-shadow 0.2s;
        }
        .cert-verify-btn:hover {
          opacity: 0.88;
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.4);
        }

        /* Count badge */
        .cert-count {
          font-size: 12px;
          color: #2d3748;
          margin-bottom: 24px;
          letter-spacing: 0.06em;
        }
        .cert-count span { color: #64ffda; }
      `}</style>

      <div className="cert-page">
        <div className="cert-inner">

          {/* Header */}
          <div className="cert-header">
            <div className="cert-eyebrow">Credentials</div>
            <h1 className="cert-h1">
              My <em>Certifications</em>
            </h1>
            <p className="cert-subtitle">
              A collection of courses, bootcamps, and certifications I've earned — each one a step forward in my journey.
            </p>
          </div>

          {/* Filters */}
          <div className="cert-filters">
            {tags.map((t) => (
              <button
                key={t}
                className={`cert-filter-btn${filter === t ? " active" : ""}`}
                onClick={() => setFilter(t)}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="cert-count">
            Showing <span>{filtered.length}</span> of {certs.length} certifications
          </div>

          {/* Grid */}
          <div className="cert-grid">
            {filtered.map((cert, i) => (
              <div
                key={cert.id}
                className="cert-card"
                style={{
                  "--card-color": `${cert.color}33`,
                  animationDelay: `${i * 0.07}s`,
                }}
                onClick={() => setActive(cert)}
              >
                <div className="cert-card-img-wrap">
                  <img src={cert.image} alt={cert.title} className="cert-card-img" />
                  <div className="cert-card-img-tint" />
                  <div className="cert-card-corner">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                      stroke={cert.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 12l2 2 4-4"/>
                      <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"/>
                    </svg>
                  </div>
                </div>

                <div className="cert-card-body">
                  <span
                    className="cert-tag"
                    style={{
                      color: cert.color,
                      borderColor: `${cert.color}44`,
                      background: `${cert.color}11`,
                    }}
                  >
                    {cert.tag}
                  </span>
                  <div className="cert-card-title">{cert.title}</div>
                  <div className="cert-card-issuer">{cert.issuer}</div>

                  <div className="cert-card-meta">
                    <div className="cert-meta-item">
                      <span className="cert-meta-label">Started</span>
                      <span className="cert-meta-val">{cert.started}</span>
                    </div>
                    <div className="cert-meta-item">
                      <span className="cert-meta-label">Completed</span>
                      <span className="cert-meta-val">{cert.completed}</span>
                    </div>
                  </div>

                  <div className="cert-card-cta">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                      <polyline points="15 3 21 3 21 9"/>
                      <line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                    View & Verify
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <ContactPopup />
        <Chatbot />
      </div>

      {/* Modal */}
      <Modal cert={active} onClose={() => setActive(null)} />
    </>
  );
}