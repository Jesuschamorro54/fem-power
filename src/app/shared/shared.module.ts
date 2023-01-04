import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ClickOutsideDdownDirective } from './directives/clickOutsideDdown.directive';
import { AwsS3Service } from './services/awsS3.service';



@NgModule({
  declarations: [
    NavBarComponent,
    FooterComponent,
    ClickOutsideDdownDirective
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
  ],
  providers: [
    AwsS3Service
  ]
})
export class SharedModule { }
