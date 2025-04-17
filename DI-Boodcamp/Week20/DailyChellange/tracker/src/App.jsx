import React, { useState } from 'react';
import CategorySelector from './features/categories/CategorySelector';
import TaskList from './features/tasks/TaskList';

const App = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState('');

  const handleCategoryChange = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };

  return (
    <div>
      <h1>Productivity Tracker</h1>
      <CategorySelector
        selectedCategoryId={selectedCategoryId}
        onSelectCategory={handleCategoryChange}
      />
      <TaskList selectedCategoryId={selectedCategoryId} />
    </div>
  );
};


export default App
