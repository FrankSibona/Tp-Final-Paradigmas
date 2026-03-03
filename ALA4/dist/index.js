/**
 * [PARADIGMA ESTRUCTURADO / IMPERATIVO]
 * Orquesta la aplicación. Se basa en SECUENCIA, SELECCIÓN e ITERACIÓN.
 * Es el "pegamento" que une los módulos de los otros paradigmas.
 *
 * Utiliza:
 * - Funciones procedimentales (mostrarMenu, pedirDato)
 * - Estructuras de control (if, switch, while)
 * - Modularización para mantener código legible
 */
import promptSync from 'prompt-sync';
import { ServicioTareas } from './src/services/ServicioTareas.js';
import { ordenarPor, obtenerEstadisticas } from './src/functional/estadisticas.js';
import { consultar, Reglas, buscarRelacionadas } from './src/logic/predicados.js';
const prompt = promptSync();
const servicio = new ServicioTareas();
/**
 * [MODULARIZACIÓN] Procedimiento para mostrar el menú principal
 * Separa la lógica de presentación
 */
function mostrarMenu() {
    console.log('\n=== GESTOR DE TAREAS MULTIPARADIGMA (TypeScript) ===');
    console.log('[1] Ver todas las tareas');
    console.log('[2] Buscar tarea (por título)');
    console.log('[3] Agregar tarea');
    console.log('[4] Editar tarea');
    console.log('[5] Eliminar tarea');
    console.log('[6] Estadísticas (Funcional)');
    console.log('[7] Consultas Lógicas (Vencidas, Relacionadas...)');
    console.log('[0] Salir');
}
/**
 * [VALIDACIÓN DE ENTRADAS] Procedimiento para pedir datos con validación
 * Asegura que no aceptamos inputs inválidos
 *
 * @param texto Mensaje a mostrar al usuario
 * @param opcional Si es true, permite strings vacíos
 * @returns String validado (nunca undefined)
 */
function pedirDato(texto, opcional = false) {
    let dato = '';
    do {
        const res = prompt(texto);
        dato = String(res || '').trim();
        if (!opcional && !dato) {
            console.log('❌ Este campo es obligatorio.');
        }
    } while (!opcional && !dato);
    return dato;
}
/**
 * [FUNCIÓN PRINCIPAL] Orquesta el flujo de la aplicación
 * [ITERACIÓN] Bucle principal (Game Loop)
 * [SELECCIÓN] Switch para decidir el flujo según opción del usuario
 */
