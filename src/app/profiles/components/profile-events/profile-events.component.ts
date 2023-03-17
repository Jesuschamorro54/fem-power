import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-events',
  templateUrl: './profile-events.component.html',
  styleUrls: ['./profile-events.component.scss']
})
export class ProfileEventsComponent implements OnInit {

  filters = [
    {label: 'Esta semana', value: 'recents'},
    {label: 'Proxima semana', value: 'relevant'},
    {label: 'Proximo mes', value: 'relevant'}
  ]
  filterSelected:any = this.filters[0]

  constructor() { }

  ngOnInit(): void {
  }

}
