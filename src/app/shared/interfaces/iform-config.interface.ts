import { IformFieldConfigInterface } from "./iform-field-config.interface";

export interface IformConfigInterface {
  [key: string]: IformFieldConfigInterface;
}
