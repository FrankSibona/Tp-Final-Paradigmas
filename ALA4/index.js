import promptSync from "prompt-sync";
import { ServicioTareas } from "./src/services/ServicioTareas.js";
import { ordenarPor, obtenerEstadisticas } from "./src/functional/estadisticas.js";
import { consultar, Reglas, buscarRelacionadas } from "./src/logic/predicados.js";

const prompt = promptSync();
const servicio = new ServicioTareas();

function mostrarMenu() {
    console.log("\n=== GESTOR DE TAREAS MULTIPARADIGMA ===");
    console.log("[1] Ver todas las tareas");
    console.log("[2] Buscar tarea (por título)");
    console.log("[3] Agregar tarea");
    console.log("[4] Editar tarea");
    console.log("[5] Eliminar tarea");
    console.log("[6] Estadísticas (Funcional)");
    console.log("[7] Consultas Lógicas (Vencidas, Relacionadas...)");
    console.log("[0] Salir");
}

function pedirDato(texto, opcional = false) {
    let dato;
    do {
        dato = prompt(texto);
        if (!opcional && !dato.trim()) console.log("❌ Este campo es obligatorio.");
    } while (!opcional && !dato.trim());
    return dato;
}

function main() {
    let continuar = true;

    while (continuar) {
        mostrarMenu();
        const opcion = prompt("Elija una opción: ");

        switch (opcion) {
            case "1": // Listar
                let tareas = servicio.obtenerTodas();
                const criterio = prompt("¿Ordenar por? [1] Título [2] Dificultad [Enter] No: ");
                
                if (criterio === "1") tareas = ordenarPor("titulo")(tareas);
                if (criterio === "2") tareas = ordenarPor("dificultad")(tareas);

                console.log("\n--- LISTA DE TAREAS ---");
                if (tareas.length === 0) console.log("(Vacía)");
                tareas.forEach(t => console.log(t.toString()));
                break;

            case "2": // Buscar
                const query = prompt("Buscar: ").toLowerCase();
                const encontradas = servicio.obtenerTodas().filter(t => t.titulo.toLowerCase().includes(query));
                encontradas.forEach(t => console.log(t.toString()));
                break;

            case "3": // Agregar
                console.log("\n--- NUEVA TAREA ---");
                const tit = pedirDato("Título: ");
                const desc = prompt("Descripción: ");
                const est = prompt("Estado (P/E/T/C) [Defecto: P]: ").toUpperCase();
                const dif = prompt("Dificultad (1-3) [Defecto: 1]: ");
                const ven = prompt("Vencimiento (YYYY-MM-DD): ");
                
                servicio.agregar(tit, desc, est, dif, ven);
                console.log("✅ Tarea guardada.");
                break;

            case "4": // Editar
                const idBus = prompt("Ingrese ID (o parte del ID): ");
                const tareaEd = servicio.obtenerTodas().find(t => t.id.includes(idBus));
                
                if (tareaEd) {
                    console.log(tareaEd.obtenerDetalles());
                    const nTit = prompt("Nuevo Título (Enter para mantener): ");
                    const nEst = prompt("Nuevo Estado (Enter para mantener): ").toUpperCase();
                    
                    servicio.actualizar(tareaEd.id, { 
                        titulo: nTit || undefined, 
                        estado: nEst || undefined 
                    });
                    console.log("✅ Actualizada.");
                } else {
                    console.log("❌ No encontrada.");
                }
                break;

            case "5": // Eliminar
                const idBorrar = prompt("ID a eliminar: ");
                // Buscamos coincidencia parcial si no encuentra exacta
                const tareaBorrar = servicio.obtenerTodas().find(t => t.id.includes(idBorrar));
                
                if (tareaBorrar) {
                    const confirm = prompt(`¿Eliminar "${tareaBorrar.titulo}"? (S/N): `).toUpperCase();
                    if (confirm === "S") {
                        servicio.eliminar(tareaBorrar.id);
                        console.log("🗑️ Eliminada.");
                    }
                } else {
                    console.log("❌ No encontrada.");
                }
                break;

            case "6": // Estadísticas
                const stats = obtenerEstadisticas(servicio.obtenerTodas());
                console.log("\n--- ESTADÍSTICAS ---");
                console.table(stats);
                break;

            case "7": // Lógica
                const todas = servicio.obtenerTodas();
                console.log("\n[A] Vencidas | [B] Prioridad Alta | [C] Relacionadas");
                const subOp = prompt("Opción: ").toUpperCase();

                if (subOp === "A") console.table(consultar(todas, Reglas.esVencida));
                if (subOp === "B") console.table(consultar(todas, Reglas.esPrioridadAlta));
                if (subOp === "C") {
                    const idRel = prompt("ID tarea base: ");
                    const base = todas.find(t => t.id.includes(idRel));
                    if (base) {
                        const rels = buscarRelacionadas(base, todas);
                        console.log(`Similares a "${base.titulo}":`);
                        rels.forEach(r => console.log(`- ${r.titulo}`));
                    }
                }
                break;

            case "0":
                continuar = false;
                console.log("¡Adiós!");
                break;

            default:
                console.log("Opción no válida.");
        }
    }
}

main();