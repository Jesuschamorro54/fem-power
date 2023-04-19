import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ClickOutsideDdownDirective } from './directives/clickOutsideDdown.directive';
import { AwsS3Service } from './services/awsS3.service';
import { CutUserNamePipe, messageDate, notificationsDate, RoleName, ScaleResolutionImg, ToLowerCase, UserClassName } from './pipes/shared.pipe';


import { InputSelectComponent } from './components/input-select/input-select.component';
import { DonateButtonComponent } from './components/donate-button/donate-button.component';
import { SliderComponent } from './components/slider/slider.component';
import { ModalCreatePostComponent } from './components/modal-create-post/modal-create-post.component';
import { SearchInputComponent } from './components/nav-bar/search-input/search-input.component';



@NgModule({
  declarations: [
    // Components
    NavBarComponent,
    FooterComponent,
    ClickOutsideDdownDirective,
    InputSelectComponent,
    SliderComponent, DonateButtonComponent,
    
    // Pipes
    RoleName, 
    UserClassName, 
    CutUserNamePipe, 
    notificationsDate, 
    messageDate, 
    ToLowerCase, ModalCreatePostComponent, SearchInputComponent, ScaleResolutionImg
    
  ],
  
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
  ],

  exports: [
    NavBarComponent,
    SliderComponent,
    FooterComponent,
    DonateButtonComponent,
    ClickOutsideDdownDirective,
    InputSelectComponent,
    ModalCreatePostComponent,
    ScaleResolutionImg
  ],
  providers: [
    AwsS3Service
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class SharedModule {}
