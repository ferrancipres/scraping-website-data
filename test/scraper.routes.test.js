import server from '../src/server.js';
import request from 'supertest';

describe('GET /', () => {

    test('should respond with a 200 status code', async () => {
        const response = (await request(server).get('/'));
        expect(response.statusCode).toBe(200);
    });

    test('should respond with an array', async () => {
        const response = (await request(server).get('/'));
        expect(response.body).toBeInstanceOf(Object);  
    });

    test('should fail when response body is an object', async () => {
        const response = (await request(server).get('/'));
        expect(response.body).toBeInstanceOf(Array);
    });
});

describe('GET /:pageId', () => {

    test('should respond with a 200 status code', async () => {
        const response = (await request(server).get('/:number'));
        expect(response.statusCode).toBe(200);
    });

    test('should respond with an array', async () => {
        const response = (await request(server).get('/:pageId'));
        expect(response.body).toBeInstanceOf(Object);  
    });

    test('should fail when response body is an object', async () => {
        const response = (await request(server).get('/:number'));
        expect(response.body).toBeInstanceOf(Array);
    });
});