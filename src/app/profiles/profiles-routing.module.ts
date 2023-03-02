import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilesComponent } from './profiles.component';

const routes: Routes = [
  
  // { path: '', redirectTo: '/fem', pathMatch: 'full' },
  
  { path: ':id', component: ProfilesComponent },

  { path: '**', redirectTo: '/fem/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfilesRoutingModule { }
