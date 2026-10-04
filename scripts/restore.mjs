import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dns from 'node:dns';
import fs from 'node:fs';
import path from 'node:path';

// Forzar servidores DNS para evitar bloqueos locales
dns.setServers(['8.8.8.8', '8.8.4.4']);
dotenv.config({ path: '.env.local' });

async function restore() {
    try {
        const filePath = path.join(process.cwd(), 'backups', 'backup-latest.json');
        if (!fs.existsSync(filePath)) {
            console.error('❌ Error: No se encontró el archivo backups/backup-latest.json');
            process.exit(1);
        }

        const backupData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('🔄 Conectado a MongoDB Atlas para restaurar la base de datos...');

        const db = mongoose.connection.db;

        for (const collectionName of Object.keys(backupData)) {
            const collection = db.collection(collectionName);
            await collection.deleteMany({});
            if (backupData[collectionName].length > 0) {
                await collection.insertMany(backupData[collectionName]);
            }
        }

        console.log('✅ Base de datos restaurada con éxito a partir del backup.');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error al restaurar la base de datos:', error);
        process.exit(1);
    }
}

restore();