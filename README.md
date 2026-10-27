# Tienda Catálogo WhatsApp

## Ejecutar localmente

```powershell
npm.cmd install
Copy-Item .env.example .env.local
npm.cmd run dev
```

Configura las variables de `.env.local` con el proyecto Supabase y las credenciales del único
administrador. Nunca publiques ese archivo.

## Verificación

```powershell
npm.cmd run build
npm.cmd run test
```

La tienda pública está en `/` y el acceso administrativo en `/admin/login`.
