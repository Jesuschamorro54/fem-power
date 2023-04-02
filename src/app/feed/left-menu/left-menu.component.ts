import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss']
})
export class LeftMenuComponent implements OnInit {

  public community: Boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  change_community(){
    this.community= !this.community;
  }
}
