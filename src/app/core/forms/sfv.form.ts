
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from './validators';
import { Injectable } from '@angular/core';
import { Sfv } from '@app/core/models';

@Injectable()
export class SfvFormBuilder {

    constructor(private fb: FormBuilder) {
    }
    makeForm(): FormGroup {
        let sfvForm: FormGroup;
        sfvForm = this.fb.group({
            power_of_plant_fv: ['',  Validators.compose([Validators.required, CustomValidators.number])],
            total_panels_fv: ['', Validators.compose([Validators.required, CustomValidators.number])],
            calculate_plant_potential: [''],
            power_of_panel_fv: ['', Validators.required],
            number_of_fields_fv: ['', CustomValidators.number],
            ambient_temperature: ['', Validators.compose([Validators.required, CustomValidators.celsius])],
            lowest_ambient_temperature_expected: ['', Validators.compose([Validators.required, CustomValidators.celsius])],
            investment_type: ['', Validators.required],
            service_type: ['', Validators.required],
            service_voltage: ['', Validators.required],
            instalation_place: ['', Validators.required]
        });
        console.log(sfvForm);
        return sfvForm;
    }
    extractData(form: FormGroup): Sfv {
        let sfv = new Sfv();
        sfv.ambient_temperature = form.get('ambient_temperature').value;
        sfv.instalation_place = form.get('instalation_place').value;
        sfv.investment_type = form.get('investment_type').value;
        sfv.lowest_ambient_temperature_expected = form.get('lowest_ambient_temperature_expected').value;
        sfv.power_of_panel_fv = form.get('power_of_panel_fv').value;
        sfv.service_type = form.get('service_type').value;
        sfv.service_voltage = form.get('service_voltage').value;
        sfv.total_panels_fv =  form.get('total_panels_fv').value;
        return sfv;
    }

}