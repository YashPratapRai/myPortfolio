// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  profileImage: {
    type: String,
    default: '', // Stores the image path like '/uploads/profile.jpg'
  },
});

const User = mongoose.model('User', userSchema);
export default User;
