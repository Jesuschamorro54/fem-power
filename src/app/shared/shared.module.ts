import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ClickOutsideDdownDirective } from './directives/clickOutsideDdown.directive';
import { AwsS3Service } from './services/awsS3.service';
import { CutUserNamePipe, messageDate, notificationsDate, RoleName, ToLowerCase, UserClassName } from './pipes/shared.pipe';
import { InputSelectComponent } from './components/input-select/input-select.component';



@NgModule({
  declarations: [
    // Components
    NavBarComponent,
    FooterComponent,
    ClickOutsideDdownDirective,
    
    // Pipes
    RoleName, 
    UserClassName, 
    CutUserNamePipe, 
    notificationsDate, 
    messageDate, 
    ToLowerCase, InputSelectComponent
  ],
  
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],

  exports: [
    NavBarComponent,
    FooterComponent,
    ClickOutsideDdownDirective,
    InputSelectComponent
  ],
  providers: [
    AwsS3Service
  ]
})
export class SharedModule { }
