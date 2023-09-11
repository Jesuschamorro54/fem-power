import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppService } from '../app.service';
import { AuthService } from '../auth/auth.service';
import { UserData } from '../models/auth.models';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  restricted = false;
  userData: UserData

  constructor(
    private http: HttpClient,
    private _appService: AppService,
    private _authService: AuthService
  ) { }


  
}
