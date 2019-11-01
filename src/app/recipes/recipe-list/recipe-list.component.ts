import { Subscription } from 'rxjs';
import { RecipeService } from './../recipe.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../../shared/recipe.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipeChangedSubs: Subscription;
  recipes: Recipe[];

  constructor(private _router: Router, private _recipeService: RecipeService) {}

  ngOnInit() {
    this.recipes = this._recipeService.recipes;
    this.recipeChangedSubs = this._recipeService.recipeChanged.subscribe(
      recipes => {
        this.recipes = recipes;
      }
    );
  }

  ngOnDestroy() {
    this.recipeChangedSubs.unsubscribe();
  }

  goToAddRecipe() {
    this._router.navigate(['recipes', 'new']);
  }
}
