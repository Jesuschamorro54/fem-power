import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(
    public _appService: AppService
  ) { }

  ngOnInit(): void {
  }

}
