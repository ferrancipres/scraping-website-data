import { Router } from "express";
import { getNews } from "../controllers/news.controller.js";

const newsRoutes = Router();
//Aquí debería de crear la ruta genérica
newsRoutes.get('/', getNews);
//Aqui debería de el valor variable númerico que me lleva al controlador número de paginación no??? 
newsRoutes.get('/1', getNews);

export default newsRoutes;

//scraper