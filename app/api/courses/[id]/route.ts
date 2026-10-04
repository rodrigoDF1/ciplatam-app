import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Course } from '@/models/Course';

// GET /api/courses/[id] - Obtener un curso por ID
export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await connectDB();
        const course = await Course.findById(id);

        if (!course) {
            return NextResponse.json(
                { error: 'Curso no encontrado' },
                { status: 404 }
            );
        }

        return NextResponse.json(course, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Error al buscar el curso' },
            { status: 500 }
        );
    }
}

// PUT /api/courses/[id] - Actualizar un curso
export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await connectDB();
        const body = await request.json();

        const updatedCourse = await Course.findByIdAndUpdate(
            id,
            body,
            { new: true, runValidators: true }
        );

        if (!updatedCourse) {
            return NextResponse.json(
                { error: 'Curso no encontrado para actualizar' },
                { status: 404 }
            );
        }

        return NextResponse.json(updatedCourse, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || 'Error al actualizar el curso' },
            { status: 400 }
        );
    }
}

// DELETE /api/courses/[id] - Eliminar un curso
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await connectDB();
        const deletedCourse = await Course.findByIdAndDelete(id);

        if (!deletedCourse) {
            return NextResponse.json(
                { error: 'Curso no encontrado para eliminar' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: 'Curso eliminado exitosamente' },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: 'Error al eliminar el curso' },
            { status: 500 }
        );
    }
}