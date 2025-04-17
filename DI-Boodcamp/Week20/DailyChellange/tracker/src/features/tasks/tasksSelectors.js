import { createSelector } from 'reselect';

const selectTasks = (state) => state.tasks;

export const selectTasksByCategory = createSelector(
  [selectTasks, (state, categoryId) => categoryId],
  (tasks, categoryId) =>
    categoryId ? tasks.filter(task => task.categoryId === categoryId) : tasks
);

export const completedTasks = createSelector(
  [selectTasks],
  (tasks) => tasks.filter(task => task.completed).length
);

export { selectTasks };