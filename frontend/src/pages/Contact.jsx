import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Paper,
  Snackbar,
  Alert,
  Divider,
  useTheme,
  IconButton,
  ThemeProvider,
  createTheme,
  InputAdornment,
  Stack,
  Chip
} from '@mui/material';
import {
  Send as SendIcon,
  LinkedIn as LinkedInIcon,
  GitHub as GitHubIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Close as CloseIcon,
  Person as PersonIcon,
  Subject as SubjectIcon,
  Link as LinkIcon,
  Message as MessageIcon,
  Favorite as FavoriteIcon
} from '@mui/icons-material';
import { styled } from '@mui/system';

// Professional theme with improved contrast
const professionalTheme = createTheme({
  palette: {
    primary: {
      main: '#4361ee',
      dark: '#3a0ca3',
      light: '#4895ef'
    },
    secondary: {
      main: '#f72585'
    },
    background: {
      default: '#0a0a1a',
      paper: '#12122a'
    },
    text: {
      primary: '#f8f9fa',
      secondary: '#adb5bd'
    }
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    h2: {
      fontWeight: 700,
      letterSpacing: '-0.5px',
      fontSize: '2.8rem'
    },
    h5: {
      fontWeight: 600
    },
    body1: {
      lineHeight: 1.7,
      fontSize: '1.1rem'
    }
  },
  shape: {
    borderRadius: 12
  }
});

// Professional card with subtle glass effect
const ProfessionalCard = styled(Paper)(({ theme }) => ({
  backdropFilter: 'blur(16px)',
  background: 'linear-gradient(135deg, rgba(26, 32, 71, 0.85) 0%, rgba(15, 23, 42, 0.9) 100%)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 16px 40px rgba(0, 0, 0, 0.3)',
  borderRadius: theme.shape.borderRadius * 2,
  overflow: 'hidden',
  position: 'relative',
  maxWidth: '800px',
  margin: '0 auto',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 20% 30%, rgba(67, 97, 238, 0.15) 0%, transparent 70%)',
    zIndex: -1,
  },
}));

// Professional input field with better spacing
const ProfessionalInput = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: 'rgba(255,255,255,0.05)',
    transition: 'all 0.3s ease',
    '& fieldset': {
      borderColor: 'rgba(255,255,255,0.1)',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(255,255,255,0.2)',
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
      boxShadow: `0 0 0 2px ${theme.palette.primary.light}40`
    },
  },
  '& .MuiInputBase-input': {
    color: theme.palette.text.primary,
    padding: '16px',
    fontSize: '1rem',
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(255,255,255,0.6)',
    transform: 'translate(16px, 16px) scale(1)',
    '&.Mui-focused, &.MuiFormLabel-filled': {
      transform: 'translate(16px, -9px) scale(0.85)',
      color: theme.palette.primary.main,
    },
  },
  '& .MuiFormHelperText-root': {
    marginLeft: 8,
    fontSize: '0.8rem',
  }
}));

// Professional button with smooth hover effects
const ProfessionalButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  color: '#fff',
  fontWeight: 600,
  borderRadius: theme.shape.borderRadius,
  padding: '16px 32px',
  textTransform: 'none',
  fontSize: '1rem',
  letterSpacing: '0.5px',
  boxShadow: '0 4px 20px rgba(67, 97, 238, 0.3)',
  transition: 'all 0.4s ease',
  width: '100%',
  marginTop: theme.spacing(2),
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: `0 6px 24px ${theme.palette.primary.main}60`,
    background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
  },
  '&:disabled': {
    background: 'rgba(255,255,255,0.1)',
    color: 'rgba(255,255,255,0.4)',
  },
}));

// Enhanced Social link button with better styling
const SocialLinkButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  padding: '14px 24px',
  textTransform: 'none',
  fontSize: '1rem',
  fontWeight: 500,
  color: theme.palette.text.primary,
  background: 'rgba(255,255,255,0.07)',
  border: '1px solid rgba(255,255,255,0.12)',
  transition: 'all 0.3s ease',
  justifyContent: 'flex-start',
  width: '100%',
  '&:hover': {
    background: 'rgba(255,255,255,0.15)',
    transform: 'translateY(-3px)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  '& .MuiButton-startIcon': {
    marginRight: '12px',
    color: 'inherit',
  }
}));

