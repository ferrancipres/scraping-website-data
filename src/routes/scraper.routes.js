import { Router } from "express";
import { getNews, getNewsByNumber } from "../controllers/new.controller.js";

const scraperRoutes = Router();

//Aquí debería de crear la ruta genérica
scraperRoutes.get('/', getNews);
scraperRoutes.get('/:number', getNewsByNumber);

export default scraperRoutes;
