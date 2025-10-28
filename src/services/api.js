// En desarrollo, Vite proxy redirige /api a http://localhost:3000
// En producción, usar la URL completa del backend
const API_URL = import.meta.env.DEV 
  ? '/api/tareas' 
  : 'http://localhost:3000/api/tareas';

// Obtener todas las tareas
export const obtenerTareas = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Error al obtener las tareas');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener tareas:', error);
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
      const errorData = await response.json();
      throw new Error(errorData.errores?.[0]?.msg || 'Error al crear la tarea');
    }
    const data = await response.json();
    return data.tarea;
  } catch (error) {
    console.error('Error al crear tarea:', error);
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
      const errorData = await response.json();
      throw new Error(errorData.errores?.[0]?.msg || 'Error al editar la tarea');
    }
    const data = await response.json();
    return data.tarea;
  } catch (error) {
    console.error('Error al editar tarea:', error);
    throw error;
  }
};

// Eliminar una tarea
export const eliminarTarea = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Error al eliminar la tarea');
    return true;
  } catch (error) {
    console.error('Error al eliminar tarea:', error);
    throw error;
  }
};

