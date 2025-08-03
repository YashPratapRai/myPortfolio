import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Slide,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  Box,
  DialogContentText,
  InputAdornment,
  Avatar,
  Badge,
  Divider,
  Stack
} from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@mui/material/styles';
import { 
  Visibility, 
  VisibilityOff,
  AccountCircle,
  Dashboard,
  ExitToApp,
  Lock,
  Code,
  Work,
  Mail,
  Home
} from '@mui/icons-material';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [isAdmin, setIsAdmin] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const navLinks = [
    { path: '/', label: 'Home', icon: <Home fontSize="small" /> },
    { path: '/projects', label: 'Projects', icon: <Work fontSize="small" /> },
    { path: '/contact', label: 'Contact', icon: <Mail fontSize="small" /> },
    { path: '#skills', label: 'Skills', icon: <Code fontSize="small" />, isAnchor: true },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const adminStatus = localStorage.getItem('admin');
    if (adminStatus === 'true') setIsAdmin(true);
  }, []);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogin = () => {
    if (email === 'raiyashpratap@gmail.com' && password === '9335') {
      localStorage.setItem('admin', 'true');
      setIsAdmin(true);
      setOpenLogin(false);
      navigate('/admin');
    } else {
      alert('Invalid email or password');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin');
    setIsAdmin(false);
    handleMenuClose();
    navigate('/');
  };

  const scrollToAnchor = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  };

  const renderNavButtons = () => (
    <Stack direction="row" spacing={1} alignItems="center">
      {navLinks.map((link) =>
        link.isAnchor ? (
          <Button
            key={link.label}
            onClick={() => scrollToAnchor('skills')}
            color="inherit"
            startIcon={link.icon}
            sx={{
              px: 2,
              fontWeight: location.hash === link.path ? 'bold' : 'normal',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              },
              transition: 'all 0.3s ease',
              borderRadius: 2
            }}
          >
            {link.label}
          </Button>
        ) : (
          <Button
            key={link.path}
            component={Link}
            to={link.path}
            color="inherit"
            startIcon={link.icon}
            sx={{
              px: 2,
              fontWeight: location.pathname === link.path ? 'bold' : 'normal',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              },
              transition: 'all 0.3s ease',
              borderRadius: 2
            }}
          >
            {link.label}
          </Button>
        )
      )}
    </Stack>
  );

  return (
    <>
      <Slide direction="down" in={true} timeout={800}>
        <AppBar
          position="fixed"
          elevation={scrolled ? 4 : 0}
          sx={{
            backdropFilter: scrolled ? 'blur(10px)' : 'none',
            backgroundColor: scrolled ? 'rgba(10, 25, 47, 0.9)' : 'transparent',
            transition: 'all 0.3s ease',
            py: scrolled ? 0 : 1,
            borderBottom: scrolled ? '1px solid rgba(100, 255, 218, 0.1)' : 'none'
          }}
        >
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Box
              component={motion.div}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <Avatar
                src="/logo.png" // Replace with your logo
                alt="Logo"
                sx={{
                  width: 40,
                  height: 40,
                  mr: 2,
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'rotate(15deg)'
                  },
                  transition: 'transform 0.3s ease'
                }}
                onClick={() => navigate('/')}
              />
              <Typography
                variant="h6"
                component={Link}
                to="/"
                sx={{
                  fontWeight: 700,
                  textDecoration: 'none',
                  color: 'inherit',
                  display: { xs: 'none', sm: 'block' }
                }}
              >
                Yash Pratap Rai
              </Typography>
            </Box>

            {isMobile ? (
              <>
                <IconButton
                  color="inherit"
                  edge="end"
                  onClick={handleMenuOpen}
                  aria-controls={openMenu ? 'nav-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={openMenu ? 'true' : undefined}
                  sx={{
                    '&:hover': {
                      backgroundColor: 'rgba(100, 255, 218, 0.1)'
                    }
                  }}
                >
                  <MenuIcon />
                </IconButton>

                <Menu
                  id="nav-menu"
                  anchorEl={anchorEl}
                  open={openMenu}
                  onClose={handleMenuClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  PaperProps={{
                    sx: {
                      mt: 1,
                      minWidth: 200,
                      backgroundColor: '#112240',
                      color: '#ccd6f6',
                      border: '1px solid rgba(100, 255, 218, 0.1)',
                      backdropFilter: 'blur(10px)'
                    }
                  }}
                >
                  {navLinks.map((link) => (
                    <MenuItem
                      key={link.label}
                      onClick={() => {
                        if (link.isAnchor) {
                          scrollToAnchor('skills');
                        }
                        handleMenuClose();
                      }}
                      component={link.isAnchor ? 'div' : Link}
                      to={link.isAnchor ? null : link.path}
                      sx={{
                        '&:hover': {
                          backgroundColor: 'rgba(100, 255, 218, 0.1)'
                        },
                        ...(location.pathname === link.path && {
                          backgroundColor: 'rgba(100, 255, 218, 0.05)',
                          fontWeight: 'bold'
                        })
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {link.icon}
                        {link.label}
                      </Box>
                    </MenuItem>
                  ))}

                  <Divider sx={{ my: 1, backgroundColor: 'rgba(100, 255, 218, 0.1)' }} />

                  {isAdmin ? (
                    <>
                      <MenuItem
                        component={Link}
                        to="/admin"
                        onClick={handleMenuClose}
                        sx={{
                          '&:hover': {
                            backgroundColor: 'rgba(100, 255, 218, 0.1)'
                          }
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Dashboard fontSize="small" />
                          Admin Dashboard
                        </Box>
                      </MenuItem>
                      <MenuItem
                        onClick={handleLogout}
                        sx={{
                          color: '#ff6b6b',
                          '&:hover': {
                            backgroundColor: 'rgba(255, 107, 107, 0.1)'
                          }
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <ExitToApp fontSize="small" />
                          Logout
                        </Box>
                      </MenuItem>
                    </>
                  ) : (
                    <MenuItem
                      onClick={() => {
                        setOpenLogin(true);
                        handleMenuClose();
                      }}
                      sx={{
                        '&:hover': {
                          backgroundColor: 'rgba(100, 255, 218, 0.1)'
                        }
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Lock fontSize="small" />
                        Admin Login
                      </Box>
                    </MenuItem>
                  )}
                </Menu>
              </>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {renderNavButtons()}
                
                {isAdmin ? (
                  <Badge
                    color="success"
                    variant="dot"
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  >
                    <Button
                      component={Link}
                      to="/admin"
                      color="inherit"
                      startIcon={<Dashboard />}
                      sx={{
                        px: 2,
                        fontWeight: location.pathname === '/admin' ? 'bold' : 'normal',
                        '&:hover': {
                          backgroundColor: 'rgba(100, 255, 218, 0.1)'
                        },
                        transition: 'all 0.3s ease',
                        borderRadius: 2
                      }}
                    >
                      Admin
                    </Button>
                  </Badge>
                ) : (
                  <Button
                    onClick={() => setOpenLogin(true)}
                    color="inherit"
                    startIcon={<Lock />}
                    sx={{
                      px: 2,
                      '&:hover': {
                        backgroundColor: 'rgba(100, 255, 218, 0.1)'
                      },
                      transition: 'all 0.3s ease',
                      borderRadius: 2
                    }}
                  >
                    Admin
                  </Button>
                )}
              </Box>
            )}
          </Toolbar>
        </AppBar>
      </Slide>

      {/* Admin Login Dialog */}
      <Dialog
        open={openLogin}
        onClose={() => setOpenLogin(false)}
        PaperProps={{
          sx: {
            borderRadius: 3,
            p: 2,
            minWidth: { xs: 300, sm: 400 },
            background: 'linear-gradient(135deg, #0a192f, #112240)',
            border: '1px solid rgba(100, 255, 218, 0.2)',
            boxShadow: '0 10px 30px -10px rgba(2, 12, 27, 0.7)'
          },
        }}
      >
        <DialogTitle sx={{ 
          fontWeight: 600, 
          textAlign: 'center',
          color: '#64ffda',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1
        }}>
          <Lock fontSize="large" />
          Admin Login
        </DialogTitle>

        <DialogContent>
          <DialogContentText sx={{ 
            mb: 2, 
            textAlign: 'center', 
            color: '#8892b0' 
          }}>
            Please enter your admin credentials to access the dashboard.
          </DialogContentText>

          <TextField
            margin="normal"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              sx: {
                color: '#ccd6f6',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#233554'
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#64ffda'
                }
              }
            }}
            InputLabelProps={{
              sx: {
                color: '#8892b0'
              }
            }}
          />

          <TextField
            margin="normal"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              sx: {
                color: '#ccd6f6',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#233554'
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#64ffda'
                }
              },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    sx={{ color: '#64ffda' }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            InputLabelProps={{
              sx: {
                color: '#8892b0'
              }
            }}
          />
        </DialogContent>

        <DialogActions sx={{ 
          justifyContent: 'space-between', 
          px: 3, 
          pb: 2,
          gap: 2
        }}>
          <Button 
            onClick={() => setOpenLogin(false)} 
            variant="outlined"
            sx={{
              color: '#ff6b6b',
              borderColor: '#ff6b6b',
              '&:hover': {
                backgroundColor: 'rgba(255, 107, 107, 0.1)',
                borderColor: '#ff6b6b'
              }
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleLogin} 
            variant="contained" 
            sx={{
              backgroundColor: '#64ffda',
              color: '#0a192f',
              '&:hover': {
                backgroundColor: '#52d1b2'
              }
            }}
          >
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Navbar;