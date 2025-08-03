// routes/profileRoutes.js
import express from 'express';
import upload from '../middleware/upload.js';
import { uploadProfilePicture, getProfilePicture } from '../controllers/profileController.js';

const router = express.Router();

router.post(
  '/picture',
  (req, res, next) => {
    upload.single('profileImage')(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ success: false, message: 'Multer error', details: err.message });
      } else if (err) {
        return res.status(400).json({ success: false, message: 'Unknown upload error', details: err.message });
      }
      next();
    });
  },
  uploadProfilePicture
);


router.get(
  '/image',
  (req, res, next) => {
    res.set('Cache-Control', 'public, max-age=86400');
    next();
  },
  getProfilePicture
);

export default router;
