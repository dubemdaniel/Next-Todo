import { useState } from 'react';
import axios from 'axios';

export default function Home({ initialTodos }) {
  const [todos, setTodos] = useState(initialTodos);
  const [newTodo, setNewTodo] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);

  const addTodo = async () => {
    if (newTodo.trim() === '') return;
    const res = await axios.post('/api/todos', { text: newTodo });
    setTodos([...todos, res.data]);
    setNewTodo('');
  };

  const updateTodo = async (id, text) => {
    const res = await axios.put(`/api/todos/${id}`, { text });
    setTodos(todos.map(todo => todo.id === id ? res.data : todo));
    setEditingTodo(null);
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`/api/todos/${id}`);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
     
    }
  };

  return (
    <div className="flex flex-col justify-center min-h-screen py-6 text-black bg-gray-100 sm:py-12 bg-hero">
      <div className="relative py-3">
        {/* <div className="absolute inset-0 transform -skew-y-6 shadow-lg bg-gradient-to-r from-cyan-400 to-light-blue-500 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div> */}
        <div className="relative px-4 py-10 sm:rounded-3xl sm:p-20 lg:w-[40%]  mx-auto">

          <h1 className="mb-6 text-3xl font-bold text-center text-white">Todo List</h1>
          <div className="flex mb-4">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              className="flex-grow p-2 mr-2 border rounded"
              placeholder="Add a new todo"
            />
            <button
              onClick={addTodo}
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Add
            </button>
          </div>
          <ul>
            {todos.map((todo) => (
              <li key={todo.id} className="flex items-center mb-4 text-white ">
                {editingTodo === todo.id ? (
                  <input
                    type="text"
                    value={todo.text}
                    onChange={(e) => setTodos(todos.map(t => t.id === todo.id ? { ...t, text: e.target.value } : t))}
                    className="flex-grow p-2 mr-2 text-black border rounded"
                  />
                ) : (
                  <span className="flex-grow font-bold">{todo.text}</span>
                )}
                {editingTodo === todo.id ? (
                  <button
                    onClick={() => updateTodo(todo.id, todo.text)}
                    className="px-2 py-1 mr-2 text-white bg-green-500 rounded hover:bg-green-600"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => setEditingTodo(todo.id)}
                    className="px-2 py-1 mr-2 text-white bg-yellow-500 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/todos`);
  const initialTodos = res.data;
  return { props: { initialTodos } };
}