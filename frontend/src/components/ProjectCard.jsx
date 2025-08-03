import React from 'react';
import {
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
  useTheme,
  Tooltip,
  Paper,
  IconButton
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';
import { motion } from 'framer-motion';

const ProjectCard = ({ 
  title, 
  description, 
  image, 
  githubLink, 
  liveDemo,
  tags = []
}) => {
  const theme = useTheme();
  const [isHovered, setIsHovered] = React.useState(false);
  
  return (
    <Box
      sx={{
        perspective: '1000px',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <Paper
        component={motion.div}
        initial={{ scale: 1 }}
        animate={{
          scale: isHovered ? 1.03 : 1,
          y: isHovered ? -10 : 0
        }}
        transition={{ 
          type: 'spring',
          stiffness: 200,
          damping: 15
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        sx={{
          width: '100%',
          maxWidth: '400px',
          height: '100%',
          minHeight: '500px',
          borderRadius: '24px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(145deg, rgba(15, 32, 39, 0.8), rgba(10, 25, 47, 0.9))',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(0, 212, 255, 0.3)',
          boxShadow: `
            0 10px 30px -15px rgba(0, 212, 255, 0.3),
            inset 0 0 20px rgba(0, 212, 255, 0.1)
          `,
          position: 'relative',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: `
              0 15px 40px -10px rgba(0, 212, 255, 0.4),
              inset 0 0 30px rgba(0, 212, 255, 0.2)
            `,
            borderColor: 'rgba(0, 212, 255, 0.6)'
          },
        }}
      >
        {/* Clean image thumbnail area */}
        <Box
          sx={{
            position: 'relative',
            height: '220px',
            overflow: 'hidden',
            zIndex: 1,
            pointerEvents: 'none'
          }}
        >
          <CardMedia
            component={motion.img}
            animate={{
              scale: isHovered ? 1.05 : 1,
            }}
            transition={{ duration: 0.4 }}
            image={image || '/placeholder-project.jpg'}
            alt={title}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transformOrigin: 'center center',
              pointerEvents: 'auto'
            }}
          />
        </Box>

        {/* Content Area */}
        <CardContent
          sx={{
            flexGrow: 1,
            px: 3,
            pt: 3,
            pb: 1,
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            zIndex: 2
          }}
        >
          <Typography
            variant="h5"
            component="h3"
            sx={{ 
              color: '#e0f7fa',
              fontFamily: '"Space Mono", monospace',
              fontWeight: 'bold',
              mb: 2,
              letterSpacing: '0.5px',
              lineHeight: 1.3,
              textShadow: '0 2px 4px rgba(0,0,0,0.3)',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: '-8px',
                left: 0,
                width: '50px',
                height: '3px',
                background: 'linear-gradient(90deg, #00d4ff, transparent)',
                borderRadius: '3px'
              }
            }}
          >
            {title}
          </Typography>
          
          <Typography
            variant="body2"
            sx={{
              color: '#b0bec5',
              lineHeight: 1.7,
              mb: 2,
              fontFamily: '"Roboto Mono", monospace',
              flexGrow: 1,
              fontSize: '0.95rem'
            }}
          >
            {description}
          </Typography>

          {/* Tags */}
          <Box 
            sx={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: 1, 
              mb: 2
            }}
          >
            {tags.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                size="small"
                component={motion.div}
                whileHover={{ scale: 1.05 }}
                sx={{
                  backgroundColor: 'rgba(0, 212, 255, 0.1)',
                  color: '#00d4ff',
                  fontFamily: '"Roboto Mono", monospace',
                  fontSize: '0.7rem',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  border: '1px solid rgba(0, 212, 255, 0.3)',
                  backdropFilter: 'blur(5px)',
                  transition: 'all 0.3s ease'
                }}
              />
            ))}
          </Box>
        </CardContent>

        {/* Action Buttons */}
        <Box
          sx={{
            px: 3,
            pb: 3,
            pt: 0,
            display: 'flex',
            justifyContent: 'space-between',
            position: 'relative',
            zIndex: 2
          }}
        >
          {githubLink && (
            <Tooltip title="View source code" arrow>
              <IconButton
                component={motion.a}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: '#b0bec5',
                  backgroundColor: 'rgba(0, 212, 255, 0.05)',
                  border: '1px solid rgba(0, 212, 255, 0.2)',
                  borderRadius: '12px',
                  p: 1.5,
                  '&:hover': {
                    backgroundColor: 'rgba(0, 212, 255, 0.15)',
                    color: '#00d4ff'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                <GitHubIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
          
          {liveDemo && (
            <Tooltip title="View live demo" arrow>
              <IconButton
                component={motion.a}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href={liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: '#b0bec5',
                  backgroundColor: 'rgba(0, 212, 255, 0.05)',
                  border: '1px solid rgba(0, 212, 255, 0.2)',
                  borderRadius: '12px',
                  p: 1.5,
                  '&:hover': {
                    backgroundColor: 'rgba(0, 212, 255, 0.15)',
                    color: '#00d4ff'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                <LaunchIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        {/* Floating Particles (stay below image) */}
        {isHovered && (
          <>
            {[...Array(3)].map((_, i) => (
              <Box
                key={i}
                component={motion.div}
                initial={{ 
                  opacity: 0,
                  x: Math.random() * 100 - 50,
                  y: Math.random() * 100 - 50
                }}
                animate={{ 
                  opacity: [0, 0.2, 0],
                  x: Math.random() * 150 - 75,
                  y: Math.random() * 150 - 75
                }}
                transition={{ 
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                sx={{
                  position: 'absolute',
                  top: '220px',         // 👈 start below image
                  left: 0,
                  width: '3px',
                  height: '3px',
                  borderRadius: '50%',
                  backgroundColor: '#00d4ff',
                  filter: 'blur(0.5px)',
                  zIndex: 0
                }}
              />
            ))}
          </>
        )}
      </Paper>
    </Box>
  );
};

export default ProjectCard;
