import sinon from 'sinon';
import itemDAO from '../../../dataAccess/itemDAO.js';
import Item from '../../../models/item.js';

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

  describe('markAsPurchased', () => {
    it('debe marcar un ítem como comprado', async () => {
      const updatedItem = { id: 'i1', isPurchased: true };
      const stub = sinon.stub(Item, 'findByIdAndUpdate').resolves(updatedItem);

      const result = await itemDAO.markAsPurchased('i1', 'u1');
      expect(result).toEqual(updatedItem);
      sinon.assert.calledWithMatch(stub, 'i1', sinon.match({ isPurchased: true, purchasedBy: 'u1' }));
    });
  });

  describe('findById', () => {
    it('debe encontrar un ítem por ID', async () => {
      const item = { id: 'i1' };
      sinon.stub(Item, 'findById').resolves(item);

      const result = await itemDAO.findById('i1');
      expect(result).toEqual(item);
    });
  });
});
