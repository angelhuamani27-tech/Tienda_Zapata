import Link from 'next/link'
import { getProducts } from '../lib/products/read'
import { whatsappHref } from '../lib/whatsapp/link'
import type { Product } from '../types/domain'
import ProductImage from '../components/products/ProductImage'

export const dynamic = 'force-dynamic'

export default async function Home() {
  let products: Product[]
  let error = ''
  try { products = await getProducts() }
  catch (cause) { products = []; error = cause instanceof Error ? cause.message : 'No se pudo cargar el catálogo.' }
  return <main className="shell">
    <header className="topbar"><Link className="brand" href="/">Tienda Zapata</Link><Link className="admin-link" href="/admin/login">Administración</Link></header>
    <section className="hero"><h1>Productos para descubrir y pedir.</h1><p className="lead">Explora el catálogo y conversa con la tienda por WhatsApp sobre el producto que te interesa.</p></section>
    <section aria-labelledby="catalogo"><div className="section-head"><h2 id="catalogo">Productos</h2><span>{products.length} disponibles</span></div>
      {error ? <div className="empty" role="alert"><h3>No se pudo cargar el catálogo</h3><p>{error}</p></div> : products.length === 0 ? <div className="empty"><h3>El catálogo está vacío</h3><p>Pronto encontrarás productos para consultar.</p></div> : <div className="grid">{products.map(product => <article className="product" key={product.id}><ProductImage src={product.image_path} name={product.name} /><div className="product-body"><h3><Link href={`/producto/${product.id}`}>{product.name}</Link></h3><p>{product.description}</p><strong>S/ {Number(product.price).toFixed(2)}</strong><a className="button" href={whatsappHref(product.name)} target="_blank" rel="noreferrer">Pedir por WhatsApp</a></div></article>)}</div>}
    </section><footer>Consultas directas por WhatsApp.</footer>
  </main>
}
