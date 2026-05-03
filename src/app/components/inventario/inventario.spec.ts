import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InventarioComponent } from './inventario';
import { Productos } from '../../services/productos';
import { of, throwError } from 'rxjs';
import { Producto } from '../../models/producto';

describe('InventarioComponent', () => {
  let component: InventarioComponent;
  let fixture: ComponentFixture<InventarioComponent>;
  let productosServiceSpy: any;

  // Mock de datos para la prueba
  const mockProductos: Producto[] = [
    {
      id: 1,
      nombre: 'Producto A',
      stock: 10,
      precio: 1000,
      descripcion: 'D',
    },
    {
      id: 2,
      nombre: 'Producto B',
      stock: 3,
      precio: 2000,
      descripcion: 'D',
    },
  ];

  beforeEach(async () => {
    // Creamos un espía para el servicio
    productosServiceSpy = {
      listarProductos: vi.fn().mockReturnValue(of(mockProductos)),
    };

    await TestBed.configureTestingModule({
      imports: [InventarioComponent],
      providers: [{ provide: Productos, useValue: productosServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(InventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Ejecuta ngOnInit[cite: 8]
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

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
    expect(component.listaProductos.length).toBe(2); // Mantiene los anteriores o lista vacía
  });

  it('debe renderizar los productos en la tabla HTML', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const filas = compiled.querySelectorAll('tbody tr');
    expect(filas.length).toBe(2);
    expect(filas[0].textContent).toContain('Producto A');
  });
});
