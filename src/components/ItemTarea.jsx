import { ListGroup, Button } from "react-bootstrap";

const ItemTarea = ({ tarea, borrarTarea }) => {
  return (
    <ListGroup.Item className="d-flex justify-content-between align-items-center">
      {tarea}
      <Button 
        variant="secondary" 
        onClick={() => borrarTarea(tarea)}  
      >
        ❌
      </Button>
    </ListGroup.Item>
  );
};

export default ItemTarea;

