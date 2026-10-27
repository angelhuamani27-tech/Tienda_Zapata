import './globals.css'
import type { Metadata } from 'next'
import { siteUrl } from '../lib/site-url'

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: 'Catálogo de calzado | Pedidos por WhatsApp',
  description: 'Explora 30 ilustraciones referenciales de calzado y consulta cada modelo por WhatsApp. Precios y detalles por confirmar.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="es-PE"><body>{children}</body></html>
}
