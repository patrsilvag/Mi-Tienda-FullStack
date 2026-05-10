import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// ✅ 1. Importamos el archivo de entorno
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PedidosService {
  // Puerto 8083 para el nuevo Microservicio de Pedidos
//  private readonly apiUrl = 'http://localhost:8083/api/pedidos';
  // ✅ 2. Usamos la variable centralizada en lugar de localhost:8083
  private readonly apiUrl = environment.apiPedidos;

  constructor(private readonly http: HttpClient) {}

  registrarCompra(productoId: number, cantidad: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/comprar`, { productoId, cantidad });
  }

  getHistorial(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
