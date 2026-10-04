import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dns from 'node:dns';
import fs from 'node:fs';
import path from 'node:path';

dns.setServers(['8.8.8.8', '8.8.4.4']);
dotenv.config({ path: '.env.local' });

async function backup() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('📦 Conectado a MongoDB Atlas para realizar backup...');

        const db = mongoose.connection.db;
        const collections = await db.listCollections().toArray();
        const backupData = {};

        for (const col of collections) {
            const data = await db.collection(col.name).find({}).toArray();
            backupData[col.name] = data;
        }

        const backupDir = path.join(process.cwd(), 'backups');
        if (!fs.existsSync(backupDir)) {
            fs.mkdirSync(backupDir);
        }

        const filePath = path.join(backupDir, 'backup-latest.json');
        fs.writeFileSync(filePath, JSON.stringify(backupData, null, 2));

        console.log(`✅ Backup guardado exitosamente en: ${filePath}`);
        process.exit(0);
    } catch (error) {
        console.error('❌ Error al realizar el backup:', error);
        process.exit(1);
    }
}

backup();