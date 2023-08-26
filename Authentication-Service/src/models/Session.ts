import mongoose, { Document, Schema } from 'mongoose';
import { UserType } from './User';

interface ISession extends Document {
    email: string;
    token: string;
    expiresAt: Date;
    //userType: UserType;
}

const SessionSchema = new Schema<ISession>({
    email: { type: String, required: true },
    token: { type: String, required: true },
    expiresAt: { type: Date },
    //userType: { type: String, enum: Object.values(UserType), required: true } // UserType enum'unun string türüne dönüştürülmesi gerekiyor cunku mongooseda boyle type yok
});

export default mongoose.model<ISession>('Session', SessionSchema);