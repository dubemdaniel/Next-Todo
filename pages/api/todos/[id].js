import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  const { id } = req.query;
  const todos = await kv.get('todos') || [];

  if (req.method === 'PUT') {
    const index = todos.findIndex(todo => todo.id === parseInt(id));
    if (index !== -1) {
      todos[index] = { ...todos[index], ...req.body };
      await kv.set('todos', todos);
      res.status(200).json(todos[index]);
    } else {
      res.status(404).json({ message: 'Todo not found' });
    }
  } else if (req.method === 'DELETE') {
    const index = todos.findIndex(todo => todo.id === parseInt(id));
    if (index !== -1) {
      const deletedTodo = todos.splice(index, 1)[0];
      await kv.set('todos', todos);
      res.status(200).json(deletedTodo);
    } else {
      res.status(404).json({ message: 'Todo not found' });
    }
  } else {
    res.setHeader('Allow', ['PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}



// import { updateTodo, deleteTodo } from '../../../lib/store';

// export default function handler(req, res) {
//   const { id } = req.query;

//   if (req.method === 'PUT') {
//     const updatedTodo = updateTodo(id, req.body);
//     if (updatedTodo) {
//       res.status(200).json(updatedTodo);
//     } else {
//       res.status(404).json({ message: 'Todo not found' });
//     }
//   } else if (req.method === 'DELETE') {
//     const deletedTodo = deleteTodo(id);
//     if (deletedTodo) {
//       res.status(200).json(deletedTodo);
//     } else {
//       res.status(404).json({ message: 'Todo not found' });
//     }
//   } else {
//     res.setHeader('Allow', ['PUT', 'DELETE']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }