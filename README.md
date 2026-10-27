# Catálogo de calzado por WhatsApp

Web pública pensada para **hasta 30 productos reales**, con una foto, nombre, precio en soles y descripción por producto. El pedido se inicia en WhatsApp; la tienda no guarda mensajes ni confirma ventas. Por decisión del propietario, el catálogo queda vacío hasta recibir fotos y datos reales.

## Ejecutar en local

```powershell
npm.cmd ci
npm.cmd run dev
```

Abre http://localhost:3000. El número por defecto es **+51 994 431 924**. Para cambiarlo antes de publicar, configura `NEXT_PUBLIC_WHATSAPP_NUMBER` con código de país y solo dígitos. Usa `.env.example` como guía; no subas `.env.local`.

## Incorporar las fotos que enviará el propietario

1. Reúne **una foto real por producto** y confirma nombre, precio y descripción. Material y tallas son opcionales; solo se muestran cuando se confirmen.
2. Guarda cada foto en `public/images/products/` con un nombre corto y único, por ejemplo `zapato-negro.jpg`. Acepta JPG, PNG o WebP. Conviene que la foto esté bien iluminada y que el producto quede entero dentro del encuadre.
3. Añade una entrada a `src/data/products.ts` con `id`, `name`, `description`, `price` e `image`. Ejemplo:

```ts
{
  id: 'zapato-negro',
  name: 'Zapato negro',
  description: 'Descripción confirmada por el propietario.',
  price: 120,
  image: '/images/products/zapato-negro.jpg',
}
```

No publiques una entrada sin su foto y datos confirmados. El archivo valida el formato y el límite de 30 productos durante la compilación. Las imágenes se sirven en tamaños adecuados para cada pantalla y cargan a medida que el visitante baja por la página.

## Compartir la ficha del producto

Cuando la web tenga un dominio público, configura `NEXT_PUBLIC_SITE_URL=https://tu-dominio` en el despliegue. La vista previa del enlace mostrará la foto y los datos del producto, y el mensaje de WhatsApp incluirá su enlace. En local, el mensaje solo lleva el nombre para no enviar una dirección `localhost` al vendedor.

## Comprobar

```powershell
npm.cmd test
npm.cmd run build
```
