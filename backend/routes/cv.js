import express from 'express';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';
import CV from '../models/cv.js';
 
const router = express.Router();
 
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: 'portfolio_cv',
    resource_type: 'raw',   // correct for PDFs
    public_id: 'resume',    // fixed name → auto-replaces old file
  }),
});
 
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') cb(null, true);
    else cb(new Error('Only PDF files are allowed'), false);
  },
  limits: { fileSize: 10 * 1024 * 1024 },
});
 
/* ── GET CV INFO ── */
router.get('/info', async (req, res) => {
  try {
    const cv = await CV.findOne();
    if (!cv) return res.status(404).json({ message: 'CV not found' });
 
    // ✅ Return the raw URL exactly as stored — no transformations for raw type
    res.json(cv);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
 
/* ── UPLOAD / REPLACE CV ── */
router.post('/upload', upload.single('cv'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
 
    // multer-storage-cloudinary puts the URL in .path
    const url = req.file.path || req.file.secure_url;
 
    await CV.deleteMany();
 
    const cv = new CV({
      filename: req.file.originalname,
      size: req.file.size,
      url,
    });
 
    await cv.save();
    res.json({ message: 'CV uploaded successfully', data: cv });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});
 
/* ── DELETE CV ── */
router.delete('/', async (req, res) => {
  try {
    await CV.deleteMany();
    res.json({ message: 'CV deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
 
export default router;