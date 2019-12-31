import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { map, tap, catchError } from "rxjs/operators";
import { throwError } from "rxjs";

import { RecipeService } from "./recipe.service";
import { Recipe } from "../models/recipe.model";

@Injectable({ providedIn: "root" })
export class DataStorageService {
  private readonly _url = "https://recipesapp-d9b16.firebaseio.com";
  private readonly _recipesUrl: string;

  constructor(
    private _http: HttpClient,
    private _recipeService: RecipeService
  ) {
    this._recipesUrl = this._url + "/recipes.json";
  }

  fetchRecipes() {
    return this._http.get(this._recipesUrl).pipe(
      map((recipes: Recipe[]) => {
        console.log("Recipes have been received successfully!");
        console.log(recipes);

        return recipes.map(recipe => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : []
          };
        });
      }),
      tap(recipes => {
        this._recipeService.recipes = recipes;
      }),
      catchError(this.handleError.bind(this))
    );
  }

  saveRecipes() {
    return this._http.put(this._recipesUrl, this._recipeService.recipes).pipe(
      map((recipes: Recipe[]) => {
        console.log("Recipes have been saved successfully!");
        console.log(recipes);

        this._recipeService.recipes = recipes;

        return recipes;
      }),
      catchError(this.handleError.bind(this))
    );
  }

  private handleError(error) {
    console.log("Error");
    console.log(error);

    return throwError(error);
  }
}
