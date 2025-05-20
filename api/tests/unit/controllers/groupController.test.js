import sinon from 'sinon';
import groupController from '../../../controllers/groupController.js';
import groupService from '../../../services/groupService.js';
import userService from '../../../services/userService.js';

describe('groupController', () => {
  let req, res;
  
  
  beforeEach(() => {
    req = {
      user: { id: 'user123' },
      body: {},
      params: {}
    };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub()
    };
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('createGroup', () => {
    it('debe responder 400 si falta el nombre del grupo', async () => {
      await groupController.createGroup(req, res);
      sinon.assert.calledWith(res.status, 400);
      sinon.assert.calledWith(res.json, { message: 'El nombre del grupo es requerido.' });
    });

    it('debe responder 404 si el usuario no existe', async () => {
      req.body.name = 'Grupo Test';
      sinon.stub(userService, 'getUserById').resolves(null);

      await groupController.createGroup(req, res);

      sinon.assert.calledWith(res.status, 404);
      sinon.assert.calledWith(res.json, { message: 'Usuario no encontrado.' });
    });

    it('debe crear y devolver un grupo', async () => {
      req.body.name = 'Grupo Test';
      const groupMock = { id: 'g1', name: 'Grupo Test' };
      sinon.stub(userService, 'getUserById').resolves({ id: 'user123' });
      sinon.stub(groupService, 'createGroup').resolves(groupMock);

      await groupController.createGroup(req, res);

      sinon.assert.calledWith(res.status, 201);
      sinon.assert.calledWith(res.json, groupMock);
    });

    it('debe responder 500 si ocurre un error', async () => {
      req.body.name = 'Grupo Test';
      sinon.stub(userService, 'getUserById').throws();

      await groupController.createGroup(req, res);

      sinon.assert.calledWith(res.status, 500);
      sinon.assert.calledWith(res.json, { message: 'Internal server error' });
    });
  });

  describe('getGroupsByUser', () => {
    it('debe devolver grupos del usuario', async () => {
      const mockGroups = [{ id: 'g1' }, { id: 'g2' }];
      sinon.stub(groupService, 'getGroupsByUser').resolves(mockGroups);

      await groupController.getGroupsByUser(req, res);

      sinon.assert.calledWith(res.status, 200);
      sinon.assert.calledWith(res.json, mockGroups);
    });

    it('debe responder 500 si ocurre un error', async () => {
      sinon.stub(groupService, 'getGroupsByUser').rejects();

      await groupController.getGroupsByUser(req, res);

      sinon.assert.calledWith(res.status, 500);
      sinon.assert.calledWith(res.json, { message: 'Internal server error' });
    });
  });

  describe('updateGroup', () => {
    it('debe devolver el grupo actualizado si existe', async () => {
      req.params.id = 'g1';
      req.body.name = 'Nuevo nombre';
      const updatedGroup = { id: 'g1', name: 'Nuevo nombre' };
      sinon.stub(groupService, 'updateGroup').resolves(updatedGroup);

      await groupController.updateGroup(req, res);

      sinon.assert.calledWith(res.status, 200);
      sinon.assert.calledWith(res.json, updatedGroup);
    });

    it('debe responder 404 si el grupo no existe', async () => {
      req.params.id = 'g1';
      req.body.name = 'Nombre';
      sinon.stub(groupService, 'updateGroup').resolves(null);

      await groupController.updateGroup(req, res);

      sinon.assert.calledWith(res.status, 404);
      sinon.assert.calledWith(res.json, { message: 'Grupo no encontrado.' });
    });

    it('debe responder 500 si ocurre un error', async () => {
      req.params.id = 'g1';
      req.body.name = 'Nombre';
      sinon.stub(groupService, 'updateGroup').rejects();

      await groupController.updateGroup(req, res);

      sinon.assert.calledWith(res.status, 500);
      sinon.assert.calledWith(res.json, { message: 'Error al actualizar el grupo.' });
    });
  });

  describe('deleteGroup', () => {
    it('debe responder 200 si se elimina correctamente', async () => {
      req.params.id = 'g1';
      sinon.stub(groupService, 'deleteGroup').resolves({ id: 'g1' });

      await groupController.deleteGroup(req, res);

      sinon.assert.calledWith(res.status, 200);
      sinon.assert.calledWith(res.json, { message: 'Grupo eliminado correctamente.' });
    });

    it('debe responder 404 si el grupo no existe', async () => {
      req.params.id = 'g1';
      sinon.stub(groupService, 'deleteGroup').resolves(null);

      await groupController.deleteGroup(req, res);

      sinon.assert.calledWith(res.status, 404);
      sinon.assert.calledWith(res.json, { message: 'Grupo no encontrado.' });
    });

    it('debe responder 500 si ocurre un error', async () => {
      req.params.id = 'g1';
      sinon.stub(groupService, 'deleteGroup').rejects();

      await groupController.deleteGroup(req, res);

      sinon.assert.calledWith(res.status, 500);
      sinon.assert.calledWith(res.json, { message: 'Error al eliminar el grupo.' });
    });
  });
});
