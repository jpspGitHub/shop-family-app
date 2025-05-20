import sinon from 'sinon';
import userDAO from '../../../dataAccess/user.js';
import User from '../../../models/User.js';

describe('userDAO', () => {
  
  
  afterEach(() => {
    sinon.restore();
  });

  describe('findByEmail', () => {
    it('debe devolver un usuario por email', async () => {
      const mockUser = { _id: 'u1', email: 'test@example.com' };
      sinon.stub(User, 'findOne').resolves(mockUser);

      const result = await userDAO.findByEmail('test@example.com');
      expect(result).toEqual(mockUser);
    });
  });

  describe('createFromGoogle', () => {
    it('debe crear un usuario nuevo desde Google', async () => {
      const googleUser = {
        name: 'Pablo',
        email: 'pablo@example.com',
        picture: 'url-imagen',
        uid: 'google-uid-123'
      };
      const mockUser = { _id: 'u1', ...googleUser };
      sinon.stub(User.prototype, 'save').resolves(mockUser);

      const result = await userDAO.createFromGoogle(googleUser);
      expect(result).toEqual(mockUser);
    });
  });

  describe('findById', () => {
    it('debe devolver un usuario por ID', async () => {
      const mockUser = { _id: 'u1', name: 'Pablo' };
      sinon.stub(User, 'findById').resolves(mockUser);

      const result = await userDAO.findById('u1');
      expect(result).toEqual(mockUser);
    });
  });

  describe('updateById', () => {
    it('debe actualizar un usuario por ID', async () => {
      const updates = { name: 'Actualizado' };
      const updatedUser = { _id: 'u1', ...updates };
      sinon.stub(User, 'findByIdAndUpdate').resolves(updatedUser);

      const result = await userDAO.updateById('u1', updates);
      expect(result).toEqual(updatedUser);
    });
  });

  describe('deleteById', () => {
    it('debe eliminar un usuario por ID', async () => {
      const deletion = { acknowledged: true, deletedCount: 1 };
      sinon.stub(User, 'findByIdAndDelete').resolves(deletion);

      const result = await userDAO.deleteById('u1');
      expect(result).toEqual(deletion);
    });
  });
});
