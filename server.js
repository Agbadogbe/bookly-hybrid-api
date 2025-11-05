import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sequelize, connectPostgres } from './config/db.postgres.js';
import { connectMongo } from './config/db.mongo.js';
import User from './models/User.model.js'; 
import Book from './models/Book.model.js'; 
import userRoutes from './routes/userRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import hybridRoutes from './routes/hybridRoutes.js'; 

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); 

await connectPostgres();
await connectMongo();

try {
    await sequelize.sync({ alter: true }); 
    console.log("✅ Tables PostgreSQL synchronisées par Sequelize.");
} catch (error) {
    console.error("❌ Erreur de synchronisation des tables SQL:", error);
}
app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api', hybridRoutes); 
app.listen(PORT, () =>
  console.log(`🚀 Serveur lancé sur le port ${PORT}`)
);