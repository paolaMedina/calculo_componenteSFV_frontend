
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { CustomValidators } from '../../core/forms/validators';
import { Sfv } from '../../core/models';
import { BaseFormBuilder } from './base.form';

@Injectable()
export class SfvFormBuilder extends BaseFormBuilder{

    constructor(private fb: FormBuilder) {
        super();
    }
    makeForm(sfv?: Sfv): FormGroup {
        let sfvForm: FormGroup;
        sfvForm = this.fb.group({
        potencia_de_planta_fv: [sfv? sfv.potencia_de_planta_fv:'',  Validators.compose([Validators.required, CustomValidators.number])],
            nombre_proyecto: [sfv? sfv.nombre_proyecto: '', Validators.compose([Validators.required, Validators.pattern("[A-Za-z0-9]{3,}[A-Za-z0-9 \- _]+")])],
            potencial_de_panel_fv: [sfv? sfv.potencial_de_panel_fv: 0, CustomValidators.number],
            total_paneles_fv: [sfv? sfv.total_paneles_fv:0, CustomValidators.number],
            calcular_potencial_de_planta: [sfv? sfv.calcular_potencial_de_planta: ''],
            lugar_instalacion_opcion_techo_cubierta: [sfv? sfv.lugar_instalacion_opcion_techo_cubierta: ''],
            temperatura_ambiente: [sfv? sfv.temperatura_ambiente:'', Validators.compose([Validators.required, CustomValidators.celsius])],
            minima_temperatura_ambiente_esperada: [sfv? sfv.minima_temperatura_ambiente_esperada:'', Validators.compose([Validators.required, CustomValidators.celsius])],
            tipo_de_inversor: [sfv? sfv.tipo_de_inversor:'', Validators.required],
            tipo_servicio: [sfv? sfv.tipo_servicio:'', Validators.required],
            voltage_servicio: [sfv? sfv.voltage_servicio:'', Validators.required],
            lugar_instalacion: [sfv? sfv.lugar_instalacion:'', Validators.required]
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
        sfv.potencia_de_planta_fv = form.get('potencia_de_planta_fv').value;
        sfv.nombre_proyecto = form.get('nombre_proyecto').value;
        sfv.temperatura_ambiente = form.get('temperatura_ambiente').value;
        sfv.lugar_instalacion = form.get('lugar_instalacion').value;
        sfv.calcular_potencial_de_planta = form.get('calcular_potencial_de_planta').value;
        sfv.tipo_de_inversor = form.get('tipo_de_inversor').value;
        sfv.minima_temperatura_ambiente_esperada = form.get('minima_temperatura_ambiente_esperada').value;
        sfv.potencial_de_panel_fv = form.get('potencial_de_panel_fv').value;
        sfv.total_paneles_fv = form.get('total_paneles_fv').value;
        sfv.tipo_servicio = form.get('tipo_servicio').value;
        sfv.voltage_servicio = form.get('voltage_servicio').value;
        sfv.lugar_instalacion_opcion_techo_cubierta = form.get('lugar_instalacion_opcion_techo_cubierta').value;
        return sfv;
    }


}