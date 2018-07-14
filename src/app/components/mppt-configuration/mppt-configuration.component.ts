import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MttpSpecifications, Mttp,  PanelSolar, Sfv } from '../../core/models';
import { FvFieldService, SfvService } from '../../core/services';

import { 
  total_de_paneles,
  potencia_nominal,
  corriente_maxima_MPPTn,
  corriente_Mpp_MPPTn,
  tension_maxima_MPPTn,
  tension_Mpp_MPPTn 
} from '../../core/lib/mttp-functions';

import { FormGroup } from '@angular/forms';
import { MttpFormBuilder } from '../../core/forms/mttp.form';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-mppt-configuration',
  templateUrl: './mppt-configuration.component.html',
  styleUrls: ['./mppt-configuration.component.scss']
})
export class MpptConfigurationComponent implements OnInit {
  @Input() mttp: Mttp;
  @Input() fvFieldId: string;
  @Output() goToCabling = new EventEmitter();
  mttpForm: FormGroup;
  private _solarPanel: PanelSolar;
  private _sfv: Sfv;
  mttpSpecifications: MttpSpecifications;
  constructor(
    private _router: Router,
    public snackBar: MatSnackBar,
    private _fvFieldService: FvFieldService,
    private _sfvService: SfvService,
    private _mttpFormBuilder: MttpFormBuilder
  ) {
    this.mttpForm = null;
    this._solarPanel = this._fvFieldService.getSelectedSolarPanel();
    this.mttpSpecifications = new MttpSpecifications();
   
   }
   getMttpFromForm(){
     return this._mttpFormBuilder.extractData(this.mttpForm,  this.mttp);
   }
   saveChanges(): boolean {
     if( this.mttpForm.valid ) {
       let _fvField = this._fvFieldService.get(this.fvFieldId);
       this.mttp = this._mttpFormBuilder.extractData(this.mttpForm, this.mttp);
       
       /** Si ya existia el mttp en el fv field entonces updatear si no pushear */
       if ( _fvField.mttps.filter ( mttp => mttp.id === this.mttp.id).length > 0 ){
        let index_of_mttp_to_update = _fvField.mttps.findIndex(mttp => mttp.id === this.mttp.id);
        _fvField.mttps[index_of_mttp_to_update] = this.mttp;
       } else {
        _fvField.mttps.push(this.mttp);
      }  
       this._fvFieldService.updateField(_fvField);
       return true;
     }
     else {
      this.snackBar.open(`Se han encontrado algunos problemas en el MPPT ${this.mttp.name}`, 'Aceptar', {
        duration: 2000,
      });
      return false;
     }
   }
   goToCablingConfig() {
     if(this.saveChanges()) {
       this.goToCabling.emit();
    this._router.navigate(['/mppt-config/cabling', {fv_id: this.fvFieldId.toString(), mttp_id: this.mttp.id.toString()}]);
     } else {
       return;
     }
   }
  ngOnInit() {
    this._sfv = this._sfvService.get();
    /** If not default mttp is injected at input make form from that mttp */
    if(this.mttp.number_of_chains_in_parallel !== -1) {
      this.mttpForm = this._mttpFormBuilder.makeForm(this.mttp);
    } else {
      this.mttpForm = this._mttpFormBuilder.makeForm();
    }
    /** Calculate and update mttpspecification after number of panels changes or number of chains change and only if both have values */
    this.mttpForm.get('number_of_chains_in_parallel')
    .valueChanges.subscribe(
      () => {
        if (this.mttpForm.get('number_of_panels_in_series_per_chain').value !== '') {
          this.updateMttpSpecifications(
            Number(this.mttpForm.get('number_of_panels_in_series_per_chain').value),
            Number(this.mttpForm.get('number_of_chains_in_parallel').value)
          );
        }
      }
    );
    this.mttpForm.get('number_of_panels_in_series_per_chain')
    .valueChanges.subscribe(
      () => {
        if (this.mttpForm.get('number_of_chains_in_parallel').value !== '') {
          this.updateMttpSpecifications(
            Number(this.mttpForm.get('number_of_panels_in_series_per_chain').value),
            Number(this.mttpForm.get('number_of_chains_in_parallel').value) 
          );
        }
      }
    );
   }
  updateMttpSpecifications(number_of_panels_in_series_per_chain: number, number_of_chains_in_parallel: number) {
    this.mttpSpecifications.total_de_paneles = total_de_paneles(number_of_chains_in_parallel, number_of_panels_in_series_per_chain);
    this.mttpSpecifications.potencia_nominal = potencia_nominal(this.mttpSpecifications.total_de_paneles, this._solarPanel.pmax);
    this.mttpSpecifications.corriente_maxima_MPPTn = corriente_maxima_MPPTn(number_of_chains_in_parallel, Number(this._solarPanel.isc));
    this.mttpSpecifications.corriente_Mpp_MPPTn = corriente_Mpp_MPPTn(number_of_chains_in_parallel, Number(this._solarPanel.impp));
    this.mttpSpecifications.tension_maxima_MPPTn = Number(tension_maxima_MPPTn(
      number_of_panels_in_series_per_chain, 
      Number(this._solarPanel.voc), 
      parseFloat(this._solarPanel.coef_voc.substr(0, this._solarPanel.coef_voc.length -1).replace(',','.')), 
      Number(this._sfv.lowest_ambient_temperature_expected) ).toFixed(2)) ;
  
    this.mttpSpecifications.tension_Mpp_MPPTn = tension_Mpp_MPPTn(number_of_panels_in_series_per_chain, this._solarPanel.vmpp );
    }
}
