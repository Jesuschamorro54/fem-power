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

    const { valid, session, print } = this._appService.getUserData();

    return true

    // // Cognito User
    // if (valid) {
    //   // User with session
    //   if (session == 1) {
    //     const { certification_id } = print;
    //     // User with certification
    //     if (certification_id && certification_id != '0' && certification_id != '-1') {
    //       // Show nav bar and footer
          
    //       // Init gets nav bar
          
    //       // Go
    //       return true;
    //     }
    //   } else {
    //     // Identify error in main route
    //     if (state.url.includes('error_description')) {
    //       if (state.url.includes('ERR11')) {
            
    //       }
    //       // Error email facebook
    //       return this._router.parseUrl('/auth/login');
    //     }
    //   }
    //   // User without session or without certification  
    //   return this._router.parseUrl('/home');
    // }
    // // Cognito User error
    // return this._router.parseUrl('/home');
  }


}
