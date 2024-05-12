// Crear servidor
import express from 'express';
import newsRoutes from './routes/news.routes.js';

const app = express();
app.use(express.json());
//para que las peticiones sean en json añadir dependencias con el método use
//middleware use

//ejemplo de endpoint
app.use('/', newsRoutes);

export default app;