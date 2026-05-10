import { describe, it, expect, vi, beforeEach } from 'vitest';
import { of } from 'rxjs';
import { Productos } from './productos'; // ✅ Corregido: Importa desde tu archivo original
import { Producto } from '../models/producto';
import { environment } from '../../environments/environment'; // ✅ Importamos el environment

describe('ProductosService (Unit Test)', () => {
  let service: Productos;
  let httpMock: any;

  beforeEach(() => {
    // Inicializamos el mock antes de cada test para evitar duplicidad de código
    httpMock = {
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
    };
    service = new Productos(httpMock as any);
  });

  it('debería crearse el servicio', () => {
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
      } as Producto,
    ];

    // Configuramos el mock para devolver el observable con los datos
    httpMock.get.mockReturnValue(of(productosMock));

    service.listarProductos().subscribe((res) => {
      expect(res.length).toBe(1);
      expect(res).toEqual(productosMock);
    });

    // ✅ CORRECCIÓN DINÁMICA: Ya no usamos localhost en duro
    expect(httpMock.get).toHaveBeenCalledWith(environment.apiProductos);
  });
});
