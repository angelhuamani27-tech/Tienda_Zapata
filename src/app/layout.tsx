import './globals.css'
import type { Metadata } from 'next'
import { siteUrl } from '../lib/site-url'

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: 'Catálogo de calzado | Demo académica',
  description: 'Explora 30 modelos de calzado con precios de ejemplo y abre una consulta por WhatsApp. Proyecto académico.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="es-PE"><body>{children}</body></html>
}
