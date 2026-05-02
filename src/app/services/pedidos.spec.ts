import { describe, it, expect, vi } from 'vitest';
import { of } from 'rxjs';
import { PedidosService } from './pedidos';

describe('PedidosService (Unit Test)', () => {

  it('debería crearse el servicio', () => {
    const httpMock = { post: vi.fn(), get: vi.fn() };
    const service = new PedidosService(httpMock as any);
    expect(service).toBeTruthy();
  });

  it('debería ejecutar registrarCompra() enviando POST', () => {
    const mockRespuesta = { mensaje: 'Compra exitosa' };
    const productoId = 101; // Según tu pedidos.ts, el primer parámetro es productoId
    const cantidad = 2;     // El segundo parámetro es cantidad
    
    const httpMock = {
      post: vi.fn(() => of(mockRespuesta))
    };

    const service = new PedidosService(httpMock as any);

    // Llamada correcta con los dos números que espera el método
    service.registrarCompra(productoId, cantidad).subscribe(res => {
      expect(res).toEqual(mockRespuesta);
    });

    // Verificamos que el POST se haga al endpoint correcto con el puerto 8083[cite: 7]
    expect(httpMock.post).toHaveBeenCalledWith(
      'http://localhost:8083/api/pedidos/comprar',
      { productoId, cantidad }
    );
  });

  it('debería ejecutar getHistorial() mediante GET', () => {
    const mockHistorial = [{ id: 1, productoId: 101, cantidad: 2 }];
    const httpMock = {
      get: vi.fn(() => of(mockHistorial))
    };

    const service = new PedidosService(httpMock as any);

    // getHistorial() no recibe parámetros según tu código[cite: 7]
    service.getHistorial().subscribe(res => {
      expect(res).toEqual(mockHistorial);
    });

    expect(httpMock.get).toHaveBeenCalledWith('http://localhost:8083/api/pedidos');
  });
});