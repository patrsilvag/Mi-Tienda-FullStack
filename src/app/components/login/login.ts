import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  mensajeError: string = ''; // Para mostrar errores del backend

  showPassword = false; 

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  // 2. Inyectamos el AuthService en el constructor
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  // 3. Actualizamos el método de login
  onLogin() {
    if (this.loginForm.valid) {
      // Limpiamos mensajes anteriores
      this.mensajeError = '';

      // Llamamos al backend real
      this.authService.login(this.loginForm.value).subscribe({
        next: (respuesta) => {
          
               
          // Guardamos la sesión en el navegador
       
          localStorage.setItem('usuarioLogueado', JSON.stringify(respuesta));

          alert('¡Bienvenido al sistema!');
          this.router.navigate(['/perfil']);
        },
        error: (err) => {
          console.error('Error en el login:', err);
          // Si el backend responde con error 401 (No autorizado) o similar
          this.mensajeError = 'Credenciales incorrectas o el servidor no responde.';
        },
      });
    }
  }
}
