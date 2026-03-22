import React, { useState, useEffect, useRef } from 'react';
import {
  AppBar, Toolbar, Typography, Button, Slide, Dialog,
  DialogTitle, DialogContent, TextField, DialogActions,
  IconButton, Menu, MenuItem, useMediaQuery, Box,
  DialogContentText, InputAdornment, Avatar, Badge,
  Divider, Stack
} from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@mui/material/styles';
import {
  Visibility, VisibilityOff, Dashboard,
  ExitToApp, Lock, Code, Work, Mail, Home,
  WorkspacePremium
} from '@mui/icons-material';

const NAV_LINKS = [
  { path: '/',              label: 'Home',           icon: <Home fontSize="small" /> },
  { path: '/projects',      label: 'Projects',       icon: <Work fontSize="small" /> },
  { path: '/certifications',label: 'Certifications', icon: <WorkspacePremium fontSize="small" /> },
  { path: '/contact',       label: 'Contact',        icon: <Mail fontSize="small" /> },
  { path: '#skills',        label: 'Skills',         icon: <Code fontSize="small" />, isAnchor: true },
];

export default function Navbar() {
  const location  = useLocation();
  const navigate  = useNavigate();
  const theme     = useTheme();
  const isMobile  = useMediaQuery(theme.breakpoints.down('md'));

  const [isAdmin,      setIsAdmin]      = useState(false);
  const [openLogin,    setOpenLogin]    = useState(false);
  const [email,        setEmail]        = useState('');
  const [password,     setPassword]     = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [scrolled,     setScrolled]     = useState(false);
  const [menuOpen,     setMenuOpen]     = useState(false);
  const [anchorEl,     setAnchorEl]     = useState(null);
  const [loginError,   setLoginError]   = useState('');
  const drawerRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (localStorage.getItem('admin') === 'true') setIsAdmin(true);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const scrollToAnchor = (id) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 150);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogin = () => {
    setLoginError('');
    if (email === 'raiyashpratap@gmail.com' && password === '9335') {
      localStorage.setItem('admin', 'true');
      setIsAdmin(true);
      setOpenLogin(false);
      setEmail(''); setPassword('');
      navigate('/admin');
    } else {
      setLoginError('Invalid email or password');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin');
    setIsAdmin(false);
    setAnchorEl(null);
    navigate('/');
  };

  const isActive = (link) =>
    link.isAnchor
      ? location.hash === link.path
      : location.pathname === link.path;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');

        .nb-root { font-family: 'DM Mono', monospace; }

        /* ── NAV LINK ── */
        .nb-link {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          font-family: 'DM Mono', monospace;
          font-size: 12.5px;
          font-weight: 400;
          letter-spacing: 0.04em;
          color: #8892b0;
          background: none;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          text-decoration: none;
          transition: color 0.2s, background 0.2s;
          white-space: nowrap;
        }
        .nb-link:hover { color: #64ffda; background: rgba(100,255,218,0.06); }
        .nb-link.active { color: #64ffda; }
        .nb-link.active::after {
          content: '';
          position: absolute;
          bottom: 2px; left: 50%;
          transform: translateX(-50%);
          width: 16px; height: 2px;
          background: #64ffda;
          border-radius: 2px;
        }
        .nb-link svg { font-size: 14px !important; opacity: 0.7; }

        /* ── LOGO ── */
        .nb-logo {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 17px;
          color: #ccd6f6;
          text-decoration: none;
          letter-spacing: -0.02em;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .nb-logo-bracket { color: #64ffda; font-weight: 300; font-size: 20px; }
        .nb-logo-dot { color: #64ffda; }

        /* ── ADMIN BTN ── */
        .nb-admin-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 16px;
          font-family: 'DM Mono', monospace;
          font-size: 12px;
          font-weight: 500;
          color: #64ffda;
          background: rgba(100,255,218,0.06);
          border: 1px solid rgba(100,255,218,0.2);
          border-radius: 8px;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.2s;
          letter-spacing: 0.04em;
          white-space: nowrap;
        }
        .nb-admin-btn:hover {
          background: rgba(100,255,218,0.12);
          border-color: rgba(100,255,218,0.4);
          color: #64ffda;
        }

        /* ── MOBILE DRAWER ── */
        .nb-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(4px);
          z-index: 1200;
          animation: fadeIn 0.2s ease;
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

        .nb-drawer {
          position: fixed;
          top: 0; right: 0;
          width: min(300px, 85vw);
          height: 100dvh;
          background: #0d0d0d;
          border-left: 1px solid #1a1a1a;
          z-index: 1300;
          display: flex;
          flex-direction: column;
          animation: drawerIn 0.3s cubic-bezier(0.16,1,0.3,1);
        }
        @keyframes drawerIn {
          from { transform: translateX(100%); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
        .nb-drawer-header {
          padding: 20px 22px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #1a1a1a;
        }
        .nb-drawer-links {
          flex: 1;
          padding: 18px 12px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          overflow-y: auto;
        }
        .nb-drawer-link {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 11px 14px;
          font-family: 'DM Mono', monospace;
          font-size: 13px;
          color: #8892b0;
          text-decoration: none;
          border-radius: 10px;
          border: none;
          background: none;
          cursor: pointer;
          transition: all 0.18s;
          width: 100%;
          text-align: left;
          letter-spacing: 0.03em;
        }
        .nb-drawer-link:hover { color: #e0e0e0; background: #161616; }
        .nb-drawer-link.active { color: #64ffda; background: rgba(100,255,218,0.07); }
        .nb-drawer-link svg { font-size: 16px !important; flex-shrink: 0; }
        .nb-drawer-footer {
          padding: 16px 12px 24px;
          border-top: 1px solid #1a1a1a;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .nb-drawer-divider {
          height: 1px;
          background: #1a1a1a;
          margin: 4px 0;
        }

        /* ── HAMBURGER ── */
        .nb-hamburger {
          width: 38px; height: 38px;
          background: rgba(100,255,218,0.06);
          border: 1px solid rgba(100,255,218,0.15);
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: #64ffda;
          transition: all 0.2s;
        }
        .nb-hamburger:hover { background: rgba(100,255,218,0.12); }

        /* ── LOGIN DIALOG ── */
        .nb-dialog-input .MuiOutlinedInput-root {
          color: #ccd6f6;
          font-family: 'DM Mono', monospace;
          font-size: 13px;
        }
        .nb-dialog-input .MuiOutlinedInput-notchedOutline { border-color: #232323; }
        .nb-dialog-input:hover .MuiOutlinedInput-notchedOutline { border-color: #64ffda44; }
        .nb-dialog-input.Mui-focused .MuiOutlinedInput-notchedOutline { border-color: #64ffda; }
        .nb-dialog-input .MuiInputLabel-root { color: #555; font-family: 'DM Mono', monospace; font-size: 12px; }

        /* ── APPBAR OVERRIDES ── */
        .nb-appbar {
          backdrop-filter: blur(14px) !important;
        }
      `}</style>

      <div className="nb-root">
        {/* ── AppBar ── */}
        <Slide direction="down" in timeout={700}>
          <AppBar
            position="fixed"
            elevation={0}
            className="nb-appbar"
            sx={{
              background: scrolled
                ? 'rgba(10,10,10,0.88)'
                : 'rgba(10,10,10,0.5)',
              borderBottom: scrolled
                ? '1px solid rgba(100,255,218,0.1)'
                : '1px solid transparent',
              transition: 'all 0.35s ease',
              py: scrolled ? 0 : 0.5,
            }}
          >
            <Toolbar sx={{ justifyContent: 'space-between', minHeight: '62px !important', px: { xs: 2, md: 4 } }}>

              {/* Logo */}
              <Link to="/" className="nb-logo">
                <Avatar
                  src="/Screenshot 2025-08-03 110510.png"
                  alt="YR"
                  sx={{
                    width: 36, height: 36,
                    border: '1.5px solid rgba(100,255,218,0.3)',
                    transition: 'transform 0.3s',
                    '&:hover': { transform: 'rotate(12deg)' }
                  }}
                />
                <span>Yash.live</span>

              </Link>

              {/* Desktop nav */}
              {!isMobile && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  {NAV_LINKS.map((link) =>
                    link.isAnchor ? (
                      <button
                        key={link.label}
                        className={`nb-link${isActive(link) ? ' active' : ''}`}
                        onClick={() => scrollToAnchor('skills')}
                      >
                        {link.icon}{link.label}
                      </button>
                    ) : (
                      <Link
                        key={link.path}
                        to={link.path}
                        className={`nb-link${isActive(link) ? ' active' : ''}`}
                      >
                        {link.icon}{link.label}
                      </Link>
                    )
                  )}

                  <Box sx={{ width: '1px', height: 20, background: '#1e1e1e', mx: 1 }} />

                  {isAdmin ? (
                    <>
                      <Link to="/admin" className="nb-admin-btn">
                        <Dashboard sx={{ fontSize: '14px !important' }} />
                        Dashboard
                      </Link>
                      <button
                        className="nb-link"
                        onClick={handleLogout}
                        style={{ color: '#ff6b6b' }}
                      >
                        <ExitToApp sx={{ fontSize: '14px !important' }} />
                        Logout
                      </button>
                    </>
                  ) : (
                    <button
                      className="nb-admin-btn"
                      onClick={() => setOpenLogin(true)}
                    >
                      <Lock sx={{ fontSize: '14px !important' }} />
                      Admin
                    </button>
                  )}
                </Box>
              )}

              {/* Mobile hamburger */}
              {isMobile && (
                <button className="nb-hamburger" onClick={() => setMenuOpen(true)} aria-label="Open menu">
                  <MenuIcon sx={{ fontSize: 20 }} />
                </button>
              )}
            </Toolbar>
          </AppBar>
        </Slide>

        {/* ── Mobile Drawer ── */}
        <AnimatePresence>
          {isMobile && menuOpen && (
            <>
              <div className="nb-overlay" onClick={() => setMenuOpen(false)} />
              <div className="nb-drawer" ref={drawerRef}>
                <div className="nb-drawer-header">
                  <Link to="/" className="nb-logo" style={{ fontSize: 15 }}>
                    <span className="nb-logo-bracket">&lt;</span>
                    Yash<span className="nb-logo-dot">.</span>live
                    <span className="nb-logo-bracket">/&gt;</span>
                  </Link>
                  <button
                    style={{ background: 'none', border: 'none', color: '#555', cursor: 'pointer', padding: 4 }}
                    onClick={() => setMenuOpen(false)}
                  >
                    <CloseIcon sx={{ fontSize: 20 }} />
                  </button>
                </div>

                <div className="nb-drawer-links">
                  {NAV_LINKS.map((link) =>
                    link.isAnchor ? (
                      <button
                        key={link.label}
                        className={`nb-drawer-link${isActive(link) ? ' active' : ''}`}
                        onClick={() => { scrollToAnchor('skills'); setMenuOpen(false); }}
                      >
                        {link.icon}{link.label}
                      </button>
                    ) : (
                      <Link
                        key={link.path}
                        to={link.path}
                        className={`nb-drawer-link${isActive(link) ? ' active' : ''}`}
                        onClick={() => setMenuOpen(false)}
                      >
                        {link.icon}{link.label}
                      </Link>
                    )
                  )}
                </div>

                <div className="nb-drawer-footer">
                  <div className="nb-drawer-divider" />
                  {isAdmin ? (
                    <>
                      <Link
                        to="/admin"
                        className="nb-drawer-link"
                        onClick={() => setMenuOpen(false)}
                        style={{ color: '#64ffda' }}
                      >
                        <Dashboard sx={{ fontSize: '16px !important' }} />
                        Admin Dashboard
                      </Link>
                      <button
                        className="nb-drawer-link"
                        onClick={() => { handleLogout(); setMenuOpen(false); }}
                        style={{ color: '#ff6b6b' }}
                      >
                        <ExitToApp sx={{ fontSize: '16px !important' }} />
                        Logout
                      </button>
                    </>
                  ) : (
                    <button
                      className="nb-drawer-link"
                      onClick={() => { setOpenLogin(true); setMenuOpen(false); }}
                      style={{ color: '#64ffda' }}
                    >
                      <Lock sx={{ fontSize: '16px !important' }} />
                      Admin Login
                    </button>
                  )}
                </div>
              </div>
            </>
          )}
        </AnimatePresence>

        {/* ── Admin Login Dialog ── */}
        <Dialog
          open={openLogin}
          onClose={() => { setOpenLogin(false); setLoginError(''); }}
          PaperProps={{
            sx: {
              borderRadius: '16px',
              p: 1,
              minWidth: { xs: 300, sm: 380 },
              background: '#0d0d0d',
              border: '1px solid #1f1f1f',
              boxShadow: '0 24px 80px rgba(0,0,0,0.8)',
            }
          }}
        >
          <DialogTitle sx={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: 700,
            fontSize: '17px',
            color: '#eee',
            display: 'flex',
            alignItems: 'center',
            gap: 1.2,
            pb: 0.5,
          }}>
            <Box sx={{
              width: 34, height: 34,
              borderRadius: '50%',
              background: 'linear-gradient(135deg,#64ffda,#00897b)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Lock sx={{ fontSize: 16, color: '#000' }} />
            </Box>
            Admin Access
          </DialogTitle>

          <DialogContent sx={{ pt: 1.5 }}>
            <DialogContentText sx={{
              mb: 2, color: '#555',
              fontFamily: 'DM Mono, monospace',
              fontSize: '12px',
            }}>
              Enter credentials to access the dashboard.
            </DialogContentText>

            <TextField
              margin="normal" label="Email" type="email" fullWidth variant="outlined"
              value={email} onChange={(e) => setEmail(e.target.value)}
              className="nb-dialog-input"
              sx={{ '& *': { fontFamily: 'DM Mono, monospace !important', fontSize: '13px' } }}
              InputProps={{ sx: { color: '#ccd6f6', '& fieldset': { borderColor: '#222' }, '&:hover fieldset': { borderColor: '#64ffda44 !important' }, '&.Mui-focused fieldset': { borderColor: '#64ffda !important' } } }}
              InputLabelProps={{ sx: { color: '#555', fontFamily: 'DM Mono, monospace', fontSize: '13px' } }}
            />

            <TextField
              margin="normal" label="Password" type={showPassword ? 'text' : 'password'}
              fullWidth variant="outlined"
              value={password} onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              InputProps={{
                sx: { color: '#ccd6f6', '& fieldset': { borderColor: '#222' }, '&:hover fieldset': { borderColor: '#64ffda44 !important' }, '&.Mui-focused fieldset': { borderColor: '#64ffda !important' } },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" sx={{ color: '#444', '&:hover': { color: '#64ffda' } }}>
                      {showPassword ? <VisibilityOff sx={{ fontSize: 18 }} /> : <Visibility sx={{ fontSize: 18 }} />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              InputLabelProps={{ sx: { color: '#555', fontFamily: 'DM Mono, monospace', fontSize: '13px' } }}
            />

            {loginError && (
              <Box sx={{
                mt: 1.5, px: 2, py: 1,
                background: 'rgba(255,107,107,0.08)',
                border: '1px solid rgba(255,107,107,0.2)',
                borderRadius: '8px',
                color: '#ff6b6b',
                fontFamily: 'DM Mono, monospace',
                fontSize: '12px',
              }}>
                {loginError}
              </Box>
            )}
          </DialogContent>

          <DialogActions sx={{ px: 3, pb: 2.5, gap: 1.5 }}>
            <button
              onClick={() => { setOpenLogin(false); setLoginError(''); }}
              style={{
                flex: 1, padding: '10px 0',
                background: 'none',
                border: '1px solid #272727',
                borderRadius: '8px',
                color: '#666',
                fontFamily: 'DM Mono, monospace',
                fontSize: '12px',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => e.target.style.borderColor = '#444'}
              onMouseLeave={e => e.target.style.borderColor = '#272727'}
            >
              Cancel
            </button>
            <button
              onClick={handleLogin}
              style={{
                flex: 1, padding: '10px 0',
                background: 'linear-gradient(135deg,#64ffda,#00bfa5)',
                border: 'none',
                borderRadius: '8px',
                color: '#000',
                fontFamily: 'Syne, sans-serif',
                fontWeight: 700,
                fontSize: '13px',
                cursor: 'pointer',
                transition: 'opacity 0.2s, transform 0.15s',
              }}
              onMouseEnter={e => { e.target.style.opacity = '0.88'; e.target.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={e => { e.target.style.opacity = '1'; e.target.style.transform = 'translateY(0)'; }}
            >
              Login →
            </button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}