import itemService from '../services/itemService.js';

async function getItemsByGroup(req, res) {
  try {
    const items = await itemService.getItemsByGroup(req.params.groupId);
    res.status(200).json(items);
  } catch (err) {
    console.error('Error fetching items:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function addItem(req, res) {
  const { groupId } = req.params;
  const { name, quantity } = req.body;
  const userId = req.user._id;

  try {
    const item = await itemService.addItem({ name, quantity, groupId, userId });
    return res.status(201).json(item);
  } catch (err) {
    if (err.code === 'NOT_FOUND') {
      return res.status(404).json({ message: err.message });
    }
    if (err.code === 'FORBIDDEN') {
      return res.status(403).json({ message: err.message });
    }
    return res.status(500).json({ message: 'Error al crear el ítem' });
  }
}

async function updateItem(req, res) {
  try {
    const updatedItem = await itemService.updateItem(req.params.itemId, req.body);
    res.status(200).json(updatedItem);
  } catch (err) {
    console.error('Error updating item:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function deleteItem(req, res) {
  try {
    await itemService.deleteItem(req.params.itemId);
    res.status(204).end();
  } catch (err) {
    console.error('Error deleting item:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export default {
  getItemsByGroup,
  addItem,
  updateItem,
  deleteItem
};