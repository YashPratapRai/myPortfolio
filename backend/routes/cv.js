import express from 'express';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';
import CV from '../models/cv.js';

const router = express.Router();

/* ───────── Cloudinary Storage ───────── */
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: 'portfolio_cv',
    resource_type: 'auto', // ✅ best for PDF preview
  }),
});

const upload = multer({ storage });

/* ───────── GET CV INFO ───────── */
router.get('/info', async (req, res) => {
  try {
    const cv = await CV.findOne(); // ✅ only one CV needed
    if (!cv) return res.status(404).json({ message: "CV not found" });

    res.json(cv);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ───────── UPLOAD / REPLACE CV ───────── */
router.post('/upload', upload.single('cv'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const url = req.file.secure_url;

    // ✅ DELETE old CV (only keep one)
    await CV.deleteMany();

    const cv = new CV({
      filename: req.file.originalname,
      size: req.file.size,
      url,
    });

    await cv.save();

    res.json({
      message: "CV uploaded & replaced successfully",
      data: cv,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

/* ───────── DELETE CV ───────── */
router.delete('/', async (req, res) => {
  try {
    await CV.deleteMany();
    res.json({ message: "CV deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;