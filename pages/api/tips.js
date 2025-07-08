const {
  getTips,
  getTipById,
  addTip,
  updateTip,
  deleteTip,
} = require('../../lib/tips');

export default function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case 'GET':
      if (id) {
        const tip = getTipById(parseInt(id));
        if (!tip) {
          return res.status(404).json({ message: 'Tip not found' });
        }
        return res.status(200).json(tip);
      }
      return res.status(200).json(getTips());

    case 'POST':
      const { category, text } = req.body;
      if (!category || !text) {
        return res.status(400).json({ message: 'Category and text are required' });
      }
      const newTip = addTip(category, text);
      return res.status(201).json(newTip);

    case 'PUT':
      if (!id) {
        return res.status(400).json({ message: 'ID is required for update' });
      }
      const { category: newCategory, text: newText } = req.body;
      if (!newCategory || !newText) {
        return res.status(400).json({ message: 'Category and text are required' });
      }
      const updatedTip = updateTip(parseInt(id), newCategory, newText);
      if (!updatedTip) {
        return res.status(404).json({ message: 'Tip not found' });
      }
      return res.status(200).json(updatedTip);

    case 'DELETE':
      if (!id) {
        return res.status(400).json({ message: 'ID is required for delete' });
      }
      const deleted = deleteTip(parseInt(id));
      if (!deleted) {
        return res.status(404).json({ message: 'Tip not found' });
      }
      return res.status(204).end();

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
