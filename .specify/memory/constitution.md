<!--
Sync Impact Report
- Version change: 1.0.0 → 1.0.1 (aclaración de experiencia y objetivo principal)
- Principios modificados: I. Simplicidad máxima; IX. Accesibilidad y código explicable.
- Secciones modificadas: Alcance funcional.
- Secciones eliminadas: ninguna.
- TODO: confirmar la fecha histórica de ratificación si se requiere conservarla.
-->

# Tienda Catálogo WhatsApp v1 Constitution

## Core Principles

### I. Simplicidad máxima
El producto MUST ser una tienda básica, real y pública. Cada decisión debe reducir la complejidad operativa y técnica compatible con el alcance aprobado. La experiencia MUST ser fácil de usar y visualmente agradable, sin añadir funciones innecesarias.

### II. Español de Perú y autorización explícita
La interfaz, mensajes y documentación dirigida al usuario MUST usar español de Perú. No se añadirán funciones, integraciones ni cambios de alcance sin autorización explícita.

### III. La SPEC es el contrato funcional
La SPEC vigente MUST ser la fuente de verdad para el comportamiento funcional. Las preferencias del agente o del implementador no pueden sustituirla.

### IV. Administrador protegido y clientes públicos
Debe existir un único espacio de administración protegido. Los clientes MUST poder consultar el catálogo público sin crear cuentas ni iniciar sesión.

### V. Alcance mínimo no negociable
La versión v1 MUST excluir toda función no aprobada. El objetivo principal es mostrar productos y permitir pedidos individuales por WhatsApp.

### VI. Seguridad obligatoria
Los secretos MUST permanecer fuera del código y de las respuestas públicas. Toda entrada debe validarse y las escrituras deben bloquearse para usuarios no autorizados.

### VII. Cambios pequeños y localizados
Cada cambio MUST limitarse a los archivos necesarios para la tarea y no reescribir archivos ajenos sin justificación registrada.

### VIII. Pruebas y evidencias
Antes de afirmar que algo funciona, deben ejecutarse pruebas pertinentes y conservarse evidencia verificable de sus resultados.

### IX. Accesibilidad y código explicable
La experiencia MUST funcionar en celulares y computadoras, adaptarse a distintos tamaños de pantalla, exponer errores claros y mantener código comprensible.

### X. Git y decisiones registradas
El trabajo MUST realizarse con Git. Las decisiones significativas de alcance, seguridad o arquitectura deben quedar registradas.

## Alcance funcional

El objetivo principal es mostrar productos y permitir pedidos individuales mediante WhatsApp según la SPEC. El catálogo público permite consultar productos y continuar la conversación por ese canal. El área administrativa se limita a las operaciones autorizadas por la SPEC y permanece protegida.

## Seguridad y datos

Cada cambio debe comprobar autenticación y autorización del administrador, validación de datos, protección de secretos, control de escrituras y tratamiento seguro de imágenes.

## Flujo de desarrollo

Cada cambio debe vincularse con una necesidad de la SPEC, mantenerse pequeño, revisarse en Git y verificarse con pruebas apropiadas antes de integrar o publicar.

## Governance

Esta constitución prevalece sobre convenciones informales. Toda enmienda debe documentar su motivo, impacto, fecha y versión, y pasar las verificaciones de seguridad, pruebas y revisión.

La versión usa SemVer: MAJOR para cambios incompatibles, MINOR para nuevos principios o secciones y PATCH para aclaraciones sin cambio semántico.

**Version**: 1.0.1 | **Ratified**: TODO(RATIFICATION_DATE): fecha de adopción original | **Last Amended**: 2026-10-26
