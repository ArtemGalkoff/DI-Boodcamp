import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask } from '../tasksSlice';

const DeleteTask = ({ selectedDate, taskId }) => {
  const dispatch = useDispatch();

  const handleDeleteTask = () => {
    dispatch(deleteTask({ date: selectedDate, taskId }));
  };

  return (
    <button onClick={handleDeleteTask}>Delete task</button>
  );
};

export default DeleteTask;