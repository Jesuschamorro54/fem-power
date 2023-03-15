import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

  @Input() preview: Boolean;

  filters = [
    {label: 'Recientes', value: 'recents'},
    {label: 'Destacados', value: 'relevant'}
  ]
  filterSelected:any = this.filters[0]

  constructor() { }

  ngOnInit(): void {
  }

}
