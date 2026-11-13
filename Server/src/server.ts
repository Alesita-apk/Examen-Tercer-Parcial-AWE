import express from 'express';
import type { Application } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import notaRoutes from './routes/nota.routes.ts';

class Server {
    private app: Application;
    private port: string;
    private apiPaths = {
        notas: '/api/notas'
    };

    constructor() {
        this.app = express();
        this.port = '8080';

        this.conectarDB();
        this.middlewares();
        this.routes();
    }

    async conectarDB() {
        try {
            await mongoose.connect('mongodb://127.0.0.1:27017/examenNotas');
            console.log('Base de datos conectada exitosamente');
        } catch (error) {
            console.error('Error conectando a la base de datos', error);
        }
    }

    middlewares() {
        this.app.use(cors()); 
        this.app.use(express.json()); 
    }

    routes() {
        this.app.use(this.apiPaths.notas, notaRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        });
    }
}

export default Server;