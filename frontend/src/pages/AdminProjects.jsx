import React, { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
  Paper,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Divider
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
    image: null,
  });

  const [projects, setProjects] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [success, setSuccess] = useState(false);
  const [preview, setPreview] = useState(null);

  const [profileImage, setProfileImage] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);
  const [profileSuccess, setProfileSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectsRes = await axios.get(`${BACKEND_URL}/api/projects`);
        setProjects(projectsRes.data);

        setProfilePreview(`${BACKEND_URL}/api/profile/image`);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };
    fetchData();
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
        githubLink: selected.githubLink,
        liveDemoLink: selected.liveDemoLink,
        image: null,
      });
      setPreview(selected.thumbnailUrl);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      const file = files[0];
      setForm({ ...form, image: file });
      if (file) setPreview(URL.createObjectURL(file));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('description', form.description);
      formData.append('githubLink', form.githubLink);
      formData.append('liveDemoLink', form.liveDemoLink);
      if (form.image) formData.append('thumbnail', form.image);
      form.techStack.split(',').forEach((item) =>
        formData.append('techStack[]', item.trim())
      );

      if (selectedId) {
        await axios.put(`${BACKEND_URL}/api/projects/${selectedId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        await axios.post(`${BACKEND_URL}/api/projects`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      setSuccess(true);
      setForm({
        title: '',
        description: '',
        techStack: '',
        githubLink: '',
        liveDemoLink: '',
        image: null,
      });
      setPreview(null);
      setSelectedId('');

      const res = await axios.get(`${BACKEND_URL}/api/projects`);
      setProjects(res.data);
    } catch (err) {
      alert('Failed to submit. Check console.');
      console.error(err);
    }
  };

  const handleProfileSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('picture', profileImage);

      await axios.post(`${BACKEND_URL}/api/profile/picture`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setProfilePreview(`${BACKEND_URL}/api/profile/image`);
      setProfileSuccess(true);
    } catch (err) {
      alert('Failed to upload profile image');
      console.error(err);
    }
  };

  const handleProfileChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
    if (file) setProfilePreview(URL.createObjectURL(file));
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Paper elevation={5} sx={{ p: 4, borderRadius: 4, background: 'linear-gradient(135deg, #1e3c72, #2a5298)', color: 'white' }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom align="center">
          {selectedId ? 'Edit Project' : 'Admin: Add Project'}
        </Typography>

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

        {['title', 'description', 'techStack', 'githubLink', 'liveDemoLink'].map((field, index) => (
          <TextField
            key={index}
            label={field === 'techStack' ? 'Tech Stack (comma-separated)' : field.charAt(0).toUpperCase() + field.slice(1)}
            name={field}
            value={form[field]}
            onChange={handleChange}
            multiline={field === 'description'}
            rows={field === 'description' ? 3 : 1}
            fullWidth
            variant="filled"
            sx={{ mb: 2 }}
            InputProps={{
              disableUnderline: true,
              sx: {
                backgroundColor: '#ffffff',
                borderRadius: 2,
                '&:hover': { backgroundColor: '#f1f1f1' },
                '&.Mui-focused': { backgroundColor: '#f1f1f1', boxShadow: 'none' },
              },
            }}
          />
        ))}

        <Button variant="outlined" component="label" sx={{ mb: 2, color: '#fff', borderColor: '#fff', '&:hover': { backgroundColor: '#ffffff33' } }}>
          Upload Project Image
          <input type="file" name="image" hidden accept="image/*" onChange={handleChange} />
        </Button>

        {preview && (
          <Box sx={{ mt: 2, mb: 2, display: 'flex', justifyContent: 'center' }}>
            <img src={preview} alt="Selected thumbnail" style={{ maxWidth: '100%', maxHeight: 200, borderRadius: 8, boxShadow: '0 4px 10px rgba(0,0,0,0.3)' }} />
          </Box>
        )}

        <Button variant="contained" fullWidth onClick={handleSubmit}
          sx={{
            mt: 2,
            background: '#00c9ff',
            backgroundImage: 'linear-gradient(45deg, #00c9ff, #92fe9d)',
            fontWeight: 'bold',
            color: '#000',
            '&:hover': { backgroundImage: 'linear-gradient(45deg, #00b4db, #38ef7d)' },
          }}>
          {selectedId ? 'Update Project' : 'Add Project'}
        </Button>

        <Divider sx={{ my: 4, bgcolor: 'white' }} />

        <Typography variant="h5" fontWeight="bold" align="center" gutterBottom>
          Edit Profile Image
        </Typography>

        <Button variant="outlined" component="label" sx={{ mb: 2, color: '#fff', borderColor: '#fff', '&:hover': { backgroundColor: '#ffffff33' } }}>
          Upload Profile Image
          <input type="file" hidden accept="image/*" onChange={handleProfileChange} />
        </Button>

        {profilePreview && (
          <Box sx={{ mt: 2, mb: 2, display: 'flex', justifyContent: 'center' }}>
            <img src={profilePreview} alt="Profile Preview" style={{ maxWidth: '100%', maxHeight: 200, borderRadius: '50%', border: '3px solid white' }} />
          </Box>
        )}

        <Button variant="contained" fullWidth onClick={handleProfileSubmit}
          sx={{
            background: '#92fe9d',
            color: '#000',
            fontWeight: 'bold',
            '&:hover': { background: '#38ef7d' },
          }}>
          Update Profile Image
        </Button>
      </Paper>

      <Snackbar open={success} autoHideDuration={3000} onClose={() => setSuccess(false)}>
        <Alert severity="success">{selectedId ? 'Project updated' : 'Project added'} successfully!</Alert>
      </Snackbar>

      <Snackbar open={profileSuccess} autoHideDuration={3000} onClose={() => setProfileSuccess(false)}>
        <Alert severity="success">Profile image updated successfully!</Alert>
      </Snackbar>
    </Container>
  );
};

export default AdminProjects;
