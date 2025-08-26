import { Validators } from "@angular/forms";
import { IformConfigInterface } from "../../../shared/interfaces/iform-config.interface";

export const INSCRIPTION_FORM_CONFIG: IformConfigInterface = {
  type: {
    defaultValue: '',
    validators: [Validators.required],
    disabled: false,
  },
  userName: {
    defaultValue: '',
    validators: [Validators.required, Validators.minLength(10)],
    disabled: false
  },
  userEmail: {
    defaultValue: 'desabiitado',
    validators: [Validators.required, Validators.email],
    disabled: true
  },
  documentType: {
    defaultValue: '',
    validators: [Validators.required],
    disabled: false
  },
  documentNumber: {
    defaultValue: '',
    validators: [Validators.required],
    disabled: false
  },
  cep: {
    defaultValue: '',
  },
  address: {
    defaultValue: '',
  },
  inscriptionValidate: {
    defaultValue: 'análise',
  }
}
