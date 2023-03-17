import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-gallery',
  templateUrl: './profile-gallery.component.html',
  styleUrls: ['./profile-gallery.component.scss']
})
export class ProfileGalleryComponent implements OnInit {

  constructor() { }

  currentTab = {
    myPhotos: true,
    otherPhotos: false
  }

  ngOnInit(): void {
  }



  toggleTabs(selectedTab){
    Object.keys(this.currentTab).forEach(tab => this.currentTab[tab] = Boolean(selectedTab == tab))
  }
}
