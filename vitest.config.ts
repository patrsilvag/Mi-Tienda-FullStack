// 1. Cambiamos 'vite' por 'vitest/config'
import { defineConfig } from 'vitest/config';
import angular from '@analogjs/vite-plugin-angular';
import path from 'path';

export default defineConfig({
  plugins: [
    angular({
      tsconfig: './tsconfig.spec.json',
    }),
  ],
  resolve: {
    // Mantenemos la configuración manual de alias para no forzar el plugin anterior
    alias: {
      '@services': path.resolve(__dirname, './src/app/services'),
      '@models': path.resolve(__dirname, './src/app/models'),
      '@components': path.resolve(__dirname, './src/app/components'),
    },
  },
  test: {
    // Ahora TypeScript ya no marcará error aquí
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test-setup.ts'],
    include: ['src/**/*.spec.ts'],
    coverage: {
      provider: 'v8', // El que ya estás usando
      reporter: ['text', 'lcov'], // 👈 ESTO ES CLAVE: agrega 'lcov'
      reportsDirectory: './coverage',
    },
  },
});
