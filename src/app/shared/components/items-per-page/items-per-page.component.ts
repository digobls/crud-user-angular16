import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-items-per-page',
  templateUrl: './items-per-page.component.html',
  styleUrls: ['./items-per-page.component.scss']
})
export class itemsPerPageComponent {
  @Output() changeTotalRecords = new EventEmitter<number>();

  @Input() totalRecordsPerPage: number = 5;
  @Input() listRecords = [
    {value: 5},
    {value: 10},
    {value: 20},
    {value: 30},
    {value: 40},
    {value: 50}
  ];

  openList = false;

  constructor() {}

  showList() {
    this.openList = !this.openList;
  }

  onChangeRecords(value: number) {
    this.openList = false;
    this.totalRecordsPerPage = value;
    this.changeTotalRecords.emit(value);
  }
}
