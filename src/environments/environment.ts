export const environment = {
  production: false,
  // Ahora todo pasa por el Gateway (Puerto 80 implícito)
  apiUsuarios: 'http://mi-app-docker/api/usuarios',
  apiProductos: 'http://mi-app-docker/api/productos',
  apiPedidos: 'http://mi-app-docker/api/pedidos',
};
