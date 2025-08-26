import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { map, Observable, startWith } from 'rxjs';
import { FormGeneratorService } from '../../shared/services/form-generator.service';
import { DocumentTypeEnum } from './components/document-type.enum';
import { INSCRIPTION_FORM_CONFIG } from './components/inscription-form.config';
import { NgxMaskDirective } from 'ngx-mask';
import { CpfPipe } from '../../shared/pipes/cpf.pipe';
import { CnpjPipe } from '../../shared/pipes/cnpj.pipe';
import { cpfValidator } from '../../shared/utils/validate-cpf';
import { cnpjValidator } from '../../shared/utils/validate-cnpj';

@Component({
  selector: 'app-inscription-page',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    MatAutocompleteModule,
    NgxMaskDirective,
    CpfPipe,
    CnpjPipe,

],
  templateUrl: './inscription-page.html',
  styleUrl: './inscription-page.scss'
})
export class InscriptionPage {

  private readonly formGenerator = inject(FormGeneratorService);

  inscriptionForm = this.formGenerator.generateForm(INSCRIPTION_FORM_CONFIG);
  options: string[] = Object.values(DocumentTypeEnum);
  mask: string | null = null;
  placeholder = 'Selecione um tipo de documento';

  filteredDocumentType?: Observable<String[]>;

  ngOnInit() {
    this.filterDocumentType();

    this.inscriptionForm.get('documentType')?.valueChanges.subscribe(type => {
      const docNumberControl = this.inscriptionForm.get('documentNumber');
      if (type === 'cpf' || type === 'CPF') {
        this.mask = '000.000.000-00';
        this.placeholder = '000.000.000-00';
        docNumberControl?.setValidators([cpfValidator()]);
      } else if (type === 'cnpj' || type === 'CNPJ') {
        this.mask = '00.000.000/0000-00';
        this.placeholder = '00.000.000/0000-00';
        docNumberControl?.setValidators([cnpjValidator()]);
      } else {
        this.mask = null;
        this.placeholder = 'Selecione um tipo de documento';
        docNumberControl?.clearValidators();
      }
      docNumberControl?.updateValueAndValidity();
    });
  }

  filterDocumentType(){
    this.filteredDocumentType = this.inscriptionForm.get('documentType')?.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value || '')),
      );
  }

  validateDocument(){
    const documentType = this.inscriptionForm.get('documentType')?.value;
    const docNumberControl = this.inscriptionForm.get('documentNumber');

    if (documentType === 'CPF'){
      docNumberControl?.setValidators([cpfValidator()]);
    } else if(documentType === 'CNPJ'){
      docNumberControl?.setValidators([cnpjValidator()]);
    } else {
      docNumberControl?.clearValidators();
    }
    docNumberControl?.updateValueAndValidity();
  }


  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}
