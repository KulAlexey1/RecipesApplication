import { Ingredient } from './../shared/ingredient.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  selectedIngredientChanged = new Subject<number>();
  private _ingredients: Ingredient[] = [
    new Ingredient(1, 'Apples', 10),
    new Ingredient(2, 'Oranges', 15)
  ];
  private _lastId = 2;

  public get ingredients() {
    return this._ingredients.slice();
  }

  constructor() {}

  findById(id: number) {
    return this.ingredients.find(i => i.id === +id);
  }

  addIngredient(ingredient: Ingredient) {
    ingredient.id = ++this._lastId;
    this._ingredients.push(ingredient);

    this.ingredientsChanged.next(this.ingredients);
  }

  updateIngredient(ingredient: Ingredient) {
    const idx = this._ingredients.findIndex(i => i.id === ingredient.id);
    this._ingredients[idx] = ingredient;

    this.ingredientsChanged.next(this.ingredients);
  }

  addIngredients(ingredients: Ingredient[]) {
    ingredients.forEach(element => {
      element.id = ++this._lastId;
    });
    this._ingredients.push(...ingredients);

    this.ingredientsChanged.next(this.ingredients);
  }

  deleteIngredient(id: number) {
    this._ingredients = this._ingredients.filter(i => i.id !== id);
    this.ingredientsChanged.next(this.ingredients);
  }
}
