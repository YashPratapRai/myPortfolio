// controllers/profileController.js
import User from '../models/User.js';
import path from 'path';
import fs from 'fs';

export const uploadProfilePicture = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: 'No file uploaded or file too large',
        details: req.file
      });
    }

    const filename = req.file.filename;

    // Save image filename to user profile (mock example: use real user ID in real app)
    await User.findOneAndUpdate({}, { profileImage: filename });

    res.status(200).json({
      success: true,
      message: 'Image uploaded successfully',
      filename
    });

  } catch (error) {
    console.error('Upload error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error during image upload',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export const getProfilePicture = async (req, res) => {
  try {
    const user = await User.findOne().select('profileImage');

    if (!user || !user.profileImage) {
      return res.status(404).json({
        success: false,
        message: 'Profile image not found'
      });
    }

    const imagePath = path.join(process.cwd(), 'uploads', user.profileImage);

    if (!fs.existsSync(imagePath)) {
      return res.status(404).json({
        success: false,
        message: 'Image file not found on disk'
      });
    }

    res.sendFile(imagePath);
  } catch (error) {
    console.error('Image fetch error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch profile image'
    });
  }
};
