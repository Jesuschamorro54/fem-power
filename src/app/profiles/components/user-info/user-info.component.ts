import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { AppService } from 'src/app/app.service';
import { AuthService } from 'src/app/auth/auth.service';
import { UserData, imageDefault, profile_empty, user_empty } from 'src/app/models/auth.models';
import { AwsS3Service } from 'src/app/shared/services/awsS3.service';
import { ProfileService } from '../../profile.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { error, log } from 'console';
import { dataUploadFile } from 'src/app/shared/services/awsS3Models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  dataSubcription = Subscription

  constructor(
    private _awsS3Service: AwsS3Service,
    private _appService: AppService,
    public _profileService: ProfileService,
    private _location: Location,
  ) { }

  // Edition 
  model: UserData = { User: user_empty, Profile: profile_empty }
  message
  editionMode = false;
  uploading = false;
  uploading_cover = false;
  uploading_avatar = false;
  data_to_update = {}

  userData: UserData
  photoDefault = imageDefault;

  ngOnInit(): void {

    this._profileService.initUserInfoData().then((user: UserData) => {
      
      this.userData = JSON.parse(JSON.stringify(user));
      this.model = JSON.parse(JSON.stringify(user));
      this._profileService.loadingUserInfo = false;

      this.parseURL()

      console.log("::setUserDataProfile::", this.userData)
    });
    
  }

  parseURL() {
    if (this._appService.isUUID(this._profileService.userIdInRoute)) {
      this._location.go(`/profile/${this.userData.User.username}`);
    }
  }

  editProfile() {

    this.uploading = true;

    console.log("data:", this.data_to_update)

    // Para el usuario
    if (this.data_to_update.hasOwnProperty('User')) {

      let user = this.data_to_update['User'];

      if (Object.keys(user).length > 0) {
        console.log("User", user)
        this._profileService.putUser(user).subscribe(response => {
          if (response.valid) {
            this.userData.User = { ...this.model.User }

            if (this.avatar_data) this.userData.User.imageUrl = this.avatar_data.Location;

            this.editionMode = false;
            this.avatar_data = false;
            this.data_to_update = {}
            this.uploading = false;
          }
        })
      }
    }

    // Para el profile
    if (this.data_to_update.hasOwnProperty('Profile')) {

      let profile = this.data_to_update['Profile']

      if (Object.keys(profile).length > 0) {


        this._profileService.putProfile(this.userData.Profile.id, profile).subscribe(response => {
          this.userData.Profile = { ...this.model.Profile }

          if (this.cover_data) this.userData.Profile.coverUrl = this.cover_data.Location;

          this.editionMode = false;
          this.cover_data = null
          this.data_to_update = {}
          this.uploading = false;
        })
      }




    }

  }

  cover_data = null;
  avatar_data = null;
  addFile(event) {

    this.uploading_cover = true;
    this.cover_data = null;
    this.avatar_data = null;

    let params: dataUploadFile = {
      element_id: event.target.id,
      fileInput: event.target,
      filePath: event.target.value,
      fileList: FileList = event.target.files,
      folderKey: `Users/${this._appService.user_data.id}`,
      extension_type: 'img'
    }

    this._awsS3Service.uploadFileS3(params).then((result) => {

      const {status, data} = result 

      if (params.element_id == 'ipt-cover-photo') {

        this.cover_data = { Location: data.Location }
        this.data_to_update['Profile'] = { ...{ 'cover': data.file.file_name } };
        this.uploading_cover = false;

      } else {

        this.avatar_data = { Location: data.Location }
        this.data_to_update['User'] = { ...{ 'image': data.file.file_name } };
        this._appService.user_data.picture = data.Location;

        this.uploading_avatar = false;
        this.editProfile();

      }
    })

    return true
  }

  fieldEditing(ob, key, value) {
    this.data_to_update[ob] = { ...{ [key]: value } };
  }

}
