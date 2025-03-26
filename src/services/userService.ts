import User  from './../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';

dotenv.config();

export const register = async (data: any) => {
  const existingUser = await User.findOne({ username: data.username });
  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);
  const user = new User({
    ...data,
    password: hashedPassword,
  });
  await user.save();
  return user;
};

export const login = async (username: string, password: string) => {
  const user = await User.findOne({ username });
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign({ userId: user._id, role: user.role }, "sagar_key", { expiresIn: '1h' });
  return { token };
};
