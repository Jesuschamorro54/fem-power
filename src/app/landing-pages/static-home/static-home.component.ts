import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-static-home',
  templateUrl: './static-home.component.html',
  styleUrls: ['./static-home.component.scss']
})
export class StaticHomeComponent implements OnInit {
  public imgCollection: Array<object>;

  constructor() {

  }

  ngOnInit(): void {
  }


}
