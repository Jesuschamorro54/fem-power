import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfilesRoutingModule } from './profiles-routing.module';
import { ProfilesComponent } from './profiles.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { SponsorComponent } from './components/sponsor/sponsor.component';
import { ProfileInformationComponent } from './components/profile-information/profile-information.component';


@NgModule({
  declarations: [
    ProfilesComponent,
    UserInfoComponent,
    PortfolioComponent,
    SponsorComponent,
    ProfileInformationComponent
  ],
  imports: [
    CommonModule,
    ProfilesRoutingModule
  ]
})
export class ProfilesModule { }
