// En desarrollo, Vite proxy redirige /api a http://localhost:3000
// En producción, usar la URL del backend desde variables de entorno
// Si no hay variable de entorno configurada, usar ruta relativa (asumiendo mismo dominio)
const getApiUrl = () => {
  if (import.meta.env.DEV) {
    return '/api/tareas';
  }
  
  // En producción, si hay VITE_API_URL configurada, usarla
  // Si no, usar ruta relativa (útil si el backend está en el mismo dominio)
  const apiUrl = import.meta.env.VITE_API_URL;
  if (apiUrl) {
    return `${apiUrl}/api/tareas`;
  }
  
  // Fallback: usar ruta relativa (para cuando el backend está en el mismo dominio)
  // Si tu backend está en Vercel en un dominio diferente, configura VITE_API_URL en Netlify
  return '/api/tareas';
};

const API_URL = getApiUrl();

// Log para debugging (solo en producción)
if (!import.meta.env.DEV) {
  console.log('🔧 Configuración API:');
  console.log('VITE_API_URL:', import.meta.env.VITE_API_URL || 'NO CONFIGURADA');
  console.log('URL final:', API_URL);
  console.log('Modo:', import.meta.env.MODE);
}

// Obtener todas las tareas
export const obtenerTareas = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      const text = await response.text();
      console.error('Error en la respuesta:', response.status, response.statusText);
      console.error('Respuesta del servidor:', text);
      
      if (response.status === 500) {
        console.error('ERROR 500: El backend tiene un error interno. Verifica que:');
        console.error('1. El backend esté ejecutándose');
        console.error('2. MongoDB esté conectado');
        console.error('3. El backend no tenga errores en la consola');
      }
      
      return [];
    }
    
    // Verificar que la respuesta tenga contenido
    const text = await response.text();
    if (!text) {
      console.error('Respuesta vacía del backend');
      return [];
    }
    
    const data = JSON.parse(text);
    return data;
  } catch (error) {
    console.error('❌ Error al obtener tareas:', error);
    console.error('URL intentada:', API_URL);
    console.error('VITE_API_URL configurada:', import.meta.env.VITE_API_URL || 'NO');
    console.error('Tipo de error:', error.name);
    console.error('Mensaje:', error.message);
    
    // Si es un error de CORS
    if (error.message.includes('CORS') || error.message.includes('Failed to fetch')) {
      console.error('🚨 ERROR DE CORS: El backend no está permitiendo peticiones desde este dominio');
      console.error('Verifica que el backend tenga CORS configurado para aceptar tu dominio de Netlify');
    }
    
    return [];
  }
};

// Crear una nueva tarea
export const crearTarea = async (titulo) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ titulo, prioridad: 'media' }),
    });
    
    if (!response.ok) {
      const text = await response.text();
      let errorMessage = 'Error al crear la tarea';
      
      console.error('Error en POST:', response.status, response.statusText);
      console.error('Respuesta del servidor:', text);
      
      if (response.status === 500) {
        errorMessage = 'Error del servidor (500). Verifica que el backend esté funcionando correctamente.';
        console.error('ERROR 500: El backend tiene un error interno.');
        console.error('Posibles causas:');
        console.error('- El backend no está ejecutándose');
        console.error('- MongoDB no está conectado');
        console.error('- Error en el código del backend');
      } else {
        try {
          const errorData = JSON.parse(text);
          errorMessage = errorData.errores?.[0]?.msg || errorData.mensaje || errorMessage;
        } catch {
          errorMessage = text || errorMessage;
        }
      }
      
      throw new Error(errorMessage);
    }
    
    const text = await response.text();
    if (!text) throw new Error('Respuesta vacía del backend');
    
    const data = JSON.parse(text);
    return data.tarea;
  } catch (error) {
    console.error('Error al crear tarea:', error);
    console.error('URL intentada:', API_URL);
    throw error;
  }
};

// Editar una tarea
export const editarTarea = async (id, titulo) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ titulo, prioridad: 'media' }),
    });
    
    if (!response.ok) {
      const text = await response.text();
      let errorMessage = 'Error al editar la tarea';
      
      console.error('Error en PUT:', response.status, response.statusText);
      console.error('Respuesta del servidor:', text);
      
      if (response.status === 500) {
        errorMessage = 'Error del servidor (500). Verifica que el backend esté funcionando correctamente.';
        console.error('ERROR 500: El backend tiene un error interno.');
      } else {
        try {
          const errorData = JSON.parse(text);
          errorMessage = errorData.errores?.[0]?.msg || errorData.mensaje || errorMessage;
        } catch {
          errorMessage = text || errorMessage;
        }
      }
      
      throw new Error(errorMessage);
    }
    
    const text = await response.text();
    if (!text) throw new Error('Respuesta vacía del backend');
    
    const data = JSON.parse(text);
    return data.tarea;
  } catch (error) {
    console.error('Error al editar tarea:', error);
    console.error('URL intentada:', `${API_URL}/${id}`);
    throw error;
  }
};

// Eliminar una tarea
export const eliminarTarea = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const text = await response.text();
      console.error('Error en DELETE:', response.status, response.statusText);
      console.error('Respuesta del servidor:', text);
      
      let errorMessage = 'Error al eliminar la tarea';
      if (response.status === 500) {
        errorMessage = 'Error del servidor (500). Verifica que el backend esté funcionando correctamente.';
      }
      
      throw new Error(errorMessage);
    }
    return true;
  } catch (error) {
    console.error('Error al eliminar tarea:', error);
    console.error('URL intentada:', `${API_URL}/${id}`);
    throw error;
  }
};

