import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Tarea } from '../models/Tarea.js';
// Configuración de rutas para ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const RUTA_DATA = path.join(__dirname, '../../data/tareas.json');
/**
 * [PARADIGMA POO] Clase Servicio: Encapsula la lógica de negocio y persistencia
 * - Responsabilidad única: manejar el ciclo de vida de objetos Tarea
 * - Encapsulamiento: métodos privados (_cargarDesdeArchivo, _guardarEnArchivo) ocultan detalles
 * - Abstracción: el cliente no sabe ni le importa que usamos archivo JSON
 */
export class ServicioTareas {
    /**
     * Constructor: inicializa el servicio cargando tareas del archivo
     */
    constructor() {
        this.tareas = [];
        this.tareas = this._cargarDesdeArchivo();
    }
    /**
     * [OCULTAMIENTO DE INFORMACIÓN] Método privado
     * Carga datos del archivo JSON y rehidrata objetos Tarea
     * Maneja efectos secundarios (I/O) de forma controlada
     * @returns Array de Tarea cargadas
     */
    _cargarDesdeArchivo() {
        try {
            if (!fs.existsSync(RUTA_DATA))
                return [];
            const data = fs.readFileSync(RUTA_DATA, 'utf-8');
            const objetos = JSON.parse(data);
            return objetos.map(obj => Tarea.from(obj));
        }
        catch (error) {
            console.error('Error al cargar el archivo de tareas:', error);
            return [];
        }
    }
    /**
     * [OCULTAMIENTO DE INFORMACIÓN] Método privado
     * Persiste el estado actual de tareas al archivo JSON
     * Asegura que la carpeta data existe
     */
    _guardarEnArchivo() {
        const carpeta = path.dirname(RUTA_DATA);
        if (!fs.existsSync(carpeta))
            fs.mkdirSync(carpeta, { recursive: true });
        fs.writeFileSync(RUTA_DATA, JSON.stringify(this.tareas, null, 2), 'utf-8');
    }
    /**
     * Agrega una nueva tarea al servicio
     * @param titulo Título de la tarea
     * @param desc Descripción
     * @param estado Estado inicial
     * @param dif Dificultad
     * @param vencimiento Fecha de vencimiento
     * @returns La tarea creada
     */
    agregar(titulo, desc, estado, dif, vencimiento) {
        const nueva = new Tarea(titulo, desc, estado ?? 'P', dif ?? 1, vencimiento ?? null);
        this.tareas.push(nueva);
        this._guardarEnArchivo();
        return nueva;
    }
    /**
     * Elimina una tarea (soft delete): marca como inactiva
     * @param id ID de la tarea a eliminar
     * @returns true si la eliminación fue exitosa, false si no se encontró
     */
    eliminar(id) {
        const tarea = this.tareas.find(t => t.id === id);
        if (tarea) {
            tarea.activo = false; // Soft delete: marca como inactiva
            this._guardarEnArchivo();
            return true;
        }
        return false;
    }
    /**
     * Actualiza datos de una tarea existente
     * @param id ID de la tarea
     * @param nuevosDatos Objeto parcial con los campos a actualizar
     * @returns true si la actualización fue exitosa, false si no se encontró
     */
    actualizar(id, nuevosDatos) {
        const tarea = this.tareas.find(t => t.id === id);
        if (!tarea)
            return false;
        // Mutación controlada: solo actualiza campos explícitamente proporcionados
        if (nuevosDatos.titulo !== undefined)
            tarea.titulo = nuevosDatos.titulo;
        if (nuevosDatos.descripcion !== undefined)
            tarea.descripcion = nuevosDatos.descripcion;
        if (nuevosDatos.estado !== undefined)
            tarea.estado = nuevosDatos.estado;
        if (nuevosDatos.dificultad !== undefined) {
            tarea.dificultad = typeof nuevosDatos.dificultad === 'string' ? parseInt(String(nuevosDatos.dificultad), 10) : nuevosDatos.dificultad;
        }
        if (nuevosDatos.fechaVencimiento !== undefined)
            tarea.fechaVencimiento = nuevosDatos.fechaVencimiento ?? null;
        this._guardarEnArchivo();
        return true;
    }
    /**
     * Obtiene todas las tareas activas (filtra eliminadas lógicamente)
     * @returns Array de tareas activas
     */
    obtenerTodas() {
        return this.tareas.filter(t => t.activo);
    }
}
