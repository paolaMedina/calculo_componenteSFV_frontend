

import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { MttpSpecifications } from '../models';
import { BaseFormBuilder } from './base.form';

@Injectable()
export class MttpSpecificationsFormBuilder extends BaseFormBuilder{

    constructor(private fb: FormBuilder) {
        super();
    }
    makeForm(mttpSpecifications?: MttpSpecifications): FormGroup {
        let mttpSpecificationsForm: FormGroup;
        mttpSpecificationsForm = this.fb.group({
            potencia_nominal: [mttpSpecifications? mttpSpecifications.potencia_nominal:''],
            tension_Mpp_MPPTn: [mttpSpecifications? mttpSpecifications.tension_Mpp_MPPTn:''],
            corriente_Mpp_MPPTn: [mttpSpecifications? mttpSpecifications.corriente_Mpp_MPPTn:''],
            tension_maxima_MPPTn: [mttpSpecifications? mttpSpecifications.tension_maxima_MPPTn:''],
            total_de_paneles: [mttpSpecifications? mttpSpecifications.total_de_paneles:''],
            potencia_fv_total: [mttpSpecifications? mttpSpecifications.potencia_fv_total:''],
            corriente_maxima_MPPTn: [mttpSpecifications? mttpSpecifications.corriente_maxima_MPPTn:''],
        });
        return mttpSpecificationsForm;
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
    extractData(form: FormGroup, initialMttp?: MttpSpecifications): MttpSpecifications {
        let mttpSpecifications: MttpSpecifications;
        if ( initialMttp ) {
            mttpSpecifications = initialMttp;    
        } else {
            mttpSpecifications = new MttpSpecifications();
        }
        mttpSpecifications.potencia_nominal = form.get('potencia_nominal').value;
        mttpSpecifications.tension_Mpp_MPPTn = form.get('tension_Mpp_MPPTn').value;
        mttpSpecifications.corriente_Mpp_MPPTn = form.get('corriente_Mpp_MPPTn').value;
        mttpSpecifications.tension_maxima_MPPTn = form.get('tension_maxima_MPPTn').value;
        mttpSpecifications.total_de_paneles = form.get('total_de_paneles').value;
        mttpSpecifications.potencia_fv_total = form.get('potencia_fv_total').value;
        mttpSpecifications.corriente_maxima_MPPTn = form.get('corriente_maxima_MPPTn').value;
        return mttpSpecifications;
    }
}