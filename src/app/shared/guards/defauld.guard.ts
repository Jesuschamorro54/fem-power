import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AppService } from 'src/app/app.service';

@Injectable({
  providedIn: 'root'
})
export class DefauldGuard implements CanActivate {

  constructor (
    public _router: Router,
    private _appService: AppService
  ) {}

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot) {

    this._appService.loadingApp = false;


    this._appService.userAuthenticate.subscribe(data => {
      console.log(this._appService.cognitoUserAuthenticated)

      const {username} = this._appService.cognitoUserAuthenticated;

      if (localStorage.getItem('verifyUser')) {
        this._router.navigate(["/auth/federate-sign-up"], {queryParams: {username: username}});
      }else {
        this._router.navigate(["/home"])
      }

      this._appService.loadingApp = false;

      return true
    })

    return false;
  }
}
