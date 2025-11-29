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

// Reduce: Cálculo de estadísticas en una sola pasada
export const obtenerEstadisticas = (lista) => {
    const total = lista.length;
    if (total === 0) return null;

    const contarPor = (key) => lista.reduce((acc, item) => {
        const valor = item[key];
        acc[valor] = (acc[valor] || 0) + 1;
        return acc;
    }, {});

    const porEstado = contarPor('estado');
    const porDificultad = contarPor('dificultad');

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