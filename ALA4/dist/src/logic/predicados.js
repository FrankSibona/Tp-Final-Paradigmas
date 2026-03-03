/**
 * [PARADIGMA LÓGICO]
 * Se centra en reglas, hechos y relaciones
 * Definimos QUÉ cumple una condición (Declarativo), no CÓMO recorrer la lista
 */
/**
 * [PREDICADOS] Funciones que devuelven VERDADERO o FALSO
 * Son las unidades básicas de verdad en nuestro sistema lógico
 * Cada predicado tiene una responsabilidad única (un predicado, una idea)
 */
/**
 * Predicado: ¿Esta tarea tiene prioridad alta?
 * Definición: dificultad = 3
 */
export const esPrioridadAlta = (t) => t.dificultad === 3;
/**
 * Predicado: ¿Esta tarea está vencida?
 * Definición: tiene fecha de vencimiento, está en el pasado y NO está terminada
 * Incluye validación robusta de fecha
 */
export const esVencida = (t) => {
    if (!t.fechaVencimiento)
        return false;
    const ts = Date.parse(t.fechaVencimiento);
    if (isNaN(ts))
        return false; // Fecha inválida
    return ts < Date.now() && t.estado !== 'T';
};
/**
 * Predicado: ¿Esta tarea está pendiente?
 * Definición: estado = 'P' (Pendiente)
 */
export const esPendiente = (t) => t.estado === 'P';
/**
 * [REGLA DE INFERENCIA] Relación lógica entre dos tareas
 * Dos tareas están relacionadas SI:
 *   - No son la misma tarea (diferentes IDs)
 *   - Y comparten dificultad O comparten estado
 *
 * Esto es conocimiento deducido, no es un dato guardado en la BD
 */
const sonRelacionadas = (tareaBase, tareaCandidata) => tareaBase.id !== tareaCandidata.id &&
    (tareaBase.dificultad === tareaCandidata.dificultad || tareaBase.estado === tareaCandidata.estado);
/**
 * [MOTOR DE CONSULTA] Abstracción genérica para aplicar predicados sobre un universo de datos
 * Equivale a hacer una "query" lógica
 *
 * @param lista Universo de tareas donde buscar
 * @param predicado Regla a aplicar
 * @returns Subconjunto de tareas que cumplen el predicado
 */
export const consultar = (lista, predicado) => {
    return lista.filter(predicado);
};
/**
 * [INFERENCIA ESPECÍFICA] Busca tareas relacionadas a una tarea objetivo
 * Aplica la regla de inferencia "sonRelacionadas" a toda la lista
 *
 * @param tareaObjetivo Tarea base para comparar
 * @param listaCompleta Universo de tareas donde buscar relacionadas
 * @returns Tareas que cumplen la relación de similitud
 */
export const buscarRelacionadas = (tareaObjetivo, listaCompleta) => {
    return listaCompleta.filter(t => sonRelacionadas(tareaObjetivo, t));
};
/**
 * [BASE DE CONOCIMIENTO] Exportamos todas las reglas en un objeto
 * Permite acceder a predicados de forma unificada: Reglas.esVencida, etc.
 */
export const Reglas = {
    esPrioridadAlta,
    esVencida,
    esPendiente
};
