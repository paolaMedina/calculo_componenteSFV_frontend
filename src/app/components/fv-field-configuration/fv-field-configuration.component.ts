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
  manufacturesNamesUnique: string[];
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

  ngOnInit() {
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
      console.log(this.paneles_solares, 'paneles solares');
      this.fabricantes_paneles = distinctOn<PanelSolar>(this.paneles_solares, 'fabricante');
      console.log(this.fabricantes_paneles, 'fabricantes_paneles solares');
    });

  }
}
