export interface Usuario {
  id?: number;
  nombreUsuario: string;
  email: string;
  password?: string;
  rol: 'ADMIN' | 'CLIENTE';
}
