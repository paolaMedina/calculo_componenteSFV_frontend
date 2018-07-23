import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { FvField, Inversor, BaseData, PanelSolar } from '../../core/models';
import { FvFieldService, BaseDataService, SfvService } from '../../core/services';
import { distinctOn } from '../../core/lib';
import { FvFormBuilder } from '../../core/forms/fv-field.form';
import { routercTransition } from '../../router.animations';
import { cargabilidad_inversor, potencia_fv_total } from '@app/core/lib/mttp-functions';
export interface Food {
  value: string;
  viewValue: string;
}



@Component({
  selector: 'app-fv-field-configuration',
  templateUrl: './fv-field-configuration.component.html',
  styleUrls: ['./fv-field-configuration.component.scss'],
  animations: [routercTransition()]

})
export class FvFieldConfigurationComponent implements OnInit {
  fvField: FvField;
  paneles_solares: PanelSolar[];
  fabricantes_paneles: String[];
  fvFieldForm: FormGroup;
  inversores: Inversor[];
  modelosPanel: String[];
  manufacturesNamesUnique: string[];
  pmax: string;
  vmpp: string;
  impp: string;
  voc: string;
  isc: string;
  eficiencia: string;
  coeficiente: string;
  _tension: string;
  _servicio: string;
  inversores_filtrados: Inversor[];
  inversores_filtrado_final: Inversor[];
  modelosInversor: string[];
  panelSeleccionado: PanelSolar;
  potencia_fv: number;
  carga_inversor: number;
  inversorSeleccionado: Inversor;
  foods: Food[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' }
  ];

