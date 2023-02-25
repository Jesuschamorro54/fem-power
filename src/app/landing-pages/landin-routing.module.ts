import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandinComponent } from './landin.component';
import { StaticFundationComponent } from './static-fundation/static-fundation.component';
import { StaticHomeComponent } from './static-home/static-home.component';
import { StaticWomenComponent } from './static-women/static-women.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/fem/home', pathMatch: 'full'
  },

  {
    path: '', component: LandinComponent,
    children: [
      { path: 'home', component: StaticHomeComponent },
      { path: 'fundations', component: StaticFundationComponent },
      { path: 'women', component: StaticWomenComponent },
    ]
  },

  {
    path: '**', redirectTo: '/fem/home', pathMatch: 'full'
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandinRoutingModule { }
