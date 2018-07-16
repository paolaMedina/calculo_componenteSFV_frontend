import { AbstractControl, ValidationErrors, FormGroup, ValidatorFn, Validators } from "@angular/forms";
function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }
export  class CustomValidators {

     static number(control: AbstractControl): ValidationErrors | null {
        const value = control.value;
        if (value && !isNumber(value)) {
                return {
                    'number': 'El valor ingresado no es un número'
                    }                
        }
        return null;
    }
    static number_of_panels_fv( formGroup: FormGroup ):  ValidationErrors | null {
        if ( formGroup.get('calcular_potencial_de_planta').value ) {
            const number_of_fields_fv_control = formGroup.get('numero_de_campos_fv');
            if ( number_of_fields_fv_control.valid ) {
                return null;
            } else {
                return {
                    'numero_de_campos_fv': 'Ingrese un número de campos fv válido'
                };
            }

        }
        return null;
    }
    static celsius(control: AbstractControl): ValidationErrors | null {
        const value = control.value;
        if(value && !isNumber(value) && !(value >= 0 && value <=100)) {
            return {
                'celsius': 'El valor ingresado no es una temperatura en celsius correcta'
                }                  
        }
        return null;
    }
}