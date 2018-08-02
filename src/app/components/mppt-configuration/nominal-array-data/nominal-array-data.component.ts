import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { MttpSpecifications, Inversor, Mttp } from '../../../core/models';
import { MttpSpecifications_Validation } from '../../../core/models/mttp-specifications-validation.model';
import { validar_corriente_maxima, validar_corriente_mppt, validar_potencia_fv, validar_potencia_nominal, validar_tension_mppt, validar_tension_maxima } from '@app/core/lib/mttp-validations';
import { FvFieldService } from '../../../core/services';
import { ResultadoValidacion } from '../../../core/enums';

@Component({
  selector: 'app-nominal-array-data',
  templateUrl: './nominal-array-data.component.html',
  styleUrls: ['./nominal-array-data.component.scss']
})
export class NominalArrayDataComponent implements OnInit {
  inversor: Inversor;
  validationResultEnum =  ResultadoValidacion;
  @Input() mttp: Mttp;
  @Input() mttpSpecifications: MttpSpecifications;
  mttpSepcifications_Validation: MttpSpecifications_Validation;

  validateMttpSpecification() {
    this.mttpSepcifications_Validation.corriente_maxima_MPPTn = validar_corriente_maxima(this.inversor, this.mttpSpecifications.corriente_maxima_MPPTn, this.mttp);
    this.mttpSepcifications_Validation.corriente_Mpp_MPPTn = validar_corriente_mppt(this.inversor, this.mttpSpecifications.corriente_Mpp_MPPTn, this.mttp);
    this.mttpSepcifications_Validation.potencia_fv_total = validar_potencia_fv(this.inversor, this.mttpSpecifications.potencia_fv_total);
    this.mttpSepcifications_Validation.potencia_nominal = validar_potencia_nominal(this.inversor, this.mttpSpecifications.potencia_nominal);
    this.mttpSepcifications_Validation.tension_maxima_MPPTn = validar_tension_maxima(this.inversor, this.mttpSpecifications.tension_maxima_MPPTn);
    this.mttpSepcifications_Validation.tension_Mpp_MPPTn = validar_tension_mppt(this.inversor, this.mttpSpecifications.tension_Mpp_MPPTn);

  }
  constructor(
    private _fvService: FvFieldService
  ) { 
    this.mttpSepcifications_Validation = new MttpSpecifications_Validation();
    this.mttpSpecifications = new MttpSpecifications();
    this.inversor = this._fvService.getSelectedInversor();
  }
  valid(): boolean {
    return this.mttpSepcifications_Validation.valid();
  }
  ngOnInit() {
    if ( this.mttp.numero_de_cadenas_en_paralelo !== -1 ) {
      this.validateMttpSpecification();
    }
  }

}
