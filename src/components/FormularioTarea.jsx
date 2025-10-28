import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ListaTarea from "./ListaTarea";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import * as api from "../services/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FormularioTarea = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [tareas, setTareas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [editando, setEditando] = useState(null); // Para saber qué tarea se está editando

  // Cargar tareas al montar el componente
  useEffect(() => {
    cargarTareas();
  }, []);

  const cargarTareas = async () => {
    try {
      setCargando(true);
      const tareasData = await api.obtenerTareas();
      // Convertir a formato simple de string
      const tareasSimples = tareasData.map((tarea) => ({
        id: tarea._id,
        texto: tarea.titulo,
      }));
      setTareas(tareasSimples);
    } catch (error) {
      console.error("Error al cargar tareas:", error);
      toast.error("Error al cargar las tareas");
    } finally {
      setCargando(false);
    }
  };

  const posteriorValidacion = async (data) => {
    try {
      if (editando) {
        // Si estamos editando, actualizar la tarea
        const tareaActualizada = await api.editarTarea(editando.id, data.tarea);
        const tareasActualizadas = tareas.map((t) =>
          t.id === editando.id
            ? { id: tareaActualizada._id, texto: tareaActualizada.titulo }
            : t
        );
        setTareas(tareasActualizadas);
        toast.success("¡Tarea actualizada exitosamente!");
        setEditando(null);
      } else {
        // Si no estamos editando, crear nueva tarea
        const nuevaTarea = await api.crearTarea(data.tarea);
        setTareas([
          ...tareas,
          { id: nuevaTarea._id, texto: nuevaTarea.titulo },
        ]);
        toast.success("¡Tarea creada exitosamente!");
      }
      reset();
    } catch (error) {
      console.error("Error al crear/editar tarea:", error);
      toast.error(error.message || "Error al procesar la tarea");
    }
  };

  const editarTarea = (item) => {
    setEditando(item);
    reset({ tarea: item.texto });
  };

  const cancelarEdicion = () => {
    setEditando(null);
    reset();
  };

  const borrarTarea = async (tareaId) => {
    try {
      await api.eliminarTarea(tareaId);
      const tareasFiltradas = tareas.filter((t) => t.id !== tareaId);
      setTareas(tareasFiltradas);
      toast.success("Tarea eliminada exitosamente!");
    } catch (error) {
      console.error("Error al eliminar tarea:", error);
      toast.error("Error al eliminar la tarea");
    }
  };

  return (
    <section>
      <ToastContainer position="top-right" autoClose={3000} />
      <Form onSubmit={handleSubmit(posteriorValidacion)}>
        <Form.Group className="mb-3 d-flex justify-content-between">
          <Form.Control
            type="text"
            placeholder={editando ? "Edita la tarea" : "Ingresa una tarea"}
            disabled={cargando}
            {...register("tarea", {
              required: "La tarea es un dato obligatorio",
              minLength: {
                value: 3,
                message: "La tarea debe tener al menos 3 caracteres",
              },
              maxLength: {
                value: 200,
                message: "La tarea debe tener como máximo 200 caracteres",
              },
            })}
          />
          <div>
            {editando && (
              <Button
                variant="secondary"
                onClick={cancelarEdicion}
                className="me-2"
                disabled={cargando}
              >
                ❌
              </Button>
            )}
            <Button
              variant={editando ? "success" : "primary"}
              type="submit"
              disabled={cargando}
            >
              {editando ? "💾" : "➕"}
            </Button>
          </div>
        </Form.Group>
        <Form.Text className="text-danger">{errors.tarea?.message}</Form.Text>
      </Form>
      {cargando ? (
        <p>Cargando tareas...</p>
      ) : (
        <ListaTarea
          tareas={tareas}
          borrarTarea={borrarTarea}
          editarTarea={editarTarea}
          editando={editando}
        />
      )}
    </section>
  );
};

export default FormularioTarea;

