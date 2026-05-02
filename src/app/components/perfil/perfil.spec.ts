import { describe, it, expect, vi } from 'vitest';
import { PerfilComponent } from './perfil';
import { of, throwError } from 'rxjs'; // Añadimos throwError para cubrir casos de error

describe('PerfilComponent', () => {
  // Configuración de Mocks comunes
  const fbMock = {
    group: vi.fn(() => ({
      patchValue: vi.fn(),
      valid: true,
      value: { nombreUsuario: 'testUser', email: 'test@test.com' }
    }))
  };

  const routerMock = { navigate: vi.fn() };
  const usuarioServiceMock = {
    actualizar: vi.fn().mockReturnValue(of({ id: 1, nombreUsuario: 'Nuevo', email: 'n@n.com', rol: 'ADMIN' }))
  };

  // Setup global para los tests
  const usuarioFake = JSON.stringify({ id: 1, nombreUsuario: 'User', email: 'u@u.com', rol: 'ADMIN' });
  vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(usuarioFake);
  vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {});
  global.alert = vi.fn();

  it('debería cubrir el flujo de éxito, edición y cierre de sesión', () => {
    const component = new PerfilComponent(fbMock as any, routerMock as any, usuarioServiceMock as any);

    // 1. Cubrir ngOnInit (Líneas de carga de datos)
    component.ngOnInit();
    
    // 2. Cubrir toggleEdicion (Cambio de estado de la UI)
    component.toggleEdicion(); // Activa edición
    expect(component.editando).toBe(true);
    component.toggleEdicion(); // Cancela edición (ejecuta el patchValue interno)
    expect(component.editando).toBe(false);

    // 3. Cubrir onActualizar éxito (Líneas de respuesta de Oracle Cloud)
    component.onActualizar();
    expect(usuarioServiceMock.actualizar).toHaveBeenCalled();

    // 4. Cubrir cerrarSesion
    component.cerrarSesion();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('debería cubrir las líneas de error en la actualización', () => {
    // Forzamos al servicio a devolver un error
    usuarioServiceMock.actualizar.mockReturnValueOnce(throwError(() => ({ 
      error: { message: 'Error de servidor' } 
    })));

    const component = new PerfilComponent(fbMock as any, routerMock as any, usuarioServiceMock as any);
    
    component.onActualizar();
    // Esto cubre el bloque 'error: (err) => { ... }' en perfil.ts
    expect(global.alert).toHaveBeenCalled();
  });

it('debería cubrir el error de parseo en ngOnInit', () => {
  const fbMock = { group: vi.fn(() => ({ patchValue: vi.fn() })) };
  const routerMock = { navigate: vi.fn() };
  const serviceMock = { actualizar: vi.fn() };

  // Simulamos un JSON mal formado en el localStorage
  vi.spyOn(Storage.prototype, 'getItem').mockReturnValue('invalid-json');
  
  const component = new PerfilComponent(fbMock as any, routerMock as any, serviceMock as any);
  component.ngOnInit(); // Esto ejecutará el bloque catch(error)
  
  expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
});



});