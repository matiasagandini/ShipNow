import dotenv from 'dotenv';

dotenv.config();

const requiredEnvVars = ['PORT', 'MONGODB_URI', 'NODE_ENV'];

requiredEnvVars.forEach((key) => {
    if (!process.env[key]) {
        throw new Error(`[CONFIG ERROR] La variable de entorno "${key}" no está definida en el archivo .env`);
    }
});

export const config = {
    port: process.env.PORT || 8080,
    mongoUri: process.env.MONGODB_URI,
    env: process.env.NODE_ENV
};