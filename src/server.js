import express from 'express';
import scraperRoutes from './routes/scraper.routes.js';
import apicache from 'apicache';

const app = express();
const cache = apicache.middleware;

app.use(express.json());
app.use(cache('1 minutes'));
app.use('/', scraperRoutes);

export default app;