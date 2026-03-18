import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GitHubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const LaunchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

const ProjectCard = ({
  title,
  description,
  image,
  githubLink,
  liveDemo,
  tags = []
}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [imgError, setImgError] = React.useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=IBM+Plex+Sans:wght@300;400;500&display=swap');

        @keyframes pc-glow-pulse {
          0%, 100% { opacity: 0.5; }
          50%       { opacity: 1; }
        }
        @keyframes pc-float-particle {
          0%   { transform: translate(0, 0) scale(1); opacity: 0; }
          30%  { opacity: 0.6; }
          100% { transform: translate(var(--tx), var(--ty)) scale(0.5); opacity: 0; }
        }
        @keyframes pc-scan {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(500%); }
        }
        @keyframes pc-underline-in {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }

        .pc-wrap {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          font-family: 'IBM Plex Sans', sans-serif;
        }

        .pc-card {
          position: relative;
          width: 100%;
          max-width: 400px;
          min-height: 500px;
          border-radius: 20px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          background: linear-gradient(145deg, rgba(15,32,39,0.92), rgba(10,25,47,0.97));
          border: 1px solid rgba(0,212,255,0.25);
          box-shadow:
            0 10px 40px -15px rgba(0,212,255,0.25),
            inset 0 0 24px rgba(0,212,255,0.06);
          transition: border-color 0.35s ease, box-shadow 0.35s ease;
          cursor: default;
        }
        .pc-card.hovered {
          border-color: rgba(0,212,255,0.55);
          box-shadow:
            0 20px 50px -10px rgba(0,212,255,0.35),
            inset 0 0 32px rgba(0,212,255,0.12);
        }

        /* Scanline */
        .pc-scanline {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 3;
          overflow: hidden;
          border-radius: 20px;
        }
        .pc-scanline::after {
          content: '';
          position: absolute;
          left: 0; right: 0;
          height: 60px;
          background: linear-gradient(to bottom, transparent, rgba(0,212,255,0.025), transparent);
          animation: pc-scan 6s linear infinite;
        }

        /* Corner accents */
        .pc-corner {
          position: absolute;
          width: 18px;
          height: 18px;
          z-index: 4;
          pointer-events: none;
        }
        .pc-corner-tl { top: 10px; left: 10px; border-top: 2px solid rgba(0,212,255,0.6); border-left: 2px solid rgba(0,212,255,0.6); border-radius: 3px 0 0 0; }
        .pc-corner-tr { top: 10px; right: 10px; border-top: 2px solid rgba(0,212,255,0.6); border-right: 2px solid rgba(0,212,255,0.6); border-radius: 0 3px 0 0; }
        .pc-corner-bl { bottom: 10px; left: 10px; border-bottom: 2px solid rgba(0,212,255,0.6); border-left: 2px solid rgba(0,212,255,0.6); border-radius: 0 0 0 3px; }
        .pc-corner-br { bottom: 10px; right: 10px; border-bottom: 2px solid rgba(0,212,255,0.6); border-right: 2px solid rgba(0,212,255,0.6); border-radius: 0 0 3px 0; }

        /* Image area */
        .pc-img-wrap {
          position: relative;
          height: 210px;
          overflow: hidden;
          flex-shrink: 0;
        }
        .pc-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          display: block;
        }
        .pc-card.hovered .pc-img {
          transform: scale(1.06);
        }
        .pc-img-placeholder {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(0,212,255,0.06), rgba(10,25,47,0.9));
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .pc-img-placeholder svg {
          opacity: 0.2;
          color: #00d4ff;
        }

        /* Image overlay gradient */
        .pc-img-overlay {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 80px;
          background: linear-gradient(to bottom, transparent, rgba(10,25,47,0.95));
          pointer-events: none;
        }

        /* Content */
        .pc-content {
          flex: 1;
          padding: 22px 24px 12px;
          display: flex;
          flex-direction: column;
          position: relative;
          z-index: 2;
        }

        .pc-title {
          font-family: 'Space Mono', monospace;
          font-size: 17px;
          font-weight: 700;
          color: #e0f7fa;
          margin: 0 0 14px;
          letter-spacing: 0.3px;
          line-height: 1.3;
          position: relative;
          padding-bottom: 12px;
        }
        .pc-title::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 40px; height: 2px;
          background: linear-gradient(90deg, #00d4ff, transparent);
          border-radius: 2px;
          transform-origin: left;
          animation: pc-underline-in 0.4s ease forwards;
        }

        .pc-desc {
          font-size: 13.5px;
          font-weight: 300;
          color: #90a4ae;
          line-height: 1.75;
          flex: 1;
          margin: 0 0 16px;
        }

        /* Tags */
        .pc-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
          margin-bottom: 4px;
        }
        .pc-tag {
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.7px;
          color: #00d4ff;
          background: rgba(0,212,255,0.08);
          border: 1px solid rgba(0,212,255,0.25);
          border-radius: 5px;
          padding: 3px 9px;
          transition: background 0.2s, border-color 0.2s;
        }
        .pc-tag:hover {
          background: rgba(0,212,255,0.15);
          border-color: rgba(0,212,255,0.5);
        }

        /* Actions */
        .pc-actions {
          padding: 12px 24px 22px;
          display: flex;
          gap: 10px;
          align-items: center;
          position: relative;
          z-index: 2;
        }

        .pc-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 9px 18px;
          border-radius: 10px;
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          text-decoration: none;
          border: 1px solid rgba(0,212,255,0.3);
          background: rgba(0,212,255,0.07);
          color: #b0bec5;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s, color 0.2s, transform 0.15s, box-shadow 0.2s;
          white-space: nowrap;
        }
        .pc-btn:hover {
          background: rgba(0,212,255,0.16);
          border-color: rgba(0,212,255,0.6);
          color: #00d4ff;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0,212,255,0.2);
        }
        .pc-btn:active { transform: translateY(0); }

        /* Particles */
        .pc-particle {
          position: absolute;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: #00d4ff;
          pointer-events: none;
          z-index: 0;
          animation: pc-float-particle 3s ease-out forwards;
        }
      `}</style>

      <div className="pc-wrap">
        <motion.div
          className={`pc-card${isHovered ? ' hovered' : ''}`}
          animate={{
            y: isHovered ? -8 : 0,
            scale: isHovered ? 1.02 : 1,
          }}
          transition={{ type: 'spring', stiffness: 220, damping: 18 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Scanline */}
          <div className="pc-scanline" />

          {/* Corner accents */}
          <div className="pc-corner pc-corner-tl" />
          <div className="pc-corner pc-corner-tr" />
          <div className="pc-corner pc-corner-bl" />
          <div className="pc-corner pc-corner-br" />

          {/* Image */}
          <div className="pc-img-wrap">
            {image && !imgError ? (
              <img
                className="pc-img"
                src={image}
                alt={title}
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="pc-img-placeholder">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                </svg>
              </div>
            )}
            <div className="pc-img-overlay" />
          </div>

          {/* Content */}
          <div className="pc-content">
            <h3 className="pc-title">{title}</h3>
            <p className="pc-desc">{description}</p>
            <div className="pc-tags">
              {tags.map((tag, i) => (
                <span key={i} className="pc-tag">{tag}</span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="pc-actions">
            {githubLink && (
              <a
                className="pc-btn"
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitHubIcon />
                Source
              </a>
            )}
            {liveDemo && (
              <a
                className="pc-btn"
                href={liveDemo}
                target="_blank"
                rel="noopener noreferrer"
              >
                <LaunchIcon />
                Live Demo
              </a>
            )}
          </div>

          {/* Particles on hover */}
          <AnimatePresence>
            {isHovered && [...Array(4)].map((_, i) => {
              const tx = (Math.random() * 160 - 80).toFixed(0);
              const ty = (Math.random() * 100 - 100).toFixed(0);
              return (
                <motion.div
                  key={i}
                  className="pc-particle"
                  initial={{ opacity: 0, x: Math.random() * 300, y: 350 }}
                  animate={{ opacity: [0, 0.7, 0], x: `calc(${Math.random() * 300}px + ${tx}px)`, y: 200 + Math.random() * 100 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2.5 + Math.random(), ease: 'easeOut', delay: i * 0.2 }}
                  style={{ '--tx': `${tx}px`, '--ty': `${ty}px`, left: `${20 + Math.random() * 60}%`, top: '60%' }}
                />
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
};

export default ProjectCard;