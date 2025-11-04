# Instrucciones para desplegar en Netlify

## ✅ Archivos ya configurados

Los siguientes archivos ya están creados y configurados:
- ✅ `netlify.toml` - Configuración de build
- ✅ `public/_redirects` - Manejo de rutas SPA
- ✅ `src/services/api.js` - Configurado para usar variable de entorno

## 📋 Pasos para configurar en Netlify

### 1. Configurar Variables de Entorno

1. Ve a tu sitio en Netlify
2. Entra a **Site settings** → **Environment variables**
3. Agrega la siguiente variable:
   - **Key:** `VITE_API_URL`
   - **Value:** `https://tu-backend-en-vercel.vercel.app`
   
   ⚠️ **IMPORTANTE:** Reemplaza `tu-backend-en-vercel.vercel.app` con la URL real de tu backend en Vercel.

### 2. Configuración del Build (ya está en netlify.toml)

Netlify debería detectar automáticamente:
- **Build command:** `npm run build`
- **Publish directory:** `dist`

Si no lo detecta automáticamente:
1. Ve a **Site settings** → **Build & deploy**
2. Verifica que coincida con lo de arriba

### 3. Hacer el Deploy

1. Sube los cambios a tu repositorio
2. Netlify hará el deploy automáticamente
3. O haz un **Trigger deploy** manual desde el dashboard

## 🔍 Verificar que funciona

Después del deploy:
1. Abre tu sitio en Netlify
2. Abre la consola del navegador (F12)
3. Verifica que no haya errores de CORS
4. Prueba hacer una operación (crear, editar, eliminar tarea)

## 🐛 Solución de problemas

### Error: "Network request failed"
- Verifica que la variable `VITE_API_URL` esté configurada correctamente
- Asegúrate de que la URL del backend no tenga `/` al final
- Ejemplo correcto: `https://mi-backend.vercel.app`
- Ejemplo incorrecto: `https://mi-backend.vercel.app/`

### Error de CORS
- El backend ya está configurado para aceptar requests de Netlify
- Si persiste, verifica que el backend esté desplegado y funcionando
- Revisa los logs del backend en Vercel

### Las rutas no funcionan (404)
- Verifica que el archivo `public/_redirects` esté presente
- Debe contener: `/*    /index.html   200`

## 📝 Notas importantes

- El backend debe estar desplegado en Vercel antes de configurar el frontend
- La variable `VITE_API_URL` debe tener la URL completa del backend (con https://)
- Después de agregar variables de entorno, debes hacer un nuevo deploy

