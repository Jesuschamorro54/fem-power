import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-confirm-registration',
  templateUrl: './confirm-registration.component.html',
  styleUrls: ['../auth.component.scss']
})
export class ConfirmRegistrationComponent implements OnInit {

  constructor(
    private _authService: AuthService,
    private _route: ActivatedRoute,
    public _router: Router,
  ) { }

  haveEmailToConfirm = false;
  dataConfirm = {
    email: '',
    code: '',
    type: null,
    password: null
  }

  message = {text: "", type: ""}

  ngOnInit(): void {

    let token:any = this._route.snapshot.queryParamMap.get('token')

    if (token){

      token = window.atob(token);
      let user_data = JSON.parse(token);
      
      this.dataConfirm.email = user_data.username;
      this.dataConfirm.type = user_data.type;
      this.dataConfirm.password = user_data.password;
      this.haveEmailToConfirm = true;
    }else {
      this._router.navigate(['/auth/login'])
    }
  }

  verifyEmail(form) {
    // console.log(form.value)
    this.message = {text: "", type: ""}

    if (form.value.code != "" && this.haveEmailToConfirm){

      this._authService.confirmSignUp(this.dataConfirm).subscribe(confirm => {

        console.log("Verify response: ", confirm);

        if (confirm.status == 'ok'){

          this.message.type = "SUCCESS"
          this.message.text = 'Su cuenta ha sido verficada exitosamente'
          setTimeout(() => this._router.navigate(['/home']), 500);

        }else{
          this.message.type = "ERROR"
          this.message.text = 'Su cuenta no ha podido ser verificada'
        }
      });
      
    }else{

      this.message.type = "ERROR"
      this.message.text = 'No se encontró ningún dato para verificar'

    }
  }

}
