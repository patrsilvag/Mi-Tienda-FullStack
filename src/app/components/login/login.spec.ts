import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LoginComponent } from './login';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let fbMock: any;
  let routerMock: any;
  let authMock: any;

  beforeEach(() => {
    fbMock = {
      group: vi.fn(() => ({
        valid: true,
        value: { email: 't@t.com', password: '1' },
        get: vi.fn().mockReturnValue({ invalid: false, touched: false }),
      })),
    };
    routerMock = { navigate: vi.fn() };
    // ✅ Agregamos 'rol' al mock para evitar el error de toUpperCase()
    authMock = {
      login: vi.fn().mockReturnValue(of({ nombre: 'Test', rol: 'CLIENTE', token: '123' })),
    };
  });

  it('debería cubrir el flujo exitoso de login para CLIENTE', () => {
    const component = new LoginComponent(fbMock as any, routerMock as any, authMock as any);

    global.alert = vi.fn();
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {});

    component.onLogin();

    expect(authMock.login).toHaveBeenCalled();
    // ✅ Corregimos la ruta: tu componente redirige a /productos para clientes
    expect(routerMock.navigate).toHaveBeenCalledWith(['/productos']);
    // ✅ Corregimos el texto del alert: usa el nombre del mock
    expect(global.alert).toHaveBeenCalledWith('¡Bienvenido Test!');
  });

  it('debería cubrir el flujo exitoso de login para ADMIN', () => {
    // Simulamos respuesta de ADMIN
    authMock.login.mockReturnValue(of({ nombre: 'Admin', rol: 'ADMIN', token: '123' }));
    const component = new LoginComponent(fbMock as any, routerMock as any, authMock as any);

    global.alert = vi.fn();
    component.onLogin();

    expect(routerMock.navigate).toHaveBeenCalledWith(['/gestion-inventario']);
  });

  it('debería cubrir el flujo de error cuando las credenciales fallan', () => {
    authMock.login.mockReturnValueOnce(
      throwError(() => ({
        status: 401,
        message: 'Unauthorized',
      })),
    );

    const component = new LoginComponent(fbMock as any, routerMock as any, authMock as any);
    component.onLogin();

    // ✅ Corregimos el texto esperado para que coincida exactamente con el componente
    expect(component.mensajeError).toBe('Correo o contraseña incorrectos.');
  });

  it('debería cubrir el flujo de error 403', () => {
    authMock.login.mockReturnValueOnce(
      throwError(() => ({
        status: 403,
      })),
    );

    const component = new LoginComponent(fbMock as any, routerMock as any, authMock as any);
    component.onLogin();

    expect(component.mensajeError).toBe(
      'Acceso denegado: El servidor rechaza la conexión por seguridad.',
    );
  });
});
