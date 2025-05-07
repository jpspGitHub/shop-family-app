const request = require('supertest');
const app = require('../app');
const sinon = require('sinon');
const admin = require('firebase-admin');
const mongoose = require('mongoose');
const User = require('../models/user');
const ObjectId = mongoose.Types.ObjectId;
const expectedId = new ObjectId('64b29cfa9d2e4b8d5c1b1e91');
const dotenv = require('dotenv');

const env = process.env.NODE_ENV || 'development';
dotenv.config({ path: `.env.${env}` });

describe('POST /auth/google-login', () => {
  // Antes de cada test, mockeamos el verifyIdToken
  beforeAll(() => {
    sinon.stub(admin.auth(), 'verifyIdToken').callsFake((token) => {
      if (token === 'valid-token') {
        return Promise.resolve({
          uid: '12345',
          name: 'Pablo Silva',
          email: 'pablo@example.com',
          picture: 'https://example.com/avatar.png',
        });
      } else {
        return Promise.reject(new Error('Token inválido'));
      }
    });

    // Mockear la base de datos
    sinon.stub(User, 'findOne').callsFake(async (query) => {
      
      if (query.email === 'pablo@example.com') {
        return {
          _id: expectedId,
          name: 'Pablo Silva',
          email: 'pablo@example.com',
          googleId: '12345',
          avatar: 'https://example.com/avatar.png',
        };
      }
      return null;
    });

    sinon.stub(User, 'findById').callsFake(async (id) => {
      // if (id.equals(expectedId)) {
        if(true){
        const mockUser = {
          _id: expectedId,
          name: 'Pablo Silva',
          email: 'pablo@example.com',
          googleId: '12345',
          avatar: 'https://example.com/avatar.png',
          select: function () {
            return this; // Retornamos el mismo objeto para que encadene
          }
        };
        return mockUser;
      }
      return null;
    });
    
    sinon.stub(User, 'findByIdAndUpdate').callsFake(async (id, updates) => {
      // if (id.equals(expectedId)) {
      if(true){
        const updatedUser = {
          _id: expectedId,
          name: updates.name || 'Pablo Silva',
          email: updates.email || 'pablo@example.com',
          googleId: '12345',
          avatar: updates.avatar || 'https://example.com/avatar.png',
          select: function () {
            return this;
          }
        };
        return updatedUser;
      }
      return null;
    });
    
  });

  // Limpiar mocks después de cada test
  afterAll(() => {
    sinon.restore();
  });

  it('debe autenticar correctamente con un token válido', async () => {
    const response = await request(app)
      .post('/api/auth/google-login')
      .send({ token: 'valid-token' })
      .expect(200);

    expect(response.body.user.email).toBe('pablo@example.com');
    expect(response.body.user.name).toBe('Pablo Silva');
    expect(response.body.message).toBe('Autenticación exitosa');
    expect(response.body.token).toBeDefined();
  });

  it('debe rechazar un token inválido', async () => {
    const response = await request(app)
      .post('/api/auth/google-login')
      .send({ token: 'invalid-token' })
      .expect(401);

    expect(response.body.message).toBe('Authentication failed');
  });
});
