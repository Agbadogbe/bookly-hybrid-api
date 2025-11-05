import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

/**
 * @function connectMongo
 * @description Connecte l'application à MongoDB en utilisant Mongoose.
 * La chaîne de connexion est lue depuis la variable d'environnement MONGO_URI.
 */
export const connectMongo = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        console.log(`✅ Connecté à MongoDB. Base: ${connection.connections[0].name}`);
        
    } catch (err) {
        console.error('❌ Erreur MongoDB : Vérifiez MONGO_URI, l\'accès réseau (IP) ou le mot de passe.', err.message);
        process.exit(1);
    }
};