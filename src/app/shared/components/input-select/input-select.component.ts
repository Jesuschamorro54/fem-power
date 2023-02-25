import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.scss']
})
export class InputSelectComponent implements OnInit {

  // La variable de tipo Output me permite mandarle datos al padre.
  @Output() changeValue = new EventEmitter();

  // La variable tipo Input me permite mandarle datos al hijo desde el padre.
  @Input() data: Array<SelectInput>;

  selectData: Array<SelectInput> = [];
  itemSelected: SelectInput = null;

  constructor() { }

  ngOnInit(): void { }


  ngOnChanges(changes: SimpleChanges): void {

    if (changes.hasOwnProperty('data') && this.data != undefined){
      this.itemSelected = changes['data'].currentValue[0]
    }

    
  }

  /**
   * Esta función asigna el valor y label del input y a su vez 
   * emite el evento a la etiqueta html donde fue invocado.
   * @param item Item selected
   */
  selectItem(item) {

    this.itemSelected = item
    this.changeValue.emit(item)

  }

}

interface SelectInput {
  label: string;
  value: any;
}
