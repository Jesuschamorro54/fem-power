import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../profile.service';
import { Profile, UserData } from 'src/app/models/auth.models';

@Component({
  selector: 'app-profile-information',
  templateUrl: './profile-information.component.html',
  styleUrls: ['./profile-information.component.scss']
})
export class ProfileInformationComponent implements OnInit {

  profile: Profile;
  profileModel: Profile;

  constructor(
    public _profileService: ProfileService,
  ) { }

  // Editions variables
  uploading: Boolean = false;
  editionMode: Boolean = false;
  editionInfoMode: Boolean = false;
  data_to_update: Profile = {};

  ngOnInit(): void {
    this._profileService.initUserInfoData().then((user: UserData) => {
      this.profile = { ...user.Profile };
      this.profileModel = { ...user.Profile };
    });
  }

  // initData(): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     if (!this._profileService.userData){
  //       this._profileService.userDataSubject.subscribe(data => {
  //         resolve(data.Profile)
  //       });
  //     }
  //     else{
  //       resolve(this._profileService.userData.Profile)
  //     }
  //   });
  // }


  editProfile() {
    this.uploading = true;

    if (this.data_to_update){
      this._profileService.putProfile(this.profile.id, this.data_to_update).subscribe(response => {
        
        Object.keys(this.data_to_update).forEach(key => {
          let value = this.data_to_update[key];
          this.profile[key] = value;
          this.profileModel[key] = value;
        });

        this.editionMode = false;
        this.editionInfoMode = false;
        this.uploading = false;
      })

    }



  }

  openEdition(source) {
    this.editionMode = source == 'editionMode' ? true : false
    this.editionInfoMode = source == 'editionInfoMode' ? true : false
  }


  cancelEdition(source){
    this[source] = false
    this.data_to_update = {}
    this.profileModel = {...this.profile}

  }

}
