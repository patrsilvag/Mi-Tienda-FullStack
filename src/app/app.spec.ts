import { describe, it, expect } from 'vitest';

describe('AppComponent (Bypass)', () => {
  it('verificación de carga de componente', async () => {
    // Dinámico para evitar que el compilador analice el decorador antes de tiempo
    const { AppComponent } = await import('./app');
    const app = new AppComponent();
    expect(app).toBeTruthy();
  });
});