function main() {
    let continuar = true;
    while (continuar) {
        mostrarMenu();
        const opcion = String(prompt('Elija una opción: ') || '').trim();
        switch (opcion) {
            case '1': {
                // Listar tareas con opción de ordenamiento
                let tareas = servicio.obtenerTodas();
                const criterio = String(prompt('¿Ordenar por? [1] Título [2] Dificultad [3] Fecha Vencimiento [4] Creación [Enter] No: ') || '');
                if (criterio === '1')
                    tareas = ordenarPor('titulo')(tareas);
                if (criterio === '2')
                    tareas = ordenarPor('dificultad')(tareas);
                if (criterio === '3')
                    tareas = ordenarPor('fechaVencimiento')(tareas);
                if (criterio === '4')
                    tareas = ordenarPor('fechaCreacion')(tareas);
                console.log('\n--- LISTA DE TAREAS ---');
                if (tareas.length === 0) {
                    console.log('(Vacía)');
                }
                else {
                    tareas.forEach(t => console.log(t.toString()));
                }
                break;
            }
            case '2': {
                // Búsqueda imperativa por título
                const query = String(prompt('Buscar: ') || '').toLowerCase();
                const encontradas = servicio.obtenerTodas().filter(t => t.titulo.toLowerCase().includes(query));
                if (encontradas.length === 0) {
                    console.log('No se encontraron tareas.');
                }
                else {
                    encontradas.forEach(t => console.log(t.toString()));
                }
                break;
            }
            case '3': {
                // Crear nueva tarea
                console.log('\n--- NUEVA TAREA ---');
                const tit = pedirDato('Título: ');
                const desc = String(prompt('Descripción (Enter para omitir): ') || '');
                const est = String(prompt('Estado (P=Pendiente, E=En curso, T=Terminada, C=Cancelada) [Defecto: P]: ') || 'P').toUpperCase();
                const dif = String(prompt('Dificultad (1-3) [Defecto: 1]: ') || '1');
                const ven = String(prompt('Vencimiento (YYYY-MM-DD, Enter para omitir): ') || '');
                servicio.agregar(tit, desc, est, dif, ven);
                console.log('✅ Tarea guardada.');
                break;
            }
            case '4': {
                // Editar tarea existente
                const idBus = String(prompt('Ingrese ID (o parte del ID): ') || '');
                const tareaEd = servicio.obtenerTodas().find(t => t.id.includes(idBus));
                if (tareaEd) {
                    console.log(tareaEd.obtenerDetalles());
                    const nTit = String(prompt('Nuevo Título (Enter para mantener): ') || '');
                    const nEst = String(prompt('Nuevo Estado (Enter para mantener): ') || '').toUpperCase();
                    servicio.actualizar(tareaEd.id, {
                        titulo: nTit || undefined,
                        estado: nEst || undefined
                    });
                    console.log('✅ Actualizada.');
                }
                else {
                    console.log('❌ No encontrada.');
                }
                break;
            }
            case '5': {
                // Eliminar tarea (soft delete)
                const idBorrar = String(prompt('ID a eliminar (o parte del ID): ') || '');
                const tareaBorrar = servicio.obtenerTodas().find(t => t.id.includes(idBorrar));
                if (tareaBorrar) {
                    const confirm = String(prompt(`¿Eliminar "${tareaBorrar.titulo}"? (S/N): `) || '').toUpperCase();
                    if (confirm === 'S') {
                        servicio.eliminar(tareaBorrar.id);
                        console.log('🗑️ Eliminada.');
                    }
                }
                else {
                    console.log('❌ No encontrada.');
                }
                break;
            }
            case '6': {
                // Estadísticas (Paradigma Funcional)
                const stats = obtenerEstadisticas(servicio.obtenerTodas());
                console.log('\n--- ESTADÍSTICAS ---');
                console.table(stats);
                break;
            }
            case '7': {
                // Consultas lógicas (Paradigma Lógico)
                const todas = servicio.obtenerTodas();
                console.log('\n[A] Tareas Vencidas | [B] Prioridad Alta | [C] Tareas Relacionadas');
                const subOp = String(prompt('Opción: ') || '').toUpperCase();
                if (subOp === 'A') {
                    const vencidas = consultar(todas, Reglas.esVencida);
                    if (vencidas.length === 0) {
                        console.log('No hay tareas vencidas.');
                    }
                    else {
                        console.table(vencidas);
                    }
                }
                else if (subOp === 'B') {
                    const altas = consultar(todas, Reglas.esPrioridadAlta);
                    if (altas.length === 0) {
                        console.log('No hay tareas de prioridad alta.');
                    }
                    else {
                        console.table(altas);
                    }
                }
                else if (subOp === 'C') {
                    const idRel = String(prompt('ID tarea base (o parte del ID): ') || '');
                    const base = todas.find(t => t.id.includes(idRel));
                    if (base) {
                        const rels = buscarRelacionadas(base, todas);
                        console.log(`\nTareas similares a "${base.titulo}":`);
                        if (rels.length === 0) {
                            console.log('No hay tareas relacionadas.');
                        }
                        else {
                            rels.forEach(r => console.log(`- ${r.toString()}`));
                        }
                    }
                    else {
                        console.log('❌ Tarea base no encontrada.');
                    }
                }
                break;
            }
            case '0': {
                continuar = false;
                console.log('¡Adiós!');
                break;
            }
            default: {
                console.log('❌ Opción no válida. Intente de nuevo.');
            }
        }
    }
}
// Inicia la aplicación
main();
