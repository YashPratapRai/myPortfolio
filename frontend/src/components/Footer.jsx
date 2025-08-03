import React from 'react';
import { 
  Box, 
  Typography, 
  IconButton, 
  Stack, 
  Tooltip, 
  Divider,
  useTheme,
  useMediaQuery,
  Container
} from '@mui/material';
import { 
  GitHub, 
  LinkedIn, 
  Email,
  Favorite
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const socialLinks = [
    {
      name: 'GitHub',
      icon: <GitHub />,
      url: 'https://github.com/YashPratapRai',
      color: '#6e5494'
    },
    {
      name: 'LinkedIn',
      icon: <LinkedIn />,
      url: 'https://www.linkedin.com/in/yash-pratap-rai-00465a284/',
      color: '#0077b5'
    },
    {
      name: 'Email',
      icon: <Email />,
      url: 'mailto:raiyashpratap@gmail.com',
      color: '#d44638'
    }
  ];

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#0a192f',
        color: '#ccd6f6',
        py: 4,
        px: 2,
        textAlign: 'center',
        borderTop: '1px solid rgba(100, 255, 218, 0.1)',
      }}
    >
      <Container maxWidth="lg">
        {/* Social Links with subtle animation */}
        <Stack 
          direction="row" 
          justifyContent="center" 
          spacing={isMobile ? 2 : 3}
          sx={{ mb: 3 }}
        >
          {socialLinks.map((link, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Tooltip title={link.name} arrow>
                <IconButton
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ 
                    color: '#64ffda',
                    backgroundColor: 'rgba(100, 255, 218, 0.1)',
                    '&:hover': {
                      backgroundColor: 'rgba(100, 255, 218, 0.2)',
                      color: link.color
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  {link.icon}
                </IconButton>
              </Tooltip>
            </motion.div>
          ))}
        </Stack>

        {/* Copyright with heart icon */}
        <Typography
          variant="body2"
          sx={{
            color: '#8892b0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 0.5
          }}
        >
          Made with <Favorite sx={{ color: '#ff6b6b', fontSize: '1rem' }} /> by Yash Pratap Rai
        </Typography>

        {/* Copyright year */}
        <Typography
          variant="body2"
          sx={{
            color: '#495670',
            fontSize: '0.8rem',
            mt: 1
          }}
        >
          © {new Date().getFullYear()} All rights reserved
        </Typography>

        {/* Tech stack credit */}
        <Typography
          variant="caption"
          sx={{
            color: '#495670',
            display: 'block',
            mt: 2,
            fontSize: '0.7rem'
          }}
        >
          Built with React, Material-UI, and Framer Motion
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;