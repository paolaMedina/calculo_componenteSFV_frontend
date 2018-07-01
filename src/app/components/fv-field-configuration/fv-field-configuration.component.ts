import { Component, OnInit, Input } from '@angular/core';
import { FvField } from '@app/core/models';
import { FvFieldService } from '@app/core/services';
import { ActivatedRoute } from '@angular/router';
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
  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];
  constructor(private _fvFieldService: FvFieldService, private route: ActivatedRoute) { }
  saveChanges() {
    this._fvFieldService.updateField(this.fvField);
  }

  ngOnInit() {
    this.route.params.subscribe( params => {
      this.fvField = this._fvFieldService.get(params['id']);
      console.log(this.fvField);
    })
  }

}
