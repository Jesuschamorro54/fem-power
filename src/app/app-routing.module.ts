import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './landing-pages/home/home.component';
import { StaticFundationComponent } from './landing-pages/static-fundation/static-fundation.component';
import { StaticWomenComponent } from './landing-pages/static-women/static-women.component';
import { HomeGuard } from './shared/guards/home.guard';

const routes: Routes = [
  
  // Modules
  { path: 'auth', data: { preload: true, loadAfterSeconds: 1 }, loadChildren: () => import('./auth/auth.module').then(mod => mod.AuthModule), canActivate: [] },
  
  
  // Components
  { path: '', component: HomeComponent},
  { path: 'home', component: HomeComponent, canActivate: [HomeGuard] },
  { path: 'fundations', component: StaticFundationComponent},
  { path: 'women', component: StaticWomenComponent},

  
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
