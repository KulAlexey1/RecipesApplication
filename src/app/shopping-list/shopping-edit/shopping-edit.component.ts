import { Subscription } from "rxjs";
import { ShoppingListService } from "../../core/services/shopping-list.service";
import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { Ingredient } from "../../core/models/ingredient.model";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrls: ["./shopping-edit.component.css"]
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  selectedIngredientSubscription: Subscription;
  @ViewChild("shoppingEditForm", { static: false })
  shoppingEditForm: NgForm;
  editedMode = false;

  constructor(private _shoppingListService: ShoppingListService) {}

  ngOnInit() {
    this.selectedIngredientSubscription = this._shoppingListService.selectedIngredientChanged.subscribe(
      ingredientId => {
        this.editedMode = true;
        const ingredient = this._shoppingListService.findById(ingredientId);
        if (ingredient == null) {
          return;
        }

        this.shoppingEditForm.setValue({
          id: ingredient.id,
          name: ingredient.name,
          amount: ingredient.amount
        });
      }
    );
  }

  ngOnDestroy() {
    this.selectedIngredientSubscription.unsubscribe();
  }

  saveIngredient() {
    const value = this.shoppingEditForm.value;
    const ingr = new Ingredient(+value.id, value.name, +value.amount);

    if (this.editedMode) {
      this._shoppingListService.updateIngredient(ingr);
    } else {
      this._shoppingListService.addIngredient(ingr);
    }

    this.clearIngredientForm();
  }

  deleteIngredient() {
    this._shoppingListService.deleteIngredient(+this.shoppingEditForm.value.id);

    this.clearIngredientForm();
  }

  clearIngredientForm() {
    this.shoppingEditForm.reset({ id: "", name: "", amount: "" });
    this.editedMode = false;
  }
}
