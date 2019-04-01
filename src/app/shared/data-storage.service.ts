import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import {map} from 'rxjs/operators';
import {AuthService} from '../auth/auth.service';
import {stringify} from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: Http,
              private recipService: RecipeService,
              private authService: AuthService) { }


storeRecipes(){
  const token = this.authService.getToken();
 return this.http.put('https://ng-recipe-book-626e9.firebaseio.com/recipes.json?auth=' + token, this.recipService.getRecipes());
}
getRecipes(){
 const token = this.authService.getToken();

  let recipe;
    this.http.get('https://ng-recipe-book-626e9.firebaseio.com/recipes.json?auth=' + token).pipe(
      map(
           (response) => {
             const recipes: Recipe[] = response.json();
             for ( recipe of recipes) {
               if (!recipe['ingredients']) {
                 console.log(recipe);
                 recipe['ingredients'] = [];
               }
             }
             return recipes;
           }
         )
      )
      .subscribe(
        (recipes: Recipe[]) => {

          this.recipService.setRecipes(recipes);
        }
    );
}

}
