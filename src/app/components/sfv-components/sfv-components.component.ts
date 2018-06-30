import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Sfv } from '@app/core/models';
import { SfvFormBuilder } from '@app/core/forms';
import { FvFieldService, SfvService } from '@app/core/services';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

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
    private router: Router,
    public snackBar: MatSnackBar
  ) {
    this.sfv = this.sfvService.get();
    this.sfvForm = this.sfvFormBuilder.makeForm();

   }
   openSnackBar(message: string, action: string) {
    this.snackBar.open( message, action, {
      duration: 2000,
    });
  }
   saveSfv() {
     console.log(this.sfvFormBuilder.getAllErrors(this.sfvForm));
     this.sfvForm.markAsTouched();
     this.sfvForm.get('investment_type').markAsTouched();
     this.sfvForm.get('instalation_place').markAsTouched();
    if ( this.sfvForm.valid ) {
      console.log(this.sfvForm.getError);
      this.sfv = this.sfvFormBuilder.extractData(this.sfvForm);
      this.sfvService.set(this.sfv);
      this.router.navigate(['/fv-fields-config']);
      console.log(this.sfvService.get());
    } else {
      this.openSnackBar("Se han enontrado algunos errores",  "Aceptar");
    }
   }
  ngOnInit() {
    this.sfv = this.sfvService.get();
    console.log(this.sfv);
    this.sfvForm = this.sfvFormBuilder.makeForm(this.sfv);
    console.log(this.sfvForm.get('investment_type').value);
  }

}
