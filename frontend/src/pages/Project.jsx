import { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  CircularProgress,
  Box
} from '@mui/material';
import ProjectCard from '../components/ProjectCard';
import { fetchProjects } from '../utils/api';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProjects = async () => {
      try {
        const response = await fetchProjects();
        const data = response.data || response; // ✅ Ensure fallback
        setProjects(Array.isArray(data) ? data : []);
        console.log("Fetched Projects:", data); // ✅ Debug log
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
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (projects.length === 0) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <Typography color="error">No projects found or failed to load data.</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        fontWeight="bold"
        textAlign="center"
      >
        Featured Projects
      </Typography>

      <Grid container spacing={4}>
        {projects.map((project) => (
          <Grid item key={project._id || project.title} xs={12} sm={6} md={4}>
            <ProjectCard
              title={project.title}
              description={project.description}
              image={
                project.thumbnail
                  ? `http://localhost:5000/uploads/${project.thumbnail}`
                  : '/default-project.jpg'
              }
              githubLink={project.githubLink}
              liveDemo={project.liveDemoLink}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Projects;
