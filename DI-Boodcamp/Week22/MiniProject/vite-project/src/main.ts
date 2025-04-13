import RecipeItem from './model/RecipeItem';
import RecipeCollection from './model/RecipeCollection';
import RecipeTemplate from './templates/RecipeTemplate';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

// Initialize the collection and template
const recipeCollection = new RecipeCollection();
const recipeTemplate = new RecipeTemplate('recipeContainer');

// Load and display the recipes
recipeTemplate.render(recipeCollection.recipes);

// Handle adding a new recipe
const recipeForm = document.getElementById('recipeEntryForm') as HTMLFormElement;
recipeForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const titleInput = document.getElementById('recipeTitle') as HTMLInputElement;
  const ingredientsInput = document.getElementById('ingredients') as HTMLTextAreaElement;
  const instructionsInput = document.getElementById('instructions') as HTMLTextAreaElement;

  const ingredients = ingredientsInput.value.split('\n').map((ingredient) => ingredient.trim()).filter(Boolean);
  const instructions = instructionsInput.value.trim();

  if (titleInput.value && ingredients.length > 0 && instructions) {
    const newRecipe = new RecipeItem(titleInput.value, ingredients, instructions);
    recipeCollection.addRecipe(newRecipe);

    recipeTemplate.render(recipeCollection.recipes);

    // Clear form inputs
    titleInput.value = '';
    ingredientsInput.value = '';
    instructionsInput.value = '';
  }
});

// Handle toggling favorite status
document.addEventListener('toggle-favorite', (event: CustomEvent) => {
  const recipeId = event.detail;
  recipeCollection.toggleFavorite(recipeId);
  recipeTemplate.render(recipeCollection.recipes);
});

// Handle deleting a recipe
document.addEventListener('delete-recipe', (event: CustomEvent) => {
  const recipeId = event.detail;
  recipeCollection.removeRecipe(recipeId);
  recipeTemplate.render(recipeCollection.recipes);
});

// Clear all recipes
const clearRecipesButton = document.getElementById('clearRecipesButton') as HTMLButtonElement;
clearRecipesButton.addEventListener('click', () => {
  localStorage.removeItem('recipes');
  recipeCollection.recipes = [];
  recipeTemplate.render(recipeCollection.recipes);
});