import { describe, it, expect, vi } from 'vitest';
import { ProductosComponent } from './productos';
import { of, throwError } from 'rxjs';

describe('ProductosComponent', () => {
  // Mocks de servicios[cite: 2]
  const pedidosMock = { 
    registrarCompra: vi.fn().mockReturnValue(of({ success: true })) 
  };
  const productosMock = { 
    listarProductos: vi.fn().mockReturnValue(of([{ 
      id: 1, 
      nombre: 'Test', 
      precio: 100, 
      descripcion: 'Desc', 
      stock: 10 
    }])) 
  };
  const routerMock = { navigate: vi.fn() };

  it('debería cubrir el flujo completo sin errores de tipo', () => {
    const component = new ProductosComponent(
      pedidosMock as any, 
      productosMock as any, 
      routerMock as any
    );

    // 1. Cubrir éxito en carga[cite: 2]
    component.ngOnInit();

    // 2. Cubrir error en carga (Líneas 32-34 de productos.ts)[cite: 2]
    productosMock.listarProductos.mockReturnValueOnce(throwError(() => new Error('Fail')));
    component.ngOnInit();

    // 3. Solución al Error 2345: Objeto con todas las propiedades requeridas[cite: 2]
    const productoCompleto = { 
      id: 1, 
      nombre: 'Laptop', 
      precio: 1000, 
      descripcion: 'Alta gama', 
      stock: 5 
    };
    
    component.comprarProducto(productoCompleto);
    
    // Verificaciones finales
    expect(pedidosMock.registrarCompra).toHaveBeenCalledWith(1, 1);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/pago-exito']);

    // 4. Cubrir validación de ID faltante[cite: 2]
    component.comprarProducto({ id: undefined } as any);
  });
});