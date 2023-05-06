import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { AuthService } from 'src/app/auth/auth.service';
import { ProfileService } from 'src/app/profiles/profile.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileGuard implements CanActivate {

  constructor(
    private _appService: AppService,
    private _profileService: ProfileService,
    private _router: Router,
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const { valid, session } = this._appService.getUserData();
    // Cognito User
    if (valid) {
      // User with session
      if (session == 1) {

        // Tomar el id que viene en la url
        const idInRoute  = state.url.split("/")[2]
        const isUUID = this._appService.isUUID(idInRoute)
        const restricted =  isUUID ? Boolean(this._appService.user_data.id != idInRoute) : Boolean(this._appService.user_data.username != idInRoute);

        // Inicializar el restricted y el userIdInRoute
        this._profileService.loadingUserInfo = true;
        this._profileService.restricted = restricted;
        this._profileService.userIdInRoute = idInRoute;


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
