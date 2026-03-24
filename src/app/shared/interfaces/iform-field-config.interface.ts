import { SignalValidatorFn } from "../const/adapt-validators-signals";

export interface IformFieldConfigInterface{
  defaultValue?: string;
  validators?: SignalValidatorFn[];
  disabled?: boolean;
}
