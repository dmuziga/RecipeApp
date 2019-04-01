import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
   recipeValue = 'recipe';

  onclickRecipeMenu(recipeFeature: string) {
    this.recipeValue = recipeFeature;
  }

  ngOnInit(){
    firebase.initializeApp({

      apiKey: 'AIzaSyCbNzjXZ8M1BwEwpnfVljFjw8LFoZccnnU',
      authDomain: 'ng-recipe-book-626e9.firebaseapp.com'});

  }


}
