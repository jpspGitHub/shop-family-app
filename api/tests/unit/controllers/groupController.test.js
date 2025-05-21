import sinon from 'sinon';
import groupController from '../../../controllers/groupController.js';
import groupService from '../../../services/groupService.js';
import userService from '../../../services/userService.js';
import { afterAll, jest } from '@jest/globals'

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

  describe('updateMemberRole', () => {
    const mockReq = {
      params: { groupId: 'group123', userId: 'user456' },
      body: { role: 'admin' },
      user: { _id: 'requester789' }
    };

    let res;

    beforeEach(() => {
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
    });

    afterEach(() => {
      jest.clearAllMocks();
      jest.restoreAllMocks();
    });

    it('responde 200 si el rol se actualiza correctamente', async () => {

      jest.spyOn(groupService, 'updateMemberRole').mockResolvedValue({
        message: 'Rol actualizado correctamente',
        group: { _id: 'group123', name: 'Test Group' }
      });

      await groupController.updateMemberRole(mockReq, res);

      expect(groupService.updateMemberRole).toHaveBeenCalledWith({
        groupId: 'group123',
        userId: 'user456',
        role: 'admin',
        requesterId: 'requester789'
      });

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Rol actualizado correctamente',
        group: { _id: 'group123', name: 'Test Group' }
      });
    });

    it('responde 400 si el rol es inválido', async () => {
      jest.spyOn(groupService, 'updateMemberRole').mockRejectedValue({
        code: 'BAD_REQUEST',
        message: 'Rol inválido'
      });

      await groupController.updateMemberRole(mockReq, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Rol inválido' });
    });

    it('responde 403 si el requester no tiene permisos', async () => {
      jest.spyOn(groupService, 'updateMemberRole').mockRejectedValue({
        code: 'FORBIDDEN',
        message: 'No autorizado'
      });

      await groupController.updateMemberRole(mockReq, res);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ message: 'No autorizado' });
    });

    it('responde 404 si grupo o usuario no existen', async () => {
      jest.spyOn(groupService, 'updateMemberRole').mockRejectedValue({
        code: 'NOT_FOUND',
        message: 'Grupo no encontrado'
      });

      await groupController.updateMemberRole(mockReq, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Grupo no encontrado' });
    });

    it('responde 500 si ocurre un error inesperado', async () => {
      jest.spyOn(groupService, 'updateMemberRole').mockRejectedValue(new Error('Falla total'));

      await groupController.updateMemberRole(mockReq, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Error interno del servidor' });
    });
  });

  describe('addMember', () => {
    const mockReq = {
      params: { groupId: 'group123' },
      body: { userId: 'user456', role: 'member' },
      user: { _id: 'requester789' }
    };
  
    
    beforeEach(() => {
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
    });
  
    afterEach(() => jest.clearAllMocks());
  
    it('responde 200 si se agrega el miembro correctamente', async () => {
      jest.spyOn(groupService, 'addMember').mockResolvedValue({
        message: 'Miembro agregado exitosamente',
        group: { _id: 'group123', name: 'Test Group' }
      });
  
      await groupController.addMember(mockReq, res);
  
      expect(groupService.addMember).toHaveBeenCalledWith({
        groupId: 'group123',
        requesterId: 'requester789',
        userId: 'user456',
        role: 'member'
      });
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Miembro agregado exitosamente',
        group: { _id: 'group123', name: 'Test Group' }
      });
    });
  
    it('responde 403 si no tiene permisos', async () => {
      jest.spyOn(groupService, 'addMember').mockRejectedValue({
        code: 'FORBIDDEN',
        message: 'No autorizado'
      });
  
      await groupController.addMember(mockReq, res);
  
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ message: 'No autorizado' });
    });
  
    it('responde 404 si el grupo o usuario no existe', async () => {
      jest.spyOn(groupService, 'addMember').mockRejectedValue({
        code: 'NOT_FOUND',
        message: 'Grupo o usuario no encontrado'
      });
  
      await groupController.addMember(mockReq, res);
  
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Grupo o usuario no encontrado' });
    });
  
    it('responde 409 si el usuario ya es miembro', async () => {
      jest.spyOn(groupService, 'addMember').mockRejectedValue({
        code: 'CONFLICT',
        message: 'El usuario ya es miembro del grupo'
      });
  
      await groupController.addMember(mockReq, res);
  
      expect(res.status).toHaveBeenCalledWith(409);
      expect(res.json).toHaveBeenCalledWith({ message: 'El usuario ya es miembro del grupo' });
    });
  
    it('responde 500 en error inesperado', async () => {
      jest.spyOn(groupService, 'addMember').mockRejectedValue(new Error('Falla inesperada'));
  
      await groupController.addMember(mockReq, res);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Error interno del servidor' });
    });
  });
  
});
