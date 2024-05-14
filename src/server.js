// Crear servidor
import express from 'express';
import scraperRoutes from './routes/scraper.routes.js';
import responseTime from 'response-time';

const app = express();

app.use(express.json());
app.use(responseTime());
app.use('/', scraperRoutes);

export default app;