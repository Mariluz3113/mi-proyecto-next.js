"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [tareas, setTareas] = useState([]);
  const [nuevaTareaTexto, setNuevaTareaTexto] = useState(""); // Estado para controlar el input

  // Función para traer las tareas (GET)
  const cargarTareas = () => {
    fetch("/api/tareas")
      .then((res) => res.json())
      .then((data) => setTareas(data))
      .catch((err) => console.error("Error al traer tareas:", err));
  };

  useEffect(() => {
    cargarTareas();
  }, []);

  // Función que se ejecuta al presionar el botón de enviar (POST)
  const manejarEnvio = async (e) => {
    e.preventDefault(); // Evita que la página se recargue por completo
    if (!nuevaTareaTexto.trim()) return; // Si el input está vacío, no hace nada

    try {
      const respuesta = await fetch("/api/tareas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo: nuevaTareaTexto }) // Enviamos el texto a la API
      });

      if (respuesta.ok) {
        setNuevaTareaTexto(""); // Limpiamos el input después de enviar
        cargarTareas(); // Volvemos a pedir las tareas actualizadas a la API
      }
    } catch (error) {
      console.error("Error al enviar la tarea a la API:", error);
    }
  };

  return (
    <main className="p-10 bg-slate-950 text-white min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-2">Mi Administrador de Tareas</h1>
      <p className="text-gray-400 mb-8">Datos cargados e insertados mediante API interna en Next.js</p>

      {/* FORMULARIO DE ENTRADA */}
      <form onSubmit={manejarEnvio} className="w-full max-w-md flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Escribe una nueva tarea..."
          value={nuevaTareaTexto}
          onChange={(e) => setNuevaTareaTexto(e.target.value)}
          className="flex-1 p-3 bg-slate-900 border border-slate-800 rounded-lg text-gray-200 outline-none focus:border-blue-500 transition-colors"
        />
        <button 
          type="submit" 
          className="px-5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
        >
          Agregar
        </button>
      </form>

      {/* LISTA DE TAREAS */}
      <div className="w-full max-w-md flex flex-col gap-3">
        {tareas.map((tarea) => (
          <div 
            key={tarea.id} 
            className="p-4 bg-slate-900 rounded-lg border border-slate-800 flex justify-between items-center shadow-md animate-fade-in"
          >
            <span className={tarea.completada ? "line-through text-gray-500" : "text-gray-200"}>
              {tarea.titulo}
            </span>
            <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
              tarea.completada ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400"
            }`}>
              {tarea.completada ? "Hecho" : "Pendiente"}
            </span>
          </div>
        ))}
      </div>
    </main>
  );
}
