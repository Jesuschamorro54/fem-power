import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Portfolio } from 'src/app/models/profile.models';
import { ProfileService } from '../../profile.service';
import { ModalCreatePostComponent } from 'src/app/shared/components/modal-create-post/modal-create-post.component';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

  @ViewChild(ModalCreatePostComponent) _modal: ModalCreatePostComponent;
  @Input() preview: Boolean;

  portfolioData: Array<Portfolio>;
  loading = true;

  filters = [
    {label: 'Recientes', value: 'recents'},
    {label: 'Destacados', value: 'relevant'}
  ]
  filterSelected:any = this.filters[0]

  constructor(
    private _profileService: ProfileService
  ) { }

  ngOnInit(): void {
    
    console.log('se inició')

    if (!this._profileService.portfolioData) {
      this._profileService.portfolioDataSubject.subscribe(data => {
        
        this.portfolioData = data.Portfolio
        this.loading = false;
      })
    }else{
      console.log('pre: ', this._profileService.portfolioData)
      this.portfolioData = this._profileService.portfolioData['Portfolio'];  
      this.loading = false;
    }
  }


  event_mdoal: any = {}
  openModalCreatePortfolio() {
    this.event_mdoal = {'name': 'projects', 'type': 'projects'}
  }

  createPortfolio(event){
    console.log("create portfolio", event)

    if(event) {

      this._profileService.postPortfolio(event).subscribe(response => {
        console.log(response)
      })
    }

    this._modal.closeModal()
  }

}
