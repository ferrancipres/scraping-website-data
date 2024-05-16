import server from '../src/server.js';
import request from 'supertest';

describe('GET /', () => {
    test('should respond with a 200 status code', async () => {
        const response = (await request(server).get('/'));
        expect(response.statusCode).toBe(200);
    });

    test('should respond with a message', async () => {
        const response = (await request(server).get('/'));
        expect(response.text).toBe('Get All News Ferran');
    });

    test('should respond with an array', async () => {
        const response = (await request(server).get('/'));
        expect(response.body).toBeInstanceOf(Object);  
    });
});

describe('GET /:number', () => {
    test('should respond with a 200 status code', async () => {
        const response = (await request(server).get('/:number'));
        expect(response.statusCode).toBe(200);
    });

    test('should respond with a message', async () => {
        const response = (await request(server).get('/:number'));
        expect(response.text).toBe('Get News by Number Ferran');
    });

    test('should respond with an array', async () => {
        const response = (await request(server).get('/:number'));
        expect(response.body).toBeInstanceOf(Object);  
    });
});