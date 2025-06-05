import sinon from 'sinon';
import { afterAll, jest } from '@jest/globals'
import mongoose from 'mongoose';
import Item from '../../../models/item.js';
import itemDAO from '../../../dataaccess/itemDAO.js';
import mongoMemory from '../../support/mongoMemory.js';

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
    beforeAll(async () => {
      await mongoMemory.connectTestDB();
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    afterAll(async () => {
      await mongoMemory.disconnectTestDB();

    });

    it('debe guardar un nuevo item en la base de datos', async () => {
      // Debes proporcionar un groupId y addedBy válido para la creación del ítem
      const mockGroupId = '665abcabcabcabcabcabcabc'; // Ejemplo de ID de grupo
      const mockAddedByUserId = '665123a123abc12312312312'; // Ejemplo de ID de usuario

      const itemData = {
        name: 'Pan',
        groupId: mockGroupId,
        addedBy: mockAddedByUserId
        // quantity y isPurchased tienen valores por defecto, no necesitan ser pasados
      };

      const mockItem = { _id: 'i1', ...itemData }; // Asegúrate de que mockItem coincida con lo que el save() resolvería
      sinon.stub(Item.prototype, 'save').resolves(mockItem);

      const result = await itemDAO.create(itemData);
      expect(result).toEqual(mockItem);

      expect(result.name).toBe('Pan');
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
