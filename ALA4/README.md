# Gestor de Tareas Multiparadigma - TypeScript

## Descripción

Aplicación de gestión de tareas que implementa **todos los paradigmas de programación** revisados en el curso en TypeScript con enfoque académico para demostrar buenas prácticas en cada paradigma.

## Paradigmas Implementados

### 1. **Programación Estructurada / Imperativa** (`index.ts`)
- **Concepto**: Secuencia, selección e iteración.
- **Componentes**:
  - `mostrarMenu()`: Procedimiento para presentación
  - `pedirDato()`: Función con validación de entradas
  - `main()`: Orquestación con switch/while
- **Buenas prácticas**:
  - Modularización con funciones de propósito único
  - Separación lógica entre presentación y negocio
  - Validación robusta de entradas del usuario

### 2. **Programación Orientada a Objetos (POO)** (`src/models/Tarea.ts`, `src/services/ServicioTareas.ts`)

#### Clase `Tarea`
- **Encapsulamiento**: Estado interno encapsulado en la instancia
- **Identidad**: ID único generado con UUID v4
- **Métodos**:
  - `toString()`: Representación resumida (polimorfismo)
  - `obtenerDetalles()`: Abstracción de complejidad
  - `static from()`: Rehidratación desde JSON
- **Interfaz `TareaData`**: Contrato de datos

#### Clase `ServicioTareas`
- **Responsabilidad única**: CRUD + persistencia
- **Métodos privados** (`_cargarDesdeArchivo`, `_guardarEnArchivo`): Ocultamiento de detalles
- **Soft delete**: Marca tareas como inactivas sin eliminarlas físicamente
- **Persistencia en JSON**: Carga/guarda automáticamente

### 3. **Programación Funcional** (`src/functional/estadisticas.ts`)
- **Funciones puras**: No modifican estado externo
- **Higher-Order Functions (HOF)**:
  - `ordenarPor(criterio)`: Retorna función curried para ordenamiento flexible
  - Soporta múltiples tipos: strings, números, fechas
- **Composición**:
  - `contarPor()`: Función auxiliar reutilizable
  - `aPorcentajeYCantidad()`: Transformación de datos
- **Uso de `reduce()`**: Evita bucles for/while
- **Estadísticas calculadas**:
  - Total de tareas
  - Cantidad y porcentaje por estado
  - Cantidad y porcentaje por dificultad

### 4. **Programación Lógica** (`src/logic/predicados.ts`)
- **Predicados** (reglas de verdad):
  - `esPrioridadAlta`: ¿Dificultad = 3?
  - `esVencida`: ¿Fecha pasada y no terminada? (con validación de fecha)
  - `esPendiente`: ¿Estado = P?
- **Regla de inferencia**: `sonRelacionadas()`
  - Dos tareas están relacionadas si comparten dificultad O estado
- **Motor de consulta**: `consultar(lista, predicado)`
- **Base de conocimiento**: `Reglas` (objeto con todas las reglas)

## Requisitos Cumplidos

### ✅ Funcionalidades Principales
- [x] **ID único**: Generado con UUID v4 (compatible con ESM)
- [x] **Eliminación lógica** (soft delete): Marca `activo = false`
- [x] **Persistencia en archivo**: `data/tareas.json`
- [x] **Ordenamiento**: Por título, dificultad, fecha vencimiento, fecha creación
- [x] **Estadísticas**: Total, cantidad/porcentaje por estado y dificultad
- [x] **Consultas lógicas**: Tareas vencidas, prioridad alta, relacionadas

### ✅ Validaciones
- Entradas del usuario protegidas (`String(prompt(...) || '')`)
- Validación de fechas antes de comparar
- `parseInt` con radix (base 10)
- Manejo de `undefined` en comparadores

### ✅ Calidad de Código
- **100% en TypeScript** (sin archivos .js en src/)
- **JSDoc completo** en todas las funciones
- **Tipos explícitos** en parámetros y retornos
- **Comentarios paradigmáticos** explicando el enfoque
- **Modularización**: Cada clase en su archivo
- **Sin duplicación**: Funciones reutilizables

## Estructura de Carpetas

```
ALA4/
├── index.ts                          # Punto de entrada (Programación Estructurada)
├── tsconfig.json                     # Configuración TypeScript
├── package.json                      # Dependencias y scripts
├── data/
│   └── tareas.json                   # Persistencia de datos
├── src/
│   ├── models/
│   │   └── Tarea.ts                  # Clase Tarea (POO)
│   ├── services/
│   │   └── ServicioTareas.ts         # Servicio CRUD (POO)
│   ├── functional/
│   │   └── estadisticas.ts           # Funciones puras y HOF (Funcional)
│   └── logic/
│       └── predicados.ts             # Predicados y reglas (Lógica)
├── dist/                             # Código compilado (generado)
└── node_modules/                     # Dependencias instaladas
```

## Instalación y Ejecución

### Requisitos
- Node.js 18+ con npm

### Pasos

1. **Instalar dependencias**:
   ```bash
   cd ALA4
   npm install
   ```

2. **Compilar TypeScript a JavaScript**:
   ```bash
   npm run build
   ```

3. **Ejecutar la aplicación**:
   ```bash
   npm start
   ```

   O para desarrollo sin compilar:
   ```bash
   npm run dev
   ```

## Scripts Disponibles

