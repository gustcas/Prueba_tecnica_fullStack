import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-users',
  standalone: false,
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  email = '';
  password = '';
  loading = false;
  error = '';

  loggedIn$;
  showPassword = false;

  constructor(private authService: AuthService) {
    this.loggedIn$ = this.authService.loggedIn$;
  }

  login(): void {
    if (!this.email || !this.password) {
      this.error = 'Email y contraseña son requeridos';
      return;
    }

    this.loading = true;
    this.error = '';

    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.error =
          err?.error?.message || 'Error al iniciar sesión. Verifique sus datos.';
      },
    });
  }

  logout(): void {
    this.authService.logout();
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
