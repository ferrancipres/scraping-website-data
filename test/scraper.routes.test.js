import server from '../src/server.js';
import request from 'supertest';

async function testGet(route, expectedStatusCode, expectedBodyType) {
  const response = await request(server).get(route);
  expect(response.statusCode).toBe(expectedStatusCode);
  expect(response.body).toBeInstanceOf(expectedBodyType);
}

describe('GET /', () => {
  test('should respond with a 200 status code and an array', async () => {
    await testGet('/', 200, Array);
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
  test('should respond with a 200 status code and an array when page exists', async () => {
    await testGet('/1', 200, Array);
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