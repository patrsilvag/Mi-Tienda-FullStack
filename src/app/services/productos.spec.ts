import { describe, it, expect, vi } from 'vitest';
import { of } from 'rxjs';
import { Productos } from './productos';
import { Producto } from '../models/producto';

describe('ProductosService (Unit Test)', () => {

  it('debería crearse el servicio', () => {
    // Creamos un mock manual de HttpClient
    const httpMock = { get: vi.fn() };
    const service = new Productos(httpMock as any);
    expect(service).toBeTruthy();
  });

  it('debería ejecutar listarProductos() mediante GET', () => {
    const productosMock: Producto[] = [
      {
        id: 1,
        nombre: 'Producto A',
        descripcion: 'Descripción A',
        precio: 15000,
        stock: 10,
      } as Producto
    ];

    // Configuramos el mock para devolver el observable con los datos
    const httpMock = {
      get: vi.fn(() => of(productosMock))
    };

    const service = new Productos(httpMock as any);

    service.listarProductos().subscribe((res) => {
      expect(res.length).toBe(1);
      expect(res).toEqual(productosMock);
    });

    // Verificamos que se llame a la URL correcta del puerto 8081[cite: 9]
    expect(httpMock.get).toHaveBeenCalledWith('http://localhost:8081/api/productos');
  });
});