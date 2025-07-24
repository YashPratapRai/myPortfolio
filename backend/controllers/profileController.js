// controllers/profileController.js
import User from '../models/User.js';

export const uploadProfilePicture = async (req, res) => {
  try {
    const filename = req.file.filename;

    let user = await User.findOne();
    if (!user) {
      user = new User({ profileImage: filename });
    } else {
      user.profileImage = filename;
    }

    await user.save();

    res.status(200).json({ message: 'Profile image uploaded successfully', image: filename });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading image', error: error.message });
  }
};

export const getProfilePicture = async (req, res) => {
  try {
    const user = await User.findOne();
    if (!user || !user.profileImage) {
      return res.status(404).json({ message: 'Profile image not found' });
    }

    res.status(200).json({ imageUrl: `/uploads/${user.profileImage}` });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching image', error: error.message });
  }
};
