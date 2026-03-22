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
} from '@mui/material';
import { fetchProjects } from '../utils/api';
import { motion, AnimatePresence } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { useNavigate } from 'react-router-dom';
import Chatbot from '../components/chatbot';

import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import CodeIcon from '@mui/icons-material/Code';
import DataObjectIcon from '@mui/icons-material/DataObject';
import StorageIcon from '@mui/icons-material/Storage';
import InsightsIcon from '@mui/icons-material/Insights';
import DeveloperModeIcon from '@mui/icons-material/DeveloperMode';
import DownloadIcon from '@mui/icons-material/Download';
import PsychologyIcon from '@mui/icons-material/Psychology';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ContactPopup from '../components/ContactPopup';

// RAG / Gen AI icon — using a "hub" style icon available in MUI
import HubIcon from '@mui/icons-material/Hub';

const backendURL = import.meta.env.VITE_BACKEND_URL;

/* ─────────────── tiny helpers ─────────────── */
const accent = '#64ffda';
const navy   = '#0a192f';
const navyLight = '#112240';
const slate  = '#8892b0';
const lightSlate = '#a8b2d1';
const white  = '#ccd6f6';

const glowBox = {
  boxShadow: `0 0 0 1px rgba(100,255,218,0.08), 0 20px 40px -20px rgba(2,12,27,0.8)`,
};

