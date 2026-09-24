import express from 'express';
import mongoose from 'mongoose';
import { config } from './config/env.config.js';
import productRouter from './routes/product.routes.js';
import userRouter from './routes/user.routes.js';
import mockRouter from './routes/mock.routes.js';

const app = express();

app.use(express.json());

// Registro de Routers
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/mocks', mockRouter);

mongoose.connect(config.mongoUri)
    .then(() => {
        console.log('✅ Conectado a MongoDB');
        app.listen(config.port, () => {
            console.log(`🚀 Servidor corriendo en puerto ${config.port}`);
        });
    })
    .catch((err) => {
        console.error('❌ Error al conectar a la base de datos:', err);
    });