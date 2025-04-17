import { createSelector } from 'reselect';

const selectCategories = (state) => state.categories;


export const selectCategoryById = createSelector(
  [selectCategories, (state, taskId) => taskId],
  (categories, taskId) => categories.filter(category => category.taskId === taskId)
);
  

export { selectCategories };