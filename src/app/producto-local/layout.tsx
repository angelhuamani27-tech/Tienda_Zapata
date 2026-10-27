import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Producto de este navegador | Catálogo de calzado',
  robots: { index: false, follow: false },
}

export default function LocalProductLayout({ children }: { children: React.ReactNode }) {
  return children
}
