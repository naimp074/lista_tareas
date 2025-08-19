import ListGroup from 'react-bootstrap/ListGroup';
import ItemTarea from './ItemTarea';

const ListaTarea = ({tareas,borrarTarea}) => {
  return (
    <ListGroup className="mt-5">
      {
        tareas.map((tarea, indice)=> <ItemTarea key={indice} tarea={tarea} borrarTarea = {borrarTarea}/> )
      }
    </ListGroup>
  );
};

export default ListaTarea;
