import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addTodo, toggleTodo, removeTodo } from './todosSlice';

const TodoList = ({ todos, addTodo, toggleTodo, removeTodo }) => {
  const [input, setInput] = useState('');

  const handleAddTodo = () => {
    if (input.trim()) {
      addTodo({ text: input });
      setInput('');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleAddTodo}>Добавить</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <span
              style={{ textDecoration: todo.completed ? 'line-through' : '' }}
              onClick={() => toggleTodo({ id: todo.id })}
            >
              {todo.text}
            </span>
            <button onClick={() => removeTodo({ id: todo.id })}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => ({
  todos: state.todos.todos
});

const mapDispatchToProps = {
  addTodo,
  toggleTodo,
  removeTodo
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);