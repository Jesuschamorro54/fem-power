import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-static-fundation',
  templateUrl: './static-fundation.component.html',
  styleUrls: ['./static-fundation.component.scss']
})
export class StaticFundationComponent implements OnInit {

  constructor() { }

  fundation_names = [
    {label: 'Seleccione la fundación...', value: null},
    {label: 'Mujer', value: 'fundation'},
    {label: 'Mujer', value: 'fundation'},
    {label: 'Mujer', value: 'fundation'},
    {label: 'Mujer', value: 'fundation'}
  ]
  
  ngOnInit(): void {
  }

  mostrarItem(item){
    console.log(item.value);
  }

}
