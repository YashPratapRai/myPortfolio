import { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Box,
  Button,
  CircularProgress
} from '@mui/material';
import { fetchProjects } from '../utils/api';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import ProjectCard from '../components/ProjectCard';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import CodeIcon from '@mui/icons-material/Code';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import DataObjectIcon from '@mui/icons-material/DataObject';
import StorageIcon from '@mui/icons-material/Storage';
import InsightsIcon from '@mui/icons-material/Insights';
import BarChartIcon from '@mui/icons-material/BarChart';
import FunctionsIcon from '@mui/icons-material/Functions';
import TableChartIcon from '@mui/icons-material/TableChart';
import DeveloperModeIcon from '@mui/icons-material/DeveloperMode';

const backendURL = import.meta.env.VITE_BACKEND_URL;

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [profileImage, setProfileImage] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const getProjects = async () => {
      try {
        const { data } = await fetchProjects();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };
    getProjects();
  }, []);

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const res = await axios.get(`${backendURL}/api/profile/image`);
        if (res.data?.imageUrl) {
          setProfileImage(`${backendURL}${res.data.imageUrl}?ts=${Date.now()}`);
        }
      } catch (error) {
        console.error('Failed to load profile image:', error);
      }
    };
    fetchProfileImage();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        sx={{
          py: 6,
          background: 'linear-gradient(135deg, #1e3c72, #2a5298)',
          color: '#fff'
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'nowrap',
              gap: 4
            }}
          >
            {/* Text Left */}
            <Box sx={{ flex: 1 }}>
              <TypeAnimation
                sequence={["Hi, I'm Yash Pratap Rai", 1000]}
                wrapper="h1"
                speed={50}
                style={{
                  fontSize: '2.5rem',
                  fontWeight: 'bold',
                  color: '#fff',
                  lineHeight: 1.2
                }}
                repeat={0}
              />
              <Typography
                variant="h6"
                sx={{ mt: 2, fontWeight: 300, textAlign: 'left' }}
              >
                A passionate full-stack developer and data science enthusiast, skilled in building scalable and elegant MERN stack applications. I also have strong proficiency in data analysis and visualization using Excel, Tableau, NumPy, Pandas, and Matplotlib. Explore my work below.
              </Typography>
            </Box>

            {/* Image Right */}
            <Box sx={{ flexShrink: 0 }}>
              <Box
                component="img"
                src={profileImage || '/fallback-avatar.png'}
                alt="profile.png"
                sx={{
                  width: 250,
                  height: 250,
                  borderRadius: '50%',
                  border: '5px solid #fff',
                  objectFit: 'cover',
                  boxShadow: 4
                }}
              />
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Projects Section */}
      <Box
        sx={{
          py: 8,
          pb: 0,
          mb: 0,
          background: 'linear-gradient(135deg, #1e3c72, #2a5298)',
          color: '#fff'
        }}
      >
        <Container maxWidth="xl">
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontWeight: 'bold', textAlign: 'center', mb: 4 }}
          >
            Featured Projects
          </Typography>

          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" height="200px">
              <CircularProgress />
            </Box>
          ) : projects.length === 0 ? (
            <Typography align="center">No projects to display.</Typography>
          ) : (
            <>
              <Grid container spacing={4}>
                {projects.slice(0, 4).map((project, index) => (
                  <Grid item xs={12} sm={6} md={4} key={project._id}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2 }}
                    >
                      <ProjectCard
                        title={project.title}
                        description={(project.description || '').substring(0, 100)}
                        image={
                          project.thumbnail
                            ? `${backendURL}/uploads/${project.thumbnail}`
                            : '/profile_enrique.png'
                        }
                        githubLink={project.githubLink}
                        liveDemo={project.liveDemoLink}
                      />
                    </motion.div>
                  </Grid>
                ))}
              </Grid>

              {/* Show All Button */}
              <Box sx={{ textAlign: 'center', mt: 5 }}>
                <Button
                  variant="contained"
                  onClick={() => navigate('/projects')}
                  sx={{
                    backgroundColor: '#fff',
                    color: '#1e3c72',
                    fontWeight: 'bold',
                    '&:hover': {
                      backgroundColor: '#e9bfbfc4'
                    }
                  }}
                >
                  Show All Projects
                </Button>
              </Box>
            </>
          )}
        </Container>
      </Box>

      {/* My Skills Section */}
      <Box
        id='skills'
        sx={{
          py: 8,
          background: 'linear-gradient(135deg, #1e3c72, #2a5298)',
          color: '#fff',
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontWeight: 'bold', textAlign: 'center', mb: 4 }}
          >
            My Skills
          </Typography>

          <Grid container spacing={3} justifyContent="center">
            {[
              {
                name: 'C++',
                icon: (
                  <Box
                    component="img"
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg"
                    alt="C++ icon"
                    sx={{ width: 30, height: 30 }}
                  />
                ),
              },
              {
                name: 'C',
                icon: (
                  <Box
                    component="img"
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg"
                    alt="C icon"
                    sx={{ width: 30, height: 30 }}
                  />
                ),
              },
              { name: 'Java', icon: <IntegrationInstructionsIcon fontSize="large" /> },
              { name: 'Python', icon: <DataObjectIcon fontSize="large" /> },
              { name: 'MERN Stack', icon: <DeveloperModeIcon fontSize="large" /> },
              { name: 'NumPy', icon: <FunctionsIcon fontSize="large" /> },
              { name: 'Pandas', icon: <TableChartIcon fontSize="large" /> },
              { name: 'Matplotlib', icon: <BarChartIcon fontSize="large" /> },
              { name: 'Excel', icon: <StorageIcon fontSize="large" /> },
              { name: 'Tableau', icon: <InsightsIcon fontSize="large" /> },
            ].map((skill, index) => (
              <Grid item key={index}>
                <motion.div
                  whileHover={{ scale: 1.08, rotate: 1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 250 }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      px: 3,
                      py: 2,
                      borderRadius: 3,
                      background: '#2a3eb1',
                      color: '#fff',
                      fontWeight: 'bold',
                      minWidth: 120,
                      boxShadow: 4,
                      cursor: 'pointer',
                      transition: '0.3s ease-in-out',
                      '&:hover': {
                        background: '#3f51b5',
                        boxShadow: 6,
                      },
                    }}
                  >
                    <Box sx={{ mb: 1 }}>{skill.icon}</Box>
                    <Typography variant="body1">{skill.name}</Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Home;
