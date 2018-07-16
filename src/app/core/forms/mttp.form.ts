import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { FvField, Mttp } from '../models';
import { CustomValidators } from './validators';
import { BaseFormBuilder } from './base.form';

@Injectable()
export class MttpFormBuilder extends BaseFormBuilder{

    constructor(private fb: FormBuilder) {
        super();
    }
    makeForm(mttp?: Mttp): FormGroup {
        let fvFieldForm: FormGroup;
        fvFieldForm = this.fb.group({
            numero_de_paneles_en_serie_por_cadena: [mttp? mttp.numero_de_paneles_en_serie_por_cadena:'',  Validators.compose([Validators.required, CustomValidators.number])],
            numero_de_cadenas_en_paralelo: [mttp? mttp.numero_de_cadenas_en_paralelo:'',  Validators.compose([Validators.required, CustomValidators.number])]
        });
        return fvFieldForm;
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
    extractData(form: FormGroup, initialMttp?: Mttp): Mttp {
        let mttp: Mttp;
        if ( initialMttp ) {
            mttp = initialMttp;    
        } else {
            mttp = new Mttp('0');
        }
        mttp.numero_de_paneles_en_serie_por_cadena = form.get('numero_de_paneles_en_serie_por_cadena').value;
        mttp.numero_de_cadenas_en_paralelo = form.get('numero_de_cadenas_en_paralelo').value;
        return mttp;
    }


}