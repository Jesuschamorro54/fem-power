import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    NavBarComponent,
    FooterComponent
  ],
  
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],

  exports: [
    NavBarComponent,
    FooterComponent,
  ]
})
export class SharedModule { }
