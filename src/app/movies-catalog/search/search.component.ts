import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchVal = '';
  constructor() {}

  @Output() search = new EventEmitter();
  @Output() clearSearch = new EventEmitter();
  ngOnInit() {}

  getValinput() {
    this.search.emit(this.searchVal);
  }

  clearResult() {
    this.searchVal = '';
    this.clearSearch.emit();
  }
}
