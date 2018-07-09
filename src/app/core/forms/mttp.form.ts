import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { FvField, Mttp } from '../models';
import { CustomValidators } from './validators';

@Injectable()
export class MttpFormBuilder {

    constructor(private fb: FormBuilder) {}
    makeForm(mttp?: Mttp): FormGroup {
        let fvFieldForm: FormGroup;
        fvFieldForm = this.fb.group({
            number_of_panels_in_series_per_chain: [mttp? mttp.number_of_panels_in_series_per_chain:'',  Validators.compose([Validators.required, CustomValidators.number])],
            number_of_chains_in_parallel: [mttp? mttp.number_of_chains_in_parallel:'',  Validators.compose([Validators.required, CustomValidators.number])]
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
    extractData(form: FormGroup): Mttp {
        let mttp = new Mttp('0');
        mttp.number_of_panels_in_series_per_chain = form.get('number_of_panels_in_series_per_chain').value;
        mttp.number_of_chains_in_parallel = form.get('number_of_chains_in_parallel').value;

        return mttp;
    }


}