import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

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
      console.log('Datos enviados:', this.registroForm.value);
      alert('¡Usuario registrado con éxito!');
      this.router.navigate(['/login']);
    }
  }
}
