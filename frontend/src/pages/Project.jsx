import { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  CircularProgress,
  Box,
  Button,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';
import { fetchProjects } from '../utils/api';
import Chatbot from '../components/chatbot';
import ContactPopup from '../components/ContactPopup';


const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));


  useEffect(() => {
    const getProjects = async () => {
      try {
        const response = await fetchProjects();
        const data = response.data || response;
        setProjects(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    getProjects();
  }, []);

  if (loading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="100vh"
        sx={{
          background: 'radial-gradient(circle at center, #0f2027, #203a43, #2c5364)',
        }}
      >
        <Box
          sx={{
            p: 6,
            borderRadius: 4,
            backdropFilter: 'blur(12px)',
            backgroundColor: 'rgba(15, 32, 39, 0.7)',
            boxShadow: '0 12px 40px rgba(0, 212, 255, 0.15)',
            border: '1px solid rgba(0, 212, 255, 0.1)',
            textAlign: 'center'
          }}
        >
          <CircularProgress 
            size={80} 
            thickness={4} 
            sx={{ 
              color: '#00d4ff',
              mb: 3
            }} 
          />
          <Typography
            variant="h6"
            sx={{
              color: '#e0f7fa',
              fontFamily: '"Space Mono", monospace',
              letterSpacing: '2px',
              textTransform: 'uppercase'
            }}
          >
            Loading Projects of Yash...
          </Typography>
        </Box>
      </Box>
    );
  }

  if (projects.length === 0) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="100vh"
        sx={{
          background: 'radial-gradient(circle at center, #0f2027, #203a43, #2c5364)',
        }}
      >
        <Box
          sx={{
            p: 6,
            borderRadius: 4,
            backdropFilter: 'blur(12px)',
            backgroundColor: 'rgba(15, 32, 39, 0.7)',
            boxShadow: '0 12px 40px rgba(0, 212, 255, 0.15)',
            border: '1px solid rgba(0, 212, 255, 0.1)',
            textAlign: 'center',
            maxWidth: '600px'
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: '#e0f7fa',
              fontFamily: '"Space Mono", monospace',
              mb: 3,
              '&::before': {
                content: '"// "',
                color: '#00d4ff'
              }
            }}
          >
            Project Repository Empty
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#b0bec5',
              mb: 4,
              fontFamily: '"Roboto Mono", monospace',
              lineHeight: 1.7
            }}
          >
            Currently no projects available. Please check back later or contact me for more information.
          </Typography>
          <Button
            variant="outlined"
            onClick={() => window.location.reload()}
            sx={{
              px: 4,
              py: 1.5,
              color: '#00d4ff',
              borderColor: '#00d4ff',
              borderRadius: '8px',
              fontFamily: '"Space Mono", monospace',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: 'rgba(0, 212, 255, 0.1)'
              }
            }}
          >
            Refresh
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        py: 10,
        background: `
          radial-gradient(circle at center, #0f2027, #203a43, #2c5364),
          url('https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2070&auto=format&fit=crop')
        `,
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center'
      }}
    >
      <Container maxWidth="xl">
        {/* Header Section */}
        <Box 
          sx={{ 
            mb: 10,
            textAlign: 'center'
          }}
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontFamily: '"Space Mono", monospace',
              color: '#e0f7fa',
              fontWeight: 'bold',
              fontSize: isMobile ? '2.5rem' : '4rem',
              mb: 2,
              lineHeight: 1.2,
              position: 'relative',
              display: 'inline-block',
              '&::before': {
                content: '"03."',
                fontFamily: '"Space Mono", monospace',
                color: '#00d4ff',
                mr: 2
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: '-10px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '100px',
                height: '4px',
                background: 'linear-gradient(90deg, #00d4ff, transparent)',
                borderRadius: '2px'
              }
            }}
          >
            PROJECT SHOWCASE
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              color: '#b0bec5',
              maxWidth: '800px',
              margin: '0 auto',
              lineHeight: 1.7,
              fontSize: isMobile ? '1rem' : '1.1rem',
              fontFamily: '"Roboto Mono", monospace',
              mt: 3
            }}
          >
            A curated collection of my professional work. Each project demonstrates technical expertise, 
            creative problem-solving, and attention to detail in full-stack development and data analysis.
          </Typography>
        </Box>

        {/* Projects Grid - 2 per row */}
        <Grid container spacing={6} justifyContent="center">
          <AnimatePresence>
            {projects.map((project, index) => (
              <Grid 
                item 
                key={project._id || project.title} 
                xs={12}
                sm={6}
                md={6}
                lg={6}
                xl={6}
                component={motion.div}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                layout
              >
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  image={
                        project.thumbnail || '/default-project.jpg'
                      }
                  githubLink={project.githubLink}
                  liveDemo={project.liveDemoLink}
                  tags={project.tags || []}
                />
              </Grid>
            ))}
          </AnimatePresence>
        </Grid>
      </Container>
      <ContactPopup/>
      <Chatbot/> 
    </Box>
  );
};

export default Projects;