'use client'

import Link from 'next/link'
import SiteHeader from '../SiteHeader'
import ProductImage from '../products/ProductImage'
import AddToCartButton from '../cart/AddToCartButton'
import { useCatalogue } from './CatalogueProvider'
import { whatsappHref } from '../../lib/whatsapp/link'

export default function LocalProductDetail({ id }: { id: string }) {
  const { products, ready, error } = useCatalogue()
  const product = products.find(item => item.id === id)

  if (!ready) return <main><SiteHeader /><section className="shell not-found"><p>Cargando producto…</p></section></main>
  if (!product) return <main><SiteHeader /><section className="shell not-found">
    <h1>Producto no disponible</h1>
    <p>{error || 'Este producto solo se guarda en el navegador donde fue agregado, o ya fue quitado.'}</p>
    <Link className="button" href="/#catalogo">Volver al catálogo <span aria-hidden="true">→</span></Link>
  </section></main>

  return <main>
    <SiteHeader />
    <article className="detail shell">
      <div className="detail-photo"><ProductImage src={product.image} name={product.name} loading="eager" sizes="(max-width: 720px) 100vw, 60vw" /></div>
      <div className="detail-info">
        <Link className="back-link" href="/#catalogo">← Volver a los modelos</Link>
        <h1>{product.name}</h1>
        <p className="detail-description">{product.description}</p>
        <p className="detail-price">S/ {product.price.toFixed(2)}</p>
        <AddToCartButton product={product} />
        <a className="button detail-button" href={whatsappHref(product.name, product.id)} target="_blank" rel="noopener noreferrer">Pedir este modelo por WhatsApp <span aria-hidden="true">↗</span></a>
        <p className="detail-note">El pedido se abre en WhatsApp. Tú decides si lo envías.</p>
      </div>
    </article>
  </main>
}
