# Zapata — catálogo por WhatsApp

Catálogo público con ocho modelos de calzado de ejemplo. Cada producto tiene foto, nombre, descripción y precio en soles. El botón abre WhatsApp al **+51 994 431 924** con el nombre del producto en un mensaje que el visitante envía manualmente. No hay cuentas, administración, carrito ni pedidos guardados.

## Ejecutar

```powershell
npm.cmd ci
npm.cmd run dev
```

Abre http://localhost:3000. Para comprobar la versión de producción: `npm.cmd test` y `npm.cmd run build`.

Los productos de demostración se definen en `src/data/products.ts` y sus imágenes generadas para este proyecto están en `public/images/`. Para cambiar el número de destino antes de publicar, define `NEXT_PUBLIC_WHATSAPP_NUMBER` con código de país y solo dígitos (por defecto `51994431924`). No se necesitan claves ni servicios externos.

Las fotos y precios son ejemplos ficticios; reemplázalos por productos reales antes de ofrecerlos al público.
