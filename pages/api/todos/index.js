import { getTodos, addTodo } from '../../../lib/store';

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(getTodos());
  } else if (req.method === 'POST') {
    const newTodo = {
      id: Date.now(),
      text: req.body.text,
      completed: false,
    };
    addTodo(newTodo);
    res.status(201).json(newTodo);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}