import sinon from 'sinon';
import itemDAO from '../../../dataAccess/item.js';
import Item from '../../../models/Item.js';

describe('itemDAO', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('findByGroupId', () => {
    it('debe devolver ítems por ID de grupo', async () => {
      const items = [{ id: 'i1' }, { id: 'i2' }];
      sinon.stub(Item, 'find').resolves(items);

      const result = await itemDAO.findByGroupId('g1');
      expect(result).toEqual(items);
    });
  });

  describe('create', () => {
    it('debe crear un ítem correctamente', async () => {
      const mockItem = { id: 'i1', name: 'Pan' };
      sinon.stub(Item.prototype, 'save').resolves(mockItem);

      const result = await itemDAO.create({ name: 'Pan' });
      expect(result).toEqual(mockItem);
    });
  });

  describe('update', () => {
    it('debe actualizar un ítem por ID', async () => {
      const updatedItem = { id: 'i1', name: 'Arroz' };
      sinon.stub(Item, 'findByIdAndUpdate').resolves(updatedItem);

      const result = await itemDAO.update('i1', { name: 'Arroz' });
      expect(result).toEqual(updatedItem);
    });
  });

  describe('remove', () => {
    it('debe eliminar un ítem por ID', async () => {
      const deletedItem = { id: 'i1', deleted: true };
      sinon.stub(Item, 'findByIdAndDelete').resolves(deletedItem);

      const result = await itemDAO.remove('i1');
      expect(result).toEqual(deletedItem);
    });
  });
});
