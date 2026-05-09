import { describe, it, expect, vi } from 'vitest';
import { of } from 'rxjs';
import { PedidosService } from '@services/pedidos'; // 1. Usamos el alias
import { environment } from '../../environments/environment'; // 2. Centralización de URL

describe('PedidosService (Unit Test)', () => {
  it('debería crearse el servicio', () => {
    const httpMock = { post: vi.fn(), get: vi.fn() };
    const service = new PedidosService(httpMock as any);
    expect(service).toBeTruthy();
  });

  it('debería ejecutar registrarCompra() enviando POST', () => {
    const mockRespuesta = { mensaje: 'Compra exitosa' };
    const productoId = 101;
    const cantidad = 2;

    const httpMock = {
      post: vi.fn(() => of(mockRespuesta)),
    };

    const service = new PedidosService(httpMock as any);

    service.registrarCompra(productoId, cantidad).subscribe((res) => {
      expect(res).toEqual(mockRespuesta);
    });

    // 3. Usamos la URL del environment para que funcione en Docker
    expect(httpMock.post).toHaveBeenCalledWith(`${environment.apiPedidos}/comprar`, {
      productoId,
      cantidad,
    });
  });

  it('debería ejecutar getHistorial() mediante GET', () => {
    const mockHistorial = [{ id: 1, productoId: 101, cantidad: 2 }];
    const httpMock = {
      get: vi.fn(() => of(mockHistorial)),
    };

    const service = new PedidosService(httpMock as any);

    service.getHistorial().subscribe((res) => {
      expect(res).toEqual(mockHistorial);
    });

    // 4. Usamos la URL base del environment
    expect(httpMock.get).toHaveBeenCalledWith(environment.apiPedidos);
  });
});
