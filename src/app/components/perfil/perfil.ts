import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [], // Componente ultraligero
  templateUrl: './perfil.html',
  styleUrl: './perfil.scss',
})
export class PerfilComponent implements OnInit {
  // Datos simulados (En el futuro vendrán de tu AuthService o LocalStorage)
  usuario = {
    nombre: 'Patricio',
    email: 'estudiante@duocuc.cl',
    rol: 'Administrador del Sistema',
    fechaRegistro: '09/04/2026',
  };

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Aquí se cargará la información desde la base de datos más adelante
    console.log('Vista de perfil cargada para:', this.usuario.nombre);
  }

  cerrarSesion() {
    // Simulamos la limpieza de sesión
    alert('Sesión cerrada correctamente. ¡Hasta pronto!');
    this.router.navigate(['/login']);
  }
}
