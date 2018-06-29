
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from './validators';
import { Injectable } from '@angular/core';

@Injectable()
export class SfvFormBuilder {

    constructor(private fb: FormBuilder) {
    }
    makeForm(): FormGroup {
        let sfvForm: FormGroup;
        sfvForm = this.fb.group({
            power_of_plant_fv: ['', Validators.required],
            total_panels_fv: ['', Validators.compose([Validators.required, CustomValidators.number])],
            power_of_panel_fv: ['', Validators.required],
            number_of_fields_fv: ['', CustomValidators.number],
            ambient_temperature: ['', Validators.compose([Validators.required, CustomValidators.celsius])],
            lowest_ambient_temperature_expected: ['', Validators.compose([Validators.required, CustomValidators.celsius])],
            investment_type: ['', Validators.required],
            service_type: ['', Validators.required],
            service_voltage: ['', Validators.required],
            instalation_place: ['', Validators.required]
        });
        return sfvForm;
    }

}