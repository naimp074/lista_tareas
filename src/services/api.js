// En desarrollo, Vite proxy redirige /api a http://localhost:3000
// En producción, usar la URL del backend desde variables de entorno
// Si no hay variable de entorno configurada, usar localhost como fallback
const getApiUrl = () => {
  if (import.meta.env.DEV) {
    return '/api/tareas';
  }
  
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
  return `${apiUrl}/api/tareas`;
};

const API_URL = getApiUrl();

// Obtener todas las tareas
export const obtenerTareas = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      console.error('Error en la respuesta:', response.status, response.statusText);
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
    console.error('Error al obtener tareas:', error);
    console.error('URL intentada:', API_URL);
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
      try {
        const errorData = JSON.parse(text);
        errorMessage = errorData.errores?.[0]?.msg || errorMessage;
      } catch {
        errorMessage = text || errorMessage;
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
      try {
        const errorData = JSON.parse(text);
        errorMessage = errorData.errores?.[0]?.msg || errorMessage;
      } catch {
        errorMessage = text || errorMessage;
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
      console.error('Error en DELETE:', response.status, response.statusText);
      throw new Error('Error al eliminar la tarea');
    }
    return true;
  } catch (error) {
    console.error('Error al eliminar tarea:', error);
    console.error('URL intentada:', `${API_URL}/${id}`);
    throw error;
  }
};

