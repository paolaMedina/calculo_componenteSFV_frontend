import { Component, OnInit, Input } from '@angular/core';
import { FvField, PanelSolar, BaseData } from '@app/core/models';
import { FvFieldService, BaseDataService } from '@app/core/services';
import { ActivatedRoute } from '@angular/router';
export interface Food {
  value: string;
  viewValue: string;
}

export function distinctOn<T>(objects: T[], distinct_by: string): any[] {
  const unique = Array.from( new Set(objects.map(item => item[`${distinct_by}`])));
  console.log(unique);
  return unique;
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
  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];
  constructor(private _fvFieldService: FvFieldService, 
              private route: ActivatedRoute,
              private baseDataService: BaseDataService,) { }
  saveChanges() {
    this._fvFieldService.updateField(this.fvField);
  }

  ngOnInit() {
    this.route.params.subscribe( params => {
      this.fvField = this._fvFieldService.get(params['id']);
      console.log(this.fvField);
    });

    this.baseDataService.getBaseData()
    .subscribe((base_data: BaseData) => {
      this.paneles_solares = base_data.panelesSolares;
      console.log(this.paneles_solares, 'paneles solares');
      this.fabricantes_paneles = distinctOn<PanelSolar>(this.paneles_solares, 'fabricante');
      console.log(this.fabricantes_paneles, 'fabricantes_paneles solares');
    });

  }
}
