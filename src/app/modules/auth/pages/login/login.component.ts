import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import * as AuthActions from '../../../../store/auth/auth.actions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(
    private authService: AuthService,
    private store: Store,
    private router: Router
  ) {}

  login(): void {
    this.authService.login({ username: this.username, password: this.password }).subscribe({
      next: (response) => {
        // Dispatch de la acción de login a la store
        this.store.dispatch(AuthActions.login({ token: response.token }));

        // Guardar el token en localStorage
        localStorage.setItem('token', response.token);
        localStorage.setItem('userId', response.userId.toString());

        // Mostrar alerta de éxito
        Swal.fire({
          icon: 'success',
          title: '¡Inicio de sesión exitoso!',
          text: 'Bienvenido a la gestión de tareas.',
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          // Redirigir a la página de tareas
          this.router.navigate(['/tasks']);
        });
      },
      error: () => {
        // Mostrar alerta de error
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Correo o contraseña incorrectos.',
          confirmButtonText: 'Intentar de nuevo',
        });
      },
    });
  }
}
