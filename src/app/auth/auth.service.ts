import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from 'aws-amplify';
import { from, Observable } from 'rxjs';
import { AppService } from '../app.service';
import { UserData } from '../models/auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public dataLogin = { email: '', password: '', }

  /** Token del usuario logueado*/
  public token;

  /** Contiene los datos del usuario logueado */
  public userData: UserData

  /** Contiene los datos de la sessión del usuario autenticado */
  public userLogged: any


  constructor(
    private http: HttpClient,
    private _appService: AppService
  ) { }

  /**
   * 
   * @param addData Los datos para registrar al usuario `name` `username` `password`
   * ___
   * @returns  - En caso de ser exitoso retorna {'ok', user} si no {'error', error}
   */
  public signUp(addData): Observable<any> {

    let token = window.btoa(addData.password)
    let type;

    let data: any = {
      username: addData.email,
      password: addData.password,
      clientMetadata: {
        // 'address':addData.address
      },
      attributes:{
        name:addData.name,
        'custom:city':addData.city,
        'custom:identification':addData.identification,
        'address':addData.address
        
      }
    }

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
                this._appService.user_data = JSON.parse(JSON.stringify(session.idToken.payload));
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

  public getUser(): Observable<any> {
    return from(Auth.currentUserInfo().then(user => {
      console.log("Current user: ", user)
    }));
  }

  public generateRandomString() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 12; i++)text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }


}

