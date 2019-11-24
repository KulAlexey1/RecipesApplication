import { ShoppingListService } from "./shopping-list.service";
import { Recipe } from "../models/recipe.model";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService {
  public recipeChanged = new Subject<Recipe[]>();
  private _recipes = [];
  private _lastRecipeId = 2;

  public get recipes(): Recipe[] {
    return this._recipes.slice();
  }

  public set recipes(recipes: Recipe[]) {
    this._recipes = recipes;
    this.recipeChanged.next(this.recipes);
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
