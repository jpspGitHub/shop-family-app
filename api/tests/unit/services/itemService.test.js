import sinon from 'sinon';
import itemDAO from '../../../dataAccess/item.js';
import itemService from '../../../services/itemService.js';

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
      const data = { name: 'Pan', groupId: 'g1' };
      const newItem = { id: 'i1', ...data };
      sinon.stub(itemDAO, 'create').resolves(newItem);

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
