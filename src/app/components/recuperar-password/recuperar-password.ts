import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-recuperar-password',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule], // Ya no está CommonModule aquí
  templateUrl: './recuperar-password.html',
  styleUrl: './recuperar-password.scss',
})
export class RecuperarPasswordComponent {
  recuperarForm: FormGroup;
  mensajeEnviado: boolean = false;

  constructor(private fb: FormBuilder) {
    this.recuperarForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onRecuperar() {
    if (this.recuperarForm.valid) {
      
      this.mensajeEnviado = true;
    }
  }
}
