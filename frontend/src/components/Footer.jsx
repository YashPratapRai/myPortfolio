import React from 'react';
import { Box, Typography, IconButton, Stack, Tooltip } from '@mui/material';
import { GitHub, LinkedIn, Email } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#132b35ff',
        color: 'white',
        py: 4,
        px: 2,
        textAlign: 'center',
        mt: 0,
      }}
    >
      <Typography variant="h6" gutterBottom>
        © {new Date().getFullYear()} Yash Pratap Rai
      </Typography>

      <Typography variant="body2" sx={{ mb: 2, fontStyle: 'bold' }}>
             Thanks for showing interest in my portfolio! 🙏
      </Typography>

      <Stack direction="row" justifyContent="center" spacing={2}>
        <Tooltip title="GitHub" arrow>
          <IconButton
            href="https://github.com/YashPratapRai"
            target="_blank"
            rel="noopener"
            sx={{ color: 'white' }}
          >
            <GitHub />
          </IconButton>
        </Tooltip>

        <Tooltip title="LinkedIn" arrow>
          <IconButton
            href="https://www.linkedin.com/in/yash-pratap-rai-00465a284/"
            target="_blank"
            rel="noopener"
            sx={{ color: 'white' }}
          >
            <LinkedIn />
          </IconButton>
        </Tooltip>

        <Tooltip title="Gmail" arrow>
          <IconButton
            href="mailto:raiyashpratap@gmail.com"
            sx={{ color: 'white' }}
          >
            <Email />
          </IconButton>
        </Tooltip>
      </Stack>
    </Box>
  );
};

export default Footer;
