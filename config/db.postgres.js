import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

export const sequelize = new Sequelize(process.env.POSTGRES_URI, {
    dialect: 'postgres',
    logging: false
});

export const connectPostgres = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Connecté à PostgreSQL');
    } catch (err) {
        console.error('❌ Erreur PostgreSQL :', err);
    }
};