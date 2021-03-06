import {NgModule} from '@angular/core';
import {HeaderComponent} from './header/header.component';
import {HomeComponent} from './home/home.component';
import {SharedModule} from '../shared/shared.module';
import {RecipeRoutingModule} from '../recipe-routing.module';

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent
  ], imports : [
    SharedModule,
    RecipeRoutingModule
  ],
  exports: [
    RecipeRoutingModule, HeaderComponent
  ]
})
export class CoreModule {}
