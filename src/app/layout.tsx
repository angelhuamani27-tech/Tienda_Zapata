import './globals.css'
import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Zapata | Catálogo de calzado', description: 'Explora calzado y consulta cada producto por WhatsApp.' }
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="es-PE"><body>{children}</body></html> }
