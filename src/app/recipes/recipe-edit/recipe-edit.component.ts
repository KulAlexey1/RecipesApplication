import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../../core/services/recipe.service';
import { Recipe } from 'src/app/core/models/recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  ingredientEditForm: FormGroup;
  ingredientId = 0;
  editMode = false;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _recipeService: RecipeService
  ) {}

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      this.ingredientId = +params.id;
      this.editMode = params.id != null;
    });

    this.initForm();
  }

  initForm() {
    const recipe = this.editMode
      ? this._recipeService.findById(this.ingredientId)
      : new Recipe(-1, '', '', '', []);

    const ingredientsFormArray = new FormArray([], [Validators.required]);

    if (recipe.ingredients !== null) {
      for (const ingredient of recipe.ingredients) {
        ingredientsFormArray.push(
          this.createIngredientsFormGroup(
            ingredient.id,
            ingredient.name,
            ingredient.amount
          )
        );
      }
    }

    this.ingredientEditForm = new FormGroup({
      id: new FormControl(recipe.id),
      name: new FormControl(recipe.name, [Validators.required]),
      description: new FormControl(recipe.description),
      imagePath: new FormControl(recipe.imagePath),
      ingredients: ingredientsFormArray
    });
  }

  saveRecipe() {
    const recipe = this.ingredientEditForm.value;
    if (this.editMode) {
      this._recipeService.updateRecipe(recipe);
    } else {
      this._recipeService.addRecipe(recipe);
    }
    this.cancelRecipeEdit();
  }

  cancelRecipeEdit() {
    this._router.navigate(['../'], { relativeTo: this._route });
  }

  addRecipeIngredient() {
    (this.ingredientEditForm.get('ingredients') as FormArray).push(
      this.createIngredientsFormGroup()
    );
  }

  createIngredientsFormGroup(
    id: number = -1,
    name: string = '',
    amount: number = 0
  ): FormGroup {
    return new FormGroup({
      id: new FormControl(id),
      name: new FormControl(name, Validators.required),
      amount: new FormControl(amount, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/)
      ])
    });
  }

  deleteRecipeIngredient(ingredientIdx: number) {
    (this.ingredientEditForm.get('ingredients') as FormArray).removeAt(
      ingredientIdx
    );
  }
}
