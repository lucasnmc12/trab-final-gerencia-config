const request = require('supertest');
const app = require('../app');

describe('Testando rotas de obras', () => {
    it('GET /obras → deve retornar status 200', async () => {
        const res = await request(app).get('/obras');
        expect(res.statusCode).toEqual(200);
    });
});
