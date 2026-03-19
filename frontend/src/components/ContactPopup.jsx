import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const ContactPopup = () => {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const navigate = useNavigate();
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setOpen(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true));
      });
    }, 4000);
    return () => clearTimeout(timerRef.current);
  }, []);

  const handleClose = () => {
    setVisible(false);
    setDismissed(true);
    setTimeout(() => setOpen(false), 400);
  };

  const handleContact = () => {
    handleClose();
    setTimeout(() => navigate('/contact'), 200);
  };

  if (!open) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700&family=DM+Sans:wght@300;400;500&display=swap');

        @keyframes slideUp {
          from { transform: translateY(20px) scale(0.97); opacity: 0; }
          to   { transform: translateY(0)   scale(1);    opacity: 1; }
        }
        @keyframes slideDown {
          from { transform: translateY(0)   scale(1);    opacity: 1; }
          to   { transform: translateY(20px) scale(0.97); opacity: 0; }
        }
        @keyframes scanline {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(400%);  }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.15); }
        }
        @keyframes borderTrace {
          0%   { stroke-dashoffset: 800; }
          100% { stroke-dashoffset: 0;   }
        }

        .cp-popup {
          position: fixed;
          bottom: 110px;
          right: 32px;
          width: 300px;
          z-index: 2000;
          font-family: 'DM Sans', sans-serif;
          animation: slideUp 0.45s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .cp-popup.hiding {
          animation: slideDown 0.35s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .cp-card {
          position: relative;
          background: linear-gradient(145deg, #0d1f3c 0%, #0a1628 60%, #091220 100%);
          border-radius: 16px;
          padding: 28px 26px 24px;
          overflow: hidden;
          box-shadow:
            0 0 0 1px rgba(100,255,218,0.12),
            0 20px 60px rgba(0,0,0,0.7),
            0 0 40px rgba(100,255,218,0.04) inset;
        }
        /* Animated border SVG */
        .cp-border-svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }
        .cp-border-rect {
          fill: none;
          stroke: #64ffda;
          stroke-width: 1.5;
          stroke-dasharray: 800;
          stroke-dashoffset: 800;
          rx: 16;
          ry: 16;
          animation: borderTrace 1.2s cubic-bezier(0.4,0,0.2,1) 0.2s forwards;
        }
        /* Scanline shimmer */
        .cp-scanline {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            transparent 40%,
            rgba(100,255,218,0.03) 50%,
            transparent 60%
          );
          animation: scanline 4s linear infinite;
          pointer-events: none;
        }
        /* Noise texture overlay */
        .cp-noise {
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
          border-radius: 16px;
          pointer-events: none;
          opacity: 0.5;
        }
        /* Glowing orb */
        .cp-orb {
          position: absolute;
          top: -40px;
          right: -40px;
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(100,255,218,0.12) 0%, transparent 70%);
          animation: pulseGlow 3s ease-in-out infinite;
          pointer-events: none;
        }

        /* Close button */
        .cp-close {
          position: absolute;
          top: 12px;
          right: 12px;
          width: 28px;
          height: 28px;
          border: none;
          background: rgba(100,255,218,0.07);
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #8892b0;
          transition: background 0.2s, color 0.2s, transform 0.2s;
          z-index: 2;
        }
        .cp-close:hover {
          background: rgba(100,255,218,0.15);
          color: #64ffda;
          transform: rotate(90deg);
        }

        /* Status chip */
        .cp-status {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(100,255,218,0.08);
          border: 1px solid rgba(100,255,218,0.2);
          border-radius: 20px;
          padding: 3px 10px 3px 7px;
          margin-bottom: 16px;
        }
        .cp-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #64ffda;
          animation: pulseGlow 2s ease-in-out infinite;
          flex-shrink: 0;
        }
        .cp-status-text {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 500;
          color: #64ffda;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        /* Heading */
        .cp-heading {
          font-family: 'Syne', sans-serif;
          font-size: 20px;
          font-weight: 700;
          color: #e6f1ff;
          line-height: 1.2;
          margin: 0 0 8px;
          letter-spacing: -0.02em;
        }
        .cp-heading span {
          color: #64ffda;
        }

        /* Body */
        .cp-body {
          font-size: 13.5px;
          font-weight: 300;
          color: #8892b0;
          line-height: 1.6;
          margin: 0 0 22px;
        }

        /* Divider */
        .cp-divider {
          height: 1px;
          background: linear-gradient(to right, rgba(100,255,218,0.15), transparent);
          margin-bottom: 20px;
        }

        /* CTA button */
        .cp-btn {
          width: 100%;
          padding: 13px 0;
          background: linear-gradient(135deg, #64ffda 0%, #4fd1c5 100%);
          color: #0a192f;
          font-family: 'Syne', sans-serif;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.04em;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 4px 20px rgba(100,255,218,0.25);
        }
        .cp-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.15), transparent);
          opacity: 0;
          transition: opacity 0.2s;
        }
        .cp-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(100,255,218,0.4);
        }
        .cp-btn:hover::before { opacity: 1; }
        .cp-btn:active { transform: translateY(0); }
        .cp-btn-inner {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .cp-arrow {
          transition: transform 0.2s;
        }
        .cp-btn:hover .cp-arrow {
          transform: translateX(4px);
        }
      `}</style>

      <div className={`cp-popup${!visible ? ' hiding' : ''}`}>
        <div className="cp-card">
          {/* Decorative layers */}
          <div className="cp-orb" />
          <div className="cp-scanline" />
          <div className="cp-noise" />

          {/* Animated border */}
          <svg className="cp-border-svg" viewBox="0 0 300 220" preserveAspectRatio="none">
            <rect className="cp-border-rect" x="1" y="1" width="298" height="218" rx="16" ry="16" />
          </svg>

          {/* Close */}
          <button className="cp-close" onClick={handleClose} aria-label="Close">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>

          {/* Status chip */}
          <div className="cp-status">
            <div className="cp-dot" />
            <span className="cp-status-text">Available for work</span>
          </div>

          <h3 className="cp-heading">
            Got a project<br />in <span>mind?</span>
          </h3>
          <p className="cp-body">
            I'm open to new opportunities — freelance, full-time, or just a great conversation.
          </p>

          <div className="cp-divider" />

          <button className="cp-btn" onClick={handleContact}>
            <span className="cp-btn-inner">
              Let's Talk
              <svg className="cp-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default ContactPopup;