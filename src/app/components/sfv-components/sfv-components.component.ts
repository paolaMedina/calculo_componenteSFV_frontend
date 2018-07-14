import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { Sfv, ManualSwitch, BaseData, Inversor } from '../../core/models';
import { SfvFormBuilder } from '../../core/forms';
import { SfvService, BaseDataService } from '../../core/services';
import { plant_fv_power, distinctOn, distinctWithoutZeros } from '../../core/lib';
import { InvestorTypeEnum } from '../../core/enums';
import { routercTransition } from '../../router.animations';

@Component({
  selector: 'app-sfv-components',
  templateUrl: './sfv-components.component.html',
  styleUrls: ['./sfv-components.component.scss'],
  animations: [routercTransition()]
})
export class SfvComponentsComponent implements OnInit {
  sfv: Sfv;
  sfvForm: FormGroup;
  INVESTOR_TYPE_ENUM: InvestorTypeEnum;
  inversores: Inversor[];
  vsal1: String[];
  vsal2: String[];
  vsal3: String[];
  tensiones: String[];
  tipos_de_servicio: String[];
 
  
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
     this.sfvForm.markAsTouched();
     this.sfvForm.get('investor_type').markAsTouched();
     this.sfvForm.get('instalation_place').markAsTouched();
    if ( this.sfvForm.valid ) {
      this.sfv = this.sfvFormBuilder.extractData(this.sfvForm);
      this.sfvService.set(this.sfv);
      this.router.navigate(['/fv-fields-config']);
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
   updateTensiones(inversores: Inversor[] ) {
    this.vsal1 = distinctOn<Inversor>(inversores, 'vsal_1');
    this.vsal2 = distinctOn<Inversor>(inversores, 'vsal_2');
    this.vsal3 = distinctOn<Inversor>(inversores, 'vsal_3');
    const _tensiones =this.vsal2.concat(this.vsal1,this.vsal3);
    this.tensiones=<Array<String>>distinctWithoutZeros(_tensiones);
   }
  ngOnInit() {
    this.sfv = this.sfvService.get();
    this.sfvForm = this.sfvFormBuilder.makeForm(this.sfv);

    

    /** Filtrar los tipos de tension */
    this.sfvForm.get('service_type').valueChanges.subscribe (
      (tipo_servicio: string) => {
       const inversores_filtrados = this.inversores.filter(inversor => inversor.tipo_conex === tipo_servicio);
       this.updateTensiones(inversores_filtrados);
      }
    )
    this.baseDataService.getBaseData()
    .subscribe(
      (base_data: BaseData) => {
      }
    );
      /** Iniciar inversores, tensiones y tipos de servicio */
      this.baseDataService.getBaseData().subscribe(
        (base_data: BaseData) => {
          this.inversores = base_data.inversores;
          this.tipos_de_servicio = distinctOn<Inversor>(this.inversores, 'tipo_conex');
          this.updateTensiones(this.inversores);
          if (this.sfv.service_type !== '') {
            const inversores_filtrados = this.inversores.filter(inversor => inversor.tipo_conex === this.sfv.service_type);
            this.updateTensiones(inversores_filtrados);
          }
        });


    /** Cuando la opcion Calcular Potencia de planta se modifica, se deben limpiar los campos */
    this.sfvForm.get('calculate_plant_potential').valueChanges.subscribe(()=>{
      this.sfvForm.get('power_of_plant_fv').setValue('');
      this.sfvForm.get('total_panels_fv').setValue('');
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
