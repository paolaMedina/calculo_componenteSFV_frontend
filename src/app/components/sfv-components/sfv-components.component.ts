import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Sfv } from '@app/core/models';
import { SfvFormBuilder } from '@app/core/forms';
import { FvFieldService, SfvService } from '@app/core/services';

export interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-sfv-components',
  templateUrl: './sfv-components.component.html',
  styleUrls: ['./sfv-components.component.scss']
})
export class SfvComponentsComponent implements OnInit {
  sfv: Sfv;
  sfvForm: FormGroup;
  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];
  constructor(
    private sfvFormBuilder: SfvFormBuilder,
    private sfvService: SfvService,
    private fvFieldsService: FvFieldService
  ) {
    this.sfv = this.sfvService.get();
    this.sfvForm = sfvFormBuilder.makeForm();
   }
   initFvFields() {
     if ( this.sfv.total_fields_fv >= 1 ) {
       this.fvFieldsService.setTotalFvFields(this.sfv.total_fields_fv);
      this.fvFieldsService.initFvFields();
     }
   }
  ngOnInit() {
  }

}
