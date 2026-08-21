const request = require('supertest');
const app = require('./server');

describe('CI/CD Health Check API', () => {
    it('Should return status 200 and UP status message', async () => {
        const res = await request(app).get('/health');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('status', 'UP');
    });
});