import express from 'express';
import scraperRoutes from './routes/scraper.routes.js';

const app = express();
app.use(express.json());

app.use('/', scraperRoutes);

export default app;