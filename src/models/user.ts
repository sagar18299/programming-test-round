import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  username: string;
  password: string;
  role: 'admin' | 'user';
  createdAt: Date;
}

const userSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
