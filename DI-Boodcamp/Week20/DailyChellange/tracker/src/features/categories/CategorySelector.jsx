import React from 'react';
import { useSelector,} from 'react-redux';
import { selectCategories } from './categoriesSelectors'; 

const CategorySelector = ({ selectedCategoryId, onSelectCategory }) => {
  const categories = useSelector(selectCategories);

  const handleChange = (e) => {
    const selectedId = e.target.value;
    onSelectCategory(selectedId);
  };

  return (
    <div>
      <label htmlFor="category-selector">Chose category:</label>
      <select
        id="category-selector"
        value={selectedCategoryId || ''}
        onChange={handleChange}
      >
        <option value="">--  All categoryes --</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategorySelector;