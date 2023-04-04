import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-static-fundation',
  templateUrl: './static-fundation.component.html',
  styleUrls: ['./static-fundation.component.scss']
})
export class StaticFundationComponent implements OnInit {

  constructor(private _router: Router) { }

  fundation_names = [
    {label: 'Seleccione la fundación...', value: null},
    {label: 'She Is', value: 'fundation'},
    {label: 'Mujer', value: 'fundation'},
    {label: 'Mujer', value: 'fundation'},
    {label: 'Mujer', value: 'fundation'}
  ]
  
  ngOnInit(): void {
  }

  mostrarItem(item){
    console.log(item.value);
  }

  goToSignUp() {
    this._router.navigate(['auth/sign'])
  }

}
