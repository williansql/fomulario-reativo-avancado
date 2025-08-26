import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IformConfigInterface } from '../interfaces/iform-config.interface';

@Injectable({
  providedIn: 'root',
})
export class FormGeneratorService {
  constructor(private readonly fb: FormBuilder) {}

  generateForm(config: IformConfigInterface, initialData: any = {}): FormGroup {
    const formGroupConfig: any = {};
    for (const key in config) {
      if (config.hasOwnProperty(key)) {
        const fieldConfig = config[key];
        const initialValue = initialData?.[key] !== undefined ? initialData[key] : fieldConfig.defaultValue;
        formGroupConfig[key] = [
          {value: initialValue, disabled: fieldConfig.disabled ?? false},
          fieldConfig.validators || []
        ]
        // .filter(Boolean);
      }
    }
    return this.fb.group(formGroupConfig);
  }
}