/* ─────────────── component ─────────────── */
const Home = () => {
  const [projects, setProjects]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [cvLoading, setCvLoading] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const theme      = useTheme();
  const isMobile   = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate   = useNavigate();

  useEffect(() => {
    const getProjects = async () => {
      try {
        const { data } = await fetchProjects();
        setProjects(data.map(p => ({
          ...p,
          thumbnail: p.thumbnail || '/default-project.jpg',
        })));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    getProjects();
  }, []);

  const handleDownloadCV = () => {
    window.open(`${backendURL}/api/cv/view`, '_blank', 'noopener,noreferrer');
  };

  /* ── skills list ── */
  const skills = [
    { name: 'Machine Learning',      icon: <PsychologyIcon />,    desc: 'Supervised & unsupervised models, feature engineering' },
    { name: 'Deep Learning',         icon: <AutoAwesomeIcon />,   desc: 'CNNs, RNNs, Transformers, PyTorch / TensorFlow' },
    { name: 'Generative AI & RAG',   icon: <HubIcon />,           desc: 'LLMs, RAG pipelines, vector search, LangChain, prompt engineering' },
    { name: 'Python',                icon: <DataObjectIcon />,    desc: 'NumPy, Pandas, Scikit-learn, FastAPI' },
    { name: 'JavaScript',            icon: <CodeIcon />,          desc: 'ES2022+, async patterns, React ecosystem' },
    { name: 'Java / C / C++',        icon: <DeveloperModeIcon />, desc: 'OOP, systems programming, algorithms' },
    { name: 'SQL / NoSQL',           icon: <StorageIcon />,       desc: 'PostgreSQL, MongoDB, query optimisation' },
    { name: 'Data Analysis',         icon: <InsightsIcon />,      desc: 'Azure Databricks, Data Factory, Power BI' },
  ];

  const techStack = [
    { name: 'React',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'Node.js',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    { name: 'MongoDB',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
    { name: 'Python',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    { name: 'PyTorch',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg' },
    { name: 'TensorFlow', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' },
    { name: 'Git',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
    { name: 'Docker',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  ];

  /* ── section heading helper ── */
  const SectionHeading = ({ number, children }) => (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      sx={{ mb: 8, display: 'flex', alignItems: 'center', gap: 2 }}
    >
      <Typography
        sx={{
          fontFamily: 'monospace',
          color: accent,
          fontSize: isMobile ? '0.9rem' : '1.1rem',
          whiteSpace: 'nowrap',
        }}
      >
        {number}.
      </Typography>
      <Typography
        variant="h4"
        component="h2"
        sx={{
          fontWeight: 700,
          color: white,
          fontSize: isMobile ? '1.4rem' : '2rem',
          whiteSpace: 'nowrap',
        }}
      >
        {children}
      </Typography>
      <Box sx={{ flex: 1, height: '1px', backgroundColor: '#233554', ml: 2 }} />
    </Box>
  );

  return (
    <Box sx={{ overflowX: 'hidden', backgroundColor: navy, color: white }}>

      {/* ══════════════ HERO ══════════════ */}
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Ambient blobs */}
        {[
          { top: '15%', left: '5%',   size: 420, delay: 0 },
          { top: '55%', right: '8%',  size: 340, delay: 5 },
          { top: '70%', left: '40%',  size: 260, delay: 10 },
        ].map((b, i) => (
          <Box
            key={i}
            component={motion.div}
            animate={{ x: [0, 60, 0], y: [0, -40, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 18 + i * 4, repeat: Infinity, ease: 'easeInOut', delay: b.delay }}
            sx={{
              position: 'absolute',
              top: b.top,
              left: b.left,
              right: b.right,
              width: b.size,
              height: b.size,
              borderRadius: '50%',
              background: `radial-gradient(circle, rgba(100,255,218,0.12) 0%, transparent 70%)`,
              filter: 'blur(50px)',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />
        ))}

        {/* Dot-grid texture */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `radial-gradient(rgba(100,255,218,0.06) 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
            zIndex: 0,
            pointerEvents: 'none',
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Grid container spacing={6} alignItems="center">

            {/* ── text side ── */}
            <Grid item xs={12} md={7}>
              <Box
                component={motion.div}
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9 }}
              >
                <Typography
                  sx={{
                    color: accent,
                    mb: 1.5,
                    fontFamily: 'monospace',
                    fontSize: isMobile ? '0.9rem' : '1.1rem',
                    letterSpacing: '0.12em',
                  }}
                >
                  Hi, my name is
                </Typography>

                <Typography
                  variant="h1"
                  sx={{
                    fontWeight: 800,
                    mb: 1,
                    fontSize: isMobile ? '2.6rem' : '4.2rem',
                    lineHeight: 1.05,
                    color: white,
                    letterSpacing: '-0.02em',
                  }}
                >
                  Yash Pratap Rai.
                </Typography>

                <Box sx={{ mb: 3, minHeight: isMobile ? 56 : 72 }}>
                  <Typography
                    variant="h2"
                    component="div"
                    sx={{
                      fontWeight: 700,
                      fontSize: isMobile ? '1.4rem' : '2.2rem',
                      color: slate,
                      lineHeight: 1.3,
                    }}
                  >
                    <TypeAnimation
                      sequence={[
                        'Built Machine Learning Projects',      1800,
                        'Built NLP-based Recommendation System', 1800,
                        'Built Deep Learning Models (LSTM)',     1800,
                        'Exploring Generative AI & RAG',         1800,
                      ]}
                      wrapper="span"
                      speed={50}
                      repeat={Infinity}
                    />
                  </Typography>
                </Box>

                <Typography
                  variant="body1"
                  sx={{
                    mb: 5,
                    maxWidth: 560,
                    color: slate,
                    fontSize: isMobile ? '0.95rem' : '1.05rem',
                    lineHeight: 1.8,
                  }}
                >
                  I build intelligent systems across Machine Learning, NLP, and Deep Learning — and
                  explore the frontier of Generative AI. Currently crafting data pipelines and
                  analytics workflows with Azure Data Factory and Databricks.
                </Typography>

                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  {/* Primary CTA */}
                  <Button
                    onClick={() => navigate('/projects')}
                    component={motion.button}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.96 }}
                    sx={{
                      px: 4, py: 1.5,
                      fontWeight: 700,
                      borderRadius: '4px',
                      backgroundColor: accent,
                      color: navy,
                      fontSize: '0.95rem',
                      boxShadow: `0 8px 24px -8px rgba(100,255,218,0.5)`,
                      '&:hover': { backgroundColor: '#52d1b2' },
                      transition: 'background 0.2s',
                    }}
                  >
                    View My Work
                  </Button>

                  {[
                    { label: 'Get In Touch', action: () => navigate('/contact') },
                  ].map(({ label, action }) => (
                    <Button
                      key={label}
                      onClick={action}
                      component={motion.button}
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.96 }}
                      sx={{
                        px: 4, py: 1.5,
                        fontWeight: 700,
                        borderRadius: '4px',
                        border: `1px solid ${accent}`,
                        color: accent,
                        fontSize: '0.95rem',
                        '&:hover': { backgroundColor: 'rgba(100,255,218,0.08)' },
                        transition: 'background 0.2s',
                      }}
                    >
                      {label}
                    </Button>
                  ))}

                  <Button
                    onClick={handleDownloadCV}
                    disabled={cvLoading}
                    startIcon={cvLoading ? <CircularProgress size={16} color="inherit" /> : <DownloadIcon />}
                    component={motion.button}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.96 }}
                    sx={{
                      px: 4, py: 1.5,
                      fontWeight: 700,
                      borderRadius: '4px',
                      border: `1px solid ${accent}`,
                      color: accent,
                      fontSize: '0.95rem',
                      '&:hover': { backgroundColor: 'rgba(100,255,218,0.08)' },
                      '&.Mui-disabled': { borderColor: 'rgba(100,255,218,0.25)', color: 'rgba(100,255,218,0.25)' },
                      transition: 'background 0.2s',
                    }}
                  >
                    {cvLoading ? 'Downloading…' : 'Download CV'}
                  </Button>
                </Box>

                {/* Social row */}
                <Box sx={{ mt: 4, display: 'flex', gap: 1.5, alignItems: 'center' }}>
                  {[
                    { icon: <GitHubIcon />,   href: 'https://github.com/YashPratapRai' },
                    { icon: <LinkedInIcon />, href: 'https://www.linkedin.com/in/yash-pratap-rai-00465a284/' },
                    { icon: <EmailIcon />,    href: 'mailto:raiyashpratap@gmail.com' },
                  ].map(({ icon, href }, i) => (
                    <Box
                      key={i}
                      component="a"
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        border: `1px solid #233554`,
                        color: lightSlate,
                        transition: 'all 0.2s',
                        '&:hover': { color: accent, borderColor: accent, transform: 'translateY(-3px)' },
                      }}
                    >
                      {icon}
                    </Box>
                  ))}
                  <Box sx={{ width: 80, height: '1px', backgroundColor: '#233554', ml: 1 }} />
                </Box>
              </Box>
            </Grid>

            {/* ── photo side ── */}
            <Grid item xs={12} md={5} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box
                component={motion.div}
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.35, duration: 0.9 }}
                sx={{ position: 'relative', width: isMobile ? 260 : 320, height: isMobile ? 260 : 320 }}
              >
                {/* glow ring */}
                <Box
                  sx={{
                    position: 'absolute',
                    inset: -12,
                    borderRadius: '8px',
                    background: `conic-gradient(from 180deg, transparent 60%, rgba(100,255,218,0.35) 100%)`,
                    filter: 'blur(12px)',
                    zIndex: 0,
                  }}
                />
                <Box
                  component="img"
                  src="\ChatGPT Image Mar 22, 2026, 07_55_42 PM.png"
                  alt="Profile"
                  sx={{
                    position: 'relative',
                    zIndex: 5,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center top',
                    borderRadius: '6px',
                    transition: 'transform 0.4s ease',
                    '&:hover': { transform: 'scale(1.02)' },
                  }}
                />
                {/* corner border */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 14,
                    left: 14,
                    right: -14,
                    bottom: -14,
                    borderRadius: '6px',
                    border: `2px solid ${accent}`,
                    zIndex: 1,
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ══════════════ PROJECTS ══════════════ */}
      <Box id="projects" sx={{ py: 12, backgroundColor: navy }}>
        <Container maxWidth="xl">
          <SectionHeading number="02">Some Things I've Built</SectionHeading>

          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" height="300px">
              <CircularProgress size={56} thickness={3} sx={{ color: accent }} />
            </Box>
          ) : projects.length === 0 ? (
            <Typography align="center" color="text.secondary">No projects to display.</Typography>
          ) : (
            <Grid container spacing={5}>
              <AnimatePresence>
                {projects.slice(0, 4).map((project, index) => (
                  <Grid item xs={12} key={project._id}>
                    <motion.div
                      initial={{ opacity: 0, y: 48 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.08, duration: 0.55 }}
                      viewport={{ once: true }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: isMobile ? 'column' : 'row',
                          alignItems: 'stretch',
                          gap: 0,
                          backgroundColor: navyLight,
                          borderRadius: '8px',
                          overflow: 'hidden',
                          ...glowBox,
                          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-6px)',
                            boxShadow: `0 0 0 1px rgba(100,255,218,0.2), 0 30px 50px -20px rgba(2,12,27,0.9)`,
                          },
                        }}
                      >
                        {/* text */}
                        <Box
                          sx={{
                            flex: 1,
                            p: isMobile ? 3 : 5,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            order: index % 2 === 0 ? 1 : 2,
                          }}
                        >
                          <Typography
                            sx={{ fontFamily: 'monospace', color: accent, fontSize: '0.8rem', mb: 1, letterSpacing: '0.1em' }}
                          >
                            Featured Project
                          </Typography>
                          <Typography
                            variant="h5"
                            sx={{ color: white, fontWeight: 700, mb: 2, fontSize: isMobile ? '1.3rem' : '1.6rem' }}
                          >
                            {project.title}
                          </Typography>

                          {/* description card */}
                          <Box
                            sx={{
                              p: 2.5,
                              mb: 3,
                              backgroundColor: '#0d1f3c',
                              borderRadius: '4px',
                              borderLeft: `3px solid ${accent}`,
                            }}
                          >
                            <Typography
                              variant="body2"
                              sx={{ color: lightSlate, lineHeight: 1.75, fontSize: isMobile ? '0.85rem' : '0.95rem' }}
                            >
                              {project.description}
                            </Typography>
                          </Box>

                          {/* ── Tech Stack chips (from backend) ── */}
                          {project.techStack && project.techStack.length > 0 && (
                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
                              {project.techStack.map((tech, i) => (
                                <Chip
                                  key={i}
                                  label={tech}
                                  size="small"
                                  sx={{
                                    backgroundColor: 'rgba(100,255,218,0.08)',
                                    color: accent,
                                    fontFamily: 'monospace',
                                    fontSize: '0.7rem',
                                    border: '1px solid rgba(100,255,218,0.2)',
                                    height: 24,
                                  }}
                                />
                              ))}
                            </Box>
                          )}

                          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                            {project.githubLink && (
                              <Box
                                component="a"
                                href={project.githubLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{ color: lightSlate, '&:hover': { color: accent }, display: 'flex' }}
                              >
                                <GitHubIcon />
                              </Box>
                            )}
                            {project.liveDemoLink && (
                              <Button
                                href={project.liveDemoLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                size="small"
                                sx={{
                                  color: accent,
                                  fontFamily: 'monospace',
                                  fontSize: '0.8rem',
                                  p: 0,
                                  minWidth: 0,
                                  '&:hover': { backgroundColor: 'transparent', textDecoration: 'underline' },
                                }}
                              >
                                ↗ Visit Live
                              </Button>
                            )}
                          </Box>
                        </Box>

                        {/* image */}
                        <Box
                          sx={{
                            flex: 1,
                            order: index % 2 === 0 ? 2 : 1,
                            minHeight: isMobile ? 220 : 'auto',
                            position: 'relative',
                            overflow: 'hidden',
                          }}
                        >
                          <Box
                            component="img"
                            src={project.thumbnail}
                            alt={project.title}
                            sx={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              transition: 'transform 0.5s ease',
                              '&:hover': { transform: 'scale(1.04)' },
                            }}
                          />
                          <Box
                            sx={{
                              position: 'absolute',
                              inset: 0,
                              background: `linear-gradient(135deg, rgba(10,25,47,0.4) 0%, transparent 70%)`,
                              pointerEvents: 'none',
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

          <Box sx={{ textAlign: 'center', mt: 8 }}>
            <Button
              onClick={() => navigate('/projects')}
              component={motion.button}
              whileHover={{ y: -3 }}
              sx={{
                px: 6, py: 1.5,
                fontWeight: 700,
                borderRadius: '4px',
                border: `1px solid ${accent}`,
                color: accent,
                '&:hover': { backgroundColor: 'rgba(100,255,218,0.08)' },
              }}
            >
              View All Projects
            </Button>
          </Box>
        </Container>
      </Box>

      {/* ══════════════ SKILLS ══════════════ */}
      <Box
        id="skills"
        sx={{
          py: 12,
          backgroundColor: '#0b1a30',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            backgroundImage: `radial-gradient(rgba(100,255,218,0.04) 1px, transparent 1px)`,
            backgroundSize: '28px 28px',
            pointerEvents: 'none',
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <SectionHeading number="03">Skills &amp; Technologies</SectionHeading>

          <Grid container spacing={6}>
            {/* ── skill cards ── */}
            <Grid item xs={12} md={7}>
              <Box
                component={motion.div}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Typography variant="h6" sx={{ color: white, mb: 3, fontWeight: 600 }}>
                  What I Do
                </Typography>

                <Grid container spacing={2}>
                  {skills.map((skill, i) => (
                    <Grid item xs={12} sm={6} key={i}>
                      <Box
                        component={motion.div}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.06, duration: 0.4 }}
                        viewport={{ once: true }}
                        onMouseEnter={() => setHoveredSkill(i)}
                        onMouseLeave={() => setHoveredSkill(null)}
                        sx={{
                          p: 2.5,
                          borderRadius: '6px',
                          backgroundColor: navyLight,
                          border: `1px solid ${hoveredSkill === i ? 'rgba(100,255,218,0.3)' : '#1d3254'}`,
                          cursor: 'default',
                          transition: 'all 0.25s ease',
                          transform: hoveredSkill === i ? 'translateY(-4px)' : 'none',
                          boxShadow: hoveredSkill === i
                            ? '0 16px 32px -12px rgba(2,12,27,0.8)'
                            : 'none',
                          // Highlight the GenAI card with a subtle glow
                          ...(skill.name === 'Generative AI & RAG' && {
                            background: `linear-gradient(135deg, #112240 80%, rgba(100,255,218,0.05) 100%)`,
                          }),
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                          <Box
                            sx={{
                              width: 36,
                              height: 36,
                              borderRadius: '8px',
                              backgroundColor: skill.name === 'Generative AI & RAG'
                                ? 'rgba(100,255,218,0.15)'
                                : 'rgba(100,255,218,0.1)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: accent,
                              flexShrink: 0,
                            }}
                          >
                            {skill.icon}
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography sx={{ color: white, fontWeight: 600, fontSize: '0.95rem' }}>
                              {skill.name}
                            </Typography>
                            {/* "New" badge for GenAI */}
                            {skill.name === 'Generative AI & RAG' && (
                              <Box
                                component="span"
                                sx={{
                                  px: 0.8,
                                  py: 0.1,
                                  borderRadius: '4px',
                                  backgroundColor: 'rgba(100,255,218,0.15)',
                                  border: '1px solid rgba(100,255,218,0.35)',
                                  color: accent,
                                  fontSize: '0.6rem',
                                  fontFamily: 'monospace',
                                  fontWeight: 700,
                                  letterSpacing: '0.05em',
                                  lineHeight: 1.8,
                                }}
                              >
                                NEW
                              </Box>
                            )}
                          </Box>
                        </Box>
                        <Typography
                          sx={{
                            color: slate,
                            fontSize: '0.78rem',
                            lineHeight: 1.6,
                            pl: '52px',
                            opacity: hoveredSkill === i ? 1 : 0.7,
                            transition: 'opacity 0.2s',
                          }}
                        >
                          {skill.desc}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>

            {/* ── tech stack ── */}
            <Grid item xs={12} md={5}>
              <Box
                component={motion.div}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Typography variant="h6" sx={{ color: white, mb: 3, fontWeight: 600 }}>
                  Tech Stack
                </Typography>

                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2 }}>
                  {techStack.map((tech, i) => (
                    <Box
                      key={i}
                      component={motion.div}
                      initial={{ opacity: 0, scale: 0.85 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.07, duration: 0.4 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -6, scale: 1.06 }}
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 1,
                        p: 2,
                        borderRadius: '8px',
                        backgroundColor: navyLight,
                        border: '1px solid #1d3254',
                        cursor: 'default',
                        transition: 'border-color 0.2s',
                        '&:hover': { borderColor: 'rgba(100,255,218,0.3)' },
                      }}
                    >
                      <Box
                        component="img"
                        src={tech.icon}
                        alt={tech.name}
                        sx={{ width: 32, height: 32 }}
                      />
                      <Typography sx={{ color: lightSlate, fontSize: '0.7rem', textAlign: 'center' }}>
                        {tech.name}
                      </Typography>
                    </Box>
                  ))}
                </Box>

                {/* stats strip */}
                <Box
                  sx={{
                    mt: 4,
                    p: 3,
                    borderRadius: '6px',
                    backgroundColor: navyLight,
                    border: '1px solid #1d3254',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: 2,
                    textAlign: 'center',
                  }}
                >
                  {[
                    { value: '10+', label: 'Projects' },
                    { value: '3+', label: 'Years Coding' },
                    { value: '5+', label: 'Tech Areas' },
                  ].map(({ value, label }) => (
                    <Box key={label}>
                      <Typography sx={{ color: accent, fontWeight: 700, fontSize: '1.5rem', fontFamily: 'monospace' }}>
                        {value}
                      </Typography>
                      <Typography sx={{ color: slate, fontSize: '0.75rem' }}>{label}</Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ══════════════ CONTACT CTA ══════════════ */}
      <Box id="contact" sx={{ py: 14, backgroundColor: navy, textAlign: 'center' }}>
        <Container maxWidth="sm">
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <Typography sx={{ color: accent, mb: 2, fontFamily: 'monospace', letterSpacing: '0.1em' }}>
              04. What's Next?
            </Typography>

            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                mb: 3,
                fontSize: isMobile ? '2.2rem' : '3.2rem',
                color: white,
                letterSpacing: '-0.02em',
              }}
            >
              Get In Touch
            </Typography>

            <Typography
              variant="body1"
              sx={{ mb: 5, color: slate, fontSize: isMobile ? '1rem' : '1.1rem', lineHeight: 1.8 }}
            >
              I'm currently open to new opportunities. Whether you have a question, a project
              idea, or just want to say hi — my inbox is always open.
            </Typography>

            <Button
              onClick={() => navigate('/contact')}
              component={motion.button}
              whileHover={{ y: -4, boxShadow: `0 12px 30px -8px rgba(100,255,218,0.4)` }}
              whileTap={{ scale: 0.96 }}
              sx={{
                px: 7, py: 1.75,
                fontWeight: 700,
                fontSize: '1rem',
                borderRadius: '4px',
                border: `1px solid ${accent}`,
                color: accent,
                '&:hover': { backgroundColor: 'rgba(100,255,218,0.08)' },
                transition: 'background 0.2s',
              }}
            >
              Say Hello
            </Button>

            <Box sx={{ mt: 7, display: 'flex', justifyContent: 'center', gap: 2 }}>
              {[
                { icon: <GitHubIcon />,   href: 'https://github.com/YashPratapRai',                          label: 'GitHub'   },
                { icon: <LinkedInIcon />, href: 'https://www.linkedin.com/in/yash-pratap-rai-00465a284/',    label: 'LinkedIn' },
                { icon: <EmailIcon />,    href: 'mailto:raiyashpratap@gmail.com',                            label: 'Email'    },
              ].map(({ icon, href, label }) => (
                <Box
                  key={label}
                  component="a"
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={label}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    border: '1px solid #233554',
                    color: lightSlate,
                    transition: 'all 0.25s',
                    '&:hover': {
                      color: accent,
                      borderColor: accent,
                      transform: 'translateY(-4px)',
                      boxShadow: `0 8px 20px -8px rgba(100,255,218,0.4)`,
                    },
                  }}
                >
                  {icon}
                </Box>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>

      <Chatbot />
      <ContactPopup />
    </Box>
  );
};

export default Home;