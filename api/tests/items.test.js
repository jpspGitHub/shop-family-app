const request = require('supertest');
const express = require('express');
const itemRoutes = require('../routes/items');
const authMiddleware = require('../middleware/authMiddleware');
const app = express();
const dotenv = require('dotenv');
app.use(express.json());
app.use('/api/items', authMiddleware, itemRoutes);

const env = process.env.NODE_ENV || 'development';
dotenv.config({ path: `.env.${env}` });
// Mock del servicio
jest.mock('../services/item', () => ({
  getItemsByGroup: jest.fn(() => Promise.resolve([
    { _id: '1', name: 'Milk', quantity: '1', isPurchased: false }
  ])),
  addItem: jest.fn((data) => Promise.resolve({ ...data, _id: '2' })),
  updateItem: jest.fn((id, data) => Promise.resolve({ _id: id, ...data })),
  deleteItem: jest.fn(() => Promise.resolve())
}));

// Mock del middleware
jest.mock('../middleware/authMiddleware', () => (req, res, next) => {
  req.user = { id: 'mock-user-id' };
  next();
});



describe('GET /api/items/:groupId', () => {
  it('should return items for a group', async () => {
    const res = await request(app).get('/api/items/mock-group-id');
    expect(res.statusCode).toBe(200);
    expect(res.body[0].name).toBe('Milk');
  });
});

describe('POST /api/items', () => {
  it('should create a new item', async () => {
    const res = await request(app).post('/api/items').send({
      name: 'Bread',
      quantity: '2',
      groupId: 'mock-group-id'
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Bread');
  });
});

describe('PUT /api/items/:itemId', () => {
  it('should update an item', async () => {
    const res = await request(app).put('/api/items/123').send({ quantity: '3' });
    expect(res.statusCode).toBe(200);
    expect(res.body.quantity).toBe('3');
  });
});

describe('DELETE /api/items/:itemId', () => {
  it('should delete an item', async () => {
    const res = await request(app).delete('/api/items/123');
    expect(res.statusCode).toBe(204);
  });
});
