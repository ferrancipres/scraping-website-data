import express from 'express';
import scraperRoutes from './routes/scraper.routes.js';
import apicache from 'apicache';
import responseTime from 'response-time';

const app = express();
const cache = apicache.middleware;

app.use(express.json());
app.use(responseTime());
app.use(cache('1 minutes'));
app.use('/', scraperRoutes);

export default app;