// Crear servidor
import express from 'express';

const app = express();
app.use(express.json());
//para que las peticiones sean en json añadir dependencias con el método use
//middleware use

export default app;