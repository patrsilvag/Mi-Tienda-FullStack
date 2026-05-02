import { describe, it, expect, vi } from 'vitest';
import { RegistroComponent } from './registro';
import { of, throwError } from 'rxjs';

describe('RegistroComponent', () => {
  it('debería cubrir el flujo de registro', () => {
    const fbMock = { 
      group: vi.fn(() => ({ 
        valid: true, 
        value: { nombreUsuario: 'test', email: 't@t.com', password: '123' } 
      })) 
    };
    const routerMock = { navigate: vi.fn() };
    const usuarioServiceMock = { 
      registrar: vi.fn().mockReturnValue(of({ success: true })) 
    };

    // Asegúrate de pasar los mocks en el orden exacto de tu constructor[cite: 4]
    const component = new RegistroComponent(
      fbMock as any,
      routerMock as any,
      usuarioServiceMock as any
    );

    global.alert = vi.fn();

    // Caso de éxito
    component.onRegistro();
    expect(usuarioServiceMock.registrar).toHaveBeenCalled();

    // Caso de error para cubrir las líneas restantes
    usuarioServiceMock.registrar.mockReturnValueOnce(throwError(() => ({ error: 'Fail' })));
    component.onRegistro();
    expect(global.alert).toHaveBeenCalled();
  });
});