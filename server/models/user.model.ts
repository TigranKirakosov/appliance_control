import mongoose, { Schema, Document } from 'mongoose';

const UserSchema = new Schema({
    nickName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

export interface IUser extends Document {
    nickName: string;
    email: string;
    password: string;
};

export default mongoose.model<IUser>('User', UserSchema);
