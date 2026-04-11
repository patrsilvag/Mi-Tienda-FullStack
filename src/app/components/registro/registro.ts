import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
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

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService,
  ) {
    this.registroForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8), // Regla 1: Mínimo 8 caracteres
          Validators.pattern(/(?=.*[A-Z])/), // Regla 2: Al menos una Mayúscula
          Validators.pattern(/(?=.*[0-9])/), // Regla 3: Al menos un Número
          Validators.pattern(/(?=.*[$@$!%*?&])/), // Regla 4: Carácter especial
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

      console.log('Enviando datos validados:', usuarioParaJava);

      this.usuarioService.registrar(usuarioParaJava).subscribe({
        next: (res: any) => {
          console.log('✅ ¡Guardado en Oracle Cloud!', res);
          alert('Usuario registrado con éxito');
          this.router.navigate(['/login']);
        },
        error: (err: any) => {
          console.error('❌ Error 400 - Validación fallida:', err);
          alert('Revisa que el nombre tenga al menos 4 caracteres.');
        },
      });
    }
  }
}
