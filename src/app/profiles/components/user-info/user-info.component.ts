import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  constructor(
    private _appService: AppService,
    private _authService: AuthService,
  ) { }

  ngOnInit(): void {

    this._authService.getUserData().subscribe(response => {
      console.log(response)
    })

  }

}
