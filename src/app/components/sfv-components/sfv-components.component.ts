import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Sfv } from '@app/core/models';
import { SfvFormBuilder } from '@app/core/forms';

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
    sfvFormBuilder: SfvFormBuilder
  ) {
    this.sfvForm = sfvFormBuilder.makeForm();
   }

  ngOnInit() {
  }

}
