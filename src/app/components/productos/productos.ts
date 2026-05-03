import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from '../../models/producto';
import { PedidosService } from '../../services/pedidos';
import { Productos } from '../../services/productos';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './productos.html',
})
export class ProductosComponent implements OnInit {
  // ¡Empezamos con un arreglo VACÍO! Nada de datos falsos.
  productos: Producto[] = [];

  constructor(
    private readonly pedidosService: PedidosService,
    private readonly productosService: Productos, // <-- Inyectamos tu servicio
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    // Al cargar la pantalla, pedimos los datos reales a Spring Boot
    this.productosService.listarProductos().subscribe({
      next: (datosBD) => {
        this.productos = datosBD;
      },
      error: (err) => {
        console.error('❌ Error al traer productos:', err);
      },
    });
  }

  comprarProducto(producto: Producto) {
    if (!producto.id) return;

    this.pedidosService.registrarCompra(producto.id, 1).subscribe({
      next: (respuesta) => {
        this.router.navigate(['/pago-exito']);
      },
      error: (err) => {
        console.error('Error al procesar la compra', err);
      },
    });
  }
}
