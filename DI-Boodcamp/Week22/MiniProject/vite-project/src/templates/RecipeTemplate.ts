import RecipeItem from '../model/RecipeItem';

export default class RecipeTemplate {
  container: HTMLElement;

  constructor(containerId: string) {
    this.container = document.getElementById(containerId)!;
  }

  render(recipes: RecipeItem[]): void {
    this.container.innerHTML = '';
    recipes.forEach((recipe) => {
      const recipeCard = this.createRecipeCard(recipe);
      this.container.appendChild(recipeCard);
    });
  }

  private createRecipeCard(recipe: RecipeItem): HTMLElement {
    const card = document.createElement('div');
    card.classList.add('recipe-card');

    const title = document.createElement('h3');
    title.textContent = recipe.title;

    const ingredients = document.createElement('ul');
    recipe.ingredients.forEach((ingredient) => {
      const li = document.createElement('li');
      li.textContent = ingredient;
      ingredients.appendChild(li);
    });

    const instructions = document.createElement('p');
    instructions.textContent = recipe.instructions;

    const favoriteButton = document.createElement('button');
    favoriteButton.textContent = recipe.isFavorite ? 'Unfavorite' : 'Favorite';
    favoriteButton.onclick = () => this.toggleFavorite(recipe.id);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => this.deleteRecipe(recipe.id);

    card.appendChild(title);
    card.appendChild(ingredients);
    card.appendChild(instructions);
    card.appendChild(favoriteButton);
    card.appendChild(deleteButton);

    return card;
  }

  private toggleFavorite(id: string): void {
    const event = new CustomEvent('toggle-favorite', { detail: id });
    document.dispatchEvent(event);
  }

  private deleteRecipe(id: string): void {
    const event = new CustomEvent('delete-recipe', { detail: id });
    document.dispatchEvent(event);
  }
}