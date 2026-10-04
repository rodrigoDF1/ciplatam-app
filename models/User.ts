import { Schema, model, models, Document } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    password?: string;
    role: 'student' | 'instructor' | 'admin';
    image?: string;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: [true, 'El nombre es obligatorio'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'El correo electrónico es obligatorio'],
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: false, // Opcional si se usa autenticación OAuth / Google
        },
        role: {
            type: String,
            enum: ['student', 'instructor', 'admin'],
            default: 'student',
        },
        image: {
            type: String,
            default: '',
        },
    },
    {
        timestamps: true, // Agrega createdAt y updatedAt automáticamente
    }
);

export const User = models.User || model<IUser>('User', UserSchema);