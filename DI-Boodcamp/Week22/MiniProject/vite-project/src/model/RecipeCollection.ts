import RecipeItem from './RecipeItem';

export default class RecipeCollection {
  recipes: RecipeItem[];

  constructor() {
    this.recipes = this.loadFromLocalStorage();
  }

  addRecipe(recipe: RecipeItem): void {
    this.recipes.push(recipe);
    this.saveToLocalStorage();
  }

  removeRecipe(id: string): void {
    this.recipes = this.recipes.filter((recipe) => recipe.id !== id);
    this.saveToLocalStorage();
  }

  toggleFavorite(id: string): void {
    const recipe = this.recipes.find((recipe) => recipe.id === id);
    if (recipe) {
      recipe.isFavorite = !recipe.isFavorite;
      this.saveToLocalStorage();
    }
  }

  saveToLocalStorage(): void {
    localStorage.setItem('recipes', JSON.stringify(this.recipes));
  }

  loadFromLocalStorage(): RecipeItem[] {
    const recipesData = localStorage.getItem('recipes');
    return recipesData ? JSON.parse(recipesData) : [];
  }
}