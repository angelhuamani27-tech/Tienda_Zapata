'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'
import SiteHeader from '../SiteHeader'
import { useCatalogue } from './CatalogueProvider'

export default function ProductAvailability({ id, children }: { id: string; children: ReactNode }) {
  const { products, ready } = useCatalogue()

  if (!ready) return <main><SiteHeader /><section className="shell not-found"><p>Cargando producto…</p></section></main>
  if (!products.some(product => product.id === id)) return <main><SiteHeader /><section className="shell not-found">
    <h1>Producto no disponible</h1>
    <p>Este modelo fue quitado del catálogo de este navegador.</p>
    <Link className="button" href="/#catalogo">Volver al catálogo <span aria-hidden="true">→</span></Link>
  </section></main>

  return children
}
