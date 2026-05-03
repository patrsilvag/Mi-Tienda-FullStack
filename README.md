# FrontTiendaPedidos 🛒

Este proyecto es la interfaz FrontEnd para el **Sistema de Gestión de Pedidos**, desarrollado como parte de la Actividad Sumativa de la Experiencia 2. La aplicación está construida con **Angular 21** y diseñada bajo lineamientos empresariales de alta calidad y mantenibilidad.

## 🚀 Características Principales

* **Gestión de Inventario (Nuevo)**: Módulo avanzado para la visualización, filtrado y administración de stock de productos en tiempo real.
* **Arquitectura Responsiva**: Interfaz adaptada a móvil, tablet y desktop utilizando el sistema de **GRID de 12 columnas** de Bootstrap.
* **Gestión de Usuarios**: Incluye módulos de Inicio de Sesión, Registro, Recuperación de Contraseña y **Modificación de Perfil**.
* **Seguridad y Calidad**: Validaciones robustas en formularios y cumplimiento de métricas de código mediante **SonarQube** y **Vitest** (Meta de cobertura >90%).
* **Estado Local**: Manejo de sesión mediante variables de Angular y `localStorage` para persistencia de datos.

## 🛠️ Tecnologías Utilizadas

* **Framework**: Angular 21 (Sintaxis moderna de Control Flow: `@if`, `@else`).
* **Testing**: Vitest + AnalogJS para pruebas unitarias de alta velocidad y reportes de cobertura.
* **Estilos**: Bootstrap 5 (Layout responsivo y componentes UI).
* **Comunicación**: HttpClient para consumo de Microservicios REST.
* **Contenedores**: Docker para despliegue local consistente mediante contenedores.

## 🏗️ Arquitectura del Sistema

### FrontEnd: Smart & Dumb Components
La aplicación implementa una arquitectura basada en componentes para optimizar el flujo de datos:

* **Smart Components (Inteligentes)**: Como `PerfilComponent`, `InventarioComponent` y `LoginComponent`. Gestionan la lógica de negocio, inyectan servicios y manejan la comunicación con el Backend.
* **Dumb Components (Presentación)**: Como `HeaderComponent` y `FooterComponent`. Se enfocan exclusivamente en la interfaz gráfica, recibiendo datos y notificando eventos, facilitando su testeo unitario.

### BackEnd: Patrón MVC
El sistema se integra con un microservicio que sigue el patrón **MVC** (Model-View-Controller), con persistencia en **Oracle Cloud** mediante Spring Data JPA.

---

## 📂 Estructura de Directorios (Arquetipo)
```text
src/app/
├── components/          # Smart & Dumb Components organizados por vista
│   ├── footer/          # Presentación estática inferior
│   ├── header/          # Navegación y branding superior
│   ├── inventario/      # Gestión de stock y catálogo de productos (Nuevo)
│   ├── login/           # Gestión de acceso al sistema
│   ├── perfil/          # Visualización y edición de datos del usuario
│   └── registro/        # Formulario de alta de nuevos usuarios
├── models/              # Interfaces y contratos de datos (usuario.ts, producto.ts)
├── services/            # Lógica de comunicación con APIs REST
│   ├── auth.ts          # Gestión de autenticación y sesiones
│   ├── productos.ts     # Servicio para catálogo e inventario
│   └── usuario.ts       # CRUD de usuarios sincronizado con Oracle Cloud
├── app.routes.ts        # Definición centralizada del enrutamiento (SPA)
└── app.config.ts        # Configuración global e inyección de dependencias



## 💻 Instalación y Uso Local

### Requisitos previos
* Node.js y npm instalados.
* Angular CLI instalado (`npm install -g @angular/cli`).

### Desarrollo
1. Clonar el repositorio.
2. Instalar dependencias:
   ```bash
   npm install