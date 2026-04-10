import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

// Definimos la estructura exacta que viene de tu Spring Boot
interface UsuarioSesion {
  id: number;
  nombreUsuario: string;
  email: string;
  rol: string;
}

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './perfil.html',
  styleUrl: './perfil.scss',
})
export class PerfilComponent implements OnInit {
  // Inicializamos con valores vacíos pero con las llaves correctas del Backend
  usuario: UsuarioSesion = {
    id: 0,
    nombreUsuario: 'Cargando...',
    email: '',
    rol: '',
  };

  constructor(private router: Router) {}

  ngOnInit(): void {
    // 1. Intentamos obtener la sesión del LocalStorage
    const usuarioGuardado = localStorage.getItem('usuarioLogueado');

    if (usuarioGuardado) {
      try {
        // 2. Parseamos el JSON y lo asignamos a nuestra variable
        this.usuario = JSON.parse(usuarioGuardado);
        console.log('✅ Perfil sincronizado con Oracle:', this.usuario.nombreUsuario);
      } catch (error) {
        console.error('❌ Error al leer la sesión:', error);
        this.router.navigate(['/login']);
      }
    } else {
      // 3. Si no hay sesión, mandamos al usuario de vuelta al Login
      console.warn('⚠️ No hay sesión activa. Redirigiendo...');
      this.router.navigate(['/login']);
    }
  }

  cerrarSesion() {
    localStorage.removeItem('usuarioLogueado');
    // Opcional: limpiar también otros datos si los hubiera
    this.router.navigate(['/login']);
  }
}
