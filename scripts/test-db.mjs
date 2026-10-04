import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dns from 'node:dns';

// Forzar a Node.js a usar Google DNS para evitar bloqueos del ISP local
dns.setServers(['8.8.8.8', '8.8.4.4']);

dotenv.config({ path: '.env.local' });

const uri = process.env.MONGODB_URI;

if (!uri) {
    console.error('❌ Error: MONGODB_URI no está definida en .env.local');
    process.exit(1);
}

console.log('Conectando a MongoDB Atlas...');

mongoose.connect(uri)
    .then(() => {
        console.log('✅ ¡Conexión exitosa a la base de datos rodrigo_db!');
        process.exit(0);
    })
    .catch((err) => {
        console.error('❌ Error de conexión:', err.message);
        process.exit(1);
    });