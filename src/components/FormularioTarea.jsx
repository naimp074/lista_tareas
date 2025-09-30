import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ListaTarea from "./ListaTarea";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

const FormularioTarea = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Inicializamos el estado con lo que haya en localStorage
  const [tareas, setTareas] = useState(() => {
    return JSON.parse(localStorage.getItem("tareasKey")) || [];
  });

  // Guardamos en localStorage cada vez que cambie "tareas"
  useEffect(() => {
    localStorage.setItem("tareasKey", JSON.stringify(tareas));
  }, [tareas]);

  const posteriorValidacion = (data) => {
    // Guardamos la tarea en el array
    setTareas([...tareas, data.tarea]);
    // Limpiamos el formulario
    reset();
  };

  const borrarTarea = (nombreTarea) => {
    const tareasFiltradas = tareas.filter(
      (itemTarea) => itemTarea !== nombreTarea
    );
    setTareas(tareasFiltradas);
  };

  return (
    <section>
      <Form onSubmit={handleSubmit(posteriorValidacion)}>
        <Form.Group className="mb-3 d-flex justify-content-between">
          <Form.Control
            type="text"
            placeholder="Ingresa una tarea"
            {...register("tarea", {
              required: "La tarea es un dato obligatorio",
              minLength: {
                value: 2,
                message: "La tarea debe tener al menos 2 caracteres",
              },
              maxLength: {
                value: 50,
                message: "La tarea debe tener como máximo 50 caracteres",
              },
            })}
          />
          <Button variant="primary" type="submit">
            ➕
          </Button>
        </Form.Group>
        <Form.Text className="text-danger">{errors.tarea?.message}</Form.Text>
      </Form>
      <ListaTarea tareas={tareas} borrarTarea={borrarTarea} />
    </section>
  );
};

export default FormularioTarea;

