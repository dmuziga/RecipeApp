import {Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';



@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') editForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIdex: number;
  editedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
  this.subscription = this.shoppingListService.startedEditting
    .subscribe(
      (i: number) => {
        this.editedItemIdex = i;
        this.editMode = true;
        this.editedItem = this.shoppingListService.getIngredientEdit(i);
        this.editForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          }
        );
      }

    );

  }

  onSubmit(form: NgForm) {

    const value = form.value
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode){
      this.shoppingListService.updateIngredient(this.editedItemIdex, newIngredient);
    } else {
      this.shoppingListService.onIngredientAdd(newIngredient);
    }
    this.editMode = false;
    form.reset();



  }

  ngOnDestroy(){
    this.subscription.unsubscribe();

  }


  onClear() {
    this.editForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editedItemIdex);
    this.onClear();

  }
}
