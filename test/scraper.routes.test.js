import server from '../src/server.js';
import request from 'supertest';

describe('GET /', () => {
    test('should respond with a 200 status code', async () => {
        const response = (await request(server).get('/'));
        expect(response.statusCode).toBe(200);
    });
});