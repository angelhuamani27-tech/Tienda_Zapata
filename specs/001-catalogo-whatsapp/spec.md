# Especificación vigente: catálogo Zapata por WhatsApp

**Alcance actualizado por el usuario:** 26 de octubre de 2026. Esta versión reemplaza el alcance anterior con administración y Supabase.

## Historias

1. Una persona visita la web sin cuenta y ve ocho productos de ejemplo con nombre, una foto, precio en soles y descripción, tanto en celular como en computadora.
2. Puede abrir la página de un producto. Si la dirección no existe, ve un mensaje claro y un enlace de regreso.
3. Puede pulsar «Pedir por WhatsApp» en cada producto. Se abre `https://wa.me/51994431924` con `Hola, quiero pedir: [nombre del producto]` precargado. El cliente envía manualmente.

## Límites

- No hay administración, cuentas, API de escritura, base de datos, carrito, pagos, inventario ni historial de pedidos.
- Los productos y sus imágenes ficticias se publican con la web y se ven igual desde cualquier dispositivo. Para cambiarlos se modifica el código y se vuelve a publicar.
- La tienda no guarda pedidos ni confirma ventas. Fotos, nombres y precios son de demostración hasta que el propietario los reemplace.
- La portada explica brevemente cómo consultar un producto y enviar el mensaje manualmente.
- El número de WhatsApp se puede fijar al desplegar; por defecto es el número peruano confirmado.

## Criterios de aceptación

- La portada y cada producto cargan con imágenes locales, texto legible y sin desplazamiento horizontal en móvil.
- Cada botón abre el número y el nombre exacto de su producto.
- Una imagen que falle muestra una alternativa textual sin ocultar los demás datos.
- Las rutas antiguas de administración y escritura no existen.
- Pruebas, compilación de producción y revisión visual se ejecutan antes de afirmar que funciona.
