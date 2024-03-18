import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserRoutingModule } from './user-routing.module';
import { ListUserComponent } from './list-user/list-user.component';
import { CrudUserPopUpComponent } from './crud-user-pop-up/crud-user-pop-up.component';
import { SharedModule } from '../../../shared/shared.module';
import { NgbPagination, NgbPaginationNext, NgbPaginationPrevious } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    ListUserComponent,
    CrudUserPopUpComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    UserRoutingModule,
    SharedModule,
    NgbPagination,
    NgbPaginationPrevious,
    NgbPaginationNext
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class UserModule { }
