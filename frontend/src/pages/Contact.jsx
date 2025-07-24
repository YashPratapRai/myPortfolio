import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import {
  Container,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  Paper,
  Snackbar,
  Alert,
} from '@mui/material';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    linkedin: '',
    message: '',
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: 'success',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/contact/send', formData);
      if (res.status === 201) {
        setSnackbar({
          open: true,
          severity: 'success',
          message: 'Message sent successfully!',
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
        message: 'Failed to send message. Try again.',
      });
    }
  };

  const commonFieldStyle = {
    '& .MuiOutlinedInput-root': {
      borderRadius: 2,
      backgroundColor: 'rgba(255,255,255,0.05)',
      backdropFilter: 'blur(8px)',
    },
    '& .MuiInputBase-input': {
      color: '#fff',
    },
    '& .MuiInputLabel-root': {
      color: '#aaa',
    },
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        px: 2,
        background: 'linear-gradient(to bottom, #1f1f1f, #3a3a3a)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        pt: 8,
        pb: 0,
        alignItems: 'center',
      }}
    >
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Paper
            elevation={8}
            sx={{
              p: 5,
              borderRadius: 4,
              backdropFilter: 'blur(12px)',
              background: 'rgba(255, 255, 255, 0.05)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.2)',
            }}
          >
            <Typography
              variant="h4"
              align="center"
              sx={{ mb: 3, fontWeight: 'bold', color: '#fff' }}
            >
              Contact Me
            </Typography>

            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Your Name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    variant="outlined"
                    sx={commonFieldStyle}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Your Email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    variant="outlined"
                    sx={commonFieldStyle}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    variant="outlined"
                    sx={commonFieldStyle}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="LinkedIn URL"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    variant="outlined"
                    sx={commonFieldStyle}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Your Message"
                    name="message"
                    multiline
                    required
                    value={formData.message}
                    onChange={handleChange}
                    variant="outlined"
                    minRows={5}
                    sx={{
                      ...commonFieldStyle,
                      '& .MuiOutlinedInput-root': {
                        ...commonFieldStyle['& .MuiOutlinedInput-root'],
                        alignItems: 'start',
                      },
                    }}
                  />
                </Grid>
              </Grid>

              <Box mt={4} textAlign="center">
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    px: 5,
                    py: 1.5,
                    fontWeight: 'bold',
                    borderRadius: 2,
                    background: 'linear-gradient(90deg, #fc466b, #3f5efb)',
                    color: '#fff',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: 'linear-gradient(90deg, #3f5efb, #fc466b)',
                      boxShadow: '0 0 12px rgba(255,255,255,0.3)',
                    },
                  }}
                >
                  Send Message
                </Button>

                <Typography variant="body2" sx={{ mt: 2, color: '#ccc' }}>
                  I'll get back to you shortly.
                </Typography>
              </Box>
            </Box>
          </Paper>

          <Typography
            variant="h6"
            align="center"
            sx={{ mt: 4, color: '#ddd', fontStyle: 'italic' }}
          >
            Looking to bring your project idea to life and get it live on the web?
I’d love to help! Feel free to reach out to me on any platform — let’s build something amazing together.
          </Typography>
        </motion.div>
      </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Contact;
