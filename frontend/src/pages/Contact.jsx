import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import {
  Container, Typography, Box, TextField, Button,
  Snackbar, Alert, useMediaQuery, useTheme, InputAdornment, IconButton,
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
} from '@mui/icons-material';

/* ── design tokens (matches Home.jsx) ── */
const navy      = '#0a192f';
const navyLight = '#112240';
const navyMid   = '#0d1f3c';
const accent    = '#64ffda';
const slate     = '#8892b0';
const lightSlate = '#a8b2d1';
const white     = '#ccd6f6';

/* ── styled input matching the portfolio palette ── */
const inputSx = {
  '& .MuiOutlinedInput-root': {
    backgroundColor: navyMid,
    borderRadius: '6px',
    color: white,
    transition: 'all 0.25s',
    '& fieldset': { borderColor: '#1d3254' },
    '&:hover fieldset': { borderColor: 'rgba(100,255,218,0.3)' },
    '&.Mui-focused fieldset': {
      borderColor: accent,
      boxShadow: `0 0 0 2px rgba(100,255,218,0.12)`,
    },
  },
  '& .MuiInputLabel-root': {
    color: slate,
    '&.Mui-focused': { color: accent },
  },
  '& .MuiInputBase-input': { color: white, fontSize: '0.95rem' },
  '& .MuiFormHelperText-root': { color: '#ff6b6b' },
  '& .MuiInputAdornment-root svg': { color: slate, fontSize: '1.1rem' },
};

