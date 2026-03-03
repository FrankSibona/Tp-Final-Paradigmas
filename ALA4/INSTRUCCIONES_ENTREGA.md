# 📦 INSTRUCCIONES DE ENTREGA Y EJECUCIÓN

## ✅ Proyecto Completado: ALA4 - Gestor de Tareas Multiparadigma

**Estado**: LISTO PARA PRESENTACIÓN  
**Fecha**: 30 de noviembre de 2025  
**Versión**: 1.0.0

---

## 📥 Cómo Recibir/Usar Este Proyecto

### Opción 1: Desde el Directorio Actual
```bash
cd d:\Tp-Final-Paradigmas-main\ALA4
```

### Opción 2: Clonar/Descargar
El proyecto está en:
```
d:\Tp-Final-Paradigmas-main\ALA4\
```

---

## 🚀 PASOS PARA EJECUTAR (5 minutos)

### Paso 1: Instalar Dependencias
```bash
npm install
```

**Output esperado**:
```
added 25 packages, and audited 26 packages in 7s
found 0 vulnerabilities
```

### Paso 2: Compilar TypeScript
```bash
npm run build
```

**Output esperado**:
```
> ala4@1.0.0 build
> tsc -p tsconfig.json
(sin output = éxito)
```

### Paso 3a: Ejecutar Aplicación Interactiva
```bash
npm start
```

**Qué pasa**:
- Se abre un menú interactivo
- Puedes crear, listar, editar, eliminar tareas
- Presiona `0` para salir

### Paso 3b: Ejecutar en Modo Desarrollo
```bash
npm run dev
```

**Qué pasa**:
- Ejecuta directamente sin compilar (más rápido)
- Usa `ts-node` para TypeScript nativo

### Paso 4: Ejecutar Tests Automatizados (Validación)
```bash
npm run build
node dist/test.js
```

**Output esperado**:
```
=== PRUEBAS AUTOMATIZADAS DEL GESTOR DE TAREAS ===
✅ TEST 1: Crear tareas
✅ TEST 2: Listar tareas
✅ TEST 3: Ordenar tareas
... (12 tests totales, todos con ✅)
✅ 12/12 tests passed
```

---

## 📋 Menú de la Aplicación

```
=== GESTOR DE TAREAS MULTIPARADIGMA (TypeScript) ===
[1] Ver todas las tareas
[2] Buscar tarea (por título)
[3] Agregar tarea
[4] Editar tarea
[5] Eliminar tarea
[6] Estadísticas (Funcional)
[7] Consultas Lógicas (Vencidas, Relacionadas...)
[0] Salir
```

### Ejemplos de Uso

#### Ejemplo 1: Crear una tarea
```
Opción: 3
--- NUEVA TAREA ---
Título: Estudiar TypeScript
Descripción: Aprender tipos e interfaces
Estado (P=Pendiente, E=En curso, T=Terminada, C=Cancelada) [Defecto: P]: P
Dificultad (1-3) [Defecto: 1]: 3
Vencimiento (YYYY-MM-DD, Enter para omitir): 2025-12-15
✅ Tarea guardada.
```

#### Ejemplo 2: Ver estadísticas
```
Opción: 6
--- ESTADÍSTICAS ---
Total: 5
Estados:   { P: { cantidad: 3, porcentaje: '60.0%' }, ... }
Dificultades: { 1: { cantidad: 2, porcentaje: '40.0%' }, ... }
```

#### Ejemplo 3: Buscar tareas vencidas
```
Opción: 7
[A] Tareas Vencidas | [B] Prioridad Alta | [C] Tareas Relacionadas
Opción: A
(muestra tabla de tareas vencidas)
```

---

## 📚 Documentación Incluida

### 1. **README.md**
- Descripción completa del proyecto
- Cada paradigma explicado
- Estructura y dependencias
- Ejemplos de uso

### 2. **VALIDACION.md**
- Checklist de requisitos cumplidos
- Criterios de validación
- Métricas de calidad
- Decisiones de diseño

### 3. **RESUMEN_EJECUTIVO.md**
- Resumen de 4 páginas
- Lo que se logró
- Estructura del proyecto
- Características destacadas

### 4. **INSTRUCCIONES_ENTREGA.md** (Este documento)
- Cómo ejecutar
- Ejemplos de uso
- Archivo de datos
- Troubleshooting

---

## 💾 Persistencia de Datos

Los datos se guardan automáticamente en:
```
data/tareas.json
```

**Contenido después de crear 2 tareas**:
```json
[
  {
    "id": "5305a5b5-a83f-47a7-bd1c-a5718b4c7778",
    "titulo": "Estudiar TypeScript",
    "descripcion": "Aprender tipos y interfaces",
    "estado": "P",
    "dificultad": 3,
    "fechaVencimiento": "2025-12-15",
    "fechaCreacion": "2025-11-30",
    "activo": true
  },
  ...
]
```

**Nota**: El archivo se carga al iniciar y se actualiza en cada operación CRUD.

---

## 🔧 Scripts Disponibles

