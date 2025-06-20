const request = require('supertest');
const app = require('../app');

describe('Testando rotas de clientes', () => {
    it('GET /clientes → deve retornar status 200', async () => {
        const res = await request(app).get('/clientes');
        expect(res.statusCode).toEqual(200);
    });
});
