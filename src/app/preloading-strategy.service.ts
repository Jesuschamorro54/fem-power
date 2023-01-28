import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route, Router } from '@angular/router';
import { Observable, of, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PreloadingStrategyService implements PreloadingStrategy{

  constructor(private router: Router) { }

  preload(route: Route, fn: () => Observable<any>): Observable<any> {
      const loadRoute = (delay) => delay > 0 ? timer(delay * 1000).pipe(switchMap(() => fn())) : fn();
      if (route.data && route.data['preload'] && (!this.router.url.includes('/fem')) && (!this.router.url.includes('/auth'))) {
          const delay = route.data['loadAfterSeconds'] ? route.data['loadAfterSeconds'] : 0;

          return loadRoute(delay);
      }
      return of(null);
  }
}
