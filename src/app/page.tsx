'use client'

import Link from 'next/link'
import SiteHeader from '../components/SiteHeader'
import ProductImage from '../components/products/ProductImage'
import AddToCartButton from '../components/cart/AddToCartButton'
import { useCatalogue } from '../components/catalogue/CatalogueProvider'
import { generalWhatsappHref, whatsappHref } from '../lib/whatsapp/link'

export default function Home() {
  const { products } = useCatalogue()
  const hasProducts = products.length > 0

  return <main>
    <SiteHeader />

    <section className="intro shell" aria-labelledby="page-title">
      <h1 id="page-title">Tu próximo par está aquí.</h1>
      <div className="intro-side">
        <p>{hasProducts
          ? 'Explora los modelos, agrega tus favoritos al carrito y envía tu pedido por WhatsApp cuando estés listo.'
          : 'Tu catálogo está vacío en este navegador. Agrega un producto para empezar o consulta por WhatsApp.'}</p>
        {hasProducts && <a className="button intro-button" href="#catalogo">Ver modelos <span aria-hidden="true">↓</span></a>}
      </div>
    </section>

    <section className="catalogue shell" id="catalogo" aria-labelledby="catalogue-title">
      <div className="catalogue-heading">
        <h2 id="catalogue-title">La colección</h2>
        {hasProducts && <p>{products.length} modelos</p>}
      </div>

      {hasProducts ? <div className="product-grid">
        {products.map(product => <article className="product" key={product.id}>
          <Link className="product-photo" href={product.id.startsWith('personal-') ? `/producto-local/?id=${encodeURIComponent(product.id)}` : `/producto/${product.id}`} aria-label={`Ver ${product.name}`}>
            <ProductImage src={product.image} name={product.name} isReference={product.isReference} />
          </Link>
          <div className="product-heading">
            <h3><Link href={product.id.startsWith('personal-') ? `/producto-local/?id=${encodeURIComponent(product.id)}` : `/producto/${product.id}`}>{product.name}</Link></h3>
            <strong>S/ {product.price.toFixed(2)}</strong>
          </div>
          <p className="product-description">{product.description}</p>
          <div className="product-actions">
            <AddToCartButton product={product} compact />
            <a className="order-link" href={whatsappHref(product.name, product.id)} target="_blank" rel="noopener noreferrer" aria-label={`Pedir ${product.name} por WhatsApp`}>
              Pedir este modelo <span aria-hidden="true">↗</span>
            </a>
          </div>
        </article>)}
      </div> : <div className="empty-state" role="status">
        <div>
          <h3>Tu catálogo está vacío.</h3>
          <p>Puedes agregar un producto desde «Gestionar» o consultar por WhatsApp.</p>
        </div>
        <a className="button" href={generalWhatsappHref()} target="_blank" rel="noopener noreferrer">
          Consultar por WhatsApp <span aria-hidden="true">↗</span>
        </a>
      </div>}
    </section>

    <section className="how-to" id="como-pedir" aria-labelledby="how-title">
      <div className="shell how-inner">
        <h2 id="how-title">Elige. Revisa. Escribe.</h2>
        <p>Agrega los modelos al carrito y toca «Pedir por WhatsApp». Se abrirá un mensaje con el resumen; tú decides si lo envías. No hay pagos en la web.</p>
      </div>
    </section>

    <footer className="site-footer shell">
      <span>Catálogo de calzado</span>
    </footer>
  </main>
}
