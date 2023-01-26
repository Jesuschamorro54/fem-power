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

  constructor (
    private _authService: AuthService,
    public _appService: AppService,
  ) {
    

    // Verificar si hay un usuario con la sessión abierta
    this._authService.isUserAuthenticated().subscribe();
  }

  ngOnInit() {}

}
