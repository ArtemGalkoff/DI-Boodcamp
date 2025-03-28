import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask } from '../tasksSlice';

const TaskList = ({ selectedDate }) => {
  const dispatch = useDispatch();
  

  const tasks = useSelector((state) => state.tasks[selectedDate] || []);

  const handleDelete = (taskId) => {
  
    dispatch(deleteTask({ date: selectedDate, taskId }));
  };

  return (
    <div>
      <h3>Задачи на {selectedDate}</h3>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.task}
            <button onClick={() => handleDelete(task.id)}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;