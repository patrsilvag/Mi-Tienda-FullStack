import 'bootstrap';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class HeaderComponent {
  constructor(private router: Router) {}

  // ESTA ES LA FUNCIÓN QUE FALTA
  cerrarSesion(): void {
    // 1. Eliminamos los datos de la sesión local
    localStorage.removeItem('usuarioLogueado');

    // 2. Redirigimos al login para cumplir con el flujo de seguridad
    console.log('Logout exitoso: Sesión finalizada');
    this.router.navigate(['/login']);
  }
}
