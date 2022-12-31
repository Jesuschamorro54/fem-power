/* tslint:disable:member-ordering */
import { Directive, ElementRef, HostListener, Input, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[clickOutsideDdown]'
})
export class ClickOutsideDdownDirective {

  constructor(private _elementRef: ElementRef) { }

  @Output('clickOutsideDdown') clickOutsideDdown: EventEmitter<any> = new EventEmitter();

  @HostListener('document:click', ['$event.target']) onMouseEnter(targetElement) {
    // (targetElement.id == 'lbl-settings') ||
    if (targetElement) {
      let clickedInside = this._elementRef.nativeElement.contains(targetElement);

      if (targetElement.id == 'set_all_readed') {
        clickedInside = true;
      }


      if (!clickedInside) {
        this.clickOutsideDdown.emit(true);
      }
    }

  }


}