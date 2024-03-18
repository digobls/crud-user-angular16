import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { itemsPerPageComponent } from './components/items-per-page/items-per-page.component';
import { DefaultSimpleTableComponent } from './components/default-simple-table/default-simple-table.component';
import { DefaultNavbarComponent } from './components/default-navbar/default-navbar.component';
import { DefaultSidebarComponent } from './components/default-sidebar/default-sidebar.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { DefaultButtonComponent } from './components/default-button/default-button.component';
import { InputTypeComponent } from './components/input-type/input-type.component';
import { NgxMaskDirective } from 'ngx-mask';
import { NgSelectModule } from '@ng-select/ng-select';
import { DefaultAlertModalComponent } from './components/default-alert-modal/default-alert-modal.component';

@NgModule({
  declarations: [
    DefaultSidebarComponent,
    DefaultNavbarComponent,
    DefaultSimpleTableComponent,
    itemsPerPageComponent,
    DefaultButtonComponent,
    InputTypeComponent,
    DefaultAlertModalComponent
  ],
  exports: [
    DefaultSidebarComponent,
    DefaultNavbarComponent,
    DefaultSimpleTableComponent,
    itemsPerPageComponent,
    DefaultButtonComponent,
    InputTypeComponent,
    DefaultAlertModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgbPaginationModule,
    NgxMaskDirective,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class SharedModule {

}
