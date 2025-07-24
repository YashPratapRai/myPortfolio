// routes/profileRoutes.js
import express from 'express';
import upload from '../middleware/upload.js';
import { uploadProfilePicture, getProfilePicture } from '../controllers/profileController.js';

const router = express.Router();

// Route to upload profile picture
router.post('/picture', upload.single('picture'), uploadProfilePicture);

// Route to get the profile picture URL
router.get('/image', getProfilePicture);

export default router;
