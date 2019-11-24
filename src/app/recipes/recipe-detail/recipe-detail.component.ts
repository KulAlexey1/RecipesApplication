import { RecipeService } from '../../core/services/recipe.service';
import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from 'src/app/core/models/recipe.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _recipeService: RecipeService
  ) {}

  ngOnInit() {
    this._route.params.subscribe(params => {
      this.recipe = this._recipeService.findById(params.id);
    });
  }

  addToShoppingList() {
    this._recipeService.addIngredientsToShoppingList(this.recipe);
  }

  goToEditRecipe() {
    this._router.navigate(['edit'], { relativeTo: this._route });
  }

  deleteRecipe() {
    this._recipeService.deleteRecipe(this.recipe.id);
    this._router.navigate(['recipes']);
  }
}
