import './globals.css'
import type { Metadata } from 'next'
import { siteUrl } from '../lib/site-url'
import { CartProvider } from '../components/cart/CartProvider'
import { CatalogueProvider } from '../components/catalogue/CatalogueProvider'

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: 'Catálogo de calzado | Pedidos por WhatsApp',
  description: 'Explora 30 modelos de calzado y consulta el que prefieras por WhatsApp.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="es-PE"><body><CartProvider><CatalogueProvider>{children}</CatalogueProvider></CartProvider></body></html>
}
