import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PedidosService {
  // Puerto 8083 para el nuevo Microservicio de Pedidos
  private apiUrl = 'http://localhost:8083/api/pedidos';

  constructor(private http: HttpClient) {}

  registrarCompra(productoId: number, cantidad: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/comprar`, { productoId, cantidad });
  }

  getHistorial(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
