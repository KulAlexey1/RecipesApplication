import { RecipeService } from '../../../core/services/recipe.service';
import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../../core/models/recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;

  constructor(private _recipeService: RecipeService) {}

  ngOnInit() {}

  onSelectRecipe() {
    this._recipeService.selectedRecipe.next(this.recipe);
  }
}
