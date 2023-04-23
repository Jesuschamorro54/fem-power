import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../profile.service';
import { Profile } from 'src/app/models/auth.models';

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
  data_to_update: Profile = {};

  ngOnInit(): void {
    this._profileService.userDataSubject.subscribe(data => {
      this.profile = {...data.Profile};
      this.profileModel = {...data.Profile};

      console.log(this.profile)
    })
  }


  editProfile() {
    this.uploading = true;
    console.log("data: ", this.data_to_update)

    if (this.data_to_update){
      console.log(this.profile)
      this._profileService.putProfile(this.profile.id, this.data_to_update).subscribe(response => {
        
        Object.keys(this.data_to_update).forEach(key => {
          let value = this.data_to_update[key];
          this.profile[key] = value;
          this.profileModel[key] = value;
        });

        this.editionMode = false;
        this.uploading = false;
      })

    }



  }


  cancelEdition(){
    this.editionMode = false
    this.data_to_update = {}
    this.profileModel = {...this.profile}

  }

}
