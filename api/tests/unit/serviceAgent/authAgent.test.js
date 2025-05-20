import sinon from 'sinon';
import admin from 'firebase-admin';
import authAgent from '../../../serviceAgents/authAgent.js';

describe('authAgent', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('verifyGoogleToken', () => {
    it('debe devolver datos del usuario si el token es válido', async () => {
      const decoded = {
        uid: 'google-uid',
        name: 'Pablo',
        email: 'pablo@example.com',
        picture: 'avatar-url'
      };

      sinon.stub(admin.auth(), 'verifyIdToken').resolves(decoded);

      const result = await authAgent.verifyGoogleToken('valid-token');

      expect(result).toEqual({
        googleId: decoded.uid,
        name: decoded.name,
        email: decoded.email,
        avatar: decoded.picture
      });
    });

    it('debe lanzar un error si el token es inválido', async () => {
      sinon.stub(admin.auth(), 'verifyIdToken').rejects(new Error('invalid'));

      await expect(authAgent.verifyGoogleToken('invalid-token'))
        .rejects
        .toThrow('Token inválido o expirado');
    });
  });
});
