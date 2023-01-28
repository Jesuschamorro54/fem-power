import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'fempower';

  constructor(
    private _router: Router,
    private _authService: AuthService,
    public _appService: AppService,
  ) {

    _appService.loadingApp = false;

    // Verificar si hay un usuario autenticado
    this._authService.isUserAuthenticated().subscribe();

  
    // if (!_appService.user_confirmed_account) {

    //   _appService.userAuthenticate.subscribe(user => {

    //     let confirmed = _appService.user_confirmed_account = user.attributes['custom:data_confirmation'] == "1";

    //     if (!confirmed) _router.navigate(["/auth/confirm-registration"])
        
    //     _appService.loadingApp = false;
    //   });
    // }
  }

  ngOnInit() { }

}
