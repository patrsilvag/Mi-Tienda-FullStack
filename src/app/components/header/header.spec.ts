import { describe, it, expect, vi } from 'vitest';
import { HeaderComponent } from './header';

describe('HeaderComponent', () => {
  it('debería cubrir todas las rutas del header', () => {
    const routerMock = { navigate: vi.fn() };
    const component = new HeaderComponent(routerMock as any);

    // Simulamos un usuario para cubrir esAdmin e isLoggedIn
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(JSON.stringify({ rol: 'ADMIN' }));

    component.ngOnInit();
    component.isLoggedIn();
    component.esAdmin();
    component.cerrarSesion(); // Nombre correcto según header.ts[cite: 5]

    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
  });
});