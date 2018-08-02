import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { CustomValidators } from './validators';
import { FvField } from '../models';
import { BaseFormBuilder } from './base.form';

@Injectable()
export class FvFormBuilder extends BaseFormBuilder{

    constructor(private fb: FormBuilder) {
        super();
    }
    makeForm(fvField?: FvField): FormGroup {
        let fvFieldForm: FormGroup;
        fvFieldForm = this.fb.group({
            nombre: [fvField? fvField.nombre:'',  Validators.required],
            fabricante_1: [fvField? fvField.fabricante_1:'', Validators.required],
            model_panel_solar_1: [fvField? fvField.model_panel_solar_1:'', Validators.required],
            fabricante_2: [fvField? fvField.fabricante_2:'', Validators.required],
            modelo_panel_solar_2: [fvField? fvField.modelo_panel_solar_2:'', Validators.required],
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
    extractData(form: FormGroup, initialFvField?: FvField): FvField {
        let fvField = new FvField();
        if ( initialFvField ) {
            fvField = initialFvField;
        }
        fvField.nombre = form.get('nombre').value;
        fvField.fabricante_1 = form.get('fabricante_1').value;
        fvField.model_panel_solar_1 = form.get('model_panel_solar_1').value;
        fvField.fabricante_2 = form.get('fabricante_2').value;
        fvField.modelo_panel_solar_2 = form.get('modelo_panel_solar_2').value;
        return fvField;
    }


}