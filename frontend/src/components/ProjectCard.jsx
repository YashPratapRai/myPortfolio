import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CardActions,
  Box,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';

const ProjectCard = ({ title, description, image, githubLink, liveDemo }) => {
  return (
    <Card
      elevation={6}
      sx={{
        width: 320, // Fixed width
        height: 320, // Fixed height
        borderRadius: 3,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 12px 32px rgba(0,0,0,0.2)',
        },
      }}
    >
      {image && (
        <Box
          sx={{
            position: 'relative',
            overflow: 'hidden',
            '&:hover .overlay': {
              opacity: 0.3,
            },
          }}
        >
          <CardMedia
            component="img"
            height="160" // Reduced to fit within fixed height
            image={image}
            alt={title}
            sx={{
              objectFit: 'cover',
              transition: 'transform 0.4s ease',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          />
          <Box
            className="overlay"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              bgcolor: 'linear-gradient(180deg, transparent, rgba(0,0,0,0.6))',
              opacity: 0,
              transition: 'opacity 0.4s ease',
            }}
          />
        </Box>
      )}
      <CardContent
        sx={{
          flexGrow: 1,
          px: 3,
          pt: 2,
          pb: 0,
          overflow: 'hidden',
        }}
      >
        <Typography
          variant="h6"
          fontWeight="700"
          gutterBottom
          sx={{ letterSpacing: 0.5 }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            lineHeight: 1.5,
            opacity: 0.85,
            maxHeight: '72px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {description}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          px: 3,
          pb: 2,
          pt: 1,
          justifyContent: 'flex-start',
          gap: 1.5,
        }}
      >
        {githubLink && (
          <Button
            size="small"
            href={githubLink}
            target="_blank"
            startIcon={<GitHubIcon />}
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              color: 'grey.800',
              '&:hover': {
                color: 'primary.main',
                transform: 'scale(1.05)',
                backgroundColor: 'transparent',
              },
            }}
          >
            GitHub
          </Button>
        )}
        {liveDemo && (
          <Button
            size="small"
            href={liveDemo}
            target="_blank"
            startIcon={<LaunchIcon />}
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              color: 'grey.800',
              '&:hover': {
                color: 'primary.main',
                transform: 'scale(1.05)',
                backgroundColor: 'transparent',
              },
            }}
          >
            Live
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default ProjectCard;
