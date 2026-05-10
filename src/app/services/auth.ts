import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; // ✅ Importante: la ruta debe ser correcta

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // ✅ Cambiamos el texto fijo por la variable del environment
  private readonly apiUrl = environment.apiUsuarios;

  constructor(private readonly http: HttpClient) {}

  login(credenciales: { email: string; password: string }): Observable<any> {
    // Ahora esto enviará a http://mi-app-docker/api/usuarios/login
    return this.http.post(`${this.apiUrl}/login`, credenciales);
  }

  // Agregamos la / antes del ? para que el Gateway no falle
  registrar(usuario: any): Observable<any> {
    const urlConRol = `${this.apiUrl}/?rol=CLIENTE`;
    return this.http.post(urlConRol, usuario);
  }
}
