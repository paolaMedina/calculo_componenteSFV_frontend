import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { FvField, Inversor, BaseData, PanelSolar } from '../../core/models';
import { FvFieldService, BaseDataService, SfvService } from '../../core/services';
import { distinctOn } from '../../core/lib';
import { FvFormBuilder } from '../../core/forms/fv-field.form';
export interface Food {
  value: string;
  viewValue: string;
}



@Component({
  selector: 'app-fv-field-configuration',
  templateUrl: './fv-field-configuration.component.html',
  styleUrls: ['./fv-field-configuration.component.scss']

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

    /* valor Tension y tipo de servicio  seleccionada*/
    this._tension = String(this._sfvService.get().service_voltage);
    this._servicio = this._sfvService.get().service_type;
  }
  saveChanges() {
    this.fvField = this._fvFormBuilder.extractData(this.fvFieldForm, this.fvField.id);
    this._fvFieldService.updateField(this.fvField);
  }
  return() {

    this.fvFieldForm.markAsTouched();
    this.markFormGroupTouched(this.fvFieldForm);
    if (this.fvFieldForm.valid) {
      this.saveChanges();
      this.router.navigate(['/fv-fields-config']);
    } else {
      this.openSnackBar("Se han enontrado algunos errores, por favor corrija para continuar", "Aceptar");
    }
  }
  /**
* Marks all controls in a form group as touched
* @param formGroup - The group to caress..hah
*/
  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        control.controls.forEach(c => this.markFormGroupTouched(c));
      }
    });
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
      if (inversor.vsal_1 == this._tension) {
        inversor_tension.push(inversor)
      }
      else if (inversor.vsal_2 == this._tension) {
        inversor_tension.push(inversor)
      }
      else if (inversor.vsal_3 == this._tension) {
        inversor_tension.push(inversor)
      }
    }
    return inversor_tension;
  }
  goToMpptsConfig() {
    this.fvFieldForm.markAsTouched();
    this.markFormGroupTouched(this.fvFieldForm);
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
    if (this.fvField.manufacturer_1 !== '') {
      const paneles_filtrados = this.paneles_solares.filter(panel => panel.fabricante === this.fvField.manufacturer_1);
      this.updateModelosPaneles(paneles_filtrados);
    }
    if( this.fvField.manufacturer_2 &&  this.fvField.manufacturer_2 !== '') {
      this.inversores_filtrados = this.inversores_filtrado_final.filter(inversor => inversor.fabricante ===  this.fvField.manufacturer_2 );
      this.modelosInversor = distinctOn<Inversor>(this.inversores_filtrados, 'descripcion');
    }

      });
    /** Filtrar por panel por fabricante seleccionado */
    this.fvFieldForm.get('manufacturer_1').valueChanges.subscribe(
      (name_fabricante: string) => {
        const paneles_filtrados = this.paneles_solares.filter(panel => panel.fabricante === name_fabricante);
        this.updateModelosPaneles(paneles_filtrados);
      }
    )

    /** Filtrar por panel-modelo seleccionado */
    this.fvFieldForm.get('solar_panel_model_1').valueChanges.subscribe(
      (modelo: string) => {
        const panel_seleccionado = this.paneles_solares.filter(panel => panel.descripcion === modelo)[0];
        this._fvFieldService.setSelectedSolarPanel(panel_seleccionado);
        this.updatePanelSeleccionado(panel_seleccionado);
      })

    /** Filtrar inversor por fabricante seleccionado */
    this.fvFieldForm.get('manufacturer_2').valueChanges.subscribe(
      (name_fabricante: string) => {
        this.inversores_filtrados = this.inversores_filtrado_final.filter(inversor => inversor.fabricante === name_fabricante);
        this.modelosInversor = distinctOn<Inversor>(this.inversores_filtrados, 'descripcion');
      })

    /** Filtrar por modelo del inversor seleccionado */
    this.fvFieldForm.get('solar_panel_model_2').valueChanges.subscribe(
      (modelo: string) => {
        const inversor_seleccionado = this.inversores_filtrados.filter(inversor => inversor.descripcion === modelo)[0];
        this._fvFieldService.setSelectedInversor(inversor_seleccionado);
      })

    this.route.params.subscribe(params => {
      this.fvField = this._fvFieldService.get(params['id']);
      this.fvFieldForm.get('name').setValue(this.fvField.name);
      console.log(this.fvField, 'fv field from fv field configuration');
    });
    /** Filtrar panel por fabricante seleccionado */
    this.fvFieldForm.get('manufacturer_1').valueChanges.subscribe(
      (name_fabricante: string) => {
        const paneles_filtrados = this.paneles_solares.filter(panel => panel.fabricante === name_fabricante);
        this.modelosPanel = distinctOn<PanelSolar>(paneles_filtrados, 'descripcion');
        console.log(this.modelosPanel, 'modelos panel ')
      })
  }
}
