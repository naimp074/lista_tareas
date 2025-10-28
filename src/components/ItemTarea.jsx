import { ListGroup, Button } from "react-bootstrap";

const ItemTarea = ({ item, borrarTarea, editarTarea, editando }) => {
  const estaEditando = editando?.id === item.id;

  return (
    <ListGroup.Item
      className={`d-flex justify-content-between align-items-center ${
        estaEditando ? "bg-light" : ""
      }`}
    >
      {item.texto}
      <div>
        <Button
          variant="warning"
          onClick={() => editarTarea(item)}
          disabled={!!editando && !estaEditando}
          className="me-2"
        >
          ✏️
        </Button>
        <Button
          variant="secondary"
          onClick={() => borrarTarea(item.id)}
          disabled={!!editando}
        >
          ❌
        </Button>
      </div>
    </ListGroup.Item>
  );
};

export default ItemTarea;

