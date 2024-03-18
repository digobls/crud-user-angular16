import { FormGroup } from '@angular/forms';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input-type',
  templateUrl: 'input-type.component.html',
  styleUrls: ['./input-type.component.scss'],
})

export class InputTypeComponent {
  @Input() formGroup!: FormGroup;

  @Input() type: string = '';
  @Input() id: string = '';
  @Input() name: string = '';
  @Input() iconClass: string = '';

  @Input() showLabel: boolean = true;
  @Input() showOptional: boolean = false;
  @Input() label: string = '';
  @Input() placeholder: string = '';

  @Input() mask: string = '';

  @Input() disabled: boolean = false;
  @Input() isRequired: boolean = false;
  @Input() customRequiredMsg: string = '';
  @Input() invalidMsg: string = 'Campo obrigatório!';

  // Items from select
  @Input() bindLabel: any;
  @Input() bindValue: any;
  @Input() listItems: any = [];
  @Input() multiple: boolean = false;
  @Input() allowClear: boolean = true;
  @Input() loadingData: boolean = false;

  // Items from radio
  @Input() displayInline = false;
  @Input() useCustomClass = 0;
  @Input() radioItems: any = [];
  @Input() bindValueRadio: any;

  @Output() enterkeyup = new EventEmitter();
  @Output() change = new EventEmitter()

  constructor() { }

  get control() {
    return this.formGroup!.controls[this.id];
  }

  changeValueRadioButton(data: any) {
    if (this.bindValueRadio) {
      this.formGroup.get(this.id)?.setValue(data[this.bindValueRadio]);
    } else {
      this.formGroup.get(this.id)?.setValue(data);
    }
    this.changeInput();
  }

  changeInput() {
    try {
      this.change.emit(this.formGroup.controls[this.id].getRawValue());
    } catch (error) { }
  }

  enterKeyInput(event: any) {
    if (event?.keyCode === 13) {
      try {
        this.enterkeyup.emit(this.formGroup.controls[this.id].getRawValue());
      } catch (error) { }
    }
  }
}
