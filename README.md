# Tienda Catálogo WhatsApp

Catálogo público en español de Perú. Cada producto abre WhatsApp con un mensaje preparado. Un único administrador puede agregar y eliminar productos.

## Ejecutar en local

```powershell
npm.cmd ci
Copy-Item .env.example .env.local
npm.cmd run dev
```

Abre http://localhost:3000. El panel está en http://localhost:3000/admin/login. Sin Supabase configurado, la web arranca y muestra un error claro en el catálogo; no inventa productos locales.

## Configurar Supabase

1. Crea un proyecto de Supabase. Ejecuta `supabase/migrations/001_products.sql` y luego `002_product_images.sql` en el editor SQL del proyecto.
2. Crea la única cuenta administradora en Supabase Auth desde el panel de Supabase. Desactiva el registro público de usuarios.
3. Copia el UUID de esa cuenta a `ADMIN_USER_ID` en `.env.local` e inserta ese mismo UUID en `public.app_admins` desde el editor SQL de Supabase.
4. Completa `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` y `SUPABASE_SERVICE_ROLE_KEY` en `.env.local`. La clave de servicio se usa únicamente en el servidor, después de verificar la sesión y el UUID del administrador.
5. `NEXT_PUBLIC_WHATSAPP_NUMBER` debe tener prefijo de país y solo dígitos. El número peruano indicado se escribe `51994431924`.

No compartas `.env.local` ni la clave de servicio. La plantilla `.env.example` no contiene secretos.

## Verificar

```powershell
npm.cmd test
npm.cmd run build
```

Antes de publicar, prueba con dos navegadores: agrega un producto desde el panel, comprueba que aparece en el catálogo público, abre el enlace de WhatsApp y elimina el producto tras confirmar. Una petición de escritura sin sesión debe responder `401`.
