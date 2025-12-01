# RESPUESTAS ENTREVISTA – Prueba Fullstack

## 1. ¿Cuándo usar SQL vs NoSQL?

- Las bases relacionales (SQL) son ideales cuando necesitas **estructura fija, integridad referencial, transacciones ACID y relaciones complejas** entre entidades — por ejemplo: usuarios, órdenes, productos, inventarios.  
- Las bases NoSQL (document-store, clave-valor, etc.) son útiles cuando requieres **alta escalabilidad, flexibilidad de esquema y manejar datos semiestructurados o cambiantes**, como chats, logs, documentos JSON, sistemas con variabilidad en estructura de datos.  
- En resumen:
  - Usa **SQL** cuando la consistencia, relaciones, integridad y transacciones son críticas.  
  - Usa **NoSQL** cuando la flexibilidad, rápido crecimiento, o datos dinámicos son más importantes.  

## 2. Patrón Observable y su uso en Angular

- Un *Observable* es una abstracción para flujos de datos asíncronos que pueden emitir **uno o muchos valores a lo largo del tiempo**. Muy útil para manejar llamadas HTTP, eventos, WebSockets, etc.  
- En Angular, los Observables se usan para obtener datos desde servicios, suscribirse a cambios, reaccionar a ellos — con operadores como `map`, `filter`, `switchMap`, etc. Esto permite un manejo elegante de asincronía, errores y flujos reactivos.  
- Permiten desacoplar la lógica de obtención de datos de la lógica de presentación, y manejar cambios, cancelaciones, estado de carga, etc., de forma clara y reactiva.  

## 3. Diferencia entre Angular Universal y una SPA tradicional

- SPA tradicional: todo el renderizado se hace en el cliente (navegador). Confiable, simple, buena experiencia, pero la carga inicial puede ser pesada y no optimiza SEO.  
- Angular Universal (SSR): el servidor genera el HTML inicial (renderizado en servidor), enviando al cliente contenido ya renderizado. Ventajas: mejor **SEO**, mejor **primer renderizado/performance inicial**, útil en dispositivos lentos o conexiones débiles.  

## 4. Cómo proteger una API / aplicación contra SQL Injection y XSS

### SQL Injection  
- Una inyección SQL ocurre cuando una aplicación agrega directamente datos de usuario a una sentencia SQL sin validación, permitiendo ejecución de código malicioso.  
- Para proteger:  
  - Usar **consultas parametrizadas / prepared statements**, de forma que los datos de usuario se traten como parámetros y no como parte del código SQL.  
  - Validar y sanitizar la entrada del usuario, no confiar nunca en datos arbitrarios.  
  - Limitar privilegios de base de datos: el usuario empleado por la aplicación debería tener solo los permisos necesarios.  

### XSS (Cross-Site Scripting)  
- XSS es una vulnerabilidad donde un atacante inyecta código malicioso (por ejemplo JavaScript) que se ejecuta en el navegador de otro usuario.  
- Para prevenir:  
  - Sanitizar y escapar salidas de datos que vengan del usuario — nunca insertar directamente HTML arbitrario sin sanitización.  
  - Evitar usar `innerHTML` con datos no confiables. Si necesitas u
