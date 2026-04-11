import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UsuarioService } from '../../services/usuario';

// Estructura de datos alineada con tu Entity de Spring Boot y Oracle Cloud
interface UsuarioSesion {
  id: number;
  nombreUsuario: string;
  email: string;
  rol: string;
}

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './perfil.html',
  styleUrl: './perfil.scss',
})
export class PerfilComponent implements OnInit {
  perfilForm: FormGroup;
  editando: boolean = false;
  usuario: UsuarioSesion = {
    id: 0,
    nombreUsuario: 'Cargando...',
    email: '',
    rol: '',
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService,
  ) {
    // Definición del formulario con las 4 validaciones de seguridad requeridas
    this.perfilForm = this.fb.group({
      nombreUsuario: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      // Validación de contraseña: Longitud, números y caracteres especiales
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/),
        ],
      ],
    });
  }

  ngOnInit(): void {
    const usuarioGuardado = localStorage.getItem('usuarioLogueado');

    if (usuarioGuardado) {
      try {
        this.usuario = JSON.parse(usuarioGuardado);
        // Precargar datos en el formulario
        this.perfilForm.patchValue({
          nombreUsuario: this.usuario.nombreUsuario,
          email: this.usuario.email,
        });
      } catch (error) {
        console.error('Error al sincronizar sesión:', error);
        this.router.navigate(['/login']);
      }
    } else {
      this.router.navigate(['/login']);
    }
  }

  toggleEdicion(): void {
    this.editando = !this.editando;
  }

  // Método que conecta con tu microservicio de Oracle Cloud
  onActualizar(): void {
    if (this.perfilForm.valid) {
      const datosActualizados = {
        ...this.perfilForm.value,
        rol: this.usuario.rol, // Mantenemos el rol original
      };

      this.usuarioService
        .actualizar(this.usuario.id, datosActualizados, this.usuario.rol)
        .subscribe({
          next: (res: any) => {
            // Actualizamos la sesión local con la respuesta del backend
            localStorage.setItem('usuarioLogueado', JSON.stringify(res));
            this.usuario = res;
            this.editando = false;
            alert('¡Perfil actualizado con éxito en la nube!');
          },
          error: (err) => {
            console.error('Error al actualizar en el microservicio:', err);
            alert('No se pudo actualizar el perfil. Revisa la consola.');
          },
        });
    }
  }

  cerrarSesion(): void {
    localStorage.removeItem('usuarioLogueado');
    this.router.navigate(['/login']);
  }
}
