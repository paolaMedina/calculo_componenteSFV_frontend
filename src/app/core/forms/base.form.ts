import { FormGroup } from "@angular/forms";

/**
* Marks all controls in a form group as touched
* @param formGroup - The group to caress..hah
*/
export class BaseFormBuilder {
    public markFormGroupTouched(formGroup: FormGroup) {
        (<any>Object).values(formGroup.controls).forEach(control => {
            control.markAsTouched();

            if (control.controls) {
                control.controls.forEach(c => this.markFormGroupTouched(c));
            }
        });
    }
}