const request = require('supertest');
const app = require('../app');

const mongoose = require('mongoose');
const User = require('../models/user');
// require('dotenv').config({ path: `.env.test` });
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env.test') });


describe('POST /api/auth/google-login', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  it('should login with a valid Google token (mocked)', async () => {
    const res = await request(app)
      .post('/api/auth/google-login')
      .send({ token: 'valid-google-token' });
      
    expect(res.body).toHaveProperty('user');
    expect(res.body).toHaveProperty('token');
    expect(res.body.user.email).toBe('mockuser@example.com');
  });

  it('should return 400 if token is missing', async () => {
    const res = await request(app).post('/api/auth/google-login').send({});
    expect(res.statusCode).toBe(400);
  });

  it('should return 401 if token is invalid (mocked)', async () => {
    const res = await request(app)
      .post('/api/auth/google-login')
      .send({ token: 'invalid-token' });

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('Authentication failed');
  });
});
