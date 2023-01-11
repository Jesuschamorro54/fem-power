import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { DataRegister } from 'src/app/models/auth.models';
import { AwsS3Service } from 'src/app/shared/services/awsS3.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _awsS3Service: AwsS3Service
  ) { }

  user_types = [
    {label: 'Seleccione el tipo de usuario', value: null},
    {label: 'Mujer rural', value: 'natural'},
    {label: 'Organización', value: 'company'},
    {label: 'Fundación', value: 'fundation'}
  ]
  type_select = {label: this.user_types[0].label, value: this.user_types[0].value}

  //Uploading variables
  uploading_file = false;

  // Message
  alert = {error: null, sucess: null}

  // Auth
  isConfirmed: boolean =  false;
  addUserData = {} as DataRegister;

  ngOnInit(): void {    
  }

  verifyData(form): void {
    console.log(form.value)
    
    let valid = true;

    this.alert.error = this.cleanObject(this.alert.error)

    if (form.value.name == "" || form.value.name == undefined){
      this.alert.error = "Por favor escribe tu nombre"
      valid = false;
      return
    }

    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(form.value.email))){
      this.alert.error = "Verifica la dirección de correo electronico"
      valid = false;
      return
    }

    if (form.value.password == undefined || form.value.password?.length < 8) {
      this.alert.error = "La contraseña debe tener minimo 8 digitos"
      valid = false;
      return
    }

    if (this.addUserData.type == 'natural' && (form.value.fundation_code == '' || form.value.fundation_code == null) ){
      this.alert.error = "Debe escribir el código proporcionado por la fundación"
      valid = false
      return
    }

    if (this.addUserData.type == 'company' && (this.addUserData.certificate == '' || this.addUserData.certificate == null)){
      this.alert.error = "Por favor adjunte el certificado"
      valid = false;
      return
    }

    this.addUserData.email = form.value.email;
    this.addUserData.password = form.value.password;
    this.addUserData.name = form.value.name;
    this.addUserData.code = "";

    if (valid) this.signUp();

  }

  checkMandatoryFields(){}


  cleanObject(obj): Object {
    let result = {}
    
    for (const key in obj){

      switch (typeof obj[key]) {
        case "number":
          result[key] = 0
          break;
        case "string":
          result[key] = "";
          break;
        case "boolean":
          result[key] = false;
          break;

        case "object":
          result[key] = this.cleanObject(obj[key])
          break;
        default:
          break;
      }
    }
    return result
  }

  sending = false;
  signUp(): void {

    if (!this.sending) {
      this.sending = true;

      this._authService.signUp(this.addUserData).subscribe(signUpResponse => {
        
        this.sending = false;
        console.log("signUp() data: ", signUpResponse);

        if(signUpResponse != null){
          if (signUpResponse.status == 'ok'){
            this.addUserData['type'] = signUpResponse.user.type;
            this.isConfirmed = signUpResponse.user.userConfirmed;

            if (!this.isConfirmed) {

              let username_encrypt = window.btoa(JSON.stringify({ 
                username: this.addUserData.email, 
                type: this.addUserData.type, 
                password: this.addUserData.password
              }));

              console.log("Registrado")

              this._router.navigate(['auth/confirm'], {queryParams: {token: username_encrypt}})

            }
          }
        }
      })
    }
  }


  addFile(event){

    this.uploading_file = true;

    let fileList: FileList = event.target.files; //obtiene el file  del input html

    let fileInput = event.target;
    let filePath = event.target.value;

    var allowedImageExtensions = /(\.pdf|\.docx|\.doc|\.odt)$/i;

    if (!allowedImageExtensions.exec(filePath)) {
      // alert('Please upload file having extensions .jpeg, .jpg, .png, .gif only.');            
      fileInput.value = '';
      this.alert.error = 'El formato del documento no es válido.'
      console.log("error")
    }

    else {

      this.uploading_file = true;

      const { size, name, type } = fileList[0];
      
      let file: any;

      if (fileList.length > 0){
        //valida que el size del file sea <= 250mb
        if ((size <= (1024 * 1024 * 250))){

          let icon = document.getElementById("icon-input-upload");
          let label = document.getElementById('input-upload-label');

          let extension = name.toLowerCase().split('.').pop();
          let tokenhash = this._authService.generateRandomString();

          file = {
            size: size,
            file_type: type,             
            file_ext: extension,
            file_name:  `certificate-${tokenhash}.${extension}` //asigna el nombre file
          }

          this.addUserData.certificate = file.file_name;

          // Se toma el Id del usuario que está logueado
          
          // const { User } = this._authService.userData;

          // Ruta del archivo donde se va a guardar el archivo
          let fileKey = `Certificates/` + file.file_name;

          // Preparamos el objeto para subir en s3
          const params = {
            Bucket: 'fempower',
            Key: fileKey,
            Body: fileList[0],
            ContentType: file.file_type
          };
          let options = { partSize: 5 * 1024 * 1024, queueSize: 1 };

          const command = new PutObjectCommand(params)

          this._awsS3Service.getS3Bucket().send( command, (error, data) => {

            if (error) {
              // ('There was an error uploading your file: ', err);
              this.alert.error = 'Ocurrió un error al subir el documento. Por favor recargue y vuelva intentarlo'
              console.log(error);
              return false;
            } 
          
            label.innerHTML = name;
            icon.className = 'icon-checkmark'
            this.uploading_file = false;
            return true
          });

          


        }
      }
      
    
      console.log(fileList)
    }

  }

}
