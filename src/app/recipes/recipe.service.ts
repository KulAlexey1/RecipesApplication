import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { Ingredient } from './../shared/ingredient.model';
import { Recipe } from '../shared/recipe.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
  public recipeChanged = new Subject<Recipe[]>();
  private _recipes = [
    new Recipe(
      1,
      'Big tasty burger',
      'Very tasty burger for you',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFbelLjy-fiSnRRJZu6eRYEcDIgDOFYwW2jR59cs4B5tNSaPPL',
      [new Ingredient(0, 'Meat', 10), new Ingredient(0, 'Buns', 2)]
    ),
    new Recipe(
      2,
      'Pita with vegetables',
      'Vegetarian food',
      'https://images.media-allrecipes.com/images/56610.png',
      [
        new Ingredient(0, 'Pita', 2),
        new Ingredient(0, 'Beans', 50),
        new Ingredient(0, 'Corn', 60)
      ]
    )
  ];
  private _lastRecipeId = 2;

  public get recipes(): Recipe[] {
    return this._recipes.slice();
  }

  selectedRecipe = new Subject<Recipe>();

  constructor(private _slService: ShoppingListService) {}

  public findById(id: number) {
    return this.recipes.find(r => r.id === +id);
  }

  public addRecipe(newRecipe: Recipe) {
    newRecipe.id = ++this._lastRecipeId;
    this._recipes.push(newRecipe);

    this.recipeChanged.next(this.recipes);
  }

  public updateRecipe(modRecipe: Recipe) {
    const modRecipeIdx = this._recipes.findIndex(r => r.id === modRecipe.id);
    this._recipes[modRecipeIdx] = modRecipe;

    this.recipeChanged.next(this.recipes);
  }

  public deleteRecipe(recipeId: number) {
    const idx = this._recipes.findIndex(r => r.id === recipeId);
    this._recipes.splice(idx, 1);

    this.recipeChanged.next(this.recipes);
  }

  public addIngredientsToShoppingList(recipe: Recipe) {
    this._slService.addIngredients(recipe.ingredients);
  }
}
