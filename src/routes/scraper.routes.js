import { Router } from "express";
import { getNews, getNewsByNumber } from "../controllers/new.controller.js";

const scraperRoutes = Router();

/**
 * @openapi
 * /:
 *  get:
 *      tags:    
 *          - News
 *      responses:
 *         200:
 *          description: Returns the news
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          status:
 *                              type: string
 *                              example: OK
 *                          data:  
 *                              type: array
 *                              items:
 *                                 type: object
 *                                 properties: 
 *                                    // properties of the items in the data array go here
 */

scraperRoutes.get('/', getNews);

/**
 * @openapi
 * /number:
 *  get:
 *      tags:    
 *          - News
 *      responses:
 *         200:
 *          description: Returns the news
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          status:
 *                              type: string
 *                              example: OK
 *                          data:  
 *                              type: array
 *                              items:
 *                                 type: object
 *                                 properties: 
 *                                    // properties of the items in the data array go here
 */
scraperRoutes.get('/:number', getNewsByNumber);

export default scraperRoutes;