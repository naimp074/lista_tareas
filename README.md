# 📝 Lista de Tareas - Frontend

Aplicación frontend para gestionar tareas, construida con React y Vite.

## 🎯 Descripción

Interfaz de usuario para la gestión de tareas que se conecta a un backend separado (API REST con Express y MongoDB).

## 🚀 Inicio Rápido

### Requisitos

- Node.js instalado
- El backend debe estar ejecutándose en `http://localhost:3000`

### Instalación y Ejecución

1. Instala las dependencias:
```bash
npm install
```

2. Inicia el servidor de desarrollo:
```bash
npm run dev
```

3. Abre tu navegador en `http://localhost:5173`

## 🏗️ Estructura del Proyecto

```
src/
├── components/         # Componentes React
│   ├── Footer.jsx
│   ├── FormularioTarea.jsx
│   ├── ItemTarea.jsx
│   └── ListaTarea.jsx
└── services/
    └── api.js         # Servicios para comunicarse con el backend
```

## 🔗 Backend

Este frontend se conecta a un backend separado. Para más información sobre cómo ejecutarlo, consulta la carpeta `../lista_tarea_back/` o el archivo `INSTRUCCIONES_EJECUTAR.md`.

## ⚙️ Configuración

El proxy de Vite está configurado para redirigir automáticamente las llamadas a `/api/*` hacia el backend en `http://localhost:3000`.

Ver `vite.config.js` para más detalles.

## 📦 Tecnologías Utilizadas

- React 19
- Vite
- React Bootstrap
- React Hook Form
- React Toastify
