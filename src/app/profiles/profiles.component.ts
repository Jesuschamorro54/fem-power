import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent implements OnInit {

  currentTab = {
    informationTab: false,
    communityTab: false,
    portfolioTab: true,
    galleryTab: false,
    eventsTab: false
  }

  constructor() { }

  ngOnInit(): void {
  }

  toggleTabs(selectedTab){
    Object.keys(this.currentTab).forEach(tab => this.currentTab[tab] = Boolean(selectedTab == tab))
  }

}
