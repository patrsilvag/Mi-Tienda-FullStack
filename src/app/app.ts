import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// Importamos directamente desde el nombre del archivo que tienes
import { HeaderComponent } from './components/header/header';
import { FooterComponent } from './components/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  // Asegúrate de que los nombres de las clases coincidan con los definidos dentro de header.ts y footer.ts
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class AppComponent {}
