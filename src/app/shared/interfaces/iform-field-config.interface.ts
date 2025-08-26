import { ValidatorFn } from "@angular/forms";

export interface IformFieldConfigInterface{
  defaultValue?: string;
  validators?: ValidatorFn[];
  disabled?: boolean;
}
