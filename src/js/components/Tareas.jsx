import React, {useState} from "react";


const Tareas = () => {
   
    const [lista, setLista] = useState(["Hacer la compra", "Terminar el proyecto", "Llamar al médico"]);

    let nuevaTarea = "Aprender React";

    function añadirTarea() {
        console.log("añadirTarea");
        setLista([...lista, nuevaTarea]);
    }

     const [inputValue, setInputValue] = useState("");

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && inputValue.trim() !== "") {
            setLista([...lista, inputValue]);
            setInputValue("");
        }
    };
     const deleteTarea = (indexToDelete) => {
        setLista(
            lista.filter((_, index) => index !== indexToDelete)
        );
    };

    
    return (
         <div className="container mt-5 p-4 border rounded shadow">
            <h1 className="text-center">To-Do List</h1>

            <ul className="list-group">
                <li className="list-group-item">
                    <input
                        type="text"
                        className="form-control border-0"
                        placeholder="¿Qué necesitas hacer?"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </li>

                {lista.length === 0 ? (
                    <li className="list-group-item text-muted">
                        No hay tareas, añadir tareas
                    </li>
                ) : (
                    lista.map((tarea, index) => (
                        <li
                            key={index}
                            className="list-group-item d-flex justify-content-between task"
                        >
                            {tarea}

                            <span
                                className="delete-btn"
                                onClick={() => deleteTarea(index)}
                            >
                                ❌
                            </span>
                        </li>
                    ))
                )}

                <li className="list-group-item text-muted">
                    {lista.length} tareas pendientes
                </li>
            </ul>
        </div>
    );
};
       

export default Tareas