import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { ConfirmRegistrationComponent } from './confirm-registration/confirm-registration.component';
import { FederateSignInComponent } from './federate-sign-in/federate-sign-in.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/auth/login', pathMatch: 'full'
  },

  {
    path: '', component: AuthComponent,
    children: [
      { path: 'login', component: LoginComponent, canActivate: [] },
      { path: 'sign', component: SignUpComponent },
      { path: 'confirm', component: ConfirmRegistrationComponent },
      { path: 'confirm-registration', component: FederateSignInComponent },
    ]
  },

  {
    path: '**', redirectTo: '/auth/login', pathMatch: 'full'
  },

  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
