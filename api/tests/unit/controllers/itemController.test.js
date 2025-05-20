import sinon from 'sinon';
import itemController from '../../../controllers/itemController.js';
import itemService from '../../../services/itemService.js';

describe('itemController', () => {
  let req, res;

  
  
  beforeEach(() => {
    req = {
      params: {},
      body: {},
      user: { id: 'user123' }
    };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
      end: sinon.stub()
    };
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('getItemsByGroup', () => {
    it('debe devolver ítems por grupo', async () => {
      req.params.groupId = 'g1';
      const items = [{ id: 'i1' }, { id: 'i2' }];
      sinon.stub(itemService, 'getItemsByGroup').resolves(items);

      await itemController.getItemsByGroup(req, res);

      sinon.assert.calledWith(res.status, 200);
      sinon.assert.calledWith(res.json, items);
    });

    it('debe manejar errores con status 500', async () => {
      req.params.groupId = 'g1';
      sinon.stub(itemService, 'getItemsByGroup').rejects();

      await itemController.getItemsByGroup(req, res);

      sinon.assert.calledWith(res.status, 500);
      sinon.assert.calledWith(res.json, { message: 'Internal server error' });
    });
  });

  describe('addItem', () => {
    it('debe agregar un ítem y devolverlo', async () => {
      req.body = { name: 'Pan' };
      const newItem = { id: 'i1', name: 'Pan', addedBy: 'user123' };
      sinon.stub(itemService, 'addItem').resolves(newItem);

      await itemController.addItem(req, res);

      sinon.assert.calledWith(res.status, 201);
      sinon.assert.calledWith(res.json, newItem);
    });

    it('debe manejar errores con status 500', async () => {
      req.body = { name: 'Pan' };
      sinon.stub(itemService, 'addItem').rejects();

      await itemController.addItem(req, res);

      sinon.assert.calledWith(res.status, 500);
      sinon.assert.calledWith(res.json, { message: 'Internal server error' });
    });
  });

  describe('updateItem', () => {
    it('debe actualizar y devolver el ítem', async () => {
      req.params.itemId = 'i1';
      req.body = { name: 'Arroz' };
      const updated = { id: 'i1', name: 'Arroz' };
      sinon.stub(itemService, 'updateItem').resolves(updated);

      await itemController.updateItem(req, res);

      sinon.assert.calledWith(res.status, 200);
      sinon.assert.calledWith(res.json, updated);
    });

    it('debe manejar errores con status 500', async () => {
      req.params.itemId = 'i1';
      sinon.stub(itemService, 'updateItem').rejects();

      await itemController.updateItem(req, res);

      sinon.assert.calledWith(res.status, 500);
      sinon.assert.calledWith(res.json, { message: 'Internal server error' });
    });
  });

  describe('deleteItem', () => {
    it('debe responder 204 al eliminar correctamente', async () => {
      req.params.itemId = 'i1';
      sinon.stub(itemService, 'deleteItem').resolves();

      await itemController.deleteItem(req, res);

      sinon.assert.calledWith(res.status, 204);
      sinon.assert.calledOnce(res.end);
    });

    it('debe manejar errores con status 500', async () => {
      req.params.itemId = 'i1';
      sinon.stub(itemService, 'deleteItem').rejects();

      await itemController.deleteItem(req, res);

      sinon.assert.calledWith(res.status, 500);
      sinon.assert.calledWith(res.json, { message: 'Internal server error' });
    });
  });
});
