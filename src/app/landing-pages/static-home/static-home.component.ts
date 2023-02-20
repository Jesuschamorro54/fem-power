import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-static-home',
  templateUrl: './static-home.component.html',
  styleUrls: ['./static-home.component.scss']
})
export class StaticHomeComponent implements OnInit {
  public imgCollection: Array<object>;

  constructor( private _router: Router) {}

  ngOnInit(): void {
  }

  goToSignUp() {
    this._router.navigate(['auth/sign'])
  }

}
