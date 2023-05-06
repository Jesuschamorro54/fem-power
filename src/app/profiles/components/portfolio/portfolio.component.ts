import { Component, Input, OnInit } from '@angular/core';
import { Portfolio } from 'src/app/models/profile.models';
import { ProfileService } from '../../profile.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

  @Input() preview: Boolean;

  portfolioData: Array<Portfolio>;

  filters = [
    {label: 'Recientes', value: 'recents'},
    {label: 'Destacados', value: 'relevant'}
  ]
  filterSelected:any = this.filters[0]

  constructor(
    private _profileService: ProfileService
  ) { }

  ngOnInit(): void {

    // this._profileService.getPortfolio().subscribe(response => {
    //   console.log("res: ", response)
    // });
  }

}
