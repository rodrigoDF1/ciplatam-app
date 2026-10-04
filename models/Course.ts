import { Schema, model, models, Document, Types } from 'mongoose';

export interface ICourse extends Document {
    title: string;
    slug: string;
    description: string;
    price: number;
    published: boolean;
    instructor: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const CourseSchema = new Schema<ICourse>(
    {
        title: {
            type: String,
            required: [true, 'El título del curso es obligatorio'],
            trim: true,
        },
        slug: {
            type: String,
            required: [true, 'El slug es obligatorio'],
            unique: true,
            lowercase: true,
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'La descripción es obligatoria'],
        },
        price: {
            type: Number,
            required: [true, 'El precio es obligatorio'],
            min: [0, 'El precio no puede ser negativo'],
            default: 0,
        },
        published: {
            type: Boolean,
            default: false,
        },
        instructor: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Course = models.Course || model<ICourse>('Course', CourseSchema);