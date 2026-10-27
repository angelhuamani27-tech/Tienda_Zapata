# Implementation Plan: Tienda virtual sencilla con catálogo y WhatsApp

**Branch**: `001-catalogo-whatsapp` | **Date**: 2026-10-26 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `/specs/001-catalogo-whatsapp/spec.md`

## Summary

Construir una web pública responsive para mostrar productos y abrir pedidos individuales por
WhatsApp. Un único administrador iniciará sesión para agregar o eliminar productos. Se usará
Next.js con TypeScript para mantener una sola aplicación web, Supabase para base de datos,
almacenamiento de imágenes y autenticación, Vercel para publicar y GitHub para versionado y
revisiones.

## Technical Context

**Language/Version**: TypeScript 5.x sobre Node.js LTS

**Primary Dependencies**: Next.js, React, Supabase client, validación de formularios con Zod

**Storage**: Supabase Postgres para productos y Supabase Storage para imágenes

**Testing**: Vitest para validaciones y lógica; Playwright para flujos públicos y administrativos

**Target Platform**: Navegadores móviles y de escritorio; despliegue público en Vercel

**Project Type**: Aplicación web full-stack de un solo proyecto

**Performance Goals**: Catálogo visible en menos de 3 segundos en una conexión móvil común;
  cambios administrativos visibles desde otro dispositivo en un máximo de 10 segundos

**Constraints**: Una cuenta administradora, un número WhatsApp fijo (`994431924`), una imagen por
  producto, JPG/PNG/WebP de máximo 5 MB, sin carrito ni pagos

**Scale/Scope**: Catálogo pequeño, un administrador y visitantes públicos; sin necesidad de
  arquitectura distribuida ni procesamiento en segundo plano

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Simplicidad**: PASS — una aplicación web y un servicio gestionado para datos, imágenes y auth.
- **Alcance de la SPEC**: PASS — solo catálogo, WhatsApp, login, agregar y eliminar.
- **Seguridad**: PASS — secretos en variables de entorno; reglas de acceso restringen escrituras
  al administrador; validación de entradas y tipos de imagen.
- **Accesibilidad móvil**: PASS — diseño responsive, mensajes de error explícitos y controles
  utilizables con teclado y táctil.
- **Cambios y evidencia**: PASS — ramas pequeñas en GitHub, pruebas unitarias y E2E antes de
  afirmar funcionamiento.

## Project Structure

### Documentation (this feature)

```text
specs/001-catalogo-whatsapp/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── web-contract.md
└── tasks.md                 # generado por $speckit-tasks
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── page.tsx             # catálogo público
│   ├── producto/[id]/        # consulta individual
│   └── admin/                # login, agregar y eliminar
├── components/              # tarjetas, formularios y estados
├── lib/
│   ├── supabase/             # clientes público y servidor
│   ├── validation/           # reglas de producto e imagen
│   └── whatsapp/             # enlace y mensaje preparado
└── types/                    # tipos compartidos

tests/
├── unit/
└── e2e/

docs/
├── deployment-check.md
└── release-evidence.md
```

**Structure Decision**: Una sola aplicación Next.js mantiene UI y operaciones de servidor en un
repositorio. Supabase concentra persistencia, imágenes y autenticación sin crear servicios propios.

## Complexity Tracking

No hay violaciones de la constitución que requieran justificar complejidad adicional.
