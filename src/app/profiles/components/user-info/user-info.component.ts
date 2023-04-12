import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { AuthService } from 'src/app/auth/auth.service';
import { UserData, imageDefault } from 'src/app/models/auth.models';

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


  userData: UserData
  photoDefault = imageDefault;

  ngOnInit(): void {

    this._authService.getUserData().subscribe(response => {
      this.userData = response[0];
      console.log("userData:", this.userData)
      
    })

  }

}
