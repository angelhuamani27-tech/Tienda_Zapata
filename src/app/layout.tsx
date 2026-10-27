import './globals.css'
import type { Metadata } from 'next'
import { siteUrl } from '../lib/site-url'

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: 'Catálogo de calzado | Pedidos por WhatsApp',
  description: 'Explora modelos de calzado y consulta cada producto directamente por WhatsApp.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="es-PE"><body>{children}</body></html>
}
