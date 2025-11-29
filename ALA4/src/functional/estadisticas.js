/**
 * [PARADIGMA FUNCIONAL]
 * Nos centramos en QUÉ queremos calcular, usando transformaciones de datos.
 * REGLAS CLAVE: Inmutabilidad, Funciones Puras y Sin Efectos Secundarios.
 */

// [CURRYING / HOF] Función de Orden Superior.
// Devuelve una NUEVA función configurada con el criterio.
// Permite: ordenarPor('titulo')(lista) o ordenarPor('dificultad')(lista)
/**
 * Módulo Funcional: Transformaciones puras.
 */

// Currying: Función que devuelve otra función de ordenamiento
export const ordenarPor = (criterio) => (lista) => {
    return [...lista].sort((a, b) => {
        if (a[criterio] < b[criterio]) return -1;
        if (a[criterio] > b[criterio]) return 1;
        return 0;
    });
};

// [FUNCIÓN PURA] Recibe datos -> Devuelve datos.
// No lee archivos, no imprime en consola, no modifica variables globales.
// Reduce: Cálculo de estadísticas en una sola pasada
export const obtenerEstadisticas = (lista) => {
    const total = lista.length;
    if (total === 0) return null;


    // [COMPOSICIÓN] Función auxiliar interna para reutilizar lógica de conteo.
    // Usamos .reduce() para transformar un Array en un Objeto (evitando bucles for/while).
    const contarPor = (key) => lista.reduce((acc, item) => {
        const valor = item[key];
        acc[valor] = (acc[valor] || 0) + 1;
        return acc;
    }, {});

    const porEstado = contarPor('estado');
    const porDificultad = contarPor('dificultad');

    // [TRANSFORMACIÓN] Mapeamos los valores absolutos a porcentajes.
    // Object.keys(obj).reduce(...) es un patrón funcional común para iterar objetos.
    // Transformación a porcentajes
    const aPorcentaje = (obj) => Object.keys(obj).reduce((acc, key) => {
        acc[key] = ((obj[key] / total) * 100).toFixed(1) + "%";
        return acc;
    }, {});

    return {
        Total: total,
        Estados: aPorcentaje(porEstado),
        Dificultades: aPorcentaje(porDificultad)
    };
};