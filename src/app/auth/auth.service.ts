import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Amplify, Auth } from 'aws-amplify';
import { catchError, from, map, Observable, of, retry, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppService } from '../app.service';
import { DataRegister, User, UserData } from '../models/auth.models';
import awsconfig from '../../aws-exports';
import { Route, Router } from '@angular/router';

Amplify.configure(awsconfig);

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public dataLogin = { email: '', password: '', }

  UrlLambdaApi = environment.urlAPI;

  toVerifyUser = false;

  /** Token del usuario logueado*/
  public token;

  /** Contiene los datos del usuario logueado */
  public userData: UserData;
  public loadingUserData: Boolean = true;
  public userDataSubject: Subject<any> = new Subject();

  /** Contiene los datos de la sessión del usuario autenticado */
  public userLogged: any


  constructor(
    private http: HttpClient,
    private _appService: AppService,
    private _route: Router
  ) { }


  private getHeaders(): any {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    })

    return ({ headers: headers });
  }


  /**
   * 
   * @param addData Los datos para registrar al usuario `name` `username` `password`
   * ___
   * @returns  - En caso de ser exitoso retorna {'ok', user} si no {'error', error}
   */
  public signUp(addData: DataRegister): Observable<any> {

    let token = window.btoa(addData.password)
    let type;

    let data: any = {
      username: addData.email,
      password: addData.password,
      clientMetadata: {
        role: addData.type,
        cellphone: addData.cellphone,
        certificate: addData.certificate,
        // fundation_code: addData.fundation_code
      },
      attributes: {
        // token,
        name: addData.name,
      }
    }

    console.log("data to save: ", data)

    return from(Auth.signUp(data).then((user: any) => {
      return { status: 'ok', user }
    }).catch(error => { return { status: 'ok', error } })
    );
  }

  /**
   * 
   * @param email 
   * @returns 
   */
  public resendConfirmationCode(email): Observable<any> {
    return from(Auth.resendSignUp(email).then(response => {
      return { status: 'ok', res: response }
    }).catch(error => {
      return { status: 'error', res: error }
    })

    )
  }

  /**
   * 
   * @param dataConfirm Se debe enviar un objeto que incluya `email` y `code`
   * @returns - En caso de ser exitoso retorna {'ok', user} sino {'error', error}
   */
  public confirmSignUp(dataConfirm): Observable<any> {
    return from(Auth.confirmSignUp(dataConfirm.email, dataConfirm.code).then((confirm: any) => {
      return { status: 'ok', confirm }
    }).catch(error => {
      return { status: 'error', error }
    })
    );
  }

  /**
   * Metodo para cerrar la session del usuario
   * @returns - A promise resolved if success
   */
  public signOut(): Observable<any> {
    return from(Auth.signOut().then(() => {

      if (navigator.credentials && navigator.credentials.preventSilentAccess) {
        // Turn on the mediation mode so auto sign-in won't happen
        // until next time user intended to do so.
        navigator.credentials.preventSilentAccess();
      }

      this.userLogged = null;
      this.token = null;

      this._appService.cognitoUserAuthenticated = [];
      this._appService.setUserData([]);

      sessionStorage.clear();
      localStorage.clear();

    }));
  }

  /**
   * Metodo utilizado para conocer si el usuario se encuentra autenticado
   * en cognito. En caso de encontrar una session abierta agrega los datos
   * a `_appService.user_data` y ejecuta el metodo `setUserData()` de AppService
   * @returns 
   */
  isUserAuthenticated(): Observable<any> {

    return from(Auth.currentAuthenticatedUser().then(user => {

      const cognitoUser = JSON.parse(JSON.stringify(user));

      this.userLogged = JSON.parse(JSON.stringify(user))
      this.token = this.userLogged.signInUserSession.idToken.jwtToken;

      console.log("SESSION: ", cognitoUser)

      this.currentSession().subscribe((session: any) => {
        let { currentSession, status } = session;

        // El usuario está autenticado
        switch (status) {
          case 'ok':

            const { signInUserSession } = cognitoUser;

            // Se le refresca la session
            if (signInUserSession != null) {
              user.refreshSession(currentSession.refreshToken, (err, session) => {

                let user_data = JSON.parse(JSON.stringify(session.idToken.payload));
        
                /* aqui hacer el cambio de imagen en caso que el usuario haya subido una*/ 
                let urlAvatar = `${environment.s3PublicUrl}Users`;        
                user_data.picture = user_data.image == '' ? user_data.picture : `${urlAvatar}/${user_data.id}/${user_data.image}`

                this._appService.user_data = user_data;
              })
            }

            this._appService.setUserData(cognitoUser);

            break;

          case 'error':

            this._appService.cognitoUserAuthenticated = [];
            this._appService.setUserData([]);

            break;

          default:
            break;
        }
      })

    }).catch(err => {
      console.log(err)
      this._appService.cognitoUserAuthenticated = [];
      this._appService.setUserData([]);
    }));
  }

  /**
   * ### Login
   * @param dataLogin Se esperan parametros como `email` y `password`
   * @returns  
   * ```
   * if (suscess) 
   *  return {status: 'ok', _res}
   * else 
   *  return {status: 'error', _res}
   * ```
   */
  public signIn(dataLogin): Observable<any> {
    let token = window.btoa(dataLogin.password);
    let username;
    let type;

    username = dataLogin.email

    return from(Auth.signIn(username, dataLogin.password).then((user: any) => {
      this.userLogged = JSON.parse(JSON.stringify(user));
      this._appService.setUserData(JSON.parse(JSON.stringify(user)));
      this.token = this.userLogged.signInUserSession.idToken.jwtToken;

      const { payload } = this.userLogged.signInUserSession.idToken;

      return { status: 'ok', _res: user }

    }).catch(error => { return { status: 'error', _res: error } }));
  }

  /**
   * Devuelve el estado de la session de un usuario en un dispositivo
   * @returns Retorna {ok, `currentSession`} en caso de encontrar una session abierta
   */
  currentSession(): Observable<any> {
    return from(Auth.currentSession()
      .then(currentSession => {

        return { status: 'ok', currentSession };

      })
      .catch(error => {

        return { status: 'error', error };

      })
    )
  }

  verifyFundationCode(data): Observable<any> {
    return this.http.post(`${this.UrlLambdaApi}/users/verify-code`, { data }, this.getHeaders()).pipe(

      map((response: any) => {

        const { status, data } = response;;

        return { valid: status, data: data }

      }),
      catchError(error => {
        return of(error)
      })
    );
  }

  public federatedSignIn(customProvider) {

    return from(Auth.federatedSignIn({ customProvider }).then((response: any) => {

      return { status: 'ok', response }
    }).catch(error => {
      return { status: 'error', error }
    }))
  }

  public getUser(): Observable<any> {
    return from(Auth.currentUserInfo().then(user => {
      console.log("Current user: ", user)
    }));
  }

  getUserData(): Observable<any> {

    const { id } = this._appService.user_data;

    return this.http.get(`${environment.urlAPI}/users/"${id}"`, this.getHeaders())
      .pipe(map((user: any) => {
        const { data, status } = user;

        if (status) {
          this.userData = this._appService.formmatDataUser(data[0]);
          this.userDataSubject.next(this.userData)
        }

        return { print: data, valid: status }
      }),
        retry(3),
        catchError(this.handleError<any>('getUserData', []))
      );
  }

  

  public generateRandomString() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 12; i++)text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.log('%cerror::', 'color:red', error); // log to console instead

      return of(result as T);
    };
  }


}

