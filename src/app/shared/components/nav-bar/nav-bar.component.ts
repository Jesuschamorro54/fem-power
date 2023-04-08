import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  showProfile: Boolean = false;
  showMenuOptions: Boolean = false;
  public responsive_menu = false;

  constructor(
    public _appService: AppService,
    public _authService: AuthService,
    private _router: Router
  ) { }

  ngOnInit(): void {
  }

  toggleProfile(): void {
    this.showMenuOptions = false
    this.showProfile = !this.showProfile;
  }

  toggleMenuOptions() {
    this.showProfile = false;
    this.showMenuOptions = !this.showMenuOptions;
  }

  goToProfile() {
    this._router.navigate(['/profile/' + this._appService.user_data.id])
    this.showProfile = false;
  }

  logout(url) {

    // this._appService.disconnectUserFromGraphQL().subscribe();

    // clearInterval(this._appService.heartbeatinterval);

    localStorage.clear();
    sessionStorage.clear();
    
    // this._appService.defaultGetsNavBar();
    
    this._authService.signOut();

    // this._appService.nextToken = null;
  }


  search(){
    
  }
}
