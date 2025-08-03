import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  profileImage: String // stores the filename
});

const User = mongoose.model('User', userSchema);
export default User;
