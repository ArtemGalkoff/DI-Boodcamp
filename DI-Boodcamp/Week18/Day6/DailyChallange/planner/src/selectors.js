import { createSelector } from 'reselect';

const selectTasksByDate = (state, date) => state.tasks[date] || [];

export const selectMemoizedTasks = createSelector(
  [selectTasksByDate],
  (tasks) => tasks
);