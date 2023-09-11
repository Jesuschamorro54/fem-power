import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { UserData } from 'src/app/models/auth.models';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss']
})
export class LeftMenuComponent implements OnInit {

  public community: Boolean = false;
  public user: UserData

  constructor(
    public _authService: AuthService
  ) { }

  ngOnInit(): void {
    this._authService.getUserData().subscribe(data => {
      console.log(data)
      this.user = data.print[0]; 
    })
  }

  change_community(){
    this.community= !this.community;
  }
}
