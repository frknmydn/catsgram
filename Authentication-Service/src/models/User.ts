import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

export enum UserType {
    Regular = 'regular',
    Moderator = 'moderator',
    Admin = 'admin'
}

interface IUser extends Document {
    email: string;
    password: string;
    userType: UserType;
}

const UserSchema = new Schema<IUser>({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    userType: { type: String, enum: Object.values(UserType), default: UserType.Regular }
});

//pass hash
UserSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

//pass match check
UserSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
};

export default mongoose.model<IUser>('User', UserSchema);