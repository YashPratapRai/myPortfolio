import express from 'express';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';
import CV from '../models/cv.js';
import fetch from 'node-fetch'; // npm i node-fetch
 
const router = express.Router();
 
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: 'portfolio_cv',
    resource_type: 'raw',
    public_id: 'resume',
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
 
/* ── GET CV INFO (metadata only) ── */
router.get('/info', async (req, res) => {
  try {
    const cv = await CV.findOne();
    if (!cv) return res.status(404).json({ message: 'CV not found' });
    res.json(cv);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
 
/* ── VIEW CV — streams PDF through backend with correct headers ──
   Frontend simply calls: window.open(`${backendURL}/api/cv/view`, '_blank')
   No URL tricks, no Cloudinary transformations, guaranteed to open as PDF. */
router.get('/view', async (req, res) => {
  try {
    const cv = await CV.findOne();
    if (!cv) return res.status(404).json({ message: 'CV not found' });
 
    const cloudinaryRes = await fetch(cv.url);
    if (!cloudinaryRes.ok) throw new Error('Failed to fetch CV from Cloudinary');
 
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename="Yash_Pratap_Rai_CV.pdf"');
 
    cloudinaryRes.body.pipe(res);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});
 
/* ── UPLOAD / REPLACE CV ── */
router.post('/upload', upload.single('cv'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
 
    const url = req.file.path || req.file.secure_url;
    await CV.deleteMany();
 
    const cv = new CV({ filename: req.file.originalname, size: req.file.size, url });
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