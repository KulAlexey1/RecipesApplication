import { catchError } from 'rxjs/operators';
import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";

import { DataStorageService } from "../services/data-storage.service";
import { RecipeService } from "../services/recipe.service";
import { Recipe } from "../models/recipe.model";
import { of } from 'rxjs';

@Injectable({ providedIn: "root" })
export class RecipesResolver implements Resolve<Recipe[]> {
  constructor(
    private _dataStorage: DataStorageService,
    private _recipeService: RecipeService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this._recipeService.recipes;

    if (this._recipeService.recipes.length === 0) {
      return this._dataStorage.fetchRecipes().pipe(
        catchError(error => {
          return of([]);
        })
      );
    } else {
      return recipes;
    }
  }
}
