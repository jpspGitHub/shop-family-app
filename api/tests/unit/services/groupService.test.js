import sinon from 'sinon';
import groupService from '../../../services/groupService.js';
import groupDAO from '../../../dataAccess/groupDAO.js';
import userDAO from '../../../dataAccess/userDAO.js';
import { afterAll, jest } from '@jest/globals'

describe('groupService', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('createGroup', () => {
    it('debe crear un grupo correctamente', async () => {
      const mockGroup = { id: 'g1', name: 'Grupo 1' };
      sinon.stub(groupDAO, 'create').resolves(mockGroup);

      const result = await groupService.createGroup('Grupo 1', 'user123');
      expect(result).toEqual(mockGroup);
    });
  });

  describe('getGroupsByUser', () => {
    it('debe devolver grupos por ID de usuario', async () => {
      const groups = [{ id: 'g1' }, { id: 'g2' }];
      sinon.stub(groupDAO, 'findByUserId').resolves(groups);

      const result = await groupService.getGroupsByUser('user123');
      expect(result).toEqual(groups);
    });
  });

  describe('updateGroup', () => {
    it('debe actualizar el nombre del grupo', async () => {
      const updatedGroup = { id: 'g1', name: 'Nuevo nombre' };
      sinon.stub(groupDAO, 'updateGroup').resolves(updatedGroup);

      const result = await groupService.updateGroup('g1', 'Nuevo nombre');
      expect(result).toEqual(updatedGroup);
    });
  });

  describe('deleteGroup', () => {
    it('debe eliminar el grupo correctamente', async () => {
      const deletedGroup = { id: 'g1', name: 'Grupo eliminado' };
      sinon.stub(groupDAO, 'deleteGroup').resolves(deletedGroup);

      const result = await groupService.deleteGroup('g1');
      expect(result).toEqual(deletedGroup);
    });
  });

  describe('addMember', () => {
    const groupId = 'group123';
    const requesterId = 'adminUserId';
    const userId = 'newUserId';

    const baseGroup = {
      _id: groupId,
      name: 'Grupo Test',
      members: [
        { user: requesterId, role: 'admin' },
        { user: 'memberUserId', role: 'member' },
      ]
    };

    afterEach(() => { 
      jest.clearAllMocks(); 
      jest.restoreAllMocks(); 
    });

    it('Agrega miembro exitosamente', async () => {
      jest.spyOn(userDAO, 'findById').mockResolvedValue({ _id: userId });
      jest.spyOn(groupDAO, 'findById').mockResolvedValue({ ...baseGroup });
      jest.spyOn(groupDAO, 'addMemberToGroup').mockResolvedValue({
        ...baseGroup,
        members: [...baseGroup.members, { user: userId, role: 'member' }]
      });

      const result = await groupService.addMember({ groupId, requesterId, userId, role: 'member' });

      expect(userDAO.findById).toHaveBeenCalledWith(userId);
      expect(groupDAO.findById).toHaveBeenCalledWith(groupId);
      expect(groupDAO.addMemberToGroup).toHaveBeenCalledWith(groupId, userId, 'member');
      expect(result.message).toBe('Miembro agregado exitosamente');
      expect(result.group.members).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ user: userId, role: 'member' })
        ])
      );
    });

    it('Falla si el grupo no existe', async () => {
      jest.spyOn(groupDAO, 'findById').mockResolvedValue(null);

      await expect(groupService.addMember({ groupId, requesterId, userId }))
        .rejects.toMatchObject({ code: 'NOT_FOUND', message: 'Grupo no encontrado' });
    });

    it('Falla si el requester no es admin', async () => {
      const groupNoAdmin = {
        ...baseGroup,
        members: [{ user: requesterId, role: 'member' }]
      };
      
      jest.spyOn(groupDAO, 'findById').mockResolvedValue(groupNoAdmin);

      await expect(groupService.addMember({ groupId, requesterId, userId }))
        .rejects.toMatchObject({ code: 'FORBIDDEN', message: 'No autorizado' });
    });

    it('Falla si el usuario ya es miembro', async () => {
      const groupWithUser = {
        ...baseGroup,
        members: [...baseGroup.members, { user: userId, role: 'member' }]
      };
      jest.spyOn(groupDAO, 'findById').mockResolvedValue(groupWithUser);

      await expect(groupService.addMember({ groupId, requesterId, userId }))
        .rejects.toMatchObject({ code: 'CONFLICT', message: 'El usuario ya es miembro' });
    });

    it('Falla si el usuario no existe', async () => {
      jest.spyOn(userDAO, 'findById').mockResolvedValue(null);
      jest.spyOn(groupDAO, 'findById').mockResolvedValue(baseGroup);
      
      await expect(groupService.addMember({ groupId, requesterId, userId }))
        .rejects.toMatchObject({ code: 'NOT_FOUND', message: 'Usuario no encontrado' });
    });

    it('Falla si el rol es inválido', async () => {
      await expect(groupService.addMember({ groupId, requesterId, userId, role: 'adminn' }))
        .rejects.toMatchObject({ code: 'BAD_REQUEST', message: 'Rol inválido' });
    });
  });
});



