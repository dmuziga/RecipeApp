import { Injectable} from '@angular/core';
import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {increaseElementDepthCount} from '@angular/core/src/render3/state';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'A Test Recipe',
      'This is simply a test',
      'https://www.mrbrownbakery.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/c/h/chocolate.jpg',
      [
        new Ingredient('Cake Floor', 1) ,
        new Ingredient('Sugar', 25)
      ]
      ),
    new Recipe(
      'Another Carrot Cake',
      'This is simply the best Cake',
      'https://www.lifeloveandsugar.com/wp-content/uploads/2018/07/Black-Forest-Cake3.jpg',

      [
        new Ingredient('Buns', 2),
        new Ingredient('Carrot', 50)
      ])
  ];


  constructor(private shoppingListService: ShoppingListService) { }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList (ingredients: Ingredient[] ){
   this.shoppingListService.addIngredients(ingredients);

  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number ){

    this.recipes.splice(index, 1);

    this.recipesChanged.next(this.recipes.slice());


  }

  setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }


}
