import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UsuarioService } from '../../services/usuario';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './registro.html',
  styleUrl: './registro.scss',
})
export class RegistroComponent {
  registroForm: FormGroup;

  showPassword = false;
  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly usuarioService: UsuarioService,
  ) {
    this.registroForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8), // Regla 1: Mínimo 8 caracteres
          Validators.maxLength(50),
          Validators.pattern(/[A-Z]/), // Regla 2: Solo busca si EXISTE una mayúscula
          Validators.pattern(/\d/), // Regla 3: Solo busca si EXISTE un número
          Validators.pattern(/[$@!%*?&]/), // Regla 4: Carácter especial
        ],
      ],
    });
  }

  onRegistro() {
    if (this.registroForm.valid) {
      // 1. Construimos el objeto EXACTO que pide tu clase Usuario.java
      const usuarioParaJava = {
        nombreUsuario: this.registroForm.value.nombre, // 'nombre' -> 'nombreUsuario'
        email: this.registroForm.value.email,
        password: this.registroForm.value.password,
        rol: 'CLIENTE', // 2. Agregamos el rol AQUÍ para cumplir con el @NotNull de la Entity
      };

      this.usuarioService.registrar(usuarioParaJava).subscribe({
        next: (res: any) => {
          alert('Usuario registrado con éxito');
          this.router.navigate(['/login']);
        },
        error: (err: any) => {
          console.error('❌ Error 400 - Validación fallida:', err);
          const mensaje = err.error?.message || 'Ocurrió un error al registrar el usuario.';
          alert(mensaje);
        },
      });
    }
  }
}
