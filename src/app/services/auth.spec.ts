import { describe, it, expect, vi } from 'vitest';
import { AuthService } from './auth';
import { of } from 'rxjs';
import { environment } from '../../environments/environment';

describe('AuthService (sin TestBed)', () => {

  it('debería crearse el servicio', () => {
    const httpMock = {
      post: vi.fn()
    };

    const service = new AuthService(httpMock as any);

    expect(service).toBeTruthy();
  });

  it('debería ejecutar login()', () => {
    const respuestaMock = { token: '123' };

    const httpMock = {
      post: vi.fn(() => of(respuestaMock))
    };

    const service = new AuthService(httpMock as any);

    service.login({ email: 'test', password: '123' })
      .subscribe(res => {
        expect(res).toEqual(respuestaMock);
      });

    expect(httpMock.post).toHaveBeenCalledWith(
      //  'http://localhost:8082/api/usuarios/login',
      // { email: 'test', password: '123' }
      `${environment.apiUsuarios}/login`, // ✅ Ahora el test es dinámico también
      { email: 'test', password: '123' },
    );
  });

});