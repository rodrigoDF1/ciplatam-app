import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dns from 'node:dns';

// Resolver bloqueo DNS local
dns.setServers(['8.8.8.8', '8.8.4.4']);
dotenv.config({ path: '.env.local' });

const courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    createdAt: { type: Date, default: Date.now }
});

const Course = mongoose.models.Course || mongoose.model('Course', courseSchema);

async function seed() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('🌱 Conectado a MongoDB Atlas para poblar datos...');

        // Limpiar datos previos
        await Course.deleteMany({});

        // Insertar cursos iniciales
        await Course.insertMany([
            { title: 'Next.js & React Fullstack', description: 'Curso completo de desarrollo web moderno', price: 99 },
            { title: 'MongoDB & Mongoose Master', description: 'Aprende bases de datos NoSQL desde cero', price: 79 }
        ]);

        console.log('✅ ¡Base de datos poblada con éxito!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error al ejecutar el seed:', error);
        process.exit(1);
    }
}

seed();