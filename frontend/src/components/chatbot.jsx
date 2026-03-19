import { useState, useRef, useEffect } from "react";

const BOT_AVATAR = "YR";
const WELCOME_TEXT = "Welcome to my portfolio! 👋 I'm Yash Pratap Rai's AI agent. Ask me anything about his skills, projects, experience, or background — I'm here to help!";

// Custom AI chatbot icon — robot face with antenna + circuit nodes
function AiBotIcon({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Antenna */}
      <line x1="20" y1="4" x2="20" y2="10" stroke="#64ffda" strokeWidth="1.8" strokeLinecap="round"/>
      <circle cx="20" cy="3" r="2" fill="#64ffda"/>
      {/* Head */}
      <rect x="7" y="10" width="26" height="20" rx="5" fill="#111" stroke="#64ffda" strokeWidth="1.5"/>
      {/* Eyes */}
      <rect x="12" y="16" width="5" height="5" rx="1.5" fill="#64ffda" opacity="0.9"/>
      <rect x="23" y="16" width="5" height="5" rx="1.5" fill="#64ffda" opacity="0.9"/>
      {/* Eye inner glow blink */}
      <rect x="13.5" y="17.5" width="2" height="2" rx="0.5" fill="#fff" opacity="0.6"/>
      <rect x="24.5" y="17.5" width="2" height="2" rx="0.5" fill="#fff" opacity="0.6"/>
      {/* Mouth — smile arc */}
      <path d="M14 25 Q20 29 26 25" stroke="#64ffda" strokeWidth="1.6" strokeLinecap="round" fill="none"/>
      {/* Ears / side nodes */}
      <rect x="4" y="17" width="3" height="6" rx="1.5" fill="#64ffda" opacity="0.5"/>
      <rect x="33" y="17" width="3" height="6" rx="1.5" fill="#64ffda" opacity="0.5"/>
    </svg>
  );
}

