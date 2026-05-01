import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesario para el *ngFor del HTML
import { Router } from '@angular/router';

// Rutas ajustadas subiendo dos niveles (../../) para salir de components/productos/
import { PedidosService } from '../../services/pedidos';
import { Producto } from '../../models/producto';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './productos.html',
  styleUrls: ['./productos.scss'], // Si no usas scss, puedes borrar esta línea
})
export class ProductosComponent implements OnInit {
  // Inicializamos con 5 productos para cumplir con el requisito visual
  productos: Producto[] = [
    {
      id: 1,
      nombre: 'Laptop Pro',
      descripcion: 'Computadora portátil de alto rendimiento',
      precio: 1200000,
      stock: 10,
    },
    {
      id: 2,
      nombre: 'Monitor 27"',
      descripcion: 'Monitor 4K ideal para programación',
      precio: 350000,
      stock: 15,
    },
    {
      id: 3,
      nombre: 'Teclado Mecánico',
      descripcion: 'Teclado ergonómico con switches azules',
      precio: 85000,
      stock: 30,
    },
    {
      id: 4,
      nombre: 'Mouse Inalámbrico',
      descripcion: 'Mouse de precisión con batería recargable',
      precio: 45000,
      stock: 25,
    },
    {
      id: 5,
      nombre: 'Audífonos Noise Cancelling',
      descripcion: 'Audífonos over-ear con cancelación de ruido',
      precio: 150000,
      stock: 20,
    },
  ];

  constructor(
    private pedidosService: PedidosService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // Aquí cargarías los productos desde el puerto 8081 en el futuro
  }

  comprarProducto(producto: Producto) {
    if (!producto.id) return;

    this.pedidosService.registrarCompra(producto.id, 1).subscribe({
      next: (respuesta) => {
        console.log('Compra registrada en ms-pedidos', respuesta);
        this.router.navigate(['/pago-exito']);
      },
      error: (err) => {
        console.error('Error al procesar la compra', err);
        // Descomenta la siguiente línea si quieres probar la navegación de pantalla
        // aunque tu microservicio 8083 esté apagado ahora mismo:
        // this.router.navigate(['/pago-exito']);
      },
    });
  }
}
