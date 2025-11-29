//Paradigma orientado a objetos 
import { v4 as uuidv4 } from 'uuid';

export const ESTADOS = { P: "Pendiente", E: "En curso", T: "Terminada", C: "Cancelada" };


// [PARADIGMA POO] Definición de CLASE: Plantilla para crear objetos.
// Se usa para modelar una entidad que tiene IDENTIDAD (ID) y ESTADO interno.
export class Tarea {
    constructor(titulo, descripcion, estado, dificultad, fechaVencimiento) {

        // [ENCAPSULAMIENTO] El estado se guarda dentro del objeto (this).
        // El ID es único y define la identidad del objeto, independiente de sus datos.

        this.id = uuidv4(); // Genera ID único automáticamente
        this.titulo = titulo;
        this.descripcion = descripcion || "Sin descripción";
        this.estado = estado || "P";
        this.dificultad = parseInt(dificultad || "1");
        this.fechaVencimiento = fechaVencimiento || null;
        this.fechaCreacion = new Date().toISOString().slice(0, 10);
        this.activo = true; // Para Soft Delete
    }

    // Aplicamos encapsulamiento de datos mediante métodos 
    // [POLIMORFISMO / COMPORTAMIENTO] El objeto "sabe" cómo presentarse.
    // No dependemos de una función externa para imprimirlo bonito
    toString() {
        const estrellas = "⭐".repeat(this.dificultad);
        const estadoLegible = ESTADOS[this.estado] || this.estado;
        return `[${estadoLegible}] ${this.titulo} (${estrellas}) - ID: ...${this.id.slice(-4)}`;
    }

    // [ABSTRACCIÓN] Ocultamos la complejidad de armar el string de detalles.
    // Desde fuera solo llamamos a .obtenerDetalles() sin saber cómo lo hace.
    // El objeto sabe dar sus detalles
    obtenerDetalles() {
        return `
===== DETALLES =====
ID Completo: ${this.id}
Título: ${this.titulo}
Descripción: ${this.descripcion}
Estado: ${ESTADOS[this.estado]}
Dificultad: ${"⭐".repeat(this.dificultad)}
Vencimiento: ${this.fechaVencimiento || "N/A"}
Creación: ${this.fechaCreacion}
====================`;
    }
}