import React, { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Button,
  Snackbar,
  Alert,
  Paper,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
  Dialog,
  DialogTitle,
  DialogActions,
} from '@mui/material';
import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const AdminProjects = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    techStack: '',
    githubLink: '',
    liveDemoLink: '',
    thumbnail: null,
  });

  const [projects, setProjects] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const getThumbnailUrl = (thumb) => {
    if (!thumb) return '/default.png';
    if (thumb.startsWith('http')) return thumb;
    return `${BACKEND_URL}/uploads/${thumb}`;
  };

  const fetchProjects = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/api/projects`);
      setProjects(data);
    } catch (err) {
      setError('Failed to load projects');
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSelectChange = (e) => {
    const id = e.target.value;
    setSelectedId(id);
    const selected = projects.find((proj) => proj._id === id);
    if (selected) {
      setForm({
        title: selected.title,
        description: selected.description,
        techStack: selected.techStack.join(', '),
        githubLink: selected.githubLink || '',
        liveDemoLink: selected.liveDemoLink || '',
        thumbnail: null,
      });
      setPreview(getThumbnailUrl(selected.thumbnail));
    } else {
      resetForm();
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'thumbnail') {
      const file = files[0];
      if (file && !file.type.startsWith('image/')) {
        setError('Only image files are allowed');
        return;
      }
      setForm({ ...form, thumbnail: file });
      setPreview(file ? URL.createObjectURL(file) : null);
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async () => {
    try {
      setError(null);

      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('description', form.description);
      formData.append('githubLink', form.githubLink);
      formData.append('liveDemoLink', form.liveDemoLink);

      const techArray = form.techStack.split(',').map(t => t.trim()).filter(Boolean);
      techArray.forEach(tech => formData.append('techStack', tech));

      if (form.thumbnail) {
        formData.append('thumbnail', form.thumbnail);
      }

      const config = { headers: { 'Content-Type': 'multipart/form-data' } };

      if (selectedId) {
        await axios.put(`${BACKEND_URL}/api/projects/${selectedId}`, formData, config);
        setSuccessMessage('Project updated successfully!');
      } else {
        await axios.post(`${BACKEND_URL}/api/projects`, formData, config);
        setSuccessMessage('Project added successfully!');
      }

      resetForm();
      fetchProjects();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit project');
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${BACKEND_URL}/api/projects/${selectedId}`);
      setDeleteDialogOpen(false);
      resetForm();
      fetchProjects();
      setSuccessMessage('Project deleted successfully!');
    } catch (err) {
      setError('Failed to delete project');
    }
  };

  const resetForm = () => {
    setForm({
      title: '',
      description: '',
      techStack: '',
      githubLink: '',
      liveDemoLink: '',
      thumbnail: null,
    });
    setPreview(null);
    setSelectedId('');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Paper elevation={5} sx={{ p: 4, borderRadius: 4, background: 'linear-gradient(135deg, #1e3c72, #2a5298)', color: 'white' }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom align="center">
          {selectedId ? 'Edit Project' : 'Add New Project'}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel id="project-select-label" sx={{ color: 'white' }}>Select Project to Edit</InputLabel>
          <Select
            labelId="project-select-label"
            value={selectedId}
            onChange={handleSelectChange}
            sx={{ backgroundColor: 'white', borderRadius: 2 }}
          >
            <MenuItem value="">-- New Project --</MenuItem>
            {projects.map((project) => (
              <MenuItem key={project._id} value={project._id}>{project.title}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {['title', 'description', 'techStack', 'githubLink', 'liveDemoLink'].map((field) => (
          <TextField
            key={field}
            label={field === 'techStack' ? 'Tech Stack (comma-separated)' : field.charAt(0).toUpperCase() + field.slice(1)}
            name={field}
            value={form[field]}
            onChange={handleChange}
            multiline={field === 'description'}
            rows={field === 'description' ? 3 : 1}
            fullWidth
            variant="filled"
            sx={{ mb: 2 }}
            required={['title', 'description', 'techStack'].includes(field)}
            InputProps={{
              disableUnderline: true,
              sx: {
                backgroundColor: '#ffffff',
                borderRadius: 2,
                '&:hover': { backgroundColor: '#f1f1f1' },
              },
            }}
          />
        ))}

        <Button
          variant="outlined"
          component="label"
          sx={{
            mb: 2,
            color: '#fff',
            borderColor: '#fff',
            '&:hover': { backgroundColor: '#ffffff33' }
          }}
        >
          Upload Thumbnail
          <input
            type="file"
            name="thumbnail"
            hidden
            accept="image/*"
            onChange={handleChange}
          />
        </Button>

        {preview && (
          <Box sx={{ mt: 2, mb: 2, display: 'flex', justifyContent: 'center' }}>
            <img
              src={preview}
              alt="Thumbnail preview"
              style={{
                maxWidth: '100%',
                maxHeight: 200,
                borderRadius: 8,
                boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
              }}
            />
          </Box>
        )}

        <Button
          variant="contained"
          fullWidth
          onClick={handleSubmit}
          disabled={!form.title || !form.description || !form.techStack}
          sx={{
            mt: 2,
            background: '#00c9ff',
            backgroundImage: 'linear-gradient(45deg, #00c9ff, #92fe9d)',
            fontWeight: 'bold',
            color: '#000',
            '&:hover': { backgroundImage: 'linear-gradient(45deg, #00b4db, #38ef7d)' },
          }}
        >
          {selectedId ? 'Update Project' : 'Add Project'}
        </Button>

        {selectedId && (
          <Button
            color="error"
            variant="outlined"
            fullWidth
            onClick={() => setDeleteDialogOpen(true)}
            sx={{ mt: 2 }}
          >
            Delete Project
          </Button>
        )}
      </Paper>

      <Snackbar
        open={!!successMessage}
        autoHideDuration={3000}
        onClose={() => setSuccessMessage('')}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success">{successMessage}</Alert>
      </Snackbar>

      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Are you sure you want to delete this project?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminProjects;
