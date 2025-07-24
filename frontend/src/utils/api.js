import axios from 'axios';

const API = axios.create({
  baseURL: '/api',
});

// Projects API
export const fetchProjects = () => API.get('/projects');
export const createProject = (newProject) => API.post('/projects', newProject);

// Contact API
export const sendContactMessage = (messageData) => API.post('/contact', messageData);

export default API;