// Usar la misma estructura que el código que funciona
// En desarrollo: usar proxy de Vite
// En producción: usar variable de entorno VITE_API_TAREAS (URL completa)
const API_URL = import.meta.env.DEV 
  ? '/api/tareas' 
  : (import.meta.env.VITE_API_TAREAS || import.meta.env.VITE_API_URL 
    ? `${import.meta.env.VITE_API_TAREAS || import.meta.env.VITE_API_URL}/api/tareas`
    : '/api/tareas');

// Log para debugging (solo en producción)
if (!import.meta.env.DEV) {
  console.log('🔧 Configuración API:');
  console.log('VITE_API_URL:', import.meta.env.VITE_API_URL || 'NO CONFIGURADA');
  console.log('URL final:', API_URL);
  console.log('Modo:', import.meta.env.MODE);
}

// Obtener todas las tareas - simplificado como el código que funciona
export const obtenerTareas = async () => {
  try {
    const respuesta = await fetch(API_URL);
    if (!respuesta.ok) {
      console.error('Error al obtener tareas:', respuesta.status, respuesta.statusText);
      return [];
    }
    const data = await respuesta.json();
    return data || [];
  } catch (error) {
    console.error('Error al obtener tareas:', error);
    return [];
  }
};

// Crear una nueva tarea
export const crearTarea = async (titulo) => {
  try {
    // Validar que el título no esté vacío
    if (!titulo || !titulo.trim()) {
      throw new Error('El título de la tarea no puede estar vacío');
    }

    // Usar el mismo formato que el código que funciona: {tarea: "texto"}
    const payload = { tarea: titulo.trim() };
    console.log('📤 Enviando POST a:', API_URL);
    console.log('📦 Payload:', payload);

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    
    console.log('📥 Respuesta recibida:', response.status, response.statusText);
    
    if (!response.ok) {
      const text = await response.text();
      let errorMessage = 'Error al crear la tarea';
      let errorDetails = null;
      
      console.error('❌ Error en POST:', response.status, response.statusText);
      console.error('📄 Respuesta del servidor:', text);
      
      try {
        errorDetails = JSON.parse(text);
        console.error('📋 Detalles del error:', errorDetails);
      } catch (e) {
        console.error('⚠️ No se pudo parsear la respuesta como JSON');
      }
      
      if (response.status === 500) {
        // Intentar obtener más detalles del error
        if (errorDetails) {
          if (errorDetails.error) {
            errorMessage = `Error del servidor: ${errorDetails.error}`;
          } else if (errorDetails.mensaje) {
            errorMessage = errorDetails.mensaje;
          }
        }
        
        if (errorDetails?.error === 'MongoDB no está conectado') {
          errorMessage = 'Error de conexión con la base de datos. El backend no puede conectarse a MongoDB.';
        }
        
        console.error('🚨 ERROR 500: El backend tiene un error interno.');
        console.error('Posibles causas:');
        console.error('1. MongoDB no está conectado en Vercel');
        console.error('2. Falta la variable MONGODB_URI en Vercel');
        console.error('3. Error en el código del backend');
        console.error('4. Los datos enviados no son válidos');
      } else {
        // Error de validación (400)
        if (errorDetails?.errores && errorDetails.errores.length > 0) {
          errorMessage = errorDetails.errores[0].msg || errorMessage;
        } else if (errorDetails?.mensaje) {
          errorMessage = errorDetails.mensaje;
        }
      }
      
      throw new Error(errorMessage);
    }
    
    const text = await response.text();
    if (!text) throw new Error('Respuesta vacía del backend');
    
    const data = JSON.parse(text);
    console.log('✅ Tarea creada exitosamente:', data);
    // Retornar la tarea completa (como el código que funciona)
    return data.tarea || data;
  } catch (error) {
    console.error('❌ Error al crear tarea:', error);
    console.error('🌐 URL intentada:', API_URL);
    console.error('📊 Variable VITE_API_URL:', import.meta.env.VITE_API_URL || 'NO CONFIGURADA');
    throw error;
  }
};

// Editar una tarea
export const editarTarea = async (id, titulo) => {
  try {
    // Usar el mismo formato que el código que funciona: {tarea: "texto"}
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tarea: titulo.trim() }),
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
    // Retornar la tarea completa (como el código que funciona)
    return data.tarea || data;
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
