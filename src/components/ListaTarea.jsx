import ListGroup from 'react-bootstrap/ListGroup';
import ItemTarea from './ItemTarea';

const ListaTarea = ({tareas, borrarTarea, editarTarea}) => {
  if (!tareas || tareas.length === 0) {
    return (
      <ListGroup className="mt-5">
        <p className="text-muted text-center mt-3">No hay tareas aún. ¡Agrega una!</p>
      </ListGroup>
    );
  }

  return (
    <ListGroup className="mt-5">
      {tareas.map((t) => (
        <ItemTarea
          key={t._id}
          tarea={t}
          borrarTarea={borrarTarea}
          editarTarea={editarTarea}
        />
      ))}
    </ListGroup>
  );
};

export default ListaTarea;
