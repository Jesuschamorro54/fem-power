import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppService } from '../app.service';
import { Observable, catchError, map, of, retry } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { UserData } from '../models/auth.models';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  /**Contiene la data del usuario que se está visitando el perfil */
  public userData: UserData;

  /**Valida si el perfil que se está visitando será restringido o no*/
  public restricted: Boolean;

  /** Id del usuario que está en la ruta */
  public userIdInRoute

  public loadingUserInfo = true;



  constructor(
    private http: HttpClient,
    private _appService: AppService
  ) { }


  private getHeaders(): any {
    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this._appService.token
    })

    return ({ headers: headers });
  }

  getUserData(): Observable<any> {

    const id = this.userIdInRoute;

    let url =  `${environment.urlAPI}/users`;
    url += this._appService.isUUID(id) ? `/"${id}"` : `/username/"${id}"`

    return this.http.get(url, this.getHeaders())
      .pipe(map((user: any) => {
        const { data, status } = user;

        if (status) {
          this.userData = this._appService.formmatDataUser(data[0]);
        }

        return {print: data, valid: status}
      }),
        retry(3),
        catchError(this.handleError<any>('getUserData', []))
      );
  }

  


  putProfile(id, data): Observable<any> {
    return this.http.put(`${environment.urlAPI}/users/profile/"${id}"`, { data }, this.getHeaders()).pipe(
    map((response: any) => {
      const {status, row_count} = response

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
      const {status, row_count} = response

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
