


import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { CustomValidators } from '../../core/forms/validators';
import {  Source } from '../../core/models';

@Injectable()
export class SourceFormBuilder {

    constructor(private fb: FormBuilder) {
    }
    makeForm(source?: Source): FormGroup {
        let sourceForm: FormGroup;
        sourceForm = this.fb.group({
            tipo_alambrado:  [source? source.tipo_alambrado:'', Validators.required],
            tipo_canalizacion: [source? source.tipo_canalizacion:''],
            canalizacion: [source? source.canalizacion:''],
            tamanio_canalizacion: [source? source.tamanio_canalizacion:''],
            disenio_bandeja: [source? source.disenio_bandeja:''],
            material_bandeja:[source? source.material_bandeja:''],
            tipo_acabado: [source? source.tipo_acabado:''],
            tipo_conductor: [source? source.tipo_conductor:'',  Validators.compose([CustomValidators.number, Validators.required]) ],
            material_conductor: [source? source.material_conductor:'', Validators.required],
            distancia_del_conductor_mas_largo: [source? source.distancia_del_conductor_mas_largo:'',   Validators.compose([CustomValidators.number, Validators.required])],
            caida_de_tension_de_diseño: [source? source.caida_de_tension_de_diseño:'',  Validators.compose([CustomValidators.number, Validators.required])],
            tapa_superior_bandeja_portacable: [source? source.tapa_superior_bandeja_portacable:'', ],
            tapa_inferior_bandeja_portacable: [source? source.tapa_inferior_bandeja_portacable:'', ],
            perfiles_separadores: [source? source.perfiles_separadores:'', ],
            longitud_tramo: [source? source.longitud_tramo:'', ],
            ancho_mm: [source? source.ancho_mm:'', CustomValidators.number],
            alto_mm: [source? source.alto_mm:'', CustomValidators.number ],
            tipo_carga: [source? source.tipo_carga:'', ],
        });
        return sourceForm;
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
    extractData(form: FormGroup, initialSource: Source): Source {
        let source = new Source();
        if ( initialSource ) {
            source = initialSource;
        }
        source.tipo_canalizacion = form.get('tipo_canalizacion').value;
        source.canalizacion = form.get('canalizacion').value;
        source.material_bandeja = form.get('material_bandeja').value;
        source.tamanio_canalizacion = form.get('tamanio_canalizacion').value;
        source.tipo_acabado = form.get('tipo_acabado').value;
        source.disenio_bandeja = form.get('disenio_bandeja').value;
        source.tipo_conductor = form.get('tipo_conductor').value;
        source.material_conductor = form.get('material_conductor').value;
        source.distancia_del_conductor_mas_largo = form.get('distancia_del_conductor_mas_largo').value;
        source.caida_de_tension_de_diseño = form.get('caida_de_tension_de_diseño').value;

        source.tapa_superior_bandeja_portacable= form.get('tapa_superior_bandeja_portacable').value;
        source.tapa_inferior_bandeja_portacable= form.get('tapa_inferior_bandeja_portacable').value;
        source.perfiles_separadores= form.get('perfiles_separadores').value;
        source.longitud_tramo= form.get('longitud_tramo').value;
        source.ancho_mm= form.get('ancho_mm').value;
        source.alto_mm= form.get('alto_mm').value;
        source.tipo_carga= form.get('tipo_carga').value;
        return source;
    }


}