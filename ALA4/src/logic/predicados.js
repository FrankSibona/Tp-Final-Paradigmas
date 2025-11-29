/**
 * [PARADIGMA LÓGICO]
 * Se centra en reglas, hechos y relaciones.
 * Definimos QUÉ cumple una condición (Declarativo), no CÓMO recorrer la lista.
 */

// [HECHOS / PREDICADOS] Funciones que devuelven VERDADERO o FALSO.
// Son las unidades básicas de verdad en nuestro sistema lógico.

/**
 * Módulo Lógico: Definición de reglas y predicados.
 */

// Hechos / Predicados simples
const esPrioridadAlta = (t) => t.dificultad === 3;
const esVencida = (t) => t.fechaVencimiento && new Date(t.fechaVencimiento) < new Date() && t.estado !== 'T';
const esPendiente = (t) => t.estado === 'P';



// [REGLA DE INFERENCIA] Definimos una relación lógica compleja.
// "Dos tareas están relacionadas SI comparten dificultad O comparten estado".
// Esto es conocimiento deducido, no es un dato guardado en la BD.
// Regla compleja: Relación de similitud
const sonRelacionadas = (tareaBase, tareaCandidata) => 
    tareaBase.id !== tareaCandidata.id && 
    (tareaBase.dificultad === tareaCandidata.dificultad || tareaBase.estado === tareaCandidata.estado);


// [MOTOR DE CONSULTA] Abstracción para aplicar predicados sobre un universo de datos.
// Equivale a hacer una "query" lógica.
// Motor de Consulta
export const consultar = (lista, predicado) => lista.filter(predicado);


// Inferencia específica usando la regla definida arriba.
export const buscarRelacionadas = (tareaObjetivo, listaCompleta) => {
    return listaCompleta.filter(t => sonRelacionadas(tareaObjetivo, t));
};

export const Reglas = {
    esPrioridadAlta,
    esVencida,
    esPendiente
};