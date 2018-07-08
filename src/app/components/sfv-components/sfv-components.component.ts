import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { Sfv, ManualSwitch, BaseData, Inversor } from '../../core/models';
import { SfvFormBuilder } from '../../core/forms';
import { SfvService, BaseDataService } from '../../core/services';
import { plant_fv_power, distinctOn, distinctWithoutZeros } from '../../core/lib';
import { InvestorTypeEnum } from '../../core/enums/investor-type';

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
  INVESTOR_TYPE_ENUM: InvestorTypeEnum;
  manual_switchs: ManualSwitch[];
  inversores: Inversor[];
  vsal1: String[];
  vsal2: String[];
  vsal3: String[];
  tension: String[];

  
  foods: Food[] = [
    {value: 'Trifásica', viewValue: 'Trifásica'},
    {value: 'Monofásica', viewValue: 'Monofásica'},
    {value: 'Monofásica', viewValue: 'Monofásica'},
    {value: 'Monofásica', viewValue: 'Monofásica'}
  ];
  
  constructor(
    private sfvFormBuilder: SfvFormBuilder,
    private sfvService: SfvService,
    private baseDataService: BaseDataService,
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
     this.sfvForm.get('investor_type').markAsTouched();
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
   recalculatePlantPower() {
    if (this.sfvForm.get('power_of_panel_fv').valid && this.sfvForm.get('total_panels_fv').valid) {
      this.sfvForm.get('power_of_plant_fv').setValue(plant_fv_power(
        this.sfvForm.get('power_of_panel_fv').value, this.sfvForm.get('total_panels_fv').value));
    }
   }
  ngOnInit() {
    this.baseDataService.getBaseData()
    .subscribe(
      (base_data: BaseData) => {
        console.log(base_data, 'base data from sfv component')
      }
    );
    this.baseDataService.getManualSwithches().subscribe(
      (manual_switchs: ManualSwitch[]) =>  {
        this.manual_switchs = manual_switchs;
        console.log(this.manual_switchs, 'manual switchs from sfv component')
       });

    this.baseDataService.getBaseData().subscribe(
      (base_data: BaseData) => {
        this.inversores = base_data.inversores;
        this.vsal1 = distinctOn<Inversor>(this.inversores, 'vsal_1');
        this.vsal2 = distinctOn<Inversor>(this.inversores, 'vsal_2');
        this.vsal3 = distinctOn<Inversor>(this.inversores, 'vsal_3');
        this.tension=this.vsal2.concat(this.vsal1,this.vsal3);
        this.tension=distinctWithoutZeros(this.tension);
        console.log(this.tension, 'tension');

      });



    this.sfv = this.sfvService.get();
    console.log(this.sfv);
    this.sfvForm = this.sfvFormBuilder.makeForm(this.sfv);
    console.log(this.sfvForm.get('investor_type').value);
    /** Cuando la opcion Calcular Potencia de planta se modifica, se deben limpiar los campos */
    this.sfvForm.get('calculate_plant_potential').valueChanges.subscribe(()=>{
      this.sfvForm.get('power_of_plant_fv').setValue('');
      this.sfvForm.get('total_panels_fv').setValue('');
      this.sfvForm.get('power_of_panel_fv').setValue('');
    });
    /** Cada que el total de paneles fv o el poder de los paneles fv cambien de valor, se debe recalcular el poder de la planta fv  */
    this.sfvForm.get('total_panels_fv').valueChanges.subscribe(() => {
    this.recalculatePlantPower();
      }
    );
    this.sfvForm.get('power_of_panel_fv').valueChanges.subscribe(() => {
      this.recalculatePlantPower();
    });


  }

}
