import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pago-exito',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pago-exito.html', // <--- Ajustado a tu nombre de archivo
  styleUrls: ['./pago-exito.scss'], // Si no usas scss, puedes borrar esta línea
})
export class PagoExitoComponent {
  // Componente estático para reflejar el éxito del pago
}
