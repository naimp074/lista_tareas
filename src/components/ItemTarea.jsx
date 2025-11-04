import { ListGroup, Button } from "react-bootstrap";

const ItemTarea = ({ tarea, borrarTarea, editarTarea }) => {
  return (
    <ListGroup.Item className="d-flex justify-content-between align-items-center">
      {tarea.titulo || tarea.tarea || tarea.texto}
      <div className="d-flex gap-2">
        <Button variant="secondary" onClick={() => editarTarea(tarea)}>
          ✏️
        </Button>
        <Button variant="danger" onClick={() => borrarTarea(tarea._id)}>
          ✖️
        </Button>
      </div>
    </ListGroup.Item>
  );
};

export default ItemTarea;

