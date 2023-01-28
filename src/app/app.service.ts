import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';



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

  /** Comprobar si el usuario está verificado */
  public user_confirmed_account = false;
  public user_confirmed_account_attemps = 0;


  /** Contiene los datos de la sessión del usuario autenticado -> line 18 */
  public cognitoUserAuthenticated: any;
  
  public loadingApp: Boolean = true;

  /**Cargar los headers de la petición */
  private getHeaders(): any {
    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token
    })

    return ({ headers: headers });
  }

  public getUserData() {
    if (this.cognitoUserAuthenticated) {
        if (this.cognitoUserAuthenticated.hasOwnProperty('signInUserSession')) {
            // User with session    
            return { valid: true, print: this.user_data, session: this.user_session, user: this.cognitoUserAuthenticated };
        } else {
            // User without session              
            return { valid: true, print: null, session: this.user_session, user: this.cognitoUserAuthenticated };
        }
    } else {
        // Error cognitoUserAuthenticated
        return { valid: false, print: null, session: this.user_session, user: this.cognitoUserAuthenticated };
    }
  }

  userAuthenticate: Subject<any> = new Subject();
  public setUserData(user) {
    
    this.cognitoUserAuthenticated = user;
    this.userAuthenticate.next(user);
    

    if (this.cognitoUserAuthenticated){

      if(this.cognitoUserAuthenticated.hasOwnProperty('signInUserSession')){
        
        this.token = user.signInUserSession.idToken.jwtToken;

        this.user_data = JSON.parse(JSON.stringify(this.cognitoUserAuthenticated.signInUserSession.idToken.payload));
        // User in session
        this.user_session = 1;
      }else{
        this.user_session = 0;
        this.user_data = []
      }
    }else{
      this.token = null
    }
    console.log("user_session: ", this.user_session)
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
