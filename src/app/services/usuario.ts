import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  // 1. Debes definir la variable aquí para poder usarla con "this"
  //private readonly apiUrl = 'http://localhost:8082/api/usuarios';
  // ✅ Usamos la variable centralizada
  private readonly apiUrl = environment.apiUsuarios;

  constructor(private readonly http: HttpClient) {}

  registrar(usuario: any): Observable<any> {
    // Usamos la variable para mantener el código limpio
    return this.http.post(`${this.apiUrl}?rol=CLIENTE`, usuario);
  }

  actualizar(id: number, usuario: any, rol: string): Observable<any> {
    // Ahora "this.apiUrl" ya existe y TypeScript no dará error
    return this.http.put(`${this.apiUrl}/${id}?rol=${rol}`, usuario);
  }
}