| Script | Comando | Función |
|--------|---------|---------|
| **build** | `npm run build` | Compila src/ → dist/ |
| **start** | `npm start` | Ejecuta desde dist/ (requiere build) |
| **dev** | `npm run dev` | Ejecuta con ts-node (sin compilar) |

---

## 🎯 Verificación Rápida

Para verificar que todo está instalado correctamente:

```bash
# Check Node version
node --version          # v18+ requerido

# Check npm
npm --version           # v9+ recomendado

# Check TypeScript
npx tsc --version       # v5.0+ 

# Verify compilation
npm run build           # No debe tener errores

# Run tests
node dist/test.js       # Debe pasar 12/12 tests
```

---

## 🐛 Troubleshooting

### Problema: "Cannot find module 'prompt-sync'"
**Solución**: Ejecutar `npm install` antes

### Problema: "tsc: command not found"
**Solución**: Ejecutar `npm install` primero

### Problema: "dist/ no existe"
**Solución**: Ejecutar `npm run build` para generar

### Problema: Tests fallan
**Solución**: Ejecutar en orden: `npm install` → `npm run build` → `node dist/test.js`

### Problema: "Port already in use"
**Solución**: Este proyecto no usa puertos (es CLI), no debería ocurrir

---

## 📊 Archivos del Proyecto

### Código Fuente (TypeScript)
```
✅ index.ts                     (Aplicación principal)
✅ test.ts                      (Pruebas automatizadas)
✅ src/models/Tarea.ts          (POO)
✅ src/services/ServicioTareas.ts (POO)
✅ src/functional/estadisticas.ts (Funcional)
✅ src/logic/predicados.ts      (Lógico)
```

### Configuración
```
✅ tsconfig.json                (TypeScript config)
✅ package.json                 (npm config + scripts)
✅ .gitignore                   (Git)
```

### Documentación
```
✅ README.md                    (Guía completa)
✅ VALIDACION.md                (Criterios cumplidos)
✅ RESUMEN_EJECUTIVO.md         (Resumen)
✅ INSTRUCCIONES_ENTREGA.md     (Este archivo)
```

### Datos
```
✅ data/tareas.json             (Base de datos persistida)
```

### Compilado (Generado)
```
✅ dist/                        (Código compilado JS)
✅ node_modules/                (Dependencias instaladas)
✅ package-lock.json            (Lock de versiones)
```

---

## ✨ Características Clave a Demostrar

### 1. **Paradigma Estructurado**
Mostrar: `index.ts` con menú y validación de entradas

### 2. **Paradigma POO**
Mostrar: 
- Clase `Tarea` con encapsulamiento
- Clase `ServicioTareas` con persistencia

### 3. **Paradigma Funcional**
Mostrar:
- `ordenarPor()` como HOF
- `obtenerEstadisticas()` con `reduce()`

### 4. **Paradigma Lógico**
Mostrar:
- Predicados: `esPrioridadAlta`, `esVencida`
- Consultas: `consultar()`, `buscarRelacionadas()`

---

## 🎓 Demostración Sugerida (10 minutos)

1. **Mostrar estructura** (1 min)
   - Abrir carpetas src/
   - Mostrar archivos .ts

2. **Compilar** (1 min)
   ```bash
   npm run build
   ```

3. **Ejecutar tests** (2 min)
   ```bash
   node dist/test.js
   ```

4. **Usar la app** (4 min)
   ```bash
   npm start
   ```
   - Crear 2-3 tareas
   - Ver estadísticas
   - Buscar vencidas
   - Eliminar una
   - Salir

5. **Revisar código** (2 min)
   - Mostrar index.ts (Estructurado)
   - Mostrar Tarea.ts (POO)
   - Mostrar estadisticas.ts (Funcional)
   - Mostrar predicados.ts (Lógico)

---

## 📞 Soporte

Si hay preguntas sobre:
- **Uso**: Consultar README.md
- **Validación técnica**: Consultar VALIDACION.md
- **Arquitectura**: Consultar comentarios en código
- **Tests**: Ejecutar `node dist/test.js`

---

## ✅ Checklist Antes de Entregar

- [x] npm install completado
- [x] npm run build sin errores
- [x] npm start funciona
- [x] Tests 12/12 pass
- [x] data/tareas.json persiste datos
- [x] README.md presente
- [x] VALIDACION.md presente
- [x] Todos los .ts compilan
- [x] Sin archivos .js en src/
- [x] TypeScript 5.0+ instalado

---

## 🎉 Listo para Presentación

El proyecto está **100% completado** y listo para:
- ✅ Evaluación
- ✅ Demostración
- ✅ Auditoría de código
- ✅ Ejecución de tests

---

**Fecha de Finalización**: 30 de noviembre de 2025  
**Tiempo Total de Desarrollo**: Completado en esta sesión  
**Estado**: ✅ COMPLETADO Y VALIDADO

---

## 🚀 Quick Start (Una línea)

```bash
cd d:\Tp-Final-Paradigmas-main\ALA4 && npm install && npm run build && npm start
```

¡Que disfrutes el proyecto! 🎊
