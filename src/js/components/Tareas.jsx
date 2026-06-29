import React, { useEffect, useState } from "react";
const Tareas = () => {
    const urlApi = "https://playground.4geeks.com/todo/users/Natalia_Stiopu";
    const [lista, setLista] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const obtenerTareas = async () => {
        try {
            const response = await fetch(urlApi);
            const data = await response.json();
            setLista(data.todos);
        } catch (error) {
            console.log("Error al cargar tareas:", error);
        }
    };
    const añadirTarea = async () => {
        if (inputValue.trim() === "") return;
        const nuevaTarea = {
            label: inputValue,
            is_done: false
        };
        try {
            const response = await fetch(`https://playground.4geeks.com/todo/todos/Natalia_Stiopu`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(nuevaTarea)
            });
            console.log("POST status:", response.status);
            if (!response.ok) {
                const errorText = await response.text();
                console.log("Error del POST:", errorText);
                return;
            }
            setInputValue("");
            await obtenerTareas();
        } catch (error) {
            console.log("Error al añadir tarea:", error);
        }
    };
    useEffect(() => {
        obtenerTareas();
    }, []);
    const handleKeyDown = (e) => {
        if (e.key === "Enter" && inputValue.trim() !== "") {
            añadirTarea();
        }
    };
    const deleteTarea = async (id) => {
    try {
        const response = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
            method: "DELETE"
        });
        console.log("DELETE status:", response.status);
        if (!response.ok) {
            const errorText = await response.text();
            console.log("Error del DELETE:", errorText);
            return;
        }
        await obtenerTareas();
    } catch (error) {
        console.log("Error al borrar tarea:", error);
    }
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
                    lista.map((tarea) => (
                        <li
                            key={tarea.id}
                            className="list-group-item d-flex justify-content-between task"
                        >
                            {tarea.label}
                            <span
                                className="delete-btn"
                                onClick={() => deleteTarea(tarea.id)}
                                style={{ cursor: "pointer" }}
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
export default Tareas;