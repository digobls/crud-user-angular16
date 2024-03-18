import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
// import { ModalAlertService } from '../../../../@core/services/default-alert-modal/default-alert-modal.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-default-simple-table',
  templateUrl: './default-simple-table.component.html',
  styleUrls: ['./default-simple-table.component.scss']
})
export class DefaultSimpleTableComponent implements OnInit, OnChanges {
  @Output() dataRemove = new EventEmitter<{ item: any, index: number, continue: boolean }>();
  @Output() dataEdit = new EventEmitter<{ item: any, index: number, isEdit: boolean }>();
  @Output() dataView = new EventEmitter<{ item: any, index: number, isView: boolean }>();
  @Output() changeActive = new EventEmitter<{ item: any, index: number, continue: boolean }>();
  @Output() changePagination = new EventEmitter<any>();
  @Output() callNewItem = new EventEmitter<any>();
  @Output() changeDataSearch = new EventEmitter<any>();
  @Output() changeOrder = new EventEmitter<any>();

  @Input() isAccordionTable: boolean = false;
  @Input() showSimpleSearch: boolean = false;
  @Input() loadingList: boolean = false;
  @Input() listHeader: any = [];
  @Input() listData: any = [];
  @Input() totalRecords: number = 0;

  // Button new item
  @Input() showBtnNew: boolean = false;
  @Input() routeBtnNew: string = '';
  @Input() iconBtnNew: string = 'ri-add-fill';
  @Input() titleBtnNew: string = 'Novo item';

  @Input() permissionBtnNew: boolean = true;
  @Input() permissionBtnRemove: boolean = true;
  @Input() permissionBtnEdit: boolean = true;
  @Input() permissionBtnView: boolean = true;

  searchForm: FormGroup;
  isSearch = false;
  dataPagination = {
    currentPage: 1,
    totalRecords: 20,
    totalRecordsPerPage: 20
  };

  constructor(
    private formBuilder: FormBuilder,
    // private modalAlertService: ModalAlertService,
  ) {
    this.searchForm = this.formBuilder.group({
      search: new FormControl(null),
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log('changes', changes);
    // if (changes?.totalRecords?.currentValue) {
    //   this.dataPagination.totalRecords = changes.totalRecords.currentValue;
    // }
  }

  ngOnInit() {

      this.onSearch();
  }

  // On search
  onSearch() {
    // this.searchForm.get('search')!.valueChanges.pipe(debounceTime(1000)).subscribe(value => {
    //   this.dataPagination.currentPage = 1;
    //   this.changeDataSearch.emit({ value: value });
    // });
  }

  // Sort item from header
  sort(key: string) {
    this.listHeader.forEach((v: any) => {
      if (v.key === key && v.sortable) {
        if (v.sortOrder === 'asc') {
          v.sortOrder = 'desc';
          this.changeOrder.emit({ order: v.sortOrder, key: key });
        } else {
          v.sortOrder = 'asc';
          this.changeOrder.emit({ order: v.sortOrder, key: key });
        }
      } else {
        v.sortOrder = null;
      }
    })
  }

  // Open edit
  openEdit(data: any, index: number) {
    if (this.permissionBtnEdit) {
      this.dataEdit.emit({ item: data, index: index, isEdit: true });
    }
  }

  openView(data: any, index: number) {
    if (this.permissionBtnView) {
      this.dataView.emit({ item: data, index: index, isView: true });
    }
  }

  // Check remove item
  checkRemove(data: any, index: number) {
    if (this.permissionBtnRemove) {
      const description = data?.checkText || 'Tem certeza que deseja excluir?';
      const dataConfig = {
        showDangerIcon: true,
        showCancelBtn: true,
        showConfirmBtn: true,
        customTxtCancel: 'Cancelar',
        btnCancelBorder: true
      };

      // this.modalAlertService.openModal('Aviso', description, dataConfig, 'md').then((result) => {
      //   if (result?.continueAction) {
      //     this.dataRemove.emit({ item: data, index: index, continue: true });
      //   }
      // });
    }
  }

  // Change data active
  changeDataActive(data: any, index: number) {
    this.changeActive.emit({ item: data, index: index, continue: true });
  }

  // On change page
  onChangePage(page: any) {
    this.dataPagination.currentPage = page;
    this.changePagination.emit(this.dataPagination);
  }

  // On change records
  onChangeRecords(records: number) {
    this.dataPagination.currentPage = 1;
    this.dataPagination.totalRecordsPerPage = records;
    this.changePagination.emit(this.dataPagination);
  }

  // Call new item
  onCallNewItem() {
    if (this.permissionBtnNew) {
      this.callNewItem.emit({ random: Math.random() });
    }
  }
}
