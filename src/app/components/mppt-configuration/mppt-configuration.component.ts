import { Component, OnInit, Input } from '@angular/core';
import { MttpSpecifications, Mttp,  PanelSolar, Sfv } from '../../core/models';
import { FvFieldService, SfvService } from '../../core/services';
import { total_de_paneles, potencia_nominal, corriente_maxima_MPPTn, corriente_Mpp_MPPTn, tension_maxima_MPPTn, tension_Mpp_MPPTn } from '../../core/lib/mttp-functions';
import { FormGroup } from '@angular/forms';
import { MttpFormBuilder } from '../../core/forms/mttp.form';
@Component({
  selector: 'app-mppt-configuration',
  templateUrl: './mppt-configuration.component.html',
  styleUrls: ['./mppt-configuration.component.scss']
})
export class MpptConfigurationComponent implements OnInit {
  @Input() mttp: Mttp;
  mttpForm: FormGroup;
  private _solarPanel: PanelSolar;
  private _sfv: Sfv;
  mttpSpecifications: MttpSpecifications;
  constructor(
    private _fvFieldService: FvFieldService,
    private _sfvService: SfvService,
    private _mttpFormBuilder: MttpFormBuilder
  ) {
    this.mttpForm = this._mttpFormBuilder.makeForm();
    this._solarPanel = this._fvFieldService.getSelectedSolarPanel();
    console.log(this._solarPanel, 'solar panel')
    this.mttpSpecifications = new MttpSpecifications();
    this.mttpForm.get('number_of_chains_in_parallel')
    .valueChanges.subscribe(
      () => {
        if (this.mttpForm.get('number_of_panels_in_series_per_chain').value !== '') {
          this.updateMttpSpecifications(
            Number(this.mttpForm.get('number_of_chains_in_parallel').value),
            Number(this.mttpForm.get('number_of_panels_in_series_per_chain').value)
          );
        }
      }
    );
    this.mttpForm.get('number_of_panels_in_series_per_chain')
    .valueChanges.subscribe(
      () => {
        if (this.mttpForm.get('number_of_chains_in_parallel').value !== '') {
          this.updateMttpSpecifications(
            Number(this.mttpForm.get('number_of_chains_in_parallel').value),
            Number(this.mttpForm.get('number_of_panels_in_series_per_chain').value)
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
    this.mttpSpecifications.tension_maxima_MPPTn = tension_maxima_MPPTn(
      number_of_panels_in_series_per_chain, 
      Number(this._solarPanel.voc), 
      parseFloat(this._solarPanel.coef_voc.substr(0, this._solarPanel.coef_voc.length -1).replace(',','.')), 
      Number(this._sfv.lowest_ambient_temperature_expected) );
      console.log(
        number_of_panels_in_series_per_chain, 
        Number(this._solarPanel.voc), 
        parseFloat(this._solarPanel.coef_voc.substr(0, this._solarPanel.coef_voc.length -1).replace(',','.')), 
        Number(this._sfv.lowest_ambient_temperature_expected),
        "tension maxima variables"
      )
  
    this.mttpSpecifications.tension_Mpp_MPPTn = tension_Mpp_MPPTn(number_of_panels_in_series_per_chain, this._solarPanel.vmpp );
    }
  ngOnInit() {
    this._sfv = this._sfvService.get();
  }

}
