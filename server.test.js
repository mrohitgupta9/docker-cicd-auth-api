const request = require('supertest');
const app = require('./server'); // File root me hone ki wajah se './server' path perfect hai

// CI/CD Environment (GitHub Actions) ke liye Global Timeout (30 seconds)
jest.setTimeout(30000);

describe('CyberSafe Auth & Security API Endpoints', () => {
  let authToken = '';
  const testUser = {
    name: 'Test Security User',
    email: `testuser_${Date.now()}@cybersafe.test`,
    password: 'SecurePassword123!'
  };

  // 1. Health Check Test
  it('Should return status 200 and UP status message', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status', 'UP');
  });

  // 2. User Registration Test
  it('Should register a new user successfully', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send(testUser);

    expect(res.statusCode).toEqual(201);
  }, 30000);

  // 3. User Login Test
  it('Should login and return JWT token', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: testUser.email,
        password: testUser.password
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
    authToken = res.body.token;
  }, 30000);

  // 4. Protected CyberSafe Route (Without Token - 401 Unauthorized)
  it('Should reject URL scan request without token (401)', async () => {
    const res = await request(app)
      .post('/api/cyber/check-url')
      .send({ url: 'http://claim-gift-free-money.com' });

    expect(res.statusCode).toEqual(401);
  });

  // 5. Protected CyberSafe Route (With Token - 200 Success)
  it('Should scan URL successfully when valid JWT token is provided (200)', async () => {
    const res = await request(app)
      .post('/api/cyber/check-url')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ url: 'http://claim-gift-free-money.com' });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status', 'DANGER ⚠️');
  }, 30000);
});