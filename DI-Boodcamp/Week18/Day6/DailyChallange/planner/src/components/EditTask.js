import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Добавьте import useSelector
import { editTask } from '../tasksSlice';

const EditTask = ({ selectedDate, taskId }) => {
  const [updatedTask, setUpdatedTask] = useState('');
  const dispatch = useDispatch();
  const task = useSelector((state) => {
    const tasks = state.tasks[selectedDate] || [];
    return tasks.find((task) => task.id === taskId);
  });

  // Если задачи нет, не показываем форму редактирования
  useEffect(() => {
    if (task) {
      setUpdatedTask(task.task);
    }
  }, [task]);

  const handleEditTask = () => {
    if (updatedTask.trim()) {
      dispatch(editTask({ date: selectedDate, taskId, updatedTask }));
    }
  };

  if (!task) {
    return <div>Задача не найдена!</div>;
  }

  return (
    <div>
      <input
        type="text"
        value={updatedTask}
        onChange={(e) => setUpdatedTask(e.target.value)}
        placeholder="Редактировать задачу"
      />
      <button onClick={handleEditTask}>Сохранить</button>
    </div>
  );
};

export default EditTask;