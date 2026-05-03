import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root',
})
export class Productos {
  // Mantengo el nombre de tu clase

  // Reemplaza esto con la URL exacta de tu ms-producto
  private readonly apiUrl = 'http://localhost:8081/api/productos';

  // Inyectamos el HttpClient para poder hacer peticiones a Spring Boot
  constructor(private readonly http: HttpClient) {}

  // Función que va a Oracle y trae la lista real
  listarProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }
}
