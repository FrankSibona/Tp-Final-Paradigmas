import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Tarea } from '../models/Tarea.js';

// Configuración de rutas para ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const RUTA_DATA = path.join(__dirname, '../../data/tareas.json');


// [PARADIGMA POO] Clase Servicio: Encapsula la lógica de negocio y persistencia.
// Responsable de manejar el "ciclo de vida" de los objetos Tarea.
export class ServicioTareas {
    constructor() {
        // El servicio es dueño de la lista de tareas (Estado).
        this.tareas = this._cargarDesdeArchivo();
    }


    // [OCULTAMIENTO DE INFORMACIÓN] Método "Privado" (por convención con _).
    // Maneja EFECTOS SECUNDARIOS (Side Effects) de lectura de disco (I/O).
    // El resto del programa no sabe (ni le importa) que usamos un archivo JSON.
    // Método Privado: Carga datos y reconstruye los objetos Tarea
    _cargarDesdeArchivo() {
        try {
            if (!fs.existsSync(RUTA_DATA)) return [];
            const data = fs.readFileSync(RUTA_DATA, 'utf-8');
            const objetos = JSON.parse(data);
            // Re-instanciamos para recuperar los métodos de la clase Tarea
            return objetos.map(obj => Object.assign(new Tarea(), obj));
        } catch (error) {
            console.error("Error al cargar el archivo de tareas:", error);
            return [];
        }
    }

    // Método Privado: Guarda el estado actual en el JSON
    _guardarEnArchivo() {
        // Aseguramos que la carpeta data exista
        const carpeta = path.dirname(RUTA_DATA);
        if (!fs.existsSync(carpeta)) fs.mkdirSync(carpeta, { recursive: true });
        
        fs.writeFileSync(RUTA_DATA, JSON.stringify(this.tareas, null, 2));
    }
    // Métodos Públicos (Interfaz del Objeto)
    agregar(titulo, desc, estado, dif, vencimiento) {
        const nueva = new Tarea(titulo, desc, estado, dif, vencimiento);
        this.tareas.push(nueva);
        this._guardarEnArchivo();
        return nueva;
    }

    eliminar(id) {
        const tarea = this.tareas.find(t => t.id === id);
        if (tarea) {
            tarea.activo = false; // Soft Delete
            this._guardarEnArchivo();
            return true;
        }
        return false;
    }

    actualizar(id, nuevosDatos) {
        const tarea = this.tareas.find(t => t.id === id);
        if (!tarea) return false;

        // Mutación controlada del estado del objeto
        // Actualizamos solo los campos que vienen con datos
        if (nuevosDatos.titulo) tarea.titulo = nuevosDatos.titulo;
        if (nuevosDatos.descripcion) tarea.descripcion = nuevosDatos.descripcion;
        if (nuevosDatos.estado) tarea.estado = nuevosDatos.estado;
        if (nuevosDatos.dificultad) tarea.dificultad = parseInt(nuevosDatos.dificultad);
        if (nuevosDatos.fechaVencimiento) tarea.fechaVencimiento = nuevosDatos.fechaVencimiento;

        this._guardarEnArchivo();
        return true;
    }

    obtenerTodas() {
        return this.tareas.filter(t => t.activo); // Solo devuelve las activas
    }
}