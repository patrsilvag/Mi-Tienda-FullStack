import { CommonModule } from '@angular/common'; //
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UsuarioService } from '../../services/usuario';

interface UsuarioSesion {
  id: number;
  nombreUsuario: string;
  email: string;
  rol: string;
}

@Component({
  selector: 'app-perfil',
  standalone: true,
  // Mantén RouterModule para los enlaces de navegación si los usas
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
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly usuarioService: UsuarioService,
  ) {
    this.perfilForm = this.fb.group({
      nombreUsuario: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      // Cumple con las 4 validaciones: Requerido, Longitud Min, Números y Especiales
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
        this.perfilForm.patchValue({
          nombreUsuario: this.usuario.nombreUsuario,
          email: this.usuario.email,
        });
      } catch (error) {
        console.error('❌ Error al parsear sesión:', error);
        this.cerrarSesion();
      }
    } else {
      this.router.navigate(['/login']);
    }
  }

  toggleEdicion(): void {
    this.editando = !this.editando;
    // Si cancelas, reseteamos el form a los valores originales del usuario
    if (!this.editando) {
      this.perfilForm.patchValue({
        nombreUsuario: this.usuario.nombreUsuario,
        email: this.usuario.email,
      });
    }
  }

  onActualizar(): void {
    if (this.perfilForm.valid) {
      const datosActualizados = {
        ...this.perfilForm.value,
        rol: this.usuario.rol,
      };

      this.usuarioService
        .actualizar(this.usuario.id, datosActualizados, this.usuario.rol)
        .subscribe({
          next: (res: any) => {
            localStorage.setItem('usuarioLogueado', JSON.stringify(res));
            this.usuario = res;
            this.editando = false;
            alert('¡Perfil actualizado con éxito en Oracle Cloud!');
          },
          error: (err: any) => {
            // Tipado explícito para evitar errores de compilación
            console.error('Error en el microservicio:', err);
            alert('Error al actualizar: ' + (err.error?.message || 'Servidor no disponible'));
          },
        });
    }
  }

  cerrarSesion(): void {
    localStorage.removeItem('usuarioLogueado');
    this.router.navigate(['/login']);
  }
}
