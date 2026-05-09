import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Productos } from '../../services/productos';
import { Producto } from '../../models/producto';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inventario.html',
  styleUrl: './inventario.scss',
})
export class InventarioComponent implements OnInit {
  listaProductos: Producto[] = [];
  cargando: boolean = true;

  constructor(private readonly productosService: Productos) {}

  ngOnInit(): void {
    this.obtenerStock();
  }

  obtenerStock(): void {
    this.productosService.listarProductos().subscribe({
      next: (data) => {
        this.listaProductos = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar el inventario:', err);
        this.cargando = false;
      },
    });
  }

  // 💡 Implementación de la sugerencia: Guardar cambios de stock
  actualizarStock(producto: Producto): void {
    // Verificamos que el ID no sea undefined o null
    if (producto.id === undefined) {
      console.error('No se puede actualizar un producto sin ID');
      return;
    }

    // Ahora TypeScript sabe que producto.id es un 'number' seguro
    this.productosService.actualizarProducto(producto.id, producto).subscribe({
      next: () => {
        alert(`Stock de ${producto.nombre} actualizado correctamente.`);
        this.obtenerStock();
      },
      error: (err) => {
        console.error('Error al actualizar el stock:', err);
      },
    });
  }
  // Define colores de Bootstrap según el nivel de stock
  definirClaseStock(stock: number): string {
    if (stock <= 5) return 'table-danger'; // Stock crítico
    if (stock <= 15) return 'table-warning'; // Stock bajo
    return '';
  }
}
