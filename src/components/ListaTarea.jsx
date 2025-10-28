import ListGroup from 'react-bootstrap/ListGroup';
import ItemTarea from './ItemTarea';

const ListaTarea = ({tareas, borrarTarea, editarTarea, editando}) => {
  if (!tareas || tareas.length === 0) {
    return (
      <ListGroup className="mt-5">
        <p className="text-muted text-center mt-3">No hay tareas aún. ¡Agrega una!</p>
      </ListGroup>
    );
  }

  return (
    <ListGroup className="mt-5">
      {
        tareas.map((item)=> (
          <ItemTarea 
            key={item.id} 
            item={item} 
            borrarTarea={borrarTarea}
            editarTarea={editarTarea}
            editando={editando}
          />
        ))
      }
    </ListGroup>
  );
};

export default ListaTarea;
