import { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Box,
  Button,
  CircularProgress,
  useTheme,
  useMediaQuery,
  Chip,
  Divider
} from '@mui/material';
import { fetchProjects } from '../utils/api';
import { motion, AnimatePresence } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import ProjectCard from '../components/ProjectCard';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Icons
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import CodeIcon from '@mui/icons-material/Code';
import DataObjectIcon from '@mui/icons-material/DataObject';
import StorageIcon from '@mui/icons-material/Storage';
import InsightsIcon from '@mui/icons-material/Insights';
import FunctionsIcon from '@mui/icons-material/Functions';
import DeveloperModeIcon from '@mui/icons-material/DeveloperMode';

const backendURL = import.meta.env.VITE_BACKEND_URL;

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [profileImage, setProfileImage] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
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

  const skills = [
    { name: 'JavaScript', icon: <CodeIcon fontSize="large" /> },
    { name: 'Python', icon: <DataObjectIcon fontSize="large" /> },
    { name: 'Java', icon: <DeveloperModeIcon fontSize="large" /> },
    { name: 'C/C++', icon: <CodeIcon fontSize="large" /> },
    { name: 'MERN Stack', icon: <DeveloperModeIcon fontSize="large" /> },
    { name: 'SQL/NoSQL', icon: <StorageIcon fontSize="large" /> },
    { name: 'Data Analysis', icon: <InsightsIcon fontSize="large" /> },
  ];

  const techStack = [
    { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
    { name: 'Express', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
    { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    
    { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  ];

  return (
    <Box sx={{ 
      overflowX: 'hidden',
      backgroundColor: '#0a192f',
      color: '#e6f1ff'
    }}>
      {/* Hero Section */}
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            right: 0,
            width: '50%',
            height: '100%',
            background: 'linear-gradient(135deg, rgba(10,25,47,0.9) 0%, rgba(21,101,192,0.4) 100%)',
            zIndex: 1,
            [theme.breakpoints.down('md')]: {
              width: '100%',
              background: 'linear-gradient(135deg, rgba(10,25,47,0.95) 0%, rgba(21,101,192,0.3) 100%)',
            }
          }
        }}
      >
        {/* Animated background elements */}
        <Box
          component={motion.div}
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            rotate: [0, 5, 0]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          sx={{
            position: 'absolute',
            top: '20%',
            left: '10%',
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(100,255,218,0.15) 0%, transparent 70%)',
            filter: 'blur(40px)',
            zIndex: 0
          }}
        />
        
        <Box
          component={motion.div}
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          sx={{
            position: 'absolute',
            bottom: '10%',
            right: '15%',
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(100,255,218,0.1) 0%, transparent 70%)',
            filter: 'blur(50px)',
            zIndex: 0
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box
                component={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: '#64ffda',
                    mb: 2,
                    fontFamily: 'monospace',
                    fontSize: isMobile ? '1rem' : '1.25rem'
                  }}
                >
                  Hi, my name is
                </Typography>
                
                <Typography
                  variant="h2"
                  component="h1"
                  sx={{
                    fontWeight: 'bold',
                    mb: 2,
                    fontSize: isMobile ? '2.5rem' : '4rem',
                    lineHeight: 1.1,
                    color: '#ccd6f6'
                  }}
                >
                  Yash Pratap Rai.
                </Typography>
                
                <Typography
                  variant="h2"
                  component="div"
                  sx={{
                    fontWeight: 'bold',
                    mb: 3,
                    fontSize: isMobile ? '2rem' : '3rem',
                    lineHeight: 1.1,
                    color: '#8892b0'
                  }}
                >
                  <TypeAnimation
                    sequence={[
                      "I build things for the web.",
                      1500,
                      "I analyze and visualize data.",
                      1500,
                      "I solve complex problems.",
                      1500
                    ]}
                    wrapper="span"
                    speed={50}
                    repeat={Infinity}
                  />
                </Typography>
                
                <Typography
                  variant="body1"
                  sx={{
                    mb: 4,
                    maxWidth: '540px',
                    color: '#8892b0',
                    fontSize: isMobile ? '1rem' : '1.1rem',
                    lineHeight: 1.6
                  }}
                >
                  I'm a full-stack developer specializing in building exceptional digital experiences. Currently focused on building accessible, human-centered products at the intersection of technology and design.
                </Typography>
                
                <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                  <Button
                    variant="contained"
                    onClick={() => navigate('/projects')}
                    sx={{
                      px: 4,
                      py: 1.5,
                      borderRadius: 1,
                      fontWeight: 'bold',
                      backgroundColor: '#64ffda',
                      color: '#0a192f',
                      '&:hover': {
                        backgroundColor: '#52d1b2',
                        transform: 'translateY(-3px)'
                      },
                      transition: 'all 0.3s ease',
                      boxShadow: '0 10px 20px -10px rgba(100,255,218,0.3)'
                    }}
                    component={motion.div}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View My Work
                  </Button>
                  
                  <Button
                    variant="outlined"
                    onClick={() => navigate('/contact')}
                    sx={{
                      px: 4,
                      py: 1.5,
                      borderRadius: 1,
                      fontWeight: 'bold',
                      borderColor: '#64ffda',
                      color: '#64ffda',
                      '&:hover': {
                        backgroundColor: 'rgba(100,255,218,0.1)',
                        borderColor: '#64ffda',
                        transform: 'translateY(-3px)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                    component={motion.div}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Get In Touch
                  </Button>
                </Box>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box
                sx={{
                  position: 'relative',
                  width: isMobile ? 250 : 350,
                  height: isMobile ? 250 : 350,
                }}
                component={motion.div}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <Box
                  component="img"
                  src={profileImage || '/fallback-avatar.png'}
                  alt="Profile"
                  sx={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '5px',
                    objectFit: 'cover',
                    position: 'relative',
                    zIndex: 2,
                    filter: 'grayscale(100%) contrast(1)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      filter: 'none'
                    }
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: 15,
                    left: 15,
                    right: -15,
                    bottom: -15,
                    borderRadius: '5px',
                    border: '2px solid #64ffda',
                    zIndex: 1,
                    transition: 'all 0.3s ease'
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Projects Section */}
      <Box
        id="projects"
        sx={{
          py: 10,
          backgroundColor: '#0a192f',
          position: 'relative'
        }}
      >
        <Container maxWidth="xl">
          <Box
            sx={{
              mb: 8,
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: '50%',
                left: 0,
                width: '100%',
                height: '1px',
                backgroundColor: '#233554',
                zIndex: -1
              }
            }}
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Typography
              variant="h4"
              component="h2"
              sx={{
                display: 'inline-block',
                backgroundColor: '#0a192f',
                pr: 2,
                fontFamily: 'monospace',
                color: '#ccd6f6',
                fontWeight: 'bold',
                fontSize: isMobile ? '1.5rem' : '2rem',
                '&::before': {
                  content: '"02."',
                  fontFamily: 'monospace',
                  color: '#64ffda',
                  mr: 2
                }
              }}
            >
              Some Things I've Built
            </Typography>
          </Box>

          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" height="300px">
              <CircularProgress size={60} thickness={4} sx={{ color: '#64ffda' }} />
            </Box>
          ) : projects.length === 0 ? (
            <Typography align="center" variant="h6" color="text.secondary">
              No projects to display.
            </Typography>
          ) : (
            <Grid container spacing={6}>
              <AnimatePresence>
                {projects.slice(0, 3).map((project, index) => (
                  <Grid item xs={12} key={project._id}>
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      viewport={{ once: true }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: isMobile ? 'column' : 'row',
                          alignItems: 'center',
                          gap: 4,
                          backgroundColor: '#112240',
                          borderRadius: '5px',
                          p: 4,
                          boxShadow: '0 10px 30px -15px rgba(2,12,27,0.7)',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-7px)'
                          }
                        }}
                      >
                        <Box sx={{ flex: 1, order: index % 2 === 0 ? 1 : 2 }}>
                          <Typography
                            variant="h5"
                            component="h3"
                            sx={{
                              color: '#ccd6f6',
                              mb: 2,
                              fontWeight: 'bold',
                              fontSize: isMobile ? '1.5rem' : '1.75rem'
                            }}
                          >
                            {project.title}
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{
                              mb: 3,
                              color: '#a8b2d1',
                              fontSize: isMobile ? '0.9rem' : '1rem',
                              lineHeight: 1.6
                            }}
                          >
                            {project.description}
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3 }}>
                            {(project.tags || []).map((tag, i) => (
                              <Chip
                                key={i}
                                label={tag}
                                size="small"
                                sx={{
                                  backgroundColor: 'transparent',
                                  color: '#a8b2d1',
                                  border: '1px solid #64ffda',
                                  fontFamily: 'monospace',
                                  fontSize: '0.7rem'
                                }}
                              />
                            ))}
                          </Box>
                          <Box sx={{ display: 'flex', gap: 2 }}>
                            {project.githubLink && (
                              <Button
                                variant="text"
                                size="small"
                                href={project.githubLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{
                                  color: '#64ffda',
                                  minWidth: 0,
                                  p: 1,
                                  '&:hover': {
                                    backgroundColor: 'rgba(100,255,218,0.1)'
                                  }
                                }}
                              >
                                <GitHubIcon fontSize="small" />
                              </Button>
                            )}
                            {project.liveDemoLink && (
                              <Button
                                variant="text"
                                size="small"
                                href={project.liveDemoLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{
                                  color: '#64ffda',
                                  fontSize: '0.8rem',
                                  fontFamily: 'monospace',
                                  '&:hover': {
                                    backgroundColor: 'rgba(100,255,218,0.1)'
                                  }
                                }}
                              >
                                Visit Live
                              </Button>
                            )}
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            flex: 1,
                            order: index % 2 === 0 ? 2 : 1,
                            position: 'relative',
                            overflow: 'hidden',
                            borderRadius: '5px',
                            '&:hover img': {
                              transform: 'scale(1.03)'
                            }
                          }}
                        >
                          <Box
                            component="img"
                            src={
                              project.thumbnail
                                ? `${backendURL}/uploads/${project.thumbnail}`
                                : '/profile_enrique.png'
                            }
                            alt={project.title}
                            sx={{
                              width: '100%',
                              height: 'auto',
                              objectFit: 'cover',
                              transition: 'transform 0.5s ease',
                              filter: 'grayscale(100%) contrast(1) brightness(90%)',
                              '&:hover': {
                                filter: 'none'
                              }
                            }}
                          />
                          <Box
                            sx={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              backgroundColor: 'rgba(100,255,218,0.1)',
                              mixBlendMode: 'screen',
                              opacity: 0,
                              transition: 'opacity 0.3s ease',
                              '&:hover': {
                                opacity: 0.2
                              }
                            }}
                          />
                        </Box>
                      </Box>
                    </motion.div>
                  </Grid>
                ))}
              </AnimatePresence>
            </Grid>
          )}

          <Box
            sx={{ textAlign: 'center', mt: 8 }}
            component={motion.div}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/projects')}
              sx={{
                px: 6,
                py: 1.5,
                borderRadius: 1,
                fontWeight: 'bold',
                fontSize: '1rem',
                borderColor: '#64ffda',
                color: '#64ffda',
                '&:hover': {
                  backgroundColor: 'rgba(100,255,218,0.1)',
                  borderColor: '#64ffda'
                },
                transition: 'all 0.3s ease'
              }}
            >
              View All Projects
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Skills Section */}
      <Box
        id="skills"
        sx={{
          py: 10,
          backgroundColor: '#0a192f',
          position: 'relative'
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              mb: 8,
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: '50%',
                left: 0,
                width: '100%',
                height: '1px',
                backgroundColor: '#233554',
                zIndex: -1
              }
            }}
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Typography
              variant="h4"
              component="h2"
              sx={{
                display: 'inline-block',
                backgroundColor: '#0a192f',
                pr: 2,
                fontFamily: 'monospace',
                color: '#ccd6f6',
                fontWeight: 'bold',
                fontSize: isMobile ? '1.5rem' : '2rem',
                '&::before': {
                  content: '"03."',
                  fontFamily: 'monospace',
                  color: '#64ffda',
                  mr: 2
                }
              }}
            >
              Skills & Technologies
            </Typography>
          </Box>

          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <Box
                component={motion.div}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Typography
                  variant="h5"
                  component="h3"
                  sx={{
                    color: '#ccd6f6',
                    mb: 3,
                    fontWeight: 'bold',
                    fontSize: isMobile ? '1.25rem' : '1.5rem'
                  }}
                >
                  What I Do
                </Typography>
                
                <Grid container spacing={3}>
                  {skills.map((skill, index) => (
                    <Grid item xs={6} key={index}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 2,
                          p: 2,
                          backgroundColor: '#112240',
                          borderRadius: '5px',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-5px)',
                            boxShadow: '0 10px 20px -10px rgba(2,12,27,0.7)'
                          }
                        }}
                        component={motion.div}
                        whileHover={{ scale: 1.03 }}
                      >
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(100,255,218,0.1)',
                            color: '#64ffda'
                          }}
                        >
                          {skill.icon}
                        </Box>
                        <Typography variant="body1" sx={{ color: '#ccd6f6' }}>
                          {skill.name}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box
                component={motion.div}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Typography
                  variant="h5"
                  component="h3"
                  sx={{
                    color: '#ccd6f6',
                    mb: 3,
                    fontWeight: 'bold',
                    fontSize: isMobile ? '1.25rem' : '1.5rem'
                  }}
                >
                  Tech Stack
                </Typography>
                
                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 2
                  }}
                >
                  {techStack.map((tech, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        p: 2,
                        backgroundColor: '#112240',
                        borderRadius: '5px',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: '0 10px 20px -10px rgba(2,12,27,0.7)'
                        }
                      }}
                      component={motion.div}
                      whileHover={{ scale: 1.03 }}
                    >
                      <Box
                        component="img"
                        src={tech.icon}
                        alt={tech.name}
                        sx={{ width: 24, height: 24 }}
                      />
                      <Typography variant="body2" sx={{ color: '#ccd6f6' }}>
                        {tech.name}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Contact CTA */}
      <Box
        id="contact"
        sx={{
          py: 10,
          backgroundColor: '#0a192f',
          textAlign: 'center'
        }}
      >
        <Container maxWidth="md">
          <Box
            component={motion.div}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Typography
              variant="h6"
              sx={{
                color: '#64ffda',
                mb: 2,
                fontFamily: 'monospace',
                fontSize: isMobile ? '1rem' : '1.25rem'
              }}
            >
              04. What's Next?
            </Typography>
            
            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontWeight: 'bold',
                mb: 3,
                fontSize: isMobile ? '2rem' : '3rem',
                color: '#ccd6f6'
              }}
            >
              Get In Touch
            </Typography>
            
            <Typography
              variant="body1"
              sx={{
                mb: 5,
                maxWidth: 600,
                mx: 'auto',
                color: '#8892b0',
                fontSize: isMobile ? '1rem' : '1.1rem',
                lineHeight: 1.6
              }}
            >
              Although I'm not currently looking for any new opportunities, my inbox is always open. Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </Typography>
            
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/contact')}
              sx={{
                px: 6,
                py: 1.5,
                borderRadius: 1,
                fontWeight: 'bold',
                borderColor: '#64ffda',
                color: '#64ffda',
                '&:hover': {
                  backgroundColor: 'rgba(100,255,218,0.1)',
                  borderColor: '#64ffda'
                },
                transition: 'all 0.3s ease'
              }}
              component={motion.div}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Say Hello
            </Button>
            
            <Box sx={{ mt: 8, display: 'flex', justifyContent: 'center', gap: 3 }}>
              <Button
                variant="text"
                href="https://github.com/YashPratapRai"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: '#ccd6f6',
                  minWidth: 0,
                  '&:hover': {
                    color: '#64ffda'
                  }
                }}
              >
                <GitHubIcon fontSize="large" />
              </Button>
              
              <Button
                variant="text"
                href="https://www.linkedin.com/in/yash-pratap-rai-00465a284/"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: '#ccd6f6',
                  minWidth: 0,
                  '&:hover': {
                    color: '#64ffda'
                  }
                }}
              >
                <LinkedInIcon fontSize="large" />
              </Button>
              
              
              
              <Button
                variant="text"
                href="mailto:raiyashpratap@gmail.com"
                sx={{
                  color: '#ccd6f6',
                  minWidth: 0,
                  '&:hover': {
                    color: '#64ffda'
                  }
                }}
              >
                <EmailIcon fontSize="large" />
              </Button>
            </Box>
          </Box>
        </Container> 
      </Box>
    </Box>
  );
};

export default Home;