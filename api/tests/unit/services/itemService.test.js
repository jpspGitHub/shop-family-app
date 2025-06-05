import sinon from 'sinon';
import itemDAO from '../../../dataAccess/itemDAO.js';
import groupDAO from '../../../dataAccess/groupDAO.js';
import itemService from '../../../services/itemService.js';
import mongoose from 'mongoose';

describe('itemService', () => {


  afterEach(() => {
    sinon.restore();
  });

  describe('getItemsByGroup', () => {
    it('debe devolver los ítems por ID de grupo', async () => {
      const mockItems = [{ id: 'i1' }, { id: 'i2' }];
      sinon.stub(itemDAO, 'findByGroupId').resolves(mockItems);

      const result = await itemService.getItemsByGroup('g1');
      expect(result).toEqual(mockItems);
    });
  });

  describe('addItem', () => {
    it('debe agregar un ítem correctamente', async () => {

      const mockGroupId = new mongoose.Types.ObjectId().toString();
      const mockAddedByUserId = new mongoose.Types.ObjectId().toString();

      const data = { name: 'Pan', groupId: mockGroupId, userId: mockAddedByUserId };
      const newItem = { id: mockAddedByUserId, ...data };
      const newGroup = {
        id: mockGroupId, members: [
          { user: mockAddedByUserId, role: 'admin' }
        ], ...data
      };

      sinon.stub(itemDAO, 'create').resolves(newItem);
      sinon.stub(groupDAO, 'findById').resolves(newGroup);


      const result = await itemService.addItem(data);
      expect(result).toEqual(newItem);
    });
  });

  describe('updateItem', () => {
    it('debe actualizar un ítem correctamente', async () => {
      const updates = { name: 'Pan integral' };
      const updatedItem = { id: 'i1', ...updates };
      sinon.stub(itemDAO, 'update').resolves(updatedItem);

      const result = await itemService.updateItem('i1', updates);
      expect(result).toEqual(updatedItem);
    });
  });

  describe('deleteItem', () => {
    it('debe eliminar un ítem correctamente', async () => {
      const removedItem = { id: 'i1', deleted: true };
      sinon.stub(itemDAO, 'remove').resolves(removedItem);

      const result = await itemService.deleteItem('i1');
      expect(result).toEqual(removedItem);
    });
  });
});
