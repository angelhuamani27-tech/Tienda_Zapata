import './globals.css'
import './detail.css'
import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Catálogo | Pedidos por WhatsApp', description: 'Catálogo público de productos' }
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="es-PE"><body>{children}</body></html> }
