import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ListaTareas from './ListaTarea';
const FormularioTarea = () => {
  return (
    <section>
   <Form>
        <Form.Group
          className="mb-3 d-flex justify-content-between"
        >
          <Form.Control type="text" placeholder="Ingresa una tarea" />
          <Button variant="primary" type="submit">
            ➕
          </Button>
        </Form.Group>
        <Form.Text className="text-danger">
          Error al cargar una tarea
        </Form.Text>
      </Form>
      <ListaTareas />
    </section>
  );
};

export default FormularioTarea;
