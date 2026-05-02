import { describe, it, expect, vi } from 'vitest';
import { LoginComponent } from './login';
import { of, throwError } from 'rxjs'; // Añadimos throwError para simular fallos

describe('LoginComponent', () => {
  // Mocks compartidos
  const fbMock = { 
    group: vi.fn(() => ({ 
      valid: true, 
      value: { email: 't@t.com', password: '1' } 
    })) 
  };
  const routerMock = { navigate: vi.fn() };
  const authMock = { 
    login: vi.fn().mockReturnValue(of({ nombre: 'Test', token: '123' })) 
  };

  it('debería cubrir el flujo exitoso de login', () => {
    const component = new LoginComponent(fbMock as any, routerMock as any, authMock as any);
    
    global.alert = vi.fn();
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {});

    component.onLogin();
    
    expect(authMock.login).toHaveBeenCalled();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/perfil']);
    expect(global.alert).toHaveBeenCalledWith('¡Bienvenido al sistema!');
  });

  it('debería cubrir el flujo de error cuando las credenciales fallan', () => {
    // Forzamos al servicio a devolver un error 401 o similar
    authMock.login.mockReturnValueOnce(throwError(() => ({ 
      status: 401, 
      message: 'Unauthorized' 
    })));

    const component = new LoginComponent(fbMock as any, routerMock as any, authMock as any);
    
    component.onLogin();
    
    // Esto asegura que la línea 51 (mensajeError) sea ejecutada y marcada como cubierta[cite: 1]
    expect(component.mensajeError).toBe('Credenciales incorrectas o el servidor no responde.');
  });
});