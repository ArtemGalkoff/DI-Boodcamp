import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectTasksByCategory } from './tasksSelectors'; 
import { addTask, editTask, deleteTask } from './tasksSlice';

const TaskList = ({ categoryId }) => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => 
    selectTasksByCategory(state, categoryId)
  );

  const [taskTitle, setTaskTitle] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);

  const handleAddOrEditTask = (e) => {
    e.preventDefault();

    if (!taskTitle.trim()) return;

    if (editingTaskId) {
      dispatch(editTask({ id: editingTaskId, title: taskTitle, categoryId }));
      setEditingTaskId(null);
    } else {
      dispatch(addTask({
        id: Date.now().toString(),
        title: taskTitle,
        categoryId,
        completed: false,
      }));
    }

    setTaskTitle('');
  };

  const handleToggleComplete = useCallback((task) => {
    dispatch(editTask({ ...task, completed: !task.completed }));
  }, [dispatch]);

  const handleDelete = useCallback((id) => {
    dispatch(deleteTask(id));
  }, [dispatch]);

  const handleEditClick = (task) => {
    setTaskTitle(task.title);
    setEditingTaskId(task.id);
  };

  return (
    <div>
      <form onSubmit={handleAddOrEditTask}>
        <input
          type="text"
          placeholder="Input task"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
        <button type="submit">{editingTaskId ? 'Save' : 'Add'}</button>
      </form>

      {(!tasks || tasks.length === 0) ? (
        <p>Tasks not find.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id} style={{ marginBottom: '10px' }}>
              <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                {task.title}
              </span>
              <button onClick={() => handleToggleComplete(task)} style={{ marginLeft: '10px' }}>
                {task.completed ? 'Cansel' : 'Ainish'}
              </button>
              <button onClick={() => handleEditClick(task)} style={{ marginLeft: '5px' }}>
                ✏️ Edit
              </button>
              <button onClick={() => handleDelete(task.id)} style={{ marginLeft: '5px', color: 'red' }}>
                🗑️ Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;