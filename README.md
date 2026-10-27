# Catálogo de calzado por WhatsApp

Catálogo de calzado con 30 modelos iniciales, precios en soles, fichas individuales y pedidos por WhatsApp. El carrito permite reunir varios modelos y preparar un solo mensaje con cantidades y total. Desde «Gestionar» se pueden agregar o quitar productos **sin usuario ni contraseña**. No hay pagos ni registro de pedidos.

## Ejecutar en local

```powershell
npm.cmd ci
npm.cmd run dev
```

Abre http://localhost:3000.

## Agregar, quitar y pedir

- En **Gestionar**, añade nombre, descripción, precio e imagen (JPG, PNG o WebP de hasta 5 MB). También puedes quitar modelos con confirmación.
- Esos cambios y las imágenes se guardan en **IndexedDB de este navegador**. No se comparten con otros dispositivos ni con otros visitantes. Borrar los datos del navegador elimina los cambios locales. Los 30 modelos iniciales siguen en el código del proyecto.
- En el catálogo, usa «Agregar al carrito». En **Carrito**, cambia cantidades o quita productos y pulsa «Pedir por WhatsApp». Se abre un mensaje con el detalle y el total; el cliente lo envía manualmente. También se puede pedir un modelo individual desde su tarjeta o ficha.
- El número por defecto es **+51 994 431 924**. Para cambiarlo, configura `NEXT_PUBLIC_WHATSAPP_NUMBER` con código de país y solo dígitos. Usa `.env.example` como guía; no subas `.env.local`.

## Datos de la demo

Los nombres, descripciones y precios iniciales de `src/data/products.ts` son de ejemplo. Las 30 ilustraciones están en `public/images/products/` y se cargan de manera adaptable al tamaño de pantalla.

## Si después se usa para una tienda real

1. Reúne **una foto real por producto** y confirma nombre, precio y descripción. Material y tallas son opcionales; solo se muestran cuando se confirmen.
2. Guarda cada foto en `public/images/products/` con un nombre corto y único, por ejemplo `zapato-negro.jpg`. Acepta JPG, PNG o WebP. Conviene que la foto esté bien iluminada y que el producto quede entero dentro del encuadre.
3. Sustituye la entrada correspondiente en `src/data/products.ts` con `id`, `name`, `description`, `price` e `image`; quita `isReference`. Ejemplo:

```ts
{
  id: 'zapato-negro',
  name: 'Zapato negro',
  description: 'Descripción confirmada por el propietario.',
  price: 120,
  image: '/images/products/zapato-negro.jpg',
}
```

No presentes las ilustraciones ni los precios de la demo como inventario real. El catálogo admite hasta 200 modelos por navegador.

## Compartir la ficha del producto

Cuando la web tenga un dominio público, configura `NEXT_PUBLIC_SITE_URL=https://tu-dominio` en el despliegue. El mensaje de WhatsApp incluirá el enlace de los modelos iniciales. Los modelos agregados en un navegador no tienen enlace público compartible; el mensaje usa su identificador y nombre.

## Comprobar

```powershell
npm.cmd test
npm.cmd run build
```
