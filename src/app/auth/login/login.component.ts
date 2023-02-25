import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataLogin } from 'src/app/models/auth.models';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  dataLogin = {email: "", pass:""}
  errormessage = ""

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private router: ActivatedRoute,
  ) { }

  ngOnInit(): void {
  }

  verifyData(form) {
    // console.log("Verificando...", form.value)
    let valid = true;
    this.errormessage = ""

    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(form.value.email))){
      this.errormessage = "Verify your email"
      valid = false;
    }

    if (form.value.password.length < 8) {
      this.errormessage = "Your password must have at least 8 characters"
      valid = false
    }

    let data = {
      email: form.value.email,
      password: form.value.password,
      code: "",
      name: "",
    }

    if(valid) this.loginUser(data);

  }


  loginUser(user: DataLogin) {
    this._authService.signIn(user).subscribe(response => {
      const {status, _res} = response;

      console.log("response: ", _res)
      
      if (status == 'ok'){
        this._router.navigate(['home'])
      }

      if (status == 'error') {

        if (_res.toString().includes("UserNotConfirmedException")){

          let username_encrypt = window.btoa(JSON.stringify({ 
            username: user.email,
            password: user.password
          }));

          this._authService.resendConfirmationCode(user.email).subscribe((response:any) => {
            const {status, res} =  response;

            if (status == "ok"){
              this._router.navigate(['user/confirm'], {queryParams: {token: username_encrypt}})
            }else{
              this.errormessage = res;
            }

          })
          
        }

        this.errormessage = _res.message;

      }
    })
  }

  federatedLogin = {
    Facebook: false,
    Google: false
  };

  /** Esta es la funcion que redirecciona a google para realizar la autenticación */
  federatedSignIn(customProvider) {
    if (!this.federatedLogin[customProvider]) {
      this.federatedLogin[customProvider] = true;

      this._authService.federatedSignIn(customProvider).subscribe();
    }
  }

  

}
