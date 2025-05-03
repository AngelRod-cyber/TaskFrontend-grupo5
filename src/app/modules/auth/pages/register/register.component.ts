import { Component } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService
      .register({ username: this.username, password: this.password })
      .subscribe({
        next: () => {
          Swal.fire('Registro exitoso', 'Por favor inicia sesión.', 'success');
          this.router.navigate(['/auth/login']);
        },
        error: () => {
          Swal.fire('Error', 'Hubo un problema con el registro.', 'error');
        },
      });
  }
}

