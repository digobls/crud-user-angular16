import { Component, Input, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HelpersService } from '../../../../service/helpers.service';
import { UserService } from '../../../../service/user.service';
import { ModalAlertService } from '../../../../service/default-alert-modal.service';

@Component({
  selector: 'app-crud-user-pop-up',
  templateUrl: './crud-user-pop-up.component.html',
  styleUrls: ['./crud-user-pop-up.component.scss']
})
export class CrudUserPopUpComponent implements OnInit {
  @Input() userId: any;
  userData: any;

  formUser = new FormGroup({
    firstName: new  FormControl( null, [Validators.required]),
    lastName: new  FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    roles: new FormControl(null, [Validators.required]),
    language: new FormControl(null, [Validators.required]),
    contactType: new FormControl(null, [Validators.required])
  });

  listRoles: any = [];
  listLanguages: any = [];
  listTypeContact: any = [];

  loadingData = false;
  loadingRoles = false;
  loadingLanguages = false;
  loadingSend = false;

  constructor(
      public activeModal: NgbActiveModal,
      private modalAlertService: ModalAlertService,
      private helpersService: HelpersService,
      private userService: UserService
  ) {}

  ngOnInit() {
    this.loadRoles();
    this.loadLanguages();

    this.listTypeContact = [
      {id: 1, name: 'E-mail'},
      {id: 2, name: 'Telefone'},
      {id: 3, name: 'Todos'},
    ];

    if (this.userId) {
      this.loadUser();
    }
  }

  loadUser() {
    this.loadingData = true;
    this.userService.loadUser(this.userId).subscribe({
      next: (response) => {
        this.userData = response;
        this.formUser.patchValue(response);

        console.log('Datauser', this.formUser.value);
        this.loadingData = false;
      },
      error: (error) => {
        this.loadingData = false;
      }
    });
  }

  // Check continue
  checkChange() {
    if (this.formUser.valid && !this.loadingSend) {
      this.loadingSend = true;
      if (this.userId) {
        this.changeUser();
      } else {
        this.createUser();
      }
    } else {
      const data = {
        showWarningIcon: true,
        showCancelBtn: true,
        showConfirmBtn: true
      };

      this.modalAlertService.openModal('Aviso', 'Preencha os dados antes de continuar.', data, 'md');
    }
  }

  // Save insurance
  createUser() {
    const dataSend = {
      ...this.formUser.value,
      createAt: new Date(),
      lastAccess: null,
      statusType: 1,
      statusString: 'Ativo'
    };
    this.userService.createUser(dataSend).subscribe({
      next: (response) => {
        this.modalAlertService.openModal(
          'Sucesso',
          'Usuário cadastradoo com sucesso.',
          { showSuccessIcon: true, showConfirmBtn: true },
          'md'
        );
        this.activeModal.close({onLoad: true, data: response});
        this.loadingSend = false;
      },
      error: (error) => {
        this.loadingSend = false;
      }
    });
  }

  // Change insurance
  changeUser() {
    const dataSend = {
      ...this.formUser.value,
      id: this.userId,
      createAt: this.userData.createAt,
      lastAccess: this.userData.lastAccess,
      statusType: this.userData.statusType,
      statusString: this.userData.statusString
    };
    this.userService.changeUser(this.userId, dataSend).subscribe({
      next: (response) => {
        this.modalAlertService.openModal(
          'Sucesso',
          'Usuário alterado com sucesso.',
          { showSuccessIcon: true, showConfirmBtn: true },
          'md'
        );
        this.activeModal.close({onLoad: true, data: response});
        this.loadingSend = false;
      },
      error: (error) => {
        this.loadingSend = false;
      }
    });
  }

  // List languages
  loadLanguages() {
    this.loadingLanguages = true;
    this.helpersService.listLanguages().subscribe({
      next: (response) => {
        this.listLanguages = response;
        this.loadingLanguages = false;
      },
      error: (error) => {
        this.loadingLanguages = false;
      }
    });
  }

  // List roles
  loadRoles() {
    this.loadingRoles = true;
    this.helpersService.listRoles().subscribe({
      next: (response) => {
        this.listRoles = response;
        this.loadingRoles = false;
      },
      error: (error) => {
        this.loadingRoles = false;
      }
    });
  }

  // Close modal
  closeModal() {
    this.activeModal.close({close: true});
  }
}
