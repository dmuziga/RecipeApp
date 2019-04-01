import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{


  constructor(private authService: AuthService, private route: Router) {

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){

    if (!this.authService.isAuthenticated()) {
      this.route.navigate(['signin']);
    }


    return this.authService.isAuthenticated();
  }



}
