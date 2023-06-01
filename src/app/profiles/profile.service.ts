import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppService } from '../app.service';
import { Observable, Subject, catchError, map, of, retry } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { UserData } from '../models/auth.models';
import { Portfolio, UrlLambdaApi } from '../models/profile.models';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  /**Contiene la data del usuario que se está visitando el perfil */
  public userData: UserData;
  public userDataSubject: Subject<UserData> = new Subject();

  /**Valida si el perfil que se está visitando será restringido o no*/
  public restricted: Boolean;

  /** Id del usuario que está en la ruta */
  public userIdInRoute

  public loadingUserInfo = true;

  public portfolioData: Array<Portfolio>;
  public portfolioDataSubject: Subject<any> = new Subject();


  constructor(
    private http: HttpClient,
    private _appService: AppService,
    private _authService: AuthService
  ) { }


  private getHeaders(): any {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this._appService.token
    })

    return ({ headers: headers });
  }

  initUserInfoData(): Promise<UserData> {

    return new Promise(async (resolved, reject) => {

      const requestResolved = ({ print, valid }) => (valid) ? resolved(this.userData) : [];

      if (!this._authService.userData){
        this._authService.getUserData().subscribe(response => {
          (!this.restricted) ? resolved(this._authService.userData) : this.getUserData().subscribe(requestResolved);
        });
      } else {
        (!this.restricted) ? resolved(this._authService.userData) : this.getUserData().subscribe(requestResolved);
      }
    });

  }

  getUserData(): Observable<any> {

    const id = this.userIdInRoute;

    let url = `${UrlLambdaApi}/users`;
    url += this._appService.isUUID(id) ? `/"${id}"` : `/username/"${id}"`

    return this.http.get(url, this.getHeaders())
      .pipe(map((user: any) => {
        const { data, status } = user;

        if (status) {
          this.userData = this._appService.formmatDataUser(data[0]);
        }

        return { print: data, valid: status }
      }),
        retry(3),
        catchError(this.handleError<any>('getUserData', []))
      );
  }


  getPortfolio(): Observable<any> {
    return this.http.get(`${UrlLambdaApi}/users/"${this.userIdInRoute}"/portfolio`, this.getHeaders()).pipe(
      map((portfolio: any) => {
        const { data, status } = portfolio;

        this.portfolioData = data;
        this.portfolioDataSubject.next(data)

        return { print: data, valid: status }
      }),
      retry(3),
      catchError(this.handleError<any>('getUserData', []))
    );
  }


  putProfile(id, data): Observable<any> {
    return this.http.put(`${environment.urlAPI}/users/profile/"${id}"`, { data }, this.getHeaders()).pipe(
      map((response: any) => {
        const { status, row_count } = response

        return { valid: status, row_count }


      }),
      catchError((error: any) => {
        this.handleError('putUserAccount');
        return of({ status: false });
      })
    )
  }


  putUser(data): Observable<any> {
    return this.http.put(`${environment.urlAPI}/users/"${this._appService.user_data.id}"`, { data }, this.getHeaders()).pipe(
      map((response: any) => {
        const { status, row_count } = response

        return { valid: status, row_count }


      }),
      catchError((error: any) => {
        this.handleError('putUserAccount');
        return of({ status: false });
      })
    )
  }





  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.log('%cerror::', 'color:red', error); // log to console instead

      return of(result as T);
    };
  }
}
