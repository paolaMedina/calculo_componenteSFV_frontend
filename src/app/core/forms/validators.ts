import { AbstractControl, ValidationErrors } from "@angular/forms";
import { isNumber } from "util";

export  class CustomValidators {
     static number(control: AbstractControl): ValidationErrors | null {
        const value = control.value;
        if (value && !isNumber(value)) {
                return {
                    'numberValidation': 'El valor ingresado no es un número'
                    }                
        }
        return null;
    }
    static celsius(control: AbstractControl): ValidationErrors | null {
        const value = control.value;
        if(value && !isNumber(value) && !(value >= 0 && value <=100)) {
            return {
                'celsiusValidation': 'El valor ingresado no es una temperatura en celsius correcta'
                }                  
        }
        return null;
    }
}