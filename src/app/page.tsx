import Link from 'next/link'
import { products } from '../data/products'
import { whatsappHref } from '../lib/whatsapp/link'
import ProductImage from '../components/products/ProductImage'

export default function Home() {
  return <main>
    <header className="topbar shell"><Link className="brand" href="/">zapata<span>.</span></Link><a className="top-link" href="#catalogo">Ver catálogo <span aria-hidden="true">↗</span></a></header>
    <section className="hero shell" aria-labelledby="titulo">
      <div className="hero-copy"><h1 id="titulo">Un buen par cambia el día.</h1><p>Calzado para salir, caminar y volver a empezar. Elige el que va contigo y conversemos por WhatsApp.</p><a className="hero-action" href="#catalogo">Explorar los modelos <span aria-hidden="true">↘</span></a></div>
      <div className="hero-mosaic" aria-hidden="true">{products.map(product => <div className={`mosaic-tile tile-${product.id}`} key={product.id}><img src={product.image} alt="" /></div>)}</div>
    </section>
    <section className="catalogue shell" id="catalogo" aria-labelledby="catalogue-title"><div className="section-heading"><h2 id="catalogue-title">El catálogo</h2><p>Cuatro formas de ir a tu ritmo.</p></div><div className="products">{products.map(product => <article className="product" key={product.id}>
      <Link href={`/producto/${product.id}`} className="product-photo" aria-label={`Ver ${product.name}`}><ProductImage src={product.image} name={product.name} /></Link>
      <div className="product-info"><div><h3><Link href={`/producto/${product.id}`}>{product.name}</Link></h3><p>{product.description}</p></div><strong>S/ {product.price.toFixed(2)}</strong></div>
      <a className="order-link" href={whatsappHref(product.name)} target="_blank" rel="noopener noreferrer" aria-label={`Pedir ${product.name} por WhatsApp`}>Pedir por WhatsApp <span aria-hidden="true">↗</span></a>
    </article>)}</div></section>
    <footer className="footer"><div className="shell footer-inner"><span className="brand">zapata<span>.</span></span><p>Encuentra tu par. Escríbenos para consultar y hacer tu pedido.</p><span>Perú · Pedidos por WhatsApp</span></div></footer>
  </main>
}
