import { Component, OnInit } from '@angular/core';
import { DataRegister } from 'src/app/models/auth.models';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { AwsS3Service } from 'src/app/shared/services/awsS3.service';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-federate-sign-in',
  templateUrl: './federate-sign-in.component.html',
  styleUrls: ['./federate-sign-in.component.scss']
})
export class FederateSignInComponent implements OnInit {

  //Uploading variables
  uploading_file = false;

  // Message
  alert: any = {error: null, sucess: null}

  // Auth
  addUserData: any = { type: null, fundation_code: null, certificate: null };

  constructor(
    private _route: ActivatedRoute,
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

  ngOnInit(): void {

    this._route.queryParams.subscribe(params => {
      console.log("params: ", params)
      this.customProvider = params['provider']
    })


  }

  verifyData(form): void {
    
    let valid = true;

    if (!this.addUserData.type) {
      this.alert.error = "Seleccione el tipo de usuario"
      valid = false
    }

    if (this.addUserData.type == 'natural' && (form.value.fundation_code == '' || form.value.fundation_code == null) ){
      this.alert.error = "Debe escribir el código proporcionado por la fundación"
      valid = false
      return
    }

    if (['company', 'fundation'].includes(this.addUserData.type) && (this.addUserData.certificate == '' || this.addUserData.certificate == null)){
      this.alert.error = "Por favor adjunte el certificado"
      valid = false;
      return
    }
    
    console.log(this.addUserData)

    if (valid) this.confirmUserRegisterData() 

  }

  customProvider
  federatedLogin = {
    Facebook: false,
    Google: false
  };

  confirmUserRegisterData() {

    // let username = localStorage.getItem()

    // this._authService.sendUserType(this.addUserData).subscribe(response => {
    //   const {valid, data} = response;

    //   console.log("Validado")
    // })
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
