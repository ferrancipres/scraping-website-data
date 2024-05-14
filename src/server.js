// Crear servidor
import express from 'express';
import scraperRoutes from './routes/scraper.routes.js';
import responseTime from 'response-time';
import apicache from 'apicache';

const app = express();
const cache = apicache.middleware;

app.use(express.json());
app.use(responseTime());
app.use('/', scraperRoutes);
app.use(cache('2 minutes'));

export default app;