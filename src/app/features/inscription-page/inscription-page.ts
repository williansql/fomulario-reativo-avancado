import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgxMaskDirective } from 'ngx-mask';
import { ToastrService } from 'ngx-toastr';
import { map, Observable, startWith } from 'rxjs';
import { CnpjPipe } from '../../shared/pipes/cnpj.pipe';
import { CpfPipe } from '../../shared/pipes/cpf.pipe';
import { SignalFormGeneratorService } from '../../shared/services/signal-form-generator.service';
import { cnpjValidator } from '../../shared/utils/validate-cnpj';
import { cpfValidator } from '../../shared/utils/validate-cpf';
import { DocumentTypeEnum } from './components/document-type.enum';
import { INSCRIPTION_FORM_CONFIG } from './components/inscription-form.config';

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
  styleUrl: './inscription-page.css'
})
export class InscriptionPage {

  private readonly formGenerator = inject(SignalFormGeneratorService);
  private readonly toastr = inject(ToastrService);

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

  showToastr(){
    this.toastr.success('Inscricao realizada com sucesso!');
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}
