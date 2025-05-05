const request = require('supertest');
const express = require('express');
const userRoutes = require('../routes/users');
const authMiddleware = require('../middleware/authMiddleware');

// Mock de userService
jest.mock('../services/user', () => ({
  findById: jest.fn(() => Promise.resolve({
    _id: 'mock-user-id',
    name: 'Test User',
    email: 'test@example.com'
  }))
}));

const app = express();
app.use(express.json());
app.use('/api/users', authMiddleware, userRoutes);

// Mock del middleware de auth
jest.mock('../middleware/authMiddleware', () => (req, res, next) => {
  req.user = { id: 'mock-user-id' };
  next();
});

describe('GET /api/users/me', () => {
  it('should return the user profile', async () => {
    const res = await request(app).get('/api/users/me');
    expect(res.statusCode).toBe(200);
    expect(res.body.email).toBe('test@example.com');
  });
});