- `npm run build`: Compila TypeScript a `dist/`
- `npm start`: Ejecuta `dist/index.js` (requiere build previo)
- `npm run dev`: Ejecuta directamente con ts-node (desarrollo)

## Dependencias

- **uuid** ^13.0.0: Generador de IDs únicos (ESM completo)
- **prompt-sync** ^4.2.0: Input de usuario en terminal

### DevDependencies
- **typescript** ^5.0.0: Compilador TypeScript
- **ts-node** ^10.9.1: Ejecución directa de TS
- **@types/node** ^18.0.0: Tipos para APIs de Node.js
- **@types/prompt-sync** ^4.1.0: Tipos para prompt-sync

## Ejemplos de Uso

### Listar Tareas
```
=== GESTOR DE TAREAS MULTIPARADIGMA (TypeScript) ===
[1] Ver todas las tareas

--- LISTA DE TAREAS ---
[Pendiente] Estudiar TS (⭐⭐⭐) - ID: ...a1b2
[En curso] Hacer ejercicios (⭐⭐) - ID: ...c3d4
```

### Crear Tarea
```
[3] Agregar tarea

--- NUEVA TAREA ---
Título: Mi primer proyecto
Descripción: Implementar todo en TS
Estado (P=Pendiente, E=En curso, T=Terminada, C=Cancelada) [Defecto: P]: P
Dificultad (1-3) [Defecto: 1]: 2
Vencimiento (YYYY-MM-DD, Enter para omitir): 2025-12-15
✅ Tarea guardada.
```

### Consultas Lógicas
```
[7] Consultas Lógicas (Vencidas, Relacionadas...)

[A] Tareas Vencidas | [B] Prioridad Alta | [C] Tareas Relacionadas
Opción: A

Tareas vencidas (si las hay)
```

### Estadísticas
```
[6] Estadísticas (Funcional)

--- ESTADÍSTICAS ---
Total: 3
Estados: {
  P: { cantidad: 2, porcentaje: '66.7%' },
  E: { cantidad: 1, porcentaje: '33.3%' }
}
Dificultades: {
  1: { cantidad: 1, porcentaje: '33.3%' },
  2: { cantidad: 2, porcentaje: '66.7%' }
}
```

## Decisiones de Diseño

### 1. **Soft Delete vs Hard Delete**
Elegimos **soft delete** porque:
- Preserva historial de tareas eliminadas
- Permite recuperar tareas si es necesario
- Cumple con prácticas de auditoría

### 2. **Persistencia en JSON**
- Simple y sin dependencias de BD
- Adecuado para aplicación educativa
- Cargable en memoria (aceptable para scope del proyecto)

### 3. **Tipos en TypeScript**
- `EstadoKey` type union: Asegura valores válidos de estado
- `TareaData` interface: Contrato de serialización
- Parámetros explícitamente tipados: Mayor seguridad en compilación

### 4. **HOF en Estadísticas**
`ordenarPor(criterio)(lista)` permite:
- Reutilizar lógica de comparación
- Composición funcional: `ordenarPor('titulo')(tareas)`
- Inferencia automática de tipo de dato (string, número, fecha)

### 5. **Predicados Simples**
Cada predicado = una idea:
- `esPrioridadAlta`: Solo verifica dificultad
- `esVencida`: Solo verifica fecha y estado
- Composición: reglas complejas = combinación de predicados simples

## Buenas Prácticas Aplicadas

### Programación Estructurada
✅ Funciones de propósito único  
✅ Validación defensiva de entradas  
✅ Separación presentación/negocio  
✅ Evitar variables globales (solo `servicio`)  

### Programación POO
✅ Una clase = una responsabilidad (Tarea, ServicioTareas)  
✅ Encapsulamiento con métodos privados  
✅ Abstracción de persistencia  
✅ Interfaces para contratos de datos  

### Programación Funcional
✅ 90%+ de funciones puras  
✅ Uso de `map`, `filter`, `reduce`  
✅ HOF y currying  
✅ Inmutabilidad (spread operator)  

### Programación Lógica
✅ Predicados con responsabilidad única  
✅ Reglas de inferencia declarativas  
✅ Motor de consulta genérico  
✅ Base de conocimiento (objeto `Reglas`)  

## Compilación

El proyecto compila sin errores ni warnings con `tsc --strict`:

```bash
npm run build
# > ala4@1.0.0 build
# > tsc -p tsconfig.json
# (sin output = éxito)
```

## Futuras Mejoras

- [ ] Agregar categorías de tareas
- [ ] Filtros avanzados (rango de fechas, múltiples criterios)
- [ ] Exportar estadísticas a CSV
- [ ] Interfaz web con React/Vue
- [ ] BD persistente (PostgreSQL, MongoDB)
- [ ] Tests unitarios (Jest)

## Notas del Desarrollador

Este proyecto es una **demostración académica** de cómo aplicar múltiples paradigmas en una misma aplicación, eligiendo el más apropiado para cada parte:
- **Presentación**: Imperativo (UI interactiva)
- **Datos**: POO (modelado de entidades)
- **Análisis**: Funcional (transformaciones de datos)
- **Consultas**: Lógico (reglas y deducciones)

---

**Versión**: 1.0.0  
**Lenguaje**: TypeScript 5.0+  
**Node.js**: 18+  
**Tipo de Módulo**: ES2020 (ESM)
