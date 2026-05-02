import { describe, it, expect, vi } from 'vitest';
import { RecuperarPasswordComponent } from './recuperar-password';

describe('RecuperarPasswordComponent', () => {
  it('debería instanciarse y procesar la recuperación de contraseña', () => {
    // 1. Mock de FormBuilder (única dependencia del constructor)
    const fbMock = {
      group: vi.fn(() => ({
        valid: true,
        value: { email: 'test@correo.com' }
      }))
    };

    // 2. Instancia con un solo argumento según tu código fuente
    const component = new RecuperarPasswordComponent(fbMock as any);

    // 3. Ejecutamos el método para cubrir la lógica (Líneas 23-26)
    component.onRecuperar();

    expect(component).toBeTruthy();
    expect(component.mensajeEnviado).toBe(true);
  });
});