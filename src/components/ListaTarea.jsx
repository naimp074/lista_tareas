import ListGroup from 'react-bootstrap/ListGroup';
import ItemTarea from './ItemTarea';

const ListaTarea = ({tareas}) => {
  return (
    <ListGroup className="mt-5">
      <ItemTarea />
      {
        tareas.map((tarea, indice)=> <ItemTarea key={indice}/> )
      }
    </ListGroup>
  );
};

export default ListaTarea;
