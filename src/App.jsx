import { useState } from "react";
import Footer from "./components/Footer";
import FormularioTarea from "./components/FormularioTarea";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <main className="container my-4">
        <h1>Lista de tareas</h1>
        <FormularioTarea />
      </main>
      <Footer />
    </>
  );
}

export default App;
