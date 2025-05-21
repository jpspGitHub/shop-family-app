import sinon from 'sinon';
import mongoose from 'mongoose';
import mongoMemory from '../../support/mongoMemory.js';
import groupDAO from '../../../dataAccess/groupDAO.js';
import Group from '../../../models/Group.js';

describe('groupDAO', () => {
  
  
  afterEach(() => {
    sinon.restore();
  });

  describe('create', () => {
    it('debe crear un nuevo grupo con usuario admin', async () => {
      const saveStub = sinon.stub(Group.prototype, 'save').resolvesThis();

      const group = await groupDAO.create('Grupo Test', new mongoose.Types.ObjectId());

      expect(saveStub.calledOnce).toBe(true);
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

  describe('updateMemberRole', () => {
    let group;
  
    beforeAll(async () => {
      await mongoMemory.connectTestDB();
    });
  
    beforeEach(async () => {
      await Group.deleteMany({});
  
      group = await Group.create({
        name: 'Grupo Test',
        members: [
          { user: new mongoose.Types.ObjectId('000000000000000000000001'), role: 'admin' },
          { user: new mongoose.Types.ObjectId('000000000000000000000002'), role: 'member' },
        ]
      });
    });
  
    afterAll(async () => {
      await mongoMemory.disconnectTestDB();

    });
  
    it('actualiza correctamente el rol del miembro', async () => {
      const result = await groupDAO.updateMemberRole(
        group._id,
        '000000000000000000000002',
        'admin'
      );
  
      const updated = result.members.find(
        (m) => m.user.toString() === '000000000000000000000002'
      );
  
      expect(updated.role).toBe('admin');
    });
  
    it('retorna null si el grupo no existe', async () => {
      const fakeGroupId = new mongoose.Types.ObjectId();
      const result = await groupDAO.updateMemberRole(fakeGroupId, '000000000000000000000002', 'admin');
  
      expect(result).toBeNull();
    });
  
    it('retorna null si el usuario no es miembro del grupo', async () => {
      const result = await groupDAO.updateMemberRole(
        group._id,
        '000000000000000000000099',
        'admin'
      );
  
      expect(result).toBeNull();
    });
  });

  
});
