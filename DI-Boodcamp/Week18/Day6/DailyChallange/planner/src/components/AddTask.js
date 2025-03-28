import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../tasksSlice';

const AddTask = ({ selectedDate }) => {
  const [task, setTask] = useState('');
  const dispatch = useDispatch();

  const handleAddTask = () => {
    if (task.trim()) {
      dispatch(addTask({ date: selectedDate, task: { id: Date.now(), task } }));
      setTask('');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Введите задачу"
      />
      <button onClick={handleAddTask}>Добавить задачу</button>
    </div>
  );
};

export default AddTask;