import sinon from 'sinon';
import userController from '../../../controllers/userController.js';
import userService from '../../../services/userService.js';

describe('userController', () => {
  let req, res;

  beforeEach(() => {
    req = {
      user: { id: 'user123' },
      body: { name: 'Nuevo Nombre' }
    };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
      end: sinon.stub()
    };
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('getProfile', () => {
    it('debe responder 200 con el usuario si existe', async () => {
      const mockUser = { id: 'user123', name: 'Pablo' };
      sinon.stub(userService, 'getUserById').resolves(mockUser);

      await userController.getProfile(req, res);

      sinon.assert.calledWith(res.status, 200);
      sinon.assert.calledWith(res.json, mockUser);
    });

    it('debe responder 404 si el usuario no existe', async () => {
      sinon.stub(userService, 'getUserById').resolves(null);

      await userController.getProfile(req, res);

      sinon.assert.calledWith(res.status, 404);
      sinon.assert.calledWith(res.json, { message: 'User not found' });
    });

    it('debe responder 500 si ocurre un error', async () => {
      sinon.stub(userService, 'getUserById').rejects(new Error('DB error'));

      await userController.getProfile(req, res);

      sinon.assert.calledWith(res.status, 500);
      sinon.assert.calledWith(res.json, { message: 'Internal server error' });
    });
  });

  describe('updateProfile', () => {
    it('debe responder 200 con el usuario actualizado', async () => {
      const updatedUser = { id: 'user123', name: 'Nuevo Nombre' };
      sinon.stub(userService, 'updateUser').resolves(updatedUser);

      await userController.updateProfile(req, res);

      sinon.assert.calledWith(res.status, 200);
      sinon.assert.calledWith(res.json, updatedUser);
    });

    it('debe responder 404 si el usuario no se encuentra', async () => {
      sinon.stub(userService, 'updateUser').resolves(null);

      await userController.updateProfile(req, res);

      sinon.assert.calledWith(res.status, 404);
      sinon.assert.calledWith(res.json, { message: 'User not found' });
    });

    it('debe responder 500 si ocurre un error', async () => {
      sinon.stub(userService, 'updateUser').rejects(new Error('DB error'));

      await userController.updateProfile(req, res);

      sinon.assert.calledWith(res.status, 500);
      sinon.assert.calledWith(res.json, { message: 'Internal server error' });
    });
  });

  describe('deleteAccount', () => {
    it('debe responder 204 si se elimina correctamente', async () => {
      sinon.stub(userService, 'deleteUser').resolves();

      await userController.deleteAccount(req, res);

      sinon.assert.calledWith(res.status, 204);
      sinon.assert.calledOnce(res.end);
    });

    it('debe responder 500 si ocurre un error', async () => {
      sinon.stub(userService, 'deleteUser').rejects(new Error('DB error'));

      await userController.deleteAccount(req, res);

      sinon.assert.calledWith(res.status, 500);
      sinon.assert.calledWith(res.json, { message: 'Internal server error' });
    });
  });
});
