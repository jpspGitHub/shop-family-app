import sinon from 'sinon';
import userService from '../../../services/userService.js';
import userDAO from '../../../dataAccess/user.js';

describe('userService', () => {
  
  
  afterEach(() => {
    sinon.restore();
  });

  describe('getUserById', () => {
    it('debe devolver el usuario correcto por ID', async () => {
      const mockUser = { _id: '123', name: 'Pablo' };
      sinon.stub(userDAO, 'findById').resolves(mockUser);

      const result = await userService.getUserById('123');
      expect(result).toEqual(mockUser);
    });
  });

  describe('updateUser', () => {
    it('debe actualizar el usuario correctamente', async () => {
      const updates = { name: 'Nuevo Nombre' };
      const updatedUser = { _id: '123', name: 'Nuevo Nombre' };
      sinon.stub(userDAO, 'updateById').resolves(updatedUser);

      const result = await userService.updateUser('123', updates);
      expect(result).toEqual(updatedUser);
    });
  });

  describe('deleteUser', () => {
    it('debe eliminar el usuario correctamente', async () => {
      const deleted = { acknowledged: true, deletedCount: 1 };
      sinon.stub(userDAO, 'deleteById').resolves(deleted);

      const result = await userService.deleteUser('123');
      expect(result).toEqual(deleted);
    });
  });
});
