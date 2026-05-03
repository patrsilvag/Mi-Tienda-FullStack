import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Productos } from '../../services/productos';
import { Producto } from '../../models/producto';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [CommonModule],
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

  // Define colores de Bootstrap según el nivel de stock
  definirClaseStock(stock: number): string {
    if (stock <= 5) return 'table-danger'; // Stock crítico
    if (stock <= 15) return 'table-warning'; // Stock bajo
    return '';
  }
}
