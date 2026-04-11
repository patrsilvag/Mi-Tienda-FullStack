# FrontTiendaPedidos 🛒

Este proyecto es la interfaz FrontEnd para el **Sistema de Gestión de Pedidos**, desarrollado como parte de la Actividad Sumativa de la Experiencia 2. La aplicación está construida con **Angular 19** y diseñada bajo lineamientos empresariales.

## 🚀 Características Principales

* **Arquitectura Responsiva**: Interfaz adaptada a 3 tamaños de pantalla (móvil, tablet y desktop) utilizando el sistema de **GRID de 12 columnas** de Bootstrap.
* **Gestión de Usuarios**: Incluye módulos de Inicio de Sesión, Registro, Recuperación de Contraseña y **Modificación de Perfil**.
* **Seguridad**: Validaciones robustas en formularios, incluyendo reglas de complejidad para contraseñas (longitud mínima, caracteres especiales y números).
* **Estado Local**: Manejo de sesión mediante variables de Angular y `localStorage` para persistencia de datos.

## 🛠️ Tecnologías Utilizadas

* **Framework**: Angular 19+ (Sintaxis moderna de Control Flow: `@if`, `@else`).
* **Estilos**: Bootstrap 5 (Layout responsivo).
* **Comunicación**: HttpClient para consumo de Microservicios REST.
* **Contenedores**: Docker para despliegue local.


## 🏗️ Arquitectura del Sistema

### BackEnd: Patrón MVC (Model-View-Controller)
El microservicio de usuarios sigue el patrón arquitectónico **MVC**, garantizando una separación de responsabilidades clara y facilitando el mantenimiento evolutivo del sistema:

* **Model (Modelos/Entidades)**: La clase `Usuario.java` representa la estructura de datos persistida en **Oracle Cloud**, utilizando anotaciones JPA para el mapeo objeto-relacional.
* **Controller (Controladores)**: `UsuarioController.java` gestiona las peticiones HTTP (REST), define los Endpoints como `/api/usuarios` y orquestra la comunicación entre el cliente y el servicio.
* **Service (Servicios)**: `UsuarioService.java` contiene la lógica de negocio y las validaciones de integridad, actuando como intermediario entre el controlador y la base de datos.
* **Repository (Repositorios)**: `UsuarioRepository.java` implementa la abstracción de datos mediante **Spring Data JPA**, permitiendo operaciones CRUD eficientes sobre la base de datos Oracle.

### FrontEnd: Smart & Dumb Components
La aplicación Angular implementa una arquitectura basada en componentes para optimizar el flujo de datos y la reactividad:

* **Smart Components (Componentes Inteligentes)**: Como `PerfilComponent`, `RegistroComponent` y `LoginComponent`. Se encargan de la lógica de negocio, inyectan los servicios (`UsuarioService`, `AuthService`) y gestionan la comunicación asíncrona con el Backend.
* **Dumb Components (Componentes de Presentación)**: Componentes como `HeaderComponent` y `FooterComponent`. Se enfocan exclusivamente en la interfaz gráfica (UI), recibiendo datos y notificando eventos, lo que asegura que sean altamente reutilizables y fáciles de testear.

---

## 📂 Estructura de Directorios (Arquetipo)

Siguiendo los lineamientos del arquetipo diseñado para el proyecto, la estructura de archivos se organiza de la siguiente manera:

```text
src/app/
├── components/          # Smart & Dumb Components organizados por vista
│   ├── footer/          # Presentación estática inferior
│   ├── header/          # Navegación y branding superior
│   ├── login/           # Gestión de acceso al sistema
│   ├── perfil/          # Visualización y edición de datos del usuario
│   ├── recuperar-password/ # Flujo de recuperación de credenciales
│   └── registro/        # Formulario de alta de nuevos usuarios
├── models/              # Interfaces y contratos de datos (usuario.ts, producto.ts)
├── services/            # Lógica de comunicación con APIs REST (HttpClient)
│   ├── auth.ts          # Gestión de autenticación y sesiones
│   ├── productos.ts     # Servicio para catálogo de productos
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