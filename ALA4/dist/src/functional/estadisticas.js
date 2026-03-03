/**
 * [PARADIGMA FUNCIONAL]
 * Transformaciones puras sobre datos, sin efectos secundarios
 * Utilizamos Higher-Order Functions (HOF) y composición
 */
/**
 * [CURRYING / HOF] Función de Orden Superior
 * Devuelve una nueva función configurada con el criterio de ordenamiento
 * Permite: ordenarPor('titulo')(lista) o ordenarPor('dificultad')(lista)
 *
 * [FUNCIÓN PURA] No modifica el array original (usa spread operator)
 * Maneja múltiples tipos: strings, números, fechas
 *
 * @param criterio Nombre del atributo por el cual ordenar
 * @returns Función que toma una lista de tareas y retorna una copia ordenada
 */
export const ordenarPor = (criterio) => (lista) => {
    const comparador = (a, b) => {
        const va = a[criterio];
        const vb = b[criterio];
        // Manejo de undefined
        if (va === undefined && vb === undefined)
            return 0;
        if (va === undefined)
            return 1;
        if (vb === undefined)
            return -1;
        // Comparación numérica
        if (typeof va === 'number' && typeof vb === 'number') {
            return va - vb;
        }
        // Comparación de fechas (formato YYYY-MM-DD)
        const dateA = Date.parse(String(va));
        const dateB = Date.parse(String(vb));
        if (!isNaN(dateA) && !isNaN(dateB)) {
            return dateA - dateB;
        }
        // Fallback: comparación de strings
        return String(va).localeCompare(String(vb));
    };
    return [...lista].sort(comparador);
};
/**
 * [FUNCIÓN PURA] Calcula estadísticas sobre una lista de tareas
 * - Entrada: lista de tareas
 * - Salida: objeto con Total, Estados y Dificultades (cantidad + porcentaje)
 * - Sin efectos secundarios: no modifica la lista ni variables globales
 *
 * Utiliza reduce() para transformar arrays en objetos calculados
 * Este es un patrón funcional para evitar bucles for/while
 *
 * @param lista Array de tareas a analizar
 * @returns Objeto con estadísticas (cantidad y porcentaje)
 */
export const obtenerEstadisticas = (lista) => {
    const total = lista.length;
    /**
     * [COMPOSICIÓN] Función auxiliar interna para contar frecuencias
     * Reutilizable dentro del contexto
     */
    const contarPor = (key) => lista.reduce((acc, item) => {
        const valor = String(item[key] ?? 'N/A');
        acc[valor] = (acc[valor] || 0) + 1;
        return acc;
    }, {});
    const porEstado = contarPor('estado');
    const porDificultad = contarPor('dificultad');
    /**
     * [TRANSFORMACIÓN] Mapea valores absolutos a cantidad + porcentaje
     * Object.keys(obj).reduce(...) es un patrón funcional para iterar objetos
     */
    const aPorcentajeYCantidad = (obj) => Object.keys(obj).reduce((acc, key) => {
        const cantidad = obj[key];
        const porcentaje = ((cantidad / Math.max(1, total)) * 100).toFixed(1) + '%';
        acc[key] = { cantidad, porcentaje };
        return acc;
    }, {});
    return {
        Total: total,
        Estados: aPorcentajeYCantidad(porEstado),
        Dificultades: aPorcentajeYCantidad(porDificultad)
    };
};
