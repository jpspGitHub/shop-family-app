import sinon from 'sinon';
import authDAO from '../../../dataAccess/authDAO.js';
import User from '../../../models/User.js';
import TokenBlacklist from '../../../models/tokenBlacklist.js';

describe('authDAO', () => {
  
  
  afterEach(() => {
    sinon.restore();
  });

  describe('login', () => {
    it('debe actualizar lastLogin del usuario', async () => {
      const userMock = { _id: 'u1', lastLogin: new Date() };
      sinon.stub(User, 'findByIdAndUpdate').resolves(userMock);

      const result = await authDAO.login('u1');
      expect(result).toEqual(userMock);
    });
  });

  describe('logoutUser', () => {
    it('debe actualizar lastLogout del usuario', async () => {
      const userMock = { _id: 'u1', lastLogout: new Date() };
      sinon.stub(User, 'findByIdAndUpdate').resolves(userMock);

      const result = await authDAO.logoutUser('u1');
      expect(result).toEqual(userMock);
    });
  });

  describe('addBlacklistToken', () => {
    it('debe agregar un token a la blacklist', async () => {
      const token = 'fake-token';
      const blacklistDoc = { token };
      sinon.stub(TokenBlacklist, 'create').resolves(blacklistDoc);

      const result = await authDAO.addBlacklistToken(token);
      expect(result).toEqual(blacklistDoc);
    });
  });

  describe('isTokenBlacklisted', () => {
    it('debe devolver true si el token está en la blacklist', async () => {
      sinon.stub(TokenBlacklist, 'findOne').resolves({ token: 'abc' });

      const result = await authDAO.isTokenBlacklisted('abc');
      expect(result).toBe(true);
    });

    it('debe devolver false si el token no está en la blacklist', async () => {
      sinon.stub(TokenBlacklist, 'findOne').resolves(null);

      const result = await authDAO.isTokenBlacklisted('abc');
      expect(result).toBe(false);
    });
  });
});
