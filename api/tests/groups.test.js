const request = require('supertest');
const express = require('express');
const groupRoutes = require('../routes/groups');
const authMiddleware = require('../middleware/authMiddleware');

// Mock del servicio
jest.mock('../services/group', () => ({
  getGroupsByUser: jest.fn(() => Promise.resolve([
    { _id: '1', name: 'Family Group', members: ['mock-user-id'] }
  ])),
  createGroup: jest.fn(() => Promise.resolve({
    _id: '1', name: 'New Group', members: ['mock-user-id']
  }))
}));

jest.mock('../middleware/authMiddleware', () => (req, res, next) => {
  req.user = { id: 'mock-user-id' };
  next();
});

const app = express();
app.use(express.json());
app.use('/api/groups', authMiddleware, groupRoutes);

describe('GET /api/groups', () => {
  it('should return groups for the user', async () => {
    const res = await request(app).get('/api/groups');
    expect(res.statusCode).toBe(200);
    expect(res.body[0].name).toBe('Family Group');
  });
});

describe('POST /api/groups', () => {
  it('should create a new group', async () => {
    const res = await request(app).post('/api/groups').send({ name: 'New Group' });
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('New Group');
  });
});
