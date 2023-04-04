import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit {

  // viewChilds
  @ViewChild("searchInput_") searchInput_: ElementRef;

  onFocus = false;
  

  constructor() { }

  ngOnInit(): void {
  }

  showInput() {
    setTimeout(() => {
      this.onFocus =  !this.onFocus;
      this.searchInput_.nativeElement.focus();
    }, 0);
  }

}
