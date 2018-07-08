import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { CustomValidators } from '../forms/validators';
import { FvField } from '../models';

@Injectable()
export class FvFormBuilder {

    constructor(private fb: FormBuilder) {
    }
    makeForm(fvField?: FvField): FormGroup {
        let fvFieldForm: FormGroup;
        fvFieldForm = this.fb.group({
            name: [fvField? fvField.name:'',  Validators.required],
            manufacturer_1: [fvField? fvField.manufacturer_1:'', Validators.required],
            solar_panel_model_1: [fvField? fvField.solar_panel_model_1:'', Validators.required],
            manufacturer_2: [fvField? fvField.manufacturer_2:'', Validators.required],
            solar_panel_model_2: [fvField? fvField.solar_panel_model_2:'', Validators.required],
        });
        return fvFieldForm;
    }
    getAllErrors(form: FormGroup): any {
            Object.keys(form.controls).forEach(key => {
            const controlErrors: ValidationErrors = form.get(key).errors;
            if (controlErrors != null) {
                  Object.keys(controlErrors).forEach(keyError => {
                    console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
                  });
                }
              });
    }
    extractData(form: FormGroup): FvField {
        let fvField = new FvField();
        fvField.name = form.get('name').value;
        fvField.manufacturer_1 = form.get('manufacturer_1').value;
        fvField.solar_panel_model_1 = form.get('solar_panel_model_1').value;
        fvField.manufacturer_2 = form.get('manufacturer_2').value;
        fvField.solar_panel_model_2 = form.get('solar_panel_model_2').value;
        return fvField;
    }


}