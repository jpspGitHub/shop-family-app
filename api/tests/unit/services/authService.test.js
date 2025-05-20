import sinon from 'sinon';
import jwt from 'jsonwebtoken';
import authService from '../../../services/authService.js';
import authAgent from '../../../serviceAgents/authAgent.js';
import userDAO from '../../../dataAccess/user.js';
import authDAO from '../../../dataAccess/auth.js';
import jest from 'jest-mock';
describe('authService', () => {
  

  afterEach(() => {
    sinon.restore();
  });

  describe('login', () => {
    it('debe crear un usuario si no existe y devolver token', async () => {
      const fakeGoogleUser = { email: 'test@example.com', name: 'Test User' };
      const fakeUser = { _id: 'abc123', email: fakeGoogleUser.email, name: fakeGoogleUser.name };

      sinon.stub(authAgent, 'verifyGoogleToken').resolves(fakeGoogleUser);
      sinon.stub(userDAO, 'findByEmail').resolves(null);
      sinon.stub(userDAO, 'createFromGoogle').resolves(fakeUser);
      sinon.stub(jwt, 'sign').returns('fake-jwt-token');

      const result = await authService.login('valid-google-token');

      expect(result.user).toEqual(fakeUser);
      expect(result.token).toBe('fake-jwt-token');
    });

    it('debe hacer login y devolver el usuario actualizado si ya existe', async () => {
      const fakeGoogleUser = { email: 'test@example.com', name: 'Test User' };
      const existingUser = { _id: 'abc123', email: fakeGoogleUser.email, name: 'Old Name' };
      const updatedUser = { _id: 'abc123', email: fakeGoogleUser.email, name: 'Test User' };

      sinon.stub(authAgent, 'verifyGoogleToken').resolves(fakeGoogleUser);
      sinon.stub(userDAO, 'findByEmail').resolves(existingUser);
      sinon.stub(authDAO, 'login').resolves();
      sinon.stub(userDAO, 'findById').resolves(updatedUser);
      sinon.stub(jwt, 'sign').returns('updated-jwt-token');

      const result = await authService.login('valid-google-token');

      expect(result.user).toEqual(updatedUser);
      expect(result.token).toBe('updated-jwt-token');
    });
  });

  describe('logoutUser', () => {
    it('debe llamar a logoutUser en el DAO y devolver el resultado', async () => {
      const mockResult = { success: true };
      sinon.stub(authDAO, 'logoutUser').resolves(mockResult);

      const result = await authService.logoutUser('user-id');
      expect(result).toEqual(mockResult);
    });
  });

  describe('addBlacklistToken', () => {
    it('debe agregar un token a la blacklist', async () => {
      const mockToken = 'blacklist-token';
      const mockResult = { token: mockToken };
      sinon.stub(authDAO, 'addBlacklistToken').resolves(mockResult);

      const result = await authService.addBlacklistToken(mockToken);
      expect(result).toEqual(mockResult);
    });
  });

  describe('isTokenBlacklisted', () => {
    it('debe devolver true si el token está en la blacklist', async () => {
      sinon.stub(authDAO, 'isTokenBlacklisted').resolves({ token: 'abc' });

      const result = await authService.isTokenBlacklisted('abc');
      expect(result).toBe(true);
    });

    it('debe devolver false si el token no está en la blacklist', async () => {
      sinon.stub(authDAO, 'isTokenBlacklisted').resolves(null);

      const result = await authService.isTokenBlacklisted('abc');
      expect(result).toBe(false);
    });
  });
});
