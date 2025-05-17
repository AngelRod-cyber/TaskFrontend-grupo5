# Task Manager Frontend

Este es el frontend del sistema **Task Manager**, desarrollado con Angular y TailwindCSS. La aplicación permite a los usuarios autenticarse, gestionar tareas y comunicarse con una API backend para almacenar y recuperar datos.

## 🚀 Tecnologías Utilizadas

* [Angular](https://angular.io/)
* [Tailwind CSS](https://tailwindcss.com/)
* [RxJS](https://rxjs.dev/)
* [NgRx Store](https://ngrx.io/guide/store) (para manejo de estado)
* [Docker](https://www.docker.com/) (para contenerización)
* [TypeScript](https://www.typescriptlang.org/)

## 🧱 Estructura del Proyecto

```bash
src/
├── app/
│   ├── core/                # Servicios, guards, interceptores
│   ├── features/            # Funcionalidades del sistema (ej. tareas)
│   ├── modules/             # Módulos independientes (auth)
│   ├── store/               # Estado global (auth, app.state)
│   └── app-routing.module.ts
├── environments/            # Variables de entorno
├── styles/                  # Estilos globales (Tailwind)
├── main.ts                  # Punto de entrada
```

## ⚙️ Configuración del Entorno

Clona el repositorio y navega al directorio:

```bash
git clone https://github.com/tu-usuario/TaskManagerFrontEnd-main.git
cd TaskManagerFrontEnd-main
```

Instala las dependencias:

```bash
npm install
```

Ejecuta la aplicación en desarrollo:

```bash
ng serve
```

La aplicación estará disponible en `http://localhost:4200`.

## 🐳 Uso con Docker

Puedes construir y levantar el contenedor usando Docker:

```bash
docker build -t task-manager-frontend .
docker run -p 4200:80 task-manager-frontend
```

O usa Docker Compose:

```bash
docker-compose up --build
```

## 🧪 Testing

Para ejecutar pruebas unitarias:

```bash
ng test
```

## 📁 Módulos y Funcionalidades

### Autenticación (`auth`)

* Registro de usuario
* Login
* Protección de rutas mediante `AuthGuard`

### Gestión de Tareas (`tasks`)

* Listado de tareas
* Crear/editar tareas usando modales (`task-modal`)
* Comunicación con el backend mediante `TasksService`

## 🌐 Comunicación con el Backend

La aplicación se comunica con un **Backend API** a través de servicios HTTP, utilizando un interceptor para añadir el token JWT a cada solicitud. Define las URL del backend en `environment.ts`.

```ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api'
};
```

## 📦 Producción

Para compilar la app en modo producción:

```bash
ng build --configuration production
```

El contenido será generado en la carpeta `dist/`.

