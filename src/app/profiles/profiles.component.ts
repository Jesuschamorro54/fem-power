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

  ngOnInit(): void { }

  toggleTabs(selectedTab) {
    Object.keys(this.currentTab).forEach(tab => this.currentTab[tab] = Boolean(selectedTab == tab))
  }

}
