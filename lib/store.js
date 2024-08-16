let todos = [];

export function getTodos() {
  return todos;
}

export function addTodo(todo) {
  todos.push(todo);
}

export function updateTodo(id, updatedTodo) {
  const index = todos.findIndex(todo => todo.id === parseInt(id));
  if (index !== -1) {
    todos[index] = { ...todos[index], ...updatedTodo };
    return todos[index];
  }
  return null;
}

export function deleteTodo(id) {
  const index = todos.findIndex(todo => todo.id === parseInt(id));
  if (index !== -1) {
    return todos.splice(index, 1)[0];
  }
  return null;
}