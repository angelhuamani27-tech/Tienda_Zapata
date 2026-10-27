# Research: Tienda virtual sencilla

## Decisión 1: aplicación web única

- **Decision**: Next.js con TypeScript en un solo repositorio.
- **Rationale**: Permite servir catálogo público y operaciones protegidas sin separar frontend y
  backend en proyectos distintos. TypeScript hace explícitos los datos y reduce errores.
- **Alternatives considered**: Un frontend y una API independientes (más despliegues y contratos);
  un CMS completo (funciones y coste fuera del alcance).

## Decisión 2: persistencia de productos

- **Decision**: Supabase Postgres con una tabla `products`.
- **Rationale**: Proporciona persistencia compartida entre dispositivos y controles de acceso para
  limitar escrituras al administrador.
- **Alternatives considered**: Archivos locales (no son persistencia pública compartida);
  una base de datos autogestionada (más operación para una tienda pequeña).

## Decisión 3: imágenes

- **Decision**: Supabase Storage con un objeto por producto y políticas de acceso públicas de
  lectura, protegidas de escritura y eliminación.
- **Rationale**: Separa archivos de los registros, permite URLs públicas para el catálogo y evita
  guardar binarios en la base de datos.
- **Alternatives considered**: Imágenes dentro de la base de datos (más complejidad y tamaño);
  almacenamiento local del servidor (no fiable en despliegues efímeros).

## Decisión 4: autenticación

- **Decision**: Supabase Auth con una única cuenta creada durante el despliegue y recuperación
  manual por el responsable.
- **Rationale**: Cumple el único administrador sin cuentas de clientes ni flujo público de registro.
- **Alternatives considered**: Autenticación propia (riesgo y mantenimiento innecesarios);
  proveedores sociales (función no solicitada).

## Decisión 5: publicación y GitHub

- **Decision**: Repositorio GitHub privado o de la organización, despliegue conectado a Vercel,
  y variables secretas configuradas solo en el entorno de despliegue.
- **Rationale**: Cada cambio pasa por revisión y el despliegue se puede revertir desde Git.
- **Alternatives considered**: Servidor manual (más operación); pipeline propio (innecesario para
  el alcance v1).

## Decisión 6: límites y validación

- **Decision**: Validar en servidor y cliente nombre, descripción, precio PEN mayor que cero,
  imagen única JPG/PNG/WebP de máximo 5 MB y existencia de sesión administrativa.
- **Rationale**: Las validaciones duplicadas mejoran la experiencia y el servidor sigue siendo la
  autoridad de seguridad.
- **Alternatives considered**: Validar solo en la interfaz (permite escrituras inválidas).
