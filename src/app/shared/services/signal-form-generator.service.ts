import { Injectable, signal, computed } from '@angular/core';
import { IformConfigInterface } from '../interfaces/iform-config.interface';
import { ValidatorFn } from "@angular/forms";

@Injectable({
  providedIn: 'root',
})
export class SignalFormGeneratorService {

  generateForm(config: IformConfigInterface, initialData: any = {}) {

    const fields: any = {};

    for (const key in config) {
      const fieldConfig = config[key];

      const value = signal(
        initialData?.[key] ?? fieldConfig.defaultValue ?? null
      );

      const disabled = signal(fieldConfig.disabled ?? false);

      const errors = computed(() => {
        if (!fieldConfig.validators) return [];

        return fieldConfig.validators
          .map(v => v(value()))
          .filter(Boolean);
      });

      const valid = computed(() => errors().length === 0);

      fields[key] = {
        value,
        disabled,
        validators: fieldConfig.validators,
        errors,
        valid
      };
    }

    const formValue = computed(() => {
      const result: any = {};
      for (const key in fields) {
        result[key] = fields[key].value();
      }
      return result;
    });

    const formValid = computed(() => {
      return Object.values(fields).every((f: any) => f.valid());
    });

    return {
      ...fields,
      value: formValue,
      valid: formValid
    };
  }


}
