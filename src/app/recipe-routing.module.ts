import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Route, RouterModule, Routes} from '@angular/router';

import {RecipesComponent} from './recipes/recipes.component';
import {HomeComponent} from './home/home.component';
import {ShoppingListComponent} from './shopping-list/shopping-list.component';
import {RecipeStartComponent} from './recipes/recipe-start/recipe-start.component';
import {RecipeDetailComponent} from './recipes/recipe-detail/recipe-detail.component';
import {RecipeEditComponent} from './recipes/recipe-edit/recipe-edit.component';
import {SignupComponent} from './auth/signup/signup.component';
import {SigninComponent} from './auth/signin/signin.component';
import {AuthGuardService} from './auth/auth-guard.service';

const recipeRoutes: Routes = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {path: 'recipes', component: RecipesComponent, children: [
      {path: '', component: RecipeStartComponent},
      {path: 'new', component: RecipeEditComponent, canActivate: [AuthGuardService]},
      {path: ':id',  component: RecipeDetailComponent},
      {path: ':id/edit', component: RecipeEditComponent, canActivate: [AuthGuardService]}
    ]},
  {path: 'shopping-list', component: ShoppingListComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'signin', component: SigninComponent}
];
@NgModule({
  imports: [
    RouterModule.forRoot(recipeRoutes)
  ],
  exports: [RouterModule]
})
export class RecipeRoutingModule {

}