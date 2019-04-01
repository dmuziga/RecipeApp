import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import {RecipeService} from '../recipe.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

selectedRecipeItem: Recipe;
id: number;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params
      .subscribe(
      (params: Params) => {
        this.id = +params['id']; /*//retrieve the individual recipe by ID */
        this.selectedRecipeItem = this.recipeService.getRecipe(this.id);

      }
    );

  }

  editRecipe() {
    debugger;
    this.router.navigate(['edit'], {relativeTo: this.route});

/*    this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});*/

  }

  onAddToShoppingList() {
    let selectedIngredient = this.recipeService.getRecipe(this.id).ingredients;

    this.recipeService.addIngredientsToShoppingList(selectedIngredient);

  }

  onDelete() {

    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);

  }
}
