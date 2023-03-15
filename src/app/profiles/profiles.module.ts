import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfilesRoutingModule } from './profiles-routing.module';
import { ProfilesComponent } from './profiles.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { SponsorComponent } from './components/sponsor/sponsor.component';
import { ProfileInformationComponent } from './components/profile-information/profile-information.component';
import { ProfileComunityComponent } from './components/profile-comunity/profile-comunity.component';
import { ProfileGalleryComponent } from './components/profile-gallery/profile-gallery.component';
import { ProfileEventsComponent } from './components/profile-events/profile-events.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ProfilesComponent,
    UserInfoComponent,
    PortfolioComponent,
    SponsorComponent,
    ProfileInformationComponent,
    ProfileComunityComponent,
    ProfileGalleryComponent,
    ProfileEventsComponent
  ],
  imports: [
    CommonModule,
    ProfilesRoutingModule,
    SharedModule
  ]
})
export class ProfilesModule { }