  constructor(
    private _sfvService: SfvService,
    private _fvFieldService: FvFieldService,
    private _fvFormBuilder: FvFormBuilder,
    private _baseDataService: BaseDataService,
    private router: Router,
    public snackBar: MatSnackBar,
    private route: ActivatedRoute) {
    this.fvFieldForm = this._fvFormBuilder.makeForm();
      this.panelSeleccionado = this._fvFieldService.getSelectedSolarPanel();
      this.inversorSeleccionado = this._fvFieldService.getSelectedInversor();
    /* valor Tension y tipo de servicio  seleccionada*/
    this._tension = String(this._sfvService.get().voltage_servicio);
    this._servicio = this._sfvService.get().tipo_servicio;
  }
  saveChanges() {
    this.fvField = this._fvFormBuilder.extractData(this.fvFieldForm, this.fvField);
    this._fvFieldService.updateField(this.fvField);
  }
  return() {

    this.fvFieldForm.markAsTouched();
    this._fvFormBuilder.markFormGroupTouched(this.fvFieldForm);
    if (this.fvFieldForm.valid) {
      this.saveChanges();
      this.router.navigate(['/fv-fields-config']);
    } else {
      this.openSnackBar("Se han enontrado algunos errores, por favor corrija para continuar", "Aceptar");
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
  updatePanelSeleccionado(panel: PanelSolar) {
    this.pmax = String(panel.pmax);
    this.vmpp = String(Number(panel.vmpp).toFixed(3));
    this.impp = String(Number(panel.impp).toFixed(3));
    this.voc = String(Number(panel.voc).toFixed(3));
    this.isc = String(Number(panel.isc).toFixed(3));
    this.eficiencia = panel.eficiencia;
    this.coeficiente = panel.coef_voc;
  }

  updateInversor(inversores: Inversor[]) {
    let inversor_tension = [];

    for (let inversor of inversores) {
      if (inversor.vsal_1 == Number(this._tension)) {
        inversor_tension.push(inversor)
      }
      else if (inversor.vsal_2 == Number(this._tension)) {
        inversor_tension.push(inversor)
      }
      else if (inversor.vsal_3 == Number(this._tension)) {
        inversor_tension.push(inversor)
      }
    }
    return inversor_tension;
  }
  goToInvestorOutput() {
    this.fvFieldForm.markAsTouched();
    this._fvFormBuilder.markFormGroupTouched(this.fvFieldForm);
    if (this.fvFieldForm.valid) {
      this.saveChanges();
      this.router.navigate(['/fv-field-config/investor-output', this.fvField.id])
    } else {
      this.openSnackBar("Se han enontrado algunos errores, por favor corrija para continuar", "Aceptar");
    }
  }
  goToMpptsConfig() {
    this.fvFieldForm.markAsTouched();
    this._fvFormBuilder.markFormGroupTouched(this.fvFieldForm);
    if (this.fvFieldForm.valid) {
      this.saveChanges();
      this.router.navigate(['/mppts-config', this.fvField.id])
    } else {
      this.openSnackBar("Se han enontrado algunos errores, por favor corrija para continuar", "Aceptar");
    }
  }
  updateModelosPaneles(paneles: PanelSolar[]) {
    this.modelosPanel = distinctOn<PanelSolar>(paneles, 'descripcion');
  }
  ngOnInit() {


    /** Init fv form and fv field from persistant data storage at services */
    this.route.params.subscribe(params => {
      this.fvField = this._fvFieldService.get(params['id']);
      this.fvFieldForm = this._fvFormBuilder.makeForm(this.fvField);
    });
    /** Filtrar por modelo del panel seleccionado */
    this._baseDataService.getBaseData()
      .subscribe((base_data: BaseData) => {
        /**fabricante de paneles */
        this.paneles_solares = base_data.panelesSolares;
        this.fabricantes_paneles = distinctOn<PanelSolar>(this.paneles_solares, 'fabricante');

        /**fabricante de inversores */
        this.inversores = base_data.inversores;
        const inversores_filtrados_servicio = this.inversores.filter(inversor => inversor.tipo_conex === this._servicio);
        this.inversores_filtrado_final = this.updateInversor(inversores_filtrados_servicio);
        this.manufacturesNamesUnique = distinctOn<Inversor>(this.inversores_filtrado_final, 'fabricante');
    /** Trick for already loaded fv field  */
    if (this.fvField.fabricante_1 !== '') {
      const paneles_filtrados = this.paneles_solares.filter(panel => panel.fabricante === this.fvField.fabricante_1);
      this.updateModelosPaneles(paneles_filtrados);
      const panel_seleccionado = this.paneles_solares.filter(panel => panel.descripcion === this.fvField.model_panel_solar_1)[0];
      this.updatePanelSeleccionado(panel_seleccionado)
    }
    if( this.fvField.fabricante_2 &&  this.fvField.fabricante_2 !== '') {
      this.inversores_filtrados = this.inversores_filtrado_final.filter(inversor => inversor.fabricante ===  this.fvField.fabricante_2 );
      this.modelosInversor = distinctOn<Inversor>(this.inversores_filtrados, 'descripcion');
    }

      });
    /** Filtrar por panel por fabricante seleccionado */
    this.fvFieldForm.get('fabricante_1').valueChanges.subscribe(
      (name_fabricante: string) => {
        const paneles_filtrados = this.paneles_solares.filter(panel => panel.fabricante === name_fabricante);
        this.updateModelosPaneles(paneles_filtrados);
      }
    )

    /** Filtrar por panel-modelo seleccionado */
    this.fvFieldForm.get('model_panel_solar_1').valueChanges.subscribe(
      (modelo: string) => {
        const panel_seleccionado = this.paneles_solares.filter(panel => panel.descripcion === modelo)[0];
        this._fvFieldService.setSelectedSolarPanel(panel_seleccionado);
        this.updatePanelSeleccionado(panel_seleccionado);
      })

    /** Filtrar inversor por fabricante seleccionado */
    this.fvFieldForm.get('fabricante_2').valueChanges.subscribe(
      (name_fabricante: string) => {
        this.inversores_filtrados = this.inversores_filtrado_final.filter(inversor => inversor.fabricante === name_fabricante);
        this.modelosInversor = distinctOn<Inversor>(this.inversores_filtrados, 'descripcion');
      })

    /** Filtrar por modelo del inversor seleccionado */
    this.fvFieldForm.get('modelo_panel_solar_2').valueChanges.subscribe(
      (modelo: string) => {
        const inversor_seleccionado = this.inversores_filtrados.filter(inversor => inversor.descripcion === modelo)[0];
        this._fvFieldService.setSelectedInversor(inversor_seleccionado);
      })

    this.route.params.subscribe(params => {
      this.fvField = this._fvFieldService.get(params['id']);
      if ( this.fvField.mttps.length > 0 ) {
       this.potencia_fv = potencia_fv_total(this.fvField.mttps, this.panelSeleccionado.pmax);
       this.carga_inversor = cargabilidad_inversor(this.potencia_fv, this.inversorSeleccionado.pot_nom);
      }
      this.fvFieldForm.get('nombre').setValue(this.fvField.nombre);
    });
    /** Filtrar panel por fabricante seleccionado */
    this.fvFieldForm.get('fabricante_1').valueChanges.subscribe(
      (name_fabricante: string) => {
        const paneles_filtrados = this.paneles_solares.filter(panel => panel.fabricante === name_fabricante);
        this.modelosPanel = distinctOn<PanelSolar>(paneles_filtrados, 'descripcion');
      })
  }
}
