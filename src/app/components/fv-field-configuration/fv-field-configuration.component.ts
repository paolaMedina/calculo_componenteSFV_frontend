import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';

import { FvField, Inversor, BaseData, PanelSolar } from '../../core/models';
import { FvFieldService, BaseDataService } from '../../core/services';
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
  fabricantes_paneles:String[];
  fvFieldForm: FormGroup ;
  invesrsors: Inversor[];
  modelos: String[];
  manufacturesNamesUnique: string[];
  pmax:string;
  vmpp:string;
  impp:string;
  voc:string;
  isc:string;
  eficiencia:string;
  coeficiente :string;

  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];

  constructor(
    private _fvFieldService: FvFieldService,
    private _fvFormBuilder: FvFormBuilder,
    private _baseDataService: BaseDataService,
    private route: ActivatedRoute) {
    this.fvFieldForm = this._fvFormBuilder.makeForm();
     }
  saveChanges() {
    this._fvFieldService.updateField(this.fvField);
  }

  updateModelosPaneles(paneles: PanelSolar[] ) {
    this.modelos = distinctOn<PanelSolar>(paneles, 'descripcion');

   }

   updatePanelSeleccionado(panel:PanelSolar){
    this.pmax=String(panel.pmax);
    this.vmpp=panel.vmpp;
    this.impp=panel.impp;
    this.voc=panel.voc;
    this.isc=panel.isc;
    this.eficiencia=panel.eficiencia;
    this.coeficiente=panel.coef_voc;
    console.log(this.pmax, 'pmax')

   }

  ngOnInit() {

    /** Filtrar por panel por fabricante seleccionado */
    this.fvFieldForm.get('manufacturer_1').valueChanges.subscribe (
      (name_fabricante: string) => {
       const paneles_filtrados = this.paneles_solares.filter(panel => panel.fabricante === name_fabricante);
       this.updateModelosPaneles(paneles_filtrados);
      }
    )

    /** Filtrar por panel-modelo seleccionado */
    this.fvFieldForm.get('solar_panel_model_1').valueChanges.subscribe (
      (modelo: string) => {
       const panel_seleccionado = this.paneles_solares.filter(panel => panel.descripcion === modelo)[0];
       console.log(panel_seleccionado, 'panel')
       this.updatePanelSeleccionado(panel_seleccionado);
      }
    )


    this._baseDataService.getBaseData()
    .subscribe(
      (baseData:  BaseData) => {
        this.invesrsors = baseData.inversores;
        this.manufacturesNamesUnique = distinctOn<Inversor>(this.invesrsors, 'fabricante');
        console.log(this.manufacturesNamesUnique);
      }
    )
    this.route.params.subscribe( params => {
      this.fvField = this._fvFieldService.get(params['id']);
      console.log(this.fvField);
    });

    this._baseDataService.getBaseData()
    .subscribe((base_data: BaseData) => {
      this.paneles_solares = base_data.panelesSolares;
      this.fabricantes_paneles = distinctOn<PanelSolar>(this.paneles_solares, 'fabricante');
      
    });

  }
}
