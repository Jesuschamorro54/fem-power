import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ClickOutsideDdownDirective } from './directives/clickOutsideDdown.directive';
import { AwsS3Service } from './services/awsS3.service';
import { CutUserNamePipe, messageDate, notificationsDate, RoleName, ToLowerCase, UserClassName } from './pipes/shared.pipe';
import { SliderComponent } from './components/slider/slider.component';
import { DonateButtonComponent } from './components/donate-button/donate-button.component';


@NgModule({
  declarations: [
    // Components
    NavBarComponent,
    FooterComponent,
    SliderComponent,
    ClickOutsideDdownDirective,
    
    // Pipes
    RoleName, 
    UserClassName, 
    CutUserNamePipe, 
    notificationsDate, 
    messageDate, 
    ToLowerCase, SliderComponent, DonateButtonComponent
  ],
  
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],

  exports: [
    NavBarComponent,
    SliderComponent,
    FooterComponent,
    DonateButtonComponent,
    ClickOutsideDdownDirective,
  ],
  providers: [
    AwsS3Service
  ]
})
export class SharedModule { }
