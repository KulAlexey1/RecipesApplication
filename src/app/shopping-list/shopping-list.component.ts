import { Ingredient } from './../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  ingredientsChangedSubscription: Subscription;
  constructor(private _shoppingListService: ShoppingListService) {}

  ngOnInit() {
    this.ingredients = this._shoppingListService.ingredients;
    this.ingredientsChangedSubscription = this._shoppingListService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
  }

  selectIngredient(ingredientId: number) {
    this._shoppingListService.selectedIngredientChanged.next(ingredientId);
  }

  ngOnDestroy() {
    this.ingredientsChangedSubscription.unsubscribe();
  }
}