const ContactForm = () => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    linkedin: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: 'success',
    message: '',
  });

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/contact/send`,
        formData
      );

      if (res.status === 201) {
        setSnackbar({
          open: true,
          severity: 'success',
          message: 'Message sent successfully! I will get back to you soon.',
        });
        setFormData({
          name: '',
          email: '',
          subject: '',
          linkedin: '',
          message: '',
        });
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSnackbar({
        open: true,
        severity: 'error',
        message: error.response?.data?.message || 'Failed to send message. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    { 
      icon: <LinkedInIcon />, 
      label: 'Connect on LinkedIn', 
      url: 'https://www.linkedin.com/in/yash-pratap-rai-00465a284/',
      color: '#0a66c2'
    },
    { 
      icon: <GitHubIcon />, 
      label: 'Check my GitHub', 
      url: 'https://github.com/YashPratapRai',
      color: '#f0f6fc'
    },
    { 
      icon: <EmailIcon />, 
      label: 'Send me an Email', 
      url: 'mailto:raiyashpratap@gmail.com',
      color: '#ea4335'
    },
    { 
      icon: <PhoneIcon />, 
      label: 'Call me directly', 
      url: 'tel:9335128102',
      color: '#34a853'
    },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        px: { xs: 2, sm: 4 },
        py: 8,
        background: 'radial-gradient(ellipse at top left, #0f0c29, #1a1a2e, #16213e)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle animated background */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: `
          radial-gradient(circle at 20% 30%, rgba(67, 97, 238, 0.05) 0%, transparent 50%),
          radial-gradient(circle at 80% 70%, rgba(247, 37, 133, 0.05) 0%, transparent 50%)
        `,
        zIndex: 0,
      }} />

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <ProfessionalCard>
            <Box sx={{ p: { xs: 3, md: 5 } }}>
              {/* Header section */}
              <Box sx={{ textAlign: 'center', mb: 5 }}>
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Typography
                    variant="h2"
                    sx={{
                      fontWeight: 700,
                      background: 'linear-gradient(90deg, #fff, #b5b5b5)',
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      color: 'transparent',
                      mb: 2,
                    }}
                  >
                    Contact Me
                  </Typography>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <Typography variant="body1" sx={{ 
                    color: 'rgba(255,255,255,0.75)',
                    maxWidth: '600px',
                    mx: 'auto',
                  }}>
                    Have a question or want to work together? Fill out the form below and I'll get back to you as soon as possible.
                  </Typography>
                </motion.div>
              </Box>

              {/* Single column form layout */}
              <Box component="form" onSubmit={handleSubmit}>
                <Stack spacing={3}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <ProfessionalInput
                      fullWidth
                      label="Your Name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      variant="outlined"
                      error={!!errors.name}
                      helperText={errors.name}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon sx={{ color: 'rgba(255,255,255,0.5)' }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <ProfessionalInput
                      fullWidth
                      label="Your Email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      variant="outlined"
                      error={!!errors.email}
                      helperText={errors.email}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailIcon sx={{ color: 'rgba(255,255,255,0.5)' }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <ProfessionalInput
                      fullWidth
                      label="Subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      variant="outlined"
                      error={!!errors.subject}
                      helperText={errors.subject}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SubjectIcon sx={{ color: 'rgba(255,255,255,0.5)' }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                  >
                    <ProfessionalInput
                      fullWidth
                      label="LinkedIn Profile"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleChange}
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LinkIcon sx={{ color: 'rgba(255,255,255,0.5)' }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0 }}
                  >
                    <ProfessionalInput
                      fullWidth
                      label="Your Message"
                      name="message"
                      multiline
                      required
                      value={formData.message}
                      onChange={handleChange}
                      variant="outlined"
                      minRows={6}
                      error={!!errors.message}
                      helperText={errors.message}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1 }}>
                            <MessageIcon sx={{ color: 'rgba(255,255,255,0.5)' }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 }}
                  >
                    <ProfessionalButton
                      type="submit"
                      disabled={isSubmitting}
                      endIcon={<SendIcon />}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </ProfessionalButton>
                  </motion.div>
                </Stack>
              </Box>

              {/* Divider with improved styling */}
              <Divider sx={{ 
                my: 5,
                borderColor: 'rgba(255,255,255,0.15)',
                '&:before, &:after': {
                  borderColor: 'rgba(255,255,255,0.15)',
                }
              }}>
                <Chip 
                  label="OR" 
                  sx={{ 
                    color: 'rgba(255,255,255,0.8)', 
                    bgcolor: 'rgba(255,255,255,0.1)',
                    px: 2
                  }} 
                />
              </Divider>

              {/* Enhanced Contact information section */}
              <Box sx={{ textAlign: 'center' }}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                >
                  <Typography variant="h5" sx={{ 
                    fontWeight: 600,
                    mb: 3,
                    color: '#fff',
                    position: 'relative',
                    display: 'inline-block',
                    '&:after': {
                      content: '""',
                      position: 'absolute',
                      bottom: -8,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '60%',
                      height: 3,
                      background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      borderRadius: 3
                    }
                  }}>
                    Other Ways to Connect
                  </Typography>
                </motion.div>

                <Typography variant="body2" sx={{ 
                  color: 'rgba(255,255,255,0.7)',
                  mb: 4,
                  maxWidth: '500px',
                  mx: 'auto'
                }}>
                  Prefer to connect directly? Here are all the ways you can reach me:
                </Typography>

                <Stack spacing={2.5} sx={{ maxWidth: '500px', mx: 'auto', mb: 4 }}>
                  {socialLinks.map((link, index) => (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.3 + index * 0.1 }}
                    >
                      <SocialLinkButton
                        component="a"
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        startIcon={React.cloneElement(link.icon, { sx: { color: link.color } })}
                        sx={{
                          '&:hover': {
                            bgcolor: `rgba(${parseInt(link.color.slice(1, 3), 16)}, ${parseInt(link.color.slice(3, 5), 16)}, ${parseInt(link.color.slice(5, 7), 16)}, 0.1)`,
                            borderColor: `${link.color}30`
                          }
                        }}
                      >
                        {link.label}
                      </SocialLinkButton>
                    </motion.div>
                  ))}
                </Stack>

                {/* Closing line with heart icon */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.7 }}
                >
                  <Typography variant="body2" sx={{ 
                    color: 'rgba(255,255,255,0.6)',
                    fontStyle: 'italic',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mt: 3
                  }}>
                    Looking forward to connecting with you! 
                    <FavoriteIcon sx={{ 
                      color: theme.palette.secondary.main, 
                      fontSize: '1.2rem', 
                      mx: 0.5,
                      animation: 'pulse 1.5s infinite',
                      '@keyframes pulse': {
                        '0%': { transform: 'scale(1)' },
                        '50%': { transform: 'scale(1.2)' },
                        '100%': { transform: 'scale(1)' },
                      }
                    }} />
                  </Typography>
                </motion.div>
              </Box>
            </Box>
          </ProfessionalCard>
        </motion.div>
      </Container>

      <AnimatePresence>
        {snackbar.open && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              bottom: 32,
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 1400,
              width: '100%',
              maxWidth: '500px',
              px: 2
            }}
          >
            <Alert
              severity={snackbar.severity}
              onClose={handleCloseSnackbar}
              sx={{
                backdropFilter: 'blur(16px)',
                background: snackbar.severity === 'error' 
                  ? 'rgba(239, 68, 68, 0.9)' 
                  : 'rgba(16, 185, 129, 0.9)',
                color: '#fff',
                borderRadius: theme.shape.borderRadius,
                boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                width: '100%',
              }}
              action={
                <IconButton
                  size="small"
                  aria-label="close"
                  color="inherit"
                  onClick={handleCloseSnackbar}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              }
            >
              {snackbar.message}
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

const Contact = () => {
  return (
    <ThemeProvider theme={professionalTheme}>
      <ContactForm />
    </ThemeProvider>
  );
};

export default Contact;