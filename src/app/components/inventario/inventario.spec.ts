import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InventarioComponent } from './inventario';
import { Productos } from '../../services/productos'; // ✅ Importa desde productos.ts
import { of, throwError } from 'rxjs';
import { Producto } from '../../models/producto';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { vi } from 'vitest';

describe('InventarioComponent', () => {
  let component: InventarioComponent;
  let fixture: ComponentFixture<InventarioComponent>;
  let productosServiceSpy: any;

  const mockProductos: Producto[] = [
    { id: 1, nombre: 'Producto A', stock: 10, precio: 1000, descripcion: 'D' },
    { id: 2, nombre: 'Producto B', stock: 3, precio: 2000, descripcion: 'D' },
  ];

  beforeEach(async () => {
    // Espía del servicio con los métodos necesarios
    productosServiceSpy = {
      listarProductos: vi.fn().mockReturnValue(of(mockProductos)),
      actualizarProducto: vi.fn().mockReturnValue(of(mockProductos[0])),
    };

    await TestBed.configureTestingModule({
      imports: [InventarioComponent, FormsModule, CommonModule],
      providers: [{ provide: Productos, useValue: productosServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(InventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe cargar la lista de productos al iniciar (ngOnInit)', () => {
    expect(productosServiceSpy.listarProductos).toHaveBeenCalled();
    expect(component.listaProductos.length).toBe(2);
    expect(component.cargando).toBe(false);
  });

  it('debe retornar la clase CSS correcta según el stock', () => {
    expect(component.definirClaseStock(3)).toBe('table-danger');
    expect(component.definirClaseStock(10)).toBe('table-warning');
    expect(component.definirClaseStock(20)).toBe('');
  });

  it('debe actualizar el stock exitosamente y mostrar alerta', () => {
    const productoTest = { ...mockProductos[0] };
    const alertMock = vi.stubGlobal('alert', vi.fn());
    const obtenerStockSpy = vi.spyOn(component, 'obtenerStock');

    component.actualizarStock(productoTest);

    expect(productosServiceSpy.actualizarProducto).toHaveBeenCalledWith(
      productoTest.id,
      productoTest,
    );
    expect(window.alert).toHaveBeenCalledWith(
      `Stock de ${productoTest.nombre} actualizado correctamente.`,
    );
    expect(obtenerStockSpy).toHaveBeenCalled();

    vi.unstubAllGlobals();
  });

  it('debe manejar errores en la actualización del stock', () => {
    const productoTest = { ...mockProductos[0] };
    productosServiceSpy.actualizarProducto.mockReturnValue(
      throwError(() => new Error('Error Oracle')),
    );
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    component.actualizarStock(productoTest);

    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  it('no debe llamar al servicio si el producto no tiene ID (Guarda)', () => {
    const productoInvalido = { nombre: 'Sin ID', stock: 99 } as any;
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    component.actualizarStock(productoInvalido);

    expect(productosServiceSpy.actualizarProducto).not.toHaveBeenCalled();
    warnSpy.mockRestore();
  });
});
