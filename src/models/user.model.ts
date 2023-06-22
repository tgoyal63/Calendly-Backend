import { Document, Schema, model } from 'mongoose';

export interface IUser extends Document {
  name: string;
  username: string;
  email: string;
  googleId: string;
  accessToken: string;
  refreshToken: string;
  workingHours: {
    start: number;
    end: number;
  };
  duration: number;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  googleId: { type: String, required: true },
  accessToken: { type: String, required: true },
  refreshToken: { type: String },
  workingHours: {
    start: { type: Number, required: true },
    end: { type: Number, required: true },
  },
  duration: { type: Number, required: true },
});

const User = model<IUser>('User', UserSchema);

export default User;
