const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const sinon = require('sinon');
const admin = require('firebase-admin');
const User = require('../models/user');
mongoose.set('debug', true);
let jwtToken;
describe.only('GET /users/me (Integración)', () => {

  beforeAll(async () => {
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

    sinon.stub(User, 'findOne').callsFake(async (query) => {
      if (query.email === 'pablo@example.com') {
        return {
          _id: new mongoose.Types.ObjectId(),
          name: 'Pablo Silva',
          email: 'pablo@example.com',
          googleId: '12345',
          avatar: 'https://example.com/avatar.png',
        };
      }
      return null; 
    });

    sinon.stub(User.prototype, 'save').callsFake(async function () {
      return this;
    });

    const response = await request(app)
      .post('/api/auth/google-login')
      .send({ token: 'valid-token' });

    jwtToken = response.body.token;
    return null;
  });

  afterAll(async() => {
      console.log("🟢 [afterAll] - Restoring sinon stubs...");
      sinon.restore();
    
      if (mongoose.connection.readyState !== 0) {
        console.log("🟢 [afterAll] - Closing mongoose connection...");
        await mongoose.connection.close();
      }
      console.log("🟢 [afterAll] - Mongoose connection closed.");
  });

  it('debe devolver el perfil del usuario autenticado', async () => {
    const response = await request(app)
      .get('/api/users/me')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);

    expect(response.body.name).toBe('Pablo Silva');
    expect(response.body.email).toBe('pablo@example.com');
    expect(response.body.avatar).toBe('https://example.com/avatar.png');
  });

  it('debe devolver error 401 si el token es inválido', async () => {
    const response = await request(app)
      .get('/api/users/me')
      .set('Authorization', `Bearer invalid-token`)
      .expect(401);

    expect(response.body.message).toBe('Acceso no autorizado.');
  });

  it('debe devolver error 404 si el usuario no existe en la base de datos', async () => {
    User.findOne.restore();
    sinon.stub(User, 'findOne').returns(null);

    const response = await request(app)
      .get('/api/users/me')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(404);

    expect(response.body.message).toBe('Usuario no encontrado.');
  });
});
