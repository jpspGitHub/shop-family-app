import sinon from 'sinon';
import groupService from '../../../services/groupService.js';
import groupDAO from '../../../dataAccess/group.js';

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
});
