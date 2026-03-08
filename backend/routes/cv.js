import express from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import CV from '../models/cv.js';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {

    const uploadDir = path.join(__dirname, '../uploads');

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    cb(null, 'Yash_Pratap_Rai_CV.pdf');
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }
});


// GET CV INFO FROM DB
router.get('/info', async (req, res) => {

  try {

    const cv = await CV.findOne().sort({ uploadDate: -1 });

    if (!cv) {
      return res.status(404).json({ message: "CV not found" });
    }

    res.json(cv);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }

});


// UPLOAD CV
router.post('/upload', upload.single('cv'), async (req, res) => {

  try {

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const url = `${process.env.BACKEND_URL}/uploads/${req.file.filename}`;

    const cv = new CV({
      filename: req.file.filename,
      size: req.file.size,
      url: url
    });

    await cv.save();

    res.json({
      message: "CV uploaded successfully",
      data: cv
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }

});


// DELETE CV
router.delete('/', async (req, res) => {

  try {

    const cv = await CV.findOne().sort({ uploadDate: -1 });

    if (!cv) {
      return res.status(404).json({ message: "CV not found" });
    }

    const filePath = path.join(__dirname, '../uploads', cv.filename);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await CV.deleteMany();

    res.json({ message: "CV deleted successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }

});

export default router;