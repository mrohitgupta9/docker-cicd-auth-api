const request = require('supertest');
const app = require('./server');

jest.setTimeout(30000);

describe('CyberSafe Auth & Advanced Security API Endpoints', () => {
  let authToken = '';
  const testUser = {
    name: 'Test Security User',
    email: `testuser_${Date.now()}@cybersafe.test`,
    password: 'SecurePassword123!'
  };

  it('1. GET /health - Should return status 200', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status', 'UP');
  });

  it('2. POST /api/auth/register - Register user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send(testUser);

    expect(res.statusCode).toEqual(201);
  }, 30000);

  it('3. POST /api/auth/login - Login user & get Token', async () => {
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

  it('4. POST /api/cyber/check-url - Scan URL with token', async () => {
    const res = await request(app)
      .post('/api/cyber/check-url')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ url: 'http://claim-gift-free-money.com' });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status', 'DANGER ⚠️');
  }, 30000);

  it('5. POST /api/cyber/report-threat - Report a Scammer Phone/UPI', async () => {
    const res = await request(app)
      .post('/api/cyber/report-threat')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        type: 'PHONE',
        value: '9876543210',
        description: 'Asking for OTP pretending to be electricity board officer',
        severity: 'HIGH'
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message');
  }, 30000);

  it('6. GET /api/cyber/check-spam - Search reported scammer', async () => {
    const res = await request(app)
      .get('/api/cyber/check-spam?query=9876543210')
      .set('Authorization', `Bearer ${authToken}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status', 'SPAM / SCAMMER DETECTED 🚨');
  }, 30000);
});