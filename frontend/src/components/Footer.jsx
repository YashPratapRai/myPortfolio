import React from 'react';
import { GitHub, LinkedIn, Email } from '@mui/icons-material';
import { motion } from 'framer-motion';

const socialLinks = [
  { name: 'GitHub',   icon: <GitHub sx={{ fontSize: 17 }} />,   url: 'https://github.com/YashPratapRai',                          hoverColor: '#c9d1d9' },
  { name: 'LinkedIn', icon: <LinkedIn sx={{ fontSize: 17 }} />, url: 'https://www.linkedin.com/in/yash-pratap-rai-00465a284/',   hoverColor: '#0a66c2' },
  { name: 'Email',    icon: <Email sx={{ fontSize: 17 }} />,    url: 'mailto:raiyashpratap@gmail.com',                            hoverColor: '#ea4335' },
];

const Footer = () => (
  <>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400&family=Syne:wght@600&display=swap');

      .ft-root {
        background: #080c10;
        border-top: 1px solid rgba(100,255,218,0.08);
        padding: 18px 32px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        font-family: 'DM Mono', monospace;
        position: relative;
        overflow: hidden;
      }

      /* subtle teal line glow at top */
      .ft-root::before {
        content: '';
        position: absolute;
        top: 0; left: 50%; transform: translateX(-50%);
        width: 220px; height: 1px;
        background: linear-gradient(90deg, transparent, #64ffda66, transparent);
        pointer-events: none;
      }

      .ft-left {
        display: flex;
        align-items: center;
        gap: 8px;
        flex-shrink: 0;
      }
      .ft-dot {
        width: 6px; height: 6px;
        border-radius: 50%;
        background: #64ffda;
        animation: ftBlink 2.2s ease-in-out infinite;
        flex-shrink: 0;
      }
      @keyframes ftBlink {
        0%,100% { opacity: 1; }
        50%      { opacity: 0.2; }
      }
      .ft-name {
        font-family: 'Syne', sans-serif;
        font-weight: 600;
        font-size: 13px;
        color: #ccd6f6;
        letter-spacing: 0.01em;
        white-space: nowrap;
      }
      .ft-name span { color: #64ffda; }

      .ft-center {
        font-size: 11px;
        color: #8892b0;
        letter-spacing: 0.06em;
        text-align: center;
        white-space: nowrap;
      }
      .ft-center strong {
        color: #a8b2d8;
        font-weight: 400;
      }

      .ft-right {
        display: flex;
        align-items: center;
        gap: 4px;
        flex-shrink: 0;
      }
      .ft-icon-btn {
        width: 32px; height: 32px;
        border-radius: 8px;
        background: transparent;
        border: 1px solid #1e2a35;
        display: flex; align-items: center; justify-content: center;
        color: #8892b0;
        cursor: pointer;
        text-decoration: none;
        transition: border-color 0.2s, color 0.2s, background 0.2s;
      }
      .ft-icon-btn:hover {
        background: rgba(100,255,218,0.06);
        border-color: rgba(100,255,218,0.2);
      }

      /* heart pulse */
      .ft-heart {
        display: inline-block;
        color: #ff6b6b;
        font-size: 12px;
        animation: heartPulse 1.6s ease-in-out infinite;
        margin: 0 2px;
      }
      @keyframes heartPulse {
        0%,100% { transform: scale(1); }
        50%      { transform: scale(1.25); }
      }

      @media (max-width: 540px) {
        .ft-root { flex-direction: column; padding: 16px 20px; gap: 12px; text-align: center; }
        .ft-center { display: none; }
      }
    `}</style>

    <footer className="ft-root">

      {/* Left — name + status dot */}
      <div className="ft-left">
        <span className="ft-dot" />
        <span className="ft-name">Yash <span>Pratap Rai</span></span>
      </div>

      {/* Center — made with love */}
      <div className="ft-center">
        Made with <span className="ft-heart">♥</span> using{' '}
        <strong>React</strong> · <strong>MUI</strong> · <strong>Framer</strong>
        &nbsp;&nbsp;·&nbsp;&nbsp;© {new Date().getFullYear()}
      </div>

      {/* Right — social icons */}
      <div className="ft-right">
        {socialLinks.map((link) => (
          <motion.a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="ft-icon-btn"
            aria-label={link.name}
            title={link.name}
            whileHover={{ scale: 1.12, color: link.hoverColor }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 420, damping: 12 }}
            style={{ color: '#8892b0' }}
          >
            {link.icon}
          </motion.a>
        ))}
      </div>

    </footer>
  </>
);

export default Footer;