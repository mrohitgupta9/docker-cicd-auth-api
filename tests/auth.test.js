const request = require('supertest');
const app = require('../server');

describe('CyberSafe Auth & Security API Endpoints', () => {
  let authToken = '';
  const testUser = {
    name: 'Test Security User',
    email: `testuser_${Date.now()}@cybersafe.test`,
    password: 'SecurePassword123!'
  };

  // Health Endpoint Test
  it('GET /health - Should return status 200 and UP message', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status', 'UP');
  });

  // User Registration Test
  it('POST /api/auth/register - Should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send(testUser);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message');
  });

  // User Login Test
  it('POST /api/auth/login - Should login and return JWT Token', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: testUser.email,
        password: testUser.password
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
    authToken = res.body.token; // CyberSafe testing ke liye token save kar rahe hain
  });

  // Protected CyberSafe Route Test (Without Token - Should Fail)
  it('POST /api/cyber/check-url - Should deny access without JWT token', async () => {
    const res = await request(app)
      .post('/api/cyber/check-url')
      .send({ url: 'http://claim-gift-free-money.com' });

    expect(res.statusCode).toEqual(401);
  });

  // Protected CyberSafe Route Test (With Valid Token - Should Pass)
  it('POST /api/cyber/check-url - Should scan URL when JWT token is provided', async () => {
    const res = await request(app)
      .post('/api/cyber/check-url')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ url: 'http://claim-gift-free-money.com' });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status', 'DANGER ⚠️');
  });
});