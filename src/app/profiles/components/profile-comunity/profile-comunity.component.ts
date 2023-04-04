import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-community',
  templateUrl: './profile-comunity.component.html',
  styleUrls: ['./profile-comunity.component.scss']
})
export class ProfileComunityComponent implements OnInit {

  constructor() { }

  currentTab = {
    myFollows: true,
    followers: false
  }

  ngOnInit(): void {
  }

  toggleTabs(selectedTab){
    Object.keys(this.currentTab).forEach(tab => this.currentTab[tab] = Boolean(selectedTab == tab))
  }

}
