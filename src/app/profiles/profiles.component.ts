import { Component, OnInit, ViewChild } from '@angular/core';
import { ProfileService } from './profile.service';
import { AuthService } from '../auth/auth.service';
import { AppService } from '../app.service';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent implements OnInit {

  @ViewChild(UserInfoComponent) __userInfoProfile: UserInfoComponent;

  currentTab = {
    informationTab: true,
    communityTab: false,
    portfolioTab: false,
    galleryTab: false,
    eventsTab: false
  }

  constructor(
    private _profileService: ProfileService,
    private _authService: AuthService,
    private _appService: AppService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    setTimeout(() => {
      this._profileService.userIdInRoute = this.route.snapshot.params['id']
      this._profileService.loadingUserInfo = true;


      this._profileService.restricted = Boolean(
        this._appService.user_data.id != this._profileService.userIdInRoute &&
        this._appService.user_data.username != this._profileService.userIdInRoute
      )

      this._authService.getUserData().subscribe(response => {

        const { print, valid } = response;

        if (valid) {
          const { User, Profile } = print;

          /* Si el usuario logueado está visitando su propio perfil, se llena la data del profile con la data que se trajo del auth */
          if (!this._profileService.restricted) this._profileService.userData = this._authService.userData;

          this.__userInfoProfile.setUserDataProfile()
        }
      })
    }, 500);

    





  }

  toggleTabs(selectedTab) {
    Object.keys(this.currentTab).forEach(tab => this.currentTab[tab] = Boolean(selectedTab == tab))
  }

}
