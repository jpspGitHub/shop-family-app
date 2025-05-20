import sinon from 'sinon';
import mongoose from 'mongoose';
import groupDAO from '../../../dataAccess/group.js';
import Group from '../../../models/Group.js';

describe('groupDAO', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('create', () => {
    it('debe crear un nuevo grupo con usuario admin', async () => {
      const saveStub = sinon.stub(Group.prototype, 'save').resolvesThis();

      const group = await groupDAO.create('Grupo Test', new mongoose.Types.ObjectId());

      expect(saveStub.calledTwice).toBe(true);
      expect(group).toBeDefined();
    });
  });

  describe('findByUserId', () => {
    it('debe devolver los grupos de un usuario', async () => {
      const mockGroups = [{ id: 'g1' }, { id: 'g2' }];
      sinon.stub(Group, 'find').resolves(mockGroups);

      const result = await groupDAO.findByUserId('user123');
      expect(result).toEqual(mockGroups);
    });
  });

  describe('updateGroup', () => {
    it('debe actualizar un grupo correctamente', async () => {
      const updated = { id: 'g1', name: 'Nuevo nombre' };
      sinon.stub(Group, 'findByIdAndUpdate').resolves(updated);

      const result = await groupDAO.updateGroup('g1', 'Nuevo nombre');
      expect(result).toEqual(updated);
    });
  });

  describe('deleteGroup', () => {
    it('debe eliminar un grupo por ID', async () => {
      const deleted = { id: 'g1', name: 'Eliminado' };
      sinon.stub(Group, 'findByIdAndDelete').resolves(deleted);

      const result = await groupDAO.deleteGroup('g1');
      expect(result).toEqual(deleted);
    });
  });
});
