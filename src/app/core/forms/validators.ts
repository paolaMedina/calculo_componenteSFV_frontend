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