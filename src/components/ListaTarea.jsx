import ListGroup from 'react-bootstrap/ListGroup';
import ItemTarea from './ItemTarea';

const ListaTarea = () => {
  return (
    <ListGroup className="mt-5">
      <ItemTarea />
      <ItemTarea />
      <ItemTarea />
      <ItemTarea />
    </ListGroup>
  );
};

export default ListaTarea;
