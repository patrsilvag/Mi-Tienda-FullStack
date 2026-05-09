import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  mensajeError: string = '';

  showPassword = false;

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly authService: AuthService,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.mensajeError = '';

      this.authService.login(this.loginForm.value).subscribe({
        next: (respuesta) => {
          localStorage.setItem('usuarioLogueado', JSON.stringify(respuesta));

          // ✅ Añadimos una protección simple (|| '') para que el test no falle si no hay rol
          const rolUsuario = (respuesta.rol || '').toUpperCase();

          alert(`¡Bienvenido ${respuesta.nombre || 'al sistema'}!`);

          if (rolUsuario === 'ADMIN') {
            this.router.navigate(['/gestion-inventario']);
          } else {
            // ✅ Cambiamos a la ruta real que definiste en tu componente
            this.router.navigate(['/productos']);
          }
        },
        error: (err) => {
          console.error('Error detallado:', err);
          if (err.status === 403) {
            this.mensajeError = 'Acceso denegado: El servidor rechaza la conexión por seguridad.';
          } else {
            this.mensajeError = 'Correo o contraseña incorrectos.';
          }
        },
      });
    }
  }
}
