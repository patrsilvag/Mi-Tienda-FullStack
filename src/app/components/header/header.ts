
import { Component, OnInit } from '@angular/core'; 
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class HeaderComponent implements OnInit {
  // 2. Implementa la interfaz

  constructor(private router: Router) {}

  // 3. Esta función se ejecuta apenas el Header aparece en pantalla
  ngOnInit(): void {
    
    this.isLoggedIn();
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('usuarioLogueado');
  }

  esAdmin(): boolean {
    const usuarioGuardado = localStorage.getItem('usuarioLogueado');
    if (usuarioGuardado) {
      const usuario = JSON.parse(usuarioGuardado);
      return usuario.rol === 'ADMIN'; 
    }
    return false;
  }

  cerrarSesion(): void {
    localStorage.removeItem('usuarioLogueado');
    this.router.navigate(['/login']);
  }
}
