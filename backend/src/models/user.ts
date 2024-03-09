import mongoose, { Document, Schema } from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  profile: string;
  generateAuthToken(): Promise<string>;
}

const userSchema: Schema<IUser> = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    max: 50,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  profile: {
    type: String,
    default: '',
  },
});

userSchema.pre<IUser>('save', async function (next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

userSchema.methods.generateAuthToken = async function () {
  const user = this as IUser;
  const token = jwt.sign({ _id: user._id.toString() }, "harry");
  return token;
};

const User = mongoose.model<IUser>('User', userSchema);

export default User;
