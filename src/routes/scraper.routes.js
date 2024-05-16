import { Router } from "express";
import { getNews, getNewsByNumber } from "../controllers/new.controller.js";

const scraperRoutes = Router();

scraperRoutes.get('/', getNews);
scraperRoutes.get('/:number', getNewsByNumber);

export default scraperRoutes;
