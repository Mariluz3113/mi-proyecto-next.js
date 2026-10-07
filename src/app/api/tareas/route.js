import { NextResponse } from "next/server";

// Simulamos una base de datos en la memoria del servidor
let misTareas = [
  { id: 1, titulo: "Estudiar React y Next.js", completada: true },
  { id: 2, titulo: "Entregar el trabajo práctico", completada: false },
  { id: 3, titulo: "Conectar la API al Frontend", completada: false }
];

// 1. FUNCIÓN GET: Para leer y enviar las tareas a la pantalla
export async function GET() {
  return NextResponse.json(misTareas);
}

// 2. FUNCIÓN POST: Para recibir una nueva tarea desde el formulario y guardarla
export async function POST(request) {
  try {
    const cuerpo = await request.json(); // Leemos el texto que envió el usuario
    
    // Creamos el nuevo objeto de la tarea
    const nuevaTarea = {
      id: misTareas.length + 1,
      titulo: cuerpo.titulo,
      completada: false
    };

    misTareas.push(nuevaTarea); // La guardamos en nuestra lista
    return NextResponse.json(nuevaTarea, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error al procesar la tarea" }, { status: 400 });
  }
}
