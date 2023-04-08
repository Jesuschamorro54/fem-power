import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Subject, Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit {

  // viewChilds
  @ViewChild("searchInput_") searchInput_: ElementRef;

  onFocus = false;
  searchText = ''

  textModelChangeSubscription: Subscription;
  textModelChanged: Subject<string> = new Subject<string>();


  constructor(
    private _appService: AppService
  ) { }

  ngOnInit(): void {

    this.createDebounce()
  }

  showInput() {
    setTimeout(() => {
      this.onFocus =  !this.onFocus;
      this.searchInput_.nativeElement.focus();
    }, 0);
  }

  goActive: boolean = false;
  createDebounce() {
    this.textModelChangeSubscription = this.textModelChanged.pipe(debounceTime(400), distinctUntilChanged()).subscribe((newText) => {
      if (newText != "" && !this.goActive) {
        this.getResultSearch();
      } else {
        // this.goActive = false;
        // this.resultsSearch = [];
      }
    });
  }

  getResultSearch() {
    this._appService.searchUser(this.searchText).subscribe(response => {
      console.log(response)
    });
  }

}
