import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AppService } from 'src/app/app.service';

@Injectable({
  providedIn: 'root'
})
export class ConfirmAccountWithCodeGuard implements CanActivate {

  constructor(
    private _router: Router,
    private _appService: AppService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (!this._appService.cognitoUserAuthenticated) return this._router.parseUrl('/fem/home');

    if (!this._appService.user_confirmed_account){
      return true
    }

    return this._router.parseUrl('/fem/home');



  }
  
}
