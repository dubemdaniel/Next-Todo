import { updateTodo, deleteTodo } from '../../../lib/store';

export default function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    const updatedTodo = updateTodo(id, req.body);
    if (updatedTodo) {
      res.status(200).json(updatedTodo);
    } else {
      res.status(404).json({ message: 'Todo not found' });
    }
  } else if (req.method === 'DELETE') {
    const deletedTodo = deleteTodo(id);
    if (deletedTodo) {
      res.status(200).json(deletedTodo);
    } else {
      res.status(404).json({ message: 'Todo not found' });
    }
  } else {
    res.setHeader('Allow', ['PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}