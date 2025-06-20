const request = require('supertest');
const app = require('../app');

describe('Testando rotas de fornecedores', () => {
    it('GET /fornecedores → deve retornar status 200', async () => {
        const res = await request(app).get('/fornecedores');
        expect(res.statusCode).toEqual(200);
    });
});
