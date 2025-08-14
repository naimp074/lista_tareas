import { ListGroup, Button } from "react-bootstrap";

const ItemTarea = () => {
  return (
    <ListGroup.Item className="d-flex justify-content-between align-items-center">
      Alguna tarea
      <Button variant="secondary">❌</Button>
    </ListGroup.Item>
  );
};

export default ItemTarea;
