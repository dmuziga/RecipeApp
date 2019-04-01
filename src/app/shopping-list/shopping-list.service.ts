import {EventEmitter, Injectable, Output} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  ingredientAdded = new Subject<Ingredient[]>();
  startedEditting = new Subject<number>();


  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Apples', 10)
  ];


  getIngredient(){
    return this.ingredients.slice();
  }


  onIngredientAdd(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientAdded.next(this.ingredients.slice());
  }

  getIngredientEdit(i: number) {
    return this.ingredients[i];
  }



  addIngredients(ingredients: Ingredient[]){
    // @ts-ignore
    this.ingredients.push(...ingredients);
    this.ingredientAdded.next(this.ingredients.slice());

  }

  updateIngredient(index: number, newIngredient: Ingredient){
    this.ingredients[index] = newIngredient;
    this.ingredientAdded.next(this.ingredients.slice());



  }

  deleteIngredient (index: number){
    this.ingredients.splice(index,1);
    this.ingredientAdded.next(this.ingredients.slice());

  }

  constructor() { }
}
