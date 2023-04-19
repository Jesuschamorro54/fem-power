import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppService } from '../app.service';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

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
