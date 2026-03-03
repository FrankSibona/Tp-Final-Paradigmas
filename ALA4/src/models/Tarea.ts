import { v4 as uuidv4 } from 'uuid';

/**
 * Tipo para los estados válidos de una tarea
 */
export type EstadoKey = 'P' | 'E' | 'T' | 'C';

/**
 * Mapeo de estados a sus descripciones legibles
 */
export const ESTADOS: Record<EstadoKey, string> = {
  P: 'Pendiente',
  E: 'En curso',
  T: 'Terminada',
  C: 'Cancelada'
};

/**
 * Interface que define la estructura de datos de una Tarea
 */
export interface TareaData {
  id: string;
  titulo: string;
  descripcion: string;
  estado: EstadoKey;
  dificultad: number;
  fechaVencimiento?: string | null;
  fechaCreacion: string;
  activo: boolean;
}

/**
 * [PARADIGMA POO] Clase que modela una Tarea
 * - Encapsulamiento: estado interno encapsulado en la instancia
 * - Identidad: cada tarea tiene un ID único (UUID)
 * - Comportamiento: métodos para presentación y manipulación
 */
export class Tarea implements TareaData {
  id: string;
  titulo: string;
  descripcion: string;
  estado: EstadoKey;
  dificultad: number;
  fechaVencimiento?: string | null;
  fechaCreacion: string;
  activo: boolean;

  /**
   * Constructor de Tarea
   * @param titulo Título de la tarea (requerido)
   * @param descripcion Descripción opcional
   * @param estado Estado inicial (P/E/T/C), por defecto 'P'
   * @param dificultad Nivel de dificultad 1-3, por defecto 1
   * @param fechaVencimiento Fecha de vencimiento opcional (YYYY-MM-DD)
   * @param id ID único (generado automáticamente si no se proporciona)
   * @param fechaCreacion Fecha de creación (generada automáticamente si no se proporciona)
   * @param activo Marca de estado activo/eliminado lógicamente
   */
  constructor(
    titulo: string,
    descripcion?: string,
    estado?: EstadoKey,
    dificultad?: number | string,
    fechaVencimiento?: string | null,
    id?: string,
    fechaCreacion?: string,
    activo = true
  ) {
    this.id = id ?? uuidv4();
    this.titulo = titulo;
    this.descripcion = descripcion ?? 'Sin descripción';
    this.estado = (estado ?? 'P') as EstadoKey;
    this.dificultad = typeof dificultad === 'string' ? parseInt(dificultad, 10) : (dificultad ?? 1);
    this.fechaVencimiento = fechaVencimiento ?? null;
    this.fechaCreacion = fechaCreacion ?? new Date().toISOString().slice(0, 10);
    this.activo = activo;
  }

  /**
   * [ABSTRACCIÓN] Método estático para crear Tarea desde datos serializados (rehidratación desde JSON)
   * Evita generar ID nuevos innecesariamente al cargar desde persistencia
   * @param obj Datos parciales de la tarea
   * @returns Nueva instancia de Tarea
   */
  static from(obj: Partial<TareaData>): Tarea {
    return new Tarea(
      obj.titulo ?? 'Sin título',
      obj.descripcion ?? 'Sin descripción',
      (obj.estado as EstadoKey) ?? 'P',
      obj.dificultad ?? 1,
      obj.fechaVencimiento ?? null,
      obj.id,
      obj.fechaCreacion,
      obj.activo ?? true
    );
  }

  /**
   * [POLIMORFISMO] Retorna una representación resumida de la tarea
   * @returns String con formato: [Estado] Título (Dificultad) - ID
   */
  toString(): string {
    const estrellas = '⭐'.repeat(this.dificultad);
    const estadoLegible = ESTADOS[this.estado] || this.estado;
    return `[${estadoLegible}] ${this.titulo} (${estrellas}) - ID: ...${this.id.slice(-4)}`;
  }

  /**
   * [ABSTRACCIÓN] Retorna los detalles completos de la tarea
   * Ocultamos la complejidad del formato interno
   * @returns String con información completa formateada
   */
  obtenerDetalles(): string {
    return `\n===== DETALLES =====\nID Completo: ${this.id}\nTítulo: ${this.titulo}\nDescripción: ${this.descripcion}\nEstado: ${ESTADOS[this.estado]}\nDificultad: ${'⭐'.repeat(this.dificultad)}\nVencimiento: ${this.fechaVencimiento || 'N/A'}\nCreación: ${this.fechaCreacion}\n====================`;
  }
}
