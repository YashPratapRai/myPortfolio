import Contact from '../models/contact.js';
import { Resend } from 'resend';

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

export const submitContactForm = async (req, res) => {
  const { name, email, message, linkedin, subject } = req.body;

  try {
    // ✅ Save message to MongoDB
    const newMessage = new Contact({
      name,
      email,
      message,
      linkedin,
      subject
    });

    await newMessage.save();

    // ✅ Send email using Resend (NO SMTP)
    await resend.emails.send({
      from: 'onboarding@resend.dev',   // default sender (works instantly)
      to: 'raiyashpratap@gmail.com',   // your email
      subject: `📩 ${subject || 'New Message'} - from ${name}`,

      html: `
        <h2>📩 New Contact Message</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>LinkedIn:</b> ${linkedin || 'N/A'}</p>
        <p><b>Message:</b></p>
        <p>${message}</p>
      `,
    });

    // ✅ Success response
    res.status(201).json({ message: 'Message sent successfully!' });

  } catch (error) {
    console.error('Resend Error:', error);
    res.status(500).json({ message: 'Failed to send message' });
  }
};