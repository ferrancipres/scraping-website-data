import server from '../src/server.js';
import request from 'supertest';

describe('GET /', () => {
    // should respond with a 200 status code
    test('should respond with a 200 status code', async () => {
        const response = (await request(server).get('/'));
        expect(response.statusCode).toBe(200);
    });

    // // should respond with a message -> REVISAR TEST CON LA INTEGRACION DE LA API & SCRAPER no recibe un mensaje. 
    // test('should respond with a message', async () => {
    //     const response = (await request(server).get('/'));
    //     expect(response.text).toBe('Get All News Ferran');
    // });

     // should respond with type json/ object/ array
    test('should respond with an array', async () => {
        const response = (await request(server).get('/'));
        expect(response.body).toBeInstanceOf(Object);  
    });

    // should respond with a json object containing the new task with an id
    // should respond with a json object containing the new task with title
    // should respond with a json object containing the new task with description
    // should respond with a json object containing the new task with status
    // should respond with a json object containing the new task with dueDate
    // should respond with a json object containing the new task with createdAt
});

describe('GET /:number', () => {
    // should respond with a 200 status code
    test('should respond with a 200 status code', async () => {
        const response = (await request(server).get('/:number'));
        expect(response.statusCode).toBe(200);
    });

    // // should respond with a message
    // test('should respond with a message', async () => {
    //     const response = (await request(server).get('/:number'));
    //     expect(response.text).toBe('Get News by Number Ferran');
    // });

     // should respond with type json/ object/ array
    test('should respond with an array', async () => {
        const response = (await request(server).get('/:number'));
        expect(response.body).toBeInstanceOf(Object);  
    });

    // should respond with a json object containing the new task with an id
    // should respond with a json object containing the new task with title
    // should respond with a json object containing the new task with description
    // should respond with a json object containing the new task with status
    // should respond with a json object containing the new task with dueDate
    // should respond with a json object containing the new task with createdAt
});