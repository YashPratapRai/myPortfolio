import express from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import CV from '../models/CV.js'; // ensure .js extension

const router = express.Router();

// __dirname fix for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure multer for CV upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, 'Yash_Pratap_Rai_CV.pdf');
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }
});

// Get CV info
router.get('/info', async (req, res) => {
  try {
    const cvPath = path.join(__dirname, '../uploads/Yash_Pratap_Rai_CV.pdf');

    if (fs.existsSync(cvPath)) {
      const stats = fs.statSync(cvPath);

      res.json({
        filename: 'Yash_Pratap_Rai_CV.pdf',
        size: stats.size,
        uploadDate: stats.mtime,
        url: `${process.env.BACKEND_URL}/uploads/Yash_Pratap_Rai_CV.pdf`
      });
    } else {
      res.status(404).json({ message: 'CV not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Upload CV
router.post('/upload', upload.single('cv'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    res.json({
      message: 'CV uploaded successfully',
      filename: req.file.filename
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete CV
router.delete('/', async (req, res) => {
  try {
    const cvPath = path.join(__dirname, '../uploads/Yash_Pratap_Rai_CV.pdf');

    if (fs.existsSync(cvPath)) {
      fs.unlinkSync(cvPath);
      res.json({ message: 'CV deleted successfully' });
    } else {
      res.status(404).json({ message: 'CV not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;