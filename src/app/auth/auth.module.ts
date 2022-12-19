import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { ConfirmRegistrationComponent } from './confirm-registration/confirm-registration.component';
import { SignUpComponent } from './sign-up/sign-up.component';



@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    ConfirmRegistrationComponent,
    SignUpComponent,
    
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule, ReactiveFormsModule,
  ]
})
export class AuthModule { }
