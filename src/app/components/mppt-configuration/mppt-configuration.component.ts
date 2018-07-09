import { Component, OnInit, Input } from '@angular/core';
import { mttpSpecifications, Mttp,  PanelSolar, Sfv } from '../../core/models';
import { FvFieldService, SfvService } from '../../core/services';
import { total_de_paneles, potencia_nominal, corriente_maxima_MPPTn, corriente_Mpp_MPPTn, tension_maxima_MPPTn, tension_Mpp_MPPTn } from '../../core/lib/mttp-functions';
@Component({
  selector: 'app-mppt-configuration',
  templateUrl: './mppt-configuration.component.html',
  styleUrls: ['./mppt-configuration.component.scss']
})
export class MpptConfigurationComponent implements OnInit {
  @Input() mttp: Mttp;
  private _solarPanel: PanelSolar;
  private _sfv: Sfv;
  mttpSpecifications: mttpSpecifications;
  constructor(
    private _fvFieldService: FvFieldService,
    private _sfvService: SfvService
  ) { }
  updateMttpSpecifications() {
    this.mttpSpecifications.total_de_paneles = total_de_paneles(this.mttp.number_of_chains_in_parallel, this.mttp.number_of_panels_in_series_per_chain);
    this.mttpSpecifications.potencia_nominal = potencia_nominal(this.mttpSpecifications.total_de_paneles, this._solarPanel.pmax);
    this.mttpSpecifications.corriente_maxima_MPPTn = corriente_maxima_MPPTn(this.mttp.number_of_chains_in_parallel, Number(this._solarPanel.isc));
    this.mttpSpecifications.corriente_Mpp_MPPTn = corriente_Mpp_MPPTn(this.mttp.number_of_chains_in_parallel, Number(this._solarPanel.impp));
    this.mttpSpecifications.tension_maxima_MPPTn = tension_maxima_MPPTn(this.mttp.number_of_panels_in_series_per_chain, Number(this._solarPanel.voc), Number(this._solarPanel.coef_voc), this._sfv.lowest_ambient_temperature_expected );
    this.mttpSpecifications.tension_Mpp_MPPTn = tension_Mpp_MPPTn(this.mttp.number_of_panels_in_series_per_chain, this._solarPanel.vmpp );

    }
  ngOnInit() {
    this._sfv = this._sfvService.get();
    this._solarPanel = this._fvFieldService.getSelectedSolarPanel();
  }

}
