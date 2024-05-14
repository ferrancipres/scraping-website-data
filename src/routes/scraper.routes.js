import { Router } from "express";
import { getNews, getNewsByPage } from "../controllers/new.controller.js";

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
 * /{pageId}:
 *  get:
 *      tags:    
 *          - News
 *      parameters:
 *          - in: path
 *            name: pageId
 *            schema:
 *              type: integer
 *            required: true
 *            description: The id of the page to retrieve
 *      responses:
 *          200:
 *              description: Returns the news
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: OK
 *                              data:  
 *                                  type: array
 */

scraperRoutes.get('/:pageId', getNewsByPage);

export default scraperRoutes;