// Close icon
function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64ffda" strokeWidth="2.2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  );
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showHii, setShowHii] = useState(false);
  const [hiiDismissed, setHiiDismissed] = useState(false);
  const [typedWelcome, setTypedWelcome] = useState("");
  const [welcomeDone, setWelcomeDone] = useState(false);
  const bottomRef = useRef(null);
  const typeTimer = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => {
      setShowHii((prev) => { if (!open) return true; return prev; });
    }, 5000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (open) { setShowHii(false); setHiiDismissed(true); }
  }, [open]);

  useEffect(() => {
    if (open && messages.length === 0 && !welcomeDone) {
      let i = 0;
      setTypedWelcome("");
      clearInterval(typeTimer.current);
      typeTimer.current = setInterval(() => {
        i++;
        setTypedWelcome(WELCOME_TEXT.slice(0, i));
        if (i >= WELCOME_TEXT.length) {
          clearInterval(typeTimer.current);
          setWelcomeDone(true);
          setMessages([{ sender: "bot", text: WELCOME_TEXT }]);
        }
      }, 22);
    }
    return () => clearInterval(typeTimer.current);
  }, [open]);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open, loading, typedWelcome]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    const query = input;
    setInput("");
    try {
      const res = await fetch("https://myportfolio-1-m4un.onrender.com/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      if (!res.ok) throw new Error("Server error");
      const data = await res.json();
      setMessages((prev) => [...prev, { sender: "bot", text: data.response || "No response from AI" }]);
    } catch {
      setMessages((prev) => [...prev, { sender: "bot", text: "⚠️ Error connecting to AI. Try again..." }]);
    }
    setLoading(false);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700&family=DM+Mono:wght@300;400;500&display=swap');

        .cr * { box-sizing: border-box; font-family: 'DM Mono', monospace; }

        /* ── FAB ── */
        .cr-fab {
          position: fixed; bottom: 28px; right: 28px;
          width: 62px; height: 62px; border-radius: 50%;
          background: #0a0a0a;
          border: 1.5px solid #64ffda55;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          animation: fabPulse 2.8s infinite;
          transition: transform 0.2s, border-color 0.2s;
          z-index: 9999;
        }
        .cr-fab:hover { transform: scale(1.08); border-color: #64ffdaaa; }
        @keyframes fabPulse {
          0%   { box-shadow: 0 0 0 0 rgba(100,255,218,0.45); }
          70%  { box-shadow: 0 0 0 18px rgba(100,255,218,0); }
          100% { box-shadow: 0 0 0 0 rgba(100,255,218,0); }
        }
        /* Dashed orbit ring */
        .cr-fab-ring {
          position: absolute; inset: -7px; border-radius: 50%;
          border: 1px dashed #64ffda30;
          animation: ringRotate 7s linear infinite;
          pointer-events: none;
        }
        @keyframes ringRotate { to { transform: rotate(360deg); } }
        /* Eye blink on the bot icon */
        .cr-fab svg rect.eye { animation: eyeBlink 3.5s ease-in-out infinite; }
        @keyframes eyeBlink {
          0%,90%,100% { transform: scaleY(1); }
          94%          { transform: scaleY(0.1); }
        }

        /* ── Hii bubble ── */
        .cr-hii {
          position: fixed; bottom: 100px; right: 96px;
          background: #0d0d0d; border: 1px solid #64ffda55;
          border-radius: 16px 16px 4px 16px;
          padding: 11px 15px 11px 13px;
          font-size: 13px; color: #e0e0e0;
          font-family: 'Syne', sans-serif; font-weight: 600;
          white-space: nowrap; z-index: 9998;
          display: flex; align-items: center; gap: 7px;
          cursor: pointer;
          animation: hiiPop 0.45s cubic-bezier(0.16,1,0.3,1);
          box-shadow: 0 8px 32px rgba(0,0,0,0.55), 0 0 0 1px rgba(100,255,218,0.07);
        }
        @keyframes hiiPop {
          0%   { opacity: 0; transform: translateX(16px) scale(0.86); }
          55%  { transform: translateX(-3px) scale(1.02); }
          100% { opacity: 1; transform: translateX(0) scale(1); }
        }
        .cr-hii-accent { color: #64ffda; }
        .cr-hii-wave {
          display: inline-block;
          animation: wave 1.6s ease-in-out 0.5s 3;
          transform-origin: 70% 70%;
        }
        @keyframes wave {
          0%,100% { transform: rotate(0deg); }
          20%      { transform: rotate(20deg); }
          40%      { transform: rotate(-10deg); }
          60%      { transform: rotate(16deg); }
          80%      { transform: rotate(-6deg); }
        }
        .cr-hii-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: #64ffda; flex-shrink: 0;
          animation: hiiBlink 1.3s infinite;
        }
        @keyframes hiiBlink { 0%,100% { opacity:1; } 50% { opacity:0.15; } }
        .cr-hii-x {
          background: none; border: none; color: #444;
          cursor: pointer; font-size: 13px; padding: 0 0 0 3px;
          line-height: 1; transition: color 0.15s; flex-shrink: 0;
        }
        .cr-hii-x:hover { color: #888; }

        /* ── Panel ── */
        .cr-panel {
          position: fixed; bottom: 100px; right: 28px;
          width: 360px; max-height: 540px;
          display: flex; flex-direction: column;
          background: #0d0d0d; border: 1px solid #1f1f1f;
          border-radius: 18px;
          box-shadow: 0 24px 80px rgba(0,0,0,0.75), 0 0 0 1px rgba(100,255,218,0.06);
          overflow: hidden; z-index: 9998;
          animation: slideUp 0.28s cubic-bezier(0.16,1,0.3,1);
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(28px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .cr-header {
          padding: 16px 18px;
          background: linear-gradient(135deg, #111 60%, #0a1f1a);
          border-bottom: 1px solid #1a1a1a;
          display: flex; align-items: center; gap: 12px;
        }
        .cr-avatar {
          width: 38px; height: 38px; border-radius: 50%;
          background: linear-gradient(135deg, #64ffda, #00897b);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Syne', sans-serif; font-weight: 700;
          font-size: 13px; color: #000; flex-shrink: 0;
        }
        .cr-avatar-sm {
          width: 26px; height: 26px; border-radius: 50%;
          background: linear-gradient(135deg, #64ffda, #00897b);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Syne', sans-serif; font-weight: 700;
          font-size: 9px; color: #000; flex-shrink: 0;
        }
        .cr-name {
          font-family: 'Syne', sans-serif; font-weight: 700;
          font-size: 14px; color: #eee; line-height: 1.2;
        }
        .cr-status {
          font-size: 11px; color: #64ffda;
          display: flex; align-items: center; gap: 5px; margin-top: 2px;
        }
        .cr-status-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #64ffda; animation: blink 1.8s infinite;
        }
        @keyframes blink { 0%,100% { opacity:1; } 50% { opacity:0.25; } }
        .cr-close {
          background: none; border: none; cursor: pointer;
          padding: 4px; display: flex; align-items: center;
          transition: opacity 0.2s;
        }
        .cr-close:hover { opacity: 0.6; }

        .cr-msgs {
          flex: 1; overflow-y: auto; padding: 16px 14px;
          display: flex; flex-direction: column; gap: 10px;
          scrollbar-width: thin; scrollbar-color: #222 transparent;
        }
        .cr-msgs::-webkit-scrollbar { width: 4px; }
        .cr-msgs::-webkit-scrollbar-thumb { background: #222; border-radius: 4px; }

        .cr-row { display: flex; align-items: flex-end; gap: 8px; }
        .cr-row.user { flex-direction: row-reverse; }

        .cr-bubble {
          max-width: 78%; padding: 9px 13px;
          border-radius: 14px; font-size: 13px;
          line-height: 1.6; word-break: break-word;
          animation: popIn 0.2s ease;
        }
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.92) translateY(4px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        .cr-bubble.bot {
          background: #161616; color: #ddd;
          border-bottom-left-radius: 4px; border: 1px solid #232323;
        }
        .cr-bubble.bot-typing {
          background: #161616; color: #ddd;
          border-bottom-left-radius: 4px; border: 1px solid #64ffda33;
        }
        .cr-bubble.user {
          background: linear-gradient(135deg, #64ffda, #00bfa5);
          color: #000; font-weight: 500; border-bottom-right-radius: 4px;
        }
        .cr-cursor {
          display: inline-block; width: 2px; height: 13px;
          background: #64ffda; margin-left: 2px; vertical-align: middle;
          animation: cursorBlink 0.65s steps(1) infinite;
        }
        @keyframes cursorBlink { 0%,100% { opacity:1; } 50% { opacity:0; } }

        .cr-dots {
          display: flex; align-items: center; gap: 4px;
          padding: 10px 13px; background: #161616;
          border: 1px solid #232323; border-radius: 14px;
          border-bottom-left-radius: 4px; width: fit-content;
        }
        .cr-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #64ffda; animation: bounce 1.2s infinite;
        }
        .cr-dot:nth-child(2) { animation-delay: 0.2s; }
        .cr-dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes bounce {
          0%,80%,100% { transform: translateY(0); opacity: 0.35; }
          40%          { transform: translateY(-5px); opacity: 1; }
        }

        .cr-footer {
          padding: 12px 14px; border-top: 1px solid #1a1a1a;
          background: #0d0d0d; display: flex; align-items: center; gap: 8px;
        }
        .cr-input {
          flex: 1; background: #161616; border: 1px solid #272727;
          border-radius: 10px; padding: 9px 13px; color: #eee;
          font-family: 'DM Mono', monospace; font-size: 12.5px;
          outline: none; transition: border-color 0.2s;
        }
        .cr-input::placeholder { color: #444; }
        .cr-input:focus { border-color: #64ffda44; }
        .cr-send {
          width: 38px; height: 38px; border-radius: 10px;
          background: linear-gradient(135deg, #64ffda, #00bfa5);
          border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; transition: opacity 0.2s, transform 0.15s;
        }
        .cr-send:hover { opacity: 0.85; transform: scale(1.05); }
        .cr-send:disabled { opacity: 0.35; cursor: not-allowed; transform: none; }
        .cr-brand {
          text-align: center; font-size: 10px; color: #252525;
          padding: 5px 0 3px; letter-spacing: 0.05em;
        }
      `}</style>

      <div className="cr">
        {/* Hii bubble */}
        {showHii && !hiiDismissed && (
          <div className="cr-hii" onClick={() => setOpen(true)}>
            <span className="cr-hii-wave">👋</span>
            <span><span className="cr-hii-accent">Hii!</span> I'm Yash's AI</span>
            <span className="cr-hii-dot" />
            <button className="cr-hii-x" onClick={(e) => { e.stopPropagation(); setShowHii(false); setHiiDismissed(true); }}>✕</button>
          </div>
        )}

        {/* FAB — AI bot icon */}
        <button className="cr-fab" onClick={() => setOpen((o) => !o)} aria-label="Toggle chat">
          <span className="cr-fab-ring" />
          {open ? <CloseIcon /> : <AiBotIcon size={36} />}
        </button>

        {/* Panel */}
        {open && (
          <div className="cr-panel">
            <div className="cr-header">
              <div className="cr-avatar">{BOT_AVATAR}</div>
              <div style={{ flex: 1 }}>
                <div className="cr-name">Yash Pratap Rai</div>
                <div className="cr-status"><span className="cr-status-dot" />AI Agent · Online</div>
              </div>
              <button className="cr-close" onClick={() => setOpen(false)}><CloseIcon /></button>
            </div>

            <div className="cr-msgs">
              {!welcomeDone && (
                <div className="cr-row bot">
                  <div className="cr-avatar-sm">{BOT_AVATAR}</div>
                  <div className="cr-bubble bot-typing">{typedWelcome}<span className="cr-cursor" /></div>
                </div>
              )}
              {welcomeDone && messages.map((msg, i) => (
                <div key={i} className={`cr-row ${msg.sender}`}>
                  {msg.sender === "bot" && <div className="cr-avatar-sm">{BOT_AVATAR}</div>}
                  <div className={`cr-bubble ${msg.sender}`}>{msg.text}</div>
                </div>
              ))}
              {loading && (
                <div className="cr-row bot">
                  <div className="cr-avatar-sm">{BOT_AVATAR}</div>
                  <div className="cr-dots"><div className="cr-dot" /><div className="cr-dot" /><div className="cr-dot" /></div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            <div className="cr-footer">
              <input
                className="cr-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Yash..."
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button className="cr-send" onClick={sendMessage} disabled={loading || !input.trim()}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </button>
            </div>
            <div className="cr-brand">Powered by Yash's AI · RAG</div>
          </div>
        )}
      </div>
    </>
  );
}