import express from 'express';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';
import CV from '../models/cv.js';

const router = express.Router();

// ✅ Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'portfolio_cv',
    resource_type: 'raw', // IMPORTANT for PDF
    public_id: 'Yash_Pratap_Rai_CV',
  },
});

const upload = multer({ storage });


// GET CV INFO
router.get('/info', async (req, res) => {
  try {
    const cv = await CV.findOne().sort({ uploadDate: -1 });
    if (!cv) return res.status(404).json({ message: "CV not found" });
    res.json(cv);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// UPLOAD CV (Cloudinary)
router.post('/upload', upload.single('cv'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // 🔥 Cloudinary URL
    const url = req.file.path;

    const cv = new CV({
      filename: req.file.originalname,
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
    await CV.deleteMany();
    res.json({ message: "CV deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;