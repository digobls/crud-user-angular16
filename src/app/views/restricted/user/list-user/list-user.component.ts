import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CrudUserPopUpComponent } from '../crud-user-pop-up/crud-user-pop-up.component';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../../../../service/user.service';
import { ModalAlertService } from '../../../../service/default-alert-modal.service';

@Component({
  selector: 'app-list-user-components',
  templateUrl: 'list-user.component.html',
  styleUrls: [`list-user.component.scss`]
})

export class ListUserComponent implements OnInit {
  formSearch = new FormGroup({
    search: new  FormControl( null),
    filter: new  FormControl(null)
  });

  header: any = {
    sortable: true,
    sortedColumn: '',
    sortOrder: ''
  };

  listFilters: any = [];
  listUsers: any = [];
  copyUsers: any = [];

  loadingList = false;
  loadingFilter = false;
  loadingDelete = false;

  dataPagination = {
    currentPage: 1,
    totalRecords: 0,
    totalRecordsPerPage: 0
  };

  constructor(
    private modalService: NgbModal,
    private userService: UserService,
    private modalAlertService: ModalAlertService,
  ) { }

  public ngOnInit() {
    this.loadUsers();
    this.search();
  }

  // Load list from users
  loadUsers() {
    this.loadingList = true;
    this.userService.listUsers().subscribe({
      next: (response) => {
        this.listUsers = response.slice(0, 5);
        this.copyUsers = response;

        this.dataPagination.totalRecords = response.length;
        this.dataPagination.totalRecordsPerPage = 5;

        this.loadingList = false;
      },
      error: (error) => {
        console.error(error);
        this.loadingList = false;
      }
    });
  }

  // Open register product
  newUser(user?: any) {
    const modalRef = this.modalService.open(CrudUserPopUpComponent, { size: 'lg' });
    modalRef.componentInstance.userId = user?.id || null;

    modalRef.result.then((result) => {
      if (result.onLoad) {
        this.loadUsers();
      }
    });
  }

  // Check remove
  checkRemove(data: any) {
      const dataConfig = {
        showDangerIcon: true,
        showCancelBtn: true,
        showConfirmBtn: true,
        customTxtCancel: 'Cancelar'
      };

    this.modalAlertService.openModal(
      'Aviso',
      'Tem certeza que deseja excluir o usuário?',
      dataConfig,
      'md').then((result) => {
      if (result?.continueAction) {
        this.removeUser(data);
      }
    });
  }

  // Remove product
  removeUser(data: any) {
      this.loadingDelete = true;
      this.userService.deleteUser(data.id).subscribe({
        next: (response) => {
          this.loadUsers()
        },
        error: (error) => {
          console.error(error);
          this.loadingList = false;
        }
      });
  }

  // On search
  search() {
    this.formSearch.controls['search'].valueChanges.subscribe((value) => {
      if (value) {
        this.listUsers = this.copyUsers.filter((user: any) => {
          return user.firstName.toLowerCase().includes(value)
            || user.email.toLowerCase().includes(value);
        }).slice(0, this.dataPagination.totalRecordsPerPage);
      } else {
        this.listUsers = [...this.copyUsers.slice(0, this.dataPagination.totalRecordsPerPage)];
        return;
      }
    });
  }

  // Sort item from header
  sort(column: string) {
    if (this.header.sortedColumn === column) {
      this.header.sortOrder = this.header.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.header.sortedColumn = column;
      this.header.sortOrder = 'asc';
    }

    const listUser = this.copyUsers.sort((a: any, b: any) => {
      const valueA = a[column];
      const valueB = b[column];

      if (valueA < valueB) {
        return this.header.sortOrder === 'asc' ? -1 : 1;
      } else if (valueA > valueB) {
        return this.header.sortOrder === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });
    this.listUsers = listUser.slice(0, 5);
  }

  onChangePage(data: any) {
    this.listUsers = this.randomArray(this.copyUsers).slice(0, this.dataPagination.totalRecordsPerPage);
  }

  // Random array
  randomArray(array: any) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  onChangeRecords(data: number) {
    this.listUsers = this.copyUsers.slice(0, data);
    this.dataPagination.totalRecordsPerPage = data;
  }
}
