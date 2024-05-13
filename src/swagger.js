
// Importing the necessary packages
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

//Metadata info about our API
const options = {
    definition: {
        openapi: '3.0.0',
        info: { 
            title: 'Scraper Web API', 
            version: '1.0.0', 
            description: 'A simple API to scrape data from a website and return it in JSON format', 
        },
    },
    apis: ['./src/routes/scraper.routes.js']
};

// Documentation en JSON format
const swaggerSpec = swaggerJSDoc(options);

// Function to set up our docs
const swaggerDocs = (app, port) => {
    app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.get('/api/docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
    
    console.log(`Swagger docs running on http://localhost:${port}/api/docs`);
}

export default swaggerDocs;