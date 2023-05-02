import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AppService } from 'src/app/app.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileGuard implements CanActivate {

  constructor(private _appService: AppService, private _router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const { valid, session } = this._appService.getUserData();
    // Cognito User
    if (valid) {
      // User with session
      if (session == 1) {
        // Go
        return true;
      }
      // User session in -1
      return this._router.parseUrl('/auth/login');
    }
    // Cognito User error
    return this._router.parseUrl('/auth/login');
  }
  
}
