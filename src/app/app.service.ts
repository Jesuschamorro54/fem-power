import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  /** Token ID del usuario */
  public token: string | null;

  /** Variable que contiene la data del usuario logueado de cognito*/
  public user_data: any;

  /** -1: No autenticado 0: No en sessión 1: En session */
  public user_session: number = -1;

  /**Cargar los headers de la petición */
  private getHeaders(): any {
    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token
    })

    return ({ headers: headers });
  }


  // TODO





  // END TODO
  

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.log('%cerror::', 'color:red', error); // log to console instead
      
      return of(result as T);
    };
  }
}
