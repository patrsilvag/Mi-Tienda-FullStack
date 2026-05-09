import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InventarioComponent } from './inventario';
import { Productos } from '@services/productos'; // Usando el alias configurado
import { of, throwError } from 'rxjs';
import { Producto } from '@models/producto'; // Usando el alias configurado
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
    // 1. Agregamos el método 'actualizarProducto' al espía
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

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  // --- TUS TESTS ORIGINALES (Mantenidos) ---

  it('debe cargar la lista de productos al iniciar (ngOnInit)', () => {
    expect(productosServiceSpy.listarProductos).toHaveBeenCalled();
    expect(component.listaProductos.length).toBe(2);
    expect(component.cargando).toBe(false);
  });

  it('debe retornar "table-danger" si el stock es menor o igual a 5', () => {
    const clase = component.definirClaseStock(3);
    expect(clase).toBe('table-danger');
  });

  it('debe retornar "table-warning" si el stock es menor o igual a 15 pero mayor a 5', () => {
    const clase = component.definirClaseStock(10);
    expect(clase).toBe('table-warning');
  });

  it('debe manejar errores al cargar el stock', () => {
    productosServiceSpy.listarProductos.mockReturnValue(
      throwError(() => new Error('Error de API')),
    );
    component.obtenerStock();
    expect(component.cargando).toBe(false);
  });

  it('debe renderizar los productos en la tabla HTML', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const filas = compiled.querySelectorAll('tbody tr');
    expect(filas.length).toBe(2);
    expect(filas[0].textContent).toContain('Producto A');
  });

  // --- NUEVOS TESTS PARA COBERTURA DE SONARQUBE (Líneas 40-52, 60) ---
// --- NUEVOS TESTS CORREGIDOS PARA VITEST + JSDOM ---

  it('debe actualizar el stock exitosamente y mostrar alerta', () => {
    const productoTest = { ...mockProductos[0] }; // Producto A
    const alertMock = vi.stubGlobal('alert', vi.fn());
    const obtenerStockSpy = vi.spyOn(component, 'obtenerStock');

    productosServiceSpy.actualizarProducto.mockReturnValue(of(productoTest));

    component.actualizarStock(productoTest);

    expect(productosServiceSpy.actualizarProducto).toHaveBeenCalledWith(
      productoTest.id,
      productoTest,
    );

    // ✅ CORRECCIÓN: El mensaje debe ser exactamente el que recibe el alert
    expect(window.alert).toHaveBeenCalledWith(
      `Stock de ${productoTest.nombre} actualizado correctamente.`,
    );

    expect(obtenerStockSpy).toHaveBeenCalled();

    vi.unstubAllGlobals();
  });

  it('debe manejar errores en la actualización del stock (error en consola)', () => {
    const productoTest = { ...mockProductos[0] };
    
    // Forzamos un fallo en el microservicio
    productosServiceSpy.actualizarProducto.mockReturnValue(throwError(() => new Error('Error Oracle')));
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    component.actualizarStock(productoTest);

    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  it('no debe llamar al servicio si el producto no tiene ID (Guarda)', () => {
    const productoInvalido = { nombre: 'Sin ID', stock: 99 } as any;
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    component.actualizarStock(productoInvalido);

    // Verificamos que la guarda 'if (!producto.id)' funcionó
    expect(productosServiceSpy.actualizarProducto).not.toHaveBeenCalled();
    warnSpy.mockRestore();
  });


});
  