const Contact = () => {
  const theme   = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [formData, setFormData] = useState({ name:'', email:'', subject:'', linkedin:'', message:'' });
  const [errors, setErrors]     = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({ open:false, severity:'success', message:'' });

  const validate = () => {
    const e = {};
    if (!formData.name.trim())    e.name    = 'Name is required';
    if (!formData.email.trim())   e.email   = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = 'Invalid email';
    if (!formData.subject.trim()) e.subject = 'Subject is required';
    if (!formData.message.trim()) e.message = 'Message is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(p => ({ ...p, [name]: value }));
    if (errors[name]) setErrors(p => ({ ...p, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/contact/send`, formData);
      if (res.status === 201) {
        setSnackbar({ open:true, severity:'success', message:"Message sent! I'll get back to you soon." });
        setFormData({ name:'', email:'', subject:'', linkedin:'', message:'' });
      }
    } catch (err) {
      setSnackbar({ open:true, severity:'error', message: err.response?.data?.message || 'Failed to send. Try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    { icon: <LinkedInIcon />, label: 'LinkedIn',  sub: 'yash-pratap-rai-00465a284', url: 'https://www.linkedin.com/in/yash-pratap-rai-00465a284/', color: '#0a66c2' },
    { icon: <GitHubIcon />,   label: 'GitHub',    sub: 'YashPratapRai',              url: 'https://github.com/YashPratapRai',                           color: '#f0f6fc' },
    { icon: <EmailIcon />,    label: 'Email',     sub: 'raiyashpratap@gmail.com',    url: 'mailto:raiyashpratap@gmail.com',                                           color: '#34a853' },
  ];

  const fields = [
    { label:'Your Name',        name:'name',     type:'text',  icon:<PersonIcon />,  multiline:false },
    { label:'Your Email',       name:'email',    type:'email', icon:<EmailIcon />,   multiline:false },
    { label:'Subject',          name:'subject',  type:'text',  icon:<SubjectIcon />, multiline:false },
    { label:'LinkedIn Profile', name:'linkedin', type:'text',  icon:<LinkIcon />,    multiline:false, optional:true },
    { label:'Your Message',     name:'message',  type:'text',  icon:<MessageIcon />, multiline:true },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: navy,
        color: white,
        overflowX: 'hidden',
        position: 'relative',
      }}
    >
      {/* dot-grid texture */}
      <Box sx={{
        position:'absolute', inset:0,
        backgroundImage:`radial-gradient(rgba(100,255,218,0.05) 1px, transparent 1px)`,
        backgroundSize:'32px 32px', pointerEvents:'none', zIndex:0,
      }} />

      {/* ambient blobs */}
      {[
        { top:'10%',  left:'5%',   size:380 },
        { top:'60%',  right:'5%',  size:300 },
      ].map((b,i) => (
        <Box key={i} component={motion.div}
          animate={{ x:[0,40,0], y:[0,-30,0] }}
          transition={{ duration:18+i*5, repeat:Infinity, ease:'easeInOut' }}
          sx={{
            position:'absolute', top:b.top, left:b.left, right:b.right,
            width:b.size, height:b.size, borderRadius:'50%', pointerEvents:'none', zIndex:0,
            background:'radial-gradient(circle, rgba(100,255,218,0.1) 0%, transparent 70%)',
            filter:'blur(50px)',
          }}
        />
      ))}

      <Container maxWidth="lg" sx={{ position:'relative', zIndex:1, py:{ xs:8, md:12 } }}>

        {/* ── heading ── */}
        <Box
          component={motion.div}
          initial={{ opacity:0, y:24 }}
          animate={{ opacity:1, y:0 }}
          transition={{ duration:0.7 }}
          sx={{ mb:{ xs:6, md:10 } }}
        >
          
          <Box sx={{ display:'flex', alignItems:'center', gap:2 }}>
            <Typography variant="h3" sx={{ fontWeight:800, color:white, fontSize:isMobile?'2rem':'3rem', letterSpacing:'-0.02em', whiteSpace:'nowrap' }}>
              Get In Touch
            </Typography>
            <Box sx={{ flex:1, height:'1px', backgroundColor:'#233554', ml:2 }} />
          </Box>
          <Typography sx={{ mt:2, color:slate, maxWidth:520, fontSize:isMobile?'0.95rem':'1.05rem', lineHeight:1.8 }}>
            I'm currently open to new opportunities. Whether you have a question, a project idea, or
            just want to say hello — fill out the form or reach me directly below.
          </Typography>
        </Box>

        {/* ── two-column layout ── */}
        <Box sx={{ display:'grid', gridTemplateColumns:{ xs:'1fr', md:'1fr 1fr' }, gap:{ xs:6, md:8 }, alignItems:'start' }}>

          {/* ════ LEFT — form ════ */}
          <Box
            component={motion.div}
            initial={{ opacity:0, x:-30 }}
            animate={{ opacity:1, x:0 }}
            transition={{ duration:0.7, delay:0.1 }}
          >
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                backgroundColor:navyLight,
                borderRadius:'8px',
                p:{ xs:3, md:4.5 },
                border:'1px solid #1d3254',
                boxShadow:'0 20px 48px -16px rgba(2,12,27,0.8)',
              }}
            >
              <Typography variant="h6" sx={{ color:white, fontWeight:700, mb:3, fontFamily:'monospace' }}>
                Send a Message
              </Typography>

              <Box sx={{ display:'flex', flexDirection:'column', gap:2.5 }}>
                {fields.map((f, i) => (
                  <motion.div
                    key={f.name}
                    initial={{ opacity:0, y:16 }}
                    animate={{ opacity:1, y:0 }}
                    transition={{ delay:0.2 + i*0.07, duration:0.4 }}
                  >
                    <TextField
                      fullWidth
                      label={f.label + (f.optional ? ' (optional)' : '')}
                      name={f.name}
                      type={f.type}
                      value={formData[f.name]}
                      onChange={handleChange}
                      variant="outlined"
                      error={!!errors[f.name]}
                      helperText={errors[f.name]}
                      multiline={f.multiline}
                      minRows={f.multiline ? 5 : undefined}
                      required={!f.optional}
                      InputProps={{
                        startAdornment:(
                          <InputAdornment position="start" sx={f.multiline ? { alignSelf:'flex-start', mt:1.5 } : {}}>
                            {f.icon}
                          </InputAdornment>
                        ),
                      }}
                      sx={inputSx}
                    />
                  </motion.div>
                ))}

                <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.65 }}>
                  <Button
                    type="submit"
                    fullWidth
                    disabled={isSubmitting}
                    endIcon={isSubmitting ? null : <SendIcon />}
                    component={motion.button}
                    whileHover={{ y:-3 }}
                    whileTap={{ scale:0.97 }}
                    sx={{
                      mt:0.5, py:1.6,
                      fontWeight:700, fontSize:'0.95rem',
                      borderRadius:'6px',
                      backgroundColor: accent,
                      color: navy,
                      boxShadow:`0 8px 24px -8px rgba(100,255,218,0.4)`,
                      '&:hover':{ backgroundColor:'#52d1b2' },
                      '&.Mui-disabled':{ backgroundColor:'rgba(100,255,218,0.15)', color:'rgba(100,255,218,0.35)' },
                      transition:'background 0.2s',
                    }}
                  >
                    {isSubmitting ? 'Sending…' : 'Send Message'}
                  </Button>
                </motion.div>
              </Box>
            </Box>
          </Box>

          {/* ════ RIGHT — contact info ════ */}
          <Box
            component={motion.div}
            initial={{ opacity:0, x:30 }}
            animate={{ opacity:1, x:0 }}
            transition={{ duration:0.7, delay:0.2 }}
            sx={{ display:'flex', flexDirection:'column', gap:4 }}
          >
            {/* social cards */}
            <Box>
              <Typography variant="h6" sx={{ color:white, fontWeight:700, mb:3, fontFamily:'monospace' }}>
                Other Ways to Reach Me
              </Typography>

              <Box sx={{ display:'flex', flexDirection:'column', gap:2 }}>
                {socialLinks.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity:0, x:20 }}
                    animate={{ opacity:1, x:0 }}
                    transition={{ delay:0.3 + i*0.08, duration:0.4 }}
                  >
                    <Box
                      component="a"
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        display:'flex', alignItems:'center', gap:2.5,
                        p:2.5,
                        backgroundColor:navyLight,
                        border:'1px solid #1d3254',
                        borderRadius:'6px',
                        textDecoration:'none',
                        transition:'all 0.25s ease',
                        '&:hover':{
                          borderColor:'rgba(100,255,218,0.3)',
                          transform:'translateX(6px)',
                          boxShadow:'0 8px 24px -12px rgba(2,12,27,0.9)',
                          backgroundColor: navyMid,
                        },
                      }}
                    >
                      {/* icon circle */}
                      <Box sx={{
                        width:44, height:44, borderRadius:'50%', flexShrink:0,
                        backgroundColor:`${link.color}18`,
                        border:`1px solid ${link.color}30`,
                        display:'flex', alignItems:'center', justifyContent:'center',
                        color:link.color,
                      }}>
                        {link.icon}
                      </Box>

                      <Box>
                        <Typography sx={{ color:white, fontWeight:600, fontSize:'0.9rem', lineHeight:1.3 }}>
                          {link.label}
                        </Typography>
                        <Typography sx={{ color:slate, fontSize:'0.78rem', mt:0.3 }}>
                          {link.sub}
                        </Typography>
                      </Box>

                      {/* arrow */}
                      <Box sx={{ ml:'auto', color:slate, fontSize:'1.1rem', fontFamily:'monospace' }}>→</Box>
                    </Box>
                  </motion.div>
                ))}
              </Box>
            </Box>

            {/* availability badge */}
            <motion.div
              initial={{ opacity:0, y:20 }}
              animate={{ opacity:1, y:0 }}
              transition={{ delay:0.7 }}
            >
              <Box sx={{
                p:3,
                backgroundColor:navyLight,
                border:'1px solid rgba(100,255,218,0.2)',
                borderRadius:'8px',
                position:'relative',
                overflow:'hidden',
              }}>
                {/* subtle glow */}
                <Box sx={{
                  position:'absolute', top:-30, right:-30, width:120, height:120, borderRadius:'50%',
                  background:'radial-gradient(circle, rgba(100,255,218,0.12) 0%, transparent 70%)',
                  pointerEvents:'none',
                }} />

                <Box sx={{ display:'flex', alignItems:'center', gap:1.5, mb:1.5 }}>
                  {/* pulsing dot */}
                  <Box sx={{ position:'relative', width:10, height:10 }}>
                    <Box sx={{
                      width:10, height:10, borderRadius:'50%',
                      backgroundColor: accent, position:'absolute',
                    }} />
                    <Box
                      component={motion.div}
                      animate={{ scale:[1,2,1], opacity:[0.7,0,0.7] }}
                      transition={{ duration:2, repeat:Infinity }}
                      sx={{
                        width:10, height:10, borderRadius:'50%',
                        backgroundColor: accent, position:'absolute',
                      }}
                    />
                  </Box>
                  <Typography sx={{ color:accent, fontWeight:700, fontSize:'0.9rem', fontFamily:'monospace' }}>
                    Available for Opportunities
                  </Typography>
                </Box>

                <Typography sx={{ color:slate, fontSize:'0.85rem', lineHeight:1.7 }}>
                  Currently open to full-time roles, freelance projects, and interesting collaborations
                  in Machine Learning, NLP, or Data Engineering.
                </Typography>
              </Box>
            </motion.div>

            {/* response time note */}
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.9 }}>
              <Box sx={{
                p:2.5,
                backgroundColor:navyMid,
                border:'1px solid #1d3254',
                borderRadius:'6px',
                display:'flex', alignItems:'center', gap:2,
              }}>
                <Typography sx={{ fontSize:'1.4rem' }}>⚡</Typography>
                <Box>
                  <Typography sx={{ color:white, fontWeight:600, fontSize:'0.85rem' }}>Typical Response Time</Typography>
                  <Typography sx={{ color:slate, fontSize:'0.78rem', mt:0.2 }}>
                    I usually reply within 24–48 hours. Urgent? Email works fastest.
                  </Typography>
                </Box>
              </Box>
            </motion.div>
          </Box>
        </Box>
      </Container>

      {/* ── snackbar ── */}
      <AnimatePresence>
        {snackbar.open && (
          <motion.div
            initial={{ opacity:0, y:20 }}
            animate={{ opacity:1, y:0 }}
            exit={{ opacity:0, y:20 }}
            style={{ position:'fixed', bottom:32, left:'50%', transform:'translateX(-50%)', zIndex:1400, width:'100%', maxWidth:480, padding:'0 16px' }}
          >
            <Alert
              severity={snackbar.severity}
              onClose={() => setSnackbar(p => ({ ...p, open:false }))}
              action={
                <IconButton size="small" color="inherit" onClick={() => setSnackbar(p => ({ ...p, open:false }))}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              }
              sx={{
                backgroundColor: snackbar.severity === 'error' ? 'rgba(220,38,38,0.92)' : 'rgba(16,185,129,0.92)',
                backdropFilter:'blur(12px)',
                color:'#fff', borderRadius:'6px',
                boxShadow:'0 8px 32px rgba(0,0,0,0.3)',
                '& .MuiAlert-icon':{ color:'#fff' },
              }}
            >
              {snackbar.message}
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default Contact;