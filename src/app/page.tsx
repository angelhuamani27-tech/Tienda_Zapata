import Link from 'next/link'
import SiteHeader from '../components/SiteHeader'
import ProductImage from '../components/products/ProductImage'
import { products } from '../data/products'
import { generalWhatsappHref, whatsappHref } from '../lib/whatsapp/link'

export default function Home() {
  const hasProducts = products.length > 0

  return <main>
    <SiteHeader />

    <section className="intro shell" aria-labelledby="page-title">
      <h1 id="page-title">Tu próximo par está aquí.</h1>
      <div className="intro-side">
        <p>{hasProducts
          ? 'Treinta modelos para recorrer sin apuro. Elige el que más te guste y abre una conversación directa por WhatsApp.'
          : 'Estamos preparando el catálogo con fotos reales. Aquí aparecerán los modelos para que puedas elegir y consultar por WhatsApp.'}</p>
        {hasProducts && <a className="button intro-button" href="#catalogo">Ver los 30 modelos <span aria-hidden="true">↓</span></a>}
      </div>
    </section>

    <section className="catalogue shell" id="catalogo" aria-labelledby="catalogue-title">
      <div className="catalogue-heading">
        <h2 id="catalogue-title">La colección</h2>
        {hasProducts && <p>{products.length} modelos</p>}
      </div>

      {hasProducts && <p className="catalogue-notice">Proyecto académico: imágenes, descripciones y precios de ejemplo.</p>}

      {hasProducts ? <div className="product-grid">
        {products.map(product => <article className="product" key={product.id}>
          <Link className="product-photo" href={`/producto/${product.id}`} aria-label={`Ver ${product.name}`}>
            <ProductImage src={product.image} name={product.name} isReference={product.isReference} />
          </Link>
          <div className="product-heading">
            <h3><Link href={`/producto/${product.id}`}>{product.name}</Link></h3>
            <strong>S/ {product.price.toFixed(2)}</strong>
          </div>
          <p className="product-description">{product.description}</p>
          <a className="order-link" href={whatsappHref(product.name, product.id)} target="_blank" rel="noopener noreferrer" aria-label={`Pedir ${product.name} por WhatsApp`}>
            Pedir por WhatsApp <span aria-hidden="true">↗</span>
          </a>
        </article>)}
      </div> : <div className="empty-state" role="status">
        <div>
          <h3>El catálogo está en preparación.</h3>
          <p>Pronto verás aquí las fotos y los datos reales de cada producto.</p>
        </div>
        <a className="button" href={generalWhatsappHref()} target="_blank" rel="noopener noreferrer">
          Consultar por WhatsApp <span aria-hidden="true">↗</span>
        </a>
      </div>}
    </section>

    <section className="how-to" id="como-pedir" aria-labelledby="how-title">
      <div className="shell how-inner">
        <h2 id="how-title">Elige un par. Escríbenos.</h2>
        <p>Cada modelo tiene un botón «Pedir por WhatsApp». Se abrirá una conversación con el modelo identificado en el mensaje. Tú decides si lo envías.</p>
      </div>
    </section>

    <footer className="site-footer shell">
      <span>Catálogo de calzado</span>
      <span>Demo académica · Perú · WhatsApp</span>
    </footer>
  </main>
}
