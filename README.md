# Catálogo de calzado por WhatsApp

Demo académica de un catálogo de calzado con **30 modelos**, precios de ejemplo en soles y fichas individuales. Las imágenes del ZIP aportado son ilustraciones generadas con IA. Cada modelo tiene un botón que abre WhatsApp con un mensaje preparado y su identificador. No hay carrito, pagos, administración ni registro de pedidos.

## Ejecutar en local

```powershell
npm.cmd ci
npm.cmd run dev
```

Abre http://localhost:3000. El número por defecto es **+51 994 431 924**. Para cambiarlo antes de publicar, configura `NEXT_PUBLIC_WHATSAPP_NUMBER` con código de país y solo dígitos. Usa `.env.example` como guía; no subas `.env.local`.

## Datos de la demo

Los nombres, descripciones y precios de `src/data/products.ts` son inventados para este trabajo académico. La interfaz lo indica de forma visible. Las 30 ilustraciones están en `public/images/products/` y se cargan de manera adaptable al tamaño de pantalla.

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

No presentes las ilustraciones ni los precios de la demo como inventario real. El archivo valida el formato y el límite de 30 modelos durante la compilación.

## Compartir la ficha del producto

Cuando la web tenga un dominio público, configura `NEXT_PUBLIC_SITE_URL=https://tu-dominio` en el despliegue. La vista previa del enlace mostrará la imagen y los datos del modelo, y el mensaje de WhatsApp incluirá su enlace. En local, el mensaje lleva el identificador y el nombre para no enviar una dirección `localhost`.

## Comprobar

```powershell
npm.cmd test
npm.cmd run build
```
