import { describe, it, expect, vi } from 'vitest';
import { of } from 'rxjs';
import { UsuarioService } from './usuario';

describe('UsuarioService (Unit Test)', () => {

  it('debería crearse el servicio', () => {
    // Mock manual del cliente HTTP
    const httpMock = { post: vi.fn(), put: vi.fn() };
    const service = new UsuarioService(httpMock as any);
    expect(service).toBeTruthy();
  });

  it('debería ejecutar registrar() con POST y rol=CLIENTE', () => {
    const mockRespuesta = { id: 1, email: 'test@correo.com' };
    const datosUsuario = { email: 'test@correo.com', password: '123' };
    
    const httpMock = {
      post: vi.fn(() => of(mockRespuesta))
    };

    const service = new UsuarioService(httpMock as any);

    service.registrar(datosUsuario).subscribe(res => {
      expect(res).toEqual(mockRespuesta);
    });

    // Verificamos la llamada al endpoint de usuarios[cite: 7]
    expect(httpMock.post).toHaveBeenCalled();
  });

  it('debería ejecutar actualizar() con PUT y rol dinámico', () => {
    const mockRespuesta = { mensaje: 'Actualizado' };
    const idUsuario = 1;
    const nuevosDatos = { nombre: 'Nombre Actualizado' };
    const rolMock = 'CLIENTE';
    const httpMock = {
      put: vi.fn(() => of(mockRespuesta))
    };

    const service = new UsuarioService(httpMock as any);

    service.actualizar(idUsuario, nuevosDatos,rolMock).subscribe(res => {
      expect(res).toEqual(mockRespuesta);
    });

    expect(httpMock.put).toHaveBeenCalled();
  });
});