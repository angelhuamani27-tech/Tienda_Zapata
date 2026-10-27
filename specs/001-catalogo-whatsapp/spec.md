# Feature Specification: Catálogo público con pedidos por WhatsApp

**Feature Branch**: `001-catalogo-whatsapp`
**Created**: 2026-10-26
**Status**: Draft

## User Scenarios & Testing

### User Story 1 - Explorar el catálogo y consultar un producto (Priority: P1)

Como visitante, quiero ver productos públicos y consultar sus datos desde un celular o computadora.

**Independent Test**: Con productos publicados, abrir la tienda en móvil y escritorio y comprobar nombre, imagen, precio y descripción.

**Acceptance Scenarios**:

1. **Given** hay productos publicados, **When** el visitante abre la tienda, **Then** ve los cuatro datos de cada producto sin desplazamiento horizontal.
2. **Given** el catálogo está vacío, **When** el visitante abre la tienda, **Then** ve un mensaje claro de catálogo vacío.
3. **Given** una imagen no carga, **When** el visitante ve el producto, **Then** el resto de datos permanece legible con una alternativa visual.

### User Story 2 - Administrar productos (Priority: P1)

Como único administrador, quiero iniciar sesión, agregar productos y eliminarlos definitivamente.

**Independent Test**: Iniciar sesión, agregar un producto válido, verlo desde otro dispositivo, eliminarlo con confirmación y comprobar que un visitante no puede escribir.

**Acceptance Scenarios**:

1. **Given** credenciales válidas, **When** el administrador inicia sesión, **Then** accede a agregar y eliminar.
2. **Given** un formulario válido, **When** el administrador agrega un producto, **Then** aparece en el catálogo compartido.
3. **Given** un producto publicado, **When** confirma su eliminación, **Then** desaparece para todos los dispositivos.
4. **Given** un visitante o sesión vencida, **When** intenta escribir, **Then** la operación se rechaza sin cambiar el catálogo.

### User Story 3 - Pedir por WhatsApp (Priority: P1)

Como visitante, quiero abrir WhatsApp desde un producto con un mensaje preparado.

**Independent Test**: Activar el botón y verificar el número `994431924` y el texto `Hola, quiero pedir: [nombre del producto]`.

**Acceptance Scenarios**:

1. **Given** un producto visible, **When** el visitante pulsa «Pedir por WhatsApp», **Then** se abre el número fijo con el mensaje correcto.
2. **Given** WhatsApp está abierto, **When** el visitante revisa el mensaje, **Then** el envío sigue siendo manual y la tienda no guarda pedidos.

### Edge Cases

- Catálogo vacío: mostrar estado informativo.
- Formulario inválido: rechazar y señalar cada campo incorrecto.
- Imagen rota, ilegible o no permitida: rechazar al cargar o mostrar alternativa si falla después.
- Fallo de almacenamiento: mostrar error claro, no cambiar el catálogo y permitir reintento manual.
- Producto eliminado mientras se consulta: informar que ya no está disponible.
- Sesión vencida: bloquear escrituras y solicitar nuevo inicio de sesión.

## Requirements

### Functional Requirements

- **FR-001**: El sistema MUST ofrecer una web pública responsive para visitantes sin cuenta.
- **FR-002**: Cada producto MUST tener nombre, exactamente una imagen, precio y descripción.
- **FR-003**: La lista pública MUST persistir y compartirse entre dispositivos.
- **FR-004**: El sistema MUST permitir consultar un producto publicado.
- **FR-005**: Cada producto MUST incluir «Pedir por WhatsApp».
- **FR-006**: El botón MUST abrir el número fijo `994431924` y preparar `Hola, quiero pedir: [nombre del producto]`.
- **FR-007**: La tienda MUST NOT guardar pedidos ni confirmar ventas.
- **FR-008**: Debe existir un único acceso administrativo protegido por login.
- **FR-009**: El administrador autenticado MUST poder agregar y eliminar definitivamente productos.
- **FR-010**: El sistema MUST validar antes de escribir: nombre de 1–100 caracteres, descripción de 1–1000 caracteres, precio PEN mayor que cero con hasta dos decimales e imagen JPG/PNG/WebP de máximo 5 MB.
- **FR-011**: Visitantes y sesiones vencidas MUST quedar bloqueados de toda escritura.
- **FR-012**: Los cambios exitosos MUST verse desde otro dispositivo en un máximo de 10 segundos.
- **FR-013**: Los errores de validación, imagen, almacenamiento y sesión MUST mostrarse como errores claros, nunca como éxito.
- **FR-014**: El sistema MUST excluir pagos, carrito, inventario, estados, categorías, edición, ocultación, facturas, historial y cuentas de clientes.

### Decisiones resueltas

- **PA08**: PEN, formato `S/ 0.00`, hasta dos decimales y precio mayor que cero.
- **PA09**: Una imagen por producto, JPG/PNG/WebP, máximo 5 MB.
- **PA10**: `Hola, quiero pedir: [nombre del producto]`.
- **PA11**: Cuenta creada durante el despliegue; recuperación manual.
- **PA12**: Error claro, catálogo sin cambios y reintento manual.
- **PA13**: Confirmación explícita mostrando el nombre antes de eliminar.

### Key Entities

- **Producto**: nombre (1–100), descripción (1–1000), precio PEN, una imagen permitida y fecha de creación.
- **Administrador**: única cuenta autenticada, sin registro público.
- **Visitante**: consulta productos y abre WhatsApp sin cuenta.
- **Configuración de contacto**: número fijo `994431924`.

## Success Criteria

- **SC-001**: Al menos 95% de visitantes móviles y de escritorio ven los datos completos sin desplazamiento horizontal.
- **SC-002**: Un producto agregado aparece en un segundo dispositivo en un máximo de 10 segundos.
- **SC-003**: Tras eliminar, 100% de consultas nuevas dejan de mostrar el producto.
- **SC-004**: En 100% de accesos no autorizados, ninguna escritura modifica el catálogo.
- **SC-005**: En 100% de pruebas de WhatsApp, el número y producto son correctos.
- **SC-006**: En 100% de pruebas de error, se muestra fallo explícito sin confirmación falsa.

## Assumptions

- Supabase Storage tendrá lectura pública únicamente para imágenes publicadas; escritura y eliminación estarán restringidas al administrador autenticado.
- La cuenta administradora se crea una vez durante el despliegue y no existe registro de clientes.
- La eliminación es irreversible y requiere confirmación explícita.
- No se elige tecnología adicional fuera del plan aprobado.
