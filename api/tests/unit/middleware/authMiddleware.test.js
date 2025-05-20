import sinon from 'sinon';
import jwt from 'jsonwebtoken';
import authMiddleware from '../../../middleware/authMiddleware.js';
import authService from '../../../services/authService.js';

describe('authMiddleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      header: sinon.stub().returns(undefined)
    };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub()
    };
    next = sinon.stub();
  });

  afterEach(() => {
    sinon.restore();
  });

  it('debe responder 401 si no se proporciona token', async () => {
    await authMiddleware(req, res, next);
    sinon.assert.calledWith(res.status, 401);
    sinon.assert.calledWith(res.json, { message: 'Acceso no autorizado. No se proporcionó un token.' });
    sinon.assert.notCalled(next);
  });

  it('debe responder 401 si el token está en la blacklist', async () => {
    req.header.returns('Bearer token-negro');
    sinon.stub(authService, 'isTokenBlacklisted').resolves(true);

    await authMiddleware(req, res, next);

    sinon.assert.calledWith(res.status, 401);
    sinon.assert.calledWith(res.json, { message: 'Token inválido o expirado.' });
    sinon.assert.notCalled(next);
  });

  it('debe responder 401 si el token es válido pero no contiene id', async () => {
    req.header.returns('Bearer token-sin-id');
    sinon.stub(authService, 'isTokenBlacklisted').resolves(false);
    sinon.stub(jwt, 'verify').returns({}); // sin id

    await authMiddleware(req, res, next);

    sinon.assert.calledWith(res.status, 401);
    sinon.assert.calledWith(res.json, { message: 'Token inválido: no se encontró un ID de usuario.' });
    sinon.assert.notCalled(next);
  });

  it('debe llamar a next() si el token es válido y contiene id', async () => {
    req.header.returns('Bearer token-valido');
    sinon.stub(authService, 'isTokenBlacklisted').resolves(false);
    sinon.stub(jwt, 'verify').returns({ id: 'user123' });

    await authMiddleware(req, res, next);

    sinon.assert.notCalled(res.status);
    sinon.assert.calledOnce(next);
    expect(req.user.id).toBe('user123');
  });
});
