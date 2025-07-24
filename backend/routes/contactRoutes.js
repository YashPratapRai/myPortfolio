import express from 'express';
import { submitContactForm } from '../controllers/contactController.js';

const router = express.Router();

// Route: POST /api/contact
// Description: Send contact form data to your email
router.post('/send', submitContactForm);

export default router;
