import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {

  constructor(
    private _appService: AppService,
    private _authService: AuthService
  ) {

  }

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    console.log("accediendo a la ruta home")
    console.log(this._appService.user_session)

    console.log(this._appService.cognitoUserAuthenticated)

    return true;
  }
  
}
