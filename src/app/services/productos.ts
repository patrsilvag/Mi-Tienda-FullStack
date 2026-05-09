import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '@models/producto'; // Uso del alias configurado en tsconfig.json
import { environment } from '../../environments/environment'; // Uso del environment centralizado

@Injectable({
  providedIn: 'root',
})
export class Productos {
  // La URL ahora se obtiene dinámicamente según el entorno (Local o Docker)
  private readonly apiUrl = environment.apiProductos;

  constructor(private readonly http: HttpClient) {}

  // Consulta al catálogo en Oracle Cloud
  listarProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  // Lógica para que el ADMIN actualice stock desde la interfaz
  actualizarProducto(id: number, producto: Producto): Observable<Producto> {
    // Se mantiene el parámetro de rol para validación en el microservicio
    return this.http.put<Producto>(`${this.apiUrl}/${id}?rol=ADMIN`, producto);
  }
}
