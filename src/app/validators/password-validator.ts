import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.value;

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasNonAlphanumeric = /[^a-zA-Z0-9]/.test(password);
    const isValidLength = password ? password.length >= 5 : false;

    const passwordValid =
      hasUpperCase &&
      hasLowerCase &&
      hasDigit &&
      hasNonAlphanumeric &&
      isValidLength;

    return password && !passwordValid ? { passwordStrength: true } : null;
  };
}
