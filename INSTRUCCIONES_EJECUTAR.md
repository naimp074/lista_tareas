# 🚀 Instrucciones para Ejecutar el Proyecto

Este proyecto está dividido en dos partes separadas:
- **Frontend**: Aplicación React (en esta carpeta)
- **Backend**: API REST con Express y MongoDB (en la carpeta `../lista_tarea_back/`)

## 📋 Requisitos Previos

- Node.js instalado
- MongoDB instalado y en ejecución (o una cuenta de MongoDB Atlas)
- Terminal/Consola

## 🔧 Configuración del Backend

1. Navega a la carpeta del backend:
```bash
cd ../lista_tarea_back
```

2. Instala las dependencias:
```bash
npm install
```

3. Crea un archivo `.env` con la configuración de MongoDB:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017
```

**O si usas MongoDB Atlas:**
```env
PORT=3000
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/
```

4. Inicia el servidor backend:
```bash
npm start
```

Verás un mensaje como:
```
✔ Conectado a MongoDB - Base de datos: lista_tareas
El servidor se está ejecutando en: http://localhost:3000
```

## 🎨 Configuración del Frontend

1. **En una nueva terminal**, navega a la carpeta del frontend:
```bash
cd c:\Users\Usuario\Desktop\trabajos\listatareas
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
```

Verás un mensaje como:
```
VITE v7.1.2  ready in XXX ms

➜  Local:   http://localhost:5173/
```

## 🌐 Uso

1. Abre tu navegador en `http://localhost:5173/`
2. El frontend se conectará automáticamente al backend en `http://localhost:3000`
3. Puedes crear, ver y eliminar tareas

## 📁 Estructura

```
trabajos/
├── listatareas/              (Frontend - React + Vite)
│   ├── src/
│   │   ├── components/       (Componentes React)
│   │   └── services/
│   │       └── api.js        (Servicio para conectar con el backend)
│   └── vite.config.js         (Proxy configurado para /api)
│
└── lista_tarea_back/         (Backend - Express + MongoDB)
    ├── src/
    │   ├── controllers/      (Controladores)
    │   ├── models/           (Modelos de MongoDB)
    │   ├── routes/           (Rutas)
    │   └── server/           (Configuración del servidor)
    └── index.js              (Punto de entrada)
```

## 🔗 Cómo Se Comunican

- El frontend ejecuta en `http://localhost:5173`
- El backend ejecuta en `http://localhost:3000`
- Las llamadas a `/api/*` desde el frontend son redirigidas automáticamente al backend gracias al proxy de Vite
- El frontend usa el archivo `src/services/api.js` para hacer peticiones HTTP

## ✅ Verificación

1. Prueba el backend directamente:
```bash
curl http://localhost:3000/api/tareas/test
```
Deberías recibir: "Prueba desde el controlador de tareas"

2. Abre la consola del navegador (F12) y verifica que no hay errores de conexión

## 🐛 Solución de Problemas

### Error: "Failed to fetch"
- Verifica que el backend esté ejecutándose en el puerto 3000
- Verifica que MongoDB esté en ejecución

### Error: "MONGODB_URI no definido"
- Verifica que el archivo `.env` exista en la carpeta del backend
- Verifica que la variable `MONGODB_URI` esté correctamente configurada

### El frontend no carga
- Verifica que estés en la carpeta correcta: `listatareas`
- Ejecuta `npm install` si falta alguna dependencia

## 🎉 ¡Listo!

Ahora tienes un frontend y backend completamente separados que pueden ejecutarse independientemente pero que trabajan juntos.

