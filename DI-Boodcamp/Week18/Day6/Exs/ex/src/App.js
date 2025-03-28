import React from 'react';
import TodoList from './TodoList'; // Импортируем компонент TodoList

const App = () => {
  return (
    <div>
      <h1>Список Дел</h1>
      <TodoList /> {/* Отображаем компонент TodoList */}
    </div>
  );
};

export default App;