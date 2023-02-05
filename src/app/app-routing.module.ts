import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreloadingStrategyService } from './preloading-strategy.service';
import { HomeGuard } from './shared/guards/home.guard';

const APP_ROUTES: Routes = [
  
  // Modules
  { path: 'auth', data: { preload: true, loadAfterSeconds: 1 }, loadChildren: () => import('./auth/auth.module').then(mod => mod.AuthModule), canActivate: [] },
  { path: 'fem', data: { preload: true, loadAfterSeconds: 1 }, loadChildren: () => import('./landing-pages/landin.module').then(mod => mod.LandinModule), canActivate: [] },

  // { path: '', redirectTo: 'fem', pathMatch: 'full'},
  { path: '**', redirectTo: 'fem', pathMatch: 'full' },
];


export const AppRoutingModule = RouterModule.forRoot(APP_ROUTES, { preloadingStrategy: PreloadingStrategyService });
