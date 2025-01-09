import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { passwordValidator } from 'src/app/validators/password-validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  hidePassword: boolean = true;
  loginForm: FormGroup;
  responseMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, passwordValidator()]],
    });
  }
  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        this.snackBar.open(res.message, '', {
          duration: 3000,
        });
        if (res.data?.token) {
          this.authService.saveToken(res.data.token);
          // localStorage.setItem('token', res.data.token);
        }
        if (res.succeeded) {
          this.router.navigate(['/employees']);
        }
      },
      error: (err) => {
        this.snackBar.open('Registration failed', '', { duration: 3000 });
        this.responseMessage = err.error?.message || 'Login failed!';
      },
    });
  }
}
