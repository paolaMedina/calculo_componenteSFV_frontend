import { Component, OnInit } from '@angular/core';
import { FvField, Sfv } from '../../core/models';
import { FvFieldService, SfvService } from '../../core/services';
import { InvestorTypeEnum } from '../../core/enums';
import { Router } from '@angular/router';
import { routercTransition } from '../../router.animations';
@Component({
  selector: 'app-fv-fields-configuration',
  templateUrl: './fv-fields-configuration.component.html',
  styleUrls: ['./fv-fields-configuration.component.scss'],
  animations: [routercTransition()]
})
export class FvFieldsConfigurationComponent implements OnInit {
  fvFields: FvField[]; // should never access it directly 
  sfv: Sfv;
  allow_add_and_delete: boolean;
  constructor(
    private _fvFieldService: FvFieldService,
    private _router: Router,
    private _sfvService: SfvService
  ) {
    this.fvFields = new Array<FvField>();
  }
  sendData() {
    this.saveFvFields();
    this.sfv.fvs = this._fvFieldService.getFvFields();
    console.log('enviando datos')
    this._sfvService.send(this.sfv);
  }

  ngOnInit() {
    this.sfv = this._sfvService.get();
    /* If fv fields are already registred, get that,  In no fv fields are registred, start with one fv field  */
    if ( this._fvFieldService.getFvFields().length > 0 ) {
      this.fvFields = this._fvFieldService.getFvFields();
    } else {
      this.fvFields.push(this._fvFieldService.getDefaultFvField()); 
    }

    if ( this.sfv.tipo_de_inversor === InvestorTypeEnum.MicroInvestor ) {
      this.fvFields.slice(0,1);
      this.allow_add_and_delete = false;
    } else {
      this.allow_add_and_delete = true;
    }
  }
  saveFvFields(){ 
    this._fvFieldService.setFvFields(this.fvFields);
  }
  deleleteFvField( idFvField: string ) {
    this.fvFields = this.fvFields.filter( fvField => fvField.id !== idFvField);
  }
  addDefaultFvField() {
    const sufix_for_next_field = this.fvFields.length + 1;
    this.fvFields.push(this._fvFieldService.getDefaultFvField(sufix_for_next_field));
  }
  goToFvFieldConfiguration(idFvField: string) {
    this.saveFvFields();
    this._router.navigate(['/fv-field-config', idFvField]) ;
  }
   return() {
    this.saveFvFields();
    this._router.navigate(["/"]);
  }
}
