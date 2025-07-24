// ✅ Full Navbar.jsx with MUI + Skills Section Scroll Link
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
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Navbar = () => {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [isAdmin, setIsAdmin] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/projects', label: 'Projects' },
    { path: '/contact', label: 'Contact' },
    { path: '#skills', label: 'Skills', isAnchor: true }, // ✅ New Skills Link
  ];

  const handleLogin = () => {
    if (email === 'raiyashpratap@gmail.com' && password === '9335') {
      localStorage.setItem('admin', 'true');
      setIsAdmin(true);
      setOpenLogin(false);
    } else {
      alert('Invalid email or password');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin');
    setIsAdmin(false);
    handleMenuClose();
  };

  useEffect(() => {
    const adminStatus = localStorage.getItem('admin');
    if (adminStatus === 'true') setIsAdmin(true);
  }, []);

  const scrollToAnchor = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderNavButtons = () => (
    <>
      {navLinks.map((link) =>
        link.isAnchor ? (
          <Button
            key={link.label}
            onClick={() => {
              scrollToAnchor('skills');
              handleMenuClose();
            }}
            color="inherit"
            sx={{
              mx: 1,
              fontWeight: location.hash === link.path ? 'bold' : 'normal',
              borderBottom: 'none',
              transition: 'all 0.3s ease-in-out',
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
            onClick={handleMenuClose}
            sx={{
              mx: 1,
              fontWeight: location.pathname === link.path ? 'bold' : 'normal',
              borderBottom:
                location.pathname === link.path ? '2px solid white' : 'none',
              transition: 'all 0.3s ease-in-out',
            }}
          >
            {link.label}
          </Button>
        )
      )}
      {isAdmin ? (
        <>
          <Button
            component={Link}
            to="/admin"
            color="inherit"
            onClick={handleMenuClose}
            sx={{
              mx: 1,
              fontWeight: location.pathname === '/admin' ? 'bold' : 'normal',
              borderBottom:
                location.pathname === '/admin' ? '2px solid white' : 'none',
              transition: 'all 0.3s ease-in-out',
            }}
          >
            Admin
          </Button>
          <Button color="error" onClick={handleLogout} sx={{ mx: 1 }}>
            Logout
          </Button>
        </>
      ) : (
        <Button onClick={() => { setOpenLogin(true); handleMenuClose(); }} color="inherit" sx={{ mx: 1 }}>
          Admin
        </Button>
      )}
    </>
  );

  return (
    <>
      <Slide direction="down" in={true} timeout={800}>
        <AppBar
          position="static"
          elevation={4}
          sx={{
            backdropFilter: 'blur(8px)',
            backgroundColor: 'rgba(25, 25, 112, 0.85)',
          }}
        >
          <Toolbar>
            <Typography
              component={motion.div}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              variant="h6"
              sx={{ flexGrow: 1, fontWeight: 700 }}
            >
              Yash Pratap's Portfolio
            </Typography>

            {isMobile ? (
              <>
                <IconButton
                  color="inherit"
                  edge="end"
                  onClick={handleMenuOpen}
                  aria-controls={openMenu ? 'nav-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={openMenu ? 'true' : undefined}
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
                  keepMounted
                >
                  {navLinks.map((link) =>
                    link.isAnchor ? (
                      <MenuItem
                        key={link.label}
                        onClick={() => {
                          scrollToAnchor('skills');
                          handleMenuClose();
                        }}
                      >
                        {link.label}
                      </MenuItem>
                    ) : (
                      <MenuItem
                        key={link.path}
                        component={Link}
                        to={link.path}
                        selected={location.pathname === link.path}
                        onClick={handleMenuClose}
                      >
                        {link.label}
                      </MenuItem>
                    )
                  )}

                  {isAdmin ? (
                    [
                      <MenuItem
                        key="admin"
                        component={Link}
                        to="/admin"
                        selected={location.pathname === '/admin'}
                        onClick={handleMenuClose}
                      >
                        Admin
                      </MenuItem>,
                      <MenuItem key="logout" onClick={handleLogout}>
                        Logout
                      </MenuItem>,
                    ]
                  ) : (
                    <MenuItem
                      key="login"
                      onClick={() => {
                        setOpenLogin(true);
                        handleMenuClose();
                      }}
                    >
                      Admin
                    </MenuItem>
                  )}
                </Menu>
              </>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {renderNavButtons()}
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
            background: 'linear-gradient(135deg, #6481b6ff, #9db2d6ff)',
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 600, textAlign: 'center' }}>
          🔐 Admin Login
        </DialogTitle>

        <DialogContent>
          <DialogContentText sx={{ mb: 2, textAlign: 'center', color: 'text.secondary' }}>
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
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </DialogContent>

        <DialogActions sx={{ justifyContent: 'space-between', px: 3, pb: 2 }}>
          <Button onClick={() => setOpenLogin(false)} color="error">
            Cancel
          </Button>
          <Button onClick={handleLogin} variant="contained" color="primary">
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Navbar;
