import sinon from 'sinon';
import authController from '../../../controllers/authController.js';
import authService from '../../../services/authService.js';

describe('authController', () => {
  let req, res;
  
  
  beforeEach(() => {
    req = {
      body: {},
      header: sinon.stub(),
      user: { id: 'user123' }
    };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub()
    };
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('login', () => {
    it('debe responder 400 si no se proporciona token', async () => {
      await authController.login(req, res);

      sinon.assert.calledWith(res.status, 400);
      sinon.assert.calledWith(res.json, { message: 'Missing Google token' });
    });

    it('debe autenticar correctamente y responder con usuario y token', async () => {
      req.body.token = 'valid-token';
      const mockUser = { id: '123', email: 'test@example.com' };
      const mockToken = 'jwt-token';

      sinon.stub(authService, 'login').resolves({ user: mockUser, token: mockToken });

      await authController.login(req, res);

      sinon.assert.calledWith(res.status, 200);
      sinon.assert.calledWith(res.json, {
        user: mockUser,
        token: mockToken,
        message: 'Autenticación exitosa'
      });
    });

    it('debe responder 401 si authService lanza error', async () => {
      req.body.token = 'invalid-token';
      sinon.stub(authService, 'login').rejects(new Error('Invalid'));

      await authController.login(req, res);

      sinon.assert.calledWith(res.status, 401);
      sinon.assert.calledWith(res.json, { message: 'Authentication failed' });
    });
  });

  describe('logoutUser', () => {
    it('debe registrar correctamente el logout', async () => {
      req.header.returns('valid-jwt-token');
      sinon.stub(authService, 'logoutUser').resolves();
      sinon.stub(authService, 'addBlacklistToken').resolves();

      await authController.logoutUser(req, res);

      sinon.assert.calledWith(res.status, 200);
      sinon.assert.calledWith(res.json, { message: 'Logout registrado correctamente.' });
    });

    it('debe manejar errores y responder 500', async () => {
      req.header.returns('token');
      sinon.stub(authService, 'logoutUser').throws(new Error('DB error'));

      await authController.logoutUser(req, res);

      sinon.assert.calledWith(res.status, 500);
      sinon.assert.calledWith(res.json, { message: 'Error al registrar logout.' });
    });
  });
});
