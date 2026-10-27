# Tasks: Tienda virtual sencilla con catálogo y WhatsApp

**Input**: Design documents from `/specs/001-catalogo-whatsapp/`

**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/`, `quickstart.md`

## Phase 1: Setup (Shared Infrastructure)

- [ ] T001 Crear la aplicación Next.js con TypeScript en la raíz del repositorio y scripts de desarrollo en `package.json`.
- [ ] T002 [P] Crear la estructura `src/app`, `src/components`, `src/lib`, `src/types`, `tests/unit` y `tests/e2e`.
- [ ] T003 [P] Configurar formato, lint y variables de entorno de ejemplo en `.env.example` sin secretos reales.
- [ ] T004 Configurar el repositorio GitHub, rama de trabajo y protección de la rama de publicación en `.github/`.

## Phase 2: Foundational (Blocking Prerequisites)

- [ ] T005 Crear la tabla de productos y sus reglas de acceso en `supabase/migrations/001_products.sql`.
- [ ] T006 [P] Crear el bucket de imágenes y sus políticas de lectura pública, escritura y eliminación restringidas en `supabase/migrations/002_product_images.sql`.
- [ ] T007 [P] Configurar el cliente público y de servidor de Supabase en `src/lib/supabase/client.ts` y `src/lib/supabase/server.ts`.
- [ ] T008 [P] Definir los tipos `Product` y `Administrator` en `src/types/domain.ts` según `data-model.md`.
- [ ] T009 Crear validaciones compartidas de nombre de 1–100 caracteres, descripción de 1–1000 caracteres, precio PEN mayor que cero con hasta dos decimales e imagen JPG/PNG/WebP de máximo 5 MB en `src/lib/validation/product.ts`.
- [ ] T010 Configurar autenticación de la única cuenta administradora y protección de rutas en `src/lib/auth/admin.ts` y `src/middleware.ts`.
- [ ] T011 [P] Crear manejo común de errores y estados de carga/vacío en `src/components/feedback/`.

## Phase 3: User Story 1 — Ver catálogo y consultar productos (Priority: P1) 🎯 MVP

**Goal**: Visitantes sin cuenta pueden ver un catálogo responsive y consultar los datos de cada producto.

**Independent Test**: Con al menos un producto persistido, abrir la web en móvil y escritorio, comprobar nombre, imagen, precio, descripción y estado de catálogo vacío.

- [ ] T012 [P] [US1] Crear pruebas unitarias de validación y formato de producto, incluyendo límites de nombre 1–100 y descripción 1–1000, en `tests/unit/product-validation.test.ts` (depende de T009).
- [ ] T013 [P] [US1] Crear prueba E2E del catálogo, consulta de producto, catálogo vacío e imagen rota en `tests/e2e/catalog.spec.ts`.
- [ ] T014 [P] [US1] Implementar consulta pública de productos en `src/lib/products/read.ts`.
- [ ] T015 [P] [US1] Crear tarjeta responsive de producto con estado de imagen alternativa en `src/components/products/ProductCard.tsx`.
- [ ] T016 [US1] Crear página pública del catálogo y estado vacío en `src/app/page.tsx`.
- [ ] T017 [US1] Crear vista de consulta individual en `src/app/producto/[id]/page.tsx`.
- [ ] T018 [US1] Integrar errores de lectura y carga en `src/components/feedback/CatalogState.tsx`.

## Phase 4: User Story 2 — Administrar productos (Priority: P1)

**Goal**: El único administrador puede iniciar sesión, agregar productos y eliminarlos definitivamente; los visitantes no pueden escribir.

**Independent Test**: Iniciar sesión, agregar un producto válido, comprobarlo desde otro dispositivo, eliminarlo con confirmación y verificar que un visitante recibe rechazo al escribir.

- [ ] T019 [P] [US2] Crear pruebas unitarias de autorización, sesión vencida y validación de carga en `tests/unit/admin-security.test.ts`.
- [ ] T020 [P] [US2] Crear prueba E2E de login, agregar, visibilidad compartida, confirmación de eliminación y rechazo no autorizado en `tests/e2e/admin-products.spec.ts`.
- [ ] T021 [P] [US2] Crear formulario de login y cierre de sesión en `src/app/admin/login/page.tsx`.
- [ ] T022 [P] [US2] Crear formulario de producto con nombre 1–100 caracteres, descripción 1–1000 caracteres y carga única JPG/PNG/WebP de máximo 5 MB en `src/components/admin/ProductForm.tsx`.
- [ ] T023 [US2] Implementar creación de producto y carga de imagen con autorización de servidor en `src/lib/products/create.ts`.
- [ ] T024 [US2] Implementar eliminación definitiva con confirmación del nombre en `src/lib/products/delete.ts`.
- [ ] T025 [US2] Crear panel protegido para agregar y eliminar en `src/app/admin/page.tsx`.
- [ ] T026 [US2] Mostrar error claro, conservar estado previo y permitir reintento manual ante fallo de almacenamiento en `src/components/admin/AdminFeedback.tsx`.

## Phase 5: User Story 3 — Pedir por WhatsApp (Priority: P1)

**Goal**: Cada producto abre WhatsApp con el número fijo y un mensaje que identifica el producto.

**Independent Test**: Activar el botón de un producto y comprobar el número `994431924` y el texto `Hola, quiero pedir: [nombre del producto]`, sin guardar pedidos.

- [ ] T027 [P] [US3] Crear pruebas unitarias del enlace y codificación del mensaje en `tests/unit/whatsapp-link.test.ts`.
- [ ] T028 [P] [US3] Crear prueba E2E del botón desde tarjeta y detalle en `tests/e2e/whatsapp.spec.ts`.
- [ ] T029 [P] [US3] Implementar constructor del enlace WhatsApp con configuración `994431924` en `src/lib/whatsapp/link.ts`.
- [ ] T030 [US3] Crear botón accesible `Pedir por WhatsApp` en `src/components/whatsapp/WhatsAppButton.tsx`.
- [ ] T031 [US3] Integrar el botón en `src/components/products/ProductCard.tsx` y `src/app/producto/[id]/page.tsx` sin crear carrito ni guardar pedidos.

## Phase 6: Polish, pruebas y publicación

- [ ] T032 Ejecutar la suite unitaria y E2E definida en `package.json` y corregir fallos sin ampliar el alcance.
- [ ] T033 [P] Verificar responsive, teclado, textos en español y estados de error en `tests/e2e/accessibility.spec.ts`.
- [ ] T034 [P] Configurar variables de entorno, proyecto Supabase y cuenta administradora en el entorno de producción según `quickstart.md`.
- [ ] T035 Publicar la rama revisada mediante Vercel conectado a GitHub y comprobar la URL pública en `docs/deployment-check.md`.
- [ ] T036 Ejecutar el recorrido de aceptación de `quickstart.md` contra producción y registrar evidencias en `docs/release-evidence.md`.

## Dependencies & Execution Order

- Phase 1 no depende de otras fases.
- Phase 2 depende de Phase 1 y bloquea las historias.
- Phase 3 depende de Phase 2.
- Phase 4 depende de Phase 2 y de la estructura pública de Phase 3 para comprobar visibilidad compartida.
- Phase 5 depende de los componentes de producto de Phase 3.
- Phase 6 depende de todas las historias.

Parallel opportunities: T002–T004 after T001; T006–T008 and T011 after T005; T012–T015 after Phase 2; T019–T022 after Phase 3; T027–T029 after Phase 3.

## Implementation Strategy

1. Completar Setup y Foundational.
2. Entregar US1 como MVP y validar el catálogo público.
3. Añadir US2 y validar administración, autorización y persistencia compartida.
4. Añadir US3 y validar el contacto manual por WhatsApp.
5. Ejecutar pruebas, publicar mediante GitHub/Vercel y registrar evidencias.

Cada tarea mantiene el alcance de la SPEC; no se incluyen pagos, carrito, inventario, categorías, historial, cuentas de clientes ni edición u ocultación de productos.
