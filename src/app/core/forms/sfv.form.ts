
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { CustomValidators } from '../../core/forms/validators';
import { Sfv } from '../../core/models';

@Injectable()
export class SfvFormBuilder {

    constructor(private fb: FormBuilder) {
    }
    makeForm(sfv?: Sfv): FormGroup {
        let sfvForm: FormGroup;
        sfvForm = this.fb.group({
            power_of_plant_fv: [sfv? sfv.power_of_plant_fv:'',  Validators.compose([Validators.required, CustomValidators.number])],
            power_of_panel_fv: [sfv? sfv.power_of_panel_fv: 0, CustomValidators.number],
            total_panels_fv: [sfv? sfv.total_panels_fv:0, CustomValidators.number],
            calculate_plant_potential: [sfv? sfv.calculate_plant_potential: ''],
            number_of_fields_fv: [sfv? sfv.number_of_fields_fv:'', CustomValidators.number],
            instalation_place_ceiling_option: [sfv? sfv.instalation_place_ceiling_option: ''],
            ambient_temperature: [sfv? sfv.ambient_temperature:'', Validators.compose([Validators.required, CustomValidators.celsius])],
            lowest_ambient_temperature_expected: [sfv? sfv.lowest_ambient_temperature_expected:'', Validators.compose([Validators.required, CustomValidators.celsius])],
            investor_type: [sfv? sfv.investor_type:'', Validators.required],
            service_type: [sfv? sfv.service_type:'', Validators.required],
            service_voltage: [sfv? sfv.service_voltage:'', Validators.required],
            instalation_place: [sfv? sfv.instalation_place:'', Validators.required]
        });
        return sfvForm;
    }
    getAllErrors(form: FormGroup): any {
            Object.keys(form.controls).forEach(key => {
            const controlErrors: ValidationErrors = form.get(key).errors;
            if (controlErrors != null) {
                  Object.keys(controlErrors).forEach(keyError => {
                  });
                }
              });
    }
    extractData(form: FormGroup): Sfv {
        let sfv = new Sfv();
        sfv.power_of_plant_fv = form.get('power_of_plant_fv').value;
        sfv.ambient_temperature = form.get('ambient_temperature').value;
        sfv.instalation_place = form.get('instalation_place').value;
        sfv.calculate_plant_potential = form.get('calculate_plant_potential').value;
        sfv.number_of_fields_fv = form.get('number_of_fields_fv').value;
        sfv.investor_type = form.get('investor_type').value;
        sfv.lowest_ambient_temperature_expected = form.get('lowest_ambient_temperature_expected').value;
        sfv.power_of_panel_fv = form.get('power_of_panel_fv').value;
        sfv.total_panels_fv = form.get('total_panels_fv').value;
        sfv.service_type = form.get('service_type').value;
        sfv.service_voltage = form.get('service_voltage').value;
        sfv.instalation_place_ceiling_option = form.get('instalation_place_ceiling_option').value;
        return sfv;
    }


}