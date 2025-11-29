import { v4 as uuidv4 } from 'uuid';

export const ESTADOS = { P: "Pendiente", E: "En curso", T: "Terminada", C: "Cancelada" };

export class Tarea {
    constructor(titulo, descripcion, estado, dificultad, fechaVencimiento) {
        this.id = uuidv4(); // Genera ID único automáticamente
        this.titulo = titulo;
        this.descripcion = descripcion || "Sin descripción";
        this.estado = estado || "P";
        this.dificultad = parseInt(dificultad || "1");
        this.fechaVencimiento = fechaVencimiento || null;
        this.fechaCreacion = new Date().toISOString().slice(0, 10);
        this.activo = true; // Para Soft Delete
    }

    // El objeto sabe cómo presentarse (Encapsulamiento)
    toString() {
        const estrellas = "⭐".repeat(this.dificultad);
        const estadoLegible = ESTADOS[this.estado] || this.estado;
        return `[${estadoLegible}] ${this.titulo} (${estrellas}) - ID: ...${this.id.slice(-4)}`;
    }

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