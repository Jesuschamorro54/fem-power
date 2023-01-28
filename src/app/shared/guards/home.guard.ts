import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {

  constructor(
    private _router: Router,
    private _appService: AppService,
  ) {}

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    this._appService.loadingApp = true;

    const { valid, session, print, user } = this._appService.getUserData();

    console.log("guard", user)

    // Cognito User
    if (valid) {
      // User with session
      if (session == 1) {

        this._appService.loadingApp = false;

        if (user.attributes['custom:data_confirmation'] == "0" && this._appService.user_confirmed_account_attemps == 0) {
          this._appService.user_confirmed_account = false;
          this._appService.user_confirmed_account_attemps = 1;
          return this._router.parseUrl('/auth/confirm-registration');
        }

        return true

      } 
      // User without session  
      this._appService.loadingApp = false;
      return true
    }
    // Cognito User error
    this._appService.loadingApp = false;
    return true

  }
  
}
