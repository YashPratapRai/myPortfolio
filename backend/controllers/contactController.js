import Contact from '../models/contact.js';
import nodemailer from 'nodemailer';

export const submitContactForm = async (req, res) => {
  const { name, email, message, linkedin } = req.body;

  try {
    // Save to DB
    const newMessage = new Contact({ name, email, message, linkedin });
    await newMessage.save();

    // Email setup
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,        // your Gmail
        pass: process.env.EMAIL_PASS         // App-specific password
      }
    });

    const mailOptions = {
      from: email,
      to: 'raiyashpratap@gmail.com',
      subject: `📩 New Contact Message from ${name}`,
      text: `
You have received a new message from your portfolio contact form.

👤 Name: ${name}
📧 Email: ${email}
🔗 LinkedIn: ${linkedin || 'N/A'}

📝 Message:
${message}
      `
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ msg: 'Message sent successfully and emailed!' });

  } catch (error) {
    console.error('Error handling contact form:', error);
    res.status(500).json({ msg: 'Server error while sending message.' });
  }
};

