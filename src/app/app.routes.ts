import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { RecuperarPasswordComponent } from './components/recuperar-password/recuperar-password';
import { PerfilComponent } from './components/perfil/perfil';
import { PagoExitoComponent } from './components/pago-exito/pago-exito';
import { ProductosComponent } from './components/productos/productos';


export const routes: Routes = [
  // 1. Redirigir la raíz al login
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // 2. Definir la ruta del login
  { path: 'login', component: LoginComponent },

  // 3. Preparar las rutas para los siguientes componentes
  {
    path: 'registro',
    loadComponent: () => import('./components/registro/registro').then((m) => m.RegistroComponent),
  },

  // ¡La ruta específica debe ir ANTES del comodín!
  { path: 'recuperar-password', component: RecuperarPasswordComponent },

  // la ruta del Perfil!
  { path: 'perfil', component: PerfilComponent },

  { path: 'productos', component: ProductosComponent },

  { path: 'pago-exito', component: PagoExitoComponent },

  // 4. Comodín: si escriben cualquier cosa que no exista arriba, al login. SIEMPRE AL FINAL.
  { path: '**', redirectTo: 'login' },

  
];
