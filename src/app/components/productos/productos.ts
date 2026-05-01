import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PedidosService } from '../../services/pedidos';
import { Productos } from '../../services/productos'; // <-- Importamos el servicio que acabas de armar
import { Producto } from '../../models/producto';

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
    private pedidosService: PedidosService,
    private productosService: Productos, // <-- Inyectamos tu servicio
    private router: Router,
  ) {}

  ngOnInit(): void {
    // Al cargar la pantalla, pedimos los datos reales a Spring Boot
    this.productosService.listarProductos().subscribe({
      next: (datosBD) => {
        this.productos = datosBD;
        console.log('✅ Datos 100% reales de Oracle:', this.productos);
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
        console.log('Compra registrada en ms-pedidos', respuesta);
        this.router.navigate(['/pago-exito']);
      },
      error: (err) => {
        console.error('Error al procesar la compra', err);
      },
    });
  }
}
