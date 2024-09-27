import { AbstractControl } from '@angular/forms';

export class minMaxNumValidator {
  static minMaxNum(control: AbstractControl) {
    let num = control.get('phone').value.toString();

        if (num.length < 10 || num.length > 12) {
            control.setErrors({ minMaxNum: true });
        } else {
            return null
        }
    }
}