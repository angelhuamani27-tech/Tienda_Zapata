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
      <h1 id="page-title">Encuentra tu próximo par.</h1>
      <div className="intro-side">
        <p>{hasProducts
          ? 'Explora los modelos y consulta por WhatsApp el que te interese. Las imágenes son referenciales; te confirmaremos los detalles.'
          : 'Estamos preparando el catálogo con fotos reales. Aquí aparecerán los modelos para que puedas elegir y consultar por WhatsApp.'}</p>
        {hasProducts && <a className="button intro-button" href="#catalogo">Ver los 30 modelos <span aria-hidden="true">↓</span></a>}
      </div>
    </section>

    <section className="catalogue shell" id="catalogo" aria-labelledby="catalogue-title">
      <div className="catalogue-heading">
        <h2 id="catalogue-title">Modelos</h2>
        {hasProducts && <p>{products.length} imágenes referenciales</p>}
      </div>

      {hasProducts && <p className="catalogue-notice">Imágenes ilustrativas · modelos y precios por confirmar con el vendedor.</p>}

      {hasProducts ? <div className="product-grid">
        {products.map(product => <article className="product" key={product.id}>
          <Link className="product-photo" href={`/producto/${product.id}`} aria-label={`Ver ${product.name}`}>
            <ProductImage src={product.image} name={product.name} isReference={product.isReference} />
          </Link>
          <div className="product-heading">
            <h3><Link href={`/producto/${product.id}`}>{product.name}</Link></h3>
            <strong>{product.id.replace('-', ' ')} · {product.price === undefined ? 'Precio a consultar' : `S/ ${product.price.toFixed(2)}`}</strong>
          </div>
          <p className="product-description">{product.description}</p>
          <a className="order-link" href={whatsappHref(product.name, product.id, product.isReference)} target="_blank" rel="noopener noreferrer" aria-label={`Consultar ${product.name} por WhatsApp`}>
            Consultar por WhatsApp <span aria-hidden="true">↗</span>
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
        <h2 id="how-title">Elige. Consulta. Conversa.</h2>
        <p>Cuando te interese un modelo, toca «Consultar por WhatsApp». Se abrirá un mensaje preparado; tú decides si lo envías. Confirma allí el producto y su precio.</p>
      </div>
    </section>

    <footer className="site-footer shell">
      <span>Catálogo de calzado</span>
      <span>Perú · Consultas por WhatsApp</span>
    </footer>
  </main>
}
