import { Component, OnInit } from '@angular/core';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { AppService } from 'src/app/app.service';
import { AuthService } from 'src/app/auth/auth.service';
import { UserData, imageDefault, profile_empty, user_empty } from 'src/app/models/auth.models';
import { ScaleResolutionImg } from 'src/app/shared/pipes/shared.pipe';
import { AwsS3Service } from 'src/app/shared/services/awsS3.service';
import { ProfileService } from '../../profile.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  constructor(
    private _awsS3Service: AwsS3Service,
    private _appService: AppService,
    private _authService: AuthService,
    public _profielService: ProfileService
  ) { }

  // Loaders
  loadingUserData = true;

  // Edition 
  model: UserData = {User: user_empty, Profile: profile_empty}
  message
  editionMode = false;
  uploading_cover = false;
  uploading_avatar = false;

  userData: UserData
  photoDefault = imageDefault;

  ngOnInit(): void {
    this._authService.getUserData().subscribe(response => {
      this.userData = {...response[0]};

      // Cover
      if (this.userData.Profile.cover) {
        this.userData.User.image = this.getImageUrl(this.userData.User.image);   
      }

      if (this.userData.User.image){
        this.userData.Profile.coverUrl = this.getImageUrl(this.userData.Profile.cover);
        
        let source =  this.userData.User.image.includes('google') ? 'google' : '';
        
        this.userData.User.image = new ScaleResolutionImg().transform(this.userData.User.image, source, 200)
      }

      this.model.User = {...this.userData.User};
      this.model.Profile = {...this.userData.Profile};
      

      console.log("::userdata::", this.userData)

      setTimeout(() => {
        this.loadingUserData = false;
      }, 300);
      
    })
  }

  getImageUrl(name){
    return environment.s3PublicUrl + `Users/${this.userData.User.id}/${name}`
  }

  editProfile() {

    // Para el usuario
    if (this.model.User != this.userData.User){
      
      let data1  = this.getchanges('User');

      if (Object.keys(data1).length > 0) {
        console.log("User", data1)
        this._profielService.putUser(data1).subscribe(response => {
          if (response.valid){
            this.userData.User = {...this.model.User}
            this.editionMode = false;
            this.cover_data = null
          }
        })
      }      
    }

    // Para el profile
    if (this.model.Profile != this.userData.Profile){      
      
      let data2 = this.getchanges('Profile');

      if (Object.keys(data2).length > 0){


        this._profielService.putProfile(this.userData.Profile.id, data2).subscribe(response => {
          this.userData.Profile = {...this.model.Profile}

          if(this.cover_data) this.userData.Profile.coverUrl = this.cover_data.Location; 

          this.editionMode = false;
          this.cover_data = null
        })
      }
      

      

    }

  }

  cover_data = null;
  addFile(event) {

    this.uploading_cover = true;
    this.cover_data = null

    let element_id = event.target.id;
    let fileInput = event.target;
    let filePath = event.target.value;
    let fileList: FileList = event.target.files; //obtiene el file  del input html

    var allowedImageExtensions = /(\.jpg|\.jpeg|\.png)$/i;

    if (!allowedImageExtensions.exec(filePath)) {
      // alert('Please upload file having extensions .jpeg, .jpg, .png, .gif only.');
      fileInput.value = '';
      this.message = { status: false, text: 'El formato de la imagen no es válido.' }
      this.uploading_cover = false;
      return false;
    }

    let file: any;
    if (fileList.length > 0) {

      const { size, name, type } = fileList[0];

      if ((size <= (1024 * 1024 * 250))) {//valida que el size del file sea <= 250

        let extension = name.toLowerCase().split('.').pop();
        let tokenhash = this._authService.generateRandomString();

        file = {
          size: size,
          file_type: type,//asigna el nombre file
          file_ext: extension,
          file_name: element_id == 'ipt-user-photo' ? `avatar-${tokenhash}.${extension}` : `userCover-${tokenhash}.${extension}`
        }

        let folderKey = `Users/${this._appService.user_data.id}/${file.file_name}`;

        const params = {
          Bucket: 'fempower-public',
          Key: folderKey,
          Body: fileList[0],
          ContentType: file.file_type
        };

        const options = { partSize: 5 * 1024 * 1024, queueSize: 1 };
        const command = new PutObjectCommand(params)

        this._awsS3Service.getS3Bucket().send(command, (error, data) => {

          if (error) {
            // this.alert.error = 'Ocurrió un error al subir el documento. Por favor recargue y vuelva intentarlo'
            console.log(error);
            return false;
          }

          if(element_id == 'ipt-cover-photo') {

            this.cover_data = { params, options, file, Location: environment.s3PublicUrl + folderKey }
            this.model.Profile.cover = this.cover_data.file.file_name
            this.uploading_cover = false;

          } else {

            this.model.User.image = file.file_name;
            this.uploading_avatar = false;

            this.editProfile();

          }
          
          return true
        });


      } else {
        this.cover_data = null
        this.message = { status: false, text: 'Su archivo supera los 250MB' };//le asigna msj de error al  del input file, cuando supero los 250 megas
        return false
      }
    }

    return true

  }

  setCover(){

  }

  getchanges(ob) {

    let data = {}

    let original
    let model_value

    Object.keys(this.userData[ob]).forEach(key => {


      original = this.userData[ob][key]
      model_value = this.model[ob][key]

      // Para comparar imagenes de google
      if(key == 'image' && original.includes('google')){ 
        original = original.split("=s")[0]
        model_value = model_value.split("=s")[0]
      }
      
      if ( original != model_value) {
        data[key] = this.model[ob][key]
      }
    });

    return data
  }

}
