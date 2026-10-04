import { Schema, model, models, Document, Types } from 'mongoose';

export interface IEnrollment extends Document {
    student: Types.ObjectId;
    course: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const EnrollmentSchema = new Schema<IEnrollment>(
    {
        student: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        course: {
            type: Schema.Types.ObjectId,
            ref: 'Course',
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

// ÍNDICE ÚNICO COMPUESTO: Evita que un estudiante se inscriba más de una vez al mismo curso
EnrollmentSchema.index({ student: 1, course: 1 }, { unique: true });

export const Enrollment = models.Enrollment || model<IEnrollment>('Enrollment', EnrollmentSchema);