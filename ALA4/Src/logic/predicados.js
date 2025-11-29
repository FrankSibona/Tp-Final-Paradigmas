/**
 * Módulo Lógico: Definición de reglas y predicados.
 */

// Hechos / Predicados simples
const esPrioridadAlta = (t) => t.dificultad === 3;
const esVencida = (t) => t.fechaVencimiento && new Date(t.fechaVencimiento) < new Date() && t.estado !== 'T';
const esPendiente = (t) => t.estado === 'P';

// Regla compleja: Relación de similitud
const sonRelacionadas = (tareaBase, tareaCandidata) => 
    tareaBase.id !== tareaCandidata.id && 
    (tareaBase.dificultad === tareaCandidata.dificultad || tareaBase.estado === tareaCandidata.estado);

// Motor de Consulta
export const consultar = (lista, predicado) => lista.filter(predicado);

export const buscarRelacionadas = (tareaObjetivo, listaCompleta) => {
    return listaCompleta.filter(t => sonRelacionadas(tareaObjetivo, t));
};

export const Reglas = {
    esPrioridadAlta,
    esVencida,
    esPendiente
};