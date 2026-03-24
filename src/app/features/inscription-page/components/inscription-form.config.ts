import { Validators } from "@angular/forms";
import { IformConfigInterface } from "../../../shared/interfaces/iform-config.interface";
import { ValidatorsSignal } from "../../../shared/const/adapt-validators-signals";

export const INSCRIPTION_FORM_CONFIG: IformConfigInterface = {
  type: {
    defaultValue: '',
    validators: [
      ValidatorsSignal.required('campo obrigatório'),
    ],
    disabled: false,
  },
  userName: {
    defaultValue: '',
    validators: [
      ValidatorsSignal.required('campo obrigatório')
    ],
    disabled: false
  },
  userEmail: {
    defaultValue: 'desabiitado',
    validators: [
      ValidatorsSignal.required('campo obrigatório'),
      ValidatorsSignal.email('este campo é um email')
    ],
    disabled: true
  },
  documentType: {
    defaultValue: '',
    validators: [
      ValidatorsSignal.required('campo obrigatório')
    ],
    disabled: false
  },
  documentNumber: {
    defaultValue: '',
    validators: [
      ValidatorsSignal.required('campo obrigatório')
    ],
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
