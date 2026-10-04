import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Course } from '@/models/Course';

// GET /api/courses - Listar todos los cursos
export async function GET() {
    try {
        await connectDB();
        const courses = await Course.find({}).sort({ createdAt: -1 });

        return NextResponse.json(courses, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Error al obtener la lista de cursos' },
            { status: 500 }
        );
    }
}

// POST /api/courses - Crear un nuevo curso
export async function POST(request: Request) {
    try {
        await connectDB();
        const body = await request.json();

        const newCourse = await Course.create(body);

        return NextResponse.json(newCourse, { status: 201 });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || 'Error al crear el curso' },
            { status: 400 }
        );
    }
}