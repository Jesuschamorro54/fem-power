import { NONE_TYPE } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(
    private _authService: AuthService
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
  alert = {error: null, sucess: null
  }


  ngOnInit(): void {    
  }

  addFile(event){

    this.uploading_file = true;

    let fileList: FileList = event.target.files; //obtiene el file  del input html

    let fileInput = event.target;
    let filePath = event.target.value;

    console.log(filePath)

    var allowedImageExtensions = /(\.pdf|\.docx|\.doc|\.odt)$/i;

    if (!allowedImageExtensions.exec(filePath)) {
      // alert('Please upload file having extensions .jpeg, .jpg, .png, .gif only.');            
      fileInput.value = '';
      this.alert.error = 'El formato del documento no es válido.'
      console.log("error")
    }

    else {

      const { size, name, type } = fileList[0];
      
      let file: any;

      if (fileList.length > 0){
        //valida que el size del file sea <= 250mb
        if ((size <= (1024 * 1024 * 250))){

          let extension = 'jpg' //name.toLowerCase().split('.').pop();
          let tokenhash = this._authService.generateRandomString();

          file = {
            size: size,
            file_type: type,             
            file_ext: extension,
            file_name:  `certificate-${tokenhash}.${extension}` //asigna el nombre file
          }

          // Se toma el Id del usuario que está logueado
          const { User } = this._authService.userData;

          // Ruta del archivo donde se va a guardar el archivo
          let fileKey = `Users/${User.id}/` + file.file_name;

          // Preparamos el objeto para subir en s3
          const params = {
            Bucket: 'fempower',
            Key: fileKey,
            Body: fileList[0],
            ContentType: file.file_type
          };
          let options = { partSize: 5 * 1024 * 1024, queueSize: 1 };

          


        }
      }
      
    
      console.log(fileList)
    }

  }

}
